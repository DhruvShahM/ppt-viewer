import React from 'react';
import { motion } from 'framer-motion';

const Slide1_Title = () => {
    return (
        <div className="h-full w-full bg-gradient-to-br from-slate-900 via-[#00ADD8]/10 to-purple-900/20 flex items-center justify-center p-12 overflow-hidden relative">
            {/* Background Shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ADD8]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="grid grid-cols-2 gap-12 items-center w-full max-w-6xl z-10">
                {/* Left: Anime Gopher Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="aspect-square rounded-3xl bg-gradient-to-tr from-[#00ADD8] to-pink-400 p-1 shadow-2xl shadow-[#00ADD8]/30">
                        <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center overflow-hidden">
                            {/* Placeholder for Anime Gopher */}
                            <div className="text-center p-8">
                                <span className="text-6xl mb-4 block">🐹</span>
                                <p className="text-slate-400">Anime Gopher Placeholder</p>
                            </div>
                            {/* <img src="/assets/anime-gopher/title.png" alt="Anime Gopher" className="w-full h-full object-cover" /> */}
                        </div>
                    </div>
                    {/* Floating Elements */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="absolute -top-8 -right-8 bg-white text-slate-900 px-6 py-3 rounded-full font-bold shadow-lg"
                    >
                        Let's Go! 🚀
                    </motion.div>
                </motion.div>

                {/* Right: Title Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-left"
                >
                    <h1 className="text-7xl font-black text-white mb-6 leading-tight">
                        Concurrency in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ADD8] to-teal-400">Golang</span>
                    </h1>
                    <h2 className="text-3xl font-bold text-slate-300 mb-8 font-mono">
                        Explained by Anime Gopher
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
                        <div>
                            <p className="text-white font-bold text-lg">Your Name</p>
                            <p className="text-slate-400 text-sm">Gopher Enthusiast</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Slide1_Title;
