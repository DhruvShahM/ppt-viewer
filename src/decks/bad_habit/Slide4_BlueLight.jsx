import React from 'react';
import { Sun, Moon, Zap } from 'lucide-react';

const Slide4_BlueLight = () => {
  const wavelengths = [
    { name: 'Red Light', wavelength: '700nm', melatonin: '0%', color: 'bg-red-600' },
    { name: 'Green Light', wavelength: '550nm', melatonin: '15%', color: 'bg-green-600' },
    { name: 'Blue Light', wavelength: '470nm', melatonin: '85%', color: 'bg-blue-500' },
    { name: 'Violet Light', wavelength: '400nm', melatonin: '55%', color: 'bg-violet-600' },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-12 py-16">
      <div className="mb-12">
        <h2 className="text-5xl font-bold text-white text-center mb-3">Blue Light Mechanism</h2>
        <p className="text-xl text-gray-400 text-center">How light wavelengths affect melatonin</p>
      </div>

      <div className="max-w-5xl w-full space-y-6">
        {wavelengths.map((wave, i) => (
          <div key={i} className="flex items-center gap-6">
            <div className="w-32 flex flex-col items-start">
              <p className="font-semibold text-white">{wave.name}</p>
              <p className="text-sm text-gray-400">{wave.wavelength}</p>
            </div>

            <div className="flex-1 h-12 rounded-lg bg-gray-800 overflow-hidden flex items-center relative">
              <div
                className={`h-full ${wave.color} transition-all duration-500`}
                style={{ width: wave.melatonin }}
              ></div>
              <span className="absolute right-4 font-bold text-white">{wave.melatonin} Melatonin Suppression</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex items-start gap-3">
          <Zap className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <p className="text-white font-semibold mb-2">Blue Light Path</p>
            <p className="text-gray-300 text-sm">
              Blue light (470nm) enters eyes → stimulates intrinsically photosensitive retinal ganglion cells (ipRGCs) → suppresses melatonin production in pineal gland → delays sleep onset
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide4_BlueLight;