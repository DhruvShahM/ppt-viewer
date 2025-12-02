import React, { useState, useEffect } from 'react';
import { MessageSquarePlus, Send, X } from 'lucide-react';

const DesignFeedback = ({ deckId, slideIndex }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [instruction, setInstruction] = useState('');
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [pendingFeedback, setPendingFeedback] = useState(null);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await fetch('/api/feedback');
                if (response.ok) {
                    const data = await response.json();
                    const pending = data.find(f =>
                        f.deckId === deckId &&
                        f.slideIndex === slideIndex &&
                        f.status === 'pending'
                    );
                    setPendingFeedback(pending);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!instruction.trim()) return;

        setStatus('sending');

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    deckId,
                    slideIndex,
                    instruction,
                }),
            });

            if (response.ok) {
                setStatus('success');
                setInstruction('');
                // Refresh pending feedback immediately
                const newFeedback = await response.json();
                setPendingFeedback(newFeedback);

                setTimeout(() => {
                    setStatus('idle');
                    setIsOpen(false);
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all hover:scale-105 backdrop-blur-md border ${pendingFeedback
                        ? 'bg-yellow-600/90 hover:bg-yellow-700 border-yellow-400/30 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 border-purple-400/30 text-white'
                        }`}
                >
                    <MessageSquarePlus size={18} />
                    <span className="text-sm font-medium">
                        {pendingFeedback ? 'Pending Request' : 'Design Feedback'}
                    </span>
                </button>
            )}

            {/* Feedback Form */}
            {isOpen && (
                <div className="absolute bottom-12 right-0 bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-4 rounded-2xl shadow-2xl w-80 animate-in slide-in-from-bottom-5 fade-in duration-200">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-white font-medium text-sm flex items-center gap-2">
                            <MessageSquarePlus size={16} className={pendingFeedback ? "text-yellow-400" : "text-purple-400"} />
                            {pendingFeedback ? 'Pending Request' : 'Request Change'}
                        </h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {pendingFeedback ? (
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-3">
                            <p className="text-xs text-yellow-200/70 mb-1">Instruction:</p>
                            <p className="text-sm text-white font-medium">{pendingFeedback.instruction}</p>
                            <div className="mt-2 text-[10px] text-yellow-200/50 flex justify-between items-center">
                                <span>Status: Pending</span>
                                <span>{new Date(pendingFeedback.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText('/process_feedback');
                                    setStatus('copied');
                                    setTimeout(() => setStatus('idle'), 2000);
                                }}
                                className="mt-3 w-full py-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-200 text-xs rounded transition-colors flex items-center justify-center gap-1"
                            >
                                {status === 'copied' ? 'Copied!' : 'Copy Agent Command'}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <textarea
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
