import { motion, AnimatePresence } from 'framer-motion';
import { Play, Loader2, Trash2, Plus, Layers, Cpu, Sparkles, Zap, Network, Heart, Search, SortAsc, X, ChevronLeft, ChevronRight, CheckSquare, Square, RefreshCcw, Archive, RotateCcw, Upload, Download, FileText } from 'lucide-react';
import { useState, useEffect, useMemo, useRef } from 'react';

import { REPOSITORIES } from '../data/repositories';
import deckIndex from '../data/deck-index.json';

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

const DeckCard = ({ title, description, icon, onClick, color, isEditMode, repositories, currentRepoId, onMove, isSelectionMode, isSelected, onToggleSelect, onDelete, onArchive, onRestore, onExport, onReplace, status }) => {
    // Resolve icon component from string name or use default
    const IconComponent = ICON_MAP[icon] || Layers;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={!isEditMode ? { scale: 1.05 } : {}}
            whileTap={!isEditMode && !isSelectionMode ? { scale: 0.95 } : {}}
            onClick={!isEditMode && !isSelectionMode ? onClick : (isSelectionMode ? onToggleSelect : undefined)}
            className={`flex flex-col items-start p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 ${!isEditMode && status !== 'archived' ? `hover:border-${color}-500/50` : 'border-white/20'} transition-all group text-left w-full h-full relative overflow-hidden cursor-pointer ${status === 'archived' ? 'opacity-70 grayscale' : ''}`}
        >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all ${!isEditMode ? `group-hover:bg-${color}-500/20` : ''}`} />

            <div className="flex justify-between w-full mb-6 relative z-10">
                <div className={`p-4 rounded-xl bg-${color}-500/20 text-${color}-400 ${!isEditMode && !isSelectionMode ? 'group-hover:scale-110' : ''} transition-transform duration-300`}>
                    <IconComponent size={32} />
                </div>

            </div>

            {isSelectionMode && (
                <div className="absolute top-4 right-4 text-white z-20">
                    {isSelected ? <CheckSquare size={24} className="text-blue-400" /> : <Square size={24} className="text-white/20" />}
                </div>
            )}

            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-gray-400 mb-8 flex-grow">{description}</p>
            {!isEditMode && !isSelectionMode ? (
                <div className="flex items-center gap-2 text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                    <Play size={16} fill="currentColor" />
                    START PRESENTATION
                </div>
            ) : status === 'archived' && !isSelectionMode ? (
                <div className="flex items-center gap-2 text-sm font-medium text-white/60">
                    <Archive size={16} />
                    ARCHIVED
                </div>
            ) : (
                <div className="w-full mt-auto pt-4 border-t border-white/10 flex items-end gap-2 text w-full">
                    {!isEditMode && !isSelectionMode && (
                        <div className="flex-grow"></div>
                    )}
                    {(isEditMode || isSelectionMode) && (
                        <div className="flex-grow">
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

                    {!isEditMode && !isSelectionMode && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onExport();
                            }}
                            className={`p-2 bg-${color}-500/10 hover:bg-${color}-500/20 text-${color}-400 rounded border border-${color}-500/20 transition-colors self-end ml-auto`}
                            title="Export Deck"
                        >
                            <Download size={16} />
                        </button>
                    )}

                    {isEditMode && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete();
                                }}
                                className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded border border-red-500/20 transition-colors"
                                title="Delete Deck"
                            >
                                <Trash2 size={16} />
                            </button>

                            {status === 'archived' ? (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRestore();
                                    }}
                                    className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded border border-blue-500/20 transition-colors"
                                    title="Restore Deck"
                                >
                                    <RotateCcw size={16} />
                                </button>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onArchive();
                                    }}
                                    className="p-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded border border-orange-500/20 transition-colors"
                                    title="Archive Deck"
                                >
                                    <Archive size={16} />
                                </button>
                            )}

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onReplace();
                                }}
                                className="p-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded border border-purple-500/20 transition-colors"
                                title="Replace Code/Slides"
                            >
                                <Upload size={16} />
                            </button>
                        </>
                    )}
                </div>
            )}
        </motion.div >
    );
};

const DeckSelector = ({ onSelectDeck, onManagePrompts }) => {

    const [viewMode, setViewMode] = useState('active'); // 'active' | 'archived'
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedDecks, setSelectedDecks] = useState(new Set());
    const [isDeleting, setIsDeleting] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [importForm, setImportForm] = useState({
        deckId: '',
        title: '',
        description: '',
        repoId: '',
        files: null
    });
    const [replaceDeckId, setReplaceDeckId] = useState(null);
    const [replaceFiles, setReplaceFiles] = useState(null);
    const [isSmartReplace, setIsSmartReplace] = useState(true);


    const [searchQuery, setSearchQuery] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('search') || "";
    });
    const [isSortedAsc, setIsSortedAsc] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('sort') === 'asc';
    });
    const [viewPage, setViewPage] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const page = parseInt(params.get('page')) || 1;
        return page > 0 ? page : 1;
    });
    const [editPage, setEditPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    const [repositories, setRepositories] = useState(() => {
        const repoMap = new Map();
        deckIndex.forEach(deck => {
            const safeRepoId = deck.repoId || 'uncategorized';
            if (!repoMap.has(safeRepoId)) {
                repoMap.set(safeRepoId, {
                    id: safeRepoId,
                    title: deck.repoTitle || 'Uncategorized',
                    decks: []
                });
            }
            repoMap.get(safeRepoId).decks.push(deck);
        });
        return Array.from(repoMap.values());
    });

    // ... (This part was not in the replace block target but we must match the existing file to restart the useEffect if we want to replace it too, but better to stick to the block)
    // Actually, I should target the useEffect below it too if I want to fix that as well.

    // Filter and Sort Logic
    const processedRepositories = useMemo(() => {
        let processed = repositories.map(repo => ({
            ...repo,
            decks: repo.decks.filter(deck =>
                (deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    repo.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
                ((viewMode === 'active' && deck.status !== 'archived') ||
                    (viewMode === 'archived' && deck.status === 'archived'))
            )
        })).filter(repo =>
            repo.decks.length > 0 ||
            repo.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (isSortedAsc) {
            // Sort Repositories A-Z
            processed.sort((a, b) => (a.title || "").localeCompare(b.title || ""));

            // Sort Decks A-Z within Repositories
            processed = processed.map(repo => ({
                ...repo,
                decks: [...repo.decks].sort((a, b) => (a.title || "").localeCompare(b.title || ""))
            }));
        } else {
            // Sort by lastOpenedAt or importedAt (latest first)
            processed = processed.map(repo => ({
                ...repo,
                decks: [...repo.decks].sort((a, b) => {
                    const dateA = Math.max(
                        a.lastOpenedAt ? new Date(a.lastOpenedAt).getTime() : 0,
                        a.importedAt ? new Date(a.importedAt).getTime() : 0
                    );
                    const dateB = Math.max(
                        b.lastOpenedAt ? new Date(b.lastOpenedAt).getTime() : 0,
                        b.importedAt ? new Date(b.importedAt).getTime() : 0
                    );
                    return dateB - dateA;
                })
            }));

            // Also sort repositories by their latest deck
            processed.sort((a, b) => {
                const getLatestDate = (repo) => {
                    return repo.decks.reduce((latest, deck) => {
                        const deckDate = Math.max(
                            deck.lastOpenedAt ? new Date(deck.lastOpenedAt).getTime() : 0,
                            deck.importedAt ? new Date(deck.importedAt).getTime() : 0
                        );
                        return Math.max(latest, deckDate);
                    }, 0);
                };
                return getLatestDate(b) - getLatestDate(a);
            });
        }

        return processed;
    }, [repositories, searchQuery, isSortedAsc, viewMode]);

    // Flatten decks for global view
    const allDecks = useMemo(() => {
        const flattened = processedRepositories.flatMap(repo =>
            repo.decks.map(deck => ({ ...deck, repoId: repo.id, repoTitle: repo.title }))
        );

        if (!isSortedAsc) {
            // Sort by lastOpenedAt or importedAt (latest first)
            return flattened.sort((a, b) => {
                const dateA = Math.max(
                    a.lastOpenedAt ? new Date(a.lastOpenedAt).getTime() : 0,
                    a.importedAt ? new Date(a.importedAt).getTime() : 0
                );
                const dateB = Math.max(
                    b.lastOpenedAt ? new Date(b.lastOpenedAt).getTime() : 0,
                    b.importedAt ? new Date(b.importedAt).getTime() : 0
                );
                return dateB - dateA;
            });
        }

        return flattened;
    }, [processedRepositories, isSortedAsc]);

    // Derived State
    const currentPage = isEditMode ? editPage : viewPage;

    // Calculate totals for both modes
    const totalViewPages = Math.ceil(allDecks.length / ITEMS_PER_PAGE);
    const totalEditPages = Math.ceil(processedRepositories.length / ITEMS_PER_PAGE);
    const totalPages = isEditMode ? totalEditPages : totalViewPages;

    // Unified URL Updater
    useEffect(() => {
        console.log('DEBUG: URL Update', {
            isEditMode,
            viewPage,
            editPage,
            currentPage,
            totalPages,
            processedReposLength: processedRepositories.length,
            allDecksLength: allDecks.length
        });

        const url = new URL(window.location);

        if (searchQuery) url.searchParams.set('search', searchQuery);
        else url.searchParams.delete('search');

        if (isSortedAsc) url.searchParams.set('sort', 'asc');
        else url.searchParams.delete('sort');

        if (currentPage > 1) url.searchParams.set('page', currentPage);
        else url.searchParams.delete('page');

        window.history.replaceState({}, '', url);
    }, [searchQuery, isSortedAsc, currentPage]);

    // Handle browser back/forward buttons
    useEffect(() => {
        const handlePopState = () => {
            const params = new URLSearchParams(window.location.search);
            const page = parseInt(params.get('page')) || 1;
            setSearchQuery(params.get('search') || "");
            setIsSortedAsc(params.get('sort') === 'asc');

            // On popstate, we mostly care about viewPage since editMode isn't persisted
            // But if we were to support editMode param, we'd handle it here.
            // For now, update corresponding page.
            if (isEditMode) setEditPage(page > 0 ? page : 1);
            else setViewPage(page > 0 ? page : 1);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [isEditMode]);



    const prevSearch = useRef(searchQuery);
    const prevSort = useRef(isSortedAsc);

    // Reset page when search/sort changes
    useEffect(() => {
        const searchChanged = prevSearch.current !== searchQuery;
        const sortChanged = prevSort.current !== isSortedAsc;

        if (searchChanged || sortChanged) {
            setViewPage(1);
            setEditPage(1);
            prevSearch.current = searchQuery;
            prevSort.current = isSortedAsc;
        }
    }, [searchQuery, isSortedAsc]);

    // Adjust current page if it exceeds total pages
    useEffect(() => {
        if (viewPage > totalViewPages && totalViewPages > 0) {
            setViewPage(totalViewPages);
        }
        if (editPage > totalEditPages && totalEditPages > 0) {
            setEditPage(totalEditPages);
        }
    }, [totalViewPages, totalEditPages, viewPage, editPage]);

    const currentItems = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        if (isEditMode) {
            return processedRepositories.slice(start, start + ITEMS_PER_PAGE);
        } else {
            return allDecks.slice(start, start + ITEMS_PER_PAGE);
        }
    }, [processedRepositories, allDecks, currentPage, isEditMode, ITEMS_PER_PAGE]);


    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            if (isEditMode) setEditPage(page);
            else setViewPage(page);
        }
    };

    const handleAddRepository = () => {
        const name = prompt("Enter new repository name:", "New Repository");
        if (!name) return;

        const newRepo = {
            id: `repo-${Date.now()}`,
            title: name,
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

    const handlePersistRepositoryName = async (repoId, newTitle) => {
        if (!repoId || !newTitle) return;
        try {
            const response = await fetch('/api/repositories/rename', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ repoId, newTitle })
            });
            if (!response.ok) {
                console.error("Failed to persist repo name");
            }
        } catch (error) {
            console.error("Error persisting repo name:", error);
        }
    };

    const handleMoveDeck = async (sourceRepoId, deckId, targetRepoId) => {
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

        // Persist change
        try {
            await fetch(`/api/decks/${deckId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    repoId: targetRepoId,
                    repoTitle: targetRepo.title
                })
            });
        } catch (error) {
            console.error("Failed to move deck:", error);
            alert("Failed to save move. Please refresh.");
        }
    };


    const toggleSelection = (deckId) => {
        const newSelected = new Set(selectedDecks);
        if (newSelected.has(deckId)) {
            newSelected.delete(deckId);
        } else {
            newSelected.add(deckId);
        }
        setSelectedDecks(newSelected);
    };






    const [isProcessing, setIsProcessing] = useState(false);

    const handleArchiveSelected = async () => {
        if (selectedDecks.size === 0) return;
        if (!confirm(`Archive ${selectedDecks.size} decks?`)) return;

        setIsProcessing(true);
        try {
            const response = await fetch('/api/archive', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deckIds: Array.from(selectedDecks) })
            });

            if (response.ok) {
                // Update local state instead of reloading
                const archivedIds = new Set(selectedDecks);

                setRepositories(prevRepos => prevRepos.map(repo => ({
                    ...repo,
                    decks: repo.decks.map(deck =>
                        archivedIds.has(deck.id) ? { ...deck, status: 'archived' } : deck
                    )
                })));

                alert('Decks archived successfully!');
                setIsSelectionMode(false);
                setSelectedDecks(new Set());
            } else {
                alert('Failed to archive decks');
            }
        } catch (error) {
            console.error('Archive failed:', error);
            alert('Failed to archive decks');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleRestoreSelected = async () => {
        if (selectedDecks.size === 0) return;
        if (!confirm(`Restore ${selectedDecks.size} decks?`)) return;

        setIsProcessing(true);
        try {
            const response = await fetch('/api/restore', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deckIds: Array.from(selectedDecks) })
            });

            if (response.ok) {
                // Update local state instead of reloading
                const restoredIds = new Set(selectedDecks);

                setRepositories(prevRepos => prevRepos.map(repo => ({
                    ...repo,
                    decks: repo.decks.map(deck =>
                        restoredIds.has(deck.id) ? { ...deck, status: 'active' } : deck
                    )
                })));

                alert('Decks restored successfully!');
                setIsSelectionMode(false);
                setSelectedDecks(new Set());
            } else {
                alert('Failed to restore decks');
            }
        } catch (error) {
            console.error('Restore failed:', error);
            alert('Failed to restore decks');
        } finally {
            setIsProcessing(false);
        }
    };


    const handleDeleteSelected = async () => {
        if (selectedDecks.size === 0) return;
        if (!confirm(`PERMANENTLY DELETE ${selectedDecks.size} decks? This action cannot be undone.`)) return;

        setIsDeleting(true);
        try {
            const response = await fetch('/api/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deckIds: Array.from(selectedDecks) })
            });

            if (response.ok) {
                // Update local state instead of reloading
                const deletedIds = new Set(selectedDecks);

                setRepositories(prevRepos => prevRepos.map(repo => ({
                    ...repo,
                    decks: repo.decks.filter(deck => !deletedIds.has(deck.id))
                })));

                alert('Decks deleted successfully!');
                setIsSelectionMode(false);
                setSelectedDecks(new Set());
            } else {
                alert('Failed to delete decks');
            }
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete decks');
        } finally {
            setIsDeleting(false);
        }
    };





    const handleExportSelected = async () => {
        if (selectedDecks.size === 0) return;

        setIsProcessing(true);
        try {
            const decksToExport = Array.from(selectedDecks);

            const response = await fetch('/api/export', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deckIds: decksToExport })
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;

                // Try to get filename from header
                const contentDisposition = response.headers.get('Content-Disposition');
                let filename = decksToExport.length === 1 ? `${decksToExport[0]}.md` : 'decks-export.zip';

                if (contentDisposition) {
                    const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
                    if (filenameMatch && filenameMatch[1]) {
                        filename = filenameMatch[1];
                    }
                }

                a.download = filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);

                setIsSelectionMode(false);
                setSelectedDecks(new Set());
                alert("Export process completed!");
            } else {
                const err = await response.json();
                alert(`Export failed: ${err.message}`);
            }
        } catch (error) {
            console.error('Export failed:', error);
            alert('Export failed for some decks');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleExportDeck = async (deckId) => {
        try {
            const response = await fetch('/api/export', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deckIds: [deckId] })
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;

                // Try to get filename from header
                const contentDisposition = response.headers.get('Content-Disposition');
                let filename = `${deckId}.md`;
                if (contentDisposition) {
                    const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
                    if (filenameMatch && filenameMatch[1]) {
                        filename = filenameMatch[1];
                    }
                }

                a.download = filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else {
                const err = await response.json();
                alert(`Export failed: ${err.message}`);
            }
        } catch (error) {
            console.error('Export failed:', error);
            alert('Export failed');
        }
    };

    const handleScriptGeneration = async () => {
        if (selectedDecks.size === 0) return;

        const style = prompt("Enter script style (educational, promotional, podcaster):", "educational");
        if (!style) return;

        setIsProcessing(true);
        try {
            const deckIds = Array.from(selectedDecks);
            const response = await fetch('/api/script/download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deckIds, style })
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `scripts-bundle-${style}.zip`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);

                setIsSelectionMode(false);
                setSelectedDecks(new Set());
                alert("Scripts generated and downloaded!");
            } else {
                const err = await response.json();
                alert(`Generation failed: ${err.message}`);
            }
        } catch (error) {
            console.error('Script generation failed:', error);
            alert('Script generation failed');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownloadFeedbackSelected = async () => {
        if (selectedDecks.size === 0) return;

        setIsProcessing(true);
        try {
            const response = await fetch('/api/feedback/download-docx', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deckIds: Array.from(selectedDecks) })
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `selected-decks-feedback-${Date.now()}.docx`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else {
                const err = await response.json();
                alert(`Download failed: ${err.message}`);
            }
        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDeleteDeck = async (deckId) => {
        if (!confirm(`PERMANENTLY DELETE this deck? This action cannot be undone.`)) return;

        setIsDeleting(true);
        try {
            const response = await fetch('/api/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deckIds: [deckId] })
            });

            if (response.ok) {
                setRepositories(prevRepos => prevRepos.map(repo => ({
                    ...repo,
                    decks: repo.decks.filter(d => d.id !== deckId)
                })));
                alert('Deck deleted successfully!');
            } else {
                alert('Failed to delete deck');
            }
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete deck');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleArchiveDeck = async (deckId) => {
        if (!confirm(`Archive this deck?`)) return;

        setIsProcessing(true);
        try {
            const response = await fetch('/api/archive', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deckIds: [deckId] })
            });

            if (response.ok) {
                setRepositories(prevRepos => prevRepos.map(repo => ({
                    ...repo,
                    decks: repo.decks.map(deck =>
                        deck.id === deckId ? { ...deck, status: 'archived' } : deck
                    )
                })));
                alert('Deck archived successfully!');
            } else {
                alert('Failed to archive deck');
            }
        } catch (error) {
            console.error('Archive failed:', error);
            alert('Failed to archive deck');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleRestoreDeck = async (deckId) => {
        if (!confirm(`Restore this deck?`)) return;

        setIsProcessing(true);
        try {
            const response = await fetch('/api/restore', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deckIds: [deckId] })
            });

            if (response.ok) {
                setRepositories(prevRepos => prevRepos.map(repo => ({
                    ...repo,
                    decks: repo.decks.map(deck =>
                        deck.id === deckId ? { ...deck, status: 'active' } : deck
                    )
                })));
                alert('Deck restored successfully!');
            } else {
                alert('Failed to restore deck');
            }
        } catch (error) {
            console.error('Restore failed:', error);
            alert('Failed to restore deck');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReplaceSubmit = async (e) => {
        e.preventDefault();
        if (!replaceDeckId || !replaceFiles || replaceFiles.length === 0) {
            alert("Please select files to upload.");
            return;
        }

        if (!confirm("WARNING: This will replace the current deck content with the uploaded files. A backup will be created, but any unsaved changes might be lost. Continue?")) {
            return;
        }

        setIsProcessing(true);
        const formData = new FormData();
        formData.append('deckId', replaceDeckId);
        formData.append('merge', isSmartReplace ? 'true' : 'false');

        for (let i = 0; i < replaceFiles.length; i++) {
            formData.append('files', replaceFiles[i]);
        }

        try {
            const response = await fetch('/api/replace-deck-content', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert("Deck content replaced successfully!");
                setReplaceDeckId(null);
                setReplaceFiles(null);
                window.location.reload();
            } else {
                const err = await response.json();
                alert(`Replacement failed: ${err.message}`);
            }
        } catch (error) {
            console.error("Replacement error:", error);
            alert("Replacement failed");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleImportSubmit = async (e) => {
        e.preventDefault();
        // Auto-generate ID if empty from title
        let deckIdToSend = importForm.deckId;
        if (!deckIdToSend && importForm.title) {
            deckIdToSend = importForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        }

        if (!deckIdToSend || !importForm.files || importForm.files.length === 0) {
            alert("Please provide at least a Title and choose Files.");
            return;
        }

        setIsProcessing(true);
        const formData = new FormData();
        formData.append('deckId', deckIdToSend);
        formData.append('title', importForm.title);
        formData.append('description', importForm.description);
        formData.append('repoId', importForm.repoId || 'uncategorized');

        for (let i = 0; i < importForm.files.length; i++) {
            formData.append('files', importForm.files[i]);
        }

        try {
            const response = await fetch('/api/import-deck', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert("Deck imported successfully!");
                setIsImportModalOpen(false);
                setImportForm({ deckId: '', title: '', description: '', repoId: '', files: null });
                window.location.reload();
            } else {
                const err = await response.json();
                alert(`Import failed: ${err.message}`);
            }
        } catch (error) {
            console.error("Import error:", error);
            alert("Import failed");
        } finally {
            setIsProcessing(false);
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
                <div className="flex items-center justify-center gap-4 w-full max-w-2xl mx-auto flex-wrap">
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
                        onClick={() => {
                            if (!isEditMode && currentItems.length > 0) {
                                // Contextual Navigation: Find the repo of the first visible deck
                                const firstDeck = currentItems[0];
                                const repoIndex = processedRepositories.findIndex(r => r.id === firstDeck.repoId);

                                if (repoIndex !== -1) {
                                    const targetPage = Math.floor(repoIndex / ITEMS_PER_PAGE) + 1;
                                    setEditPage(targetPage);
                                }
                            }
                            setIsEditMode(!isEditMode);
                        }}
                        className={`px-4 py-3 rounded-xl border transition-all whitespace-nowrap ${isEditMode
                            ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        {isEditMode ? 'Done Editing' : 'Edit Structure'}
                    </button>

                    {/* Import Button */}
                    <button
                        onClick={() => setIsImportModalOpen(true)}
                        className="px-4 py-3 rounded-xl border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-all flex items-center gap-2"
                        title="Import Deck"
                    >
                        <Upload size={20} />
                        <span className="hidden sm:inline text-sm font-medium">Import</span>
                    </button>


                    {/* Manage Prompts Button */}
                    <button
                        onClick={onManagePrompts}
                        className="px-4 py-3 rounded-xl border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-all flex items-center gap-2"
                        title="Manage AI Prompts"
                    >
                        <Sparkles size={20} />
                        <span className="hidden sm:inline text-sm font-medium">Prompts</span>
                    </button>


                    {/* Archive Toggle */}
                    {/* Archive Toggle */}
                    <button
                        onClick={() => {
                            setViewMode(viewMode === 'active' ? 'archived' : 'active');
                            setIsSelectionMode(false);
                            setSelectedDecks(new Set());
                        }}
                        className={`p-3 rounded-xl border transition-all flex items-center gap-2 ${viewMode === 'archived'
                            ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                            }`}
                        title={viewMode === 'active' ? "View Archived" : "View Active"}
                    >
                        <Archive size={20} />
                    </button>

                    {/* Global Feedback Download */}
                    <button
                        onClick={async () => {
                            try {
                                setIsProcessing(true);
                                const response = await fetch('/api/feedback/download-docx', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({}) // Empty body for global fetch
                                });

                                if (response.ok) {
                                    const blob = await response.blob();
                                    const url = window.URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = `global-design-feedback-${Date.now()}.docx`;
                                    document.body.appendChild(a);
                                    a.click();
                                    window.URL.revokeObjectURL(url);
                                    document.body.removeChild(a);
                                } else {
                                    const err = await response.json();
                                    alert(`Download failed: ${err.message}`);
                                }
                            } catch (error) {
                                console.error('Download failed:', error);
                                alert('Download failed');
                            } finally {
                                setIsProcessing(false);
                            }
                        }}
                        className="px-4 py-3 rounded-xl border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-all flex items-center gap-2"
                        title="Download Global Pending Feedback"
                    >
                        <Download size={20} />
                        <span className="hidden sm:inline text-sm font-medium">Feedback</span>
                    </button>

                    {/* Selection Mode Toggle */}
                    <button
                        onClick={() => {
                            setIsSelectionMode(!isSelectionMode);
                            if (isSelectionMode) setSelectedDecks(new Set());
                        }}
                        className={`p-3 rounded-xl border transition-all flex items-center gap-2 ${isSelectionMode
                            ? 'bg-green-500/20 border-green-500 text-green-400'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                            }`}
                        title="Toggle Selection Mode"
                    >
                        <CheckSquare size={20} />
                        <span className="hidden sm:inline text-sm font-medium">Select</span>
                    </button>




                    {isSelectionMode && (
                        <>
                            <button
                                onClick={handleExportSelected}
                                disabled={isProcessing || selectedDecks.size === 0}
                                className="px-4 py-3 rounded-xl bg-purple-500 text-white font-bold hover:bg-purple-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? <Loader2 className="animate-spin" /> : <Download size={20} />}
                                Export ({selectedDecks.size})
                            </button>

                            <button
                                onClick={handleDownloadFeedbackSelected}
                                disabled={isProcessing || selectedDecks.size === 0}
                                className="px-4 py-3 rounded-xl bg-purple-500 text-white font-bold hover:bg-purple-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Download Feedback for Selected Decks"
                            >
                                {isProcessing ? <Loader2 className="animate-spin" /> : <Download size={20} />}
                                Feedback ({selectedDecks.size})
                            </button>


                            <button
                                onClick={viewMode === 'active' ? handleArchiveSelected : handleRestoreSelected}
                                disabled={isProcessing || selectedDecks.size === 0}
                                className="px-4 py-3 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? <Loader2 className="animate-spin" /> : (viewMode === 'active' ? <Archive size={20} /> : <RotateCcw size={20} />)}
                                {viewMode === 'active' ? `Archive (${selectedDecks.size})` : `Restore (${selectedDecks.size})`}
                            </button>

                            <button
                                onClick={handleDeleteSelected}
                                disabled={isProcessing || selectedDecks.size === 0}
                                className="px-4 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? <Loader2 className="animate-spin" /> : <Trash2 size={20} />}
                                Delete ({selectedDecks.size})
                            </button>

                            <button
                                onClick={handleScriptGeneration}
                                disabled={isProcessing || selectedDecks.size === 0}
                                className="px-4 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Generate YouTube Script"
                            >
                                {isProcessing ? <Loader2 className="animate-spin" /> : <FileText size={20} />}
                                Script ({selectedDecks.size})
                            </button>
                        </>

                    )}
                </div>
            </motion.div >

            <div className={`w-full max-w-7xl max-h-[60vh] overflow-y-auto pr-4 pb-4 custom-scrollbar min-h-[400px] ${!isEditMode ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 content-start' : 'space-y-12'}`}>
                <AnimatePresence mode="wait">
                    {/* Default Flat View */}
                    {!isEditMode && currentItems.map((deck) => (
                        <DeckCard
                            key={deck.id}
                            title={deck.title}
                            description={deck.description}
                            icon={deck.icon}
                            color={deck.color}
                            onClick={() => onSelectDeck(deck.id)}
                            isEditMode={false}
                            repositories={repositories} // Passed but mostly unused in view mode
                            currentRepoId={deck.repoId}
                            onMove={() => { }} // Disabled in view mode
                            isSelectionMode={isSelectionMode}
                            isSelected={selectedDecks.has(deck.id)}
                            onToggleSelect={() => toggleSelection(deck.id)}
                            onDelete={() => { }}
                            onArchive={() => handleArchiveDeck(deck.id)}
                            onRestore={() => handleRestoreDeck(deck.id)}
                            onExport={() => handleExportDeck(deck.id)}
                            status={deck.status}
                        />
                    ))}

                    {/* Edit Mode Grouped View */}
                    {isEditMode && currentItems.map((repo) => (
                        <motion.div
                            key={repo.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className="w-full relative group/repo"
                        >
                            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-2">
                                <div className="flex-grow flex items-center gap-4">
                                    <input
                                        type="text"
                                        value={repo.title}
                                        onChange={(e) => handleRenameRepository(repo.id, e.target.value)}
                                        onBlur={(e) => handlePersistRepositoryName(repo.id, e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.target.blur();
                                            }
                                        }}
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
                                            isEditMode={true}
                                            repositories={repositories}
                                            currentRepoId={repo.id}
                                            onMove={(targetRepoId) => handleMoveDeck(repo.id, deck.id, targetRepoId)}
                                            isSelectionMode={isSelectionMode}
                                            isSelected={selectedDecks.has(deck.id)}
                                            onToggleSelect={() => toggleSelection(deck.id)}

                                            onDelete={() => handleDeleteDeck(deck.id)}
                                            onArchive={() => handleArchiveDeck(deck.id)}
                                            onRestore={() => handleRestoreDeck(deck.id)}
                                            onReplace={() => setReplaceDeckId(deck.id)}
                                            status={deck.status}
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

                {/* Empty State */}
                {currentItems.length === 0 && searchQuery && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        <Search size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No decks found matching "{searchQuery}"</p>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {
                totalPages > 1 && (
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
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${currentPage === i + 1
                                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </motion.div>
                )
            }


            {/* Import Modal */}
            {isImportModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative"
                    >
                        <button
                            onClick={() => setIsImportModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                            <Upload className="text-blue-400" /> Import Deck
                        </h2>

                        <form onSubmit={handleImportSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Deck Title <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    required
                                    value={importForm.title}
                                    onChange={e => setImportForm({ ...importForm, title: e.target.value })}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                    placeholder="e.g. Advanced Patterns"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Deck ID (Optional)</label>
                                <input
                                    type="text"
                                    value={importForm.deckId}
                                    onChange={e => setImportForm({ ...importForm, deckId: e.target.value })}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                    placeholder="advanced-patterns"
                                />
                                <p className="text-xs text-gray-600 mt-1">If empty, will be generated from title.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                                <textarea
                                    value={importForm.description}
                                    onChange={e => setImportForm({ ...importForm, description: e.target.value })}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 min-h-[80px]"
                                    placeholder="Brief description..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Target Repository</label>
                                <select
                                    value={importForm.repoId}
                                    onChange={e => setImportForm({ ...importForm, repoId: e.target.value })}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select Repository...</option>
                                    {repositories.map(repo => (
                                        <option key={repo.id} value={repo.id}>{repo.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Slide Files (.zip, .md, .jsx, .js) <span className="text-red-500">*</span></label>
                                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-gray-400 relative">
                                    <input
                                        type="file"
                                        multiple
                                        accept=".jsx,.js,.zip,.md"
                                        required
                                        className="w-full h-full opacity-0 absolute inset-0 cursor-pointer z-10"
                                        onChange={e => setImportForm({ ...importForm, files: e.target.files })}
                                    />
                                    <div className="flex flex-col items-center gap-2 pointer-events-none">
                                        <Upload size={32} className="text-gray-500" />
                                        <p className="text-sm font-medium">Click to upload files (or .zip)</p>
                                        <p className="text-xs text-gray-500">{importForm.files ? `${importForm.files.length} files selected` : 'Drag & drop or click'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsImportModalOpen(false)}
                                    className="px-4 py-2 rounded-lg hover:bg-white/10 text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isProcessing && <Loader2 className="animate-spin" size={16} />}
                                    Import Deck
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* Replace Modal */}
            {replaceDeckId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative"
                    >
                        <button
                            onClick={() => {
                                setReplaceDeckId(null);
                                setReplaceFiles(null);
                            }}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold mb-2 text-white flex items-center gap-2">
                            <Upload className="text-purple-400" /> Replace Deck Content
                        </h2>
                        <p className="text-gray-400 mb-4 text-sm">
                            Upload a new <code>.md</code> or <code>.zip</code> file. This will replace existing slides.
                            A backup will be created automatically.
                        </p>

                        <div
                            className="flex items-center gap-3 p-3 mb-6 rounded-xl bg-purple-500/10 border border-purple-500/20 cursor-pointer hover:bg-purple-500/20 transition-all select-none"
                            onClick={() => setIsSmartReplace(!isSmartReplace)}
                        >
                            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${isSmartReplace ? 'bg-purple-500 border-purple-500' : 'border-white/20'}`}>
                                {isSmartReplace && <CheckSquare size={16} className="text-white" />}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-purple-300">Smart Replace (Recommended)</span>
                                <span className="text-xs text-gray-500">Updates slides found in files, preserves the rest.</span>
                            </div>
                        </div>

                        <form onSubmit={handleReplaceSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">New Slide Files (.zip, .md, .jsx, .js) <span className="text-red-500">*</span></label>
                                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-purple-500/50 hover:bg-purple-500/5 transition-all text-gray-400 relative">
                                    <input
                                        type="file"
                                        multiple
                                        accept=".jsx,.js,.zip,.md"
                                        required
                                        className="w-full h-full opacity-0 absolute inset-0 cursor-pointer z-10"
                                        onChange={e => setReplaceFiles(e.target.files)}
                                    />
                                    <div className="flex flex-col items-center gap-2 pointer-events-none">
                                        <Upload size={32} className="text-gray-500" />
                                        <p className="text-sm font-medium">Click to upload files (or .zip)</p>
                                        <p className="text-xs text-gray-500">{replaceFiles ? `${replaceFiles.length} files selected` : 'Drag & drop or click'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setReplaceDeckId(null);
                                        setReplaceFiles(null);
                                    }}
                                    className="px-4 py-2 rounded-lg hover:bg-white/10 text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="px-6 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-bold transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isProcessing && <Loader2 className="animate-spin" size={16} />}
                                    Replace
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div >
    );
};

export default DeckSelector;
