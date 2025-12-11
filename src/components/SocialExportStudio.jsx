import React, { useState, useRef, useEffect } from 'react';
import { Video, StopCircle, Download, Square, Smartphone, Monitor, Loader2, Check, X, Share2, Youtube, Send, Link, AlertTriangle, Plus, Trash2, User, Lock, Facebook } from 'lucide-react';

const SocialExportStudio = ({ slideIndex, currentSlideNode, onClose, onRecordingStart, onRecordingEnd, initialMode }) => {
    const [aspectRatio, setAspectRatio] = useState('1:1'); // 1:1, 9:16, 16:9
    const [isRecording, setIsRecording] = useState(false);
    const [isAutoRecording, setIsAutoRecording] = useState(false);
    const [duration, setDuration] = useState(10); // Target duration for Cloud Render
    const [elapsedTime, setElapsedTime] = useState(0);
    const [previewUrl, setPreviewUrl] = useState(null);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const containerRef = useRef(null);

    // Mock Connected Accounts State: Array of { id, platform, name, type }
    const [accounts, setAccounts] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('social_connected_accounts_v2')) || [];
        } catch (e) {
            return [];
        }
    });
    const [showConnectForm, setShowConnectForm] = useState(false);
    const [connectingPlatform, setConnectingPlatform] = useState(null);

    // Persist mock connections
    useEffect(() => {
        localStorage.setItem('social_connected_accounts_v2', JSON.stringify(accounts));
    }, [accounts]);

    // Timer for manual recording
    useEffect(() => {
        let interval;
        if (isRecording) {
            const startTime = Date.now();
            interval = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        } else {
            setElapsedTime(0);
        }
        return () => clearInterval(interval);
    }, [isRecording]);

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
            // 1. Get the raw screen stream (typically 16:9)
            const rawStream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: "never",
                    displaySurface: "browser",
                    frameRate: { ideal: 60, max: 60 }
                },
                audio: false
            });

            // If user cancelled
            if (!rawStream || !rawStream.active) {
                console.warn("Stream not active (user cancelled?)");
                return;
            }

            // 2. Create a hidden video element
            const video = document.createElement('video');
            video.srcObject = rawStream;
            video.muted = true;
            video.playsInline = true;
            video.style.position = 'absolute';
            video.style.opacity = '0.01'; // Trick browser into treating it as visible
            video.style.pointerEvents = 'none';
            document.body.appendChild(video); // Attach to DOM to ensure priority
            video.play().catch(e => console.warn("Auto-play prevented", e));

            // Wait for video to actually have data using events
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => reject(new Error("Video start timeout")), 5000);
                if (video.readyState >= 2) { // HAVE_CURRENT_DATA
                    clearTimeout(timeout);
                    resolve();
                } else {
                    video.onloadeddata = () => {
                        clearTimeout(timeout);
                        resolve();
                    };
                }
            });

            // 3. Create a canvas
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d', { alpha: false });

            // Optimization: Small offscreen canvas for background blur
            // Bluring a 1920x1080 image is SLOW. Bluring a 192x108 image is FAST.
            const bgSmallW = Math.max(width / 10, 64);
            const bgSmallH = Math.max(height / 10, 64);
            const bgCanvas = document.createElement('canvas');
            bgCanvas.width = bgSmallW;
            bgCanvas.height = bgSmallH;
            const bgCtx = bgCanvas.getContext('2d', { alpha: false });
            bgCtx.filter = 'blur(4px) brightness(0.6)'; // Small blur radius on small image = looks like large blur when scaled

            // 4. Drawing Loop
            let animationFrameId;

            const renderLoop = () => {
                if (!video.videoWidth) return; // Skip if not ready

                const srcW = video.videoWidth;
                const srcH = video.videoHeight;

                // 1. Prepare Background (Fast Blur)
                // Draw total video frame to small canvas
                bgCtx.drawImage(video, 0, 0, bgSmallW, bgSmallH);

                // 2. Draw Blurred Background to Main Canvas
                // Calculate "Cover" rect
                const bgScale = Math.max(width / srcW, height / srcH);
                const bgW = srcW * bgScale;
                const bgH = srcH * bgScale;
                const bgX = (width - bgW) / 2;
                const bgY = (height - bgH) / 2;

                // Draw the small blurred canvas, scaled up to cover
                // ctx.filter = 'none'; // Ensure no heavy filter on main ctx
                ctx.drawImage(bgCanvas, 0, 0, bgSmallW, bgSmallH, bgX, bgY, bgW, bgH);

                // 3. Draw Main Content (Contain)
                const scale = Math.min(width / srcW, height / srcH);
                const drawW = srcW * scale;
                const drawH = srcH * scale;
                const drawX = (width - drawW) / 2;
                const drawY = (height - drawH) / 2;

                // Optimize Shadow: Use pre-configured setting. 
                // ShadowBlur is somewhat expensive but okay for one rect.
                ctx.shadowColor = 'rgba(0,0,0,0.5)';
                ctx.shadowBlur = 30;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 10;

                ctx.drawImage(video, 0, 0, srcW, srcH, drawX, drawY, drawW, drawH);
                ctx.shadowBlur = 0; // Reset for next frame background draw

                // 4. Schedule next frame
                if ('requestVideoFrameCallback' in video) {
                    video.requestVideoFrameCallback(renderLoop);
                } else {
                    animationFrameId = requestAnimationFrame(renderLoop);
                }
            };

            // Start the loop
            if ('requestVideoFrameCallback' in video) {
                video.requestVideoFrameCallback(renderLoop);
            } else {
                renderLoop(); // Starts rAF
            }

            // 5. Capture stream
            const canvasStream = canvas.captureStream(60);

            // FIX: Add silent audio track to ensure valid timestamp/duration metadata in WebM
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const dest = audioCtx.createMediaStreamDestination();
            const gainNode = audioCtx.createGain();
            gainNode.gain.value = 0; // Mute
            oscillator.connect(gainNode);
            gainNode.connect(dest);
            oscillator.start();
            const audioTrack = dest.stream.getAudioTracks()[0];

            const combinedStream = new MediaStream([
                ...canvasStream.getVideoTracks(),
                audioTrack
            ]);

            // ... (options setup) ...
            const options = {
                mimeType: 'video/webm;codecs=vp9',
                videoBitsPerSecond: 8000000
            };
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                // Fallback
                delete options.mimeType;
            }

            const mediaRecorder = new MediaRecorder(combinedStream, options);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = () => {
                cancelAnimationFrame(animationFrameId);
                video.pause();
                video.srcObject = null;
                if (document.body.contains(video)) document.body.removeChild(video);

                // Cleanup Audio
                oscillator.stop();
                audioCtx.close();

                rawStream.getTracks().forEach(t => t.stop());
                canvasStream.getTracks().forEach(t => t.stop());
                audioTrack.stop();

                const blob = new Blob(chunksRef.current, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                setPreviewUrl(url);
                setIsRecording(false);
                setElapsedTime(0); // Reset timer

                if (auto) {
                    setIsAutoRecording(false);
                    if (document.fullscreenElement) document.exitFullscreen().catch(() => { });
                    if (onRecordingEnd) onRecordingEnd();
                }
            };

            // If auto-recording, hide UI first
            if (auto) {
                if (onRecordingStart) onRecordingStart();
                setIsAutoRecording(true);
                try {
                    await document.documentElement.requestFullscreen();
                } catch (e) { console.warn("Fullscreen failed", e); }
            }

            // Start delay to let UI hide completely
            setTimeout(() => {
                if (mediaRecorder.state === 'inactive') {
                    mediaRecorder.start(1000); // 1s chunks + Audio track = Solid duration
                    setIsRecording(true);

                    // Sanitize duration for safety
                    const safeDuration = (duration && !isNaN(duration) && duration > 0) ? duration : 10;

                    if (auto) {
                        // Safety: Allow cancelling with Escape key
                        const handleEscape = (e) => {
                            if (e.key === 'Escape' && isRecording) {
                                mediaRecorder.stop();
                                window.removeEventListener('keydown', handleEscape);
                            }
                        };
                        window.addEventListener('keydown', handleEscape);

                        setTimeout(() => {
                            if (mediaRecorder.state === 'recording') {
                                mediaRecorder.stop();
                                window.removeEventListener('keydown', handleEscape);
                            }
                        }, safeDuration * 1000);
                    }
                }
            }, 800);

        } catch (err) {
            console.error("Recording failed:", err);
            setIsAutoRecording(false);
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

    const [renderResult, setRenderResult] = useState(null);
    const [socialForm, setSocialForm] = useState(null); // { caption, platforms }
    const [isRendering, setIsRendering] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // ... existing code ...

    // If auto-recording, hide the entire studio UI so we capture the slide beneath
    if (isAutoRecording) {
        return <div className="hidden" />;
    }



    const [connectionStep, setConnectionStep] = useState('select'); // 'select', 'details'
    const [connectionDetails, setConnectionDetails] = useState({ name: '', handle: '' });

    const handleCloudRender = async () => {
        // ... existing code ...
        setIsRendering(true);
        // ... (render logic remains same) ...
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

    const handleInitiateConnection = (platform) => {
        setConnectingPlatform(platform);
        setConnectionStep('details');
        setConnectionDetails({ name: '', handle: '' });
    };

    const handleSaveConnection = async () => {
        if (!connectionDetails.name) return;

        const platform = connectingPlatform;
        setIsUploading(true); // Reuse loading state for "connecting"

        // Simulation: In real life, open OAuth popup here
        try {
            // Mock delay to feel real
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock New Account with User Details
            const newAccount = {
                id: `acc_${Date.now()}`,
                platform,
                name: connectionDetails.name,
                handle: connectionDetails.handle || `@${connectionDetails.name.toLowerCase().replace(/\s/g, '')}`,
                type: 'personal',
                avatarUrl: null // Could use a placeholder service
            };

            setAccounts(prev => [...prev, newAccount]);
            setShowConnectForm(false);
            setConnectionStep('select');

            // Auto-select the new account
            setSocialForm(prev => ({
                ...prev,
                selectedAccountIds: [...(prev?.selectedAccountIds || []), newAccount.id]
            }));

        } catch (e) {
            alert("Connection failed");
        } finally {
            setConnectingPlatform(null);
            setIsUploading(false);
        }
    };

    const handleRealConnection = () => {
        const platform = connectingPlatform;
        if (!platform) return;

        const width = 600;
        const height = 700;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;

        // Open Popup
        window.open(`http://localhost:3001/api/auth/${platform}`, `Connect ${platform}`, `width=${width},height=${height},top=${top},left=${left}`);

        // Listen for success message from popup
        const handleMessage = (event) => {
            if (event.data.type === 'SOCIAL_AUTH_SUCCESS' && event.data.platform === platform) {
                const user = event.data.user;

                // Add to accounts list
                const newAccount = {
                    id: `real_${user.id || Date.now()}`,
                    platform: user.platform,
                    name: user.name,
                    handle: user.email || user.name,
                    type: 'personal',
                    avatarUrl: user.picture,
                    isReal: true, // Marker for real accounts
                    accessToken: user.accessToken
                };

                setAccounts(prev => {
                    // Avoid duplicates
                    if (prev.find(a => a.id === newAccount.id)) return prev;
                    return [...prev, newAccount];
                });

                setShowConnectForm(false);
                setConnectionStep('select');

                // Auto-select
                setSocialForm(prev => ({
                    ...prev,
                    selectedAccountIds: [...(prev?.selectedAccountIds || []), newAccount.id]
                }));

                window.removeEventListener('message', handleMessage);
            }
        };

        window.addEventListener('message', handleMessage);
    };

    // Kept for backward compatibility if called directly
    const handleAddAccount = handleInitiateConnection;

    const handleDisconnect = (id) => {
        if (confirm('Disconnect this account?')) {
            setAccounts(prev => prev.filter(a => a.id !== id));
            setSocialForm(prev => ({
                ...prev,
                selectedAccountIds: prev.selectedAccountIds ? prev.selectedAccountIds.filter(aid => aid !== id) : []
            }));
        }
    };

    const toggleAccountSelection = (id) => {
        setSocialForm(prev => {
            const current = prev.selectedAccountIds || [];
            return {
                ...prev,
                selectedAccountIds: current.includes(id)
                    ? current.filter(x => x !== id)
                    : [...current, id]
            };
        });
    };

    const handleDirectPost = async () => {
        if (!socialForm?.caption) return;

        // Final check
        if (!socialForm?.selectedAccountIds || socialForm.selectedAccountIds.length === 0) {
            alert(`Please select at least one account!`);
            return;
        }

        // Map account IDs to platforms for the backend mock
        // In a real app, we'd send the account IDs directly
        const selectedAccounts = accounts.filter(a => socialForm.selectedAccountIds.includes(a.id));
        const platformsPayload = selectedAccounts.map(a => a.platform);

        setIsUploading(true);

        try {
            let finalMediaPath = null;

            if (renderResult) {
                finalMediaPath = renderResult.url;
            } else if (previewUrl) {
                // Upload Blob
                const blob = await fetch(previewUrl).then(r => r.blob());
                const formData = new FormData();
                formData.append('file', blob, `manual-recording-${Date.now()}.webm`);

                const uploadRes = await fetch('/api/upload-media', {
                    method: 'POST',
                    body: formData
                });
                const uploadData = await uploadRes.json();
                if (!uploadData.success) throw new Error(uploadData.error || 'Upload failed');
                finalMediaPath = uploadData.url;
            }

            if (!finalMediaPath) throw new Error("No media to post");

            await fetch('/api/social/schedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    deckId: new URLSearchParams(window.location.search).get('deckId') || localStorage.getItem('lastDeckId'),
                    slideIndex: slideIndex,
                    caption: socialForm.caption,
                    platforms: platformsPayload, // sending array of platforms (duplicates allowed in mock)
                    scheduledTime: new Date().toISOString(),
                    mediaType: 'video',
                    // Pass the server-side reference
                    mediaPath: finalMediaPath,
                    isCloudRender: !!renderResult
                })
            });
            alert('Video scheduled for posting!');
            onClose();
        } catch (e) {
            console.error(e);
            alert('Failed to schedule: ' + e.message);
        } finally {
            setIsUploading(false);
        }
    };

    // --- NEW: Standalone Account Management Mode ---
    if (initialMode === 'accounts') {
        return (
            <div className="fixed inset-0 z-[120] bg-black/90 flex flex-col items-center justify-center p-8 backdrop-blur-md">
                <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative animate-in zoom-in-95">
                    <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={20} /></button>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center">
                            <Link size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Connected Accounts</h2>
                            <p className="text-sm text-slate-400">Manage your social media connections</p>
                        </div>
                    </div>

                    <div className="bg-slate-950/50 rounded-xl p-4 border border-white/5 min-h-[300px] flex flex-col">

                        {/* Connection Form Toggle */}
                        {!showConnectForm && (
                            <button
                                onClick={() => setShowConnectForm(true)}
                                className="w-full py-3 mb-4 rounded-lg border border-dashed border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2 text-sm"
                            >
                                <Plus size={16} /> Connect New Account
                            </button>
                        )}

                        {/* Connection Form */}
                        {showConnectForm ? (
                            <div className="bg-slate-800 rounded-xl p-4 border border-blue-500/30 animate-in slide-in-from-top-2 mb-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-sm font-bold text-white">
                                        {connectionStep === 'details' ? `Connect to ${connectingPlatform}` : 'Select Platform'}
                                    </h4>
                                    <button onClick={() => { setShowConnectForm(false); setConnectionStep('select'); }} className="text-slate-400 hover:text-white"><X size={14} /></button>
                                </div>

                                {connectionStep === 'select' ? (
                                    <div className="grid grid-cols-4 gap-2">
                                        {['instagram', 'facebook', 'youtube', 'reddit'].map(p => (
                                            <button
                                                key={p}
                                                onClick={() => handleInitiateConnection(p)}
                                                className="flex flex-col items-center gap-2 p-3 bg-slate-900 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all"
                                            >
                                                {p === 'instagram' && <Share2 size={20} className="text-pink-500" />}
                                                {p === 'facebook' && <Facebook size={20} className="text-blue-600" />}
                                                {p === 'youtube' && <Youtube size={20} className="text-red-500" />}
                                                {p === 'reddit' && <Share2 size={20} className="text-orange-500" />}
                                                <span className="text-[10px] capitalize text-slate-300">{p}</span>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Account Name / Channel Name</label>
                                            <input
                                                autoFocus
                                                type="text"
                                                value={connectionDetails.name}
                                                onChange={e => setConnectionDetails(p => ({ ...p, name: e.target.value }))}
                                                placeholder="e.g. Dhruv Shah"
                                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Handle (Optional)</label>
                                            <input
                                                type="text"
                                                value={connectionDetails.handle}
                                                onChange={e => setConnectionDetails(p => ({ ...p, handle: e.target.value }))}
                                                placeholder="@dhruvshah"
                                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                                            />
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            <button
                                                onClick={() => setConnectionStep('select')}
                                                className="flex-1 py-2 text-xs text-slate-400 hover:text-white"
                                            >
                                                Back
                                            </button>
                                            <button
                                                onClick={handleSaveConnection}
                                                disabled={!connectionDetails.name || isUploading}
                                                className="flex-[2] py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold flex items-center justify-center gap-2"
                                            >
                                                {isUploading ? <Loader2 size={12} className="animate-spin" /> : 'Connect Account'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {connectionStep === 'details' && (
                                    <>
                                        <p className="text-[10px] text-slate-500 italic text-center mt-1">
                                            * Simulation Mode (No real API keys needed)
                                        </p>

                                        <div className="relative flex py-1 items-center">
                                            <div className="flex-grow border-t border-slate-700"></div>
                                            <span className="flex-shrink-0 mx-2 text-[10px] text-slate-500 uppercase">Or Real Auth</span>
                                            <div className="flex-grow border-t border-slate-700"></div>
                                        </div>

                                        <button
                                            onClick={handleRealConnection}
                                            className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white rounded text-xs font-bold flex items-center justify-center gap-2 group"
                                            title="Requires API Keys in server/config/social.js"
                                        >
                                            <Lock size={12} className="text-yellow-500 group-hover:text-white transition-colors" />
                                            Connect via {connectingPlatform} (OAuth)
                                        </button>
                                    </>
                                )}
                            </div>
                        ) : (
                            /* Account List */
                            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-1">
                                {accounts.length === 0 ? (
                                    <div className="text-center py-10 opacity-50">
                                        <p className="text-sm">No accounts connected yet.</p>
                                    </div>
                                ) : (
                                    accounts.map(acc => (
                                        <div
                                            key={acc.id}
                                            className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300">
                                                    <User size={14} />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-white flex items-center gap-2">
                                                        {acc.name}
                                                        <span className="text-[9px] uppercase bg-black/30 px-1.5 py-0.5 rounded text-slate-400">{acc.platform}</span>
                                                    </div>
                                                    <div className="text-[10px] text-green-500 flex items-center gap-1">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Connected
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleDisconnect(acc.id)}
                                                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                title="Disconnect"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div >
        );
    }

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
                                onClick={() => setSocialForm({ caption: '', selectedAccountIds: [] })}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium"
                            >
                                Compose Post
                            </button>
                        </div>
                    </div>

                    {socialForm && (
                        <div className="mt-6 border-t border-white/10 pt-6 animate-in slide-in-from-bottom-4">
                            <h3 className="font-bold text-white mb-4">Compose Update</h3>
                            {/* Account Management & Selection */}
                            <div className="mb-4">
                                <div className="flex justify-between items-end mb-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Publish To</label>
                                    {!showConnectForm && (
                                        <button
                                            onClick={() => setShowConnectForm(true)}
                                            className="text-[10px] flex items-center gap-1 text-blue-400 hover:text-blue-300"
                                        >
                                            <Plus size={12} /> Connect New
                                        </button>
                                    )}
                                </div>

                                {/* Connection Form (Separate View) */}
                                {showConnectForm ? (
                                    <div className="bg-slate-800 rounded-xl p-4 border border-blue-500/30 animate-in zoom-in-95">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="text-sm font-bold text-white">
                                                {connectionStep === 'details' ? `Connect to ${connectingPlatform}` : 'Connect New Account'}
                                            </h4>
                                            <button onClick={() => { setShowConnectForm(false); setConnectionStep('select'); }} className="text-slate-400 hover:text-white"><X size={14} /></button>
                                        </div>

                                        {connectionStep === 'select' ? (
                                            <div className="grid grid-cols-4 gap-2">
                                                {['instagram', 'facebook', 'youtube', 'reddit'].map(p => (
                                                    <button
                                                        key={p}
                                                        onClick={() => handleInitiateConnection(p)}
                                                        className="flex flex-col items-center gap-2 p-3 bg-slate-900 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all"
                                                    >
                                                        {p === 'instagram' && <Share2 size={20} className="text-pink-500" />}
                                                        {p === 'facebook' && <Facebook size={20} className="text-blue-600" />}
                                                        {p === 'youtube' && <Youtube size={20} className="text-red-500" />}
                                                        {p === 'reddit' && <Share2 size={20} className="text-orange-500" />}
                                                        <span className="text-[10px] capitalize text-slate-300">{p}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Account Name / Channel Name</label>
                                                    <input
                                                        autoFocus
                                                        type="text"
                                                        value={connectionDetails.name}
                                                        onChange={e => setConnectionDetails(p => ({ ...p, name: e.target.value }))}
                                                        placeholder="e.g. Dhruv Shah"
                                                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Handle (Optional)</label>
                                                    <input
                                                        type="text"
                                                        value={connectionDetails.handle}
                                                        onChange={e => setConnectionDetails(p => ({ ...p, handle: e.target.value }))}
                                                        placeholder="@dhruvshah"
                                                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                                <div className="flex gap-2 mt-2">
                                                    <button
                                                        onClick={() => setConnectionStep('select')}
                                                        className="flex-1 py-2 text-xs text-slate-400 hover:text-white"
                                                    >
                                                        Back
                                                    </button>
                                                    <button
                                                        onClick={handleSaveConnection}
                                                        disabled={!connectionDetails.name || isUploading}
                                                        className="flex-[2] py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold flex items-center justify-center gap-2"
                                                    >
                                                        {isUploading ? <Loader2 size={12} className="animate-spin" /> : 'Connect Account'}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    /* Account List */
                                    <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar p-1">
                                        {accounts.length === 0 && (
                                            <div onClick={() => setShowConnectForm(true)} className="text-center p-4 border-2 border-dashed border-slate-700 rounded-lg text-slate-500 text-xs cursor-pointer hover:border-slate-500 hover:text-slate-400">
                                                No accounts connected.<br />Click to add one.
                                            </div>
                                        )}

                                        {accounts.map(acc => {
                                            const isSelected = socialForm.selectedAccountIds?.includes(acc.id);
                                            return (
                                                <div
                                                    key={acc.id}
                                                    className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-all ${isSelected ? 'bg-blue-600/10 border-blue-500/50' : 'bg-slate-800 border-slate-700 hover:border-slate-600'}`}
                                                    onClick={() => toggleAccountSelection(acc.id)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300">
                                                            <User size={14} />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-white flex items-center gap-2">
                                                                {acc.name}
                                                                <span className="text-[9px] uppercase bg-black/30 px-1.5 py-0.5 rounded text-slate-400">{acc.platform}</span>
                                                            </div>
                                                            <div className="text-[10px] text-slate-500">Connected</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        {isSelected && <Check size={16} className="text-blue-500" />}
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleDisconnect(acc.id); }}
                                                            className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
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
                                disabled={isUploading || !socialForm.selectedAccountIds?.length}
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
                <div className="w-80 flex flex-col gap-6 overflow-y-auto pr-2 h-full custom-scrollbar">
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

                    {/* Duration Settings */}
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/10">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Target Duration (Cloud)</label>
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
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={duration}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val === '') setDuration('');
                                        else {
                                            const parsed = parseInt(val);
                                            if (!isNaN(parsed)) setDuration(parsed);
                                        }
                                    }}
                                    onBlur={() => {
                                        if (!duration || duration < 1) setDuration(10);
                                    }}
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

                                {!socialForm ? (
                                    <>
                                        <button
                                            onClick={downloadVideo}
                                            className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all"
                                        >
                                            <Download size={18} /> Download Video
                                        </button>

                                        <button
                                            onClick={() => setSocialForm({ caption: '', selectedAccountIds: [] })}
                                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all"
                                        >
                                            <Share2 size={18} /> Post to Social
                                        </button>

                                        <button
                                            onClick={() => setPreviewUrl(null)}
                                            className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition-all"
                                        >
                                            Discard & Record Again
                                        </button>
                                    </>
                                ) : (
                                    <div className="animate-in slide-in-from-bottom-4 bg-slate-900/80 p-3 rounded-lg border border-white/10">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-bold text-white text-sm">Compose Post</h3>
                                            <button onClick={() => setSocialForm(null)} className="text-xs text-slate-400 hover:text-white">Cancel</button>
                                        </div>

                                        <div className="mb-3">
                                            {/* Simplified version for Preview View - just show list */}
                                            <div className="flex gap-2 mb-2 overflow-x-auto pb-1">
                                                {accounts.map(acc => (
                                                    <button
                                                        key={acc.id}
                                                        onClick={() => toggleAccountSelection(acc.id)}
                                                        className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border text-xs whitespace-nowrap transition-all ${socialForm.selectedAccountIds?.includes(acc.id) ? 'bg-blue-600/20 border-blue-500 text-white' : 'border-slate-700 text-slate-400'}`}
                                                    >
                                                        <User size={10} />
                                                        {acc.name}
                                                    </button>
                                                ))}
                                                {accounts.length === 0 && <span className="text-xs text-slate-500">No accounts connected.</span>}
                                            </div>
                                        </div>

                                        <textarea
                                            value={socialForm.caption}
                                            onChange={e => setSocialForm(prev => ({ ...prev, caption: e.target.value }))}
                                            placeholder="Write your caption..."
                                            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white text-sm focus:border-blue-500 focus:outline-none mb-3"
                                            rows={3}
                                        />

                                        <button
                                            onClick={handleDirectPost}
                                            disabled={isUploading || !socialForm.selectedAccountIds?.length}
                                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2"
                                        >
                                            {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                            {isUploading ? 'Uploading & Scheduling...' : 'Schedule Post'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <button
                                    onClick={() => isRecording ? stopRecording() : startRecording(false)}
                                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${isRecording
                                        ? 'bg-red-600 hover:bg-red-500 text-white animate-pulse shadow-red-500/20'
                                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
                                        }`}
                                >
                                    {isRecording ? (
                                        <>
                                            <StopCircle size={20} />
                                            Stop Recording ({elapsedTime}s)
                                        </>
                                    ) : (
                                        <>
                                            <Monitor size={20} />
                                            Start Manual Recording
                                        </>
                                    )}
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
                                Tip: Start a manual recording to capture the screen interactively, or use Cloud Render for perfect timing.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialExportStudio;
