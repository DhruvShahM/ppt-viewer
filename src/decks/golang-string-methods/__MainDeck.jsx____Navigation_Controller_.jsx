import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Slide1_TitleCard from './Slide1_TitleCard';
import Slide2_StringPackageOverview from './Slide2_StringPackageOverview';
import Slide3_Contains from './Slide3_Contains';
import Slide4_HasPrefixSuffix from './Slide4_HasPrefixSuffix';
import Slide5_IndexLastIndex from './Slide5_IndexLastIndex';
import Slide6_Split from './Slide6_Split';
import Slide7_Join from './Slide7_Join';
import Slide8_ToUpperToLower from './Slide8_ToUpperToLower';
import Slide9_Trim from './Slide9_Trim';
import Slide10_ReplaceRepeat from './Slide10_ReplaceRepeat';
import Slide11_AdvancedMethods from './Slide11_AdvancedMethods';
import Slide12_BestPractices from './Slide12_BestPractices';
import Slide13_Conclusion from './Slide13_Conclusion';

export default function MainDeck() {
  const slides = [
    Slide1_TitleCard,
    Slide2_StringPackageOverview,
    Slide3_Contains,
    Slide4_HasPrefixSuffix,
    Slide5_IndexLastIndex,
    Slide6_Split,
    Slide7_Join,
    Slide8_ToUpperToLower,
    Slide9_Trim,
    Slide10_ReplaceRepeat,
    Slide11_AdvancedMethods,
    Slide12_BestPractices,
    Slide13_Conclusion,
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const CurrentSlide = slides[currentSlide];

  const goNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goPrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Slide container */}
      <div className="w-full h-full">
        <CurrentSlide />
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-50">
        {/* Previous button */}
        <button
          onClick={goPrev}
          disabled={currentSlide === 0}
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full p-3 hover:bg-white/15 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>

        {/* Slide counter */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-6 py-2">
          <span className="text-white font-mono">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>

        {/* Next button */}
        <button
          onClick={goNext}
          disabled={currentSlide === slides.length - 1}
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full p-3 hover:bg-white/15 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>

      {/* Keyboard navigation helper */}
      <div className="absolute top-8 right-8 text-white/50 text-sm backdrop-blur-md bg-white/5 border border-white/10 rounded px-4 py-2">
        ← → to navigate
      </div>
    </div>
  );
}