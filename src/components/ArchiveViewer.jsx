import { motion, AnimatePresence } from 'framer-motion';
import { Archive, Loader2, RefreshCcw, Search, X, Clock, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import ArchivedDeckCard from './ArchivedDeckCard';

const ArchiveViewer = ({ onBack }) => {
    const [archivedDecks, setArchivedDecks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [restoringDeck, setRestoringDeck] = useState(null);
    const [notification, setNotification] = useState(null);

    // Fetch archived decks
    const fetchArchivedDecks = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3001/api/decks/status/archived');
            const data = await response.json();

            if (data.success) {
                setArchivedDecks(data.decks);
                setError(null);
            } else {
                setError('Failed to load archived decks');
            }
        } catch (err) {
            setError(`Error loading archived decks: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArchivedDecks();
    }, []);

    // Handle restore
    const handleRestore = async (deckId) => {
        if (!confirm(`Restore deck "${deckId}"? It will be moved back to active decks.`)) {
            return;
        }

        setRestoringDeck(deckId);

        try {
            const response = await fetch('http://localhost:3001/api/restore', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deckId }),
            });

            const data = await response.json();

            if (data.success) {
                // Show notification with refresh action
                showNotification('success', `Deck "${deckId}" restored successfully! Please refresh the page to load the deck content.`, {
                    action: {
                        label: 'Refresh Now',
                        onClick: () => window.location.reload()
                    },
                    duration: 15000 // Show for 15 seconds
                });
                // Remove from archived list
                setArchivedDecks(decks => decks.filter(d => d.id !== deckId));
            } else {
                showNotification('error', data.message || 'Failed to restore deck');
            }
        } catch (err) {
            showNotification('error', `Restore failed: ${err.message}`);
        } finally {
            setRestoringDeck(null);
        }
    };

    // Show notification
    const showNotification = (type, message, options = {}) => {
        const duration = options.duration || 5000;
        setNotification({ type, message, action: options.action });
        setTimeout(() => setNotification(null), duration);
    };

    // Filter decks
    const filteredDecks = archivedDecks.filter(deck =>
        deck.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deck.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deck.repoTitle?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group by repository
    const groupedDecks = filteredDecks.reduce((acc, deck) => {
        const repoId = deck.repoId || 'unknown';
        const repoTitle = deck.repoTitle || 'Unknown Repository';

        if (!acc[repoId]) {
            acc[repoId] = {
                id: repoId,
                title: repoTitle,
                decks: [],
            };
        }

        acc[repoId].decks.push(deck);
        return acc;
    }, {});

    const repositories = Object.values(groupedDecks);

    return (
        <div className="w-full h-full flex flex-col items-center justify-start p-12 relative z-10">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8 w-full max-w-4xl"
            >
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                    >
                        <ArrowLeft size={20} />
                        Back to Decks
                    </button>

                    <button
                        onClick={fetchArchivedDecks}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <RefreshCcw size={20} />}
                        Refresh
                    </button>
                </div>

                <div className="flex items-center justify-center gap-3 mb-4">
                    <Archive size={40} className="text-blue-400" />
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Archived Decks
                    </h1>
                </div>

                <p className="text-lg text-gray-400 mb-6">
                    {archivedDecks.length} deck{archivedDecks.length !== 1 ? 's' : ''} in archive
                </p>

                {/* Search */}
                <div className="relative w-full max-w-2xl mx-auto group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search archived decks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            </motion.div>

            {/* Notification */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`fixed top-8 right-8 z-50 px-6 py-4 rounded-xl border flex items-start gap-3 max-w-md ${notification.type === 'success'
                            ? 'bg-green-500/20 border-green-500 text-green-400'
                            : 'bg-red-500/20 border-red-500 text-red-400'
                            }`}
                    >
                        <div className="flex-shrink-0 mt-0.5">
                            {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        </div>
                        <div className="flex-1 flex flex-col gap-3">
                            <span className="font-medium text-sm leading-relaxed">{notification.message}</span>
                            {notification.action && (
                                <button
                                    onClick={notification.action.onClick}
                                    className="self-start px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-current transition-all font-semibold text-sm"
                                >
                                    {notification.action.label}
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content */}
            <div className="w-full max-w-7xl max-h-[60vh] overflow-y-auto pr-4 pb-4 custom-scrollbar space-y-12">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="animate-spin text-blue-400 mb-4" size={48} />
                        <p className="text-gray-400">Loading archived decks...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <AlertCircle className="text-red-400 mb-4" size={48} />
                        <p className="text-red-400 mb-4">{error}</p>
                        <button
                            onClick={fetchArchivedDecks}
                            className="px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-500 text-blue-400 hover:bg-blue-500/30 transition-all"
                        >
                            Try Again
                        </button>
                    </div>
                ) : repositories.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Archive size={64} className="text-gray-600 mb-4 opacity-30" />
                        <p className="text-gray-500 text-lg">
                            {searchQuery ? `No archived decks found matching "${searchQuery}"` : 'No archived decks yet'}
                        </p>
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
                                className="w-full"
                            >
                                <h2 className="text-2xl font-bold text-white/80 mb-6 border-b border-white/10 pb-2">
                                    {repo.title}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <AnimatePresence>
                                        {repo.decks.map((deck) => (
                                            <ArchivedDeckCard
                                                key={deck.id}
                                                deck={deck}
                                                onRestore={() => handleRestore(deck.id)}
                                                isRestoring={restoringDeck === deck.id}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

export default ArchiveViewer;
