import React, { useState, useEffect } from 'react';
import { X, ClipboardList, CheckCircle2, Clock, FileText, AlertCircle, Sparkles, Zap, ArrowRight, BrainCircuit } from 'lucide-react';

const FeedbackSummary = ({ deckId, onClose }) => {
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/feedback');
                if (response.ok) {
                    const data = await response.json();
                    // Filter for current deck
                    const deckFeedback = data.filter(f => f.deckId === deckId);
                    // Sort by timestamp desc
                    deckFeedback.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                    setFeedback(deckFeedback);
                } else {
                    setError('Failed to load feedback');
                }
            } catch (err) {
                setError('Failed to connect to server');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, [deckId]);

    const stats = {
        total: feedback.length,
        pending: feedback.filter(f => f.status === 'pending').length,
        planned: feedback.filter(f => f.status === 'planned').length,
        approved: feedback.filter(f => f.status === 'approved').length,
        completed: feedback.filter(f => f.status === 'completed').length,
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case 'planned': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'approved': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'completed': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
            default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
        }
    };

    const analyzeFeedback = () => {
        setIsAnalyzing(true);
        // Simulate AI analysis delay
        setTimeout(() => {
            const categories = {
                design: [],
                content: [],
                structure: [],
                other: []
            };

            feedback.forEach(item => {
                if (item.status === 'completed') return; // Skip completed for analysis

                const text = item.instruction.toLowerCase();
                if (text.includes('color') || text.includes('style') || text.includes('font') || text.includes('background') || text.includes('image') || text.includes('icon')) {
                    categories.design.push(item);
                } else if (text.includes('text') || text.includes('typo') || text.includes('word') || text.includes('sentence') || text.includes('content') || text.includes('add')) {
                    categories.content.push(item);
                } else if (text.includes('slide') || text.includes('order') || text.includes('move') || text.includes('layout')) {
                    categories.structure.push(item);
                } else {
                    categories.other.push(item);
                }
            });

            setAnalysis(categories);
            setIsAnalyzing(false);
        }, 1500);
    };

    const executePlan = () => {
        navigator.clipboard.writeText('/process_feedback');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-[800px] max-h-[85vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                            <ClipboardList className="text-purple-400" size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Improvement Hub</h2>
                            <p className="text-xs text-slate-400">Deck: {deckId}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 text-red-400">
                            <AlertCircle className="mx-auto mb-2" size={32} />
                            {error}
                        </div>
                    ) : feedback.length === 0 ? (
                        <div className="text-center py-10 text-slate-500">
                            <CheckCircle2 className="mx-auto mb-2" size={32} />
                            No feedback items found for this deck.
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-4 gap-4">
                                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 text-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="text-3xl font-bold text-yellow-400 mb-1">{stats.pending}</div>
                                    <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Pending</div>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 text-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="text-3xl font-bold text-blue-400 mb-1">{stats.planned}</div>
                                    <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Planned</div>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 text-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="text-3xl font-bold text-green-400 mb-1">{stats.approved}</div>
                                    <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Approved</div>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 text-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="text-3xl font-bold text-purple-400 mb-1">{stats.completed}</div>
                                    <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Done</div>
                                </div>
                            </div>

                            {/* AI Analysis Section */}
                            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <BrainCircuit size={100} className="text-purple-500" />
                                </div>

                                <div className="flex justify-between items-center mb-6 relative z-10">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                            <Sparkles className="text-purple-400" size={20} />
                                            AI Smart Analysis & Auto-Fix
                                        </h3>
                                        <p className="text-sm text-slate-400 mt-1">
                                            Analyze feedback to generate a plan. <span className="text-purple-300">Automatically fixes CSS, design issues, and layout elements.</span>
                                        </p>
                                    </div>
                                    {!analysis && (
                                        <button
                                            onClick={analyzeFeedback}
                                            disabled={isAnalyzing}
                                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2 shadow-lg shadow-purple-900/20"
                                        >
                                            {isAnalyzing ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                    Analyzing...
                                                </>
                                            ) : (
                                                <>
                                                    <Zap size={16} />
                                                    Analyze Feedback
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>

                                {analysis && (
                                    <div className="space-y-4 animate-in slide-in-from-bottom-5 fade-in duration-500">
                                        <div className="grid grid-cols-2 gap-4">
                                            {analysis.design.length > 0 && (
                                                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                                                    <h4 className="text-sm font-medium text-pink-300 mb-2 flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-pink-400" />
                                                        Design & Styling ({analysis.design.length})
                                                    </h4>
                                                    <ul className="space-y-1">
                                                        {analysis.design.map(item => (
                                                            <li key={item.id} className="text-xs text-slate-400 truncate pl-4 border-l border-slate-700">
                                                                Slide {item.slideIndex + 1}: {item.instruction}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {analysis.content.length > 0 && (
                                                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                                                    <h4 className="text-sm font-medium text-blue-300 mb-2 flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                                                        Content & Text ({analysis.content.length})
                                                    </h4>
                                                    <ul className="space-y-1">
                                                        {analysis.content.map(item => (
                                                            <li key={item.id} className="text-xs text-slate-400 truncate pl-4 border-l border-slate-700">
                                                                Slide {item.slideIndex + 1}: {item.instruction}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {analysis.structure.length > 0 && (
                                                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                                                    <h4 className="text-sm font-medium text-orange-300 mb-2 flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-orange-400" />
                                                        Structure & Layout ({analysis.structure.length})
                                                    </h4>
                                                    <ul className="space-y-1">
                                                        {analysis.structure.map(item => (
                                                            <li key={item.id} className="text-xs text-slate-400 truncate pl-4 border-l border-slate-700">
                                                                Slide {item.slideIndex + 1}: {item.instruction}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {analysis.other.length > 0 && (
                                                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                                                    <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-slate-400" />
                                                        Other Improvements ({analysis.other.length})
                                                    </h4>
                                                    <ul className="space-y-1">
                                                        {analysis.other.map(item => (
                                                            <li key={item.id} className="text-xs text-slate-400 truncate pl-4 border-l border-slate-700">
                                                                Slide {item.slideIndex + 1}: {item.instruction}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-6 flex justify-end">
                                            <button
                                                onClick={executePlan}
                                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-xl shadow-purple-900/30 hover:scale-105"
                                            >
                                                {copied ? (
                                                    <>
                                                        <CheckCircle2 size={18} />
                                                        Agent Command Copied!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Zap size={18} className="fill-white" />
                                                        Execute Improvement Plan
                                                        <ArrowRight size={18} />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Raw List */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                    <FileText size={14} /> All Feedback Items
                                </h3>
                                {feedback.map((item) => (
                                    <div key={item.id} className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3 hover:bg-slate-800/50 transition-colors flex gap-4">
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusColor(item.status)} uppercase font-medium`}>
                                                    {item.status}
                                                </span>
                                                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                                    <Clock size={10} />
                                                    {new Date(item.timestamp).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-200 mb-1">{item.instruction}</p>
                                        </div>
                                        <div className="flex flex-col justify-center items-end min-w-[60px] border-l border-slate-700/50 pl-4">
                                            <span className="text-[10px] text-slate-500 uppercase tracking-wider">Slide</span>
                                            <span className="text-xl font-bold text-slate-300">{item.slideIndex + 1}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackSummary;
