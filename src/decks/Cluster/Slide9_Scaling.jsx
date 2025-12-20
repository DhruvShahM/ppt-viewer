import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const Slide9_Scaling = () => {
  const [demand, setDemand] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDemand((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex flex-col items-center justify-center overflow-hidden p-20">
      <motion.h2
        className="text-5xl font-bold text-white mb-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Auto Scaling Magic
      </motion.h2>

      {/* Demand visualization */}
      <div className="w-full max-w-4xl mb-12">
        <motion.div
          className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-bold text-lg">Current Traffic Demand</h3>
              <p className="text-slate-400 text-sm">Real-time metric</p>
            </div>
            <motion.div
              className="text-5xl font-bold text-cyan-400"
              key={demand}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {Math.round((demand / 100) * 1000) % 100}%
            </motion.div>
          </div>

          {/* Dynamic bar */}
          <motion.div
            className="h-4 bg-slate-700 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
              animate={{ width: `${demand}%` }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        </motion.div>

        {/* Pod scaling visualization */}
        <motion.div
          className="bg-slate-800/50 border border-slate-700 rounded-lg p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            Active Pods Scaling
          </h3>

          <div className="flex gap-3 flex-wrap">
            {[...Array(Math.max(2, Math.ceil((demand / 100) * 10)))].map((_, idx) => (
              <motion.div
                key={idx}
                className="w-16 h-16 bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-2 border-green-400 rounded-lg flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <span className="text-green-400 font-bold text-sm text-center">Pod</span>
              </motion.div>
            ))}
          </div>

          <p className="text-slate-300 text-sm mt-6">
            <span className="text-green-400 font-bold">{Math.max(2, Math.ceil((demand / 100) * 10))} pods</span> running • HPA decides automatically
          </p>
        </motion.div>
      </div>

      {/* How it works */}
      <motion.div
        className="grid grid-cols-3 gap-6 max-w-4xl mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        {[
          { num: 1, title: 'Monitor', desc: 'CPU, memory metrics' },
          { num: 2, title: 'Evaluate', desc: 'Compare to thresholds' },
          { num: 3, title: 'Scale', desc: 'Add/remove pods' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center"
          >
            <motion.div
              className="w-10 h-10 rounded-full bg-cyan-400 text-slate-900 flex items-center justify-center font-bold mx-auto mb-3"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
            >
              {item.num}
            </motion.div>
            <h4 className="text-white font-bold mb-2">{item.title}</h4>
            <p className="text-slate-300 text-sm">{item.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Slide9_Scaling;