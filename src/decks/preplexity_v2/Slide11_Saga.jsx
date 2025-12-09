import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

const Slide11_Saga = () => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isRollback, setIsRollback] = useState(false);

  useEffect(() => {
    const steps = [0, 1, 2, 2, 1, 0];
    let stepIndex = 0;

    const interval = setInterval(() => {
      if (stepIndex === 2) {
        setIsRollback(true);
      }
      setCurrentStep(steps[stepIndex]);
      stepIndex++;
      if (stepIndex >= steps.length) {
        stepIndex = 0;
        setIsRollback(false);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    { name: 'Reserve Inventory', service: 'Inventory Service', color: 'from-blue-600 to-cyan-600' },
    { name: 'Process Payment', service: 'Payment Service', color: 'from-green-600 to-emerald-600' },
    { name: 'Create Order', service: 'Order Service', color: 'from-purple-600 to-pink-600' },
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden relative px-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-5xl font-bold text-white mb-4">Saga Pattern</h2>
        <p className="text-xl text-slate-300">Manage distributed transactions with compensating actions</p>
      </motion.div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Happy path */}
        <div className="mb-16">
          <h3 className="text-white font-bold mb-8 text-xl">Happy Path: Forward</h3>

          <div className="space-y-8">
            {steps.map((step, idx) => (
              <div key={idx}>
                <motion.div
                  animate={{
                    scale: currentStep === idx && !isRollback ? 1.05 : 1,
                    boxShadow:
                      currentStep === idx && !isRollback
                        ? `0 0 30px rgba(${step.color.includes('blue') ? '59,130,246' : step.color.includes('green') ? '34,197,94' : '168,85,247'},0.8)`
                        : '0 0 0px rgba(0,0,0,0)',
                  }}
                  transition={{ duration: 0.6 }}
                  className={`bg-gradient-to-r ${step.color} rounded-xl p-6 border-2 ${currentStep === idx && !isRollback ? 'border-white' : 'border-slate-700'}`}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6 }}
                      className="mt-1"
                    >
                      <CheckCircle2 size={24} className="text-white" />
                    </motion.div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{step.name}</h4>
                      <p className="text-white text-opacity-80">{step.service}</p>
                    </div>
                  </div>
                </motion.div>

                {idx < steps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowRight size={24} className="text-cyan-400 rotate-90" />
                    </motion.div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Failure scenario */}
        {isRollback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <AlertCircle size={28} className="text-red-400" />
              <h3 className="text-red-400 font-bold text-xl">Rollback: Compensating Transactions</h3>
            </div>

            <div className="space-y-8">
              {[...steps].reverse().map((step, idx) => (
                <div key={idx}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.2 }}
                    className="bg-red-900 bg-opacity-40 border-2 border-red-600 rounded-xl p-6"
                  >
                    <div className="flex items-start gap-4">
                      <AlertCircle size={24} className="text-red-400 mt-1" />
                      <div>
                        <h4 className="text-red-300 font-bold text-lg">Compensate: {step.name}</h4>
                        <p className="text-red-200 text-opacity-80">Release reservation, refund, cancel order</p>
                      </div>
                    </div>
                  </motion.div>

                  {idx < steps.length - 1 && (
                    <div className="flex justify-center my-4">
                      <ArrowRight size={24} className="text-red-400 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-slate-800 border-l-4 border-cyan-500 rounded-r-lg p-6"
        >
          <p className="text-slate-200">
            <span className="font-semibold text-cyan-400">Alternative to distributed transactions:</span> Each step
            stores state → If any fails, compensating actions undo previous steps
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide11_Saga;