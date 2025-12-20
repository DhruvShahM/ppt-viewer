import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Database, Shield, BarChart3 } from 'lucide-react';

const Slide13_RealWorldExample = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex flex-col items-center justify-center overflow-hidden p-20">
      <motion.h2
        className="text-5xl font-bold text-white mb-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Real World: E-Commerce App
      </motion.h2>

      {/* Architecture diagram */}
      <div className="w-full max-w-5xl">
        {/* User tier */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex justify-center gap-6 flex-wrap mb-8">
            {[0, 1, 2].map((idx) => (
              <motion.div
                key={idx}
                className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold"
                animate={{
                  scale: [1, 1.1, 1],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.2,
                }}
              >
                👤
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Load Balancer + Services */}
        <div className="space-y-12">
          {/* Load Balancer */}
          <motion.div
            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400 rounded-lg p-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Globe className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <h3 className="text-white font-bold">Load Balancer</h3>
            <p className="text-purple-300 text-sm">Distributes user traffic</p>
          </motion.div>

          {/* Services */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { name: 'Web Service', icon: Globe, color: 'from-blue-500 to-cyan-500', pods: 3 },
              { name: 'API Service', icon: BarChart3, color: 'from-green-500 to-emerald-500', pods: 2 },
              { name: 'DB Service', icon: Database, color: 'from-orange-500 to-red-500', pods: 1 },
            ].map((service, sIdx) => (
              <motion.div
                key={sIdx}
                className={`bg-gradient-to-br ${service.color}/20 border-2 border-${service.color.split(' ')[1]}/400 rounded-lg p-6`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 + sIdx * 0.15 }}
              >
                <service.icon className="w-6 h-6 mb-2" style={{
                  color: service.color === 'from-blue-500 to-cyan-500' ? '#22d3ee' :
                         service.color === 'from-green-500 to-emerald-500' ? '#10b981' : '#f97316'
                }} />
                <h4 className="text-white font-bold text-sm mb-3">{service.name}</h4>

                {/* Pods */}
                <div className="flex gap-2 flex-wrap justify-center">
                  {[...Array(service.pods)].map((_, pIdx) => (
                    <motion.div
                      key={pIdx}
                      className="w-8 h-8 bg-slate-700 border border-inherit rounded text-xs font-bold text-white flex items-center justify-center"
                      animate={{
                        opacity: [0.6, 1, 0.6],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: pIdx * 0.3,
                      }}
                    >
                      P{pIdx + 1}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Storage */}
          <motion.div
            className="bg-gradient-to-r from-slate-700 to-slate-800 border-2 border-slate-600 rounded-lg p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <Database className="w-6 h-6 text-slate-300 mx-auto mb-2" />
            <h3 className="text-white font-bold">Persistent Volume</h3>
            <p className="text-slate-400 text-sm">Database data (survives pod restarts)</p>
          </motion.div>
        </div>
      </div>

      {/* Benefits */}
      <motion.div
        className="mt-12 bg-slate-800/50 border-l-4 border-cyan-400 pl-8 py-6 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        <p className="text-white text-lg">
          Kubernetes handles load balancing, auto-scaling, failover, and recovery. You focus on code.
        </p>
      </motion.div>
    </div>
  );
};

export default Slide13_RealWorldExample;