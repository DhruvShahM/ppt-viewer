import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Lightbulb, Target } from "lucide-react";

const Slide7_Summary = () => {
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
          Key Takeaways
        </motion.h2>

        <div className="space-y-6">
          <motion.div
            className="flex items-start gap-6 p-6 rounded-xl border border-blue-400/30 bg-blue-500/10"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <div className="p-3 rounded-full bg-blue-500/30 border border-blue-400">
              <CheckCircle className="w-6 h-6 text-blue-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-blue-400 mb-2">Labeled Data is Essential</h3>
              <p className="text-white/70">
                Supervised learning requires labeled examples with inputs and correct outputs to train effectively
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start gap-6 p-6 rounded-xl border border-purple-400/30 bg-purple-500/10"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          >
            <div className="p-3 rounded-full bg-purple-500/30 border border-purple-400">
              <Target className="w-6 h-6 text-purple-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-purple-400 mb-2">Two Main Types</h3>
              <p className="text-white/70">
                Classification predicts categories (spam/not spam), Regression predicts numbers (house prices)
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start gap-6 p-6 rounded-xl border border-green-400/30 bg-green-500/10"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          >
            <div className="p-3 rounded-full bg-green-500/30 border border-green-400">
              <Lightbulb className="w-6 h-6 text-green-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-green-400 mb-2">Widely Used</h3>
              <p className="text-white/70">
                Powers spam filters, recommendation systems, fraud detection, medical diagnosis, and more
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 p-8 rounded-2xl border border-yellow-400/30 bg-yellow-500/10 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
        >
          <p className="text-2xl text-white/90">
            <span className="font-semibold text-yellow-400">Remember:</span> Quality labeled data = Better predictions
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide7_Summary;
