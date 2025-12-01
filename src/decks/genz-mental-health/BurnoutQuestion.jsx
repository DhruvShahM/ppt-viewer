import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Battery, BatteryWarning, BatteryCharging } from 'lucide-react';

const BurnoutQuestion = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        {
            id: 'thriving',
            icon: BatteryCharging,
            text: "Thriving",
            desc: "Full energy, ready to tackle anything!",
            color: "green"
        },
        {
            id: 'surviving',
            icon: Battery,
            text: "Surviving",
            desc: "Getting by, but could use a break.",
            color: "yellow"
        },
        {
            id: 'drowning',
            icon: BatteryWarning,
            text: "Drowning",
            desc: "Need immediate support and rest.",
            color: "red"
        }
    ];

    return (
        <div className="max-w-6xl w-full mx-auto p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    The Burnout Meter 🔋
                </h2>
                <p className="text-2xl text-gray-300">
                    "How are your energy levels currently affecting your work?"
                </p>
            </motion.div>

            <div className="grid grid-cols-3 gap-8 mb-12">
                {options.map((option) => (
                    <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedOption(option)}
                        className={`p-8 rounded-2xl border-2 transition-all ${selectedOption?.id === option.id
                                ? `bg-${option.color}-500/20 border-${option.color}-500`
                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                            }`}
                    >
                        <div className={`w-16 h-16 rounded-full bg-${option.color}-500/20 flex items-center justify-center mx-auto mb-6 text-${option.color}-400`}>
                            <option.icon size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{option.text}</h3>
                    </motion.button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {selectedOption && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-8 overflow-hidden"
                    >
                        <div className="flex items-start gap-6">
                            <div className={`p-4 rounded-xl bg-${selectedOption.color}-500/20 text-${selectedOption.color}-400`}>
                                <selectedOption.icon size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2 text-white">
                                    Why this matters
                                </h3>
                                <p className="text-xl text-gray-300 mb-4">
                                    {selectedOption.desc}
                                </p>
                                <div className="p-4 bg-black/30 rounded-xl border border-white/5">
                                    <p className="text-sm text-gray-400 font-mono">
                                        💡 Interview Tip: Be honest but professional. If you're low on energy, discuss how you prioritize tasks or communicate capacity.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BurnoutQuestion;
