import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Smartphone, Moon } from 'lucide-react';

const BoundariesQuestion = () => {
    const [flipped, setFlipped] = useState(false);

    const boundaries = [
        { icon: Clock, text: "Strict 9-5" },
        { icon: Smartphone, text: "No weekend emails" },
        { icon: Moon, text: "Mental health days" },
        { icon: Shield, text: "Saying 'No'" }
    ];

    return (
        <div className="max-w-6xl w-full mx-auto p-8 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                    Setting Boundaries 🛡️
                </h2>
                <p className="text-2xl text-gray-300">
                    "What does a healthy work-life balance look like to you?"
                </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-8 w-full max-w-4xl mb-12">
                {boundaries.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 bg-white/5 p-6 rounded-xl border border-white/10"
                    >
                        <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                            <item.icon size={24} />
                        </div>
                        <span className="text-xl font-medium">{item.text}</span>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="relative w-full max-w-3xl cursor-pointer perspective-1000"
                onClick={() => setFlipped(!flipped)}
                whileHover={{ scale: 1.02 }}
            >
                <motion.div
                    animate={{ rotateX: flipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="w-full relative preserve-3d"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Front */}
                    <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm text-center backface-hidden">
                        <h3 className="text-3xl font-bold mb-4">Click to Reveal Insight ✨</h3>
                        <p className="text-gray-400">Why are boundaries critical for long-term success?</p>
                    </div>

                    {/* Back */}
                    <div
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-600/20 to-emerald-600/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center text-center backface-hidden"
                        style={{ transform: 'rotateX(180deg)' }}
                    >
                        <h3 className="text-2xl font-bold mb-2 text-green-400">Sustainability &gt; Hustle</h3>
                        <p className="text-lg text-gray-200">
                            Setting clear boundaries prevents burnout and actually increases productivity during work hours. It shows maturity and self-awareness.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default BoundariesQuestion;
