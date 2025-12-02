import React from 'react';
import { motion } from 'framer-motion';

const Slide6_Code = () => {
    return (
        <div className="h-full w-full bg-[#1e1e1e] p-12 flex items-center justify-center relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00ADD8] to-pink-500" />

            <div className="grid grid-cols-2 gap-12 w-full max-w-6xl items-center">
                {/* Code Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#2d2d2d] rounded-xl shadow-2xl overflow-hidden border border-slate-700 relative"
                >
                    {/* Execution Highlight Bar */}
                    <motion.div
                        className="absolute left-0 w-1 bg-yellow-500/50 z-10"
                        initial={{ top: 60, height: 20, opacity: 0 }}
                        animate={{
                            top: [60, 100, 140, 180, 260],
                            opacity: [0, 1, 1, 1, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
                        style={{ width: "100%" }}
                    />

                    <div className="flex items-center gap-2 px-4 py-3 bg-[#252526] border-b border-slate-700">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="ml-2 text-xs text-slate-400 font-mono">main.go</span>
                    </div>
                    <div className="p-6 font-mono text-sm leading-relaxed relative z-0">
                        <div className="text-pink-400">package</div> <div className="text-white inline">main</div>
                        <br /><br />
                        <div className="text-pink-400">import</div> <div className="text-orange-300">"fmt"</div>
                        <br /><br />
                        <div className="text-pink-400">func</div> <div className="text-blue-400">main</div>() {'{'}
                        <br />
                        &nbsp;&nbsp;<div className="text-green-400">// The "go" keyword starts a goroutine</div>
                        <br />
                        &nbsp;&nbsp;<div className="text-pink-400">go</div> <div className="text-pink-400">func</div>() {'{'}
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<div className="text-white">fmt.Println(</div><div className="text-orange-300">"Anime Gopher says hi!"</div><div className="text-white">)</div>
                        <br />
                        &nbsp;&nbsp;{'}'}()
                        <br /><br />
                        &nbsp;&nbsp;<div className="text-white">fmt.Println(</div><div className="text-orange-300">"Main function continues..."</div><div className="text-white">)</div>
                        <br />
                        {'}'}
                    </div>
                </motion.div>

                {/* Gopher Typing & Spawning Animation */}
                <div className="flex flex-col items-center relative h-[400px] justify-center">
                    {/* Main Thread Gopher */}
                    <motion.div
                        className="absolute top-0"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center border-4 border-blue-500 z-10 relative">
                            <span className="text-5xl">🤖</span>
                            <div className="absolute -bottom-8 bg-blue-500 text-white text-xs px-2 py-1 rounded">Main Thread</div>
                        </div>
                    </motion.div>

                    {/* Spawned Goroutine */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0, 1, 1, 0],
                            x: [0, 100, 150, 200],
                            y: [0, 50, 100, 150]
                        }}
                        transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, times: [0, 0.4, 0.8, 1] }}
                        className="absolute top-16"
                    >
                        <div className="w-24 h-24 bg-pink-500/20 rounded-full flex items-center justify-center border-2 border-pink-500 border-dashed">
                            <span className="text-4xl">🐹</span>
                            <div className="absolute -bottom-8 bg-pink-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Goroutine</div>
                        </div>
                    </motion.div>

                    <div className="absolute bottom-0 text-center">
                        <h3 className="text-2xl font-bold text-white">
                            Just add <span className="text-pink-400 font-mono bg-pink-400/10 px-2 py-1 rounded">go</span>!
                        </h3>
                        <p className="text-slate-400 mt-2">
                            It spins up a lightweight thread managed by the Go Runtime.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide6_Code;
