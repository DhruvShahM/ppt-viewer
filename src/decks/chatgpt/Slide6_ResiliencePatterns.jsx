import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Repeat, ShieldCheck } from "lucide-react";

/**
 * Shows Circuit Breaker, Retry, Bulkhead patterns with interactive toggles and animated state transitions
 */

const PatternCard = ({ title, icon: Icon, children, active }) => (
  <motion.div
    className={`p-4 rounded-lg border border-white/6 min-w-[220px] ${active ? "bg-emerald-700/8" : "bg-slate-800/30"}`}
    initial={{ scale: 0.98, opacity: 0 }}
    animate={{ scale: active ? 1.02 : 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-3">
      <div className="p-2 rounded bg-white/6">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-slate-300 mt-1">{children}</div>
      </div>
    </div>
  </motion.div>
);

const Slide6_ResiliencePatterns = () => {
  const [active, setActive] = useState("circuit");

  return (
    <div className="w-full h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="w-[1100px] max-w-[95%] p-8 rounded-2xl bg-slate-900/50 border border-white/5 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Resilience Patterns</h2>
            <p className="text-slate-300 mt-1">Circuit breaker · Retry · Bulkhead</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm text-slate-400">Interactive</div>
          </div>
        </div>

        <div className="mt-6 flex gap-6">
          <div className="flex flex-col gap-4 w-1/2">
            <div className="flex gap-4">
              <button
                onClick={() => setActive("circuit")}
                className={`px-3 py-2 rounded ${active === "circuit" ? "bg-white/6" : "bg-white/3/10"}`}
              >
                Circuit
              </button>
              <button
                onClick={() => setActive("retry")}
                className={`px-3 py-2 rounded ${active === "retry" ? "bg-white/6" : "bg-white/3/10"}`}
              >
                Retry
              </button>
              <button
                onClick={() => setActive("bulkhead")}
                className={`px-3 py-2 rounded ${active === "bulkhead" ? "bg-white/6" : "bg-white/3/10"}`}
              >
                Bulkhead
              </button>
            </div>

            <div className="mt-2 grid grid-cols-3 gap-4">
              <PatternCard title="Circuit Breaker" icon={AlertTriangle} active={active === "circuit"}>
                Open on failures, short-circuit calls to fail fast.
              </PatternCard>
              <PatternCard title="Retry" icon={Repeat} active={active === "retry"}>
                Backoff and bounded retries to handle transient errors.
              </PatternCard>
              <PatternCard title="Bulkhead" icon={ShieldCheck} active={active === "bulkhead"}>
                Isolate failures with resource partitions.
              </PatternCard>
            </div>
          </div>

          {/* simulation panel */}
          <div className="w-1/2">
            <div className="p-4 rounded-lg bg-white/5 border border-white/6 h-[260px]">
              <div className="text-sm text-slate-300">Simulation</div>

              <div className="mt-6 flex items-center gap-4">
                <div className="w-2/3">
                  <div className="relative h-24 bg-slate-800/30 rounded-lg p-4 overflow-hidden">
                    {/* service node */}
                    <motion.div
                      className="absolute left-6 top-6 w-32 h-12 rounded-md bg-slate-700/60 flex items-center justify-center"
                      animate={{ x: active === "bulkhead" ? [0, 12, -12, 0] : 0 }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                    >
                      <div className="text-xs">downstream service</div>
                    </motion.div>

                    {/* client requests */}
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute left-[-10%] top-[6%]"
                        initial={{ x: -120 }}
                        animate={{ x: active === "circuit" && i > 2 ? -40 : 720 }}
                        transition={{
                          duration: active === "retry" ? 4 : 3 + (i % 3),
                          repeat: Infinity,
                          ease: "linear",
                          delay: i * 0.18
                        }}
                      >
                        <div className="w-12 h-6 rounded bg-white/6 flex items-center justify-center text-xs">
                          REQ
                        </div>
                      </motion.div>
                    ))}

                    {/* circuit breaker shield */}
                    <motion.div
                      className="absolute right-6 top-6 px-3 py-1 rounded bg-red-600/80 text-xs"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: active === "circuit" ? [0.9, 1.06, 1] : 0.9, opacity: active === "circuit" ? 1 : 0.25 }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                      Circuit: {active === "circuit" ? "OPEN" : "CLOSED"}
                    </motion.div>
                  </div>
                </div>

                <div className="w-1/3">
                  <div className="text-sm text-slate-300">Status</div>
                  <div className="mt-2 p-3 rounded bg-white/6 text-sm">
                    {active === "circuit" && <div>Fail ratio high → fast-fail (open)</div>}
                    {active === "retry" && <div>Retries with backoff until success or limit reached</div>}
                    {active === "bulkhead" && <div>Requests routed to isolated pool to protect others</div>}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-300">
              Combine patterns: retries with circuit breakers and bulkheads to design robust systems.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide6_ResiliencePatterns;