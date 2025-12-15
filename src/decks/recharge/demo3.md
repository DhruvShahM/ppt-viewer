## Slide1_TheDisconnect.jsx

```jsx
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
```

## Slide2_TheDopamineLoop.jsx

```jsx
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
```

## Slide3_BiologicalCost.jsx

```jsx
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
```

## Slide4_RestProtocols.jsx

```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Calendar, Coffee, PowerOff, CheckCircle2 } from 'lucide-react';

const ProtocolCard = ({ title, time, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.8)" }}
    className={`flex-1 h-96 border border-white/10 bg-gradient-to-b from-white/5 to-transparent rounded-3xl p-6 flex flex-col items-center justify-between relative overflow-hidden group`}
  >
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-${color}-500`} />
    
    <div className="w-full flex justify-between items-start z-10">
      <Icon size={32} className={`text-${color}-400`} />
      <div className="px-3 py-1 rounded-full border border-white/20 text-xs font-mono opacity-70">
        PROTOCOL_0{delay + 1}
      </div>
    </div>

    <div className="text-center z-10 space-y-4">
      <motion.div 
        className={`text-6xl font-bold text-${color}-400`}
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
      >
        {time}
      </motion.div>
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
    </div>

    <motion.div 
      className="w-full h-1 bg-white/10 rounded-full overflow-hidden"
      whileHover={{ height: 6 }}
    >
      <motion.div 
        className={`h-full bg-${color}-400`}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ delay: delay + 0.5, duration: 1.5, ease: "circOut" }}
      />
    </motion.div>
  </motion.div>
);

const Slide4_RestProtocols = () => {
  return (
    <div className="w-full h-full flex flex-col p-12">
      <div className="mb-12">
        <motion.h2 
          className="text-4xl font-bold mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          System Recovery Protocols
        </motion.h2>
        <motion.div 
          className="h-1 w-32 bg-green-400"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="flex gap-8 w-full">
        {/* Micro-Rest */}
        <ProtocolCard 
          title="The 20-20-20 Rule"
          time="20m"
          icon={Timer}
          color="blue"
          delay={0.2}
        />

        {/* Deep Rest */}
        <ProtocolCard 
          title="Digital Sunset"
          time="1h"
          icon={PowerOff}
          color="purple"
          delay={0.4}
        />

        {/* System Reset */}
        <ProtocolCard 
          title="Tech Sabbath"
          time="24h"
          icon={Calendar}
          color="green"
          delay={0.6}
        />
      </div>

      <motion.div 
        className="mt-12 flex items-center justify-center gap-3 text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <CheckCircle2 size={16} />
        <span className="text-sm font-mono tracking-widest">SELECT A PROTOCOL TO BEGIN RECOVERY</span>
      </motion.div>
    </div>
  );
};

export default Slide4_RestProtocols;
```

## Slide5_TheRecharge.jsx

```jsx
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Battery, BatteryCharging, BatteryFull, Leaf, Smartphone } from 'lucide-react';

const Slide5_TheRecharge = () => {
  const [chargeLevel, setChargeLevel] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    // Simulate charging sequence
    const charge = async () => {
      await controls.start({ height: "100%", transition: { duration: 4, ease: "linear" }});
      setChargeLevel(100);
    };
    charge();
  }, [controls]);

  return (
    <div className="w-full h-full flex flex-row items-center justify-center p-12 gap-24">
      
      {/* Visual: The Battery */}
      <div className="relative h-[400px] w-64 border-8 border-white/20 rounded-3xl p-4 flex flex-col justify-end overflow-hidden backdrop-blur-sm">
        {/* Battery Cap */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-24 h-6 bg-white/20 rounded-t-lg" />
        
        {/* Liquid Charge */}
        <motion.div 
          className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-xl relative overflow-hidden"
          initial={{ height: "10%" }}
          animate={controls}
        >
          {/* Bubbles Effect inside liquid */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/30 rounded-full"
              style={{
                width: Math.random() * 20 + 5,
                height: Math.random() * 20 + 5,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ 
                y: [400, -50],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            />
          ))}
        </motion.div>

        {/* Percentage Text */}
        <div className="absolute inset-0 flex items-center justify-center z-10 mix-blend-overlay">
          <motion.span 
            className="text-6xl font-black text-white"
          >
            <Counter from={10} to={100} duration={4} />%
          </motion.span>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="flex flex-col space-y-8 max-w-md">
        <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            <h2 className="text-4xl font-bold leading-tight">True Rest =<br/>System Reset.</h2>
        </motion.div>

        <div className="space-y-6">
            <ComparisonRow 
                icon={Smartphone} 
                label="With Screens" 
                barColor="bg-red-500" 
                width="30%" 
                delay={1}
            />
            <ComparisonRow 
                icon={Leaf} 
                label="Screen-Free" 
                barColor="bg-green-500" 
                width="100%" 
                delay={1.5}
            />
        </div>

        <motion.div 
            className="pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
        >
            <p className="text-xl text-white/80 italic">
                "Disconnect to Reconnect."
            </p>
        </motion.div>
      </div>

    </div>
  );
};

// Helper Components

const ComparisonRow = ({ icon: Icon, label, barColor, width, delay }) => (
    <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider opacity-70">
            <Icon size={16} />
            {label}
        </div>
        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
                className={`h-full ${barColor}`}
                initial={{ width: 0 }}
                animate={{ width }}
                transition={{ delay, duration: 1.5, type: "spring" }}
            />
        </div>
    </div>
);

const Counter = ({ from, to, duration }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * (to - from) + from));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return <>{count}</>;
};

export default Slide5_TheRecharge;
```