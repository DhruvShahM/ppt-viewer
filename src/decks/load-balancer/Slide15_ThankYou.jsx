import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, Bell, Share2 } from 'lucide-react';

const Slide15_ThankYou = () => {
    return (
        <div className="relative h-full w-full overflow-hidden flex items-center justify-center text-center">
            {/* Light moving gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 bg-[length:400%_400%] animate-gradient-xy -z-20" />

            <div className="z-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8"
                >
                    Thank You!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-2xl text-slate-400"
                >
                    Don't forget to...
                </motion.p>

                {/* Like, Subscribe, Share Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="flex gap-8 justify-center mt-12"
                >
                    {/* Like Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 px-8 py-4 bg-slate-800 rounded-full border border-slate-700 hover:bg-slate-700 hover:border-blue-500 transition-all group"
                    >
                        <ThumbsUp className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                        <span className="text-xl font-bold text-white">Like</span>
                    </motion.button>

                    {/* Subscribe Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 px-8 py-4 bg-red-600 rounded-full hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 group"
                    >
                        <Bell className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
                        <span className="text-xl font-bold text-white">Subscribe</span>
                    </motion.button>

                    {/* Share Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 px-8 py-4 bg-slate-800 rounded-full border border-slate-700 hover:bg-slate-700 hover:border-green-500 transition-all group"
                    >
                        <Share2 className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform" />
                        <span className="text-xl font-bold text-white">Share</span>
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default Slide15_ThankYou;
