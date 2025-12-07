import { motion } from "framer-motion";
import { AlertTriangle, ShieldCheck, Bug } from "lucide-react";

/* ------------------ Variants ------------------ */

const container = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.25 },
    },
};

const card = {
    hidden: { opacity: 0, y: 60, scale: 0.94 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 90, damping: 14 },
    },
};

const chip = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

/* ------------------ Component ------------------ */

const BestPractices = () => {
    return (
        <motion.div
            className="relative max-w-6xl w-full"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {/* Soft animated background glow */}
            <motion.div
                className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-go-blue/20 rounded-full blur-3xl"
                animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl font-bold mb-6 text-center text-go-blue"
            >
                Best Practices & Pitfalls
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center text-gray-400 max-w-3xl mx-auto mb-12"
            >
                Concurrency is powerful—but unsafe patterns can silently crash production systems.
                These are the most common mistakes and how professionals avoid them.
            </motion.p>

            {/* Cards */}
            <div className="grid grid-cols-3 gap-8 relative z-10">
                {/* Race Conditions */}
                <motion.div
                    variants={card}
                    whileHover={{ scale: 1.06 }}
                    className="relative bg-red-500/10 p-8 rounded-2xl border border-red-500/30 text-center shadow-lg"
                >
                    <motion.div
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Bug size={48} className="text-red-500 mb-6 mx-auto" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-3 text-red-400">
                        Race Conditions
                    </h3>

                    <p className="text-gray-300 mb-4">
                        Multiple goroutines accessing shared memory without coordination.
                    </p>

                    <p className="text-sm text-gray-400 mb-6">
                        ❗ Causes flaky bugs that appear randomly and are hard to reproduce.
                    </p>

                    <div className="bg-black/30 p-3 rounded text-sm font-mono text-red-300">
                        data++ // Unsafe
                    </div>
                </motion.div>

                {/* Deadlocks */}
                <motion.div
                    variants={card}
                    whileHover={{ scale: 1.06 }}
                    className="bg-yellow-500/10 p-8 rounded-2xl border border-yellow-500/30 text-center shadow-lg"
                >
                    <motion.div
                        animate={{ rotate: [0, 2, -2, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                    >
                        <AlertTriangle size={48} className="text-yellow-500 mb-6 mx-auto" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-3 text-yellow-400">
                        Deadlocks
                    </h3>

                    <p className="text-gray-300 mb-4">
                        Goroutines blocked forever, waiting on each other.
                    </p>

                    <p className="text-sm text-gray-400 mb-6">
                        ⚠️ Application freezes with zero CPU usage.
                    </p>

                    <div className="bg-black/30 p-3 rounded text-sm font-mono text-yellow-300">
                        fatal error: deadlock!
                    </div>
                </motion.div>

                {/* Solution */}
                <motion.div
                    variants={card}
                    whileHover={{ scale: 1.06 }}
                    className="bg-green-500/10 p-8 rounded-2xl border border-green-500/30 text-center shadow-lg"
                >
                    <motion.div
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                    >
                        <ShieldCheck size={48} className="text-green-500 mb-6 mx-auto" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-3 text-green-400">
                        Race Detector
                    </h3>

                    <p className="text-gray-300 mb-4">
                        Detects unsafe memory access automatically during runtime.
                    </p>

                    <p className="text-sm text-gray-400 mb-6">
                        ✅ Catches bugs before they hit production.
                    </p>

                    <div className="bg-black/30 p-3 rounded text-sm font-mono text-green-300">
                        go run -race main.go
                    </div>
                </motion.div>
            </div>

            {/* Animated Divider */}
            <motion.div
                className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-14"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1 }}
            />

            {/* Golden Rules */}
            <motion.div className="text-center">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-semibold mb-4"
                >
                    Golden Rules of Concurrency
                </motion.h3>

                <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                    Follow these principles and your concurrent programs will stay predictable,
                    debuggable, and production-safe.
                </p>

                <motion.div
                    className="flex justify-center gap-4 flex-wrap"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {[
                        "Avoid shared state",
                        "Prefer channels over locks",
                        "Keep critical sections small",
                        "Always clean up goroutines",
                    ].map((rule, i) => (
                        <motion.span
                            key={i}
                            variants={chip}
                            whileHover={{ scale: 1.1 }}
                            className="px-6 py-3 bg-white/5 rounded-full border border-white/10 text-go-light"
                        >
                            {rule}
                        </motion.span>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default BestPractices;
