import React, { useState, useEffect } from 'react';
import { ScanEye, Send, X, Copy, Check, Camera } from 'lucide-react';
import { io } from 'socket.io-client';
import html2canvas from 'html2canvas';

const UIAnalysis = ({ deckId, slideIndex }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [instruction, setInstruction] = useState('');
    const [includeScreenshot, setIncludeScreenshot] = useState(false);
    const [pastedImage, setPastedImage] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, sending, success, error, copied
    const [pendingAnalysis, setPendingAnalysis] = useState(null);

    useEffect(() => {
        // Initial fetch
        const fetchFeedback = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/feedback');
                if (response.ok) {
                    const data = await response.json();
                    updatePendingAnalysis(data);
                }
            } catch (error) {
                console.error('Failed to fetch feedback:', error);
            }
        };

        const updatePendingAnalysis = (data) => {
            const pending = data.find(f =>
                f.deckId === deckId &&
                f.slideIndex === slideIndex &&
                f.type === 'ui_analysis' &&
                ['pending', 'planned', 'approved'].includes(f.status)
            );
            setPendingAnalysis(pending);
        };

        fetchFeedback();

        // Socket.io connection
        const socket = io('http://localhost:3001');

        socket.on('feedback_updated', (data) => {
            updatePendingAnalysis(data);
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
            let imageData = null;

            if (pastedImage) {
                imageData = pastedImage;
            } else if (includeScreenshot) {
                // Hide the analysis modal temporarily for clean screenshot
                const modal = document.getElementById('ui-analysis-modal');
                if (modal) modal.style.opacity = '0';

                // Capture screenshot
                const canvas = await html2canvas(document.body);
                imageData = canvas.toDataURL('image/png');

                // Restore modal
                if (modal) modal.style.opacity = '1';
            }

            const response = await fetch('http://localhost:3001/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    deckId,
                    slideIndex,
                    instruction,
                    image: imageData,
                    type: 'ui_analysis'
                }),
            });

            if (response.ok) {
                setStatus('success');
                setInstruction('');
                setPastedImage(null);
                setIncludeScreenshot(false);
                const newFeedback = await response.json();
                setPendingAnalysis(newFeedback);

                setTimeout(() => {
                    setStatus('idle');
                    setIsOpen(false);
                }, 2000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Failed to submit analysis request:', error);
            setStatus('error');
        }
    };

    const handleCopyCommand = () => {
        navigator.clipboard.writeText('/analyze_ui');
        setStatus('copied');
        setTimeout(() => setStatus('idle'), 2000);
    };

    const handlePaste = (e) => {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const blob = items[i].getAsFile();
                const reader = new FileReader();
                reader.onload = (event) => {
                    setPastedImage(event.target.result);
                    setIncludeScreenshot(false); // Disable screenshot if image pasted
                };
                reader.readAsDataURL(blob);
                e.preventDefault(); // Prevent pasting the image filename/binary text
                break;
            }
        }
    };

    return (
        <div className="relative z-[100]">
            {/* Trigger Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all hover:scale-105 backdrop-blur-md border ${pendingAnalysis
                        ? 'bg-cyan-600/90 hover:bg-cyan-700 border-cyan-400/30 text-white'
                        : 'bg-slate-800/80 hover:bg-slate-700 border-slate-600/30 text-white'
                        } mr-2`}
                    title="Request UI Analysis"
                >
                    <ScanEye size={18} />
                    <span className="text-sm font-medium">
                        {pendingAnalysis ? 'Analysis Pending' : 'Analyze UI'}
                    </span>
                </button>
            )}

            {/* Analysis Form/Status */}
            {isOpen && (
                <div id="ui-analysis-modal" className="absolute bottom-12 right-0 w-80 bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-200">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-white font-medium text-sm flex items-center gap-2">
                            <ScanEye size={16} className="text-cyan-400" />
                            {pendingAnalysis ? 'Analysis Status' : 'Request UI Analysis'}
                        </h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {pendingAnalysis ? (
                        <div className="border border-cyan-500/20 bg-cyan-500/10 rounded-lg p-3 mb-3">
                            <p className="text-xs opacity-70 mb-1 text-white">Request:</p>
                            <p className="text-sm text-white font-medium mb-3">{pendingAnalysis.instruction}</p>

                            <div className="mt-2 text-[10px] opacity-50 flex justify-between items-center text-white">
                                <span className="capitalize">Status: {pendingAnalysis.status}</span>
                                <span>{new Date(pendingAnalysis.timestamp).toLocaleTimeString()}</span>
                            </div>

                            <button
                                onClick={handleCopyCommand}
                                className="mt-3 w-full py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 text-xs rounded transition-colors flex items-center justify-center gap-1"
                            >
                                {status === 'copied' ? (
                                    <>
                                        <Check size={12} /> Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy size={12} /> Copy Agent Command
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={instruction}
                                onChange={(e) => setInstruction(e.target.value)}
                                onPaste={handlePaste}
                                placeholder="What should I check? (e.g., alignment, contrast, spacing)... Paste an image here to include it."
                                className="w-full h-24 bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 resize-none mb-3"
                                autoFocus
                            />

                            {pastedImage && (
                                <div className="relative mb-3 group">
                                    <img src={pastedImage} alt="Pasted" className="w-full h-24 object-cover rounded-lg border border-slate-700" />
                                    <button
                                        type="button"
                                        onClick={() => setPastedImage(null)}
                                        className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            )}

                            <div className="flex items-center gap-2 mb-3">
                                <input
                                    type="checkbox"
                                    id="include-screenshot"
                                    checked={includeScreenshot}
                                    onChange={(e) => setIncludeScreenshot(e.target.checked)}
                                    disabled={!!pastedImage}
                                    className="rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500/50 disabled:opacity-50"
                                />
                                <label htmlFor="include-screenshot" className="text-xs text-slate-400 flex items-center gap-1 cursor-pointer select-none">
                                    <Camera size={12} /> Include Screenshot
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending' || !instruction.trim()}
                                className={`w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${status === 'success'
                                    ? 'bg-green-500 text-white'
                                    : status === 'error'
                                        ? 'bg-red-500 text-white'
                                        : 'bg-cyan-600 hover:bg-cyan-700 text-white disabled:opacity-50 disabled:cursor-not-allowed'
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
                        UI Analysis for: {deckId} / Slide {slideIndex + 1}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UIAnalysis;
