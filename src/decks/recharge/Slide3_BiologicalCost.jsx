import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Eye, Zap } from 'lucide-react';

const Slide3_BiologicalCost = () => {
  return (
    <div className="w-full h-full flex flex-col p-12 relative">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-5xl font-bold">Circadian Disruption</h2>
        <div className="bg-white/10 px-4 py-2 rounded-lg flex items-center gap-2">
          <Eye size={20} className="text-blue-300" />
          <span className="text-sm font-mono">RETINA_INPUT: HIGH_ENERGY</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative">
        {/* Graph Background Grid */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-4 opacity-10">
          {[...Array(72)].map((_, i) => (
            <div key={i} className="border-[0.5px] border-white" />
          ))}
        </div>

        {/* Natural Rhythm (Melatonin) */}
        <div className="absolute inset-0 flex items-center">
            <svg className="w-full h-64 overflow-visible">
                {/* Natural Curve */}
                <motion.path
                    d="M 0 300 Q 200 300, 400 100 T 800 300"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="4"
                    strokeDasharray="10 10"
                />
                
                {/* Disrupted Curve */}
                <motion.path
                    d="M 0 300 Q 200 300, 400 250 T 800 300"
                    fill="none"
                    stroke="#F87171"
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                />
            </svg>
        </div>

        {/* Screen Intervention */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-40 animate-pulse" />
            <div className="w-32 h-48 border-2 border-white/80 rounded-xl bg-black/50 flex flex-col items-center justify-center backdrop-blur-sm z-10 shadow-2xl">
               <motion.div
                 animate={{ opacity: [0.5, 1, 0.5] }}
                 transition={{ duration: 2, repeat: Infinity }}
               >
                 <Zap size={32} className="text-blue-300 mb-2" />
               </motion.div>
               <span className="text-xs font-mono text-blue-200">BLUE LIGHT</span>
            </div>
          </div>
          
          <motion.div 
            className="mt-6 flex items-center gap-4 bg-red-500/20 px-6 py-3 rounded-full border border-red-500/50"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <Moon size={20} className="text-red-300" />
            <span className="font-bold text-red-100">Melatonin Suppressed</span>
          </motion.div>
        </motion.div>

        {/* Axis Labels */}
        <div className="absolute bottom-10 w-full flex justify-between px-12 text-white/40 font-mono text-sm">
            <span>18:00</span>
            <span>22:00</span>
            <span>02:00</span>
        </div>
      </div>
    </div>
  );
};

export default Slide3_BiologicalCost;