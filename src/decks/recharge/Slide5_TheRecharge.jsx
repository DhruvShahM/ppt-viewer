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