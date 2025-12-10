import React, { useState, useEffect } from 'react';
import { Share2, Calendar, Send, Clock, CheckCircle, AlertCircle, X, Trash2, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';

const SocialHub = ({ deckId, slideIndex }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('compose'); // compose, queue
    const [queue, setQueue] = useState([]);

    // Compose State
    const [caption, setCaption] = useState('');
    const [platforms, setPlatforms] = useState({
        linkedin: true,
        twitter: false,
        instagram: false
    });
    const [scheduleType, setScheduleType] = useState('now'); // now, later
    const [scheduledTime, setScheduledTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch queue
    const fetchQueue = async () => {
        try {
            const res = await fetch('/api/social/queue');
            if (res.ok) {
                const data = await res.json();
                setQueue(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchQueue();
            const interval = setInterval(fetchQueue, 5000);
            return () => clearInterval(interval);
        }
    }, [isOpen]);

    // Set default scheduled time to next hour
    useEffect(() => {
        const date = new Date();
        date.setHours(date.getHours() + 1);
        date.setMinutes(0);
        // Format for datetime-local: YYYY-MM-DDThh:mm
        const iso = date.toISOString().slice(0, 16);
        setScheduledTime(iso);
    }, []);

    const handleSchedule = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const selectedPlatforms = Object.keys(platforms).filter(k => platforms[k]);

        if (selectedPlatforms.length === 0) {
            alert("Please select at least one platform");
            setIsSubmitting(false);
            return;
        }

        const payload = {
            deckId,
            slideIndex,
            caption,
            platforms: selectedPlatforms,
            scheduledTime: scheduleType === 'now' ? new Date().toISOString() : new Date(scheduledTime).toISOString()
        };

        try {
            const res = await fetch('/api/social/schedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setCaption('');
                setActiveTab('queue');
                fetchQueue();
            } else {
                alert("Failed to schedule post");
            }
        } catch (err) {
            console.error(err);
            alert("Error scheduling post");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Remove this post from queue?")) return;
        try {
            await fetch(`/api/social/queue/${id}`, { method: 'DELETE' });
            fetchQueue();
        } catch (err) {
            console.error(err);
        }
    };

    const togglePlatform = (p) => {
        setPlatforms(prev => ({ ...prev, [p]: !prev[p] }));
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm relative group"
                title="Social Studio"
            >
                <Share2 size={24} />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Share2 className="text-blue-500" />
                            Social Studio
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">
                            Schedule posts for Slide {slideIndex}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/10 px-6">
                    <button
                        onClick={() => setActiveTab('compose')}
                        className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'compose' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-white'}`}
                    >
                        Compose
                    </button>
                    <button
                        onClick={() => setActiveTab('queue')}
                        className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'queue' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-white'}`}
                    >
                        Queue & History ({queue.length})
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'compose' ? (
                        <form onSubmit={handleSchedule} className="space-y-6">

                            {/* Platform Selection */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-3">Select Platforms</label>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => togglePlatform('linkedin')}
                                        className={`flex-1 py-3 border rounded-xl flex flex-col items-center gap-2 transition-all ${platforms.linkedin ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-slate-800 border-slate-700 text-slate-400 opacity-60 hover:opacity-100'}`}
                                    >
                                        <Linkedin size={24} />
                                        <span className="text-xs font-medium">LinkedIn</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => togglePlatform('twitter')}
                                        className={`flex-1 py-3 border rounded-xl flex flex-col items-center gap-2 transition-all ${platforms.twitter ? 'bg-sky-500/20 border-sky-500 text-sky-400' : 'bg-slate-800 border-slate-700 text-slate-400 opacity-60 hover:opacity-100'}`}
                                    >
                                        <Twitter size={24} />
                                        <span className="text-xs font-medium">X / Twitter</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => togglePlatform('instagram')}
                                        className={`flex-1 py-3 border rounded-xl flex flex-col items-center gap-2 transition-all ${platforms.instagram ? 'bg-pink-600/20 border-pink-500 text-pink-400' : 'bg-slate-800 border-slate-700 text-slate-400 opacity-60 hover:opacity-100'}`}
                                    >
                                        <Instagram size={24} />
                                        <span className="text-xs font-medium">Instagram</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => togglePlatform('youtube')}
                                        className={`flex-1 py-3 border rounded-xl flex flex-col items-center gap-2 transition-all ${platforms.youtube ? 'bg-red-600/20 border-red-500 text-red-400' : 'bg-slate-800 border-slate-700 text-slate-400 opacity-60 hover:opacity-100'}`}
                                    >
                                        <Youtube size={24} />
                                        <span className="text-xs font-medium">YouTube</span>
                                    </button>
                                </div>
                            </div>

                            {/* Caption */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Caption</label>
                                <textarea
                                    value={caption}
                                    onChange={e => setCaption(e.target.value)}
                                    placeholder="Write something engaging..."
                                    className="w-full h-32 bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 resize-none font-sans"
                                />
                                <p className="text-right text-xs text-slate-500 mt-1">{caption.length} chars</p>
                            </div>

                            {/* Scheduling */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-3">Schedule</label>
                                <div className="bg-slate-800 rounded-lg p-1 flex mb-3 w-fit">
                                    <button
                                        type="button"
                                        onClick={() => setScheduleType('now')}
                                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${scheduleType === 'now' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        Post Now
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setScheduleType('later')}
                                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${scheduleType === 'later' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        Schedule Later
                                    </button>
                                </div>

                                {scheduleType === 'later' && (
                                    <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg animate-in slide-in-from-top-2">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="text-slate-400" size={18} />
                                            <input
                                                type="datetime-local"
                                                value={scheduledTime}
                                                onChange={e => setScheduledTime(e.target.value)}
                                                className="bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                                            />
                                            <span className="text-xs text-yellow-500/80 ml-auto flex items-center gap-1">
                                                <AlertCircle size={12} />
                                                Catch-up enabled if device offline
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </form>
                    ) : (
                        <div className="space-y-3">
                            {queue.length === 0 && (
                                <div className="text-center py-10 text-slate-500">
                                    <Clock size={48} className="mx-auto mb-3 opacity-20" />
                                    <p>No posts in queue</p>
                                </div>
                            )}

                            {queue.map(post => (
                                <div key={post.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex gap-4 hover:border-slate-600 transition-colors">
                                    {/* Status Icon */}
                                    <div className="mt-1">
                                        {post.status === 'pending' && <Clock className="text-yellow-500" size={20} />}
                                        {post.status === 'processing' && <Share2 className="text-blue-500 animate-pulse" size={20} />}
                                        {post.status === 'published' && <CheckCircle className="text-green-500" size={20} />}
                                        {post.status === 'failed' && <AlertCircle className="text-red-500" size={20} />}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="text-sm font-medium text-white truncate pr-2">
                                                {post.caption || 'No caption'}
                                            </h4>
                                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${post.status === 'published' ? 'bg-green-500/20 text-green-400' :
                                                post.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                                                    'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                                {post.status}
                                            </span>
                                        </div>

                                        <p className="text-xs text-slate-400 mb-2">
                                            {new Date(post.scheduledTime).toLocaleString()}
                                        </p>

                                        <div className="flex gap-2 mb-2">
                                            {post.platforms.map(p => (
                                                <span key={p} className="text-[10px] px-2 py-1 bg-slate-700 rounded capitalize text-slate-300">
                                                    {p}
                                                </span>
                                            ))}
                                        </div>

                                        {post.results && (
                                            <div className="text-[10px] space-y-1 mt-2 bg-black/20 p-2 rounded">
                                                {post.results.map((r, i) => (
                                                    <div key={i} className="flex justify-between">
                                                        <span className="capitalize text-slate-400">{r.platform}</span>
                                                        <span className={r.status === 'success' ? 'text-green-400' : 'text-red-400'}>
                                                            {r.status}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-start">
                                        {post.status === 'pending' && (
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="p-2 hover:bg-red-500/20 text-slate-500 hover:text-red-400 rounded transition-colors"
                                                title="Cancel Post"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {activeTab === 'compose' && (
                    <div className="p-6 border-t border-white/10 flex justify-end gap-3 bg-slate-900/50 rounded-b-2xl">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSchedule}
                            disabled={isSubmitting || !caption}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all"
                        >
                            {isSubmitting ? 'Scheduling...' : (
                                <>
                                    {scheduleType === 'now' ? 'Post Now' : 'Schedule Post'}
                                    <Send size={16} />
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SocialHub;
