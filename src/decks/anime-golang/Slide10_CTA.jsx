import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Twitter, Github, ThumbsUp, Share2, Bell } from 'lucide-react';

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

                <div className="flex gap-8 justify-center">
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.1 }}
                        className="p-4 bg-red-600 rounded-full text-white shadow-lg shadow-red-600/30"
                    >
                        <Youtube size={32} />
                    </motion.a>
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.1 }}
                        className="p-4 bg-[#1DA1F2] rounded-full text-white shadow-lg shadow-[#1DA1F2]/30"
                    >
                        <Twitter size={32} />
                    </motion.a>
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.1 }}
                        className="p-4 bg-[#333] rounded-full text-white shadow-lg shadow-black/30"
                    >
                        <Github size={32} />
                    </motion.a>
                </div>

                <div className="flex gap-6 justify-center mt-12">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white font-bold transition-colors border border-white/10"
                    >
                        <ThumbsUp size={20} /> Like
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white font-bold transition-colors border border-white/10"
                    >
                        <Share2 size={20} /> Share
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full text-white font-bold transition-colors shadow-lg shadow-red-600/20"
                    >
                        <Bell size={20} /> Subscribe
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default Slide10_CTA;
