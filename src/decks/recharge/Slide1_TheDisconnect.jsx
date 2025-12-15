import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, Activity, BatteryWarning } from 'lucide-react';

const Slide1_TheDisconnect = () => {
  const [isResting, setIsResting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setIsResting((prev) => !prev), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center font-sans overflow-hidden p-12">
      {/* Dynamic Background Noise */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {!isResting && (
          <motion.div
            className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-500 to-transparent"
            animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
          />
        )}
      </div>

      <div className="z-10 flex flex-col items-center space-y-12">
        <motion.div 
          className="relative"
          animate={{ scale: isResting ? 1 : 1.05 }}
          transition={{ duration: 2 }}
        >
          {isResting ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="p-8 border-4 border-white/50 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.3)]"
            >
              <WifiOff size={80} className="text-white drop-shadow-lg" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 border-4 border-red-400/50 rounded-full relative"
            >
              <Wifi size={80} className="text-red-400" />
              <motion.div
                className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
              <motion.div
                className="absolute inset-0 border-2 border-red-500 rounded-full"
                animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            </motion.div>
          )}
        </motion.div>

        <div className="text-center space-y-4 max-w-2xl">
          <motion.h1 
            className="text-6xl font-bold tracking-tighter"
            animate={{ 
              color: isResting ? "#ffffff" : "#f87171",
              textShadow: isResting ? "0px 0px 20px rgba(255,255,255,0.4)" : "0px 0px 10px rgba(248,113,113,0.8)"
            }}
          >
            {isResting ? "True Disconnect" : "System Overload"}
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            How often do you <span className="font-bold border-b-2 border-white">actually</span> power down?
          </motion.p>
        </div>

        {/* Stats / Metaphor Line */}
        <div className="flex items-center space-x-12">
          <div className="flex flex-col items-center">
            <motion.div 
              animate={{ rotate: isResting ? 0 : [0, -5, 5, 0] }}
              transition={{ duration: 0.2, repeat: isResting ? 0 : Infinity }}
            >
              <Activity size={32} className={isResting ? "text-green-300" : "text-red-400"} />
            </motion.div>
            <span className="text-sm mt-2 opacity-60">Cortisol Levels</span>
          </div>
          
          <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white"
              animate={{ width: isResting ? "100%" : "20%" }}
              transition={{ duration: 1 }}
            />
          </div>

          <div className="flex flex-col items-center">
            <BatteryWarning size={32} className={isResting ? "text-white" : "text-yellow-400"} />
            <span className="text-sm mt-2 opacity-60">Mental Reserve</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide1_TheDisconnect;