import React from "react";
import { motion } from "framer-motion";
import { CloudCog, ServerCog, Activity } from "lucide-react";

/**
 * Visual metaphor:
 * - Three pillars: Consistency, Availability, Partition tolerance
 * - Animated requests trying to reach nodes; when partitioned, trade-offs animate
 */

const Pillar = ({ title, color, icon: Icon, highlight }) => (
  <motion.div
    className={`flex-1 p-6 rounded-xl bg-gradient-to-br ${color} border border-white/6 shadow-md`}
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: highlight ? -6 : 0, opacity: 1, scale: highlight ? 1.02 : 1 }}
    transition={{ duration: 0.6 }}
  >
    <div className="flex items-center gap-3">
      <div className="p-3 rounded-md bg-white/6">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-slate-200 mt-1">Core property</p>
      </div>
    </div>
  </motion.div>
);

const Slide3_CAPTheorem = () => {
  return (
    <div className="w-full h-screen bg-slate-900 text-white flex items-center justify-center overflow-hidden">
      <div className="w-[1100px] max-w-[95%] p-8 rounded-2xl bg-slate-900/60 border border-white/4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">CAP Theorem — Visual Simulation</h2>
            <p className="text-slate-300 mt-1">Pick two: Consistency, Availability, Partition tolerance</p>
          </div>
          <div className="text-sm text-slate-400">Simulated cluster · 3 nodes</div>
        </div>

        <div className="mt-6 flex gap-6">
          <Pillar title="Consistency" color="from-indigo-600 to-violet-600" icon={CloudCog} highlight />
          <Pillar title="Availability" color="from-emerald-600 to-teal-600" icon={Activity} />
          <Pillar title="Partition Tolerance" color="from-rose-600 to-pink-600" icon={ServerCog} />
        </div>

        {/* cluster simulation */}
        <div className="mt-8 relative">
          <div className="grid grid-cols-3 gap-6">
            {["Node A", "Node B", "Node C"].map((label, i) => (
              <motion.div
                key={label}
                className="p-4 rounded-xl bg-slate-800/40 border border-white/6 flex flex-col items-center gap-3"
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 * i }}
              >
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-slate-700/60 to-slate-800/60 flex items-center justify-center">
                  <div className="text-sm font-medium">{label}</div>
                </div>

                <div className="w-full flex items-center justify-center gap-2">
                  {/* status dot */}
                  <motion.div
                    className="w-3 h-3 rounded-full"
                    animate={{ backgroundColor: ["#34D399", "#F59E0B", "#EF4444"][i % 3] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  />
                  <div className="text-xs text-slate-300">replica</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* network partition event */}
          <motion.div
            className="absolute inset-x-0 top-[-18px] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="px-3 py-1 rounded-full bg-white/6 text-xs text-slate-200 border border-white/6">
              Network partition detected — split brain risk
            </div>
          </motion.div>

          {/* request flow lines */}
          <div className="absolute inset-0 pointer-events-none">
            {/* requests from left to center */}
            <motion.div
              className="absolute left-6 top-28 flex gap-2"
              initial={{ x: -120 }}
              animate={{ x: 0 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            >
              <motion.div className="w-4 h-2 rounded-full bg-white/80" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 1.2 }} />
              <motion.div className="w-4 h-2 rounded-full bg-white/80" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1.1 }} />
            </motion.div>

            {/* blocked link to Node C to show partition */}
            <motion.div
              className="absolute right-24 top-16 w-[1px] h-36 bg-white/6"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: [0.6, 0.12, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.8 }}
            >
              <div className="absolute -left-6 -top-3 px-2 py-1 rounded text-xs bg-red-600/80">partitioned</div>
            </motion.div>
          </div>
        </div>

        {/* trade-off visualization */}
        <div className="mt-8 flex items-center gap-6">
          <motion.div
            className="flex-1 p-4 rounded-lg bg-white/5 border border-white/6"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-slate-300">When partition occurs:</div>
            <ul className="mt-3 text-sm text-slate-200 space-y-2">
              <li>• Choose Consistency + Partition tolerance → sacrifice Availability</li>
              <li>• Choose Availability + Partition tolerance → allow eventual consistency</li>
            </ul>
          </motion.div>

          <motion.div
            className="w-48 p-4 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/6"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs text-slate-300">Quick hint</div>
            <div className="mt-2 font-semibold">No system can guarantee all three under network partition.</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide3_CAPTheorem;