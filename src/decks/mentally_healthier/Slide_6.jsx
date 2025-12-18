

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const Slide6_PredictiveAnalytics = () => {
  // Simulated data points for time series
  const dataPoints = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    stress: Math.sin(i / 5) * 40 + 50 + Math.random() * 10
  }));

  // Find anomaly
  const anomalyDay = 20;
  const anomalyValue = 85;

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center p-12">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-5xl font-bold text-white mb-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Predictive Prevention
        </motion.h2>

        <motion.div
          className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mb-12"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { label: "Early Detection", value: "Crisis prevented", icon: AlertTriangle, color: "from-orange-500 to-red-500" },
            { label: "Time to Intervention", value: "24-48 hours", icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
            { label: "Success Rate", value: "87% improvement", icon: CheckCircle, color: "from-green-500 to-emerald-500" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            >
              <motion.div
                className="mb-3"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <stat.icon className="w-8 h-8" />
              </motion.div>
              <p className="text-sm opacity-90">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Time series chart */}
        <motion.div
          className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h4 className="text-white font-semibold mb-6">Stress Level Prediction Timeline</h4>

          <svg className="w-full" height="200" viewBox="0 0 800 200">
            <defs>
              <linearGradient id="stressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[...Array(6)].map((_, i) => (
              <line
                key={`grid-${i}`}
                x1="0"
                y1={i * 40}
                x2="800"
                y2={i * 40}
                stroke="#475569"
                strokeWidth="1"
                opacity="0.5"
              />
            ))}

            {/* Normal range zone */}
            <rect x="0" y="60" width="800" height="80" fill="#10b981" opacity="0.1" />
            <text x="10" y="110" fill="#6ee7b7" fontSize="12">Normal Range</text>

            {/* Danger zone */}
            <rect x="0" y="0" width="800" height="60" fill="#ef4444" opacity="0.1" />
            <text x="10" y="25" fill="#f87171" fontSize="12">Risk Zone</text>

            {/* Animated line path */}
            <motion.polyline
              points={dataPoints
                .map((d, i) => `${(i / (dataPoints.length - 1)) * 800},${150 - (d.stress * 1.5)}`)}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ delay: 0.8, duration: 2 }}
            />

            {/* Fill under curve */}
            <motion.path
              d={`M 0 150 ${dataPoints
                .map((d, i) => `L ${(i / (dataPoints.length - 1)) * 800} ${150 - (d.stress * 1.5)}`)
                .join(" ")} L 800 150 Z`}
              fill="url(#stressGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 2 }}
            />

            {/* Anomaly point - ALERT */}
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <circle
                cx={`${(anomalyDay / dataPoints.length) * 800}`}
                cy={`${150 - (anomalyValue * 1.5)}`}
                r="8"
                fill="#ef4444"
              />
              <motion.circle
                cx={`${(anomalyDay / dataPoints.length) * 800}`}
                cy={`${150 - (anomalyValue * 1.5)}`}
                r="8"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                animate={{ r: 20, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.g>

            {/* Days label */}
            <text x="750" y="190" fill="#9ca3af" fontSize="12">Days</text>
          </svg>

          {/* Alert explanation */}
          <motion.div
            className="mt-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-300 font-semibold">Anomaly Detected</p>
              <p className="text-red-200 text-sm">
                Stress spike on day 20 predicted interventions triggered automatically
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-slate-800/30 border border-slate-700 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <p className="text-gray-300">
            <span className="text-indigo-400 font-semibold">How it works:</span> AI models analyze thousands of data points—sleep patterns, social media activity, messaging tone, biometric data—to identify mental health crises 24-48 hours before they occur, enabling proactive intervention.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide6_PredictiveAnalytics;