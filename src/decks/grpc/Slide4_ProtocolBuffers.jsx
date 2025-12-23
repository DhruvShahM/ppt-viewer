import React from 'react';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';

const Slide4_ProtocolBuffers = () => {
  const jsonExample = `{
  "user": {
    "id": 123,
    "name": "Alice",
    "email": "alice@..."
  }
}`;

  const protoExample = `message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
}`;

  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center px-12 relative overflow-hidden">
      {/* Flowing background */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
        animate={{ x: [-50, 50, -50], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 w-full max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold text-white mb-4 flex items-center gap-4"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            <Database className="w-16 h-16 text-purple-400" />
          </motion.div>
          Protocol Buffers
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl text-slate-400 mb-12"
        >
          Binary format = Smaller, Faster, Strongly Typed
        </motion.p>

        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* JSON */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-slate-800 rounded-xl overflow-hidden border border-red-500/30"
          >
            <div className="bg-red-900/40 px-6 py-3 border-b border-red-500/30">
              <p className="font-bold text-red-300">JSON (~200 bytes)</p>
            </div>
            <pre className="p-6 text-sm text-red-200 font-mono overflow-auto">
              {jsonExample}
            </pre>
            <motion.div
              className="h-1 bg-gradient-to-r from-red-500 to-transparent"
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Protobuf */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-slate-800 rounded-xl overflow-hidden border border-green-500/30"
          >
            <div className="bg-green-900/40 px-6 py-3 border-b border-green-500/30">
              <p className="font-bold text-green-300">Protobuf (~50 bytes)</p>
            </div>
            <pre className="p-6 text-sm text-green-200 font-mono overflow-auto">
              {protoExample}
            </pre>
            <motion.div
              className="h-1 bg-gradient-to-r from-green-500 to-transparent"
              animate={{ scaleX: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5,
              }}
            />
          </motion.div>
        </div>

        {/* Comparison bars */}
        <div className="space-y-4">
          {[
            { label: 'Size', json: 200, pb: 50, unit: 'bytes' },
            { label: 'Speed', json: 8, pb: 2, unit: 'ms' },
            { label: 'Type-safety', json: '❌', pb: '✅', unit: '' },
          ].map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + idx * 0.2 }}
              className="flex items-center justify-between bg-slate-800 rounded-lg p-4"
            >
              <span className="text-slate-300 font-semibold w-24">
                {metric.label}
              </span>
              <div className="flex-1 mx-6 flex gap-4">
                <div className="flex-1">
                  <motion.div
                    className="bg-red-500 rounded h-2"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        typeof metric.json === 'number'
                          ? Math.min((metric.json / 200) * 100, 100)
                          : 0
                      }%`,
                    }}
                    transition={{
                      delay: 0.8 + idx * 0.2,
                      duration: 1,
                    }}
                  />
                  <p className="text-xs text-red-300 mt-1">JSON</p>
                </div>
                <div className="flex-1">
                  <motion.div
                    className="bg-green-500 rounded h-2"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        typeof metric.pb === 'number'
                          ? Math.min((metric.pb / 200) * 100, 100)
                          : 0
                      }%`,
                    }}
                    transition={{
                      delay: 0.8 + idx * 0.2,
                      duration: 1,
                    }}
                  />
                  <p className="text-xs text-green-300 mt-1">Protobuf</p>
                </div>
              </div>
              <span className="text-slate-400 w-16 text-right">
                {metric.unit}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slide4_ProtocolBuffers;