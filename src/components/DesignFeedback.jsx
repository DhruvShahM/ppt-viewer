import React, { useState, useEffect } from 'react';
import { MessageSquarePlus, Send, X } from 'lucide-react';
import { io } from 'socket.io-client';

const DesignFeedback = ({ deckId, slideIndex }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [instruction, setInstruction] = useState('');
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [pendingFeedback, setPendingFeedback] = useState(null);

    useEffect(() => {
        // Initial fetch
        const fetchFeedback = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/feedback');
                if (response.ok) {
                    const data = await response.json();
                    updatePendingFeedback(data);
                }
            } catch (error) {
                console.error('Failed to fetch feedback:', error);
            }
        };

        const updatePendingFeedback = (data) => {
            const pending = data.find(f =>
                f.deckId === deckId &&
                f.slideIndex === slideIndex &&
                (f.type === 'design' || !f.type) &&
                ['pending', 'planned', 'approved'].includes(f.status)
            );
            setPendingFeedback(pending);
        };

        fetchFeedback();

        // Socket.io connection
        const socket = io('http://localhost:3001');

        socket.on('feedback_updated', (data) => {
            updatePendingFeedback(data);
        });

        return () => {
            socket.disconnect();
        };
    }, [deckId, slideIndex]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!instruction.trim()) return;

        setStatus('sending');

        try {
            const response = await fetch('http://localhost:3001/api/feedback', {
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

    const handleApprove = async () => {
        if (!pendingFeedback) return;
        try {
            const response = await fetch(`http://localhost:3001/api/feedback/${pendingFeedback.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'approved' })
            });
            if (response.ok) {
                const updated = await response.json();
                setPendingFeedback(updated);
            }
        } catch (error) {
            console.error('Failed to approve feedback:', error);
        }
    };

    const handleReject = async () => {
        if (!pendingFeedback) return;
        try {
            const response = await fetch(`/api/feedback/${pendingFeedback.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'rejected' })
            });
            if (response.ok) {
                setPendingFeedback(null);
                setIsOpen(false);
            }
        } catch (error) {
            console.error('Failed to reject feedback:', error);
        }
    };

    return (
        <div className="relative z-[100]">
            {/* Trigger Button - Only show when closed */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all hover:scale-105 backdrop-blur-md border ${pendingFeedback
                        ? pendingFeedback.status === 'planned'
                            ? 'bg-blue-600/90 hover:bg-blue-700 border-blue-400/30 text-white'
                            : pendingFeedback.status === 'approved'
                                ? 'bg-green-600/90 hover:bg-green-700 border-green-400/30 text-white'
                                : 'bg-yellow-600/90 hover:bg-yellow-700 border-yellow-400/30 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 border-purple-400/30 text-white'
                        }`}
                >
                    <MessageSquarePlus size={18} />
                    <span className="text-sm font-medium">
                        {pendingFeedback
                            ? pendingFeedback.status === 'planned'
                                ? 'Review Plan'
                                : pendingFeedback.status === 'approved'
                                    ? 'Approved'
                                    : 'Pending Request'
                            : 'Design Feedback'}
                    </span>
                </button>
            )}

            {/* Feedback Form */}
            {isOpen && (
                <div className={`absolute bottom-12 right-0 bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-200 ${pendingFeedback?.status === 'planned' ? 'w-96' : 'w-80'}`}>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-white font-medium text-sm flex items-center gap-2">
                            <MessageSquarePlus size={16} className={
                                pendingFeedback?.status === 'planned' ? "text-blue-400" :
                                    pendingFeedback?.status === 'approved' ? "text-green-400" :
                                        pendingFeedback ? "text-yellow-400" : "text-purple-400"
                            } />
                            {pendingFeedback
                                ? pendingFeedback.status === 'planned' ? 'Review Plan' :
                                    pendingFeedback.status === 'approved' ? 'Approved' : 'Pending Request'
                                : 'Request Change'}
                        </h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {pendingFeedback ? (
                        <div className={`border rounded-lg p-3 mb-3 ${pendingFeedback.status === 'planned' ? 'bg-blue-500/10 border-blue-500/20' :
                            pendingFeedback.status === 'approved' ? 'bg-green-500/10 border-green-500/20' :
                                'bg-yellow-500/10 border-yellow-500/20'
                            }`}>
                            <p className="text-xs opacity-70 mb-1 text-white">Instruction:</p>
                            <p className="text-sm text-white font-medium mb-3">{pendingFeedback.instruction}</p>

                            {pendingFeedback.status === 'planned' && pendingFeedback.implementationPlan && (
                                <div className="mb-3 bg-slate-950/50 rounded p-2 border border-blue-500/10">
                                    <p className="text-xs text-blue-200/70 mb-1">Implementation Plan:</p>
                                    <pre className="text-xs text-blue-100 whitespace-pre-wrap font-mono max-h-40 overflow-y-auto custom-scrollbar">
                                        {pendingFeedback.implementationPlan}
                                    </pre>
                                </div>
                            )}

                            <div className="mt-2 text-[10px] opacity-50 flex justify-between items-center text-white">
                                <span className="capitalize">Status: {pendingFeedback.status}</span>
                                <span>{new Date(pendingFeedback.timestamp).toLocaleTimeString()}</span>
                            </div>

                            {pendingFeedback.status === 'planned' ? (
                                <div className="flex gap-2 mt-3">
                                    <button
                                        onClick={handleReject}
                                        className="flex-1 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs rounded transition-colors"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={handleApprove}
                                        className="flex-1 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-200 text-xs rounded transition-colors"
                                    >
                                        Approve Plan
                                    </button>
                                </div>
                            ) : pendingFeedback.status === 'approved' ? (
                                <div className="mt-3 text-center py-1.5 bg-green-500/10 text-green-200 text-xs rounded">
                                    Waiting for Agent execution...
                                </div>
                            ) : (
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
                            )}
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

// Error Boundary Component
class FeedbackErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("DesignFeedback UI crashed:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="fixed bottom-4 right-4 z-[100]">
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className="flex items-center gap-2 px-4 py-2 rounded-full shadow-lg bg-red-600 hover:bg-red-700 text-white transition-all"
                        title="Click to reset feedback widget"
                    >
                        <X size={18} />
                        <span className="text-sm font-medium">Feedback Error (Reset)</span>
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

const DesignFeedbackWrapper = (props) => {
    return (
        <FeedbackErrorBoundary>
            <DesignFeedback {...props} />
        </FeedbackErrorBoundary>
    );
};

export default DesignFeedbackWrapper;
