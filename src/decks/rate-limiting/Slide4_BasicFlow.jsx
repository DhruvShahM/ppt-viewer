import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Server, ShieldCheck, ArrowRight, Database } from 'lucide-react';

const Slide4_BasicFlow = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const id = Date.now();
            const isAllowed = Math.random() > 0.3; // 70% allowed
            setRequests(prev => [...prev, { id, isAllowed, step: 0 }]);
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-900 text-white p-8">
            <h2 className="text-4xl font-bold mb-16 text-blue-400">Basic Flow of Rate Limiting</h2>

            <div className="flex items-center justify-between w-full max-w-6xl relative h-[400px]">

                {/* Components */}
                <div className="flex flex-col items-center z-10">
                    <User size={64} className="text-gray-300 mb-4" />
                    <span className="text-xl font-semibold">Client</span>
                </div>

                <div className="flex flex-col items-center z-10">
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-600">
                        <ShieldCheck size={64} className="text-purple-400 mb-4" />
                    </div>
                    <span className="text-xl font-semibold mt-4">API Gateway / Rate Limiter</span>
                </div>

                <div className="flex flex-col items-center z-10">
                    <Server size={64} className="text-blue-400 mb-4" />
                    <span className="text-xl font-semibold">Application</span>
                </div>

                {/* Connecting Lines */}
                <div className="absolute top-[100px] left-[100px] right-[100px] h-1 bg-slate-700 -z-0" />

                {/* Moving Requests */}
                <AnimatePresence>
                    {requests.map((req) => (
                        <RequestAnimation key={req.id} isAllowed={req.isAllowed} />
                    ))}
                </AnimatePresence>

            </div>
        </div>
    );
};

const RequestAnimation = ({ isAllowed }) => {
    return (
        <motion.div
            className={`absolute top-[84px] w-8 h-8 rounded-full flex items-center justify-center z-20 ${isAllowed ? 'bg-green-500' : 'bg-red-500'}`}
            initial={{ left: '10%', opacity: 1 }}
            animate={isAllowed ? {
                left: ['10%', '50%', '90%'],
                opacity: [1, 1, 0]
            } : {
                left: ['10%', '48%'],
                y: [0, 0, 50, 100],
                opacity: [1, 1, 1, 0]
            }}
            transition={{
                duration: 2,
                times: isAllowed ? [0, 0.5, 1] : [0, 0.4, 0.6, 1],
                ease: "linear"
            }}
        >
            <div className="text-[10px] font-bold text-white">REQ</div>
        </motion.div>
    );
};

export default Slide4_BasicFlow;
