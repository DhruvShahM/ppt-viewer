import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Plus, Search, FileText, Copy, Trash2, Archive, Save, RefreshCw, Eye, X, Edit3, CheckCircle, Clock, Clipboard } from 'lucide-react';


const PromptManager = ({ onBack }) => {
    const [prompts, setPrompts] = useState([]);
    const [view, setView] = useState('list'); // 'list', 'edit'
    const [currentPrompt, setCurrentPrompt] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('Active'); // 'All', 'Active', 'Draft', 'Archived'
    const [searchQuery, setSearchQuery] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [notification, setNotification] = useState(null);
    const [promptInputs, setPromptInputs] = useState({});

    const handleInputChange = (promptId, key, value) => {
        setPromptInputs(prev => ({
            ...prev,
            [promptId]: {
                ...(prev[promptId] || {}),
                [key]: value
            }
        }));
    };

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // Fetch all prompts
    const fetchPrompts = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/prompts');
            if (res.ok) {
                const data = await res.json();
                setPrompts(data);
            } else {
                console.error("Failed to fetch prompts");
            }
        } catch (error) {
            console.error("Error fetching prompts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPrompts();
    }, []);

    // Filtered Prompts
    const filteredPrompts = useMemo(() => {
        return prompts.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = filterStatus === 'All' || p.status === filterStatus;

            // Special case: "Active" view should show Active by default, but maybe we want a dedicated filter.
            // Requirement 2.2: Filter by type or status.
            // Let's stick to status filter for the main tabs.

            return matchesSearch && matchesStatus;
        }).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }, [prompts, searchQuery, filterStatus]);

    // Group prompts by category
    const groupedPrompts = useMemo(() => {
        const groups = {};
        if (filteredPrompts.length === 0) return {};

        filteredPrompts.forEach(p => {
            const cat = p.category || 'Uncategorized';
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(p);
        });

        // Sort categories by the latest updatedAt within each category
        const sortedKeys = Object.keys(groups).sort((a, b) => {
            const latestA = Math.max(...groups[a].map(p => new Date(p.updatedAt).getTime()));
            const latestB = Math.max(...groups[b].map(p => new Date(p.updatedAt).getTime()));
            return latestB - latestA;
        });

        const sortedGroups = {};
        sortedKeys.forEach(key => sortedGroups[key] = groups[key]);
        return sortedGroups;
    }, [filteredPrompts]);

    const handleCreateNew = () => {
        setCurrentPrompt({
            name: '',
            type: 'User',
            category: '',
            status: 'Draft',
            content: '',
            isNew: true
        });
        setView('edit');
    };

    const handleEdit = async (prompt) => {
        // Fetch full content
        setIsLoading(true);
        try {
            const res = await fetch(`/api/prompts/${prompt.id}`);
            if (res.ok) {
                const data = await res.json();
                setCurrentPrompt({ ...data, isNew: false });
                setView('edit');
            }
        } catch (error) {
            console.error("Error loading prompt:", error);
            showNotification("Failed to load prompt details", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!currentPrompt.name || !currentPrompt.content) {
            showNotification("Name and Content are required", "error");
            return;
        }

        setIsSaving(true);
        try {
            const url = currentPrompt.isNew ? '/api/prompts' : `/api/prompts/${currentPrompt.id}`;
            const method = currentPrompt.isNew ? 'POST' : 'PUT';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: currentPrompt.name,
                    type: currentPrompt.type,
                    category: currentPrompt.category,
                    status: currentPrompt.status,
                    content: currentPrompt.content
                })
            });

            if (res.ok) {
                await fetchPrompts(); // Refresh list
                setView('list');
                setCurrentPrompt(null);
            } else {
                const err = await res.json();
                showNotification(`Error saving: ${err.error || 'Unknown error'}`, "error");
            }
        } catch (error) {
            console.error("Save failed:", error);
            showNotification("Failed to save prompt", "error");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDuplicate = async (promptId, e) => {
        e.stopPropagation();
        if (!confirm("Duplicate this prompt?")) return;

        try {
            const res = await fetch(`/api/prompts/${promptId}/duplicate`, { method: 'POST' });
            if (res.ok) {
                fetchPrompts();
                showNotification("Prompt duplicated successfully");
            } else {
                showNotification("Failed to duplicate", "error");
            }
        } catch (error) {
            console.error("Duplicate failed:", error);
        }
    };

    const handleArchive = async (prompt, e) => {
        e.stopPropagation();
        const newStatus = prompt.status === 'Archived' ? 'Draft' : 'Archived';
        if (!confirm(`Mark as ${newStatus}?`)) return;

        // Use PUT to update status
        try {
            const res = await fetch(`/api/prompts/${prompt.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                fetchPrompts();
                showNotification(`Prompt ${newStatus.toLowerCase()}`);
            }
        } catch (error) {
            console.error("Archive failed:", error);
        }
    };

    const handleDelete = async (promptId, e) => {
        e.stopPropagation();
        if (!confirm("Permanently delete this prompt?")) return;

        try {
            const res = await fetch(`/api/prompts/${promptId}`, { method: 'DELETE' });
            if (res.ok) {
                fetchPrompts();
                if (view === 'edit' && currentPrompt?.id === promptId) {
                    setView('list');
                }
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const handleCopyContent = async (promptId, promptName, e) => {
        e.stopPropagation();
        try {
            const res = await fetch(`/api/prompts/${promptId}`);
            if (res.ok) {
                const data = await res.json();
                if (data.content) {
                    let finalContent = data.content;
                    // Replace variables like <VARIABLE_NAME> or {{VARIABLE_NAME}}
                    const inputs = promptInputs[promptId] || {};
                    Object.entries(inputs).forEach(([key, value]) => {
                        if (value) {
                            // Support both <VAR> and {{VAR}} formats
                            finalContent = finalContent.replaceAll(`<${key}>`, value);
                            finalContent = finalContent.replaceAll(`{{${key}}}`, value);
                        }
                    });

                    await navigator.clipboard.writeText(finalContent);
                    showNotification(`"${promptName}" copied to clipboard!`);

                    // Update timestamp to move to top
                    await fetch(`/api/prompts/${promptId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name: data.name }) // Minimal update to trigger updatedAt
                    });
                    fetchPrompts();
                } else {
                    showNotification("No content to copy.", "error");
                }
            } else {
                showNotification("Failed to fetch prompt content", "error");
            }
        } catch (error) {
            console.error("Copy failed:", error);
            showNotification("Failed to copy content", "error");
        }
    };

    return (
        <div className="w-full h-full text-white overflow-y-auto custom-scrollbar flex flex-col p-8 selection:bg-blue-500 selection:text-white relative z-10">
            {/* Notification Toast */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 ${notification.type === 'error' ? 'bg-red-500/90 text-white' : 'bg-green-500/90 text-white'
                            } backdrop-blur-md border border-white/10`}
                    >
                        {notification.type === 'error' ? <X size={18} /> : <CheckCircle size={18} />}
                        <span className="font-medium text-sm">{notification.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white">
                        <ChevronLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Prompt Management
                        </h1>
                        <p className="text-gray-400 text-sm">Manage and version your AI prompts</p>
                    </div>
                </div>

                {view === 'list' && (
                    <button
                        onClick={handleCreateNew}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
                    >
                        <Plus size={20} /> New Prompt
                    </button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {view === 'list' ? (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex-grow flex flex-col gap-6"
                    >
                        {/* Filters and Search */}
                        <div className="flex items-center gap-4 bg-white/5 p-2 rounded-xl border border-white/10">
                            {['Active', 'Draft', 'Archived', 'All'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterStatus === status
                                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}

                            <div className="w-px h-6 bg-white/10 mx-2" />

                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search prompts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 pl-9 pr-4 py-2 text-sm"
                                />
                            </div>
                        </div>

                        {/* List */}
                        <div className="flex-grow">
                            {isLoading ? (
                                <div className="text-center py-12 text-gray-500">Loading...</div>
                            ) : filteredPrompts.length === 0 ? (
                                <div className="text-center py-12 text-gray-500 border-2 border-dashed border-white/5 rounded-xl">
                                    No prompts found. Create one to get started.
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {Object.entries(groupedPrompts).map(([category, categoryPrompts]) => (
                                        <div key={category}>
                                            <h2 className="text-xl font-bold text-white mb-4 pl-2 border-l-4 border-blue-500">{category} ({categoryPrompts.length})</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {categoryPrompts.map(prompt => (
                                                    <div
                                                        key={prompt.id}
                                                        onClick={() => handleEdit(prompt)}
                                                        className="group bg-white/5 border border-white/10 hover:border-blue-500/50 p-5 rounded-xl cursor-pointer transition-all hover:bg-white/10 relative overflow-hidden"
                                                    >
                                                        <div className="flex justify-between items-start mb-4 gap-4">
                                                            <div className="flex items-start gap-4 flex-grow">
                                                                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg shrink-0">
                                                                    <FileText size={20} />
                                                                </div>

                                                                {prompt.inputSnippet && (
                                                                    <div className="flex-grow text-[10px] font-mono leading-tight">
                                                                        <div className="text-red-400 font-bold mb-1 opacity-80 uppercase tracking-tighter">INPUT:</div>
                                                                        <div className="space-y-1">
                                                                            {prompt.inputSnippet.split('\n').filter(l => l.trim()).map((line, lid) => {
                                                                                const parts = line.split(/(<[^>]+>|\{\{[^}]+\}\})/g);
                                                                                return (
                                                                                    <div key={lid} className="flex flex-wrap items-center gap-1 text-gray-300">
                                                                                        {parts.map((part, pid) => {
                                                                                            const isPlaceholder = (part.startsWith('<') && part.endsWith('>')) || (part.startsWith('{{') && part.endsWith('}}'));
                                                                                            if (isPlaceholder) {
                                                                                                const varName = part.startsWith('{{') ? part.slice(2, -2) : part.slice(1, -1);
                                                                                                return (
                                                                                                    <input
                                                                                                        key={pid}
                                                                                                        type="text"
                                                                                                        onClick={(e) => e.stopPropagation()}
                                                                                                        value={promptInputs[prompt.id]?.[varName] || ''}
                                                                                                        onChange={(e) => handleInputChange(prompt.id, varName, e.target.value)}
                                                                                                        placeholder={varName}
                                                                                                        className="bg-white/5 border border-white/10 rounded px-1 py-0.5 text-blue-400 outline-none focus:border-blue-500 focus:bg-white/10 min-w-[80px] max-w-full transition-all placeholder:text-blue-400/30"
                                                                                                    />
                                                                                                );
                                                                                            }
                                                                                            return <span key={pid} className="opacity-70">{part}</span>;
                                                                                        })}
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <span className={`px-2 py-1 rounded text-xs font-medium border shrink-0 ${prompt.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                                prompt.status === 'Archived' ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' :
                                                                    'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                                }`}>
                                                                {prompt.status}
                                                            </span>
                                                        </div>

                                                        <h3 className="text-lg font-bold mb-1 truncate">{prompt.name}</h3>
                                                        <p className="text-xs text-gray-400 mb-4 flex items-center gap-2">
                                                            <span className="bg-white/10 px-1.5 py-0.5 rounded">{prompt.type}</span>
                                                            {prompt.category && <span className="bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">{prompt.category}</span>}
                                                            <span>v{(prompt.versions || []).length}</span>
                                                            <span className="w-1 h-1 bg-gray-500 rounded-full" />
                                                            <span className="flex items-center gap-1">
                                                                <Clock size={10} />
                                                                {new Date(prompt.updatedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                                            </span>
                                                        </p>

                                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                                            <button
                                                                onClick={(e) => handleCopyContent(prompt.id, prompt.name, e)}
                                                                className="p-2 bg-black/50 hover:bg-green-600 rounded-lg text-white backdrop-blur-sm transition-colors"
                                                                title="Copy Content"
                                                            >
                                                                <Clipboard size={14} />
                                                            </button>
                                                            <button
                                                                onClick={(e) => handleDuplicate(prompt.id, e)}
                                                                className="p-2 bg-black/50 hover:bg-blue-600 rounded-lg text-white backdrop-blur-sm transition-colors"
                                                                title="Duplicate"
                                                            >
                                                                <Copy size={14} />
                                                            </button>
                                                            <button
                                                                onClick={(e) => handleArchive(prompt, e)}
                                                                className="p-2 bg-black/50 hover:bg-yellow-600 rounded-lg text-white backdrop-blur-sm transition-colors"
                                                                title={prompt.status === 'Archived' ? "Restore" : "Archive"}
                                                            >
                                                                <Archive size={14} />
                                                            </button>
                                                            {prompt.status === 'Draft' && (
                                                                <button
                                                                    onClick={(e) => handleDelete(prompt.id, e)}
                                                                    className="p-2 bg-black/50 hover:bg-red-600 rounded-lg text-white backdrop-blur-sm transition-colors"
                                                                    title="Delete"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="edit"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-grow flex flex-col gap-6"
                    >
                        {/* Back Button */}
                        <div className="flex items-center">
                            <button
                                onClick={() => setView('list')}
                                className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors group px-2 py-1 rounded-lg hover:bg-white/5"
                            >
                                <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                                <span className="text-sm font-medium">Back to List</span>
                            </button>
                        </div>

                        {/* Editor Header */}
                        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                            <div className="flex-grow grid grid-cols-2 lg:grid-cols-5 gap-4">
                                <div className="col-span-2">
                                    <label className="text-xs text-gray-500 block mb-1">Prompt Name</label>
                                    <input
                                        type="text"
                                        value={currentPrompt.name}
                                        onChange={e => setCurrentPrompt({ ...currentPrompt, name: e.target.value })}
                                        className="w-full bg-transparent border-b border-white/20 focus:border-blue-500 outline-none text-lg font-bold py-1"
                                        placeholder="e.g. YouTube Script Generator"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 block mb-1">Type</label>
                                    <select
                                        value={currentPrompt.type}
                                        onChange={e => setCurrentPrompt({ ...currentPrompt, type: e.target.value })}
                                        className="w-full bg-black/20 border border-white/20 rounded px-2 py-1.5 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="System">System</option>
                                        <option value="User">User</option>
                                        <option value="Template">Template</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 block mb-1">Category</label>
                                    <input
                                        type="text"
                                        value={currentPrompt.category || ''}
                                        onChange={e => setCurrentPrompt({ ...currentPrompt, category: e.target.value })}
                                        className="w-full bg-transparent border-b border-white/20 focus:border-blue-500 outline-none text-sm py-1.5"
                                        placeholder="Optional"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 block mb-1">Status</label>
                                    <select
                                        value={currentPrompt.status}
                                        onChange={e => setCurrentPrompt({ ...currentPrompt, status: e.target.value })}
                                        className="w-full bg-black/20 border border-white/20 rounded px-2 py-1.5 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="Draft">Draft</option>
                                        <option value="Active">Active</option>
                                        <option value="Archived">Archived</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-2 border-l border-white/10 pl-4 ml-2">
                                <button
                                    onClick={() => setView('list')}
                                    className="px-4 py-2 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
                                >
                                    {isSaving ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
                                    Save
                                </button>
                            </div>
                        </div>

                        {/* Editor Main */}
                        <div className="flex-grow flex gap-6 min-h-0">
                            <div className="flex-grow flex flex-col">
                                <label className="text-sm font-medium text-gray-400 mb-2 flex justify-between">
                                    <span>Prompt Content (Markdown)</span>
                                    <span className="text-xs text-gray-500">Supports variables like {'{{variable}}'}</span>
                                </label>
                                <textarea
                                    value={currentPrompt.content}
                                    onChange={e => setCurrentPrompt({ ...currentPrompt, content: e.target.value })}
                                    className="flex-grow w-full bg-[#1e1e1e] border border-white/10 rounded-xl p-6 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:border-blue-500/50"
                                    placeholder="Enter your prompt here..."
                                />
                            </div>

                            {/* Sidebar / Metadata / History (Optional for now, simplified) */}
                            <div className="w-80 flex-shrink-0 bg-white/5 border border-white/10 rounded-xl p-6 overflow-y-auto custom-scrollbar">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <Clock size={16} /> Version History
                                </h3>

                                <div className="space-y-4">
                                    {(currentPrompt.versions || []).slice().reverse().map((v, i) => (
                                        <div key={i} className="flex gap-3 text-sm">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-blue-500' : 'bg-gray-600'} mt-1.5`} />
                                                {i < (currentPrompt.versions || []).length - 1 && <div className="w-px h-full bg-white/10 my-1" />}
                                            </div>
                                            <div>
                                                <p className="font-medium">Version {v.version}</p>
                                                <p className="text-xs text-gray-500">{new Date(v.createdAt).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}

                                    {(!currentPrompt.versions || currentPrompt.versions.length === 0) && (
                                        <p className="text-gray-500 text-sm">No history available.</p>
                                    )}
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <h3 className="font-bold mb-4">Metadata</h3>
                                    <div className="space-y-2 text-sm text-gray-400">
                                        <p>ID: <span className="font-mono text-xs select-all text-gray-300">{currentPrompt.id}</span></p>
                                        <p>Created: <span className="text-gray-300">{new Date(currentPrompt.createdAt || Date.now()).toLocaleDateString()}</span></p>
                                    </div>
                                </div>

                                {!currentPrompt.isNew && (
                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <button
                                            onClick={() => handleDelete(currentPrompt.id)}
                                            className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Trash2 size={16} /> Delete Prompt
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PromptManager;
