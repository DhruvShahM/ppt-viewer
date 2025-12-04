
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import PresentationViewer from './components/PresentationViewer';
import slides from '@deck'; // This will be aliased during build
import './index.css';

const ArchiveApp = () => {
    const [showVideo, setShowVideo] = useState(true);
    const [currentGradient, setCurrentGradient] = useState("bg-slate-950");

    // Mock data for archive view
    const videos = [];
    const GRADIENTS = [
        { name: "Default Dark", value: "bg-slate-950" },
    ];

    return (
        <div className={`w-screen h-screen text-white relative overflow-hidden font-sans selection:bg-go-blue selection:text-white select-none ${currentGradient}`}>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-go-blue/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <PresentationViewer
                slides={slides}
                deckId="archive"
                onBack={() => console.log("Back disabled in archive")}
                showVideo={showVideo}
                toggleVideo={() => setShowVideo(!showVideo)}
                videos={videos}
                onVideoSelect={() => { }}
                gradients={GRADIENTS}
                onGradientSelect={setCurrentGradient}
                currentGradient={currentGradient}
            />
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ArchiveApp />
    </React.StrictMode>
);
