import React from 'react';
import { CheckCircle, Smartphone, Clock, Shield } from 'lucide-react';

const Slide9_Solutions = () => {
  const solutions = [
    {
      icon: Smartphone,
      tier: 'Tier 1: Proximity',
      solutions: [
        'Keep phone in another room (MOST EFFECTIVE)',
        'Minimum 3 meters distance',
        'Use separate alarm clock',
      ],
      impact: 'Sleep quality: +35-40%',
      color: 'text-green-400',
    },
    {
      icon: Clock,
      tier: 'Tier 2: Temporal Boundaries',
      solutions: [
        'No screens 1 hour before bed',
        'Do not disturb mode: 10 PM - 7 AM',
        'Disable badge notifications',
      ],
      impact: 'Sleep onset: -20 minutes',
      color: 'text-blue-400',
    },
    {
      icon: Shield,
      tier: 'Tier 3: Protective Measures',
      solutions: [
        'Blue light filters (iOS: Night Shift, Android: Night Light)',
        'Grayscale mode after 8 PM',
        'App usage limits (iOS: Screen Time)',
      ],
      impact: 'Melatonin suppression: -60%',
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-12 py-16">
      <div className="mb-12">
        <h2 className="text-5xl font-bold text-white text-center mb-3">Solutions Framework</h2>
        <p className="text-xl text-gray-400 text-center">Tiered interventions for better sleep</p>
      </div>

      <div className="max-w-6xl w-full space-y-8">
        {solutions.map((sol, i) => {
          const Icon = sol.icon;
          return (
            <div key={i} className="p-6 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-start gap-4 mb-4">
                <Icon className={`w-8 h-8 ${sol.color} flex-shrink-0 mt-0.5`} />
                <div>
                  <p className={`font-semibold text-lg ${sol.color} mb-1`}>{sol.tier}</p>
                  <p className={`text-sm ${sol.color} opacity-75`}>{sol.impact}</p>
                </div>
              </div>

              <ul className="space-y-2">
                {sol.solutions.map((action, j) => (
                  <li key={j} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className={`w-4 h-4 ${sol.color} flex-shrink-0 mt-1`} />
                    <span className="text-sm">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-12 p-4 bg-gray-700 rounded-lg text-center">
        <p className="text-gray-400 text-sm">
          <span className="text-green-400 font-semibold">Most Effective Combo:</span> Tier 1 (phone out of room) + Tier 2 (temporal boundaries) = 50-60% improvement in sleep quality
        </p>
      </div>
    </div>
  );
};

export default Slide9_Solutions;