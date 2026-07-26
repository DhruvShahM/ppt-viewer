import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Tag, ArrowRight } from "lucide-react";

const Slide2_WhatIs = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center text-white overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-green-400/20"
            initial={{
              x: Math.random() * 1920 - 960,
              y: Math.random() * 1080 - 540,
              opacity: 0,
            }}
            animate={{
              x: [
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
              ],
              y: [
                Math.random() * 300 - 150,
                Math.random() * 300 - 150,
                Math.random() * 300 - 150,
              ],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl px-12">
        <motion.h2
          className="text-5xl font-bold text-green-400 mb-12"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          What is Supervised Learning?
        </motion.h2>

        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <div className="flex items-start gap-6">
            <div className="p-3 rounded-full bg-green-500/20 border border-green-400/50">
              <BookOpen className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-white mb-2">Learning with Labels</h3>
              <p className="text-lg text-white/70">
                Supervised learning is a machine learning approach where the model learns from labeled training data. Each example has an input and the correct output.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="p-3 rounded-full bg-blue-500/20 border border-blue-400/50">
              <Tag className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-white mb-2">Teacher-Student Analogy</h3>
              <p className="text-lg text-white/70">
                Think of it like a teacher providing answers. The model (student) learns to map inputs to outputs by studying these labeled examples.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="p-3 rounded-full bg-purple-500/20 border border-purple-400/50">
              <ArrowRight className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-white mb-2">Goal: Prediction</h3>
              <p className="text-lg text-white/70">
                After training, the model can predict the correct output for new, unseen inputs based on patterns it learned from the labeled data.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide2_WhatIs;
