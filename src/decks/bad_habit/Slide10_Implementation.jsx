import React from 'react';
import { ArrowRight, Home, Moon, Settings } from 'lucide-react';

const Slide10_Implementation = () => {
  const days = [
    {
      phase: 'Week 1: Establish Ritual',
      color: 'from-yellow-600 to-yellow-500',
      tasks: [
        'Charge phone outside bedroom',
        'Set bedtime alarm 30 mins before sleep',
        'Enable Do Not Disturb mode at 9 PM',
      ],
    },
    {
      phase: 'Week 2-3: Optimize Environment',
      color: 'from-blue-600 to-blue-500',
      tasks: [
        'Remove phone from nightstand entirely',
        'Implement 1-hour no-screen rule',
        'Set up blue light filters',
      ],
    },
    {
      phase: 'Week 4+: Measure & Maintain',
      color: 'from-green-600 to-green-500',
      tasks: [
        'Track sleep metrics (Oura Ring, Fitbit)',
        'Monitor mood and cognitive performance',
        'Establish sustainable routine',
      ],
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-12 py-16">
      <div className="mb-12">
        <h2 className="text-5xl font-bold text-white text-center mb-3">30-Day Implementation Plan</h2>
        <p className="text-xl text-gray-400 text-center">Progressive phone-free sleep protocol</p>
      </div>

      <div className="max-w-5xl w-full space-y-6">
        {days.map((day, i) => (
          <div key={i}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`flex-1 h-12 rounded-lg bg-gradient-to-r ${day.color} flex items-center px-6`}>
                <p className="font-semibold text-white text-lg">{day.phase}</p>
              </div>
              {i < days.length - 1 && <ArrowRight className="w-6 h-6 text-gray-500" />}
            </div>

            <div className="ml-6 space-y-2">
              {day.tasks.map((task, j) => (
                <div key={j} className="flex items-start gap-3 text-gray-300 text-sm">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="p-4 bg-gray-800 rounded-lg text-center">
          <p className="text-3xl font-bold text-green-400 mb-2">+2.5 hrs</p>
          <p className="text-gray-400 text-sm">Additional deep sleep per week</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg text-center">
          <p className="text-3xl font-bold text-blue-400 mb-2">-45%</p>
          <p className="text-gray-400 text-sm">Sleep-related anxiety reduction</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg text-center">
          <p className="text-3xl font-bold text-purple-400 mb-2">+22%</p>
          <p className="text-gray-400 text-sm">Cognitive performance improvement</p>
        </div>
      </div>
    </div>
  );
};

export default Slide10_Implementation;