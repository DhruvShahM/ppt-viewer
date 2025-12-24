import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Shield, TrendingUp, Users } from 'lucide-react';

const Slide3_WhyBanksNeed = () => {
  const reasons = [
    {
      icon: BarChart3,
      title: 'तरलता प्रबंधन',
      desc: 'बैंक को हमेशा नकद रिजर्व रखना पड़ता है',
      color: 'from-blue-500 to-blue-600',
      delay: 0.2,
    },
    {
      icon: Shield,
      title: 'जोखिम कम करना',
      desc: 'डिफ़ॉल्ट का खतरा कम होता है',
      color: 'from-purple-500 to-purple-600',
      delay: 0.4,
    },
    {
      icon: TrendingUp,
      title: 'लाभजनकता',
      desc: 'बैंक को आय का स्रोत मिलता है',
      color: 'from-green-500 to-green-600',
      delay: 0.6,
    },
    {
      icon: Users,
      title: 'ग्राहक प्रतिबद्धता',
      desc: 'गंभीर ग्राहकों को प्राथमिकता',
      color: 'from-orange-500 to-orange-600',
      delay: 0.8,
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
    hidden: { opacity: 0, y: 40, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex flex-col items-center justify-center p-16 overflow-hidden">
      <motion.div className="w-full max-w-6xl">
        {/* Title */}
        <motion.h2 className="text-6xl font-bold text-white mb-16 text-center">
          बैंकों को न्यूनतम बैलेंस की क्यों जरूरत है?
        </motion.h2>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {reasons.map((reason, idx) => {
            const IconComponent = reason.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-br ${reason.color} rounded-2xl p-8 border border-opacity-20 border-white overflow-hidden relative group`}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
                  animate={{ opacity: [0, 0.1, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="mb-6"
                  >
                    <IconComponent className="w-16 h-16 text-white" strokeWidth={1.5} />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-3">{reason.title}</h3>
                  <p className="text-lg text-white opacity-90">{reason.desc}</p>

                  {/* Floating particles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      animate={{
                        y: [-100, 300],
                        x: Math.sin(i) * 50,
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide3_WhyBanksNeed;