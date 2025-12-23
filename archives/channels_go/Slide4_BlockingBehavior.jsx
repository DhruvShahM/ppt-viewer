import React from "react";
import { motion } from "framer-motion";
import { Lock, Timer } from "lucide-react";

const Slide4_BlockingBehavior = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center text-white overflow-hidden relative">
      {/* Animated overlay to represent time passing */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0.18 }}
        animate={{
          background:
            "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05), transparent 55%)",
          opacity: [0.18, 0.32, 0.18],
        }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />

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
              rotate: [0, 6, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Lock className="w-5 h-5 text-white" />
          </motion.div>
          <span className="uppercase tracking-[0.22em] text-xs text-white/70">
            Blocking & Synchronization
          </span>
        </motion.div>

        <motion.h2
          className="text-4xl font-semibold"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Sends And Receives Block Until The Other Side Is Ready
        </motion.h2>

        <motion.p
          className="text-lg text-white/80 max-w-3xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          On an unbuffered channel, the send operation waits for a receiver, and
          the receive waits for a sender. Let&apos;s visualize this rendezvous.
        </motion.p>

        {/* Timeline with sender/receiver states */}
        <motion.div
          className="mt-6 grid grid-cols-[2fr,3fr] gap-10 items-center"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Timer className="w-5 h-5 text-white/80" />
              <span className="text-sm uppercase tracking-[0.18em] text-white/70">
                Time-Based State Change
              </span>
            </div>

            <div className="relative h-40">
              {/* Sender state */}
              <motion.div
                className="absolute left-0 top-4 w-36 h-20 border border-white/40 rounded-xl flex flex-col items-center justify-center text-xs"
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  backgroundColor: [
                    "rgba(255,255,255,0.02)",
                    "rgba(255,255,255,0.10)",
                    "rgba(255,255,255,0.02)",
                  ],
                  borderColor: [
                    "rgba(255,255,255,0.4)",
                    "rgba(251,191,36,0.9)",
                    "rgba(255,255,255,0.4)",
                  ],
                }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/70">
                  sender
                </span>
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mt-1"
                >
                  waiting to send...
                </motion.span>
              </motion.div>

              {/* Receiver state */}
              <motion.div
                className="absolute right-0 top-4 w-36 h-20 border border-white/40 rounded-xl flex flex-col items-center justify-center text-xs"
                initial={{ opacity: 0.4, scale: 0.95 }}
                animate={{
                  backgroundColor: [
                    "rgba(255,255,255,0.02)",
                    "rgba(56,189,248,0.18)",
                    "rgba(255,255,255,0.02)",
                  ],
                  borderColor: [
                    "rgba(255,255,255,0.4)",
                    "rgba(59,130,246,0.9)",
                    "rgba(255,255,255,0.4)",
                  ],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/70">
                  receiver
                </span>
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mt-1"
                >
                  waiting to receive...
                </motion.span>
              </motion.div>

              {/* Animated rendezvous pulse in the middle */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 1.6],
                }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 1.4,
                }}
              >
                <div className="w-16 h-16 rounded-full border border-white/80" />
              </motion.div>
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[11px] uppercase tracking-[0.18em] text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 1.6,
                }}
              >
                handoff
              </motion.div>
            </div>
          </div>

          {/* Code snippet with animated highlight for blocking line */}
          <div className="relative">
            <motion.pre
              className="text-xs md:text-sm bg-white/10 backdrop-blur px-5 py-4 rounded-lg border border-white/20 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
            >
              {`ch := make(chan int)\n\n// 1) sender blocks here until a receiver is ready\ngo func() {\n    ch <- 1\n    // resumes only after value is received\n}()\n\n// 2) receiver blocks here until a sender is ready\nv := <-ch\n_ = v`}
            </motion.pre>

            <motion.div
              className="absolute left-4 top-[2.55rem] right-4 h-[1.15rem] rounded bg-white/15"
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
              className="absolute left-4 bottom-[2.8rem] right-4 h-[1.15rem] rounded bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide4_BlockingBehavior;