import React, { useState, useEffect, useRef } from 'react';
import { MessageSquarePlus, Send, X, Image as ImageIcon, Trash2 } from 'lucide-react';

const DesignFeedback = ({ deckId, slideIndex }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [instruction, setInstruction] = useState('');
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [pendingFeedbacks, setPendingFeedbacks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [screenshots, setScreenshots] = useState([]);
    const [screenshotPreviews, setScreenshotPreviews] = useState([]);
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await fetch('/api/feedback');
                if (response.ok) {
                    const data = await response.json();
                    const pending = data.filter(f =>
                        f.deckId === deckId &&
                        f.slideIndex === slideIndex &&
                        f.status === 'pending'
                    );
                    setPendingFeedbacks(pending);
                }
            } catch (error) {
                console.error('Failed to fetch feedback:', error);
            }
        };

        fetchFeedback();
        // Poll every 5 seconds to check for updates
        const interval = setInterval(fetchFeedback, 5000);
        return () => clearInterval(interval);
    }, [deckId, slideIndex]);

    // Handle paste event for screenshots
    useEffect(() => {
        const handlePaste = (e) => {
            if (!isOpen) return;

            const items = e.clipboardData?.items;
            if (!items) return;

            const files = [];
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    files.push(items[i].getAsFile());
                }
            }

            if (files.length > 0) {
                e.preventDefault();
                handleScreenshotFiles(files);
            }
        };

        if (isOpen) {
            document.addEventListener('paste', handlePaste);
        }

        return () => {
            document.removeEventListener('paste', handlePaste);
        };
    }, [isOpen]);

    const handleScreenshotFiles = (files) => {
        const newScreenshots = [];
        const newPreviews = [];

        Array.from(files).forEach(file => {
            if (!file) return;

            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size must be less than 5MB');
                return;
            }

            newScreenshots.push(file);
            newPreviews.push(URL.createObjectURL(file));
        });

        setScreenshots(prev => [...prev, ...newScreenshots]);
        setScreenshotPreviews(prev => [...prev, ...newPreviews]);
    };

    const handleFileInputChange = (e) => {
        if (e.target.files?.length) {
            handleScreenshotFiles(e.target.files);
        }
    };

    const removeScreenshot = (index) => {
        setScreenshots(prev => prev.filter((_, i) => i !== index));
        setScreenshotPreviews(prev => prev.filter((_, i) => i !== index));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const clearAllScreenshots = () => {
        setScreenshots([]);
        setScreenshotPreviews([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this request?')) return;

        try {
            const response = await fetch(`/api/feedback/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPendingFeedbacks(prev => prev.filter(f => f.id !== id));
            } else {
                alert('Failed to delete feedback');
            }
        } catch (error) {
            console.error('Error deleting feedback:', error);
            alert('Error deleting feedback');
        }
    };

    const handleDeleteAll = async () => {
        if (!confirm('Are you sure you want to delete ALL pending requests for this slide?')) return;

        try {
            const response = await fetch(`/api/feedback/${deckId}/${slideIndex}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPendingFeedbacks([]);
            } else {
                alert('Failed to delete feedbacks');
            }
        } catch (error) {
            console.error('Error deleting feedbacks:', error);
            alert('Error deleting feedbacks');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!instruction.trim()) return;

        setStatus('sending');

        try {
            const formData = new FormData();
            formData.append('deckId', deckId);
            formData.append('slideIndex', slideIndex);
            formData.append('instruction', instruction);

            if (screenshots.length > 0) {
                screenshots.forEach(file => {
                    formData.append('screenshots', file);
                });
            }

            const response = await fetch('/api/feedback', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setStatus('success');
                setInstruction('');
                clearAllScreenshots();

                // Refresh pending feedback immediately
                const newFeedbackList = await response.json();
                // The API returns the single new feedback, but we need to fetch all pending again or just append
                // Ideally we fetch again to be safe, but for now let's just re-fetch
                // Actually, let's just rely on the poller or manually trigger a fetch
                // But to be responsive, let's append if we can, or just wait for the poll.
                // Better: trigger a fetch immediately.

                // For now, let's just set showForm to false to go back to list
                setShowForm(false);

                // We'll let the poller update the list, or we can force a fetch here
                // fetchFeedback(); // We can't easily call it here without extracting it or using a ref/callback
                // But since we have the poller, it should update shortly. 
                // To make it instant, let's duplicate the fetch logic or move it out.
                // Let's just rely on the poller for simplicity as it runs every 5s, 
                // but maybe we can trigger it. 
                // Actually, let's just set status to success and close form.

                setTimeout(() => {
                    setStatus('idle');
                    // setIsOpen(false); // Don't close, go to list
                }, 2000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Failed to submit feedback:', error);
            setStatus('error');
        }
    };

    return (
        <div className="relative z-[100]">
            {/* Trigger Button - Only show when closed */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all hover:scale-105 backdrop-blur-md border ${pendingFeedbacks.length > 0
                        ? 'bg-yellow-600/90 hover:bg-yellow-700 border-yellow-400/30 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 border-purple-400/30 text-white'
                        }`}
                >
                    <MessageSquarePlus size={18} />
                    <span className="text-sm font-medium">
                        {pendingFeedbacks.length > 0 ? `${pendingFeedbacks.length} Pending` : 'Design Feedback'}
                    </span>
                </button>
            )}

            {/* Feedback Form */}
            {isOpen && (
                <div className="absolute bottom-12 right-0 bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-4 rounded-2xl shadow-2xl w-80 animate-in slide-in-from-bottom-5 fade-in duration-200">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-white font-medium text-sm flex items-center gap-2">
                            <MessageSquarePlus size={16} className={pendingFeedbacks.length > 0 ? "text-yellow-400" : "text-purple-400"} />
                            {pendingFeedbacks.length > 0 && !showForm ? 'Pending Requests' : 'Request Change'}
                        </h3>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                clearAllScreenshots();
                            }}
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {pendingFeedbacks.length > 0 && !showForm ? (
                        <div className="max-h-[60vh] overflow-y-auto pr-1">
                            {pendingFeedbacks.map((feedback) => (
                                <div key={feedback.id} className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-3">
                                    <p className="text-xs text-yellow-200/70 mb-1">Instruction:</p>
                                    <p className="text-sm text-white font-medium">{feedback.instruction}</p>

                                    {/* Show screenshots if present */}
                                    {(feedback.screenshots || feedback.screenshot) && (
                                        <div className="mt-2 grid grid-cols-2 gap-2">
                                            {(feedback.screenshots || [feedback.screenshot]).map((src, idx) => (
                                                <img
                                                    key={idx}
                                                    src={`/api/screenshots/${src}`}
                                                    alt={`Feedback screenshot ${idx + 1}`}
                                                    className="w-full rounded border border-yellow-500/20 cursor-pointer hover:opacity-80 transition-opacity"
                                                    onClick={() => window.open(`/api/screenshots/${src}`, '_blank')}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-2 text-[10px] text-yellow-200/50 flex justify-between items-center">
                                        <span>Status: Pending</span>
                                        <div className="flex items-center gap-2">
                                            <span>{new Date(feedback.timestamp).toLocaleTimeString()}</span>
                                            <button
                                                onClick={() => handleDelete(feedback.id)}
                                                className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-colors"
                                                title="Delete Request"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={() => setShowForm(true)}
                                className="w-full py-2 mb-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <MessageSquarePlus size={14} />
                                Add Another Request
                            </button>

                            {pendingFeedbacks.length > 1 && (
                                <button
                                    onClick={handleDeleteAll}
                                    className="w-full py-2 mb-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={14} />
                                    Delete All Requests
                                </button>
                            )}

                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText('/process_feedback');
                                    setStatus('copied');
                                    setTimeout(() => setStatus('idle'), 2000);
                                }}
                                className="w-full py-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-200 text-xs rounded transition-colors flex items-center justify-center gap-1"
                            >
                                {status === 'copied' ? 'Copied!' : 'Copy Agent Command'}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {showForm && pendingFeedbacks.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="mb-3 text-xs text-slate-400 hover:text-white flex items-center gap-1"
                                >
                                    ← Back to pending requests
                                </button>
                            )}
                            {/* Screenshot Previews */}
                            {screenshotPreviews.length > 0 && (
                                <div className="mb-3 grid grid-cols-2 gap-2">
                                    {screenshotPreviews.map((preview, idx) => (
                                        <div key={idx} className="relative group">
                                            <img
                                                src={preview}
                                                alt={`Screenshot preview ${idx + 1}`}
                                                className="w-full h-24 object-cover rounded border border-slate-700"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeScreenshot(idx)}
                                                className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Screenshot Upload Button */}
                            <div className="mb-3">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileInputChange}
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-400 hover:text-white hover:border-purple-500 transition-colors flex items-center justify-center gap-2"
                                >
                                    <ImageIcon size={16} />
                                    {screenshotPreviews.length > 0 ? 'Add More Screenshots' : 'Upload Screenshots (or paste)'}
                                </button>
                            </div>

                            <textarea
                                ref={textareaRef}
                                value={instruction}
                                onChange={(e) => setInstruction(e.target.value)}
                                placeholder="Describe the changes you want for this slide..."
                                className="w-full h-24 bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 resize-none mb-3"
                                autoFocus
                            />

                            <button
                                type="submit"
                                disabled={status === 'sending' || !instruction.trim()}
                                className={`w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${status === 'success'
                                    ? 'bg-green-500 text-white'
                                    : status === 'error'
                                        ? 'bg-red-500 text-white'
                                        : 'bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed'
                                    }`}
                            >
                                {status === 'sending' ? (
                                    'Sending...'
                                ) : status === 'success' ? (
                                    'Sent!'
                                ) : status === 'error' ? (
                                    'Error - Try Again'
                                ) : (
                                    <>
                                        Submit <Send size={14} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                    <div className="mt-2 text-[10px] text-slate-500 text-center">
                        Feedback for: {deckId} / Slide {slideIndex + 1}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DesignFeedback;

