import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, Share2, Bell } from 'lucide-react';

const Slide15_ThankYou = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden text-white">

            {/* Background Animation */}
            <div className="absolute inset-0 opacity-30">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full blur-3xl"
                        style={{
                            width: Math.random() * 400 + 200,
                            height: Math.random() * 400 + 200,
                            left: Math.random() * 100 + "%",
                            top: Math.random() * 100 + "%",
                        }}
                        animate={{
                            x: [0, 100, 0],
                            y: [0, 100, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="z-10 text-center"
            >
                <h1 className="text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                    Thank You!
                </h1>

                <p className="text-2xl text-gray-300 mb-12">
                    Questions?
                </p>

                <div className="flex gap-8 justify-center">
                    {[
                        { icon: ThumbsUp, link: "#", label: "Like", color: "text-blue-400" },
                        { icon: Share2, link: "#", label: "Share", color: "text-green-400" },
                        { icon: Bell, link: "#", label: "Subscribe", color: "text-red-400" }
                    ].map((action, index) => (
                        <motion.button
                            key={index}
                            className="flex items-center gap-3 px-8 py-4 rounded-full hover:bg-slate-700 transition-colors border border-slate-700"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                        >
                            <action.icon size={24} className={action.color} />
                            <span className="text-xl font-semibold">{action.label}</span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

        </div>
    );
};

export default Slide15_ThankYou;