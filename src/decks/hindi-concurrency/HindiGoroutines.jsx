import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HindiGoroutines = () => {
  const code = `func main() {
    // Normal function call
    doWork()

    // Goroutine creation
    go doWork()

    // Anonymous function goroutine
    go func() {
        fmt.Println("Inside goroutine")
    }()
}`;

  const [displayedCode, setDisplayedCode] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  // Typewriter effect
useEffect(() => {
  let i = 0;
  const interval = setInterval(() => {
    i++;
    setDisplayedCode(code.slice(0, i));

    if (i >= code.length) clearInterval(interval);
  }, 18);

  return () => clearInterval(interval);
}, [code]);


  // Cursor blink
  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(blink);
  }, []);

  return (
    <div className="h-full flex flex-col justify-center max-w-6xl mx-auto relative overflow-hidden">

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold text-blue-400 mb-12 drop-shadow-[0_0_25px_rgba(59,130,246,0.7)]"
      >
        2. Goroutines
      </motion.h2>

      <div className="grid grid-cols-2 gap-12 items-center">

        {/* Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 p-6 rounded-xl border border-white/10"
        >
          <h3 className="text-2xl font-bold text-purple-400 mb-4">
            Goroutine क्या है?
          </h3>
          <p className="text-xl text-gray-300">
            Goroutine एक function है जो concurrently चलता है।
            यह OS thread नहीं बल्कि Go runtime का lightweight thread है।
          </p>
        </motion.div>

        {/* Code block with TYPEWRITER animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative"
        >
          <motion.pre
            className="bg-black/50 p-6 rounded-xl font-mono text-sm text-green-300 border border-emerald-400/30 shadow-[0_0_40px_rgba(16,185,129,0.25)]"
          >
            <code>
              {displayedCode}
              <span className="text-green-200">
                {cursorVisible && '▍'}
              </span>
            </code>
          </motion.pre>

          {/* Concurrent badge */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-300/60 text-[10px] tracking-[0.25em] uppercase text-emerald-200"
          >
            Concurrent · Non-Blocking
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HindiGoroutines;
