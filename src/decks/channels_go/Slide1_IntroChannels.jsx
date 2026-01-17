import React from "react";
import { motion } from "framer-motion";
import { Waves, ArrowRight, Cpu } from "lucide-react";

const Slide1_IntroChannels = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center text-white overflow-hidden relative">
      {/* Flowing particles as background metaphor for goroutines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/40"
            initial={{
              x: Math.random() * 1920 - 960,
              y: Math.random() * 1080 - 540,
              opacity: 0,
              scale: 0.6,
            }}
            animate={{
              x: [
                Math.random() * 800 - 400,
                Math.random() * 800 - 400,
                Math.random() * 800 - 400,
              ],
              y: [
                Math.random() * 400 - 200,
                Math.random() * 400 - 200,
                Math.random() * 400 - 200,
              ],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.6, 1.1, 0.6],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl px-12 flex flex-col gap-10">
        <motion.div
          className="inline-flex items-center gap-4"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="p-3 rounded-full border border-white/30"
            animate={{
              boxShadow: [
                "0 0 0px rgba(96,165,250,0.0)",
                "0 0 40px rgba(96,165,250,0.7)",
                "0 0 0px rgba(96,165,250,0.0)",
              ],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cpu className="w-6 h-6 text-white" />
          </motion.div>
          <span className="uppercase tracking-[0.25em] text-xs text-white/70">
            Go Concurrency Primitives
          </span>
        </motion.div>

        <motion.h1
          className="text-6xl font-semibold leading-tight"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          What Is A <span className="text-white/70">Channel</span> In Go?
        </motion.h1>

        <motion.p
          className="text-xl text-white/80 max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
        >
          Think of channels as animated data pipelines that safely move values
          between goroutines — synchronized, typed, and explicit.
        </motion.p>

        <motion.div
          className="flex items-center gap-6 mt-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        >
          <motion.div
            className="flex items-center gap-3"
            animate={{
              x: [0, 6, 0],
            }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Waves className="w-7 h-7 text-white" />
            <span className="text-sm uppercase tracking-[0.18em] text-white/70">
              Streams Of Values
            </span>
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.03, 1],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="w-6 h-6 text-white" />
            <span className="text-sm uppercase tracking-[0.18em] text-white/70">
              From Goroutine → Goroutine
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide1_IntroChannels;