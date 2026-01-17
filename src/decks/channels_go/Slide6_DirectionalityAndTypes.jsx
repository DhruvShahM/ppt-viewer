import React from "react";
import { motion } from "framer-motion";
import { Split, ArrowRightCircle, ArrowLeftCircle } from "lucide-react";

const Slide6_DirectionalityAndTypes = () => {
  const arrows = [
    { id: 1, direction: "send" },
    { id: 2, direction: "recv" },
    { id: 3, direction: "bidirectional" },
  ];

  return (
    <div className="w-screen h-screen flex items-center justify-center text-white overflow-hidden relative">
      {/* Soft orbiting particles for type system vibe */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/50"
            initial={{
              x: 0,
              y: 0,
              opacity: 0.1,
              scale: 0.8,
            }}
            animate={{
              x: [
                Math.cos((i / 12) * Math.PI * 2) * 260,
                Math.cos(((i + 3) / 12) * Math.PI * 2) * 260,
              ],
              y: [
                Math.sin((i / 12) * Math.PI * 2) * 120,
                Math.sin(((i + 3) / 12) * Math.PI * 2) * 120,
              ],
              opacity: [0.1, 0.6, 0.1],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 10 + i * 0.3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

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
              rotate: [0, 5, 0],
              scale: [1, 1.06, 1],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Split className="w-5 h-5 text-white" />
          </motion.div>
          <span className="uppercase tracking-[0.22em] text-xs text-white/70">
            Direction & Type Safety
          </span>
        </motion.div>

        <motion.h2
          className="text-4xl font-semibold"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Channels Are Typed And Can Be Directional
        </motion.h2>

        <motion.p
          className="text-lg text-white/80 max-w-3xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          The type system encodes both the payload type and allowed direction:
          send-only, receive-only, or bidirectional.
        </motion.p>

        <motion.div
          className="mt-6 grid grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          {arrows.map(({ id, direction }) => (
            <motion.div
              key={id}
              className="border border-white/30 rounded-2xl px-4 py-5 flex flex-col items-center gap-3 text-center"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.35 + id * 0.05,
              }}
            >
              {direction === "send" && (
                <motion.div
                  animate={{
                    x: [0, 8, 0],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRightCircle className="w-7 h-7 text-white" />
                </motion.div>
              )}
              {direction === "recv" && (
                <motion.div
                  animate={{
                    x: [0, -8, 0],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowLeftCircle className="w-7 h-7 text-white" />
                </motion.div>
              )}
              {direction === "bidirectional" && (
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Split className="w-7 h-7 text-white" />
                </motion.div>
              )}

              <div className="flex flex-col gap-1">
                <span className="text-sm uppercase tracking-[0.18em] text-white/70">
                  {direction === "send"
                    ? "Send-Only"
                    : direction === "recv"
                    ? "Receive-Only"
                    : "Bidirectional"}
                </span>
                <motion.code
                  className="text-[11px] bg-white/10 px-2 py-1 rounded border border-white/20"
                  initial={{ opacity: 0.8 }}
                  animate={{
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2.4 + id * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {direction === "send" &&
                    "var sendCh chan<- int // only send"}
                  {direction === "recv" &&
                    "var recvCh <-chan int // only receive"}
                  {direction === "bidirectional" &&
                    "ch := make(chan string) // both"}
                </motion.code>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Slide6_DirectionalityAndTypes;