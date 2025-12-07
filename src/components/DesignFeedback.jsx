import React, { useState, useEffect, useRef } from 'react';
import { MessageSquarePlus, Send, X, Image as ImageIcon, Trash2, Video, StopCircle, Play, Download } from 'lucide-react';


const DesignFeedback = ({ deckId, slideIndex }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [instruction, setInstruction] = useState('');
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [pendingFeedbacks, setPendingFeedbacks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [screenshots, setScreenshots] = useState([]);
    const [screenshotPreviews, setScreenshotPreviews] = useState([]);
    const [videos, setVideos] = useState([]);
    const [videoPreviews, setVideoPreviews] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);

    const fileInputRef = useRef(null);
    const videoInputRef = useRef(null);
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

    const handleVideoFiles = (files) => {
        const newVideos = [];
        const newPreviews = [];

        Array.from(files).forEach(file => {
            if (!file) return;

            if (!file.type.startsWith('video/')) {
                alert('Please select a video file');
                return;
            }

            // 50MB limit logic checks can be added here if needed, server has 50MB limit

            newVideos.push(file);
            newPreviews.push(URL.createObjectURL(file));
        });

        setVideos(prev => [...prev, ...newVideos]);
        setVideoPreviews(prev => [...prev, ...newPreviews]);
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { cursor: "always" },
                audio: false
            });

            const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'video/webm' });
                const file = new File([blob], `screen-recording-${Date.now()}.webm`, { type: 'video/webm' });
                handleVideoFiles([file]);

                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
                setIsRecording(false);
            };

            mediaRecorder.start();
            setIsRecording(true);

            // Stop recording when user stops sharing via browser UI
            stream.getVideoTracks()[0].onended = () => {
                if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                    stopRecording();
                }
            };

        } catch (err) {
            console.error("Error starting screen recording:", err);
            setIsRecording(false);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
    };

    const handleFileInputChange = (e) => {
        if (e.target.files?.length) {
            handleScreenshotFiles(e.target.files);
        }
    };

    const handleVideoInputChange = (e) => {
        if (e.target.files?.length) {
            handleVideoFiles(e.target.files);
        }
    };

    const removeScreenshot = (index) => {
        setScreenshots(prev => prev.filter((_, i) => i !== index));
        setScreenshotPreviews(prev => prev.filter((_, i) => i !== index));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeVideo = (index) => {
        setVideos(prev => prev.filter((_, i) => i !== index));
        setVideoPreviews(prev => prev.filter((_, i) => i !== index));
        if (videoInputRef.current) {
            videoInputRef.current.value = '';
        }
    };

    const clearAllScreenshots = () => {
        setScreenshots([]);
        setScreenshotPreviews([]);
        setVideos([]);
        setVideoPreviews([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (videoInputRef.current) videoInputRef.current.value = '';
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

            if (videos.length > 0) {
                videos.forEach(file => {
                    formData.append('videos', file);
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
                const newFeedback = await response.json();
                setPendingFeedbacks(prev => [...prev, newFeedback]);

                setShowForm(false);

                setTimeout(() => {
                    setStatus('idle');
                }, 2000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Failed to submit feedback:', error);
            setStatus('error');
        }
    };

    const handleDownloadDocx = async () => {
        try {
            const response = await fetch('/api/feedback/download-docx', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ deckId }),
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${deckId}-design-feedback-${Date.now()}.docx`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else {
                const err = await response.json();
                alert(`Failed to download DOCX: ${err.message}`);
            }
        } catch (error) {
            console.error('Error downloading DOCX:', error);
            alert('Error downloading DOCX file');
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

                                    {/* Show videos if present */}
                                    {feedback.videos && feedback.videos.length > 0 && (
                                        <div className="mt-2 grid grid-cols-1 gap-2">
                                            {feedback.videos.map((src, idx) => (
                                                <video
                                                    key={idx}
                                                    src={`/api/screenshots/${src}`}
                                                    controls
                                                    className="w-full rounded border border-yellow-500/20"
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
                                onClick={handleDownloadDocx}
                                className="w-full py-2 mb-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <Download size={14} />
                                Download Feedback (DOCX)
                            </button>

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

                            {/* Video Previews */}
                            {videoPreviews.length > 0 && (
                                <div className="mb-3 grid grid-cols-2 gap-2">
                                    {videoPreviews.map((preview, idx) => (
                                        <div key={idx} className="relative group">
                                            <video
                                                src={preview}
                                                className="w-full h-24 object-cover rounded border border-slate-700"
                                                controls
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeVideo(idx)}
                                                className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-all z-10"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Upload Buttons */}
                            <div className="mb-3 flex gap-2">
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
                                    className="flex-1 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-xs text-slate-400 hover:text-white hover:border-purple-500 transition-colors flex items-center justify-center gap-1"
                                >
                                    <ImageIcon size={14} />
                                    Img
                                </button>

                                <input
                                    ref={videoInputRef}
                                    type="file"
                                    accept="video/*"
                                    multiple
                                    onChange={handleVideoInputChange}
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => videoInputRef.current?.click()}
                                    className="flex-1 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-xs text-slate-400 hover:text-white hover:border-purple-500 transition-colors flex items-center justify-center gap-1"
                                >
                                    <Video size={14} />
                                    Vid
                                </button>

                                <button
                                    type="button"
                                    onClick={isRecording ? stopRecording : startRecording}
                                    className={`flex-1 py-2 border rounded-lg text-xs transition-colors flex items-center justify-center gap-1 ${isRecording
                                        ? 'bg-red-500/20 border-red-500 text-red-500 hover:bg-red-500/30'
                                        : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white hover:border-red-500'
                                        }`}
                                >
                                    {isRecording ? <StopCircle size={14} /> : <Video size={14} />}
                                    {isRecording ? 'Stop' : 'Rec'}
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
                        Feedback for: {deckId} / Slide {slideIndex}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DesignFeedback;

