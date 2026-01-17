import React from 'react';
import { Zap, Brain, Eye, Heart } from 'lucide-react';

const Slide3_TheProblem = () => {
  const problems = [
    {
      icon: Zap,
      title: 'Blue Light Exposure',
      description: 'Suppresses melatonin production, delays sleep onset by 47 minutes',
      color: 'text-blue-400',
    },
    {
      icon: Brain,
      title: 'Cognitive Hyperarousal',
      description: 'Brain remains in alert state; processing stimuli constantly',
      color: 'text-purple-400',
    },
    {
      icon: Eye,
      title: 'Sleep Architecture Disruption',
      description: 'Reduces deep sleep (N3) and REM sleep phases by 20-30%',
      color: 'text-pink-400',
    },
    {
      icon: Heart,
      title: 'Stress Hormone Elevation',
      description: 'Elevated cortisol and adrenaline throughout night',
      color: 'text-red-400',
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-12 py-16">
      <div className="mb-16">
        <h2 className="text-5xl font-bold text-white text-center mb-3">The Problem</h2>
        <p className="text-xl text-gray-400 text-center">Why proximity matters</p>
      </div>

      <div className="grid grid-cols-2 gap-8 max-w-6xl">
        {problems.map((problem, i) => {
          const Icon = problem.icon;
          return (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0">
                <Icon className={`w-12 h-12 ${problem.color}`} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{problem.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{problem.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 p-6 border-l-4 border-red-500 bg-red-500 bg-opacity-5">
        <p className="text-gray-300">
          <span className="font-semibold text-red-400">Key Finding:</span> Phones within 1 meter of bed reduce sleep quality by 28% on average
        </p>
      </div>
    </div>
  );
};

export default Slide3_TheProblem;