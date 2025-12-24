import React from 'react';
import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';

const Slide3_TransformationMethods = () => {
  const transformations = [
    {
      method: 'strings.ToUpper()',
      input: 'hello',
      output: 'HELLO',
      color: 'from-blue-500',
    },
    {
      method: 'strings.ToLower()',
      input: 'HELLO',
      output: 'hello',
      color: 'from-purple-500',
    },
    {
      method: 'strings.Title()',
      input: 'hello world',
      output: 'Hello World',
      color: 'from-cyan-500',
    },
  ];

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-y-auto p-12">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage:
            'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #0ea5e9 100%)',
          backgroundSize: '200% 200%',
        }}
      />

      <motion.div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Wand2 className="w-12 h-12 text-cyan-400" />
          <h2 className="text-5xl font-bold text-white">
            स्ट्रिंग ट्रांसफॉर्मेशन
          </h2>
        </motion.div>

        {/* Transformation cards */}
        <div className="space-y-8">
          {transformations.map((trans, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.15, duration: 0.6 }}
            >
              {/* Input */}
              <motion.div
                className="flex-1 bg-slate-800/50 rounded-lg p-6 border border-slate-700"
                whileHover={{ borderColor: 'rgba(34, 211, 238, 0.5)' }}
              >
                <p className="text-xs text-slate-400 mb-2">Input</p>
                <p className="text-2xl font-mono text-white">"{trans.input}"</p>
              </motion.div>

              {/* Arrow with method */}
              <motion.div
                className="flex-shrink-0 flex flex-col items-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.15, duration: 0.6 }}
              >
                <motion.div
                  className="text-xs font-bold text-cyan-300 bg-cyan-500/20 px-3 py-1 rounded mb-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {trans.method}
                </motion.div>
                <motion.div
                  className="w-8 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Output */}
              <motion.div
                className="flex-1 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-6 border border-cyan-400/30"
                whileHover={{ borderColor: 'rgba(34, 211, 238, 1)' }}
              >
                <p className="text-xs text-cyan-400 mb-2">Output</p>
                <p className="text-2xl font-mono text-cyan-300">"{trans.output}"</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Code section */}
        <motion.div
          className="mt-12 bg-slate-900/80 rounded-lg p-6 border border-slate-700"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <pre className="text-slate-300 text-sm font-mono">
            {`package main
import (
  "fmt"
  "strings"
)

func main() {
  text := "hello world"
  fmt.Println(strings.ToUpper(text))    // HELLO WORLD
  fmt.Println(strings.ToLower(text))    // hello world
}`}
          </pre>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide3_TransformationMethods;