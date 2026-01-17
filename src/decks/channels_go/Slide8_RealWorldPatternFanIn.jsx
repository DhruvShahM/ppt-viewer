import React from "react";
import { motion } from "framer-motion";
import { Merge, Activity } from "lucide-react";

const Slide8_RealWorldPatternFanIn = () => {
  const workers = [1, 2, 3];

  return (
    <div className="w-screen h-screen flex items-center justify-center text-white overflow-hidden relative">
      {/* Subtle beams to suggest merging flows */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0.16 }}
        animate={{
          opacity: [0.16, 0.32, 0.16],
        }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-y-20 left-1/2 w-px bg-white/20" />
      </motion.div>

      <div className="relative z-10 max-w-5xl px-12 flex flex-col gap-8">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="p-2 rounded-full border border-white/30"
            animate={{
              scale: [1, 1.08, 1],
              boxShadow: [
                "0 0 0px rgba(56,189,248,0.0)",
                "0 0 32px rgba(56,189,248,0.8)",
                "0 0 0px rgba(56,189,248,0.0)",
              ],
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Merge className="w-5 h-5 text-white" />
          </motion.div>
          <span className="uppercase tracking-[0.22em] text-xs text-white/70">
            Real-World Pattern: Fan-In
          </span>
        </motion.div>

        <motion.h2
          className="text-4xl font-semibold"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Many Workers, One Result Stream
        </motion.h2>

        <motion.p
          className="text-lg text-white/80 max-w-3xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          Multiple goroutines send their results into a single channel. The main
          goroutine consumes the merged stream.
        </motion.p>

        <motion.div
          className="mt-6 grid grid-cols-[3fr,2fr] gap-10 items-center"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <div className="relative h-52">
            {workers.map((id, idx) => (
              <motion.div
                key={id}
                className="absolute left-4 w-32 h-12 border border-white/40 rounded-xl flex items-center justify-center text-xs"
                style={{ top: 20 + idx * 60 }}
                initial={{ opacity: 0.8, x: 0 }}
                animate={{
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 2 + idx * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Activity className="w-3 h-3 mr-1" />
                worker #{id}
              </motion.div>
            ))}

            {/* Central channel */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-16 border border-white/40 rounded-full flex items-center justify-center text-xs"
              initial={{ scale: 0.95, opacity: 0.9 }}
              animate={{
                scale: [0.95, 1.05, 0.95],
                boxShadow: [
                  "0 0 0px rgba(56,189,248,0.0)",
                  "0 0 28px rgba(56,189,248,0.7)",
                  "0 0 0px rgba(56,189,248,0.0)",
                ],
              }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              results chan
            </motion.div>

            {/* Merging packets */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-white/80"
                initial={{
                  x: 60,
                  y: 40 + (i % 3) * 60,
                  opacity: 0,
                  scale: 0.6,
                }}
                animate={{
                  x: [60, 180, 240],
                  y: [40 + (i % 3) * 60, 110, 110],
                  opacity: [0, 1, 1, 0],
                  scale: [0.6, 1, 1, 0.6],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}

            {/* Consumer */}
            <motion.div
              className="absolute right-4 top-1/2 -translate-y-1/2 w-32 h-12 border border-white/40 rounded-xl flex items-center justify-center text-xs"
              initial={{ opacity: 0.7 }}
              animate={{
                opacity: [0.7, 1, 0.7],
                y: ["-50%", "-56%", "-50%"],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              consumer
            </motion.div>
          </div>

          <div className="relative">
            <motion.pre
              className="text-xs md:text-sm bg-white/10 backdrop-blur px-5 py-4 rounded-lg border border-white/20 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
            >
              {`results := make(chan int)\n\nfor i := 0; i < 3; i++ {\n    go func(id int) {\n        // do work...\n        results <- id\n    }(i)\n}\n\nfor i := 0; i < 3; i++ {\n    v := <-results\n    _ = v // merged stream\n}`}
            </motion.pre>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide8_RealWorldPatternFanIn;