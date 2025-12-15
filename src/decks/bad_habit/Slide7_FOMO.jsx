import React from 'react';
import { Brain, Heart, AlertTriangle } from 'lucide-react';

const Slide7_FOMO = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-12 py-16">
      <div className="mb-12">
        <h2 className="text-5xl font-bold text-white text-center mb-3">Psychological Factor: FOMO</h2>
        <p className="text-xl text-gray-400 text-center">Fear of Missing Out as Sleep Sabotage</p>
      </div>

      <div className="max-w-5xl w-full space-y-8">
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
            <Heart className="w-8 h-8 text-red-400 mb-3" />
            <p className="text-white font-semibold mb-2">Anxiety Spike</p>
            <p className="text-gray-400 text-sm">Knowing phone is present triggers anticipatory anxiety</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
            <Brain className="w-8 h-8 text-purple-400 mb-3" />
            <p className="text-white font-semibold mb-2">Attention Capture</p>
            <p className="text-gray-400 text-sm">Unconscious mind monitors for notifications</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
            <AlertTriangle className="w-8 h-8 text-orange-400 mb-3" />
            <p className="text-white font-semibold mb-2">Sleep Debt</p>
            <p className="text-gray-400 text-sm">Accumulated micro-arousals prevent recovery</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-800 rounded-lg border-l-4 border-red-500">
            <p className="text-gray-400 text-sm"><span className="text-red-400 font-semibold">Pre-Sleep Anxiety:</span> Checking phone 5-10 mins before bed increases sleep onset latency by 15-45 minutes</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg border-l-4 border-amber-500">
            <p className="text-gray-400 text-sm"><span className="text-amber-400 font-semibold">Mid-Night Check:</span> 38% of users unconsciously check phone during night, disrupting REM sleep cycles</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg border-l-4 border-blue-500">
            <p className="text-gray-400 text-sm"><span className="text-blue-400 font-semibold">Morning Check:</span> Checking phone within 5 mins of waking sets cortisol baseline 20-30% higher for the day</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-purple-500 bg-opacity-10 border border-purple-500 border-opacity-30 rounded-lg">
          <p className="text-gray-300 text-sm">
            <span className="text-purple-400 font-semibold">Neurological Root:</span> Continuous partial attention creates habitual dopamine-seeking loops. Phone proximity maintains subcortical vigilance even during sleep.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Slide7_FOMO;