import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Clock, Send } from 'lucide-react';

const Slide8_Workflow = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex flex-col items-center justify-center overflow-hidden p-20">
      <motion.h2
        className="text-5xl font-bold text-white mb-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Pod Lifecycle: From Request to Running
      </motion.h2>

      {/* Workflow steps */}
      <div className="relative w-full max-w-5xl">
        {/* Visual steps */}
        <div className="flex items-center justify-between mb-16">
          {[
            { step: 1, label: 'User Request', icon: Send, color: 'from-blue-500 to-cyan-500' },
            { step: 2, label: 'API Server', icon: Check, color: 'from-purple-500 to-pink-500' },
            { step: 3, label: 'Scheduler', icon: Clock, color: 'from-orange-500 to-red-500' },
            { step: 4, label: 'Running', icon: Check, color: 'from-green-500 to-emerald-500' },
          ].map((item, idx) => (
            <motion.div key={idx} className="flex items-center flex-1">
              {/* Circle */}
              <motion.div
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center relative flex-shrink-0`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <item.icon className="w-8 h-8 text-white" />

                {/* Pulsing ring */}
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.color} opacity-30`}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                />
              </motion.div>

              {/* Arrow */}
              {idx < 3 && (
                <motion.div
                  className="flex-1 h-1 bg-gradient-to-r from-slate-600 to-slate-700 mx-4 relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: idx * 0.25 }}
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-blue-500 h-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, delay: idx * 0.25 + 0.3 }}
                  />
                </motion.div>
              )}

              {/* Label */}
              <motion.div
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 + 0.2 }}
              >
                <p className="text-white font-bold text-sm">{item.label}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Detailed flow steps */}
        <motion.div className="mt-32 space-y-6 max-w-3xl mx-auto">
          {[
            { num: 1, title: 'You submit a Pod definition', desc: 'YAML file sent to API Server' },
            { num: 2, title: 'API Server stores request', desc: 'etcd persists your desired state' },
            { num: 3, title: 'Scheduler finds best node', desc: 'Evaluates resources & constraints' },
            { num: 4, title: 'Kubelet pulls & runs container', desc: 'Pod becomes active on worker' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="flex gap-6 bg-slate-800/40 border-l-4 border-cyan-400 pl-6 py-4 rounded"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 + idx * 0.15 }}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-cyan-400 text-slate-900 flex items-center justify-center font-bold flex-shrink-0"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.15 }}
              >
                {item.num}
              </motion.div>
              <div>
                <h4 className="text-white font-bold">{item.title}</h4>
                <p className="text-slate-300 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Slide8_Workflow;