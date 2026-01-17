

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Globe, Users, TrendingUp } from 'lucide-react';

const Slide7_BarriersBreaking = () => {
  const [expandedBarrier, setExpandedBarrier] = useState(0);

  const barriers = [
    {
      title: "Accessibility Gap",
      problem: "54% of youth can't access needed care",
      solution: "Teletherapy + AI chatbots breaking geographic barriers",
      icon: Globe,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Stigma & Fear",
      problem: "Many avoid help due to shame",
      solution: "Normalized conversations + anonymous AI support",
      icon: Users,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Cost Barriers",
      problem: "Therapy is expensive for most",
      solution: "AI-powered affordable solutions for millions",
      icon: Lock,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Response Time",
      problem: "Crisis needs immediate care",
      solution: "24/7 AI availability + predictive intervention",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center p-12">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-5xl font-bold text-white mb-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Breaking Down Barriers
        </motion.h2>

        <motion.div
          className="w-12 h-1 bg-gradient-to-r from-orange-500 to-red-500 mb-12"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <div className="space-y-4">
          {barriers.map((barrier, i) => {
            const Icon = barrier.icon;
            const isExpanded = expandedBarrier === i;

            return (
              <motion.div
                key={i}
                className={`cursor-pointer rounded-2xl overflow-hidden transition-all ${
                  isExpanded
                    ? "bg-gradient-to-br " + barrier.color + " p-8"
                    : "bg-slate-800/50 border border-slate-700 p-6 hover:border-slate-600"
                }`}
                onClick={() => setExpandedBarrier(isExpanded ? -1 : i)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <motion.div
                      animate={{ rotate: isExpanded ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon
                        className={`w-8 h-8 flex-shrink-0 mt-1 ${
                          isExpanded ? "text-white" : "text-gray-400"
                        }`}
                      />
                    </motion.div>

                    <div className="flex-1">
                      <h3
                        className={`text-xl font-bold mb-2 ${
                          isExpanded ? "text-white" : "text-gray-300"
                        }`}
                      >
                        {barrier.title}
                      </h3>

                      <AnimatePresence mode="wait">
                        {isExpanded ? (
                          <motion.div
                            key="expanded"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="mb-4">
                              <p className="text-sm opacity-80 mb-3">
                                <span className="font-semibold">Problem:</span> {barrier.problem}
                              </p>
                              <p className="text-sm opacity-80">
                                <span className="font-semibold">Solution:</span> {barrier.solution}
                              </p>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.p
                            key="collapsed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-gray-400 text-sm"
                          >
                            {barrier.problem}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 ml-4 ${
                      isExpanded ? "text-white" : "text-gray-400"
                    }`}
                  >
                    ▼
                  </motion.div>
                </div>

                {/* Progress bar for solutions */}
                {isExpanded && (
                  <motion.div
                    className="mt-6 h-2 bg-white/20 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.3, duration: 1 }}
                    />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slide7_BarriersBreaking;