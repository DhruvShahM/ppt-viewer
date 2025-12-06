import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Slide1_Title = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 text-white p-8 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center z-10"
            >
                <div className="flex items-center justify-center gap-3 mb-6">
                    <Sparkles className="text-yellow-400" size={48} />
                </div>
                <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Imported Deck
                </h1>
                <p className="text-2xl text-gray-400 max-w-2xl mx-auto">
                    Demonstrating the new dynamic import functionality for your presentation tool.
                </p>
            </motion.div>
        </div>
    );
};

export default Slide1_Title;