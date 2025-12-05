import { motion } from 'framer-motion';
import { RefreshCcw, Loader2, Layers, Cpu, Sparkles, Zap, Network, Heart, Clock, Package } from 'lucide-react';

const ICON_MAP = {
    Layers,
    Cpu,
    Sparkles,
    Zap,
    Network,
    Heart,
    Package,
};

const ArchivedDeckCard = ({ deck, onRestore, isRestoring }) => {
    const IconComponent = ICON_MAP[deck.icon] || Layers;

    // Format archive date
    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown date';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-start p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 hover:border-purple-500/50 transition-all group text-left w-full h-full relative overflow-hidden"
        >
            {/* Background glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${deck.color || 'purple'}-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-${deck.color || 'purple'}-500/20`} />

            {/* Icon and Archive Badge */}
            <div className="flex justify-between w-full mb-4 relative z-10">
                <div className={`p-3 rounded-xl bg-${deck.color || 'purple'}-500/20 text-${deck.color || 'purple'}-400 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={28} />
                </div>

                <div className="px-3 py-1 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-medium flex items-center gap-1">
                    <Package size={14} />
                    ARCHIVED
                </div>
            </div>

            {/* Title and Description */}
            <h3 className="text-xl font-bold mb-2 text-white">{deck.title}</h3>
            <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">{deck.description}</p>

            {/* Archive Info */}
            <div className="w-full mb-4 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock size={14} />
                    <span>Archived: {formatDate(deck.archivedAt)}</span>
                </div>
                {deck.version && (
                    <div className="text-xs text-gray-500 mt-1">
                        Version: {deck.version}
                    </div>
                )}
            </div>

            {/* Restore Button */}
            <button
                onClick={onRestore}
                disabled={isRestoring}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-xl text-blue-400 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed group-hover:shadow-lg group-hover:shadow-blue-500/20"
            >
                {isRestoring ? (
                    <>
                        <Loader2 className="animate-spin" size={18} />
                        Restoring...
                    </>
                ) : (
                    <>
                        <RefreshCcw size={18} />
                        Restore Deck
                    </>
                )}
            </button>
        </motion.div>
    );
};

export default ArchivedDeckCard;
