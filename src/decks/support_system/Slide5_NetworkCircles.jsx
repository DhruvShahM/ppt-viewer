import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Briefcase, Globe } from 'lucide-react';

export default function Slide5_NetworkCircles() {
  const [expandedRing, setExpandedRing] = useState(null);

  const circles = [
    {
      id: 'inner',
      title: 'Intimate Circle',
      subtitle: 'Family & Close Friends',
      icon: Heart,
      members: ['Parents', 'Siblings', 'Best Friends', 'Partner'],
      radius: 'w-48 h-48',
      borderColor: 'border-red-400/40',
      color: 'text-red-400'
    },
    {
      id: 'middle',
      title: 'Personal Network',
      subtitle: 'Friends & Acquaintances',
      icon: Users,
      members: ['Friends', 'Neighbors', 'Colleagues', 'Activity Partners'],
      radius: 'w-80 h-80',
      borderColor: 'border-blue-400/40',
      color: 'text-blue-400'
    },
    {
      id: 'outer',
      title: 'Community',
      subtitle: 'Extended Network',
      icon: Globe,
      members: ['Community Groups', 'Mentors', 'Online Communities', 'Support Groups'],
      radius: 'w-[28rem] h-[28rem]',
      borderColor: 'border-green-400/40',
      color: 'text-green-400'
    }
  ];

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center p-8 overflow-hidden">
      <motion.h2
        className="text-5xl font-bold text-white mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Your Network of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Support</span>
      </motion.h2>

      <motion.p
        className="text-white/60 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Concentric circles of relationships and care
      </motion.p>

      <div className="relative w-96 h-96 flex items-center justify-center">
        {circles.map((circle, idx) => {
          const Icon = circle.icon;
          const isExpanded = expandedRing === circle.id;

          return (
            <motion.div
              key={circle.id}
              layout
              layoutId={`circle-${circle.id}`}
              className={`absolute rounded-full border-2 ${circle.borderColor} cursor-pointer flex items-center justify-center`}
              style={{
                background: `radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`
              }}
              animate={{
                width: isExpanded ? 500 : ['var-w-' + idx],
                height: isExpanded ? 500 : ['var-h-' + idx],
                scale: isExpanded ? 1.15 : 1
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30
              }}
              onClick={() => setExpandedRing(isExpanded ? null : circle.id)}
              initial={false}
            >
              <motion.div
                className="text-center pointer-events-none"
                animate={{ scale: isExpanded ? 1.2 : 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className={`${circle.color} mb-2 flex justify-center`}
                  animate={{ rotate: isExpanded ? 360 : 0 }}
                  transition={{ duration: 2 }}
                >
                  <Icon size={40} />
                </motion.div>

                <h3 className="text-white font-bold text-sm mb-1">
                  {circle.title}
                </h3>

                <p className={`${circle.color} text-xs mb-3`}>
                  {circle.subtitle}
                </p>

                {isExpanded && (
                  <motion.div
                    className="text-white/60 text-xs space-y-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {circle.members.map((member, i) => (
                      <div key={i}>• {member}</div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="mt-16 text-center text-white/50 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        ↑ Click any circle to explore its members
      </motion.div>
    </div>
  );
}