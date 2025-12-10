import React, { useState, useRef, useEffect } from 'react';
import { Video, StopCircle, Download, Square, Smartphone, Monitor, Loader2, Check, X, Share2, Youtube } from 'lucide-react';

const SocialExportStudio = ({ slideIndex, currentSlideNode, onClose, onRecordingStart, onRecordingEnd }) => {
    const [aspectRatio, setAspectRatio] = useState('1:1'); // 1:1, 9:16, 16:9
    const [isRecording, setIsRecording] = useState(false);
    const [isAutoRecording, setIsAutoRecording] = useState(false);
    const [duration, setDuration] = useState(10); // Auto-record duration
    const [previewUrl, setPreviewUrl] = useState(null);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const containerRef = useRef(null);

    const getDimensions = () => {
        switch (aspectRatio) {
            case '1:1': return { width: 1080, height: 1080, label: 'Square (IG/LinkedIn)' };
            case '9:16': return { width: 1080, height: 1920, label: 'Vertical (Reels/TikTok)' };
            case '16:9': return { width: 1920, height: 1080, label: 'Landscape (YouTube)' };
            default: return { width: 1080, height: 1080 };
        }
    };

    const { width, height, label } = getDimensions();

    const startRecording = async (auto = false) => {
        try {
            // We use getDisplayMedia to record the specific area (or screen)
            // Note: In a browser environment, we can't easily force it to record JUST a specific DOM element programmatically without user selection in some browsers
            // BUT we can use canvas.captureStream() if the slide was a canvas.
            // Since it's DOM, we typically use getDisplayMedia and ask user to select the window/tab.

            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: "never",
                    displaySurface: "browser", // Hint to browser we prefer tab/window
                    width: { ideal: 1920, max: 3840 },
                    height: { ideal: 1080, max: 2160 },
                    frameRate: { ideal: 60, max: 60 }
                },
                audio: false
            });

            // If auto-recording, hide UI and go fullscreen immediately
            if (auto) {
                if (onRecordingStart) onRecordingStart();
                setIsAutoRecording(true);
                await document.documentElement.requestFullscreen();
            }

            // High bitrate for better quality (8 Mbps)
            const options = {
                mimeType: 'video/webm;codecs=vp9',
                videoBitsPerSecond: 8000000 // 8 Mbps
            };

            // Fallback for codec support
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                console.warn(`${options.mimeType} not supported, falling back to default`);
                delete options.mimeType; // Let browser choose
            }

            const mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                setPreviewUrl(url);
                stream.getTracks().forEach(track => track.stop());
                setIsRecording(false);

                // Cleanup auto-record state
                if (auto) {
                    setIsAutoRecording(false);
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    }
                    if (onRecordingEnd) onRecordingEnd();
                }
            };

            // Delay start to allow UI to settle (hide dialogs, enter fullscreen)
            setTimeout(() => {
                if (mediaRecorder.state === 'inactive') {
                    mediaRecorder.start();
                    setIsRecording(true);

                    // Auto-stop timer
                    if (auto && duration > 0) {
                        setTimeout(() => {
                            if (mediaRecorder.state === 'recording') {
                                mediaRecorder.stop();
                            }
                        }, duration * 1000);
                    }
                }
            }, 1000); // 1 second delay

        } catch (err) {
            console.error("Recording failed:", err);
            // alert("Could not start recording. Please ensure you grant permission."); // Removed alert to be less intrusive or handle gracefully
            setIsAutoRecording(false); // Reset on error
            if (onRecordingEnd && auto) onRecordingEnd();
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
        }
    };

    const downloadVideo = () => {
        if (!previewUrl) return;
        const a = document.createElement('a');
        a.href = previewUrl;
        a.download = `slide-${slideIndex}-social-export.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // If auto-recording, hide the entire studio UI so we capture the slide beneath
    if (isAutoRecording) {
        return <div className="hidden" />;
    }

    const [renderResult, setRenderResult] = useState(null);
    const [socialForm, setSocialForm] = useState(null); // { caption, platforms }
    const [isRendering, setIsRendering] = useState(false);

    const handleCloudRender = async () => {
        setIsRendering(true);
        try {
            const response = await fetch('http://localhost:3001/api/render-video', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    deckId: currentSlideNode.deckId || new URLSearchParams(window.location.search).get('deckId') || localStorage.getItem('lastDeckId'),
                    slideIndex: slideIndex - 1, // 0-based
                    duration,
                    width,
                    height
                })
            });
            const data = await response.json();
            if (data.success) {
                setRenderResult(data);
                // Don't auto-download now. Let user choose.
            } else {
                alert('Render failed: ' + data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Render error');
        } finally {
            setIsRendering(false);
        }
    };

    const handleDirectPost = async () => {
        if (!socialForm?.caption) return;

        try {
            await fetch('/api/social/schedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    deckId: new URLSearchParams(window.location.search).get('deckId') || localStorage.getItem('lastDeckId'),
                    slideIndex: slideIndex,
                    caption: socialForm.caption,
                    platforms: socialForm.platforms,
                    scheduledTime: new Date().toISOString(),
                    mediaType: 'video',
                    // Pass the server-side reference
                    mediaPath: renderResult.url,
                    isCloudRender: true
                })
            });
            alert('Video scheduled for posting!');
            onClose();
        } catch (e) {
            console.error(e);
            alert('Failed to schedule');
        }
    };

    if (renderResult) {
        return (
            <div className="fixed inset-0 z-[120] bg-black/90 flex flex-col items-center justify-center p-8 backdrop-blur-md">
                <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-2xl relative">
                    <button onClick={() => setRenderResult(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={24} /></button>

                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Render Complete!</h2>
                        <p className="text-slate-400">Your video is ready on the server.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Option 1: Download */}
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5 hover:border-white/20 transition-all text-center group">
                            <Download size={40} className="mx-auto mb-4 text-blue-500 group-hover:scale-110 transition-transform" />
                            <h3 className="text-lg font-bold text-white mb-2">Download Locally</h3>
                            <p className="text-sm text-slate-400 mb-4">Save the .mp4 file to your device storage.</p>
                            <a
                                href={`http://localhost:3001${renderResult.url}`}
                                download
                                className="inline-block w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium"
                            >
                                Download
                            </a>
                        </div>

                        {/* Option 2: Social Post */}
                        <div className="bg-indigo-600/10 p-6 rounded-xl border border-indigo-500/30 hover:border-indigo-500/50 transition-all text-center group relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            <Share2 size={40} className="mx-auto mb-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                            <h3 className="text-lg font-bold text-white mb-2">Post to Social</h3>
                            <p className="text-sm text-slate-400 mb-4">Directly schedule/post without downloading.</p>
                            <button
                                onClick={() => setSocialForm({ caption: '', platforms: ['linkedin'] })}
                                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium"
                            >
                                Compose Post
                            </button>
                        </div>
                    </div>

                    {socialForm && (
                        <div className="mt-6 border-t border-white/10 pt-6 animate-in slide-in-from-bottom-4">
                            <h3 className="font-bold text-white mb-4">Compose Update</h3>
                            <div className="flex gap-4 mb-4">
                                {['linkedin', 'twitter', 'instagram', 'youtube'].map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setSocialForm(prev => ({
                                            ...prev,
                                            platforms: prev.platforms.includes(p)
                                                ? prev.platforms.filter(x => x !== p)
                                                : [...prev.platforms, p]
                                        }))}
                                        className={`px-3 py-2 rounded border text-sm capitalize transition-all ${socialForm.platforms.includes(p) ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'border-slate-700 text-slate-400'}`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                            <textarea
                                value={socialForm.caption}
                                onChange={e => setSocialForm(prev => ({ ...prev, caption: e.target.value }))}
                                placeholder="Write your caption here..."
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none mb-4"
                                rows={3}
                            />
                            <button
                                onClick={handleDirectPost}
                                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all"
                            >
                                🚀 Schedule Post
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="fixed inset-0 z-[110] bg-black/90 flex flex-col items-center justify-center p-8 backdrop-blur-md">

            {/* Header */}
            <div className="w-full max-w-4xl flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Social Export Studio</h2>
                    <p className="text-slate-400">Record high-quality motion graphics for social media</p>
                </div>
                <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white">Close</button>
            </div>

            {/* Main Workspace */}
            <div className="flex gap-8 w-full max-w-6xl h-[70vh]">

                {/* 1. Viewport / Preview Area */}
                <div className="flex-1 bg-slate-900 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden shadow-2xl">
                    <div
                        className="bg-black origin-center transition-all duration-300 shadow-lg border border-white/5 relative group"
                        style={{
                            width: `${width}px`,
                            height: `${height}px`,
                            transform: `scale(${Math.min(0.4, 600 / height)})` // Scale down to fit screen
                        }}
                    >
                        {/*
                           This is a placeholder.
                           In a real advanced implementation, we would clone the Slide Component here using React.cloneElement
                           For now, we will render a "Recording Target" message or we need to pass the actual component class to render it here.
                        */}
                        <div className="w-full h-full flex items-center justify-center text-white bg-gradient-to-br from-slate-800 to-slate-900">
                            <div className="text-center p-10">
                                <Monitor size={64} className="mx-auto mb-4 text-blue-500 opacity-50" />
                                <h3 className="text-3xl font-bold mb-2">Recording Target</h3>
                                <p className="text-xl text-slate-400">When you click record, select this window/tab.<br />Mask the area to this box.</p>
                                <div className="mt-8 border-2 border-dashed border-white/20 p-4 rounded-xl">
                                    Aspect Ratio: <span className="text-blue-400 font-mono">{aspectRatio}</span>
                                </div>
                            </div>
                        </div>

                        {/* Guides */}
                        <div className="absolute inset-0 border-2 border-blue-500/30 pointer-events-none"></div>
                        <div className="absolute top-1/2 left-0 w-full h-px bg-blue-500/20 pointer-events-none"></div>
                        <div className="absolute left-1/2 top-0 h-full w-px bg-blue-500/20 pointer-events-none"></div>
                    </div>


                </div>

                {/* 2. Controls */}
                <div className="w-80 flex flex-col gap-6">
                    {/* Aspect Ratio Selector */}
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/10">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Frame Size</label>
                        <div className="grid grid-cols-1 gap-2">
                            <button
                                onClick={() => setAspectRatio('1:1')}
                                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${aspectRatio === '1:1' ? 'bg-blue-600/20 border-blue-500 text-white' : 'border-slate-700 text-slate-400 hover:bg-white/5'}`}
                            >
                                <Square size={18} />
                                <div className="text-left">
                                    <div className="font-medium text-sm">Square (1:1)</div>
                                    <div className="text-[10px] opacity-60">Instagram, LinkedIn</div>
                                </div>
                            </button>
                            <button
                                onClick={() => setAspectRatio('9:16')}
                                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${aspectRatio === '9:16' ? 'bg-blue-600/20 border-blue-500 text-white' : 'border-slate-700 text-slate-400 hover:bg-white/5'}`}
                            >
                                <Smartphone size={18} />
                                <div className="text-left">
                                    <div className="font-medium text-sm">Vertical (9:16)</div>
                                    <div className="text-[10px] opacity-60">TikTok, Reels, Shorts</div>
                                </div>
                            </button>
                            <button
                                onClick={() => setAspectRatio('16:9')}
                                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${aspectRatio === '16:9' ? 'bg-blue-600/20 border-blue-500 text-white' : 'border-slate-700 text-slate-400 hover:bg-white/5'}`}
                            >
                                <Monitor size={18} />
                                <div className="text-left">
                                    <div className="font-medium text-sm">Landscape (16:9)</div>
                                    <div className="text-[10px] opacity-60">YouTube, Presentations</div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Auto-Record Settings */}
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/10">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Auto-Record Duration</label>
                        <div className="flex gap-2">
                            {[5, 10, 15, 30].map(s => (
                                <button
                                    key={s}
                                    onClick={() => setDuration(s)}
                                    className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${duration === s ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                                >
                                    {s}s
                                </button>
                            ))}
                            <div className="flex items-center px-2 bg-slate-900 rounded border border-slate-700">
                                <input
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(parseInt(e.target.value))}
                                    className="w-10 bg-transparent text-white text-sm text-center focus:outline-none"
                                />
                                <span className="text-xs text-slate-500">s</span>
                            </div>
                        </div>
                    </div>

                    {/* Recording Controls */}
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/10 flex-1 flex flex-col justify-end">

                        {previewUrl ? (
                            <div className="space-y-3">
                                <video src={previewUrl} controls className="w-full rounded-lg border border-white/10 bg-black" />
                                <button
                                    onClick={downloadVideo}
                                    className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all"
                                >
                                    <Download size={18} /> Download Video
                                </button>
                                <button
                                    onClick={() => setPreviewUrl(null)}
                                    className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition-all"
                                >
                                    Discard & Record Again
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <button
                                    onClick={() => startRecording(true)}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-900/20"
                                >
                                    <Monitor size={20} />
                                    REC Full Scene ({duration}s)
                                </button>

                                <button
                                    onClick={() => isRecording ? stopRecording() : startRecording(false)}
                                    className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${isRecording
                                        ? 'bg-red-500/10 border border-red-500 text-red-500 animate-pulse'
                                        : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                                        }`}
                                >
                                    {isRecording ? 'Stop Recording' : 'Manual Record'}
                                </button>

                                <div className="w-full h-px bg-white/10 my-2"></div>

                                <button
                                    onClick={handleCloudRender}
                                    disabled={isRendering}
                                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                                >
                                    {isRendering ? <Loader2 className="animate-spin" /> : <Video size={18} />}
                                    {isRendering ? 'Rendering...' : 'Cloud Render (Best Quality)'}
                                </button>
                            </div>
                        )}

                        {!isRecording && !previewUrl && (
                            <p className="text-xs text-slate-500 text-center mt-4">
                                Tip: Click Start, then select the tab to record.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialExportStudio;
