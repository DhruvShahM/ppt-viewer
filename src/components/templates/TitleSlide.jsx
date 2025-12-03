import React from 'react';
import { motion } from 'framer-motion';

const TitleSlide = ({ data }) => {
    const { title, subtitle, author, role, theme } = data;

    // Theme-specific styles (simplified for now)
    const isAnime = theme === 'anime';

    return (
        <div className={`h-full w-full flex items-center justify-center p-12 overflow-hidden relative ${isAnime ? 'bg-gradient-to-br from-slate-900 via-[#00ADD8]/10 to-purple-900/20' : 'bg-slate-950'}`}>
            {/* Background Shapes for Anime Theme */}
            {isAnime && (
                <>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ADD8]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full max-w-6xl z-10">
                {/* Left: Image/Icon */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative flex justify-center"
                >
                    {isAnime ? (
                        <div className="aspect-square w-full max-w-md rounded-3xl bg-gradient-to-tr from-[#00ADD8] to-pink-400 p-1 shadow-2xl shadow-[#00ADD8]/30">
                            <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center overflow-hidden">
                                <div className="text-center p-8">
                                    <span className="text-9xl mb-4 block">🐹</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-64 h-64 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <span className="text-9xl">🚀</span>
                        </div>
                    )}
                </motion.div>

                {/* Right: Title Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-left"
                >
                    <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: title }} />
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-300 mb-8 font-mono">
                        {subtitle}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
                        <div>
                            <p className="text-white font-bold text-lg">{author}</p>
                            <p className="text-slate-400 text-sm">{role}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TitleSlide;
