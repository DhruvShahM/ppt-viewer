import React from 'react';
import { motion } from 'framer-motion';
import { Scale, TrendingUp, Cpu } from 'lucide-react';

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

const iconStyle = "w-6 h-6 mr-3 text-white";

const Slide03WhyMatter = () => {
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
                className="text-5xl font-extrabold mb-8"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                    Why This Topic Matters
                </span>
            </motion.h2>

            <motion.ul
                className="space-y-8 max-w-4xl"
                variants={listContainerVariants}
                initial="initial"
                animate="animate"
            >
                {/* 1. System Design Reality */}
                <motion.li
                    className="p-4 border-l-4 border-cyan-400 bg-slate-900/50 hover:bg-slate-900 transition-colors duration-300 rounded-r-lg"
                    variants={itemVariants}
                >
                    <div className="flex items-center mb-2">
                        <Scale className={iconStyle} />
                        <h3 className="text-2xl font-semibold">The Foundational Trade-off</h3>
                    </div>
                    <p className="text-xl text-slate-300 pl-9">
                        CAP is the **immutable law** of distributed systems. Understanding it is crucial for making correct, domain-specific **system design choices**.
                    </p>
                </motion.li>

                {/* 2. Scalability and Resiliency */}
                <motion.li
                    className="p-4 border-l-4 border-purple-400 bg-slate-900/50 hover:bg-slate-900 transition-colors duration-300 rounded-r-lg"
                    variants={itemVariants}
                >
                    <div className="flex items-center mb-2">
                        <TrendingUp className={iconStyle} />
                        <h3 className="text-2xl font-semibold">Deciding on Scaling</h3>
                    </div>
                    <p className="text-xl text-slate-300 pl-9">
                        **Microservices** allow for massive scale, but that scale comes at the cost of giving up **strong consistency** in favor of **availability** (eventual consistency).
                    </p>
                </motion.li>

                {/* 3. Interview Preparation */}
                <motion.li
                    className="p-4 border-l-4 border-pink-400 bg-slate-900/50 hover:bg-slate-900 transition-colors duration-300 rounded-r-lg"
                    variants={itemVariants}
                >
                    <div className="flex items-center mb-2">
                        <Cpu className={iconStyle} />
                        <h3 className="text-2xl font-semibold">Backend Interview Depth</h3>
                    </div>
                    <p className="text-xl text-slate-300 pl-9">
                        Explaining CAP's role in microservices (e.g., using **Saga pattern** for eventual consistency) demonstrates senior-level knowledge in system architecture.
                    </p>
                </motion.li>
            </motion.ul>

            {/* Quote/Highlight */}
            <motion.blockquote
                className="mt-12 p-6 border-l-4 border-slate-600 italic text-slate-400 max-w-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 1.5, duration: 0.5 } }}
            >
                <p className="text-2xl font-light">
                    "The CAP theorem forces us to explicitly acknowledge and design around **network failures**."
                </p>
            </motion.blockquote>

        </motion.div>
    );
};

export default Slide03WhyMatter;