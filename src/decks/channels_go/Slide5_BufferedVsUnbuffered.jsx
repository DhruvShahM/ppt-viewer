import React from "react";
import { motion } from "framer-motion";
import { Box, Gauge } from "lucide-react";

const Slide5_BufferedVsUnbuffered = () => {
  const bufferLevels = [0, 1, 2, 3];

  return (
    <div className="w-screen h-screen flex items-center justify-center text-white overflow-hidden relative">
      {/* Moving gradient overlay like capacity gauge */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0.16 }}
        animate={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.10), transparent)",
          opacity: [0.16, 0.32, 0.16],
          x: [-30, 30, -30],
        }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-6xl px-12 flex flex-col gap-8">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="p-2 rounded-full border border-white/30"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Gauge className="w-5 h-5 text-white" />
          </motion.div>
          <span className="uppercase tracking-[0.22em] text-xs text-white/70">
            Capacity & Backpressure
          </span>
        </motion.div>

        <motion.h2
          className="text-4xl font-semibold"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Buffered Vs Unbuffered Channels
        </motion.h2>

        <motion.p
          className="text-lg text-white/80 max-w-3xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          Buffer size controls how many values can wait inside the channel
          before senders block. Let&apos;s animate that capacity.
        </motion.p>

        <motion.div
          className="mt-6 grid grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          {/* Unbuffered gauge (capacity 0) */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Box className="w-5 h-5 text-white/80" />
              <span className="text-sm uppercase tracking-[0.18em] text-white/70">
                Unbuffered (Capacity 0)
              </span>
            </div>
            <div className="relative h-40 flex items-center">
              <div className="flex flex-col gap-3 mr-4">
                <motion.div
                  className="w-24 h-10 border border-white/30 rounded-lg flex items-center justify-center text-xs"
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  sender
                </motion.div>
                <motion.div
                  className="w-24 h-10 border border-white/30 rounded-lg flex items-center justify-center text-xs"
                  animate={{
                    y: [0, 6, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                >
                  receiver
                </motion.div>
              </div>

              <motion.div
                className="flex-1 h-16 border border-white/40 rounded-full flex items-center justify-center text-xs"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(248,250,252,0.0)",
                    "0 0 30px rgba(248,250,252,0.6)",
                    "0 0 0px rgba(248,250,252,0.0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-white/70">no storage — instant handoff</span>
              </motion.div>
            </div>
          </div>

          {/* Buffered gauge with animated fill */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Gauge className="w-5 h-5 text-white/80" />
              <span className="text-sm uppercase tracking-[0.18em] text-white/70">
                Buffered (Capacity 3)
              </span>
            </div>

            <div className="relative h-40">
              <motion.div
                className="absolute inset-0 flex flex-col justify-between"
                initial={{ opacity: 0.9 }}
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              >
                <div className="flex justify-between text-xs text-white/60">
                  <span>fill level</span>
                  <span>ch := make(chan int, 3)</span>
                </div>
                <div className="flex justify-between text-xs text-white/60">
                  <span>senders block when full</span>
                  <span>0 → 3</span>
                </div>
              </motion.div>

              <div className="absolute left-0 right-0 top-8 flex flex-col gap-3">
                <div className="w-full h-8 border border-white/40 rounded-full flex items-center px-3 gap-2 text-xs">
                  {bufferLevels.map((lvl) => (
                    <motion.div
                      key={lvl}
                      className="flex-1 h-4 rounded-full border border-white/40"
                      initial={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                      animate={{
                        backgroundColor: [
                          "rgba(255,255,255,0.03)",
                          "rgba(56,189,248,0.45)",
                          "rgba(255,255,255,0.03)",
                        ],
                      }}
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: lvl * 0.4,
                      }}
                    />
                  ))}
                </div>
                <motion.div
                  className="w-full flex justify-between text-[11px] text-white/70"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                >
                  <span>0</span>
                  <span>1</span>
                  <span>2</span>
                  <span>3 (full)</span>
                </motion.div>
              </div>
            </div>

            <motion.code
              className="text-xs bg-white/10 backdrop-blur px-4 py-3 rounded-lg border border-white/20 max-w-md"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              {`ch := make(chan int, 3)\n\n// up to 3 sends can proceed\nch <- 1\nch <- 2\nch <- 3\n// 4th send blocks until a receive happens`}
            </motion.code>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide5_BufferedVsUnbuffered;