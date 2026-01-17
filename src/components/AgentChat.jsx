import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, RefreshCw, Sparkles, Loader2 } from 'lucide-react';

const AgentChat = ({ onClose, onRefreshDeck }) => {
    const [messages, setMessages] = useState([
        { role: 'agent', content: "Hi! I'm your Presentation Co-Pilot. I can create new slides, update existing ones, or answer questions about Go. What shall we do?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const res = await fetch('/api/agent/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userMessage })
            });

            const data = await res.json();

            if (data.success) {
                setMessages(prev => [...prev, { role: 'agent', content: data.message }]);
                // If the agent made changes (heuristic: message contains "Success"), trigger refresh
                if (data.message.includes("Success")) {
                    onRefreshDeck?.();
                }
            } else {
                setMessages(prev => [...prev, { role: 'agent', content: `Error: ${data.error || "Unknown error occurred."}` }]);
            }
        } catch (error) {
            console.error("Agent Chat Error:", error);
            setMessages(prev => [...prev, { role: 'agent', content: "Sorry, I encountered a network error." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-0 right-0 h-full w-[450px] bg-[#0f172a]/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col shadow-2xl"
        >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center">
                        <Bot size={24} className="text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-white">AI Co-Pilot</h2>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs text-gray-400">Gemini 1.5 Flash Active</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-gray-700' : 'bg-blue-600/20 text-blue-400'
                            }`}>
                            {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
                        </div>

                        <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${msg.role === 'user'
                            ? 'bg-blue-600 text-white rounded-tr-none'
                            : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                            }`}>
                            {typeof msg.content === 'string' ? (
                                msg.content.split('\n').map((line, i) => (
                                    <p key={i} className="mb-1 last:mb-0">{line}</p>
                                ))
                            ) : (
                                <pre className="whitespace-pre-wrap font-mono text-xs overflow-x-auto">
                                    {JSON.stringify(msg.content, null, 2)}
                                </pre>
                            )}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex-shrink-0 flex items-center justify-center">
                            <Sparkles size={16} />
                        </div>
                        <div className="bg-white/10 rounded-2xl p-3 rounded-tl-none border border-white/5 flex items-center gap-2 text-gray-400 text-sm">
                            <Loader2 size={14} className="animate-spin" />
                            Thinking...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/20">
                <div className="relative">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Ask me to create a slide..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 resize-none h-14"
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 top-2 p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    </button>
                </div>
                <p className="text-center text-xs text-gray-600 mt-2">
                    AI can make mistakes. Please review generated slides.
                </p>
            </div>
        </motion.div>
    );
};

export default AgentChat;
