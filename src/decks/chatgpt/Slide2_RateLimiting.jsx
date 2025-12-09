import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Zap, Gauge } from "lucide-react";

const Token = ({ delay }) => (
  <motion.div
    className="w-4 h-4 rounded-full bg-emerald-400 shadow-sm"
    initial={{ x: -40, opacity: 0, scale: 0.6 }}
    animate={{ x: 0, opacity: 1, scale: [1, 0.85, 1] }}
    transition={{ delay, duration: 0.9, repeat: Infinity, repeatType: "loop" }}
  />
);

const Slide2_RateLimiting = () => {
  const [tokens, setTokens] = useState(5);
  const controls = useAnimation();

  useEffect(() => {
    // simple refill animation loop
    const id = setInterval(() => {
      setTokens((t) => Math.min(10, t + 1));
      controls.start({ rotate: [0, 6, -6, 0], transition: { duration: 0.9 } });
    }, 1800);
    return () => clearInterval(id);
  }, [controls]);

  // simulate bursts consuming tokens
  useEffect(() => {
    const burst = setInterval(() => {
      setTokens((t) => Math.max(0, t - (Math.random() > 0.6 ? 3 : 1)));
    }, 2400);
    return () => clearInterval(burst);
  }, []);

  return (
    <div className="w-full h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="relative z-10 w-[1100px] max-w-[95%] p-8 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/5 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={controls}
              className="p-3 rounded-lg bg-gradient-to-br from-amber-500 to-rose-400"
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-semibold">Rate Limiting — Token Bucket</h2>
              <p className="text-slate-300">Control bursts, refill rate, and fairness</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Gauge className="w-5 h-5 text-slate-300" />
            <div className="text-sm text-slate-300">Tokens: <span className="text-white">{tokens}</span></div>
          </div>
        </div>

        {/* visualization */}
        <div className="mt-8 grid grid-cols-3 gap-6 items-center">
          {/* bucket */}
          <div className="col-span-1 flex flex-col items-center">
            <div className="relative w-40 h-48 rounded-lg bg-slate-800/40 border border-white/6 flex items-end p-3">
              {/* tokens stack */}
              <div className="w-full flex flex-col-reverse gap-2">
                {Array.from({ length: tokens }).map((_, i) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="h-3 rounded-md bg-emerald-400/90"
                  />
                ))}
              </div>

              {/* gauge overlay */}
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/6 border border-white/5 text-xs"
                animate={{ scale: [1, 1.06, 1], opacity: [0.9, 1, 0.95] }}
                transition={{ repeat: Infinity, duration: 2.4 }}
              >
                refill: 1 token / 1.8s
              </motion.div>
            </div>
            <div className="mt-4 text-sm text-slate-300">Token bucket (capacity: 10)</div>
          </div>

          {/* requests stream */}
          <div className="col-span-2">
            <div className="relative h-48 bg-gradient-to-b from-slate-900/0 to-slate-800/10 rounded-lg p-4 border border-white/4 overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                {/* incoming requests */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute left-[-6%] top-[10%]"
                    initial={{ x: -120, y: i * 32 }}
                    animate={{ x: ["-120%", "110%"] }}
                    transition={{ repeat: Infinity, duration: 4 + (i % 3), delay: i * 0.18, ease: "linear" }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs text-slate-200">REQ</div>
                      <motion.div
                        animate={{ scale: [1, 1.06, 1] }}
                        transition={{ repeat: Infinity, duration: 2 + (i % 2) }}
                        className={`w-28 p-2 rounded-md bg-white/5 ${i % 3 === 0 ? "border border-amber-400/20" : ""}`}
                      >
                        <div className="text-xs text-slate-200">service.call()</div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}

                {/* rejection flash */}
                <motion.div
                  className="absolute right-6 top-6 px-3 py-1 rounded-md bg-red-500/80 text-xs text-white shadow"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: [0, 1, 0], y: [-6, 0, -6] }}
                  transition={{ repeat: Infinity, duration: 3.6, delay: 1 }}
                >
                  Rate limited — 429
                </motion.div>
              </div>
            </div>

            <div className="mt-4 text-sm text-slate-300">
              Tokens are consumed per request; refill rate controls throughput and burst capacity.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide2_RateLimiting;