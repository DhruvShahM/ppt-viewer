import React from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight, ArrowLeftRight } from "lucide-react";

const Slide3_ChannelAsPipe = () => {
  const flowVariants = {
    animate: {
      x: [0, 260],
      opacity: [0, 1, 1, 0],
      scale: [0.8, 1, 1, 0.7],
    },
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center text-white overflow-hidden relative">
      {/* Soft moving glow to indicate live data movement */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0.18 }}
        animate={{
          opacity: [0.18, 0.4, 0.18],
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-[120%] h-[120%] bg-radial from-white/10 via-transparent to-transparent blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-5xl px-12 flex flex-col gap-10">
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
              boxShadow: [
                "0 0 0px rgba(96,165,250,0.0)",
                "0 0 28px rgba(96,165,250,0.6)",
                "0 0 0px rgba(96,165,250,0.0)",
              ],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Zap className="w-5 h-5 text-white" />
          </motion.div>
          <span className="uppercase tracking-[0.22em] text-xs text-white/70">
            Core Mental Model
          </span>
        </motion.div>

        <motion.h2
          className="text-4xl font-semibold"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
        >
          A Channel Is A Typed Pipe Between Goroutines
        </motion.h2>

        <motion.p
          className="text-lg text-white/80 max-w-3xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.22 }}
        >
          Values flow in one end and come out the other, with Go coordinating
          when senders and receivers meet.
        </motion.p>

        {/* Visual pipe with animated packets travelling across */}
        <motion.div
          className="mt-8 flex flex-col gap-6"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.32 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <ArrowRight className="w-5 h-5 text-white/80" />
              <span className="text-sm tracking-[0.18em] uppercase text-white/70">
                Sender Goroutines
              </span>
            </div>
            <div className="flex items-center gap-3">
              <ArrowLeftRight className="w-5 h-5 text-white/80" />
              <span className="text-sm tracking-[0.18em] uppercase text-white/70">
                Channel Synchronization
              </span>
            </div>
            <div className="flex items-center gap-3">
              <ArrowRight className="w-5 h-5 text-white/80 rotate-180" />
              <span className="text-sm tracking-[0.18em] uppercase text-white/70">
                Receiver Goroutines
              </span>
            </div>
          </div>

          <div className="relative h-40 flex items-center">
            {/* Sender side */}
            <div className="flex flex-col gap-3 mr-6">
              {[0, 1].map((id) => (
                <motion.div
                  key={id}
                  className="w-24 h-12 border border-white/30 rounded-lg flex items-center justify-center text-xs"
                  initial={{ opacity: 0.9 }}
                  animate={{
                    y: id === 0 ? [0, -6, 0] : [0, 6, 0],
                  }}
                  transition={{
                    duration: 2 + id,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  goroutine {id + 1}
                </motion.div>
              ))}
            </div>

            {/* The channel pipe */}
            <motion.div
              className="relative flex-1 h-16 border border-white/40 rounded-full flex items-center overflow-hidden"
              initial={{ boxShadow: "0 0 0px rgba(96,165,250,0)" }}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(96,165,250,0)",
                  "0 0 36px rgba(96,165,250,0.7)",
                  "0 0 0px rgba(96,165,250,0)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-3 w-8 h-8 rounded-full border border-white/70 flex items-center justify-center text-[10px]"
                  variants={flowVariants}
                  initial={{ x: 0, opacity: 0, scale: 0.8 }}
                  animate="animate"
                  transition={{
                    duration: 3.2,
                    delay: i * 0.55,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  v{i + 1}
                </motion.div>
              ))}
            </motion.div>

            {/* Receiver side */}
            <div className="flex flex-col gap-3 ml-6">
              {[0, 1].map((id) => (
                <motion.div
                  key={id}
                  className="w-24 h-12 border border-white/30 rounded-lg flex items-center justify-center text-xs"
                  initial={{ opacity: 0.3, scale: 0.95 }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.95, 1.03, 0.95],
                  }}
                  transition={{
                    duration: 2 + id,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: id * 0.5,
                  }}
                >
                  receiver {id + 1}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.pre
            className="text-xs md:text-sm bg-white/10 backdrop-blur px-4 py-3 rounded-lg border border-white/20 max-w-xl overflow-x-auto"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <code>{`ch := make(chan int)
go func() { ch <- 42 }() // send
x := <-ch // receive, synchronized handoff`}</code>
          </motion.pre>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide3_ChannelAsPipe;
