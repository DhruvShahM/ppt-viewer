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
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen bg-slate-950 p-16 text-white"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {/* Title with Gradient Text and Motion */}
            <motion.h1
                className="text-7xl font-extrabold mb-4 tracking-tight"
                variants={titleVariants}
            >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                    CAP Theorem
                </span>
            </motion.h1>

            {/* Subtitle with Motion */}
            <motion.h2
                className="text-4xl font-light text-slate-300 mb-12"
                variants={subtitleVariants}
            >
                Applying Distributed Trade-offs to Microservices
            </motion.h2>

            <div className="flex w-full max-w-4xl justify-between">
                {/* Audience Section */}
                <motion.div
                    className="w-1/2 pr-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 1.2 } }}
                >
                    <h3 className="text-2xl font-semibold mb-6 flex items-center">
                        <Users className={iconStyle} /> Target Audience
                    </h3>
                    <motion.ul className="space-y-3" variants={containerVariants}>
                        <motion.li className="text-xl flex items-center" variants={itemVariants}>
                            <span className="text-blue-400 mr-2">&bull;</span> Engineering Students
                        </motion.li>
                        <motion.li className="text-xl flex items-center" variants={itemVariants}>
                            <span className="text-blue-400 mr-2">&bull;</span> Software Developers
                        </motion.li>
                        <motion.li className="text-xl flex items-center" variants={itemVariants}>
                            <span className="text-blue-400 mr-2">&bull;</span> System Design Prep
                        </motion.li>
                    </motion.ul>
                </motion.div>

                {/* Tech Stack Section */}
                <motion.div
                    className="w-1/2 pl-8 border-l border-slate-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 1.2 } }}
                >
                    <h3 className="text-2xl font-semibold mb-6 flex items-center">
                        <Code className={iconStyle} /> Motion Stack
                    </h3>
                    <motion.ul className="space-y-3" variants={containerVariants}>
                        <motion.li className="text-xl flex items-center" variants={itemVariants}>
                            <Zap className="w-5 h-5 mr-2 text-cyan-400" /> **React** (Functional Components)
                        </motion.li>
                        <motion.li className="text-xl flex items-center" variants={itemVariants}>
                            <Atom className="w-5 h-5 mr-2 text-cyan-400" /> **Framer Motion** (The Magic)
                        </motion.li>
                        <motion.li className="text-xl flex items-center" variants={itemVariants}>
                            <span className="font-mono text-pink-400 mr-2">#</span> **Tailwind CSS** (Styling)
                        </motion.li>
                    </motion.ul>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Slide01Intro;