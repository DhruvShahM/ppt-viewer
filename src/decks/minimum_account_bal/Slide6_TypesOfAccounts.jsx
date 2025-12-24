import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, Target } from 'lucide-react';

const Slide6_TypesOfAccounts = () => {
  const accountTypes = [
    {
      name: 'बेसिक सेविंग्स खाता',
      minBalance: 'शून्य',
      features: ['कोई न्यूनतम बैलेंस नहीं', 'एक महीने में 4 निकासी तक', 'अतिरिक्त सीमाएं'],
      icon: Zap,
      color: 'from-green-600 to-green-500',
      delay: 0,
    },
    {
      name: 'नियमित सेविंग्स खाता',
      minBalance: 'बैंक के अनुसार',
      features: ['न्यूनतम बैलेंस आवश्यक', 'असीमित लेनदेन', 'पूरी सुविधाएं'],
      icon: Users,
      color: 'from-blue-600 to-blue-500',
      delay: 0.2,
    },
    {
      name: 'प्रीमियम सेविंग्स खाता',
      minBalance: 'अधिक (₹50,000+)',
      features: ['उच्च न्यूनतम बैलेंस', 'विशेष सुविधाएं', 'बेहतर ब्याज दर'],
      icon: Target,
      color: 'from-purple-600 to-purple-500',
      delay: 0.4,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex flex-col items-center justify-center p-16 overflow-hidden">
      <motion.div className="w-full max-w-6xl">
        {/* Title */}
        <motion.h2 className="text-6xl font-bold text-white mb-16 text-center">
          खाते के प्रकार
        </motion.h2>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {accountTypes.map((account, idx) => {
            const IconComponent = account.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className={`bg-gradient-to-br ${account.color} rounded-2xl p-8 border border-opacity-20 border-white overflow-hidden relative h-full`}
              >
                {/* Animated background elements */}
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-3xl"
                  animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className="mb-6"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <IconComponent className="w-14 h-14 text-white" strokeWidth={1.5} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4">{account.name}</h3>

                  {/* Min Balance Badge */}
                  <motion.div
                    className="inline-block bg-white bg-opacity-20 rounded-lg px-4 py-2 mb-6"
                    whileHover={{ scale: 1.1 }}
                  >
                    <p className="text-sm text-white font-semibold">न्यूनतम: {account.minBalance}</p>
                  </motion.div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {account.features.map((feature, fIdx) => (
                      <motion.li
                        key={fIdx}
                        className="flex items-start gap-3 text-white"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + fIdx * 0.1 }}
                      >
                        <span className="mt-1.5">
                          <motion.div
                            className="w-2 h-2 bg-white rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </span>
                        <span className="text-lg">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide6_TypesOfAccounts;