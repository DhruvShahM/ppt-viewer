import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const Slide9_Timeline = () => {
  const events = [
    {
      year: 'जुलाई 2022',
      title: 'HDFC Bank',
      desc: 'न्यूनतम बैलेंस नियम लागू',
      color: 'from-red-600 to-red-500',
    },
    {
      year: 'अगस्त 2025',
      title: 'ICICI Bank',
      desc: '₹50,000 तक की बढ़ोतरी',
      color: 'from-orange-600 to-orange-500',
    },
    {
      year: 'अगस्त 2025',
      title: 'ICICI Revised',
      desc: '₹15,000 तक कम किया गया',
      color: 'from-blue-600 to-blue-500',
    },
    {
      year: 'जुलाई 2025',
      title: 'Indian Bank',
      desc: 'पेनल्टी हटा दिया गया',
      color: 'from-green-600 to-green-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex flex-col items-center justify-center p-16 overflow-hidden">
      <motion.div className="w-full max-w-6xl">
        {/* Title */}
        <motion.h2 className="text-6xl font-bold text-white mb-16 text-center flex items-center justify-center gap-4">
          <Calendar className="w-14 h-14 text-cyan-400" />
          बैंकिंग परिवर्तन का समय रेखा
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-blue-500 transform -translate-x-1/2"
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 2 }}
          />

          {/* Events */}
          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {events.map((event, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`flex ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8 items-center`}
              >
                {/* Content */}
                <motion.div
                  className={`w-5/12 bg-gradient-to-br ${event.color} rounded-2xl p-8 border border-opacity-20 border-white`}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.p
                    className="text-sm font-bold text-white opacity-80 mb-2"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  >
                    {event.year}
                  </motion.p>
                  <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-lg text-white opacity-90">{event.desc}</p>
                </motion.div>

                {/* Dot */}
                <motion.div
                  className="w-2/12 flex justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                >
                  <motion.div className="w-6 h-6 bg-cyan-400 rounded-full border-4 border-slate-900 shadow-lg shadow-cyan-400/50" />
                </motion.div>

                {/* Spacer */}
                <div className="w-5/12" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Slide9_Timeline;