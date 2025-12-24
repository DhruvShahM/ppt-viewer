import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, Shield, Clock } from 'lucide-react';

const Slide8_TipsAndTricks = () => {
  const tips = [
    {
      icon: TrendingUp,
      title: 'FD का उपयोग करें',
      desc: 'कुछ बैंक FD को न्यूनतम बैलेंस के विकल्प के रूप में स्वीकार करते हैं',
      color: 'from-blue-600 to-cyan-500',
    },
    {
      icon: Shield,
      title: 'डिजिटल खाते खोलें',
      desc: 'नए डिजिटल खातों में कम न्यूनतम बैलेंस की आवश्यकता होती है',
      color: 'from-purple-600 to-pink-500',
    },
    {
      icon: Clock,
      title: 'महीने भर निगरानी रखें',
      desc: 'बैलेंस कम होने से पहले ही पैसा जोड़ें',
      color: 'from-orange-600 to-red-500',
    },
    {
      icon: Lightbulb,
      title: 'बैंक स्विच करें',
      desc: 'जीरो बैलेंस वाले बैंकों में स्विच करने पर विचार करें',
      color: 'from-green-600 to-emerald-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50, rotateY: -20 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex flex-col items-center justify-center p-16 overflow-hidden">
      {/* Animated background lights */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: 300 + i * 100,
            height: 300 + i * 100,
            opacity: 0.05,
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <motion.div className="w-full max-w-6xl relative z-10">
        {/* Title */}
        <motion.h2 className="text-6xl font-bold text-white mb-16 text-center flex items-center justify-center gap-4">
          <Lightbulb className="w-14 h-14 text-yellow-400" />
          टिप्स और ट्रिक्स
        </motion.h2>

        {/* Tips Grid */}
        <motion.div
          className="grid grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tips.map((tip, idx) => {
            const IconComponent = tip.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`bg-gradient-to-br ${tip.color} rounded-2xl p-8 border border-opacity-20 border-white overflow-hidden relative group`}
              >
                {/* Animated glow on hover */}
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-2xl"
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  {/* Icon with animation */}
                  <motion.div
                    className="mb-6 inline-block p-4 bg-white bg-opacity-10 rounded-xl"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <IconComponent className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4">{tip.title}</h3>
                  <p className="text-lg text-white opacity-90">{tip.desc}</p>

                  {/* Floating dots */}
                  {[...Array(2)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-white rounded-full"
                      animate={{
                        y: [-100, 300],
                        x: Math.sin(i) * 50,
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Warning Box */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-yellow-900 to-orange-900 rounded-2xl p-8 border-2 border-yellow-700"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-xl text-white font-semibold">
            ⚠️ याद रखें: हमेशा अपने बैंक के साथ नियमों की जांच करें। न्यूनतम बैलेंस की आवश्यकता बदल सकती है।
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide8_TipsAndTricks;