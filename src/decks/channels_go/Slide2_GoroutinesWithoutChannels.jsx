import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Activity } from "lucide-react";

const Slide2_GoroutinesWithoutChannels = () => {
  const packets = [...Array(7)];

  return (
    <div className="w-screen h-screen flex items-center justify-center text-white overflow-hidden relative">
      {/* Background pulsing indicating chaos */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.12 }}
        animate={{ opacity: [0.12, 0.4, 0.12] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-gradient-to-br from-transparent to-white/10 blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-5xl px-12 flex flex-col gap-10">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="p-2 rounded-full border border-white/30"
            animate={{
              rotate: [-5, 5, -5],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <AlertTriangle className="w-5 h-5 text-white" />
          </motion.div>
          <span className="uppercase tracking-[0.22em] text-xs text-white/70">
            Concurrency Without Channels
          </span>
        </motion.div>

        <motion.h2
          className="text-4xl font-semibold"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Goroutines Without A Communication Path
        </motion.h2>

        <motion.p
          className="text-lg text-white/80 max-w-3xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          Imagine many goroutines working in parallel but throwing results into
          the void. No synchronization, no ordering, and no safe data exchange.
        </motion.p>

        {/* Simulation: goroutines emitting packets that vanish */}
        <div className="mt-4 grid grid-cols-2 gap-10">
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-white" />
              <span className="text-sm uppercase tracking-[0.18em] text-white/70">
                Goroutines Emitting Data
              </span>
            </div>
            <div className="relative h-40">
              {[0, 1, 2].map((id) => (
                <motion.div
                  key={id}
                  className="absolute flex items-center justify-center w-24 h-24 border border-white/30 rounded-xl text-sm"
                  initial={{
                    x: id * 80,
                    y: 60 + (id % 2 === 0 ? -20 : 20),
                    opacity: 0,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    y: [60, 10, -20, -80],
                    scale: [0.7, 1, 1, 0.7],
                  }}
                  transition={{
                    duration: 3 + id,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: id * 0.4,
                  }}
                >
                  <span className="text-xs text-white/80">
                    goroutine #{id + 1}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-white" />
              <span className="text-sm uppercase tracking-[0.18em] text-white/70">
                Lost, Racy, Or Uncoordinated Results
              </span>
            </div>
            <div className="relative h-40">
              {packets.map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-white/70"
                  initial={{
                    x: 40 + (i % 4) * 70,
                    y: 20 + (i % 3) * 35,
                    opacity: 0,
                    scale: 0.4,
                  }}
                  animate={{
                    x: [
                      40 + (i % 4) * 70,
                      120 + (i % 4) * 70,
                      200 + (i % 4) * 70,
                    ],
                    y: [
                      20 + (i % 3) * 35,
                      10 + (i % 3) * 35,
                      -10 + (i % 3) * 35,
                    ],
                    opacity: [0, 1, 0],
                    scale: [0.4, 0.9, 0.2],
                  }}
                  transition={{
                    duration: 2.2 + (i % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15,
                  }}
                />
              ))}
              <motion.div
                className="absolute right-4 top-8 text-xs text-white/60"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                No channel → no contract
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide2_GoroutinesWithoutChannels;