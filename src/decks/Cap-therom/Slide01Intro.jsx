import React from 'react';
import { motion } from 'framer-motion';
import { Atom, Zap, Code, Users } from 'lucide-react';

// Animation variants for the slide and elements
const slideVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

const titleVariants = {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, delay: 0.3 } },
};

const subtitleVariants = {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, delay: 0.5 } },
};

const containerVariants = {
    animate: {
        transition: {
            staggerChildren: 0.1, // Stagger elements in the list
            delayChildren: 0.8,
        },
    },
};

const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
};

const iconStyle = "w-6 h-6 mr-3";

const Slide01Intro = () => {
    return (
        <div className="w-full h-full bg-slate-900 text-white p-10 flex gap-8">
            <motion.div
                className="w-1/2"
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring' }}
            >
                <h2 className="text-3xl font-bold">What is CAP theorem?</h2>
                <p className="mt-4 opacity-80 leading-relaxed">CAP theorem states that in the presence of network partitions, a distributed system must choose between consistency and availability.</p>

                <ul className="mt-6 space-y-3">
                    <li className="inline-flex items-center gap-3">
                        <motion.span className="w-3 h-3 rounded-full bg-indigo-400" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
                        <span>Consistency</span>
                    </li>
                    <li className="inline-flex items-center gap-3">
                        <motion.span className="w-3 h-3 rounded-full bg-emerald-400" animate={{ scale: [1, 1.5, 1], rotate: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2.4 }} />
                        <span>Availability</span>
                    </li>
                    <li className="inline-flex items-center gap-3">
                        <motion.span className="w-3 h-3 rounded-full bg-rose-400" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3 }} />
                        <span>Partition Tolerance</span>
                    </li>
                </ul>
            </motion.div>

            <motion.div className="w-1/2 flex items-center justify-center" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <div className="relative w-72 h-56">
                    <motion.div className="absolute left-0 top-6 bg-slate-800 rounded-2xl p-4 shadow-lg w-32 flex flex-col items-center gap-3" animate={{ x: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        <Server size={28} />
                        <div className="text-xs opacity-80">Service A</div>
                    </motion.div>

                    <motion.div className="absolute right-0 bottom-6 bg-slate-800 rounded-2xl p-4 shadow-lg w-32 flex flex-col items-center gap-3" animate={{ x: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity }}>
                        <Database size={28} />
                        <div className="text-xs opacity-80">DB Replica</div>
                    </motion.div>

                    <motion.div className="absolute inset-0 flex items-center justify-center">
                        <motion.div className="w-6 h-6 rounded-full bg-emerald-400 shadow-lg" animate={{ x: [-60, 60], opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
};

export default Slide01Intro;