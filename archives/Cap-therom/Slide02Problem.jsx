import React from 'react';
import { motion } from 'framer-motion';
import { HardHat, Split, GitBranch } from 'lucide-react';

// Base variants for the slide container
const slideVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

// Container for staggered list items
const listContainerVariants = {
    animate: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.5,
        },
    },
};

// Variants for individual list items
const itemVariants = {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const iconStyle = "w-8 h-8 mr-4 flex-shrink-0";

const Slide02Problem = () => {
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
                    The Problem Statement
                </span>
            </motion.h2>

            {/* Main Problem Description */}
            <motion.p
                className="text-3xl font-light text-slate-300 mb-12 max-w-5xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.4 } }}
            >
                How do we manage **data consistency** when a single business domain is split across **multiple, independent services**?
            </motion.p>

            <motion.div
                className="flex space-x-12"
                variants={listContainerVariants}
            >
                {/* Monolith to Microservice Transition */}
                <motion.div
                    className="w-1/3 p-6 rounded-xl border border-slate-700 shadow-xl bg-slate-900"
                    variants={itemVariants}
                >
                    <Split className={`text-cyan-400 mb-3 ${iconStyle}`} />
                    <h3 className="text-2xl font-semibold mb-3">Service Split</h3>
                    <p className="text-lg text-slate-400">
                        Moving from a **monolithic** architecture (single database, single state) to **microservices** (decentralized data stores).
                    </p>
                </motion.div>

                {/* Distributed Data */}
                <motion.div
                    className="w-1/3 p-6 rounded-xl border border-slate-700 shadow-xl bg-slate-900"
                    variants={itemVariants}
                >
                    <GitBranch className={`text-purple-400 mb-3 ${iconStyle}`} />
                    <h3 className="text-2xl font-semibold mb-3">Distributed State</h3>
                    <p className="text-lg text-slate-400">
                        A customer's order status might involve the **Inventory Service**, **Payment Service**, and **Shipping Service**, each with its own data.
                    </p>
                </motion.div>

                {/* The Dilemma */}
                <motion.div
                    className="w-1/3 p-6 rounded-xl border border-slate-700 shadow-xl bg-slate-900"
                    variants={itemVariants}
                >
                    <HardHat className={`text-pink-400 mb-3 ${iconStyle}`} />
                    <h3 className="text-2xl font-semibold mb-3">The CAP Dilemma</h3>
                    <p className="text-lg text-slate-400">
                        As soon as services live on different network nodes, we introduce **Partition Tolerance (P)**, forcing a crucial choice.
                    </p>
                </motion.div>
            </motion.div>

            {/* Key Takeaway Highlight */}
            <motion.div
                className="mt-16 p-6 border-2 border-cyan-400 rounded-lg shadow-2xl shadow-cyan-900/50"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { delay: 1.5, type: 'spring', stiffness: 50 } }}
            >
                <p className="text-xl text-center font-bold">
                    Microservices = Distributed System. Distributed System $\implies$ CAP Theorem is **mandatory**.
                </p>
            </motion.div>

        </motion.div>
    );
};

export default Slide02Problem;