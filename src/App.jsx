import { useState, useEffect } from 'react';
import DeckSelector from './components/DeckSelector';
import PresentationViewer from './components/PresentationViewer';
import SocialConnectionPage from './components/SocialConnectionPage';
import { Share2 } from 'lucide-react';

import { getDeck } from './data/decks';
import { Loader2 } from 'lucide-react';

function App() {
    const [currentDeckId, setCurrentDeckId] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('deckId') || localStorage.getItem('lastDeckId') || null;
    });

    const [currentSlides, setCurrentSlides] = useState(null);
    const [isLoading, setIsLoading] = useState(() => !!localStorage.getItem('lastDeckId') || !!new URLSearchParams(window.location.search).get('deckId'));
    const isHeadless = new URLSearchParams(window.location.search).get('mode') === 'export';
    const initialSlideIndex = parseInt(new URLSearchParams(window.location.search).get('slide') || '0');
    const [view, setView] = useState(() => {
        if (window.location.pathname === '/social') return 'social';
        return 'main';
    });

    useEffect(() => {
        const handlePopState = () => {
            if (window.location.pathname === '/social') {
                setView('social');
            } else {
                setView('main');
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    useEffect(() => {
        const loadDeck = async () => {
            if (!currentDeckId) {
                setCurrentSlides(null);
                return;
            }

            setIsLoading(true);
            try {
                const slides = await getDeck(currentDeckId);
                setCurrentSlides(slides);
            } catch (error) {
                console.error("Failed to load deck:", error);
                setCurrentSlides(null);
            } finally {
                setIsLoading(false);
            }
        };

        loadDeck();
    }, [currentDeckId]);

    const handleDeckSelect = (deckId) => {
        setCurrentDeckId(deckId);
        if (deckId) {
            localStorage.setItem('lastDeckId', deckId);
        } else {
            localStorage.removeItem('lastDeckId');
        }
    };

    const handleBackToSelector = () => {
        setCurrentDeckId(null);
        localStorage.removeItem('lastDeckId');
    };


    const [showVideo, setShowVideo] = useState(true);
    // Dynamically import all mp4 files from src/assets/backgrounds
    const videoModules = import.meta.glob('/src/assets/backgrounds/*.mp4', { eager: true, query: '?url', import: 'default' });

    const videos = Object.entries(videoModules).map(([path, src], index) => {
        // Extract filename from path for the name
        const name = path.split('/').pop().replace('.mp4', '');
        return { id: index, name, src };
    });

    // Set default video if available
    const [videoSrc, setVideoSrc] = useState(videos.length > 0 ? videos[0].src : "");

    // Update videoSrc if videos change (e.g. hot reload)
    if (!videoSrc && videos.length > 0) {
        setVideoSrc(videos[0].src);
    }

    const handleVideoSelect = (src) => {
        setVideoSrc(src);
    };

    const GRADIENTS = [
        { name: "Default Dark", value: "bg-slate-950" },
        { name: "Midnight Fusion", value: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" },
        { name: "Ocean Depth", value: "bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900" },
        { name: "Forest Mist", value: "bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900" },
        { name: "Sunset Glow", value: "bg-gradient-to-br from-slate-900 via-orange-900/50 to-slate-900" },
        { name: "Royal Velvet", value: "bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950" },
    ];

    const [currentGradient, setCurrentGradient] = useState(GRADIENTS[0].value);

    const FONTS = [
        { name: "Inter", value: "font-sans" },
        { name: "Roboto", value: "font-roboto" },
        { name: "Poppins", value: "font-poppins" },
        { name: "Montserrat", value: "font-montserrat" },
        { name: "Playfair", value: "font-playfair" },
        { name: "Merriweather", value: "font-merriweather" },
    ];

    const [currentFont, setCurrentFont] = useState(FONTS[0].value);

    if (isLoading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-slate-950 text-white">
                <Loader2 className="animate-spin" size={48} />
            </div>
        );
    }

    return (
        <div className={`w-screen h-screen text-white relative overflow-hidden selection:bg-go-blue selection:text-white select-none ${currentGradient} ${currentFont}`}>
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                {showVideo && (
                    <video
                        key={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
                        src={videoSrc}
                    />
                )}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-go-blue/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            {view === 'social' ? (
                <SocialConnectionPage onBack={() => setView('main')} />
            ) : currentDeckId && currentSlides ? (
                <PresentationViewer
                    slides={currentSlides}
                    deckId={currentDeckId}
                    onBack={handleBackToSelector}
                    showVideo={showVideo}
                    toggleVideo={() => setShowVideo(!showVideo)}
                    videos={videos}
                    onVideoSelect={handleVideoSelect}
                    gradients={GRADIENTS}
                    onGradientSelect={setCurrentGradient}
                    currentGradient={currentGradient}
                    fonts={FONTS}
                    currentFont={currentFont}
                    onFontSelect={setCurrentFont}
                    isHeadless={isHeadless}
                    initialSlideIndex={initialSlideIndex}
                    onConnect={() => setView('social')}
                />
            ) : (
                <DeckSelector onSelectDeck={handleDeckSelect} />
            )}

            {view !== 'social' && !currentDeckId && (
                <button
                    onClick={() => setView('social')}
                    className="absolute top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-lg hover:scale-105 transition font-medium text-sm"
                >
                    <Share2 size={16} /> Social Ecosystem
                </button>
            )}
        </div>
    );
}

export default App;
