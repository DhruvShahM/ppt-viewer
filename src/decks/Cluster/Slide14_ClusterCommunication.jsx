import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Network, Radio } from 'lucide-react';

const Slide14_ClusterCommunication = () => {
  const [activeConnection, setActiveConnection] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnection((prev) => (prev + 1) % 3);
    }, 2000);
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
        Internal Communication
      </motion.h2>

      {/* Network mesh visualization */}
      <div className="w-full max-w-4xl mb-12">
        {/* Nodes in cluster */}
        <div className="relative h-96 bg-slate-800/30 border border-slate-700 rounded-lg p-8">
          {/* Control Plane center */}
          <motion.div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-2 border-purple-400 rounded-lg flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Radio className="w-8 h-8 text-purple-400" />
          </motion.div>

          {/* Worker nodes around */}
          {[0, 1, 2, 3].map((idx) => {
            const angle = (idx / 4) * Math.PI * 2;
            const x = 50 + 35 * Math.cos(angle);
            const y = 50 + 35 * Math.sin(angle);

            return (
              <motion.div
                key={idx}
                className="absolute w-20 h-20 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border-2 border-cyan-400 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
              >
                W{idx + 1}
              </motion.div>
            );
          })}

          {/* Network connections SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="connectionGradient">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>

            {/* Connection lines */}
            {[0, 1, 2, 3].map((idx) => {
              const angle = (idx / 4) * Math.PI * 2;
              const x2 = 50 + 35 * Math.cos(angle);
              const y2 = 50 + 35 * Math.sin(angle);

              return (
                <motion.line
                  key={idx}
                  x1="50%"
                  y1="50%"
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke="url(#connectionGradient)"
                  strokeWidth="2"
                  opacity={activeConnection === idx ? 0.8 : 0.2}
                  animate={{ opacity: activeConnection === idx ? 0.8 : 0.2 }}
                  transition={{ duration: 0.5 }}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Communication types */}
      <motion.div
        className="grid grid-cols-3 gap-6 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {[
          { type: 'Pod-to-Pod', desc: 'Direct IP communication' },
          { type: 'Service DNS', desc: 'my-app.default.svc' },
          { type: 'External', desc: 'Ingress / LoadBalancer' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 + idx * 0.15 }}
            whileHover={{ scale: 1.05, borderColor: '#22d3ee' }}
          >
            <Network className="w-6 h-6 text-cyan-400 mx-auto mb-3" />
            <h4 className="text-white font-bold mb-2">{item.type}</h4>
            <p className="text-slate-300 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Key insight */}
      <motion.div
        className="mt-12 bg-slate-800/50 border-l-4 border-cyan-400 pl-8 py-6 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <p className="text-white text-lg">
          Kubernetes abstracts networking—pods communicate as if they were on the same network, regardless of which physical node they're on.
        </p>
      </motion.div>
    </div>
  );
};

export default Slide14_ClusterCommunication;