import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Server, Network } from 'lucide-react';

// Base variants for the slide container
const slideVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

// Container for staggered component definitions
const definitionContainerVariants = {
    animate: {
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.5,
        },
    },
};

// Variants for individual components (C, A, P)
const componentVariants = {
    initial: { y: 50, opacity: 0, scale: 0.8 },
    animate: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', stiffness: 50, damping: 10 }
    },
};

const Slide04CoreConceptCAP = () => {
    return (
        <motion.div
            className="flex flex-col min-h-screen bg-slate-950 p-16 text-white"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {/* Title */}
            <motion.h2
                className="text-5xl font-extrabold mb-4"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    Core Concept Breakdown: The CAP Theorem
                </span>
            </motion.h2>

            {/* Main Statement */}
            <motion.p
                className="text-2xl font-light text-slate-300 mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.4 } }}
            >
                A distributed data store can only guarantee **two** of the following **three** properties:
            </motion.p>

            {/* CAP Components */}
            <motion.div
                className="flex justify-around w-full"
                variants={definitionContainerVariants}
            >
                {/* C: Consistency */}
                <motion.div
                    className="w-1/4 p-6 rounded-xl border border-pink-400 shadow-2xl shadow-pink-900/50 text-center bg-slate-900 hover:scale-[1.03] transition-transform duration-300"
                    variants={componentVariants}
                    whileHover={{ boxShadow: "0 0 40px rgba(236, 72, 153, 0.7)" }}
                >
                    <Check className="w-12 h-12 mx-auto text-pink-400 mb-3" />
                    <h3 className="text-3xl font-bold mb-2">Consistency (C)</h3>
                    <p className="text-xl text-slate-300">
                        Every read receives the most recent **write** or an error. All nodes see the **same data** simultaneously.
                    </p>
                </motion.div>

                {/* A: Availability */}
                <motion.div
                    className="w-1/4 p-6 rounded-xl border border-cyan-400 shadow-2xl shadow-cyan-900/50 text-center bg-slate-900 hover:scale-[1.03] transition-transform duration-300"
                    variants={componentVariants}
                >
                    <Server className="w-12 h-12 mx-auto text-cyan-400 mb-3" />
                    <h3 className="text-3xl font-bold mb-2">Availability (A)</h3>
                    <p className="text-xl text-slate-300">
                        Every non-failing node must return a **valid response** for every request in a **reasonable** amount of time. No timeouts.
                    </p>
                </motion.div>

                {/* P: Partition Tolerance */}
                <motion.div
                    className="w-1/4 p-6 rounded-xl border border-purple-400 shadow-2xl shadow-purple-900/50 text-center bg-slate-900 hover:scale-[1.03] transition-transform duration-300"
                    variants={componentVariants}
                >
                    <Network className="w-12 h-12 mx-auto text-purple-400 mb-3" />
                    <h3 className="text-3xl font-bold mb-2">Partition Tolerance (P)</h3>
                    <p className="text-xl text-slate-300">
                        The system continues to operate despite an arbitrary number of messages being **dropped or delayed** by the network.
                    </p>
                </motion.div>
            </motion.div>

            {/* The Fundamental Truth (P is required) */}
            <motion.div
                className="mt-16 p-6 bg-red-900/30 border-2 border-red-500 rounded-lg shadow-2xl shadow-red-900/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 1.5, duration: 0.5 } }}
            >
                <div className="flex items-center justify-center">
                    <X className="w-8 h-8 mr-4 text-red-400" />
                    <p className="text-2xl font-bold text-red-300">
                        **In Microservices (a Distributed System), P is non-negotiable.** You must handle network partitions.
                    </p>
                </div>
                <p className="text-xl text-center text-red-200 mt-2">
                    Therefore, the choice is always between **C vs. A**.
                </p>
            </motion.div>

        </motion.div>
    );
};

export default Slide04CoreConceptCAP;