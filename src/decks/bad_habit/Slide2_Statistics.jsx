import React from 'react';
import { Smartphone, TrendingUp, AlertCircle } from 'lucide-react';

const Slide2_Statistics = () => {
  const stats = [
    { label: '71%', description: 'Sleep with phone within arm\'s reach', color: 'text-red-400' },
    { label: '80%', description: 'Check phone within 5 mins of waking', color: 'text-orange-400' },
    { label: '45%', description: 'Report sleep disruption due to notifications', color: 'text-amber-400' },
    { label: '64%', description: 'Experience FOMO-related sleep anxiety', color: 'text-yellow-400' },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-12 py-16">
      <div className="mb-16">
        <h2 className="text-5xl font-bold text-white text-center mb-2">Current Reality</h2>
        <p className="text-xl text-gray-400 text-center">Global sleep & phone proximity patterns</p>
      </div>

      <div className="grid grid-cols-2 gap-8 max-w-5xl">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className={`w-6 h-6 ${stat.color}`} />
              <span className={`text-5xl font-bold ${stat.color}`}>{stat.label}</span>
            </div>
            <p className="text-lg text-gray-300">{stat.description}</p>
            <div className="mt-4 h-1 w-full bg-gradient-to-r from-gray-700 to-transparent"></div>
          </div>
        ))}
      </div>

      <div className="mt-16 flex items-center gap-3 text-gray-400">
        <AlertCircle className="w-5 h-5" />
        <span>Data source: Sleep Foundation, American Academy of Sleep Medicine, 2024</span>
      </div>
    </div>
  );
};

export default Slide2_Statistics;