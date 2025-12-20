# Rate Limiting Presentation - All Slides (Background Colors Removed)

## Slide1_Title.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';

const Slide1_Title = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-blue-400 rounded-full opacity-20"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        y: [null, Math.random() * -100],
                        x: [null, (Math.random() - 0.5) * 50],
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        width: Math.random() * 10 + 5,
                        height: Math.random() * 10 + 5,
                    }}
                />
            ))}

            {/* Flowing Gradient Overlay */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
                animate={{
                    x: ['-100%', '100%'],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Title */}
            <motion.h1
                className="text-6xl font-bold text-white mb-6 text-center z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                Rate Limiting <br />
                <span className="text-blue-400">In-depth Explained</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                className="text-2xl text-gray-300 z-10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
            >
                "How systems control and limit traffic safely"
            </motion.p>
        </div>
    );
};

export default Slide1_Title;
```

## Slide2_WhatIs.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hand, Ban, ShieldAlert } from 'lucide-react';

const Slide2_WhatIs = () => {
    const [count, setCount] = useState(0);
    const [blocked, setBlocked] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => {
                if (prev >= 10) {
                    setBlocked(true);
                    return prev;
                }
                return prev + 1;
            });
        }, 400);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-white p-8">
            <h2 className="text-4xl font-bold mb-12 text-blue-400">What is Rate Limiting?</h2>

            <div className="grid grid-cols-2 gap-12 w-full max-w-6xl">
                {/* Left: Text Content */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="p-6 rounded-xl border border-slate-700"
                    >
                        <p className="text-xl leading-relaxed">
                            Rate Limiting is a technique used to control how many requests a user or service can make in a given time period.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="space-y-4"
                    >
                        <h3 className="text-2xl font-semibold text-gray-300">Examples:</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-lg p-3 rounded-lg">
                                <span className="text-green-400">✓</span> "Max 100 requests per minute"
                            </li>
                            <li className="flex items-center gap-3 text-lg p-3 rounded-lg">
                                <span className="text-green-400">✓</span> "Only 5 login attempts per hour"
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Right: Animation */}
                <div className="flex flex-col items-center justify-center rounded-2xl p-8 border border-slate-700 relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-sm text-gray-400">
                        Requests: {count} / 10
                    </div>

                    <div className="relative">
                        <motion.div
                            animate={blocked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {blocked ? (
                                <Ban size={120} className="text-red-500" />
                            ) : (
                                <Hand size={120} className="text-blue-400" />
                            )}
                        </motion.div>

                        {/* Tapping animation */}
                        {!blocked && (
                            <motion.div
                                className="absolute top-0 left-0 rounded-full border-4 border-blue-400"
                                style={{ width: 120, height: 120 }}
                                animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                                transition={{ duration: 0.4, repeat: Infinity }}
                            />
                        )}
                    </div>

                    <motion.div
                        className="mt-8 text-2xl font-bold"
                        animate={{ color: blocked ? "#EF4444" : "#60A5FA" }}
                    >
                        {blocked ? "STOP! Limit Reached" : "Processing Requests..."}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Slide2_WhatIs;
```

## Slide3_WhyNeed.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const Slide3_WhyNeed = () => {
    const [protected_state, setProtectedState] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setProtectedState(true);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-white p-8">
            <h2 className="text-4xl font-bold mb-12 text-blue-400">Why Rate Limiting is Needed?</h2>

            <div className="grid grid-cols-2 gap-12 w-full max-w-6xl">
                {/* Left: Problems Solved List */}
                <div className="space-y-6">
                    {[
                        "Prevent DDoS attacks",
                        "Stop API abuse",
                        "Protect servers from overload",
                        "Reduce cost & misuse",
                        "Ensure fair usage"
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="flex items-center gap-4 p-4 rounded-lg border border-slate-700"
                        >
                            <CheckCircle className="text-green-400" size={24} />
                            <span className="text-xl">{item}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Right: Animation */}
                <div className="flex flex-col items-center justify-center rounded-2xl p-8 border border-slate-700 relative overflow-hidden h-[400px]">
                    {/* Traffic Particles */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(protected_state ? 5 : 20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`absolute rounded-full ${protected_state ? 'bg-blue-400' : 'bg-red-500'}`}
                                style={{ width: 8, height: 8, left: -10 }}
                                animate={{
                                    x: [0, 500],
                                    y: [Math.random() * 400, 200]
                                }}
                                transition={{
                                    duration: protected_state ? 2 : 0.5,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                    ease: "linear"
                                }}
                            />
                        ))}
                    </div>

                    {/* Server Icon */}
                    <motion.div
                        className="z-10 relative"
                        animate={protected_state ? {} : {
                            x: [-5, 5, -5, 5, 0],
                            rotate: [-2, 2, -2, 2, 0]
                        }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                    >
                        <Server size={120} className={protected_state ? "text-blue-400" : "text-red-500"} />
                        {!protected_state && (
                            <motion.div
                                className="absolute -top-8 -right-8"
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            >
                                <AlertTriangle size={40} className="text-yellow-500" />
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Shield Animation */}
                    {protected_state && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 1 }}
                            transition={{ duration: 0.5, type: "spring" }}
                            className="absolute z-20"
                        >
                            <Shield size={100} className="text-green-400 opacity-80" />
                        </motion.div>
                    )}

                    <div className="mt-12 z-10 text-xl font-bold">
                        {protected_state ? (
                            <span className="text-green-400">Protected & Stable</span>
                        ) : (
                            <span className="text-red-500 animate-pulse">Server Overload!</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide3_WhyNeed;
```

## Slide4_BasicFlow.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Server, ShieldCheck, ArrowRight, Database } from 'lucide-react';

const Slide4_BasicFlow = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const id = Date.now();
            const isAllowed = Math.random() > 0.3;
            setRequests(prev => [...prev, { id, isAllowed, step: 0 }]);
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-white p-8">
            <h2 className="text-4xl font-bold mb-16 text-blue-400">Basic Flow of Rate Limiting</h2>

            <div className="flex items-center justify-between w-full max-w-6xl relative h-[400px]">

                {/* Components */}
                <div className="flex flex-col items-center z-10">
                    <User size={64} className="text-gray-300 mb-4" />
                    <span className="text-xl font-semibold">Client</span>
                </div>

                <div className="flex flex-col items-center z-10">
                    <div className="p-6 rounded-lg border border-slate-600">
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
                ease: "easeInOut"
            }}
        >
            <div className="text-[10px] font-bold text-white">REQ</div>
        </motion.div>
    );
};

export default Slide4_BasicFlow;
```

## Slide5_Algorithms.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Sliders, Box, Droplets } from 'lucide-react';

const algorithms = [
    {
        title: "Fixed Window",
        icon: Clock,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        desc: "Resets count at fixed intervals"
    },
    {
        title: "Sliding Window",
        icon: Sliders,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        desc: "Smoother rolling time window"
    },
    {
        title: "Token Bucket",
        icon: Box,
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        desc: "Tokens refill, allows bursts"
    },
    {
        title: "Leaky Bucket",
        icon: Droplets,
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/30",
        desc: "Constant output rate"
    }
];

const Slide5_Algorithms = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-white p-8">
            <h2 className="text-5xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Popular Algorithms
            </h2>

            <div className="grid grid-cols-2 gap-8 w-full max-w-5xl" style={{ perspective: '1000px' }}>
                {algorithms.map((algo, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, rotateY: 90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.2,
                            type: "spring",
                            stiffness: 100
                        }}
                        className={`p-8 rounded-2xl border ${algo.border} ${algo.bg} backdrop-blur-sm flex flex-col items-center justify-center gap-6 cursor-pointer`}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.2 + 0.4, type: "spring" }}
                            className={`p-4 rounded-full ${algo.color}`}
                        >
                            <algo.icon size={48} />
                        </motion.div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-2">{algo.title}</h3>
                            <p className="text-gray-400">{algo.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Slide5_Algorithms;
```

## Slide6_FixedWindow.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle } from 'lucide-react';

const Slide6_FixedWindow = () => {
    const [windowTime, setWindowTime] = useState(0);
    const [requests, setRequests] = useState([]);
    const [burst, setBurst] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setWindowTime(prev => {
                if (prev >= 100) {
                    setRequests([]);
                    setBurst(false);
                    return 0;
                }
                return prev + 1;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (windowTime > 80 && windowTime < 95) {
            setBurst(true);
            if (Math.random() > 0.5) {
                setRequests(prev => [...prev, { id: Date.now(), x: Math.random() * 80 }]);
            }
        } else if (windowTime % 10 === 0 && windowTime < 80) {
            setRequests(prev => [...prev, { id: Date.now(), x: Math.random() * 80 }]);
        }
    }, [windowTime]);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-white p-8">
            <h2 className="text-4xl font-bold mb-12 text-blue-400">Fixed Window Algorithm</h2>

            <div className="grid grid-cols-2 gap-12 w-full max-w-6xl">
                {/* Left: Explanation */}
                <div className="space-y-8">
                    <div className="p-6 rounded-xl border border-slate-700 space-y-4">
                        <h3 className="text-2xl font-semibold flex items-center gap-3">
                            <Clock className="text-blue-400" /> Concept
                        </h3>
                        <ul className="space-y-3 text-lg text-gray-300">
                            <li>• Time divided into equal windows (e.g., 1 min)</li>
                            <li>• Max allowed requests per window</li>
                            <li>• Counter resets at start of new window</li>
                        </ul>
                    </div>

                    <motion.div
                        className="p-6 rounded-xl border border-red-500/30"
                        animate={{ scale: burst ? 1.05 : 1 }}
                    >
                        <h3 className="text-2xl font-semibold flex items-center gap-3 text-red-400">
                            <AlertCircle /> The "Burst" Problem
                        </h3>
                        <p className="mt-2 text-gray-300">
                            Traffic can spike at the edges of the window, allowing 2x limit in short time.
                        </p>
                    </motion.div>
                </div>

                {/* Right: Animation */}
                <div className="flex flex-col items-center justify-center rounded-2xl p-8 border border-slate-700 relative h-[400px]">

                    {/* Window Container */}
                    <div className="w-full h-64 border-2 border-dashed border-slate-500 rounded-lg relative overflow-hidden">
                        <div className="absolute top-2 right-2 text-xs text-gray-400">Current Window</div>

                        {/* Progress Bar */}
                        <div className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-75" style={{ width: `${windowTime}%` }} />

                        {/* Requests */}
                        <div className="absolute bottom-2 left-2 right-2 flex flex-wrap content-end gap-1 h-full p-2">
                            {requests.map((req, i) => (
                                <motion.div
                                    key={req.id}
                                    initial={{ scale: 0, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold ${i > 10 ? 'bg-red-500' : 'bg-green-500'}`}
                                >
                                    REQ
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Timer */}
                    <div className="mt-6 flex items-center gap-4">
                        <Clock className="animate-spin text-blue-400" size={32} />
                        <span className="text-2xl font-mono">{windowTime}%</span>
                        {burst && <span className="text-red-500 font-bold animate-pulse">BURST DETECTED!</span>}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Slide6_FixedWindow;
```

## Slide7_SlidingWindow.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sliders, CheckCircle } from 'lucide-react';

const Slide7_SlidingWindow = () => {
    const [requests, setRequests] = useState([]);
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = Date.now();
            setNow(currentTime);

            if (Math.random() > 0.7) {
                setRequests(prev => [...prev, { id: currentTime, time: currentTime }]);
            }

            setRequests(prev => prev.filter(req => currentTime - req.time < 6000));
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const windowSize = 3000;

    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-white p-8">
            <h2 className="text-4xl font-bold mb-12 text-purple-400">Sliding Window Algorithm</h2>

            <div className="grid grid-cols-2 gap-12 w-full max-w-6xl">
                {/* Left: Explanation */}
                <div className="space-y-8">
                    <div className="p-6 rounded-xl border border-slate-700 space-y-4">
                        <h3 className="text-2xl font-semibold flex items-center gap-3">
                            <Sliders className="text-purple-400" /> Concept
                        </h3>
                        <ul className="space-y-4 text-lg text-gray-300">
                            <li className="flex items-center gap-3">
                                <CheckCircle size={20} className="text-green-400" />
                                More accurate rate control
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle size={20} className="text-green-400" />
                                Uses timestamps to track requests
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle size={20} className="text-green-400" />
                                Reduces the "burst" issue significantly
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right: Animation */}
                <div className="flex flex-col items-center justify-center rounded-2xl p-8 border border-slate-700 relative h-[400px] overflow-hidden">

                    {/* Timeline */}
                    <div className="w-full h-32 relative border-b-2 border-slate-600 flex items-center">
                        {/* Moving Window */}
                        <div className="absolute top-0 bottom-0 border-l-2 border-r-2 border-purple-500 z-10 w-[50%] right-0 flex items-center justify-center">
                            <span className="text-purple-300 font-bold px-2 rounded">Active Window</span>
                        </div>

                        {/* Requests moving left */}
                        {requests.map(req => {
                            const age = now - req.time;
                            const position = 100 - (age / 6000) * 100;

                            if (position < -10) return null;

                            const inWindow = age < windowSize;
                            return (
                                <motion.div
                                    key={req.id}
                                    className={`absolute w-4 h-4 rounded-full ${inWindow ? 'bg-green-400' : 'bg-gray-600'}`}
                                    style={{ left: `${position}%`, top: '50%' }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                />
                            );
                        })}
                    </div>

                    <div className="mt-8 text-center text-gray-400">
                        Requests slide out of the window smoothly based on time.
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Slide7_SlidingWindow;
```

## Slide8_TokenBucket.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Zap } from 'lucide-react';

const Slide8_TokenBucket = () => {
    const [tokens, setTokens] = useState(5);
    const [requests, setRequests] = useState([]);
    const MAX_TOKENS = 8;

    useEffect(() => {
        const refillInterval = setInterval(() => {
            setTokens(prev => Math.min(prev + 1, MAX_TOKENS));
        }, 1000);

        const requestInterval = setInterval(() => {
            if (Math.random() > 0.4) {
                setRequests(prev => [...prev, { id: Date.now(), processed: false }]);
            }
        }, 600);

        return () => {
            clearInterval(refillInterval);
            clearInterval(requestInterval);
        };
    }, []);

    useEffect(() => {
        if (requests.length > 0) {
            const unprocessed = requests.filter(r => !r.processed);
            if (unprocessed.length > 0) {
                const req = unprocessed[0];
                if (tokens > 0) {
                    setTokens(prev => prev - 1);
                    setRequests(prev => prev.map(r => r.id === req.id ? { ...r, processed: true, status: 'allowed' } : r));
                } else {
                    setRequests(prev => prev.map(r => r.id === req.id ? { ...r, processed: true, status: 'denied' } : r));
                }

                setTimeout(() => {
                    setRequests(prev => prev.filter(r => r.id !== req.id));
                }, 1000);
            }
        }
    }, [requests, tokens]);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-white p-8">
            <h2 className="text-4xl font-bold mb-12 text-green-400">Token Bucket Algorithm</h2>

            <div className="grid grid-cols-2 gap-12 w-full max-w-6xl">
                {/* Left: Explanation */}
                <div className="space-y-8">
                    <div className="p-6 rounded-xl border border-slate-700 space-y-4">
                        <h3 className="text-2xl font-semibold flex items-center gap-3">
                            <Box className="text-green-400" /> Concept
                        </h3>
                        <ul className="space-y-4 text-lg text-gray-300">
                            <li>• Bucket fills with tokens at a steady rate</li>
                            <li>• Each request consumes 1 token</li>
                            <li>• <span className="text-green-400 font-bold">Allows short bursts</span> (until bucket empties)</li>
                        </ul>
                    </div>
                </div>

                {/* Right: Animation */}
                <div className="flex flex-col items-center justify-center rounded-2xl p-8 border border-slate-700 relative h-[400px] overflow-hidden">

                    {/* Bucket Container */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative w-40 h-64 border-4 border-slate-500 border-t-0 rounded-b-xl flex flex-col-reverse items-center p-2 gap-1 overflow-hidden">

                            <AnimatePresence>
                                {[...Array(tokens)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0, y: -100 }}
                                        animate={{ scale: 1, y: 0 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-yellow-600 shadow-[0_0_10px_rgba(250,204,21,0.5)] flex-shrink-0"
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                        <span className="text-gray-400 font-medium">Token Bucket</span>
                    </div>

                    {/* Incoming Requests */}
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2 max-h-[300px] overflow-hidden p-2">
                        <AnimatePresence mode='popLayout'>
                            {requests.filter(r => r.processed).map((req) => (
                                <motion.div
                                    key={req.id}
                                    layout
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -50, opacity: 0 }}
                                    className={`px-4 py-2 rounded-lg font-bold whitespace-nowrap shadow-lg ${req.status === 'allowed' ? 'bg-green-500' : 'bg-red-500'}`}
                                >
                                    {req.status === 'allowed' ? 'Allowed' : 'Denied'}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Refill Animation */}
                    <motion.div
                        className="absolute top-10 left-1/2 -translate-x-1/2"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                    >
                        <Zap className="text-yellow-400 fill-yellow-400" size={32} />
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Slide8_TokenBucket;
```

## Slide9_LeakyBucket.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, ArrowDown } from 'lucide-react';

const Slide9_LeakyBucket = () => {
  const [bucket, setBucket] = useState([]);
  const [inFlight, setInFlight] = useState([]);
  const [processed, setProcessed] = useState([]);
  const CAPACITY = 5;

  useEffect(() => {
    const inputInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        const id = Date.now();
        setInFlight(prev => [...prev, { id }]);
        setTimeout(() => {
          setBucket(prev => {
            if (prev.length < CAPACITY) {
              return [...prev, id];
            }
            return prev;
          });
          setInFlight(prev => prev.filter(d => d.id !== id));
        }, 600);
      }
    }, 700);

    const leakInterval = setInterval(() => {
      setBucket(prev => {
        if (prev.length === 0) return prev;
        const [first, ...rest] = prev;
        setProcessed(p => [...p, { id: first }].slice(-6));
        return rest;
      });
    }, 1400);

    return () => {
      clearInterval(inputInterval);
      clearInterval(leakInterval);
    };
  }, []);

  const waterHeight = `${(bucket.length / CAPACITY) * 100}%`;

  const bucketItemVariants = {
    hidden: { scale: 0.4, opacity: 0, y: 10 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 260, damping: 18 }
    },
    exit: {
      scale: 0.4,
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  const processedVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 200, damping: 20 }
    },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-white p-8">
      <h2 className="text-4xl font-bold mb-12 text-cyan-400">
        Leaky Bucket Algorithm
      </h2>

      <div className="grid grid-cols-2 gap-12 w-full max-w-6xl">
        {/* Explanation */}
        <div className="space-y-8">
          <div className="p-6 rounded-xl border border-slate-700 space-y-4">
            <h3 className="text-2xl font-semibold flex items-center gap-3">
              <Droplets className="text-cyan-400" /> Concept
            </h3>
            <ul className="space-y-3 text-lg text-gray-300">
              <li>• Bursty incoming traffic turns into discrete droplets.</li>
              <li>• Bucket has fixed capacity; overflow requests are dropped.</li>
              <li>• Leak rate is constant, giving a smooth output.</li>
              <li>• Downstream sees a steady, rate-limited flow.</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border border-slate-700 space-y-3 text-gray-300 text-sm">
            <p>
              Top animation: random bursts of requests fall into the bucket.
            </p>
            <p>
              Bucket fills up to capacity; extra drops visually disappear at
              the rim (dropped).
            </p>
            <p>
              Bottom-right: constant-rate green droplets show processed
              requests leaving the bucket.
            </p>
          </div>
        </div>

        {/* Animation */}
        <div className="relative h-[500px] rounded-2xl p-8 border border-slate-700 flex flex-col items-center overflow-hidden">
          {/* Input label */}
          <div className="text-gray-400 text-sm mb-1">Bursty Input</div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
          >
            <ArrowDown size={32} className="text-gray-500" />
          </motion.div>

          {/* In‑flight droplets from top to bucket */}
          <div className="pointer-events-none absolute inset-x-0 top-16 flex justify-center">
            <div className="relative w-40 h-24">
              <AnimatePresence>
                {inFlight.map(drop => (
                  <motion.div
                    key={drop.id}
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 80, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeIn' }}
                    className="absolute left-1/2 -ml-2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Bucket */}
          <div className="relative w-40 h-48 mt-16 border-4 border-slate-500 border-t-0 rounded-b-xl overflow-hidden">
            {/* Water */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 z-0"
              animate={{ height: waterHeight }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />

            {/* Requests as blocks inside bucket */}
            <div className="relative z-10 flex flex-col-reverse items-center gap-1 p-2 h-full">
              <AnimatePresence mode="sync">
                {bucket.map(id => (
                  <motion.div
                    key={id}
                    layout
                    variants={bucketItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full h-6 bg-cyan-400 rounded shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col items-center mt-6 gap-2">
            <div className="w-2 h-8 rounded-full" />
            <div className="text-gray-400 text-sm">Constant Output</div>

            <div className="flex gap-2 mt-2">
              <AnimatePresence mode="sync">
                {processed.map(req => (
                  <motion.div
                    key={req.id}
                    variants={processedVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-8 h-8 rounded-full bg-green-500 text-[10px] font-bold flex items-center justify-center shadow-[0_0_10px_rgba(34,197,94,0.8)]"
                  >
                    OK
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide9_LeakyBucket;
```

## Slide10_Enforcement.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Globe, User, Key } from 'lucide-react';

const techniques = [
    {
        title: "API Gateway",
        desc: "Nginx, Kong, Traefik",
        icon: Server,
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/30"
    },
    {
        title: "Redis Counters",
        desc: "Fast in-memory counting",
        icon: Database,
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/30"
    },
    {
        title: "IP-based Limits",
        desc: "Limit per IP address",
        icon: Globe,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30"
    },
    {
        title: "User-based Limits",
        desc: "Limit per User ID",
        icon: User,
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/30"
    },
    {
        title: "Key-based Limits",
        desc: "API Keys / Tokens",
        icon: Key,
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30"
    }
];

const Slide10_Enforcement = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-white p-8">
            <h2 className="text-4xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                How Systems Enforce Rate Limits
            </h2>

            <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl">
                {techniques.map((tech, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        className={`w-[300px] p-6 rounded-xl border ${tech.border} ${tech.bg} backdrop-blur-sm flex flex-col items-center gap-4 hover:scale-105 transition-transform`}
                    >
                        <div className="relative">
                            <tech.icon size={48} className={tech.color} />
                            <motion.div
                                className={`absolute inset-0 rounded-full ${tech.color} opacity-30`}
                                animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </div>

                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-1">{tech.title}</h3>
                            <p className="text-gray-400 text-sm">{tech.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Slide10_Enforcement;
```

## Slide11_UseCases.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Code, CreditCard, UploadCloud, MessageSquare } from 'lucide-react';

const useCases = [
    {
        title: "Login Attempts",
        icon: Lock,
        color: "text-red-400",
        bg: "bg-red-500/20",
        delay: 0
    },
    {
        title: "API Usage",
        icon: Code,
        color: "text-blue-400",
        bg: "bg-blue-500/20",
        pulse: true,
        delay: 0.1
    },
    {
        title: "Payment Requests",
        icon: CreditCard,
        color: "text-green-400",
        bg: "bg-green-500/20",
        delay: 0.2
    },
    {
        title: "File Uploads",
        icon: UploadCloud,
        color: "text-purple-400",
        bg: "bg-purple-500/20",
        delay: 0.3
    },
    {
        title: "Messaging Apps",
        icon: MessageSquare,
        color: "text-yellow-400",
        bg: "bg-yellow-500/20",
        delay: 0.4
    }
];

const Slide11_UseCases = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-white p-8">
            <h2 className="text-4xl font-bold mb-16 text-white">Where Rate Limiting is Used?</h2>

            <div className="flex flex-wrap justify-center gap-8 w-full max-w-5xl">
                {useCases.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: item.delay
                        }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className={`w-32 h-32 rounded-2xl ${item.bg} flex items-center justify-center relative`}>
                            <item.icon size={64} className={item.color} />

                            {item.pulse && (
                                <motion.div
                                    className={`absolute inset-0 rounded-2xl border-2 ${item.color.replace('text', 'border')} opacity-50`}
                                    animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            )}
                        </div>

                        <h3 className="text-xl font-semibold text-gray-300">{item.title}</h3>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Slide11_UseCases;
```

## Slide12_LimitExceeded.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Ban, ArrowRight } from 'lucide-react';

const Slide12_LimitExceeded = () => {
    const [retryTime, setRetryTime] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            setRetryTime(prev => (prev > 0 ? prev - 1 : 30));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-white p-8">
            <h2 className="text-4xl font-bold mb-12 text-red-500">What Happens When Limit is Exceeded?</h2>

            <div className="grid grid-cols-2 gap-12 w-full max-w-6xl">
                {/* Left: List */}
                <div className="space-y-6">
                    {[
                        { text: "HTTP 429 Too Many Requests", icon: AlertTriangle },
                        { text: "Retry-After header", icon: Clock },
                        { text: "Temporary block", icon: Ban },
                        { text: "Redirect to queue", icon: ArrowRight }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.2 }}
                            className="flex items-center gap-4 p-4 rounded-lg border border-slate-700"
                        >
                            <item.icon className="text-red-400" size={28} />
                            <span className="text-xl">{item.text}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Right: Animation */}
                <div className="flex flex-col items-center justify-center rounded-2xl p-8 border border-red-500/30 relative h-[400px]">
                    {/* 429 Shake Animation */}
                    <motion.div
                        className="text-8xl font-bold text-red-500 mb-8"
                        animate={{ x: [-5, 5, -5, 5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                        429
                    </motion.div>

                    <div className="text-2xl font-semibold mb-8">Too Many Requests</div>

                    {/* Retry Timer */}
                    <div className="flex items-center gap-4 px-6 py-3 rounded-full border border-slate-600">
                        <Clock className="text-yellow-400 animate-pulse" />
                        <span className="text-xl font-mono text-gray-300">
                            Retry-After: <span className="text-white font-bold">{retryTime}s</span>
                        </span>
                    </div>

                    {/* Alert Overlay */}
                    <motion.div
                        className="absolute inset-0 z-0"
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                </div>
            </div>
        </div>
    );
};

export default Slide12_LimitExceeded;
```

## Slide13_Distributed.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Network, Globe } from 'lucide-react';

const Slide13_Distributed = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-white p-8">
            <h2 className="text-4xl font-bold mb-12 text-blue-400">Distributed Rate Limiting</h2>

            <div className="grid grid-cols-2 gap-12 w-full max-w-6xl">
                {/* Left: Text Content */}
                <div className="space-y-8">
                    <div className="p-6 rounded-xl border border-slate-700">
                        <h3 className="text-2xl font-semibold mb-4 text-purple-400">Needed for:</h3>
                        <ul className="space-y-3 text-lg text-gray-300">
                            <li className="flex items-center gap-3"><Globe size={20} /> Microservices</li>
                            <li className="flex items-center gap-3"><Network size={20} /> Multi-region systems</li>
                            <li className="flex items-center gap-3"><Server size={20} /> High-scale APIs</li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-xl border border-slate-700">
                        <h3 className="text-2xl font-semibold mb-4 text-green-400">Usually uses:</h3>
                        <ul className="space-y-3 text-lg text-gray-300">
                            <li className="flex items-center gap-3"><Database size={20} /> Redis / Memcached</li>
                            <li className="flex items-center gap-3"><Server size={20} /> In-memory clusters</li>
                            <li className="flex items-center gap-3"><Network size={20} /> API Gateways with shared counters</li>
                        </ul>
                    </div>
                </div>

                {/* Right: Animation */}
                <div className="flex flex-col items-center justify-center rounded-2xl p-8 border border-slate-700 relative h-[450px]">

                    {/* Central Redis */}
                    <motion.div
                        className="z-20 p-4 rounded-lg border border-red-500 flex flex-col items-center"
                        animate={{ boxShadow: ["0 0 0px rgba(239,68,68,0)", "0 0 20px rgba(239,68,68,0.5)", "0 0 0px rgba(239,68,68,0)"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Database size={48} className="text-red-500" />
                        <span className="text-sm font-bold mt-2">Shared Redis</span>
                    </motion.div>

                    {/* Left Servers */}
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute p-3 rounded-lg border border-slate-600 z-10"
                            style={{
                                top: i === 0 ? '20%' : i === 1 ? '50%' : '80%',
                                left: i === 1 ? '10%' : '20%',
                                transform: 'translate(-50%, -50%)'
                            }}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <Server size={32} className="text-blue-400" />
                            <div className="text-xs mt-1">Service {i + 1}</div>
                        </motion.div>
                    ))}

                    {/* Right Servers */}
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute p-3 rounded-lg border border-slate-600 z-10"
                            style={{
                                top: i === 0 ? '20%' : i === 1 ? '50%' : '80%',
                                right: i === 1 ? '10%' : '20%',
                                transform: 'translate(50%, -50%)'
                            }}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <Server size={32} className="text-green-400" />
                            <div className="text-xs mt-1">Service {i + 4}</div>
                        </motion.div>
                    ))}

                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        {[0, 1, 2].map(i => (
                            <React.Fragment key={i}>
                                <motion.line
                                    x1={i === 1 ? "15%" : "25%"}
                                    y1={i === 0 ? "20%" : i === 1 ? "50%" : "80%"}
                                    x2="50%"
                                    y2="50%"
                                    stroke="#475569"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                                <motion.line
                                    x1={i === 1 ? "85%" : "75%"}
                                    y1={i === 0 ? "20%" : i === 1 ? "50%" : "80%"}
                                    x2="50%"
                                    y2="50%"
                                    stroke="#475569"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </React.Fragment>
                        ))}
                    </svg>

                    {/* Data Packets */}
                    {[0, 1, 2, 3, 4, 5].map(i => (
                        <motion.div
                            key={`packet-${i}`}
                            className="absolute w-2 h-2 bg-yellow-400 rounded-full z-20"
                            animate={{
                                offsetDistance: "100%"
                            }}
                            style={{
                                offsetPath: `path("M ${i < 3 ? (i === 1 ? 60 : 100) : (i === 4 ? 340 : 300)} ${i % 3 === 0 ? 90 : i % 3 === 1 ? 225 : 360} L 200 225")`
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: "linear"
                            }}
                        />
                    ))}

                </div>
            </div>
        </div>
    );
};

export default Slide13_Distributed;
```

## Slide14_Summary.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const summaryPoints = [
    { text: "Controls API traffic", highlight: "Controls" },
    { text: "Prevents abuse", highlight: "Prevents" },
    { text: "Ensures fair usage", highlight: "fair usage" },
    { text: "Protects backend systems", highlight: "Protects" },
    { text: "Uses smart algorithms (Fixed / Sliding / Bucket models)", highlight: "smart algorithms" },
];

const Slide14_Summary = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-white p-8">
            <h2 className="text-5xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                Summary
            </h2>

            <div className="flex flex-col gap-8 w-full max-w-4xl">
                {summaryPoints.map((point, index) => {
                    const parts = point.text.split(point.highlight);
                    return (
                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                x: index % 2 === 0 ? -100 : 100
                            }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: index * 0.2,
                                type: "spring",
                                stiffness: 100
                            }}
                            className="flex items-center gap-6 p-6 rounded-xl border border-slate-700 hover:bg-slate-800/50 transition-colors"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.2 + 0.3 }}
                            >
                                <CheckCircle className="text-green-400" size={32} />
                            </motion.div>

                            <span className="text-2xl">
                                {parts[0]}
                                <span className="text-blue-400 font-bold">{point.highlight}</span>
                                {parts[1]}
                            </span>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Slide14_Summary;
```

## Slide15_ThankYou.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, Share2, Bell } from 'lucide-react';

const Slide15_ThankYou = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden text-white">

            {/* Background Animation */}
            <div className="absolute inset-0 opacity-30">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full blur-3xl"
                        style={{
                            width: Math.random() * 400 + 200,
                            height: Math.random() * 400 + 200,
                            left: Math.random() * 100 + "%",
                            top: Math.random() * 100 + "%",
                        }}
                        animate={{
                            x: [0, 100, 0],
                            y: [0, 100, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="z-10 text-center"
            >
                <h1 className="text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                    Thank You!
                </h1>

                <p className="text-2xl text-gray-300 mb-12">
                    Questions?
                </p>

                <div className="flex gap-8 justify-center">
                    {[
                        { icon: ThumbsUp, link: "#", label: "Like", color: "text-blue-400" },
                        { icon: Share2, link: "#", label: "Share", color: "text-green-400" },
                        { icon: Bell, link: "#", label: "Subscribe", color: "text-red-400" }
                    ].map((action, index) => (
                        <motion.button
                            key={index}
                            className="flex items-center gap-3 px-8 py-4 rounded-full hover:bg-slate-700 transition-colors border border-slate-700"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                        >
                            <action.icon size={24} className={action.color} />
                            <span className="text-xl font-semibold">{action.label}</span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

        </div>
    );
};

export default Slide15_ThankYou;
```

---

## Summary of Changes

✅ **All background colors removed from main containers**
- Removed `bg-slate-900`, `bg-slate-800`, `bg-slate-800/30`, etc. from main divs
- Kept border colors for structure visibility
- Kept text colors and accent colors intact
- Kept icon and animation colors
- Preserved gradient effects on text

✅ **All 15 slide components included**
✅ **Fully functional animations retained**
✅ **Clean, transparent design ready for custom backgrounds**

You can now apply your own background color/image to the parent container without conflicts!
