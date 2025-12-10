import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, ArrowDown } from 'lucide-react';

const Slide9_LeakyBucket = () => {
  const [bucket, setBucket] = useState([]);
  const [inFlight, setInFlight] = useState([]);
  const [processed, setProcessed] = useState([]);
  const CAPACITY = 5;

  useEffect(() => {
    // Bursty input: create "in‑flight" droplets that fall into the bucket
    const inputInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        const id = Date.now();
        setInFlight(prev => [...prev, { id }]);
        // After fall duration, try to add to bucket
        setTimeout(() => {
          setBucket(prev => {
            if (prev.length < CAPACITY) {
              return [...prev, id];
            }
            // dropped (overflow) – just ignore
            return prev;
          });
          // remove from in‑flight
          setInFlight(prev => prev.filter(d => d.id !== id));
        }, 600);
      }
    }, 700);

    // Constant leak
    const leakInterval = setInterval(() => {
      setBucket(prev => {
        if (prev.length === 0) return prev;
        const [first, ...rest] = prev;
        setProcessed(p => [...p, { id: first }].slice(-6));
        return rest;
      });
    }, 1400);

    return () => {
      clearInterval(inputInterval);
      clearInterval(leakInterval);
    };
  }, []);

  const waterHeight = `${(bucket.length / CAPACITY) * 100}%`;

  const bucketItemVariants = {
    hidden: { scale: 0.4, opacity: 0, y: 10 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 260, damping: 18 }
    },
    exit: {
      scale: 0.4,
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  const processedVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 200, damping: 20 }
    },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-slate-900 text-white p-8">
      <h2 className="text-4xl font-bold mb-12 text-cyan-400">
        Leaky Bucket Algorithm
      </h2>

      <div className="grid grid-cols-2 gap-12 w-full max-w-6xl">
        {/* Explanation */}
        <div className="space-y-8">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
            <h3 className="text-2xl font-semibold flex items-center gap-3">
              <Droplets className="text-cyan-400" /> Concept
            </h3>
            <ul className="space-y-3 text-lg text-gray-300">
              <li>• Bursty incoming traffic turns into discrete droplets.</li>
              <li>• Bucket has fixed capacity; overflow requests are dropped.</li>
              <li>• Leak rate is constant, giving a smooth output.</li>
              <li>• Downstream sees a steady, rate-limited flow.</li>
            </ul>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-3 text-gray-300 text-sm">
            <p>
              Top animation: random bursts of requests fall into the bucket.
            </p>
            <p>
              Bucket fills up to capacity; extra drops visually disappear at
              the rim (dropped).
            </p>
            <p>
              Bottom-right: constant-rate green droplets show processed
              requests leaving the bucket.
            </p>
          </div>
        </div>

        {/* Animation */}
        <div className="relative h-[500px] bg-slate-800/30 rounded-2xl p-8 border border-slate-700 flex flex-col items-center overflow-hidden">
          {/* Input label */}
          <div className="text-gray-400 text-sm mb-1">Bursty Input</div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
          >
            <ArrowDown size={32} className="text-gray-500" />
          </motion.div>

          {/* In‑flight droplets from top to bucket */}
          <div className="pointer-events-none absolute inset-x-0 top-16 flex justify-center">
            <div className="relative w-40 h-24">
              <AnimatePresence>
                {inFlight.map(drop => (
                  <motion.div
                    key={drop.id}
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 80, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeIn' }}
                    className="absolute left-1/2 -ml-2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Bucket */}
          <div className="relative w-40 h-48 mt-16 border-4 border-slate-500 border-t-0 rounded-b-xl overflow-hidden bg-slate-900">
            {/* Water */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-cyan-500/30 z-0"
              animate={{ height: waterHeight }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />

            {/* Requests as blocks inside bucket */}
            <div className="relative z-10 flex flex-col-reverse items-center gap-1 p-2 h-full">
              <AnimatePresence mode="sync">
                {bucket.map(id => (
                  <motion.div
                    key={id}
                    layout
                    variants={bucketItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full h-6 bg-cyan-400 rounded shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col items-center mt-6 gap-2">
            <div className="w-2 h-8 bg-cyan-500/50 rounded-full" />
            <div className="text-gray-400 text-sm">Constant Output</div>

            <div className="flex gap-2 mt-2">
              <AnimatePresence mode="sync">
                {processed.map(req => (
                  <motion.div
                    key={req.id}
                    variants={processedVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-8 h-8 rounded-full bg-green-500 text-[10px] font-bold flex items-center justify-center shadow-[0_0_10px_rgba(34,197,94,0.8)]"
                  >
                    OK
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide9_LeakyBucket;
