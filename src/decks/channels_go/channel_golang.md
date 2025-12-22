<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

## Slide1_IntroChannels.jsx

```jsx
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
```


## Slide2_GoroutinesWithoutChannels.jsx

```jsx
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
```


## Slide3_ChannelAsPipe.jsx

```jsx
import React from "react";
import { motion } from "framer-motion";
import { Pipe, ArrowRight, ArrowLeftRight } from "lucide-react";

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
            <Pipe className="w-5 h-5 text-white" />
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
                Channel &lt;-&gt; Synchronization
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

          <motion.code
            className="text-xs md:text-sm bg-white/10 backdrop-blur px-4 py-3 rounded-lg border border-white/20 max-w-xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            ch := make(chan int) {"\n"}
            go func() {"{"} ch &lt;- 42 {"}() // send{"\n"}
            x := &lt;-ch // receive, synchronized handoff
          </motion.code>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide3_ChannelAsPipe;
```


## Slide4_BlockingBehavior.jsx

```jsx
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
```


## Slide5_BufferedVsUnbuffered.jsx

```jsx
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
```


## Slide6_DirectionalityAndTypes.jsx

```jsx
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
```


## Slide7_RangeAndClose.jsx

```jsx
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
```


## Slide8_RealWorldPatternFanIn.jsx

```jsx
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
```


## Slide9_RecapMentalModel.jsx

```jsx
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
```

