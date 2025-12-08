import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Slide from './Slide';
import AnnotationLayer from './AnnotationLayer';
import { ChevronRight, ChevronLeft, Home, Maximize, Minimize, PenTool, Circle, Square, Trash2, MousePointer2, Eraser, Video, ArrowUpRight, Upload, Palette, Type, Check, CaseSensitive, Lock, Unlock } from 'lucide-react';
import DesignFeedback from './DesignFeedback';


const PresentationViewer = ({ slides, deckId, onBack, showVideo, toggleVideo, videos, onVideoSelect, gradients, onGradientSelect, currentGradient, fonts, currentFont, onFontSelect }) => {
    const [currentSlide, setCurrentSlide] = useState(() => {
        const saved = localStorage.getItem(`lastSlide_${deckId}`);
        return saved ? Math.min(parseInt(saved, 10), slides.length - 1) : 0;
    });
    const [isPresenting, setIsPresenting] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [showCursor, setShowCursor] = useState(true);
    const [activeTool, setActiveTool] = useState('none');
    const [activeColor, setActiveColor] = useState('#ef4444');
    const [isLocked, setIsLocked] = useState(false);

    const [clearTrigger, setClearTrigger] = useState(0);

    // Smart Navigation State
    const [previewSlide, setPreviewSlide] = useState(null);
    const [previewPos, setPreviewPos] = useState(0);
    const progressBarRef = useRef(null);

    const COLORS = [
        { name: 'Red', value: '#ef4444' },
        { name: 'Blue', value: '#3b82f6' },
        { name: 'Green', value: '#22c55e' },
        { name: 'Yellow', value: '#eab308' },
        { name: 'White', value: '#ffffff' },
        { name: 'Black', value: '#000000' },
    ];

    const controlsTimeoutRef = useRef(null);
    const cursorTimeoutRef = useRef(null);
    const containerRef = useRef(null);
    const fileInputRef = useRef(null);
    const isHoveringControls = useRef(false);
    const totalSlides = slides.length;

    const [annotations, setAnnotations] = useState({}); // { [slideIndex]: { image, texts } }
    const annotationRef = useRef(null);

    const saveCurrentAnnotations = () => {
        if (annotationRef.current) {
            const data = annotationRef.current.getData();
            console.log(`Saving annotations for slide ${currentSlide}:`, data);
            setAnnotations(prev => ({
                ...prev,
                [currentSlide]: data
            }));
        }
    };

    const nextSlide = () => {
        if (currentSlide < totalSlides - 1) {
            saveCurrentAnnotations();
            setCurrentSlide(c => c + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            saveCurrentAnnotations();
            setCurrentSlide(c => c - 1);
        }
    };



    useEffect(() => {
        localStorage.setItem(`lastSlide_${deckId}`, currentSlide);
    }, [currentSlide, deckId]);

    // Handle Full Screen
    useEffect(() => {
        if (isPresenting) {
            document.documentElement.requestFullscreen().catch((e) => {
                console.error("Failed to enter full screen:", e);
            });
        } else {
            if (document.fullscreenElement) {
                document.exitFullscreen().catch((e) => {
                    console.error("Failed to exit full screen:", e);
                });
            }
            setActiveTool('none'); // Reset tool when exiting presentation mode
        }
    }, [isPresenting]);

    // Handle Inactivity Timer
    useEffect(() => {
        const handleMouseMove = (e) => {
            // 1. Cursor Logic: Always show on move, hide after 3s
            setShowCursor(true);
            if (cursorTimeoutRef.current) clearTimeout(cursorTimeoutRef.current);
            if (isPresenting) {
                cursorTimeoutRef.current = setTimeout(() => setShowCursor(false), 3000);
            }

            // 2. Toolbar Logic: Show only if at bottom or hovering controls
            const isBottom = e.clientY > window.innerHeight - 150;

            if (isBottom || isHoveringControls.current) {
                setShowControls(true);
                if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);

                if (isPresenting && !isHoveringControls.current) {
                    controlsTimeoutRef.current = setTimeout(() => {
                        setShowControls(false);
                    }, 2000);
                }
            } else {
                // Hide controls if not at bottom and not hovering
                if (isPresenting) {
                    setShowControls(false);
                    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
            if (cursorTimeoutRef.current) clearTimeout(cursorTimeoutRef.current);
        };
    }, [isPresenting]);

    const handleMouseEnterControls = () => {
        isHoveringControls.current = true;
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        setShowControls(true);
    };

    const handleMouseLeaveControls = () => {
        isHoveringControls.current = false;
        // Restart timer when leaving
        if (isPresenting) {
            controlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, 2000);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
            // if (e.key === 'p' || e.key === 'P') setIsPresenting(p => !p);
            // Escape is handled by browser for fullscreen, but we sync state below
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlide, onBack]);

    // Sync state with browser full screen events
    useEffect(() => {
        const handleFullScreenChange = () => {
            if (!document.fullscreenElement) {
                setIsPresenting(false);
            }
        };
        document.addEventListener('fullscreenchange', handleFullScreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
    }, []);



    return (
        <div
            ref={containerRef}
            className={`w-full h-full relative group ${isPresenting && !showCursor ? 'cursor-none' : ''}`}
        >
            {/* Slides */}
            <div className="relative z-10 w-full h-full">
                <AnimatePresence mode="popLayout">
                    {slides.map((SlideComponent, index) => (
                        index === currentSlide && (
                            <Slide key={index} isActive={true}>
                                <SlideComponent />
                            </Slide>
                        )
                    ))}
                </AnimatePresence>
            </div>

            {/* Annotation Layer */}
            <AnnotationLayer
                ref={annotationRef}
                key={currentSlide}
                activeTool={activeTool}
                color={activeTool === 'eraser' ? '#000000' : activeColor}
                clearTrigger={clearTrigger}
                width={containerRef.current?.offsetWidth || 1920}
                height={containerRef.current?.offsetHeight || 1080}
                initialData={annotations[currentSlide]}
            />

            {/* Annotation Toolbar (Only in Presentation Mode) */}
            {isPresenting && !isLocked && (
                <div
                    onMouseEnter={handleMouseEnterControls}
                    onMouseLeave={handleMouseLeaveControls}
                    className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-50 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10 transition-opacity duration-500 ${!showControls ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                >
                    <button
                        onClick={() => setActiveTool('none')}
                        className={`p-3 rounded-full transition-all ${activeTool === 'none' ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                        title="Cursor"
                    >
                        <MousePointer2 size={20} />
                    </button>
                    <button
                        onClick={() => setActiveTool('pencil')}
                        className={`p-3 rounded-full transition-all ${activeTool === 'pencil' ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                        title="Pencil"
                    >
                        <PenTool size={20} />
                    </button>

                    <button
                        onClick={() => setActiveTool('circle')}
                        className={`p-3 rounded-full transition-all ${activeTool === 'circle' ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                        title="Circle"
                    >
                        <Circle size={20} />
                    </button>
                    <button
                        onClick={() => setActiveTool('rectangle')}
                        className={`p-3 rounded-full transition-all ${activeTool === 'rectangle' ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                        title="Rectangle"
                    >
                        <Square size={20} />
                    </button>
                    <button
                        onClick={() => setActiveTool('arrow')}
                        className={`p-3 rounded-full transition-all ${activeTool === 'arrow' ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                        title="Arrow"
                    >
                        <ArrowUpRight size={20} />
                    </button>
                    <button
                        onClick={() => setActiveTool('text')}
                        className={`p-3 rounded-full transition-all ${activeTool === 'text' ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                        title="Text"
                    >
                        <Type size={20} />
                    </button>
                    <button
                        onClick={() => setActiveTool('eraser')}
                        className={`p-3 rounded-full transition-all ${activeTool === 'eraser' ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                        title="Eraser"
                    >
                        <Eraser size={20} />
                    </button>
                    <div className="w-px h-8 bg-white/20 mx-1 self-center" />

                    {/* Color Picker */}
                    <div className="flex gap-1 mr-1">
                        {COLORS.map((c) => (
                            <button
                                key={c.value}
                                onClick={() => setActiveColor(c.value)}
                                className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${activeColor === c.value ? 'border-white scale-110' : 'border-transparent hover:scale-110'}`}
                                style={{ backgroundColor: c.value }}
                                title={c.name}
                            >
                                {activeColor === c.value && <Check size={12} className={c.value === '#ffffff' ? 'text-black' : 'text-white'} />}
                            </button>
                        ))}
                    </div>

                    <div className="w-px h-8 bg-white/20 mx-1 self-center" />
                    <button
                        onClick={() => setClearTrigger(t => t + 1)}
                        className="p-3 rounded-full bg-white/10 hover:bg-red-500/20 text-white hover:text-red-400 transition-all"
                        title="Clear Annotations"
                    >
                        <Trash2 size={20} />
                    </button>
                    <div className="w-px h-8 bg-white/20 mx-1 self-center" />
                    <button
                        onClick={() => {
                            setIsLocked(true);
                            setActiveTool('none');
                        }}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                        title="Lock Toolbar"
                    >
                        <Lock size={20} />
                    </button>


                </div>
            )}

            {/* Unlock Button */}
            {isPresenting && isLocked && (
                <button
                    onClick={() => setIsLocked(false)}
                    className={`absolute bottom-8 left-8 p-3 rounded-full bg-black/20 hover:bg-black/50 text-white/50 hover:text-white transition-all backdrop-blur-sm z-50 ${!showControls ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                    title="Unlock Toolbar"
                >
                    <Unlock size={20} />
                </button>
            )}

            {/* Navigation Controls */}
            <div
                onMouseEnter={handleMouseEnterControls}
                onMouseLeave={handleMouseLeaveControls}
                className={`absolute bottom-8 right-8 flex gap-4 z-50 transition-opacity duration-500 ${isPresenting && !showControls ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
            >
                {!isPresenting && (
                    <>
                        <div className="relative group self-center mr-4">
                            <select
                                onChange={(e) => onFontSelect && onFontSelect(e.target.value)}
                                className="appearance-none bg-black/50 text-white pl-10 pr-8 py-2 rounded-full border border-white/20 hover:bg-white/10 focus:outline-none cursor-pointer text-sm font-sans"
                                value={currentFont}
                            >
                                {fonts?.map((f) => (
                                    <option key={f.name} value={f.value} className="bg-slate-900 text-white">
                                        {f.name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <CaseSensitive size={14} />
                            </div>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                                <ChevronRight size={14} className="rotate-90" />
                            </div>
                        </div>

                        <div className="relative group self-center mr-4">
                            <select
                                onChange={(e) => onGradientSelect && onGradientSelect(e.target.value)}
                                className="appearance-none bg-black/50 text-white pl-10 pr-8 py-2 rounded-full border border-white/20 hover:bg-white/10 focus:outline-none cursor-pointer text-sm"
                                value={currentGradient}
                            >
                                {gradients?.map((g) => (
                                    <option key={g.name} value={g.value} className="bg-slate-900 text-white">
                                        {g.name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <Palette size={14} />
                            </div>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                                <ChevronRight size={14} className="rotate-90" />
                            </div>
                        </div>

                        {showVideo && (
                            <div className="relative group self-center mr-4">
                                <select
                                    onChange={(e) => onVideoSelect && onVideoSelect(e.target.value)}
                                    className="appearance-none bg-black/50 text-white pl-3 pr-8 py-2 rounded-full border border-white/20 hover:bg-white/10 focus:outline-none cursor-pointer text-sm"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select Background</option>
                                    {videos?.map((v) => (
                                        <option key={v.id} value={v.src} className="bg-slate-900 text-white">
                                            {v.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <ChevronRight size={14} className="rotate-90" />
                                </div>
                            </div>
                        )}
                        <button
                            onClick={toggleVideo}
                            className={`p-3 rounded-full transition-all ${showVideo ? 'bg-purple-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'} mr-4`}
                            title="Toggle Background Video"
                        >
                            <Video size={24} />
                        </button>
                        <button
                            onClick={() => setIsPresenting(true)}
                            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm mr-4"
                            title="Enter Presentation Mode (P)"
                        >
                            <Maximize size={24} />
                        </button>
                        <button
                            onClick={onBack}
                            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm mr-4"
                            title="Back to Home"
                        >
                            <Home size={24} />
                        </button>
                    </>
                )}

                {/* Design Feedback - Always mounted to preserve state/recording, hidden when presenting if desired */}
                <div className={isPresenting ? 'hidden' : 'block'}>
                    <DesignFeedback deckId={deckId} slideIndex={currentSlide + 1} />
                </div>

                {isPresenting && (
                    <button
                        onClick={() => setIsPresenting(false)}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm mr-4"
                        title="Exit Presentation Mode (Esc)"
                    >
                        <Minimize size={24} />
                    </button>
                )}

                {/* Smart Navigation & Counter */}
                <div className="flex items-center gap-1 bg-black/50 border border-white/20 p-1 pl-4 rounded-full backdrop-blur-sm self-center">
                    <div className="text-white text-sm font-medium tabular-nums mr-2">
                        {currentSlide + 1} / {totalSlides}
                    </div>
                    <div className="h-4 w-px bg-white/20 mx-1" />
                    <button
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white"
                        title="Previous Slide"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={nextSlide}
                        disabled={currentSlide === totalSlides - 1}
                        className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white"
                        title="Next Slide"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>

            </div>



            {/* Smart Scrubber / Timeline */}
            <div
                className={`absolute bottom-0 left-0 w-full z-50 transition-all duration-500 group/scrubber ${isPresenting && !showControls ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
                onMouseLeave={() => setPreviewSlide(null)}
            >
                {/* Hover Hit Area & Progress Bar */}
                <div
                    ref={progressBarRef}
                    className="relative w-full h-2 cursor-pointer bg-white/10 hover:h-4 transition-all duration-200"
                    onMouseMove={(e) => {
                        if (!progressBarRef.current) return;
                        const rect = progressBarRef.current.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const width = rect.width;
                        const percentage = Math.max(0, Math.min(1, x / width));
                        const slideIndex = Math.min(totalSlides - 1, Math.floor(percentage * totalSlides));

                        setPreviewSlide(slideIndex);
                        setPreviewPos(x);
                    }}
                    onClick={(e) => {
                        if (!progressBarRef.current) return;
                        const rect = progressBarRef.current.getBoundingClientRect();
                        const percentage = (e.clientX - rect.left) / rect.width;
                        const slideIndex = Math.min(totalSlides - 1, Math.floor(percentage * totalSlides));

                        // Save annotations before jumping
                        saveCurrentAnnotations();
                        setCurrentSlide(slideIndex);
                    }}
                >
                    {/* Progress Fill */}
                    <div
                        className="absolute top-0 left-0 h-full bg-go-blue transition-all duration-100 ease-out"
                        style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                    />

                    {/* Hover Indicator */}
                    {previewSlide !== null && (
                        <div
                            className="absolute top-0 h-full w-1 bg-white/50"
                            style={{ left: previewPos }}
                        />
                    )}
                </div>

                {/* Thumbnail Preview Tooltip */}
                {previewSlide !== null && slides[previewSlide] && (
                    <div
                        className="absolute bottom-6 -translate-x-1/2 pointer-events-none transition-all duration-75 origin-bottom"
                        style={{ left: previewPos }}
                    >
                        <div className="bg-slate-900 border border-white/20 rounded-lg p-1 shadow-2xl relative">
                            {/* Scaled Preview Container - Maintains Aspect Ratio */}
                            <div className="w-[240px] h-[135px] bg-slate-950 rounded overflow-hidden relative">
                                <div className="absolute inset-0 w-[1920px] h-[1080px] origin-top-left scale-[0.125]">
                                    <Slide isActive={true} noAnimation={true}>
                                        {(() => {
                                            const PreviewComponent = slides[previewSlide];
                                            return <PreviewComponent />;
                                        })()}
                                    </Slide>
                                </div>
                            </div>

                            {/* Slide Number Label */}
                            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-md">
                                {previewSlide + 1}
                            </div>
                        </div>
                        {/* Arrow */}
                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-900 mx-auto mt-[-1px]" />
                    </div>
                )}
            </div>

            {/* Design Feedback Loop - Moved to Toolbar */}
        </div >
    );
};

export default PresentationViewer;
