import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin } from 'lucide-react';

const Slide7_ZeroBalance = () => {
  const zeroBalanceBanks = [
    { name: 'Indian Bank', symbol: '🏦', features: ['सभी शाखाओं में', 'कोई पेनल्टी नहीं'] },
    { name: 'Punjab National Bank', symbol: '🏛️', features: ['आंशिक शाखाओं में', 'निर्दिष्ट शर्तें'] },
    { name: 'Canara Bank', symbol: '🏢', features: ['चयनित खातों में', 'न्यूनतम जमा'] },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 to-emerald-950 flex flex-col items-center justify-center p-16 overflow-hidden relative">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
      </motion.div>

      <motion.div className="w-full max-w-6xl relative z-10">
        {/* Title */}
        <motion.h2
          className="text-6xl font-bold text-white mb-4 text-center flex items-center justify-center gap-4"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <CheckCircle className="w-16 h-16 text-emerald-400" />
          जीरो बैलेंस खाते
        </motion.h2>

        <motion.p
          className="text-2xl text-emerald-200 text-center mb-12"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          कुछ बैंकों में न्यूनतम बैलेंस की आवश्यकता नहीं है
        </motion.p>

        {/* Banks Grid */}
        <motion.div
          className="grid grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {zeroBalanceBanks.map((bank, idx) => (
            <motion.div
              key={idx}
              className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl p-8 border border-emerald-700"
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="text-5xl mb-4 text-center">{bank.symbol}</div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">{bank.name}</h3>
              <ul className="space-y-3">
                {bank.features.map((feature, fIdx) => (
                  <motion.li
                    key={fIdx}
                    className="flex items-center gap-3 text-white"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.15 + fIdx * 0.1 }}
                  >
                    <motion.div
                      className="w-2.5 h-2.5 bg-emerald-300 rounded-full flex-shrink-0"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: fIdx * 0.3 }}
                    />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Advantages Box */}
        <motion.div
          className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-2xl p-8 border border-emerald-700"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <MapPin className="w-6 h-6 text-emerald-300" />
            लाभ:
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              'कोई पेनल्टी चार्ज नहीं',
              'गरीब लोगों के लिए सुविधाजनक',
              'खाता बनाए रखना आसान',
              'बेसिक बैंकिंग सेवाएं',
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
              >
                <motion.div
                  className="w-3 h-3 bg-emerald-300 rounded-full"
                  animate={{ pulse: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                />
                <span className="text-lg text-white">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide7_ZeroBalance;