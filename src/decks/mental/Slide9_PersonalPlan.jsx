import React from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  CheckCircle,
  Clock,
  TrendingUp,
  Zap,
} from 'lucide-react';

const Slide9_PersonalPlan = () => {
  const [selectedPhase, setSelectedPhase] = React.useState(0);

  const phases = [
    {
      phase: 'Week 1-2',
      icon: Target,
      title: 'Assess & Identify',
      tasks: [
        'Identify your main stressors',
        'Track stress patterns & triggers',
        'Measure baseline anxiety levels',
        'List current coping mechanisms',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      phase: 'Week 3-4',
      icon: Zap,
      title: 'Start Small',
      tasks: [
        'Pick ONE coping strategy',
        '10-15 min daily practice',
        'Monitor mood changes',
        'Build consistency habit',
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      phase: 'Week 5-8',
      icon: TrendingUp,
      title: 'Scale & Expand',
      tasks: [
        'Add second strategy',
        'Increase practice duration',
        'Track measurable improvements',
        'Adapt based on what works',
      ],
      color: 'from-orange-500 to-red-500',
    },
    {
      phase: '2-3 Months',
      icon: CheckCircle,
      title: 'Sustainable System',
      tasks: [
        'Multi-strategy routine established',
        'Stress levels significantly reduced',
        'Early warning system active',
        'Maintenance mode for life',
      ],
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Animated progress background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-5xl font-bold text-white mb-4 relative z-10"
      >
        Your Stress <span className="text-green-400">Management Plan</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 mb-12 relative z-10"
      >
        A practical 3-month journey to sustainable stress management
      </motion.p>

      {/* Timeline */}
      <div className="max-w-5xl w-full relative z-10">
        {/* Progress line */}
        <motion.div
          className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-orange-500 to-green-500 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />

        {/* Phase cards */}
        <div className="grid grid-cols-4 gap-4 relative pt-20 pb-8">
          {phases.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = selectedPhase === idx;

            return (
              <motion.div
                key={idx}
                onMouseEnter={() => setSelectedPhase(idx)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="cursor-pointer"
              >
                {/* Card */}
                <motion.div
                  animate={{
                    scale: isSelected ? 1.05 : 1,
                    y: isSelected ? -10 : 0,
                  }}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? `border-green-500 bg-gradient-to-br ${item.color} bg-opacity-20 shadow-2xl`
                      : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                  }`}
                >
                  {/* Icon */}
                  <motion.div
                    className="mb-3"
                    animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                    transition={{
                      duration: 0.6,
                      repeat: isSelected ? Infinity : 0,
                    }}
                  >
                    <Icon
                      className={`w-8 h-8 ${isSelected ? 'text-green-400' : 'text-slate-400'}`}
                    />
                  </motion.div>

                  {/* Phase label */}
                  <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">
                    {item.phase}
                  </p>

                  {/* Title */}
                  <h3
                    className={`text-lg font-bold mb-3 ${isSelected ? 'text-white' : 'text-slate-300'}`}
                  >
                    {item.title}
                  </h3>

                  {/* Tasks (expanded on hover) */}
                  <motion.div
                    animate={{ height: isSelected ? 'auto' : 0, opacity: isSelected ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="text-xs text-slate-300 space-y-2">
                      {item.tasks.map((task, i) => (
                        <li key={i} className="flex gap-2">
                          <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Action items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-12 relative z-10 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl max-w-2xl"
      >
        <div className="flex gap-4">
          <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white font-semibold mb-2">
              ✨ Start with ONE thing this week:
            </p>
            <p className="text-slate-300 text-sm">
              Choose the strategy that resonates most with you and commit to 10-15 minutes daily.
              Track your progress. Small consistent actions compound over time.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Slide9_PersonalPlan;