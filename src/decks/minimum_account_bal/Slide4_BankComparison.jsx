import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Slide4_BankComparison = () => {
  const [selectedCategory, setSelectedCategory] = useState('urban');

  const banks = [
    {
      name: 'SBI',
      type: 'सरकारी',
      urban: '₹10,000',
      semiUrban: '₹5,000',
      rural: '₹2,500',
      color: 'from-blue-600 to-blue-500',
      logo: '🏦',
    },
    {
      name: 'HDFC Bank',
      type: 'निजी',
      urban: '₹10,000',
      semiUrban: '₹5,000',
      rural: '₹2,500',
      color: 'from-red-600 to-red-500',
      logo: '🏧',
    },
    {
      name: 'ICICI Bank',
      type: 'निजी',
      urban: '₹15,000',
      semiUrban: '₹7,500',
      rural: '₹1,000',
      color: 'from-orange-600 to-orange-500',
      logo: '💳',
    },
    {
      name: 'PNB',
      type: 'सरकारी',
      urban: '₹5,000',
      semiUrban: '₹2,500',
      rural: '₹1,000',
      color: 'from-green-600 to-green-500',
      logo: '🏛️',
    },
  ];

  const categories = [
    { id: 'urban', label: 'शहरी (Metro)' },
    { id: 'semiUrban', label: 'अर्ध-शहरी' },
    { id: 'rural', label: 'ग्रामीण' },
  ];

  const getAmount = (bank) => {
    return bank[selectedCategory];
  };

  const getMaxAmount = () => {
    return Math.max(...banks.map(b => parseInt(b[selectedCategory])));
  };

  const getBarWidth = (bank) => {
    const max = getMaxAmount();
    const amount = parseInt(bank[selectedCategory]);
    return (amount / max) * 100;
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex flex-col items-center justify-center p-16 overflow-hidden">
      <motion.div className="w-full max-w-6xl">
        {/* Title */}
        <motion.h2 className="text-6xl font-bold text-white mb-4 text-center">
          भारतीय बैंकों में तुलना
        </motion.h2>

        {/* Category Filter */}
        <motion.div className="flex justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Banks Comparison */}
        <motion.div className="space-y-6">
          {banks.map((bank, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{bank.logo}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{bank.name}</h3>
                    <p className="text-sm text-slate-400">{bank.type}</p>
                  </div>
                </div>
                <motion.div
                  className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${bank.color}`}
                  key={`${bank.name}-${selectedCategory}`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  {getAmount(bank)}
                </motion.div>
              </div>

              {/* Bar */}
              <motion.div className="h-8 bg-slate-700 rounded-lg overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${bank.color} rounded-lg flex items-center justify-end pr-4`}
                  initial={{ width: 0 }}
                  animate={{ width: `${getBarWidth(bank)}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          className="text-center text-slate-400 mt-12 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          नोट: ये आंकड़े 2025 तक के हैं और बैंकों द्वारा बदले जा सकते हैं
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Slide4_BankComparison;