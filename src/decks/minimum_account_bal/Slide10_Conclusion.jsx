import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

const Slide10_Conclusion = () => {
  const keyPoints = [
    {
      icon: CheckCircle,
      title: 'सही बैंक चुनें',
      desc: 'अपनी जरूरत के अनुसार बैंक और खाता चुनें',
      color: 'text-green-400',
    },
    {
      icon: AlertCircle,
      title: 'नियमों पर नज़र रखें',
      desc: 'बैंकों के न्यूनतम बैलेंस नियमों में बदलाव हो सकता है',
      color: 'text-yellow-400',
    },
    {
      icon: TrendingUp,
      title: 'बुद्धिमानी से योजना बनाएं',
      desc: 'अपने बैलेंस को सही तरीके से प्रबंधित करें',
      color: 'text-blue-400',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8 } },
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex flex-col items-center justify-center p-16 overflow-hidden relative">
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-600 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      <motion.div className="w-full max-w-6xl relative z-10">
        {/* Main Title */}
        <motion.h2
          className="text-7xl font-bold text-white mb-4 text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          याद रखें
        </motion.h2>

        <motion.p
          className="text-2xl text-purple-200 text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          आपके वित्तीय लक्ष्य आपकी प्राथमिकता है
        </motion.p>

        {/* Key Points */}
        <motion.div
          className="grid grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {keyPoints.map((point, idx) => {
            const IconComponent = point.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.08, y: -15 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 text-center"
              >
                <motion.div
                  className={`flex justify-center mb-6 ${point.color}`}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <IconComponent className="w-12 h-12" strokeWidth={1.5} />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-3">{point.title}</h3>
                <p className="text-lg text-slate-300">{point.desc}</p>

                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 blur-xl group-hover:opacity-30 transition-all duration-300"
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Final Call to Action */}
        <motion.div
          className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-2xl p-12 border-2 border-purple-700 text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-4xl font-bold text-white mb-4">
            बुद्धिमानी से चुनें
          </h3>
          <p className="text-xl text-purple-200 mb-6">
            अपने वित्तीय भविष्य को सुरक्षित रखने के लिए सही बैंक और खाता चुनें।
          </p>

          {/* Animated button */}
          <motion.div
            className="inline-flex items-center gap-3"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="px-8 py-3 bg-white text-purple-900 font-bold text-lg rounded-lg">
              आगे बढ़ें
            </div>
            <motion.div
              className="w-4 h-4 bg-white rounded-full"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Bottom accent */}
        <motion.div
          className="mt-12 text-center text-slate-500 text-lg"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          सभी आंकड़े 2025 तक के लिए वैध हैं
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide10_Conclusion;