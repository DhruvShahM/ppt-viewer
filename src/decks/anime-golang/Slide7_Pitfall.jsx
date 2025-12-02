import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const Slide7_Pitfall = () => {
    return (
        <div className="h-full w-full bg-slate-900 p-12 flex flex-col items-center justify-center relative">
            <h2 className="text-4xl font-bold text-white mb-12">
                Expectation vs <span className="text-red-500">Reality</span>
            </h2>

            <div className="grid grid-cols-2 gap-12 w-full max-w-5xl">
                {/* Expected Output */}
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-green-500/30">
                    <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                        <span className="text-xl">✅</span> Expected
                    </h3>
                    <div className="bg-black p-4 rounded-lg font-mono text-sm text-slate-300">
                        Main function continues...<br />
                        Anime Gopher says hi!
                    </div>
                </div>

                {/* Actual Output */}
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-red-500/30 relative">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -top-4 -right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold"
                    >
                        OOF!
                    </motion.div>
                    <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                        <span className="text-xl">❌</span> Actual
                    </h3>
                    <div className="bg-black p-4 rounded-lg font-mono text-sm text-slate-300">
                        Main function continues...
                    </div>
                    <p className="text-xs text-slate-500 mt-2 italic">(Program exits before goroutine starts!)</p>
                </div>
            </div>

            {/* Explanation Bubble */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 flex items-start gap-6 max-w-3xl bg-white/5 p-8 rounded-3xl border border-white/10"
            >
                <div className="w-24 h-24 bg-slate-800 rounded-full flex-shrink-0 flex items-center justify-center text-4xl border-2 border-red-500">
                    😱
                </div>
                <div>
                    <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        <AlertTriangle className="text-yellow-500" /> Why did this happen?
                    </h4>
                    <p className="text-slate-300 leading-relaxed">
                        The <code className="bg-slate-800 px-1 rounded text-pink-400">main()</code> function doesn't wait for goroutines! When main finishes, the program dies instantly.
                        <br />
                        <span className="text-[#00ADD8] font-bold mt-2 block">Solution: Use WaitGroups or Channels!</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Slide7_Pitfall;
