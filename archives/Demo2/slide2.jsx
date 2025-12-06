import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap } from 'lucide-react';

const Slide2_List = () => {
    const items = [
        "Dynamic File Uploads",
        "Automatic Route Generation",
        "Instant Preview",
        "No Server Restart Required"
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemAnim = {
        hidden: { opacity: 0, x: -50 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 text-white p-12">
            <div className="max-w-4xl w-full">
                <div className="flex items-center gap-4 mb-16 border-b border-white/10 pb-6">
                    <div className="p-3 bg-blue-500/20 rounded-xl">
                        <Zap className="text-blue-400" size={32} />
                    </div>
                    <h2 className="text-4xl font-bold">Key Features</h2>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid gap-6"
                >
                    {items.map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemAnim}
                            className="bg-white/5 border border-white/10 p-6 rounded-xl flex items-center gap-4 hover:bg-white/10 transition-colors"
                        >
                            <CheckCircle className="text-green-400 flex-shrink-0" size={24} />
                            <span className="text-xl font-medium">{item}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Slide2_List;