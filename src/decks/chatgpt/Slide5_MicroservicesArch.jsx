import React from "react";
import { motion } from "framer-motion";
import { Grid, Cpu, Zap } from "lucide-react";

/**
 * Visualize microservices architecture:
 * - Many small services (cards) communicating via API Gateway / Message Bus
 * - Animated events across bus, service scaling animation (pop)
 */

const Service = ({ name, color, scaleDelay = 0 }) => (
  <motion.div
    className={`p-3 rounded-lg ${color} border border-white/6 shadow-sm min-w-[140px]`}
    initial={{ scale: 0.98, opacity: 0 }}
    animate={{ scale: [1, 1.02, 1], opacity: 1 }}
    transition={{ duration: 0.8, delay: scaleDelay, repeat: Infinity, repeatDelay: 4 }}
  >
    <div className="flex items-center gap-3">
      <div className="p-2 rounded bg-white/6">
        <Cpu className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="font-semibold text-sm">{name}</div>
        <div className="text-xs text-slate-200">stateless</div>
      </div>
    </div>
  </motion.div>
);

const Slide5_MicroservicesArch = () => {
  return (
    <div className="w-full h-screen bg-slate-900 text-white flex items-center justify-center overflow-hidden">
      <div className="w-[1200px] max-w-[95%] p-8 rounded-2xl bg-slate-900/50 border border-white/5 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-md bg-gradient-to-br from-indigo-600 to-violet-600">
              <Grid className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Microservices Architecture</h2>
              <p className="text-slate-300 mt-1">Service decomposition, API gateway, message bus</p>
            </div>
          </div>

          <div className="text-sm text-slate-400">scale independently · resilience</div>
        </div>

        <div className="mt-8 flex gap-6 items-start">
          {/* left: services */}
          <div className="flex flex-col gap-4 w-1/2">
            <div className="flex gap-4">
              <Service name="Auth" color="bg-indigo-700/40" scaleDelay={0} />
              <Service name="Users" color="bg-emerald-700/40" scaleDelay={0.3} />
              <Service name="Payments" color="bg-rose-600/40" scaleDelay={0.6} />
            </div>

            <div className="flex gap-4">
              <Service name="Search" color="bg-sky-600/40" scaleDelay={0.9} />
              <Service name="Notifications" color="bg-yellow-600/40" scaleDelay={1.2} />
            </div>
          </div>

          {/* center: bus and gateway */}
          <div className="w-1/2 flex flex-col items-center gap-6">
            <motion.div
              className="w-full p-4 rounded-lg bg-white/5 border border-white/6"
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-white/6">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">API Gateway</div>
                    <div className="text-xs text-slate-300">routing · auth · rate limiting</div>
                  </div>
                </div>

                <div className="text-xs text-slate-300">Ingress</div>
              </div>
            </motion.div>

            <div className="w-full h-36 relative bg-slate-800/30 rounded-lg p-4 border border-white/6 overflow-hidden">
              {/* message bus particles */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-amber-400/90"
                  initial={{ x: i * 20, y: 12 + (i % 3) * 14, opacity: 0.9 }}
                  animate={{ x: [i * 20, 720 - i * 20], opacity: [0.9, 0.4, 0.9] }}
                  transition={{ repeat: Infinity, duration: 6 + (i % 4), delay: i * 0.12, ease: "linear" }}
                />
              ))}

              <div className="absolute left-4 bottom-3 text-xs text-slate-300">Event bus → publish / subscribe</div>
            </div>

            <motion.div
              className="w-full p-3 rounded-lg bg-white/5 border border-white/6 text-sm text-slate-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Services scale independently; messages travel across the bus — decoupling producers and consumers.
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide5_MicroservicesArch;