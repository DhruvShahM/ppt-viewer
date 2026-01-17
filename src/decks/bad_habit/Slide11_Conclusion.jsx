import React from 'react';
import { Moon, Smartphone, Heart, TrendingUp } from 'lucide-react';

const Slide11_Conclusion = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-12 py-16">
      <div className="mb-16">
        <h2 className="text-5xl font-bold text-white text-center mb-6">Key Takeaways</h2>
      </div>

      <div className="max-w-4xl w-full space-y-8 mb-16">
        <div className="flex items-start gap-6 p-6 bg-gray-800 rounded-lg border border-gray-700">
          <Smartphone className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
          <div>
            <p className="text-white font-semibold mb-2">Proximity is Critical</p>
            <p className="text-gray-400">71% sleep with phones within arm's reach. Moving phone to another room is the single most effective intervention.</p>
          </div>
        </div>

        <div className="flex items-start gap-6 p-6 bg-gray-800 rounded-lg border border-gray-700">
          <Moon className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <p className="text-white font-semibold mb-2">Sleep Architecture Matters</p>
            <p className="text-gray-400">Phone exposure reduces deep sleep (N3) and REM by 20-30%. Loss of 2-3 hours quality sleep per night has cascading health effects.</p>
          </div>
        </div>

        <div className="flex items-start gap-6 p-6 bg-gray-800 rounded-lg border border-gray-700">
          <Heart className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
          <div>
            <p className="text-white font-semibold mb-2">Psychological Component</p>
            <p className="text-gray-400">FOMO and anticipatory anxiety trigger cortisol elevation even during sleep. Phone presence alone impacts sleep quality.</p>
          </div>
        </div>

        <div className="flex items-start gap-6 p-6 bg-gray-800 rounded-lg border border-gray-700">
          <TrendingUp className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
          <div>
            <p className="text-white font-semibold mb-2">Progressive Solutions Work</p>
            <p className="text-gray-400">30-day tiered approach yields 35-40% sleep quality improvement and measurable cognitive/metabolic gains.</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl w-full p-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg border border-purple-500 border-opacity-50 text-center">
        <p className="text-2xl font-bold text-white mb-3">The Question Isn't "Should You?"</p>
        <p className="text-lg text-gray-100">It's "How quickly can you move your phone out of the bedroom?"</p>
      </div>

      <div className="mt-12 text-gray-500 text-sm text-center">
        <p>Sources: Sleep Foundation 2024 • American Academy of Sleep Medicine • Nature Sleep Science • Harvard Sleep Medicine</p>
      </div>
    </div>
  );
};

export default Slide11_Conclusion;