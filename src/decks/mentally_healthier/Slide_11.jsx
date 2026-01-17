// Slide_11.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Hand, Lightbulb, Share2 } from 'lucide-react';

const Slide11_YourRole = () => {
  const actions = [
    {
      icon: Hand,
      title: "Advocate",
      subtitle: "Break the stigma around mental health",
      detail: "Normalize conversations, share your story, ask for help"
    },
    {
      icon: Zap,
      title: "Optimize",
      subtitle: "Use tools that exist today",
      detail: "Apps, teletherapy, communities—leverage them"
    },
    {
      icon: Lightbulb,
      title: "Innovate",
      subtitle: "Build the future of mental healthcare",
      detail: "Code, research, design—contribute your skills"
    },
    {
      icon: Share2,
      title: "Connect",
      subtitle: "Help others find resources & support",
      detail: "Be the bridge between people and help"
    }
  ];

  return (
    <div className="w-full h-screen flex items-center justify-center p-12 relative overflow-hidden">
      {/* Background animated elements (optional – remove if you want zero background visuals) */}
      {/* <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{ x: [-100, 100], y: [-100, 100] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      /> */}

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.h2
          className="text-5xl font-bold text-white mb-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your Role in This Future
        </motion.h2>

        <motion.div
          className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-12"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <div className="grid grid-cols-2 gap-8 mb-12">
          {actions.map((action, i) => {
            const Icon = action.icon;

            return (
              <motion.div
                key={i}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-slate-600 transition-all group relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, borderColor: "rgba(148, 163, 184, 1)" }}
              >
                <motion.div
                  className="mb-4 inline-block"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Icon className="w-10 h-10 text-blue-400" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-2">{action.title}</h3>
                <p className="text-gray-400 mb-3 font-semibold text-sm">{action.subtitle}</p>
                <p className="text-gray-300 text-base leading-relaxed">{action.detail}</p>

                {/* Hover indicator */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-gray-300 text-lg mb-6">
            The future of mental health won't be handed to us.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 font-semibold">
              We have to build it together.
            </span>
          </p>
{/* 
          <motion.div
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-8 py-4 rounded-full border border-blue-500/50 backdrop-blur"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-white font-semibold">Start today</span>
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              →
            </motion.span>
          </motion.div> */}
        </motion.div>
      </div>
    </div>
  );
};

export default Slide11_YourRole;