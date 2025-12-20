import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Database, Settings as SettingsIcon } from 'lucide-react';

const Slide12_ConfigStorage = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex flex-col items-center justify-center overflow-hidden p-20">
      <motion.h2
        className="text-5xl font-bold text-white mb-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Configuration & Secrets
      </motion.h2>

      <div className="w-full max-w-5xl">
        {/* ConfigMap */}
        <motion.div
          className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-400 rounded-lg p-8 mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <SettingsIcon className="w-6 h-6 text-blue-400" />
            <h3 className="text-2xl font-bold text-white">ConfigMap</h3>
          </div>

          <p className="text-slate-300 mb-4">Store non-sensitive configuration data</p>

          {/* Config items */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: 'DATABASE_HOST', value: 'db.example.com' },
              { key: 'LOG_LEVEL', value: 'INFO' },
              { key: 'MAX_WORKERS', value: '8' },
              { key: 'CACHE_TTL', value: '3600' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-slate-800/50 rounded p-3 font-mono text-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              >
                <span className="text-blue-400">{item.key}</span>
                <span className="text-slate-500"> = </span>
                <span className="text-green-400">{item.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Secrets */}
        <motion.div
          className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border-2 border-red-400 rounded-lg p-8"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-6 h-6 text-red-400" />
            <h3 className="text-2xl font-bold text-white">Secrets</h3>
          </div>

          <p className="text-slate-300 mb-4">Store sensitive data securely</p>

          {/* Secret items */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: 'API_KEY', value: '••••••••' },
              { key: 'DB_PASSWORD', value: '••••••••' },
              { key: 'TLS_CERT', value: '••••••••' },
              { key: 'OAUTH_TOKEN', value: '••••••••' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-slate-800/50 rounded p-3 font-mono text-xs flex items-center justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
              >
                <span className="text-red-400">{item.key}</span>
                <motion.span
                  className="text-slate-400"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {item.value}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How pods access */}
        <motion.div
          className="mt-12 bg-slate-800/50 border border-slate-700 rounded-lg p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h4 className="text-white font-bold mb-4">Pods access via:</h4>
          <div className="grid grid-cols-2 gap-4">
            {[
              { method: 'Environment Variables', ex: 'env: [name: API_KEY]' },
              { method: 'Volume Mounts', ex: 'mount at /etc/config/' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-slate-700/50 rounded p-4"
                animate={{ boxShadow: ['0 0 10px rgba(34,211,238,0)', '0 0 20px rgba(34,211,238,0.3)', '0 0 10px rgba(34,211,238,0)'] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
              >
                <p className="text-cyan-400 font-semibold text-sm">{item.method}</p>
                <p className="text-slate-400 text-xs mt-1 font-mono">{item.ex}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide12_ConfigStorage;