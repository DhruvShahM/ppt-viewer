import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Bell, Loader2, BrainCircuit } from 'lucide-react';

const Slide2_TheDopamineLoop = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <h2 className="text-4xl font-bold mb-16 tracking-wide">The "Fake Rest" Loop</h2>

      <div className="relative w-[600px] h-[400px] flex items-center justify-center">
        
        {/* Central Brain/User */}
        <motion.div 
          className="z-20 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20"
          animate={{ scale: [1, 0.95, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <BrainCircuit size={64} className="text-white" />
        </motion.div>

        {/* Orbiting Distractions */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2"
            style={{ width: 300 + i * 100, height: 300 + i * 100, x: '-50%', y: '-50%' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black border border-white/30 p-3 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              {i === 0 && <Smartphone size={24} className="text-blue-400" />}
              {i === 1 && <Bell size={24} className="text-yellow-400" />}
              {i === 2 && <Loader2 size={24} className="text-purple-400 animate-spin" />}
            </div>
            
            {/* Trail effect */}
            <svg className="absolute inset-0 w-full h-full rotate-90 overflow-visible">
              <circle
                cx="50%"
                cy="50%"
                r="49%"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </svg>
          </motion.div>
        ))}

        {/* Energy Drain Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`drain-${i}`}
            className="absolute bg-red-500/50 w-2 h-2 rounded-full blur-[1px]"
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{ 
              opacity: 0,
              x: (Math.random() - 0.5) * 400,
              y: (Math.random() - 0.5) * 400,
              scale: 0
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      <div className="flex justify-between w-full max-w-2xl mt-12">
        <div className="text-center w-1/3">
          <h3 className="text-xl font-semibold text-blue-300">Stimulus</h3>
          <p className="text-sm opacity-60 mt-1">Infinite Scroll</p>
        </div>
        <div className="text-center w-1/3">
          <h3 className="text-xl font-semibold text-yellow-300">Response</h3>
          <p className="text-sm opacity-60 mt-1">Dopamine Spike</p>
        </div>
        <div className="text-center w-1/3">
          <h3 className="text-xl font-semibold text-red-300">Result</h3>
          <p className="text-sm opacity-60 mt-1">Mental Fatigue</p>
        </div>
      </div>
    </div>
  );
};

export default Slide2_TheDopamineLoop;