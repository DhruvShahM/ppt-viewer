import { useState, useEffect } from 'react';
import DeckSelector from './components/DeckSelector';
import PresentationViewer from './components/PresentationViewer';
import { getDeck } from './data/decks';
import { Loader2 } from 'lucide-react';

function App() {
    const [currentDeckId, setCurrentDeckId] = useState(() => {
        return localStorage.getItem('lastDeckId') || null;
    });

    const [currentSlides, setCurrentSlides] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
    const [showVideo, setShowVideo] = useState(true);
    // Dynamically import all mp4 files from src/assets/backgrounds (Lazy Load)
    const videoModules = import.meta.glob('/src/assets/backgrounds/*.mp4', { query: '?url', import: 'default' });

    const videos = Object.entries(videoModules).map(([path, loader], index) => {
        // Extract filename from path for the name
        const name = path.split('/').pop().replace('.mp4', '');
        // We use path as the ID/src for selection purposes
        return { id: index, name, src: path, loader };
    });

    const [videoSrc, setVideoSrc] = useState("");

    // Load default video on mount
    useEffect(() => {
        if (videos.length > 0 && !videoSrc) {
            handleVideoSelect(videos[0].src);
        }
    }, []);

    const handleVideoSelect = async (path) => {
        const video = videos.find(v => v.src === path);
        if (video) {
            try {
                const module = await video.loader();
                setVideoSrc(module);
            } catch (error) {
                console.error("Failed to load video:", error);
            }
        }
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

    if (isLoading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-slate-950 text-white">
                <Loader2 className="animate-spin" size={48} />
            </div>
        );
    }

    return (
        <div className={`w-screen h-screen text-white relative overflow-hidden font-sans selection:bg-go-blue selection:text-white select-none ${currentGradient}`}>
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

            {currentDeckId && currentSlides ? (
                <PresentationViewer
                    slides={currentSlides}
                    deckId={currentDeckId}
                    onBack={() => handleDeckSelect(null)}
                    showVideo={showVideo}
                    toggleVideo={() => setShowVideo(!showVideo)}
                    videos={videos}
                    onVideoSelect={handleVideoSelect}
                    gradients={GRADIENTS}
                    onGradientSelect={setCurrentGradient}
                    currentGradient={currentGradient}
                />
            ) : (
                <DeckSelector onSelectDeck={handleDeckSelect} />
            )}
        </div>
    );
}

export default App;
