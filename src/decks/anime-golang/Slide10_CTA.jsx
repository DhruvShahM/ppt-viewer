import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Twitter, Github } from 'lucide-react';

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
            </div>
        </div>
    );
};

export default Slide10_CTA;
