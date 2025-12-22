import React from "react";
import { motion } from "framer-motion";
import { Cpu, ArrowRight, ShieldCheck } from "lucide-react";

const Slide9_RecapMentalModel = () => {
  const bullets = [
    "Channels are typed, synchronous pipes between goroutines.",
    "Unbuffered channels synchronize; buffered channels add capacity.",
    "Directionality and close() communicate intent and lifecycle.",
  ];

  return (
    <div className="w-screen h-screen flex items-center justify-center text-white overflow-hidden relative">
      {/* Orbiting glow to feel like a closing keynote */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0.16 }}
        animate={{
          opacity: [0.16, 0.3, 0.16],
          scale: [1, 1.03, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-[70%] h-[70%] rounded-full border border-white/10" />
      </motion.div>

      <div className="relative z-10 max-w-4xl px-12 flex flex-col items-center gap-10 text-center">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="p-2 rounded-full border border-white/30"
            animate={{
              scale: [1, 1.12, 1],
              rotate: [0, 8, 0],
              boxShadow: [
                "0 0 0px rgba(56,189,248,0.0)",
                "0 0 32px rgba(56,189,248,0.8)",
                "0 0 0px rgba(56,189,248,0.0)",
              ],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cpu className="w-5 h-5 text-white" />
          </motion.div>
          <span className="uppercase tracking-[0.22em] text-xs text-white/70">
            Mental Model Recap
          </span>
        </motion.div>

        <motion.h2
          className="text-4xl font-semibold"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Think Of Channels As Contracts For Moving Values
        </motion.h2>

        <motion.div
          className="mt-4 flex flex-col gap-5 text-left w-full max-w-3xl"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {bullets.map((text, idx) => (
            <motion.div
              key={idx}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.25 + idx * 0.1,
              }}
            >
              <motion.div
                className="mt-[2px] p-1 rounded-full border border-white/40"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2 + idx * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {idx === 0 && <ArrowRight className="w-3 h-3" />}
                {idx === 1 && <ShieldCheck className="w-3 h-3" />}
                {idx === 2 && <ArrowRight className="w-3 h-3" />}
              </motion.div>
              <span className="text-base text-white/85">{text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-6 flex items-center gap-4 text-sm text-white/75"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
        >
          <motion.div
            className="px-4 py-2 border border-white/30 rounded-full flex items-center gap-2"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0px rgba(248,250,252,0.0)",
                "0 0 24px rgba(248,250,252,0.7)",
                "0 0 0px rgba(248,250,252,0.0)",
              ],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="w-4 h-4" />
            <span>Next: model your pipeline as goroutines + channels</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide9_RecapMentalModel;