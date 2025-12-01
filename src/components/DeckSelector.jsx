import { motion } from 'framer-motion';
import { Play, Layers, Cpu, Sparkles, Zap, FileDown, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { DECKS } from '../data/decks';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { createRoot } from 'react-dom/client';
import Slide from './Slide';

const DeckCard = ({ title, description, icon: Icon, onClick, color }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`flex flex-col items-start p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 hover:border-${color}-500/50 transition-all group text-left w-full h-full relative overflow-hidden`}
        >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-${color}-500/20`} />

            <div className={`p-4 rounded-xl bg-${color}-500/20 text-${color}-400 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={32} />
            </div>

            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-gray-400 mb-8 flex-grow">{description}</p>

            <div className="flex items-center gap-2 text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                <Play size={16} fill="currentColor" />
                START PRESENTATION
            </div>
        </motion.button>
    );
};

const DeckSelector = ({ onSelectDeck }) => {
    const [isExporting, setIsExporting] = useState(false);

    const handleExportAll = async () => {
        if (isExporting) return;
        setIsExporting(true);

        try {
            const pdf = new jsPDF('l', 'px', [1920, 1080]);
            const container = document.createElement('div');
            container.style.position = 'absolute';
            container.style.top = '-9999px';
            container.style.left = '-9999px';
            container.style.width = '1920px';
            container.style.height = '1080px';
            document.body.appendChild(container);

            let pageAdded = false;

            // Iterate through all decks
            for (const [deckId, slides] of Object.entries(DECKS)) {
                // Iterate through all slides in the deck
                for (let i = 0; i < slides.length; i++) {
                    const SlideComponent = slides[i];

                    // Render slide into container
                    const root = createRoot(container);

                    await new Promise(resolve => {
                        root.render(
                            <div className="w-[1920px] h-[1080px] bg-slate-950 text-white relative overflow-hidden font-sans">
                                <Slide isActive={true}>
                                    <SlideComponent />
                                </Slide>
                            </div>
                        );
                        // Give it a moment to render
                        setTimeout(resolve, 100);
                    });

                    // Capture
                    const canvas = await html2canvas(container, {
                        scale: 1, // 1920x1080 is already large
                        useCORS: true,
                        logging: false,
                        width: 1920,
                        height: 1080
                    });

                    const imgData = canvas.toDataURL('image/png');

                    if (pageAdded) {
                        pdf.addPage([1920, 1080], 'l');
                    }
                    pdf.addImage(imgData, 'PNG', 0, 0, 1920, 1080);
                    pageAdded = true;

                    // Cleanup root for next iteration
                    root.unmount();
                }
            }

            pdf.save('complete-presentation.pdf');
            document.body.removeChild(container);

        } catch (error) {
            console.error("Export failed:", error);
            alert("Failed to export all slides.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-12 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Go Presentations
                </h1>
                <p className="text-xl text-gray-400">Select a deck to begin</p>
            </motion.div>

            <div className="w-full max-w-7xl max-h-[60vh] overflow-y-auto pr-4 pb-4 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <DeckCard
                        title="Mastering Concurrency"
                        description="The complete guide to Goroutines, Channels, Select, and Sync patterns."
                        icon={Layers}
                        color="blue"
                        onClick={() => onSelectDeck('concurrency')}
                    />

                    <DeckCard
                        title="Goroutines Deep Dive"
                        description="Under the hood: Scheduler, Stack Management, and Context Switching."
                        icon={Cpu}
                        color="purple"
                        onClick={() => onSelectDeck('goroutines')}
                    />

                    <DeckCard
                        title="Interview Prep"
                        description="Pointers, Interfaces, Methods, and Type Safety."
                        icon={Sparkles}
                        color="green"
                        onClick={() => onSelectDeck('interview')}
                    />

                    <DeckCard
                        title="Concurrency QA"
                        description="Goroutines, Channels, Sync, and Context."
                        icon={Zap}
                        color="orange"
                        onClick={() => onSelectDeck('concurrency-interview')}
                    />

                    <DeckCard
                        title="Gen-Z Mental Health"
                        description="The Vibe Check: Burnout, Boundaries, and Communication."
                        icon={Sparkles}
                        color="pink"
                        onClick={() => onSelectDeck('genz-mental-health')}
                    />

                    {/* Concurrency Masterclass Deck */}
                    <DeckCard
                        title="Concurrency Masterclass"
                        description="The complete guide: From Basics to Advanced Patterns & Tools."
                        icon={Zap}
                        color="orange"
                        onClick={() => onSelectDeck('concurrency-guide')}
                    />

                    <DeckCard
                        title="Go Concurrency (हिंदी)"
                        description="Goroutines, Channels, और GMP Scheduler हिंदी में।"
                        icon={Layers}
                        color="red"
                        onClick={() => onSelectDeck('hindi-concurrency')}
                    />
                </div>
            </div>

            {/* Export All Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExportAll}
                disabled={isExporting}
                className="absolute bottom-8 right-8 flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isExporting ? <Loader2 className="animate-spin" size={20} /> : <FileDown size={20} />}
                {isExporting ? 'Exporting...' : 'Export Entire PPT'}
            </motion.button>
        </div>
    );
};

export default DeckSelector;
