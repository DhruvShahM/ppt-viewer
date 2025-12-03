import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Server, Shield, Database, ArrowRight, XCircle } from 'lucide-react';

const Slide4_BasicFlow = () => {
    const [requestStatus, setRequestStatus] = useState('allowed'); // allowed, blocked

    useEffect(() => {
        const interval = setInterval(() => {
            setRequestStatus(prev => prev === 'allowed' ? 'blocked' : 'allowed');
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <h2 className="text-5xl font-bold text-white mb-16 z-10">Basic Flow of Rate Limiting</h2>

            <div className="flex items-center justify-between w-full max-w-6xl z-10 relative">

                {/* Client */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="bg-blue-500/20 p-6 rounded-2xl border border-blue-500/50">
                        <Smartphone size={48} className="text-blue-400" />
                    </div>
                    <span className="text-xl text-slate-300 font-medium">Client</span>
                </div>

                {/* Arrow 1 */}
                <ArrowFlow status="always" />

                {/* API Gateway */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="bg-purple-500/20 p-6 rounded-2xl border border-purple-500/50">
                        <Server size={48} className="text-purple-400" />
                    </div>
                    <span className="text-xl text-slate-300 font-medium">API Gateway</span>
                </div>

                {/* Arrow 2 */}
                <ArrowFlow status="always" />

                {/* Rate Limiter */}
                <div className="flex flex-col items-center space-y-4 relative">
                    <motion.div
                        animate={{
                            borderColor: requestStatus === 'allowed' ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)',
                            backgroundColor: requestStatus === 'allowed' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'
                        }}
                        className="p-6 rounded-2xl border transition-colors duration-300"
                    >
                        <Shield size={48} className={requestStatus === 'allowed' ? "text-green-400" : "text-red-400"} />
                    </motion.div>
                    <span className="text-xl text-slate-300 font-medium">Rate Limiter</span>

                    {/* Gate Animation */}
                    <motion.div
                        animate={{ rotateX: requestStatus === 'allowed' ? 90 : 0 }}
                        className="absolute -bottom-8 w-24 h-2 bg-slate-500 rounded-full origin-bottom"
                        style={{ perspective: 100 }}
                    />
                </div>

                {/* Arrow 3 (Conditional) */}
                <div className="w-24 h-12 flex items-center justify-center relative">
                    <AnimatePresence mode='wait'>
                        {requestStatus === 'allowed' ? (
                            <motion.div
                                key="allowed"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <ArrowRight size={32} className="text-green-500" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="blocked"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="flex flex-col items-center"
                            >
                                <XCircle size={32} className="text-red-500" />
                                <span className="text-xs text-red-400 mt-1">429 Too Many Requests</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Application */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="bg-green-500/20 p-6 rounded-2xl border border-green-500/50">
                        <Database size={48} className="text-green-400" />
                    </div>
                    <span className="text-xl text-slate-300 font-medium">Application</span>
                </div>
            </div>

            {/* Request Particle Animation */}
            <RequestParticle status={requestStatus} />

        </div>
    );
};

const ArrowFlow = () => (
    <div className="flex items-center text-slate-600">
        <ArrowRight size={32} />
    </div>
);

const RequestParticle = ({ status }) => {
    return (
        <motion.div
            key={status} // Reset animation on status change
            className="absolute top-1/2 left-[15%] w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] z-20"
            initial={{ x: 0, opacity: 1 }}
            animate={status === 'allowed' ? {
                x: [0, 250, 500, 750, 1000], // Approximate positions
                opacity: [1, 1, 1, 1, 0]
            } : {
                x: [0, 250, 500, 450], // Bounce back
                opacity: [1, 1, 1, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
    );
};

import { AnimatePresence } from 'framer-motion';

export default Slide4_BasicFlow;
