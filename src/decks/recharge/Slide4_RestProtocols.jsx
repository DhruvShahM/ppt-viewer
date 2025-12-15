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