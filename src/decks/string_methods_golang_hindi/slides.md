import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  BookOpen,
  Wand2,
  Scissors,
  GitBranch,
  Link2,
  Copy,
  Search,
  Target,
  Replace,
  Code,
  Hammer,
  Zap,
  AlertCircle,
  CheckCircle,
  Star,
  Github,
} from 'lucide-react';

// ==================== SLIDE 1: TITLE CARD ====================
export const Slide1_TitleCard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden relative">
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, 40, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mb-8 flex justify-center"
          variants={floatingVariants}
          animate="animate"
        >
          <Code2 className="w-24 h-24 text-cyan-400 drop-shadow-lg" />
        </motion.div>

        <motion.h1
          className="text-7xl font-bold text-white mb-4 tracking-tight"
          variants={itemVariants}
        >
          Go में String Methods
        </motion.h1>

        <motion.p
          className="text-3xl text-cyan-300 mb-8"
          variants={itemVariants}
        >
          स्ट्रिंग मैनिपुलेशन का संपूर्ण गाइड
        </motion.p>

        <motion.p
          className="text-xl text-slate-300 max-w-2xl mx-auto mb-12"
          variants={itemVariants}
        >
          Golang के सभी शक्तिशाली string methods को सीखें और उन्हें अपने कोड में इस्तेमाल करें
        </motion.p>

        <motion.div
          className="h-1 w-40 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 mx-auto rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-10 text-cyan-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-sm mb-2">अगली स्लाइड पर जाएं</p>
      </motion.div>
    </div>
  );
};

// ==================== SLIDE 2: STRING BASICS ====================
export const Slide2_StringBasics = () => {
  const methods = [
    { name: 'len()', desc: 'स्ट्रिंग की लंबाई' },
    { name: 'Rune conversion', desc: 'Characters को Rune में बदलें' },
    { name: 'Index access', desc: 'पहली बाइट से एक्सेस करें' },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden p-12">
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        animate={{ scale: [1, 1.2, 1], rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div className="relative z-10 w-full max-w-4xl">
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BookOpen className="w-12 h-12 text-cyan-400" />
          <h2 className="text-5xl font-bold text-white">String के मूल सिद्धांत</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {methods.map((method, idx) => (
            <motion.div
              key={idx}
              className="p-6 rounded-xl bg-slate-800/50 border border-cyan-500/30 hover:border-cyan-400 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)' }}
            >
              <h3 className="text-xl font-bold text-cyan-300 mb-2">{method.name}</h3>
              <p className="text-slate-300">{method.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-slate-900/80 rounded-xl p-8 border border-slate-700"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-6 h-6 text-cyan-400" />
            <span className="text-cyan-300 font-mono text-sm">go_string_basics.go</span>
          </div>
          <pre className="text-slate-300 text-sm font-mono overflow-x-auto">
{`str := "नमस्ते"
length := len(str)           // 15 bytes (UTF-8)
runes := []rune(str)          // ['न', 'म', 'स', '्', 'त', 'े']
charCount := len(runes)       // 6 characters
firstByte := str[0]           // 226 (first byte) - FIXED`}
          </pre>
        </motion.div>

        <motion.p
          className="text-slate-400 text-sm mt-8 italic"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ⚠️ Go में strings UTF-8 encoded हैं, इसलिए len() bytes गिनता है, characters नहीं
        </motion.p>
      </motion.div>
    </div>
  );
};

// ==================== SLIDE 3: TRANSFORMATION METHODS ====================
export const Slide3_TransformationMethods = () => {
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
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden p-12">
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

        <div className="space-y-8">
          {transformations.map((trans, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.15, duration: 0.6 }}
            >
              <motion.div
                className="flex-1 bg-slate-800/50 rounded-lg p-6 border border-slate-700"
                whileHover={{ borderColor: 'rgba(34, 211, 238, 0.5)' }}
              >
                <p className="text-xs text-slate-400 mb-2">Input</p>
                <p className="text-2xl font-mono text-white">"{trans.input}"</p>
              </motion.div>

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

// ==================== SLIDE 4: TRIM METHODS ====================
export const Slide4_TrimMethods = () => {
  const trimExamples = [
    { method: 'TrimSpace()', before: '  hello  ', after: 'hello' },
    { method: 'TrimPrefix()', before: 'prefixHello', after: 'Hello' },
    { method: 'TrimSuffix()', before: 'HelloSuffix', after: 'Hello' },
    { method: 'TrimLeft()', before: '###hello', after: 'hello' },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden p-12">
      <motion.div
        className="absolute top-20 right-20 text-9xl opacity-5"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <Scissors />
      </motion.div>

      <motion.div className="relative z-10 w-full max-w-5xl">
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Scissors className="w-12 h-12 text-orange-400" />
          <h2 className="text-5xl font-bold text-white">Trim Methods - काटना</h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          {trimExamples.map((example, idx) => (
            <motion.div
              key={idx}
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
            >
              <motion.div
                className="bg-slate-800/50 rounded-lg p-6 border border-orange-500/30"
                whileHover={{
                  borderColor: 'rgba(234, 179, 8, 0.6)',
                  boxShadow: '0 0 20px rgba(234, 179, 8, 0.2)',
                }}
              >
                <h3 className="text-lg font-bold text-orange-300 mb-4">
                  {example.method}
                </h3>

                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                  >
                    <p className="text-xs text-slate-400 mb-1">पहले (Before):</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-white font-mono bg-red-500/10 px-3 py-2 rounded text-sm">
                        "{example.before}"
                      </code>
                      <motion.span
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ✂️
                      </motion.span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex justify-center"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    <div className="text-orange-400 text-xl">↓</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                  >
                    <p className="text-xs text-slate-400 mb-1">बाद में (After):</p>
                    <code className="block text-orange-300 font-mono bg-green-500/10 px-3 py-2 rounded text-sm">
                      "{example.after}"
                    </code>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 bg-slate-900/80 rounded-lg p-6 border border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <pre className="text-slate-300 text-sm font-mono overflow-x-auto">
{`str := "  hello world  "
result := strings.TrimSpace(str)         // "hello world"

str = "prefixHello"
result = strings.TrimPrefix(str, "prefix") // "Hello"`}
          </pre>
        </motion.div>
      </motion.div>
    </div>
  );
};

// ==================== SLIDE 5: SPLIT METHODS ====================
export const Slide5_SplitMethods = () => {
  const [activeExample, setActiveExample] = useState(0);

  const splitExamples = [
    {
      title: 'Split()',
      code: 'strings.Split("a,b,c", ",")',
      result: ['a', 'b', 'c'],
      color: 'cyan',
    },
    {
      title: 'Fields()',
      code: 'strings.Fields("hello world go")',
      result: ['hello', 'world', 'go'],
      color: 'blue',
    },
    {
      title: 'SplitN()',
      code: 'strings.SplitN("a,b,c", ",", 2)',
      result: ['a', 'b,c'],
      color: 'purple',
    },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden p-12">
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <GitBranch className="w-full h-full text-cyan-400" />
      </motion.div>

      <motion.div className="relative z-10 w-full max-w-5xl">
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GitBranch className="w-12 h-12 text-cyan-400" />
          <h2 className="text-5xl font-bold text-white">
            Split Methods - विभाजित करना
          </h2>
        </motion.div>

        <div className="flex gap-4 mb-8">
          {splitExamples.map((example, idx) => (
            <motion.button
              key={idx}
              onClick={() => setActiveExample(idx)}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                activeExample === idx
                  ? `bg-${example.color}-500/30 border-${example.color}-400 border-2 text-${example.color}-300`
                  : 'bg-slate-800/50 border border-slate-700 text-slate-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {example.title}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeExample}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <motion.div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700">
              <p className="text-sm text-slate-400 mb-4">String को कैसे विभाजित करें:</p>
              <div className="bg-slate-900/50 rounded p-4 font-mono text-slate-300 text-lg">
                {splitExamples[activeExample].code}
              </div>
            </motion.div>

            <motion.div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {splitExamples[activeExample].result.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.15 }}
                    className={`p-6 rounded-lg border-2 border-${splitExamples[activeExample].color}-400/50 bg-${splitExamples[activeExample].color}-500/10`}
                  >
                    <motion.p
                      className={`text-center font-mono text-lg text-${splitExamples[activeExample].color}-300 font-bold`}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    >
                      "{item}"
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-6 border border-cyan-400/30">
              <p className="text-sm text-slate-400 mb-2">परिणाम (Result):</p>
              <code className="text-cyan-300 font-mono text-lg">
                {JSON.stringify(splitExamples[activeExample].result)}
              </code>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-12 bg-slate-900/80 rounded-lg p-6 border border-slate-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <pre className="text-slate-300 text-sm font-mono overflow-x-auto">
{`str := "apple,banana,orange"
result := strings.Split(str, ",")
// result = ["apple", "banana", "orange"]`}
          </pre>
        </motion.div>
      </motion.div>
    </div>
  );
};

// ==================== SLIDE 6: JOIN AND REPEAT ====================
export const Slide6_JoinAndRepeat = () => {
  const joinExample = ['hello', 'world', 'go'];
  const repeatExample = 'OK';

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden p-12">
      <motion.div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      <motion.div className="relative z-10 w-full max-w-5xl">
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link2 className="w-12 h-12 text-blue-400" />
          <h2 className="text-5xl font-bold text-white">
            Join & Repeat - जोड़ना और दोहराना
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-cyan-300 mb-6 flex items-center gap-2">
              <Link2 className="w-8 h-8" />
              Join()
            </h3>

            <div className="space-y-3 mb-6">
              {joinExample.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  <motion.div
                    className="px-4 py-2 bg-cyan-500/20 border border-cyan-400 rounded font-mono text-cyan-300"
                    whileHover={{ scale: 1.1, boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)' }}
                  >
                    "{item}"
                  </motion.div>
                  {idx < joinExample.length - 1 && (
                    <motion.div
                      className="mx-3 text-cyan-400"
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      +
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex justify-center mb-6"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-cyan-400 text-2xl">↓</div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg p-6 border border-cyan-400/50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-sm text-slate-400 mb-2">परिणाम:</p>
              <code className="text-cyan-300 font-mono text-lg">
                "hello world go"
              </code>
            </motion.div>

            <motion.div
              className="mt-6 bg-slate-900/80 rounded p-4 border border-slate-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <pre className="text-slate-300 text-xs font-mono">
{`arr := []string{"hello", "world", "go"}
result := strings.Join(arr, " ")
// "hello world go"`}
              </pre>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-purple-300 mb-6 flex items-center gap-2">
              <Copy className="w-8 h-8" />
              Repeat()
            </h3>

            <div className="space-y-4">
              {[1, 2, 3].map((count, idx) => (
                <motion.div
                  key={idx}
                  className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.15 }}
                  whileHover={{ borderColor: 'rgba(168, 85, 247, 0.6)' }}
                >
                  <p className="text-xs text-slate-400 mb-2">
                    Repeat({count}x):
                  </p>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.3,
                    }}
                  >
                    {[...Array(count)].map((_, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-purple-500/20 border border-purple-400 rounded font-mono text-purple-300"
                      >
                        {repeatExample}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-6 bg-slate-900/80 rounded p-4 border border-slate-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <pre className="text-slate-300 text-xs font-mono">
{`result := strings.Repeat("OK", 3)
// "OKOKOK"`}
              </pre>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// ==================== SLIDE 7: CONTAINS AND INDEX (FIXED VERSION) ====================
export const Slide7_ContainsAndIndex = () => {
  const fullString = 'Hello World Go Programming';
  const containsExamples = [
    { method: 'Contains()', search: 'World', found: true },
    { method: 'ContainsAny()', search: 'xyz', found: false },
    { method: 'HasPrefix()', search: 'Hello', found: true },
    { method: 'HasSuffix()', search: 'ming', found: true },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Search className="w-full h-full text-cyan-400" />
      </motion.div>

      <div className="relative z-10 flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <motion.div
            className="sticky top-0 bg-gradient-to-b from-slate-900 via-slate-900 to-transparent pt-4 pb-6 z-20"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Search className="w-10 h-10 text-cyan-400 flex-shrink-0" />
              <div>
                <h2 className="text-4xl font-bold text-white leading-tight">
                  Contains & Index Methods
                </h2>
                <p className="text-cyan-300 text-sm mt-1">
                  स्ट्रिंग में खोज करना और स्थिति खोजना
                </p>
              </div>
            </div>
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </motion.div>

          <motion.div
            className="bg-slate-800/50 rounded-lg p-6 border border-cyan-400/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm text-cyan-400 uppercase tracking-wider font-semibold mb-4">
              🔍 मुख्य String:
            </p>
            <motion.div
              className="flex flex-wrap gap-2 font-mono text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {fullString.split('').map((char, idx) => (
                <motion.span
                  key={idx}
                  className="px-2 py-1 bg-cyan-500/15 border border-cyan-400/40 rounded text-cyan-300 hover:bg-cyan-500/30 transition-all"
                  whileHover={{ scale: 1.15 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-cyan-300">
              Contains Methods - खोज करें:
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {containsExamples.map((example, idx) => (
                <motion.div
                  key={idx}
                  className={`rounded-lg p-6 border transition-all ${
                    example.found
                      ? 'bg-green-500/10 border-green-400/50'
                      : 'bg-red-500/10 border-red-400/50'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <h3 className="text-lg font-bold text-cyan-300 mb-3">
                    {example.method}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">खोजें:</p>
                      <code className="font-mono text-cyan-200 bg-slate-900/50 px-3 py-2 rounded block text-sm">
                        "{example.search}"
                      </code>
                    </div>
                    <motion.div
                      className="flex items-center gap-2 pt-2"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${
                          example.found ? 'bg-green-400' : 'bg-red-400'
                        }`}
                      />
                      <span
                        className={`text-sm font-bold ${
                          example.found ? 'text-green-300' : 'text-red-300'
                        }`}
                      >
                        {example.found ? 'मिला ✓' : 'नहीं मिला ✗'}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-8 border border-purple-400/30"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Index Methods - स्थिति खोजें:
            </h3>
            <div className="grid grid-cols-3 gap-6">
              {[
                { method: 'Index("o")', result: '4' },
                { method: 'LastIndex("o")', result: '19' },
                { method: "IndexRune('d')", result: '10' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-slate-800/50 rounded p-4 border border-slate-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  whileHover={{ borderColor: 'rgba(168, 85, 247, 0.6)' }}
                >
                  <p className="text-xs text-slate-400 mb-2 font-mono">{item.method}</p>
                  <motion.p
                    className="text-2xl font-bold text-purple-300"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  >
                    Position: {item.result}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-slate-900/80 rounded-lg p-6 border border-slate-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-xs text-cyan-400 uppercase tracking-wider font-semibold mb-3">
              Go Code Example:
            </p>
            <pre className="text-slate-300 text-sm font-mono overflow-x-auto">
{`str := "Hello World Go"
contains := strings.Contains(str, "World")     // true
hasPrefix := strings.HasPrefix(str, "Hello")   // true
index := strings.Index(str, "o")               // 4`}
            </pre>
          </motion.div>

          <div className="h-8" />
        </div>
      </div>
    </div>
  );
};

// ==================== SLIDE 8: REPLACE AND MAP ====================
export const Slide8_ReplaceAndMap = () => {
  const [activeExample, setActiveExample] = useState(0);

  const replaceExamples = [
    {
      method: 'Replace()',
      before: 'hello hello hello',
      search: 'hello',
      replace: 'hi',
      after: 'hi hello hello',
      desc: 'पहली occurrence को बदलें (limit = 1)',
    },
    {
      method: 'ReplaceAll()',
      before: 'apple, apple, apple',
      search: 'apple',
      replace: 'orange',
      after: 'orange, orange, orange',
      desc: 'सभी occurrences को बदलें (limit = -1)',
    },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center overflow-hidden p-8">
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <Replace className="w-full h-full text-pink-400" />
      </motion.div>

      <motion.div className="relative z-10 w-full max-w-6xl h-full flex flex-col">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <Replace className="w-10 h-10 text-pink-400 flex-shrink-0" />
            <div>
              <h2 className="text-4xl font-bold text-white leading-tight">
                Replace & Map Methods
              </h2>
              <p className="text-pink-300 text-sm mt-1">
                स्ट्रिंग में replacements और character transformations
              </p>
            </div>
          </div>
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mt-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
        </motion.div>

        <div className="flex gap-4 mb-8">
          {replaceExamples.map((example, idx) => (
            <motion.button
              key={idx}
              onClick={() => setActiveExample(idx)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                activeExample === idx
                  ? 'bg-pink-500/30 border-2 border-pink-400 text-pink-300'
                  : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:border-pink-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {example.method}
            </motion.button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto space-y-6 pb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExample}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <motion.div
                className="text-slate-300 text-sm italic bg-slate-800/30 border-l-4 border-pink-400 pl-4 py-3 rounded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {replaceExamples[activeExample].desc}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                  Input String
                </p>
                <motion.div
                  className="font-mono text-white bg-slate-800 p-4 rounded-lg border border-slate-700 text-lg"
                  whileHover={{ borderColor: 'rgba(244, 63, 94, 0.5)' }}
                >
                  "{replaceExamples[activeExample].before}"
                </motion.div>
              </motion.div>

              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xs text-red-400 uppercase tracking-wider mb-2 font-semibold">
                    🔍 खोजें
                  </p>
                  <motion.div
                    className="font-mono text-red-300 bg-red-500/15 p-4 rounded-lg border-2 border-red-400/40 text-lg font-bold"
                    animate={{
                      boxShadow: [
                        '0 0 0 rgba(239, 68, 68, 0)',
                        '0 0 15px rgba(239, 68, 68, 0.3)',
                        '0 0 0 rgba(239, 68, 68, 0)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    "{replaceExamples[activeExample].search}"
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xs text-green-400 uppercase tracking-wider mb-2 font-semibold">
                    ✨ से बदलें
                  </p>
                  <motion.div
                    className="font-mono text-green-300 bg-green-500/15 p-4 rounded-lg border-2 border-green-400/40 text-lg font-bold"
                    animate={{
                      boxShadow: [
                        '0 0 0 rgba(34, 197, 94, 0)',
                        '0 0 15px rgba(34, 197, 94, 0.3)',
                        '0 0 0 rgba(34, 197, 94, 0)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  >
                    "{replaceExamples[activeExample].replace}"
                  </motion.div>
                </motion.div>
              </div>

              <motion.div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, 8, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-pink-400 text-4xl"
                >
                  ↓
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-xs text-cyan-400 uppercase tracking-wider mb-2 font-semibold">
                  📤 Output String
                </p>
                <motion.div
                  className="font-mono text-cyan-300 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 p-4 rounded-lg border-2 border-cyan-400/40 text-lg font-bold"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  "{replaceExamples[activeExample].after}"
                </motion.div>
              </motion.div>

              <motion.div
                className="bg-slate-900/80 rounded-lg p-6 border border-slate-700 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-300 font-semibold text-sm">Go Code Example</span>
                </div>
                <pre className="text-slate-300 text-sm font-mono overflow-x-auto">
{`${activeExample === 0 ? `result := strings.Replace("hello hello", "hello", "hi", 1)\n// "hi hello" (पहली occurrence ही बदली)` : `result := strings.ReplaceAll("apple, apple, apple", "apple", "orange")\n// "orange, orange, orange" (सभी occurrences बदलीं)`}`}
                </pre>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-lg p-6 border border-purple-400/40 mt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🔄</span>
                  Map() - हर character को बदलें
                </h3>

                <motion.div className="bg-slate-800/50 rounded p-4 border border-slate-700">
                  <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider">
                    Uppercase Conversion Example:
                  </p>
                  <pre className="text-slate-300 text-xs font-mono overflow-x-auto">
{`upper := strings.Map(func(r rune) rune {
  return unicode.ToUpper(r)
}, "hello world")
// Result: "HELLO WORLD"`}
                  </pre>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

// ==================== SLIDE 9: STRINGBUILDER (FIXED VERSION) ====================
export const Slide9_StringBuilder = () => {
  const [builderSteps, setBuilderSteps] = useState(5);

  const steps = [
    { step: 1, action: 'WriteString("Hello")', result: '"Hello"' },
    { step: 2, action: 'WriteString(" ")', result: '"Hello "' },
    { step: 3, action: 'WriteString("World")', result: '"Hello World"' },
    { step: 4, action: 'WriteByte(\'!\')', result: '"Hello World!"' },
    { step: 5, action: 'String()', result: '"Hello World!"' },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        <Hammer className="w-full h-full text-yellow-400" />
      </motion.div>

      <div className="relative z-10 flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <motion.div
            className="sticky top-0 bg-gradient-to-b from-slate-900 via-slate-900 to-transparent pt-4 pb-6 z-20"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Hammer className="w-10 h-10 text-yellow-400 flex-shrink-0" />
              <div>
                <h2 className="text-4xl font-bold text-white leading-tight">
                  StringBuilder Pattern
                </h2>
                <p className="text-yellow-300 text-sm mt-1">
                  बेहतर और तेज़ String निर्माण
                </p>
              </div>
            </div>
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="bg-red-500/10 border border-red-400/30 rounded-lg p-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ borderColor: 'rgba(239, 68, 68, 0.5)' }}
            >
              <h3 className="text-lg font-bold text-red-300 mb-4">❌ Slow Way</h3>
              <pre className="text-slate-300 text-xs font-mono overflow-x-auto">
{`str := ""
for i := 0; i < 1000; i++ {
  str += "a"
}
// 1000 नई strings बनती हैं`}
              </pre>
            </motion.div>

            <motion.div
              className="bg-green-500/10 border border-green-400/30 rounded-lg p-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ borderColor: 'rgba(34, 197, 94, 0.5)' }}
            >
              <h3 className="text-lg font-bold text-green-300 mb-4">✅ Fast Way</h3>
              <pre className="text-slate-300 text-xs font-mono overflow-x-auto">
{`var sb strings.Builder
for i := 0; i < 1000; i++ {
  sb.WriteString("a")
}
result := sb.String()`}
              </pre>
            </motion.div>
          </motion.div>

          <motion.div className="space-y-4">
            <h3 className="text-2xl font-bold text-cyan-300">
              StringBuilder के साथ String बनाएं:
            </h3>

            <div className="space-y-3">
              {steps.slice(0, builderSteps).map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.12 }}
                >
                  <motion.div
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center font-bold text-white text-sm"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ delay: 0.5 + idx * 0.12, duration: 0.8 }}
                  >
                    {item.step}
                  </motion.div>

                  <motion.div
                    className="flex-1 bg-slate-800/50 rounded p-3 border border-slate-700 font-mono text-cyan-300 text-sm"
                    whileHover={{ borderColor: 'rgba(34, 211, 238, 0.6)' }}
                  >
                    {item.action}
                  </motion.div>

                  <motion.div
                    className="flex-1 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded p-3 border border-cyan-400/30 font-mono text-cyan-300 text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.55 + idx * 0.12 }}
                  >
                    {item.result}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <motion.div className="flex justify-center gap-2 mt-6">
              {steps.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setBuilderSteps(idx + 1)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx < builderSteps ? 'bg-cyan-400' : 'bg-slate-600'
                  }`}
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-8 border border-yellow-400/30"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center gap-2">
              <Code className="w-6 h-6" />
              StringBuilder के मुख्य Methods:
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {[
                { method: 'WriteString()', desc: 'String जोड़ें' },
                { method: 'WriteByte()', desc: 'Single byte जोड़ें' },
                { method: 'WriteRune()', desc: 'Single rune जोड़ें' },
                { method: 'String()', desc: 'Final string प्राप्त करें' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-slate-800/50 rounded p-4 border border-slate-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                  whileHover={{ borderColor: 'rgba(234, 179, 8, 0.5)' }}
                >
                  <p className="font-bold text-yellow-300 mb-1">{item.method}</p>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-slate-900/80 rounded-lg p-6 border border-slate-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <p className="text-xs text-cyan-400 uppercase tracking-wider font-semibold mb-3">
              Complete Example:
            </p>
            <pre className="text-slate-300 text-sm font-mono overflow-x-auto">
{`var builder strings.Builder
builder.WriteString("Hello")
builder.WriteString(" ")
builder.WriteString("World")
builder.WriteByte('!')

result := builder.String()
// result = "Hello World!"`}
            </pre>
          </motion.div>

          <div className="h-8" />
        </div>
      </div>
    </div>
  );
};

// ==================== SLIDE 10: ADVANCED METHODS (FIXED VERSION) ====================
export const Slide10_AdvancedMethods = () => {
  const advancedMethods = [
    {
      name: 'FieldsFunc()',
      desc: 'Custom function के साथ split करें',
      example: 'strings.FieldsFunc("a1b2c3", unicode.IsDigit)',
    },
    {
      name: 'TrimLeftFunc()',
      desc: 'Left side से custom characters हटाएं',
      example: 'strings.TrimLeftFunc("   hello", unicode.IsSpace)',
    },
    {
      name: 'Cut()',
      desc: 'String को separator से दो भागों में बांटें',
      example: 'before, after, found := strings.Cut("a-b", "-")',
    },
    {
      name: 'Count()',
      desc: 'Non-overlapping occurrences गिनें',
      example: 'count := strings.Count("aaa", "aa")',
    },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Zap className="w-full h-full text-yellow-400" />
      </motion.div>

      <div className="relative z-10 flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <motion.div
            className="sticky top-0 bg-gradient-to-b from-slate-900 via-slate-900 to-transparent pt-4 pb-6 z-20"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Zap className="w-10 h-10 text-yellow-400 flex-shrink-0" />
              <div>
                <h2 className="text-4xl font-bold text-white leading-tight">
                  Advanced Methods
                </h2>
                <p className="text-yellow-300 text-sm mt-1">
                  उन्नत और शक्तिशाली string manipulation तरीके
                </p>
              </div>
            </div>
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-purple-500 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </motion.div>

          <div className="space-y-6">
            {advancedMethods.map((method, idx) => (
              <motion.div
                key={idx}
                className="group relative overflow-hidden rounded-lg"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.12 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent"
                  animate={{ x: [-100, 100, -100] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <div className="relative bg-slate-800/50 border border-yellow-400/30 rounded-lg p-6 hover:border-yellow-400 transition-all">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + idx * 0.12 }}
                    >
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                        Method
                      </p>
                      <h3 className="text-2xl font-bold text-yellow-300">
                        {method.name}
                      </h3>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 + idx * 0.12 }}
                    >
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                        विवरण
                      </p>
                      <p className="text-slate-300 text-sm">{method.desc}</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + idx * 0.12 }}
                    >
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                        उदाहरण
                      </p>
                      <code className="text-xs bg-slate-900/50 text-cyan-300 p-2 rounded block border border-slate-700 overflow-x-auto">
                        {method.example}
                      </code>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-gradient-to-r from-purple-500/10 to-yellow-500/10 rounded-lg p-8 border border-purple-400/30"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-2">
              <Code className="w-6 h-6" />
              विस्तृत उदाहरण (Detailed Examples):
            </h3>

            <motion.div
              className="bg-slate-900/80 rounded p-6 border border-slate-700"
              whileHover={{ borderColor: 'rgba(168, 85, 247, 0.5)' }}
            >
              <pre className="text-slate-300 text-sm font-mono overflow-x-auto">
{`// FieldsFunc - custom separator
words := strings.FieldsFunc("a1b2c3", func(r rune) bool {
  return unicode.IsDigit(r)
})
// Result: ["a", "b", "c"]

// Cut - string को divide करें
before, after, found := strings.Cut("name=John", "=")
// before: "name", after: "John", found: true

// Count - occurrences गिनें
count := strings.Count("aaaa", "aa")
// Result: 2 (non-overlapping)`}
              </pre>
            </motion.div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-6 border border-cyan-400/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
          >
            <h3 className="text-lg font-bold text-cyan-300 mb-4">
              ⚡ महत्वपूर्ण बातें:
            </h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>✓ FieldsFunc() कस्टम separator के लिए बेहतरीन है</li>
              <li>✓ Cut() string को 2 भागों में divide करता है</li>
              <li>✓ Count() non-overlapping occurrences गिनता है</li>
              <li>✓ TrimLeftFunc() predicate-based trimming के लिए है</li>
            </ul>
          </motion.div>

          <div className="h-8" />
        </div>
      </div>
    </div>
  );
};

// ==================== SLIDE 11: PERFORMANCE TIPS ====================
export const Slide11_PerformanceTips = () => {
  const [selectedTip, setSelectedTip] = useState(0);

  const tips = [
    {
      title: 'StringBuilder का उपयोग करें',
      problem: 'बार-बार += से strings बनाने से inefficient है',
      solution: 'StringBuilder में WriteString() का उपयोग करें',
      impact: '10x तेज़',
    },
    {
      title: 'सही method चुनें',
      problem: 'Contains() हर बार full scan करता है',
      solution: 'Index() या Contains() select करें based on use case',
      impact: '5x तेज़',
    },
    {
      title: 'Batch replacements',
      problem: 'कई Replace() calls inefficient हैं',
      solution: 'NewReplacer() का उपयोग करें',
      impact: '3x तेज़',
    },
    {
      title: 'Regex से बचें',
      problem: 'Simple cases में regex overhead होता है',
      solution: 'strings package functions का उपयोग करें',
      impact: '20x तेज़',
    },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden p-12">
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Zap className="w-full h-full text-yellow-400" />
      </motion.div>

      <motion.div className="relative z-10 w-full max-w-5xl">
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Zap className="w-12 h-12 text-yellow-400" />
          <h2 className="text-5xl font-bold text-white">
            Performance Tips - प्रदर्शन सुधारें
          </h2>
        </motion.div>

        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {tips.map((tip, idx) => (
            <motion.button
              key={idx}
              onClick={() => setSelectedTip(idx)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                selectedTip === idx
                  ? 'bg-yellow-500/30 border-2 border-yellow-400 text-yellow-300'
                  : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {idx + 1}. {tip.title.split(' ')[0]}
            </motion.button>
          ))}
        </div>

        <motion.div
          key={selectedTip}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <motion.h3
            className="text-3xl font-bold text-yellow-300"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {tips[selectedTip].title}
          </motion.h3>

          <motion.div
            className="bg-red-500/10 border-l-4 border-red-400 rounded p-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-red-300 mb-2">समस्या:</p>
                <p className="text-slate-300">{tips[selectedTip].problem}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-green-500/10 border-l-4 border-green-400 rounded p-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-green-300 mb-2">समाधान:</p>
                <p className="text-slate-300">{tips[selectedTip].solution}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded p-6 border border-cyan-400/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
          >
            <p className="text-sm text-slate-400 mb-2">प्रभाव:</p>
            <motion.p
              className="text-4xl font-bold text-cyan-300"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {tips[selectedTip].impact}
            </motion.p>
          </motion.div>

          <motion.div
            className="bg-slate-900/80 rounded-lg p-6 border border-slate-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <pre className="text-slate-300 text-sm font-mono overflow-x-auto">
{`// ❌ Slow
result := ""
for _, word := range words {
  result += word + " "
}

// ✅ Fast
var builder strings.Builder
for _, word := range words {
  builder.WriteString(word)
  builder.WriteString(" ")
}
result := builder.String()`}
            </pre>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// ==================== SLIDE 12: SUMMARY AND RESOURCES ====================
export const Slide12_SummaryAndResources = () => {
  const categories = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Transformation',
      methods: ['ToUpper', 'ToLower', 'Title'],
      color: 'cyan',
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Searching',
      methods: ['Contains', 'HasPrefix', 'Index'],
      color: 'blue',
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Splitting',
      methods: ['Split', 'Fields', 'SplitN'],
      color: 'purple',
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Joining',
      methods: ['Join', 'Repeat', 'Replace'],
      color: 'pink',
    },
  ];

  const keyTakeaways = [
    'Go strings UTF-8 encoded हैं',
    'StringBuilder बड़े strings के लिए बेहतर है',
    'सही method चुनने से performance में सुधार होता है',
    'strings.NewReplacer() batch replacements के लिए use करें',
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden p-12">
      <motion.div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      <motion.div className="relative z-10 w-full max-w-5xl">
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Star className="w-12 h-12 text-cyan-400" />
          <h2 className="text-5xl font-bold text-white">
            सारांश और संसाधन
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 mb-12">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-cyan-400/50 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`text-${cat.color}-400 mb-3`}>{cat.icon}</div>
              <h3 className={`text-xl font-bold text-${cat.color}-300 mb-3`}>
                {cat.title}
              </h3>
              <div className="space-y-2">
                {cat.methods.map((method, i) => (
                  <motion.p
                    key={i}
                    className="text-sm text-slate-300 flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 + i * 0.05 }}
                  >
                    <span className={`text-${cat.color}-400`}>•</span>
                    {method}()
                  </motion.p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-8 border border-cyan-400/30 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-2xl font-bold text-cyan-300 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            मुख्य बातें याद रखें:
          </h3>

          <div className="space-y-3">
            {keyTakeaways.map((takeaway, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
              >
                <motion.span
                  className="text-cyan-400 text-xl flex-shrink-0"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: idx * 0.2,
                  }}
                >
                  ✓
                </motion.span>
                <p className="text-slate-300">{takeaway}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.a
            href="https://pkg.go.dev/strings"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-400 transition-all group"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Github className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-cyan-300 font-bold">Official Docs</span>
            </div>
            <p className="text-sm text-slate-400">
              pkg.go.dev/strings पर जाएं
            </p>
          </motion.a>

          <motion.div
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-lg p-6"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Code2 className="w-6 h-6 text-purple-400" />
              <span className="text-purple-300 font-bold">Practice करें</span>
            </div>
            <p className="text-sm text-slate-400">
              LeetCode या HackerRank पर strings problems solve करें
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.h3
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            धन्यवाद! 🙏
          </motion.h3>
          <p className="text-slate-400">
            Go में String Methods को master करने के लिए सफर पूरा हुआ!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
