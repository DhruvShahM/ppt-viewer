import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Twitter, Github, ThumbsUp, Share2, Bell, Rocket } from 'lucide-react';

const Slide10_CTA = () => {
    return (
        <div className="h-full w-full bg-slate-900 flex flex-col items-center justify-center p-12 relative overflow-hidden">
            {/* Background Beams */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00ADD8]/10 rounded-full blur-[100px]" />

            <div className="z-10 text-center">
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mb-12 inline-block"
                >
                    <div className="w-48 h-48 bg-gradient-to-tr from-[#00ADD8] to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
                        <span className="text-8xl">👋</span>
                    </div>
                </motion.div>

                <h2 className="text-6xl font-black text-white mb-6">
                    Arigato Gozaimasu!
                </h2>
                <p className="text-2xl text-slate-300 mb-12">
                    Subscribe for more <span className="text-[#00ADD8] font-bold">Go</span> & <span className="text-pink-400 font-bold">Anime</span> content!
                </p>

                <div className="flex items-center justify-center gap-6">
                    <motion.button
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 w-40 h-16 px-6 bg-white/10 hover:bg-white/20 rounded-full text-white text-lg font-bold transition-colors border border-white/10 backdrop-blur-sm"
                    >
                        <ThumbsUp size={20} /> Like
                    </motion.button>

                    <motion.button
                        animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center justify-center gap-2 w-40 h-16 px-6 bg-purple-600/20 hover:bg-purple-600/40 rounded-full text-purple-300 text-lg font-bold transition-colors border border-purple-500/30 backdrop-blur-sm"
                    >
                        <Rocket size={20} /> Hype
                    </motion.button>

                    <motion.button
                        animate={{
                            scale: [1, 1.05, 1],
                            boxShadow: [
                                "0 0 0 0 rgba(220, 38, 38, 0.7)",
                                "0 0 0 20px rgba(220, 38, 38, 0)",
                                "0 0 0 0 rgba(220, 38, 38, 0)"
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "loop"
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-72 h-16 px-10 bg-gradient-to-r from-red-600 to-pink-600 rounded-full text-white text-2xl font-black shadow-2xl flex items-center justify-center gap-3 border-4 border-white/20"
                    >
                        <Bell size={32} className="fill-white" />
                        SUBSCRIBE
                    </motion.button>

                    <motion.button
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: 1.5
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 w-40 h-16 px-6 bg-white/10 hover:bg-white/20 rounded-full text-white text-lg font-bold transition-colors border border-white/10 backdrop-blur-sm"
                    >
                        <Share2 size={20} /> Share
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default Slide10_CTA;
