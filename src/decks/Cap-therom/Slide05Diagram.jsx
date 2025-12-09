// Full code as provided in chat
// Slide05Diagram.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Server, Wifi, Database } from 'lucide-react';

const Slide05Diagram = () => {
    // motion for nodes and arrows
    const nodeAnim = { initial: { scale: 0.95, opacity: 0 }, animate: { scale: 1, opacity: 1 } };
    const arrowAnim = { animate: { x: [0, 10, 0], opacity: [0.6, 1, 0.6] }, transition: { repeat: Infinity, duration: 2 } };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 text-white p-8 relative overflow-hidden">
            <motion.div className="z-10 text-center max-w-6xl w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Animated Architecture / Flow
                </motion.h2>

                <div className="mt-8 flex items-center justify-center gap-12">
                    {/* Node A */}
                    <motion.div {...nodeAnim} className="w-40 p-4 rounded-xl bg-slate-900/50 flex flex-col items-center gap-3">
                        <Server />
                        <div className="font-semibold">Service A</div>
                        <div className="text-sm text-slate-300">Writes to local store</div>
                    </motion.div>

                    {/* Arrows and Network */}
                    <div className="relative w-64 h-40 flex items-center justify-center">
                        {/* moving arrow representing replication */}
                        <motion.div
                            className="absolute left-0 top-6 w-40 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                            {...arrowAnim}
                            style={{ transformOrigin: 'left' }}
                        />
                        {/* Partition overlay (simulated) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.0, 0.12, 0.0] }}
                            transition={{ repeat: Infinity, duration: 6 }}
                            className="absolute inset-0 rounded-xl pointer-events-none"
                        />
                        <motion.div className="absolute -bottom-10 left-3 flex items-center gap-2 text-xs text-slate-400">
                            <Wifi />
                            <span>Network / Replication</span>
                        </motion.div>
                    </div>

                    {/* Node B */}
                    <motion.div {...nodeAnim} className="w-40 p-4 rounded-xl bg-slate-900/50 flex flex-col items-center gap-3">
                        <Database />
                        <div className="font-semibold">Service B</div>
                        <div className="text-sm text-slate-300">Reads replicated data</div>
                    </motion.div>
                </div>

                {/* Animated partition event */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-10 max-w-3xl mx-auto p-4 rounded-lg bg-slate-900/40"
                >
                    <div className="text-sm text-slate-300">
                        Simulated partition: replication arrows slow or stop → shows CAP choices (CA vs AP)
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Slide05Diagram;
