import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Network } from 'lucide-react';

const Slide11_Services = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex flex-col items-center justify-center overflow-hidden p-20">
      <motion.h2
        className="text-5xl font-bold text-white mb-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Services: Stable Networking
      </motion.h2>

      {/* Service architecture */}
      <div className="w-full max-w-5xl mb-12">
        {/* Service box */}
        <motion.div
          className="mx-auto w-96 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-400 rounded-lg p-6 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Globe className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold text-white">Service</h3>
          </div>
          <p className="text-purple-300 text-sm">Stable IP & DNS name</p>
          <motion.p
            className="text-purple-400 font-mono text-xs mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            my-app.default.svc.cluster.local
          </motion.p>
        </motion.div>

        {/* Load distribution */}
        <motion.div
          className="bg-slate-800/50 border border-slate-700 rounded-lg p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h4 className="text-white font-bold mb-6 flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan-400" />
            Traffic Distribution
          </h4>

          {/* Request flow */}
          <div className="space-y-4">
            {[0, 1, 2, 3].map((idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
              >
                {/* Request */}
                <motion.div
                  className="w-12 h-8 bg-cyan-500/30 border border-cyan-400 rounded text-cyan-300 text-xs font-bold flex items-center justify-center"
                  animate={{ x: [0, 200, 0] }}
                  transition={{ duration: 3 + idx * 0.5, repeat: Infinity, delay: idx * 0.3 }}
                >
                  REQ
                </motion.div>

                {/* Arrow */}
                <motion.span className="text-slate-400">→</motion.span>

                {/* Target pod */}
                <motion.div
                  className="flex-1 h-8 bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-400 rounded px-3 text-green-300 text-xs font-bold flex items-center"
                  animate={{
                    boxShadow: idx % 2 === 0
                      ? ['0 0 10px rgba(34,197,94,0)', '0 0 20px rgba(34,197,94,0.5)', '0 0 10px rgba(34,197,94,0)']
                      : ['0 0 10px rgba(34,211,238,0)', '0 0 20px rgba(34,211,238,0.5)', '0 0 10px rgba(34,211,238,0)'],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                >
                  Pod {idx + 1}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Service types */}
      <motion.div
        className="grid grid-cols-3 gap-6 max-w-4xl mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        {[
          { type: 'ClusterIP', desc: 'Internal only (default)' },
          { type: 'NodePort', desc: 'External on node port' },
          { type: 'LoadBalancer', desc: 'Cloud provider LB' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 + idx * 0.15 }}
            whileHover={{ scale: 1.05, borderColor: '#22d3ee' }}
          >
            <h4 className="text-purple-400 font-bold text-lg mb-2">{item.type}</h4>
            <p className="text-slate-300 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Slide11_Services;