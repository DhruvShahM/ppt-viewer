import { motion, AnimatePresence } from 'framer-motion';
import { Play, FileDown, Loader2, Trash2, Plus, Layers, Cpu, Sparkles, Zap, Network, Heart, Search, SortAsc, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { createRoot } from 'react-dom/client';
import Slide from './Slide';
import { getAllDecks, getDeck } from '../data/decks';

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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const ITEMS_PER_PAGE = 10; // Increased from 1 since we have pagination now

    const [repositories, setRepositories] = useState([]);

    const fetchDecks = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getAllDecks(currentPage, ITEMS_PER_PAGE, searchQuery);
            setRepositories(data.repositories);
            setTotalPages(data.totalPages);
            // If current page is greater than total pages (e.g. after search), reset to 1
            if (currentPage > data.totalPages && data.totalPages > 0) {
                setCurrentPage(1);
            }
        } catch (error) {
            console.error("Failed to fetch decks", error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, searchQuery]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchDecks();
        }, 300); // Debounce search
        return () => clearTimeout(timeoutId);
    }, [fetchDecks]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleAddRepository = () => {
        // Not implemented for server-side yet
        alert("Creating repositories is not supported in this version.");
    };

    const handleDeleteRepository = (repoId) => {
        // Not implemented for server-side yet
        alert("Deleting repositories is not supported in this version.");
    };

    const handleRenameRepository = (repoId, newTitle) => {
        // Not implemented for server-side yet
        alert("Renaming repositories is not supported in this version.");
    };

    const handleMoveDeck = (sourceRepoId, deckId, targetRepoId) => {
        // Not implemented for server-side yet
        alert("Moving decks is not supported in this version.");
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

            // Iterate through all currently visible decks
            // Note: This only exports the *visible* decks on the current page.
            // To export ALL decks from the DB would require fetching them all, which defeats the purpose of pagination.
            // For now, let's export the visible ones.
            for (const repo of repositories) {
                for (const deck of repo.decks) {
                    // Load deck content on demand
                    const slides = await getDeck(deck.id);

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

            pdf.save('presentation-export.pdf');
            document.body.removeChild(container);

        } catch (error) {
            console.error("Export failed:", error);
            alert("Failed to export slides.");
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

                    {/* Sort Button - Visual only for now as server handles sort */}
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

            <div className="w-full max-w-7xl max-h-[60vh] overflow-y-auto pr-4 pb-4 custom-scrollbar space-y-12 min-h-[400px]">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="animate-spin text-blue-500" size={48} />
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        {repositories.map((repo) => (
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
                                                disabled
                                            />
                                            <button
                                                onClick={() => handleDeleteRepository(repo.id)}
                                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                title="Delete Repository"
                                                disabled
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
                )}

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

                {!isLoading && repositories.length === 0 && searchQuery && (
                    <div className="text-center py-12 text-gray-500">
                        <Search size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No decks found matching "{searchQuery}"</p>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-4 mt-8"
                >
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
                        {(() => {
                            const getVisiblePages = (current, total) => {
                                if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

                                if (current <= 4) {
                                    return [1, 2, 3, 4, 5, '...', total];
                                }

                                if (current >= total - 3) {
                                    return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
                                }

                                return [1, '...', current - 1, current, current + 1, '...', total];
                            };

                            return getVisiblePages(currentPage, totalPages).map((page, i) => (
                                <button
                                    key={i}
                                    onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                                    disabled={typeof page !== 'number'}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${page === currentPage
                                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                            : typeof page !== 'number'
                                                ? 'text-gray-500 cursor-default'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {page}
                                </button>
                            ));
                        })()}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-all"
                    >
                        <ChevronRight size={20} />
                    </button>
                </motion.div>
            )}

            {/* Export All Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExportAll}
                disabled={isExporting}
                className="absolute bottom-8 right-8 flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isExporting ? <Loader2 className="animate-spin" size={20} /> : <FileDown size={20} />}
                {isExporting ? 'Exporting...' : 'Export Visible'}
            </motion.button>
        </div>
    );
};

export default DeckSelector;
