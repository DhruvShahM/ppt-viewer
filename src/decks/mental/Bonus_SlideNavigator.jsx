import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Slide1_Title from './Slide1_Title';
import Slide2_StressDefinition from './Slide2_StressDefinition';
import Slide3_StressTypes from './Slide3_StressTypes';
import Slide4_CommonStressors from './Slide4_CommonStressors';
import Slide5_StressResponse from './Slide5_StressResponse';
import Slide6_PhysicalImpacts from './Slide6_PhysicalImpacts';
import Slide7_MentalImpacts from './Slide7_MentalImpacts';
import Slide8_CopingStrategies from './Slide8_CopingStrategies';
import Slide9_PersonalPlan from './Slide9_PersonalPlan';
import Slide10_Conclusion from './Slide10_Conclusion';

const SlideNavigator = () => {
  const [current, setCurrent] = useState(0);

  const slides = [
    { Component: Slide1_Title, title: 'Title' },
    { Component: Slide2_StressDefinition, title: 'Definition' },
    { Component: Slide3_StressTypes, title: 'Types' },
    { Component: Slide4_CommonStressors, title: 'Common Stressors' },
    { Component: Slide5_StressResponse, title: 'Response Cycle' },
    { Component: Slide6_PhysicalImpacts, title: 'Physical Impacts' },
    { Component: Slide7_MentalImpacts, title: 'Mental Impacts' },
    { Component: Slide8_CopingStrategies, title: 'Coping Strategies' },
    { Component: Slide9_PersonalPlan, title: 'Management Plan' },
    { Component: Slide10_Conclusion, title: 'Conclusion' },
  ];

  const CurrentSlide = slides[current].Component;

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col">
      {/* Slide content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <CurrentSlide />
        </motion.div>
      </AnimatePresence>

      {/* Navigation controls */}
      <div className="bg-slate-950/80 backdrop-blur border-t border-slate-700 px-8 py-4 flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="p-2 hover:bg-slate-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>

        <div className="flex-1 mx-8">
          <div className="flex gap-2 justify-center">
            {slides.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setCurrent(idx)}
                animate={{
                  scale: idx === current ? 1.2 : 1,
                  backgroundColor: idx === current ? 'rgb(59, 130, 246)' : 'rgb(71, 85, 105)',
                }}
                className="w-3 h-3 rounded-full transition"
              />
            ))}
          </div>
        </div>

        <div className="text-center flex-1 text-slate-400 text-sm">
          <span>
            Slide {current + 1} / {slides.length} — {slides[current].title}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrent(Math.min(slides.length - 1, current + 1))}
          disabled={current === slides.length - 1}
          className="p-2 hover:bg-slate-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </motion.button>
      </div>
    </div>
  );
};

export default SlideNavigator;