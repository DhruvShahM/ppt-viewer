import React from "react";
import { motion } from "framer-motion";
import { Power, Repeat } from "lucide-react";

const Slide7_RangeAndClose = () => {
  const values = [1, 2, 3, 4];

  return (
    <div className="w-screen h-screen flex items-center justify-center text-white overflow-hidden relative">
      {/* Pulsing line to represent lifecycle of a channel */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0.18 }}
        animate={{
          opacity: [0.18, 0.32, 0.18],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-3/4 h-px bg-white/30" />
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
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Power className="w-5 h-5 text-white" />
          </motion.div>
          <span className="uppercase tracking-[0.22em] text-xs text-white/70">
            Lifetime & Iteration
          </span>
        </motion.div>

        <motion.h2
          className="text-4xl font-semibold"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Closing Channels And Iterating With <code>range</code>
        </motion.h2>

        <motion.p
          className="text-lg text-white/80 max-w-3xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          When you&apos;re done sending, close the channel. Receivers can range
          over it until all buffered values are drained.
        </motion.p>

        <motion.div
          className="mt-6 grid grid-cols-[3fr,2fr] gap-10 items-center"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          {/* Animated values flowing then fading after close */}
          <div className="relative h-40">
            <motion.div
              className="absolute top-0 left-0 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Repeat className="w-5 h-5 text-white/80" />
              <span className="text-sm uppercase tracking-[0.18em] text-white/70">
                range over channel
              </span>
            </motion.div>

            <div className="absolute left-0 right-0 bottom-0 flex items-center justify-between">
              {values.map((v, idx) => (
                <motion.div
                  key={v}
                  className="w-16 h-16 border border-white/40 rounded-xl flex flex-col items-center justify-center text-xs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    y: [10, 0, 0, -10],
                    scale: [0.9, 1, 1, 0.9],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.6,
                  }}
                >
                  <span>v = {v}</span>
                  <motion.span
                    className="text-[10px] text-white/60 mt-1"
                    animate={{
                      opacity: [0.3, 0.9, 0.3],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.3,
                    }}
                  >
                    received
                  </motion.span>
                </motion.div>
              ))}

              {/* Closed label appearing after last value */}
              <motion.div
                className="absolute left-1/2 bottom-[-2.5rem] -translate-x-1/2 text-xs uppercase tracking-[0.18em] text-white/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2.6,
                }}
              >
                channel closed
              </motion.div>
            </div>
          </div>

          {/* Code snippet with highlight on close and range */}
          <div className="relative">
            <motion.pre
              className="text-xs md:text-sm bg-white/10 backdrop-blur px-5 py-4 rounded-lg border border-white/20 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
            >
              {`ch := make(chan int)\n\n// producer\ngo func() {\n    for i := 1; i <= 4; i++ {\n        ch <- i\n    }\n    close(ch) // signal no more values\n}()\n\n// consumer\nfor v := range ch {\n    // receives 1,2,3,4 then loop ends\n    _ = v\n}`}
            </motion.pre>

            <motion.div
              className="absolute left-4 top-[4.3rem] right-4 h-[1.15rem] rounded bg-white/15"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
            />
            <motion.div
              className="absolute left-4 bottom-[3.2rem] right-4 h-[1.85rem] rounded bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.2,
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide7_RangeAndClose;