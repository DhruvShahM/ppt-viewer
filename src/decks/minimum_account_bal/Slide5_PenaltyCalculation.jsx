import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown } from 'lucide-react';

const Slide5_PenaltyCalculation = () => {
  const [shortfall, setShortfall] = useState(5000);

  const required = 10000;
  const penalty = Math.min(Math.round((shortfall / 100) * 6), 500);

  const scenarioVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 to-red-950 flex flex-col items-center justify-center p-16 overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
      </motion.div>

      <motion.div className="w-full max-w-6xl relative z-10">
        {/* Title */}
        <motion.h2 className="text-6xl font-bold text-white mb-12 text-center flex items-center justify-center gap-4">
          <AlertTriangle className="w-16 h-16 text-red-400" />
          पेनल्टी गणना
        </motion.h2>

        {/* Main Calculation Card */}
        <motion.div
          className="bg-gradient-to-br from-red-900 to-red-800 rounded-2xl p-12 border border-red-700 mb-12"
          variants={scenarioVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-3xl font-bold text-white mb-8">उदाहरण: HDFC Bank (शहरी)</h3>

          {/* Three Column Layout */}
          <div className="grid grid-cols-3 gap-8">
            {/* Required Balance */}
            <motion.div
              className="bg-slate-800 rounded-xl p-8 border-2 border-blue-500"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-slate-400 text-lg mb-4">आवश्यक बैलेंस</p>
              <motion.h4
                className="text-5xl font-bold text-blue-400"
                key={required}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
              >
                ₹{required.toLocaleString('en-IN')}
              </motion.h4>
            </motion.div>

            {/* Actual Balance */}
            <motion.div
              className="bg-slate-800 rounded-xl p-8 border-2 border-yellow-500"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-slate-400 text-lg mb-4">आपका बैलेंस</p>
              <motion.h4
                className="text-5xl font-bold text-yellow-400"
                key={shortfall}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
              >
                ₹{shortfall.toLocaleString('en-IN')}
              </motion.h4>

              {/* Slider */}
              <input
                type="range"
                min="0"
                max={required}
                value={shortfall}
                onChange={(e) => setShortfall(parseInt(e.target.value))}
                className="w-full mt-6 cursor-pointer"
              />
            </motion.div>

            {/* Penalty */}
            <motion.div
              className="bg-slate-800 rounded-xl p-8 border-2 border-red-500"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-slate-400 text-lg mb-4">पेनल्टी</p>
              <motion.h4
                className="text-5xl font-bold text-red-400"
                key={penalty}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.6 }}
              >
                ₹{penalty}
              </motion.h4>
            </motion.div>
          </div>

          {/* Formula */}
          <motion.div
            className="mt-12 bg-slate-700 rounded-xl p-6 border-l-4 border-yellow-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-lg text-white">
              <span className="text-yellow-400 font-bold">सूत्र:</span> न्यूनतम राशि में कमी × 6% या ₹500 (जो भी कम हो)
            </p>
            <p className="text-lg text-slate-300 mt-3">
              ₹{(required - shortfall).toLocaleString('en-IN')} × 6% = ₹{Math.round((required - shortfall) * 0.06)} (पर ₹500 की अधिकतम सीमा)
            </p>
          </motion.div>
        </motion.div>

        {/* Penalty Tiers */}
        <motion.div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-6">विभिन्न बैंकों में पेनल्टी दरें</h3>

          <div className="grid grid-cols-3 gap-6">
            {[
              { bank: 'SBI', penalty: '6% या ₹100' },
              { bank: 'HDFC Bank', penalty: '6% या ₹500' },
              { bank: 'ICICI Bank', penalty: '6% या ₹500' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
              >
                <p className="text-white font-semibold text-lg">{item.bank}</p>
                <p className="text-red-300 text-lg font-bold mt-2">{item.penalty}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide5_PenaltyCalculation;