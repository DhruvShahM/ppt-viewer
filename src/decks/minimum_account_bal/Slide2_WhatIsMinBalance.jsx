import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle } from 'lucide-react';

const Slide2_WhatIsMinBalance = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const barVariants = {
    hidden: { height: 0 },
    visible: { height: '100%', transition: { duration: 1.2, ease: 'easeOut' } },
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex flex-col items-center justify-center p-16 overflow-hidden">
      <motion.div
        className="w-full max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.h2 className="text-6xl font-bold text-white mb-16 text-center">
          न्यूनतम बैलेंस क्या है?
        </motion.h2>

        {/* Definition Card */}
        <motion.div variants={cardVariants} className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 mb-12 border border-blue-700">
          <div className="flex items-start gap-6">
            <AlertCircle className="w-12 h-12 text-yellow-400 flex-shrink-0 mt-2" />
            <div>
              <p className="text-xl text-white leading-relaxed">
                <span className="font-bold text-blue-300">न्यूनतम औसत बैलेंस (MAB)</span> वह न्यूनतम राशि है जो आपको प्रत्येक महीने अपने बैंक खाते में रखनी अनिवार्य है।
              </p>
              <p className="text-lg text-blue-100 mt-4">
                यदि आप इस राशि को बनाए नहीं रखते, तो बैंक आपसे पेनल्टी लेता है।
              </p>
            </div>
          </div>
        </motion.div>

        {/* Visual Representation */}
        <motion.div variants={cardVariants} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-12 border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-8">औसत मासिक बैलेंस की गणना</h3>
          
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[15000, 22000, 18000, 25000].map((amount, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
              >
                <motion.div
                  className="w-16 h-48 bg-gradient-to-t from-blue-500 to-blue-400 rounded-lg flex items-end justify-center pb-2 relative overflow-hidden"
                  variants={barVariants}
                >
                  <motion.span
                    className="text-white font-bold text-lg"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                  >
                    ₹{amount / 1000}k
                  </motion.span>
                </motion.div>
                <p className="text-blue-200 mt-4 text-sm font-semibold">सप्ताह {i + 1}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-slate-700 rounded-xl p-6 border-2 border-yellow-500"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-xl text-white font-bold">
              औसत = (₹15,000 + ₹22,000 + ₹18,000 + ₹25,000) ÷ 4 = <span className="text-yellow-300">₹20,000</span>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide2_WhatIsMinBalance;