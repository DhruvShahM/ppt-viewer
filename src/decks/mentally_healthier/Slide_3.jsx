

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle } from 'lucide-react';

const Slide3_ImprovedTrend = () => {
  const [activeYear, setActiveYear] = useState(2022);

  const trendData = [
    { year: 2022, goodDays: 33, badDays: 31 },
    { year: 2023, goodDays: 42, badDays: 22 },
    { year: 2024, goodDays: 54, badDays: 10 }
  ];

  const currentData = trendData.find(d => d.year === activeYear);

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center p-12">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-5xl font-bold text-white mb-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          But There's Hope
        </motion.h2>

        <motion.div
          className="w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mb-12"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <div className="grid grid-cols-2 gap-12">
          {/* Left: Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
              {/* Year selector */}
              <div className="flex gap-4 mb-8">
                {trendData.map((item) => (
                  <motion.button
                    key={item.year}
                    onClick={() => setActiveYear(item.year)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${activeYear === item.year
                        ? 'bg-green-500/30 border border-green-500 text-green-300'
                        : 'bg-slate-700 text-gray-400 hover:text-gray-300'
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.year}
                  </motion.button>
                ))}
              </div>

              {/* Bar chart */}
              <div className="space-y-6">
                {/* Good days */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-green-400 font-semibold">Good mental health days</span>
                    <motion.span
                      key={currentData.goodDays}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-2xl font-bold text-green-300"
                    >
                      {currentData.goodDays}%
                    </motion.span>
                  </div>
                  <div className="bg-slate-700/50 rounded-full h-4 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${currentData.goodDays}%` }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                    />
                  </div>
                </div>

                {/* Bad days */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-red-400 font-semibold">Bad mental health days</span>
                    <motion.span
                      key={currentData.badDays}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-2xl font-bold text-red-300"
                    >
                      {currentData.badDays}%
                    </motion.span>
                  </div>
                  <div className="bg-slate-700/50 rounded-full h-4 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${currentData.badDays}%` }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                    />
                  </div>
                </div>
              </div>

              {/* Trend indicator */}
              <motion.div
                className="mt-8 flex items-center gap-2 text-green-400"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">+21% improvement since 2022</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Insights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col justify-center gap-6"
          >
            {[
              { title: "Awareness is Growing", desc: "Mental health conversations are normalized" },
              { title: "Support is Increasing", desc: "2 in 5 Gen Z in therapy; resources expanding" },
              { title: "Stigma is Decreasing", desc: "Open discussions replacing shame" },
              { title: "Interventions Work", desc: "Targeted programs showing measurable results" }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-green-500/10 border border-green-500/50 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                whileHover={{ x: 10, borderColor: "rgba(34, 197, 94, 0.8)" }}
              >
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-green-300 font-semibold mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide3_ImprovedTrend;