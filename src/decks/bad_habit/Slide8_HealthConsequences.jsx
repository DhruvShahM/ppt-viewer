import React from 'react';
import { AlertCircle, TrendingDown, Zap, Brain } from 'lucide-react';

const Slide8_HealthConsequences = () => {
  const consequences = [
    {
      category: 'Cognitive',
      impact: '-26%',
      effects: ['Memory consolidation', 'Learning retention', 'Decision making'],
      color: 'text-blue-400',
    },
    {
      category: 'Cardiovascular',
      impact: '+45%',
      effects: ['Blood pressure variability', 'Heart rate irregularities', 'Stress markers'],
      color: 'text-red-400',
    },
    {
      category: 'Metabolic',
      impact: '-31%',
      effects: ['Glucose regulation', 'Insulin sensitivity', 'Weight management'],
      color: 'text-orange-400',
    },
    {
      category: 'Immune',
      impact: '-18%',
      effects: ['Immune response', 'Infection recovery', 'Inflammation control'],
      color: 'text-green-400',
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-12 py-16">
      <div className="mb-12">
        <h2 className="text-5xl font-bold text-white text-center mb-3">Health Consequences</h2>
        <p className="text-xl text-gray-400 text-center">Long-term effects of phone-adjacent sleep</p>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-2 gap-8">
        {consequences.map((item, i) => (
          <div key={i} className="p-6 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <p className="text-white font-semibold text-lg">{item.category}</p>
              <span className={`text-3xl font-bold ${item.color}`}>{item.impact}</span>
            </div>

            <div className="space-y-2">
              {item.effects.map((effect, j) => (
                <div key={j} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                  <p className="text-gray-400 text-sm">{effect}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 max-w-5xl w-full p-6 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg">
        <div className="flex gap-3">
          <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-400 font-semibold mb-2">Compounding Effect</p>
            <p className="text-gray-300 text-sm">
              Sleep fragmentation over 2-4 weeks creates metabolic syndrome markers, elevated inflammation cytokines (IL-6, TNF-α), and impaired immune NK cell activity equivalent to sleep deprivation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide8_HealthConsequences;