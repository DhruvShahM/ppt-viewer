import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Ban, ArrowRightCircle } from 'lucide-react';

const Slide12_Exceeded = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <h2 className="text-5xl font-bold text-white mb-16 z-10">Limit Exceeded?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-6xl z-10 items-center">

                {/* Visual Alert */}
                <div className="flex flex-col items-center justify-center relative">
                    {/* Red Alert Background Pulse */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute w-96 h-96 bg-red-500/20 rounded-full blur-3xl -z-10"
                    />

                    <motion.div
                        animate={{ x: [-5, 5, -5] }}
                        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 2 }}
                        className="text-[150px] font-black text-red-500 leading-none"
                    >
                        429
                    </motion.div>
                    <div className="text-3xl font-bold text-red-400 mt-4 uppercase tracking-widest">Too Many Requests</div>
                </div>

                {/* Consequences List */}
                <div className="space-y-8">
                    <ResultItem
                        icon={AlertTriangle}
                        text="HTTP 429 Status Code"
                        delay={0.2}
                        color="text-red-400"
                    />
                    <ResultItem
                        icon={Clock}
                        text="Retry-After Header"
                        subtext="Wait 60 seconds..."
                        delay={0.4}
                        color="text-orange-400"
                    />
                    <ResultItem
                        icon={Ban}
                        text="Temporary Block"
                        delay={0.6}
                        color="text-slate-400"
                    />
                    <ResultItem
                        icon={ArrowRightCircle}
                        text="Redirect to Queue"
                        delay={0.8}
                        color="text-blue-400"
                    />
                </div>
            </div>
        </div>
    );
};

const ResultItem = ({ icon: Icon, text, subtext, delay, color }) => (
    <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay, duration: 0.5 }}
        className="flex items-center space-x-6 bg-slate-800/40 p-6 rounded-xl border border-slate-700/50"
    >
        <Icon size={40} className={color} />
        <div>
            <div className="text-2xl font-bold text-slate-200">{text}</div>
            {subtext && <div className="text-slate-400 mt-1 font-mono">{subtext}</div>}
        </div>
    </motion.div>
);

export default Slide12_Exceeded;
