import React from 'react';
import { motion } from 'framer-motion';

const Slide3_Code = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 text-white p-8">
            <h2 className="text-3xl font-bold mb-8 text-cyan-400">Code Example</h2>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-2xl w-full max-w-3xl font-mono text-sm leading-relaxed"
            >
                <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-gray-300">
                    <span className="text-purple-400">const</span> <span className="text-blue-400">Greeting</span> = () ={'>'} {'{'}
                    <br />
                    &nbsp;&nbsp;<span className="text-purple-400">return</span> (
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-red-400">h1</span>&gt;Hello World&lt;/<span className="text-red-400">h1</span>&gt;
                    <br />
                    &nbsp;&nbsp;);
                    <br />
                    {'}'};
                </div>
            </motion.div>
        </div>
    );
};

export default Slide3_Code;