import { useState } from 'react';
import DeckSelector from './components/DeckSelector';
import PresentationViewer from './components/PresentationViewer';
import { DECKS } from './data/decks';

function App() {
    const [currentDeckId, setCurrentDeckId] = useState(null);
    const [showVideo, setShowVideo] = useState(true);
    // Dynamically import all mp4 files from src/assets/backgrounds
    const videoModules = import.meta.glob('/src/assets/backgrounds/*.mp4', { eager: true, as: 'url' });

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

    return (
        <div className={`w-screen h-screen text-white relative overflow-hidden font-sans selection:bg-go-blue selection:text-white ${currentGradient}`}>
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

            {currentDeckId ? (
                <PresentationViewer
                    slides={DECKS[currentDeckId]}
                    onBack={() => setCurrentDeckId(null)}
                    showVideo={showVideo}
                    toggleVideo={() => setShowVideo(!showVideo)}
                    videos={videos}
                    onVideoSelect={handleVideoSelect}
                    gradients={GRADIENTS}
                    onGradientSelect={setCurrentGradient}
                    currentGradient={currentGradient}
                />
            ) : (
                <DeckSelector onSelectDeck={setCurrentDeckId} />
            )}
        </div>
    );
}

export default App;
