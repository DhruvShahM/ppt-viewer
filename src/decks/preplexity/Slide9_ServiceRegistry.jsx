import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Search, CheckCircle, AlertCircle } from 'lucide-react';

const Slide9_ServiceRegistry = () => {
  const [selectedService, setSelectedService] = useState(0);

  const services = [
    {
      id: 0,
      name: 'Service Discovery',
      icon: Search,
      color: 'from-blue-500 to-cyan-500',
      databases: [
        { name: 'PostgreSQL', version: '14.5', status: 'healthy', health: 95 },
        { name: 'Redis', version: '7.0', status: 'healthy', health: 98 },
        { name: 'MongoDB', version: '5.0', status: 'warning', health: 72 }
      ]
    },
    {
      id: 1,
      name: 'Configuration Center',
      icon: Cloud,
      color: 'from-purple-500 to-pink-500',
      databases: [
        { name: 'Etcd', version: '3.5', status: 'healthy', health: 99 },
        { name: 'Consul', version: '1.12', status: 'healthy', health: 96 },
        { name: 'ZooKeeper', version: '3.8', status: 'degraded', health: 45 }
      ]
    },
    {
      id: 2,
      name: 'Observability Layer',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      databases: [
        { name: 'Prometheus', version: '2.35', status: 'healthy', health: 94 },
        { name: 'Elasticsearch', version: '8.2', status: 'healthy', health: 91 },
        { name: 'ClickHouse', version: '22.7', status: 'healthy', health: 97 }
      ]
    }
  ];

  const activeService = services[selectedService];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated connections */}
      <svg className="absolute inset-0 w-full h-full opacity-10" style={{ pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" />
            <stop offset="100%" stopColor="rgb(34, 211, 238)" />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={i}
            x1={Math.random() * 1200}
            y1={Math.random() * 600}
            x2={Math.random() * 1200}
            y2={Math.random() * 600}
            stroke="url(#lineGrad)"
            strokeWidth="2"
            animate={{
              x1: Math.random() * 1200,
              x2: Math.random() * 1200,
              y1: Math.random() * 600,
              y2: Math.random() * 600,
              opacity: [0.1, 0.5, 0.1]
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </svg>

      <div className="relative z-10 w-full px-8">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center text-white mb-4"
        >
          Service Registry for Discovery
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-slate-400 mb-16"
        >
          Dynamic systems need dynamic service discovery
        </motion.p>

        {/* Service selector */}
        <div className="flex justify-center gap-4 mb-12">
          {services.map((service) => (
            <motion.button
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
              animate={{
                background: selectedService === service.id
                  ? `linear-gradient(135deg, var(--tw-gradient-stops))`
                  : 'rgba(30, 41, 59, 0.6)',
                color: selectedService === service.id ? 'white' : 'rgba(203, 213, 225, 0.7)',
                scale: selectedService === service.id ? 1.05 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <service.icon className="w-5 h-5" />
              {service.name}
            </motion.button>
          ))}
        </div>

        {/* Service details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-5xl mx-auto"
          >
            {/* Databases grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeService.databases.map((db, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className={`p-6 rounded-xl border ${
                    db.status === 'healthy'
                      ? 'border-green-700/50 bg-green-900/20'
                      : db.status === 'warning'
                      ? 'border-yellow-700/50 bg-yellow-900/20'
                      : 'border-red-700/50 bg-red-900/20'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{db.name}</h3>
                      <p className="text-xs text-slate-400">v{db.version}</p>
                    </div>
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 2 + idx * 0.2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      {db.status === 'healthy' ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : db.status === 'warning' ? (
                        <AlertCircle className="w-6 h-6 text-yellow-400" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-red-400" />
                      )}
                    </motion.div>
                  </div>

                  {/* Health bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs text-slate-300">Health</p>
                      <p className="text-sm font-bold text-white">{db.health}%</p>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${
                          db.status === 'healthy'
                            ? 'from-green-500 to-green-400'
                            : db.status === 'warning'
                            ? 'from-yellow-500 to-yellow-400'
                            : 'from-red-500 to-red-400'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${db.health}%` }}
                        transition={{ delay: idx * 0.1, duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  {/* Status badge */}
                  <motion.div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      db.status === 'healthy'
                        ? 'bg-green-900/60 text-green-200'
                        : db.status === 'warning'
                        ? 'bg-yellow-900/60 text-yellow-200'
                        : 'bg-red-900/60 text-red-200'
                    }`}
                    animate={{
                      boxShadow: [
                        'none',
                        '0 0 12px rgba(74, 222, 128, 0.5)',
                        'none'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    {db.status.charAt(0).toUpperCase() + db.status.slice(1)}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12 bg-slate-800/50 border border-slate-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-3">Key Insight:</h3>
              <p className="text-slate-300">
                A service registry enables automatic discovery of database endpoints, versions, and health status. This is essential when you have more databases than you can manage manually.
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Slide9_ServiceRegistry;