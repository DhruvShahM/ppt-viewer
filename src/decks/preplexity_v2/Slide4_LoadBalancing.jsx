import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, ArrowRightLeft } from 'lucide-react';

const Slide4_LoadBalancing = () => {
  const [distribution, setDistribution] = useState([0, 0, 0]);

  useEffect(() => {
    const requests = [
      { server: 0, time: 0 },
      { server: 1, time: 300 },
      { server: 2, time: 600 },
      { server: 0, time: 900 },
      { server: 1, time: 1200 },
      { server: 2, time: 1500 },
    ];

    requests.forEach(({ server, time }) => {
      setTimeout(() => {
        setDistribution((prev) => {
          const newDist = [...prev];
          newDist[server]++;
          return newDist;
        });
      }, time);
    });

    const resetTimer = setInterval(() => {
      setDistribution([0, 0, 0]);
    }, 2500);

    return () => clearInterval(resetTimer);
  }, []);

  const servers = [
    { id: 0, load: distribution[0] },
    { id: 1, load: distribution[1] },
    { id: 2, load: distribution[2] },
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden relative px-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-5xl font-bold text-white mb-4">Load Balancing</h2>
        <p className="text-xl text-slate-300">Distribute traffic evenly across servers</p>
      </motion.div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Load balancer */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center mb-16"
        >
          <div className="border-4 border-cyan-500 rounded-full w-20 h-20 flex items-center justify-center bg-gradient-to-br from-cyan-600 to-blue-600 relative">
            <ArrowRightLeft size={32} className="text-white" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400"
            />
          </div>
        </motion.div>

        {/* Servers */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          {servers.map((server) => (
            <motion.div key={server.id} layout className="flex flex-col items-center">
              {/* Server box */}
              <motion.div
                animate={{
                  boxShadow:
                    server.load > 0
                      ? `0 0 20px rgba(34,197,94,${server.load * 0.3})`
                      : '0 0 0px rgba(0,0,0,0)',
                }}
                className="bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-slate-700 rounded-xl p-8 w-full text-center mb-4 relative overflow-hidden"
              >
                <div className="flex justify-center mb-4">
                  <motion.div
                    animate={{
                      scale: server.load > 0 ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <Server size={32} className="text-cyan-400" />
                  </motion.div>
                </div>
                <h3 className="text-white font-bold mb-2">Server {server.id + 1}</h3>

                {/* Load indicator */}
                <div className="bg-slate-700 rounded-lg h-2 overflow-hidden mb-3">
                  <motion.div
                    animate={{ width: `${Math.min(server.load * 20, 100)}%` }}
                    transition={{ duration: 0.4 }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  />
                </div>
                <p className="text-sm text-slate-300">Load: {server.load * 20}%</p>

                {/* Incoming requests */}
                <div className="mt-6 h-16 flex items-end justify-center gap-2">
                  {Array.from({ length: server.load }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 60, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-2 h-8 bg-green-500 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="border border-slate-700 bg-slate-800 rounded-lg p-6"
        >
          <p className="text-slate-200">
            <span className="font-semibold text-cyan-400">Round-robin distribution:</span> Each request
            directed to the next available server in rotation
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide4_LoadBalancing;