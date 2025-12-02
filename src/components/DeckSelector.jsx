import { motion, AnimatePresence } from 'framer-motion';
import { Play, FileDown, Loader2, Trash2, Plus, Layers, Cpu, Sparkles, Zap, Network, Heart, Search, SortAsc, X } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { DECKS } from '../data/decks';
import { REPOSITORIES } from '../data/repositories';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { createRoot } from 'react-dom/client';
import Slide from './Slide';

const ICON_MAP = {
    Layers,
    Cpu,
    Sparkles,
    Zap,
    Network,
    Heart
};

const DeckCard = ({ title, description, icon, onClick, color, isEditMode, repositories, currentRepoId, onMove }) => {
    // Resolve icon component from string name or use default
    const IconComponent = ICON_MAP[icon] || Layers;

    return (
        <motion.button
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={!isEditMode ? { scale: 1.05 } : {}}
            whileTap={!isEditMode ? { scale: 0.95 } : {}}
            onClick={!isEditMode ? onClick : undefined}
            className={`flex flex-col items-start p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 ${!isEditMode ? `hover:border-${color}-500/50` : 'border-white/20'} transition-all group text-left w-full h-full relative overflow-hidden`}
        >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all ${!isEditMode ? `group-hover:bg-${color}-500/20` : ''}`} />

            <div className={`p-4 rounded-xl bg-${color}-500/20 text-${color}-400 mb-6 ${!isEditMode ? 'group-hover:scale-110' : ''} transition-transform duration-300`}>
                <IconComponent size={32} />
            </div>

            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-gray-400 mb-8 flex-grow">{description}</p>

            {!isEditMode ? (
                <div className="flex items-center gap-2 text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                    <Play size={16} fill="currentColor" />
                    START PRESENTATION
                </div>
            ) : (
                <div className="w-full mt-auto pt-4 border-t border-white/10">
                    <label className="text-xs text-gray-500 mb-1 block">Move to:</label>
                    <select
                        className="w-full bg-black/40 border border-white/20 rounded px-2 py-1 text-sm text-gray-300 focus:outline-none focus:border-blue-500"
                        value={currentRepoId}
                        onChange={(e) => onMove(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {repositories.map(repo => (
                            <option key={repo.id} value={repo.id}>
                                {repo.title}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </motion.button>
    );
};

const DeckSelector = ({ onSelectDeck }) => {
    const [isExporting, setIsExporting] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSortedAsc, setIsSortedAsc] = useState(false);

    const [repositories, setRepositories] = useState(() => {
        const saved = localStorage.getItem('deck_repositories');
        return saved ? JSON.parse(saved) : REPOSITORIES;
    });

    // Persist to localStorage whenever repositories change
    useEffect(() => {
        localStorage.setItem('deck_repositories', JSON.stringify(repositories));
    }, [repositories]);

    // Filter and Sort Logic
    const processedRepositories = useMemo(() => {
        let processed = repositories.map(repo => ({
            ...repo,
            decks: repo.decks.filter(deck =>
                deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                repo.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })).filter(repo =>
            repo.decks.length > 0 ||
            repo.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (isSortedAsc) {
            // Sort Repositories A-Z
            processed.sort((a, b) => a.title.localeCompare(b.title));

            // Sort Decks A-Z within Repositories
            processed = processed.map(repo => ({
                ...repo,
                decks: [...repo.decks].sort((a, b) => a.title.localeCompare(b.title))
            }));
        }

        return processed;
    }, [repositories, searchQuery, isSortedAsc]);

    const handleAddRepository = () => {
        const newRepo = {
            id: `repo-${Date.now()}`,
            title: 'New Repository',
            decks: []
        };
        setRepositories([...repositories, newRepo]);
    };

    const handleDeleteRepository = (repoId) => {
        const repo = repositories.find(r => r.id === repoId);
        if (repo && repo.decks.length > 0) {
            alert("Cannot delete a non-empty repository. Please move or delete decks first.");
            return;
        }
        if (confirm("Are you sure you want to delete this repository?")) {
            setRepositories(repositories.filter(r => r.id !== repoId));
        }
    };

    const handleRenameRepository = (repoId, newTitle) => {
        setRepositories(repositories.map(repo =>
            repo.id === repoId ? { ...repo, title: newTitle } : repo
        ));
    };

    const handleMoveDeck = (sourceRepoId, deckId, targetRepoId) => {
        if (sourceRepoId === targetRepoId) return;

        const sourceRepo = repositories.find(r => r.id === sourceRepoId);
        const targetRepo = repositories.find(r => r.id === targetRepoId);
        const deckToMove = sourceRepo.decks.find(d => d.id === deckId);

        if (!deckToMove || !targetRepo) return;

        const newRepositories = repositories.map(repo => {
            if (repo.id === sourceRepoId) {
                return { ...repo, decks: repo.decks.filter(d => d.id !== deckId) };
            }
            if (repo.id === targetRepoId) {
                return { ...repo, decks: [...repo.decks, deckToMove] };
            }
            return repo;
        });

        setRepositories(newRepositories);
    };

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
            for (const repo of repositories) {
                for (const deck of repo.decks) {
                    // Find the component from DECKS map
                    // We need to handle the case where deck might be in a different structure in DECKS
                    // But currently DECKS is flat map of deckId -> slides
                    const slides = DECKS[deck.id];

                    if (!slides) continue;

                    // Iterate through all slides in the deck
                    for (let i = 0; i < slides.length; i++) {
                        const SlideComponent = slides[i];

                        // Render slide into container
                        const root = createRoot(container);

                        await new Promise(resolve => {
                            root.render(
                                <div className="w-[1920px] h-[1080px] bg-slate-950 text-white relative overflow-hidden font-sans">
                                    <Slide isActive={true} noAnimation={true}>
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
                className="text-center mb-12 relative w-full max-w-4xl"
            >
                <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Go Presentations
                </h1>
                <p className="text-xl text-gray-400 mb-8">Select a deck to begin</p>

                {/* Controls Bar */}
                <div className="flex items-center justify-center gap-4 w-full max-w-2xl mx-auto">
                    {/* Search Input */}
                    <div className="relative flex-grow group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search decks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* Sort Button */}
                    <button
                        onClick={() => setIsSortedAsc(!isSortedAsc)}
                        className={`p-3 rounded-xl border transition-all flex items-center gap-2 ${isSortedAsc
                                ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                            }`}
                        title="Sort Alphabetically"
                    >
                        <SortAsc size={20} />
                        <span className="hidden sm:inline text-sm font-medium">A-Z</span>
                    </button>

                    {/* Edit Mode Button */}
                    <button
                        onClick={() => setIsEditMode(!isEditMode)}
                        className={`px-4 py-3 rounded-xl border transition-all whitespace-nowrap ${isEditMode
                                ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        {isEditMode ? 'Done Editing' : 'Edit Structure'}
                    </button>
                </div>
            </motion.div>

            <div className="w-full max-w-7xl max-h-[60vh] overflow-y-auto pr-4 pb-4 custom-scrollbar space-y-12">
                <AnimatePresence>
                    {processedRepositories.map((repo) => (
                        <motion.div
                            key={repo.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className="w-full relative group/repo"
                        >
                            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-2">
                                {isEditMode ? (
                                    <div className="flex-grow flex items-center gap-4">
                                        <input
                                            type="text"
                                            value={repo.title}
                                            onChange={(e) => handleRenameRepository(repo.id, e.target.value)}
                                            className="bg-transparent text-2xl font-bold text-white/80 border-b border-blue-500/50 focus:border-blue-500 outline-none px-2 py-1 w-full max-w-md"
                                            placeholder="Repository Name"
                                        />
                                        <button
                                            onClick={() => handleDeleteRepository(repo.id)}
                                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Delete Repository"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <h2 className="text-2xl font-bold text-white/80">
                                        {repo.title}
                                    </h2>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <AnimatePresence>
                                    {repo.decks.map((deck) => (
                                        <DeckCard
                                            key={deck.id}
                                            title={deck.title}
                                            description={deck.description}
                                            icon={deck.icon}
                                            color={deck.color}
                                            onClick={() => onSelectDeck(deck.id)}
                                            isEditMode={isEditMode}
                                            repositories={repositories}
                                            currentRepoId={repo.id}
                                            onMove={(targetRepoId) => handleMoveDeck(repo.id, deck.id, targetRepoId)}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isEditMode && !searchQuery && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={handleAddRepository}
                        className="w-full py-8 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-white/40 hover:text-white/80 hover:border-white/20 hover:bg-white/5 transition-all gap-2"
                    >
                        <Plus size={32} />
                        <span className="font-medium">Create New Repository</span>
                    </motion.button>
                )}

                {processedRepositories.length === 0 && searchQuery && (
                    <div className="text-center py-12 text-gray-500">
                        <Search size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No decks found matching "{searchQuery}"</p>
                    </div>
                )}
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
