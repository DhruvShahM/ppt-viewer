import React from 'react';
import { motion } from 'framer-motion';
import { FaYoutube, FaThumbsUp, FaShareAlt, FaBell } from 'react-icons/fa';

const YouTubeEnding = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center text-white p-8">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-12"
            >
                <motion.h2
                    className="text-6xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Thanks for Watching!
                </motion.h2>

                <div className="flex gap-8 justify-center items-center">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex flex-col items-center gap-4 bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20"
                    >
                        <FaThumbsUp className="text-5xl text-blue-400" />
                        <span className="text-xl font-semibold">Like</span>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex flex-col items-center gap-4 bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20"
                    >
                        <FaShareAlt className="text-5xl text-green-400" />
                        <span className="text-xl font-semibold">Share</span>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex flex-col items-center gap-4 bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20"
                    >
                        <FaYoutube className="text-5xl text-red-500" />
                        <span className="text-xl font-semibold">Subscribe</span>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex flex-col items-center gap-4 bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20"
                    >
                        <FaBell className="text-5xl text-yellow-400" />
                        <span className="text-xl font-semibold">Turn on Notifications</span>
                    </motion.div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl text-gray-300"
                >
                    Don't forget to check out the description for more resources!
                </motion.p>
            </motion.div>
        </div>
    );
};

export default YouTubeEnding;
