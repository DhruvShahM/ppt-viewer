import React from 'react';
import { Moon, Zap } from 'lucide-react';

const Slide5_SleepCycle = () => {
  const stages = [
    { stage: 'N1 (Light Sleep)', duration: '5-10%', depth: '20%', color: 'from-blue-700 to-blue-600' },
    { stage: 'N2 (Light Sleep)', duration: '45-55%', depth: '40%', color: 'from-blue-600 to-blue-500' },
    { stage: 'N3 (Deep Sleep)', duration: '15-20%', depth: '80%', color: 'from-indigo-700 to-indigo-600' },
    { stage: 'REM (Dreams)', duration: '20-25%', depth: '60%', color: 'from-purple-700 to-purple-600' },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-12 py-16">
      <div className="mb-12">
        <h2 className="text-5xl font-bold text-white text-center mb-3">Sleep Architecture Impact</h2>
        <p className="text-xl text-gray-400 text-center">How phone proximity degrades sleep quality</p>
      </div>

      <div className="max-w-6xl w-full space-y-8">
        {stages.map((stage, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <p className="text-white font-semibold text-lg">{stage.stage}</p>
              <div className="flex gap-4 text-sm text-gray-400">
                <span>Duration: {stage.duration}</span>
                <span>Depth: {stage.depth}</span>
              </div>
            </div>

            <div className="h-16 bg-gray-800 rounded-lg overflow-hidden">
              <div className={`h-full w-full bg-gradient-to-r ${stage.color} flex items-center px-6`}>
                <span className="text-white font-semibold opacity-80">
                  {stage.depth} sleep depth achieved
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              Phone exposure reduces {stage.stage} by 25-35% | Cumulative effect: 2-3 hours lost deep sleep per night
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-8">
        <div className="p-4 bg-green-500 bg-opacity-10 border border-green-500 border-opacity-30 rounded-lg">
          <p className="text-green-400 font-semibold mb-1">✓ Optimal Sleep</p>
          <p className="text-gray-300 text-sm">Phone in another room: Full cycle restoration</p>
        </div>
        <div className="p-4 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg">
          <p className="text-red-400 font-semibold mb-1">✗ Degraded Sleep</p>
          <p className="text-gray-300 text-sm">Phone on bedside: 20-30% cycle disruption</p>
        </div>
      </div>
    </div>
  );
};

export default Slide5_SleepCycle;