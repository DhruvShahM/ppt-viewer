import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Video, Mic, FileText } from 'lucide-react';

const CommunicationQuestion = () => {
    const [activeTab, setActiveTab] = useState('async');

    const styles = {
        async: {
            title: "Async First",
            icon: FileText,
            desc: "Writing documentation, Slack messages, and emails. Allows for deep work and thoughtful responses.",
            pros: ["Fewer interruptions", "Better documentation", "Time zone friendly"],
            color: "indigo"
        },
        sync: {
            title: "Sync / Real-time",
            icon: Video,
            desc: "Zoom calls, huddles, and in-person meetings. Best for brainstorming, complex problem solving, and bonding.",
            pros: ["Instant feedback", "Rich non-verbal cues", "Faster resolution for blockers"],
            color: "pink"
        }
    };

    return (
        <div className="max-w-6xl w-full mx-auto p-8">
            <div className="text-center mb-12">
                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
                    Communication Style 💬
                </h2>
                <p className="text-2xl text-gray-300">
                    "Do you prefer deep work or constant collaboration?"
                </p>
            </div>

            <div className="flex justify-center gap-4 mb-12">
                {Object.keys(styles).map((key) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`px-8 py-4 rounded-full text-xl font-bold transition-all ${activeTab === key
                                ? `bg-${styles[key].color}-500 text-white shadow-lg shadow-${styles[key].color}-500/25`
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        {styles[key].title}
                    </button>
                ))}
            </div>

            <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-12 relative overflow-hidden"
            >
                <div className={`absolute top-0 right-0 p-64 bg-${styles[activeTab].color}-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none`} />

                <div className="relative z-10 flex gap-12 items-center">
                    <div className={`p-8 rounded-2xl bg-${styles[activeTab].color}-500/20 text-${styles[activeTab].color}-400`}>
                        {(() => {
                            const Icon = styles[activeTab].icon;
                            return <Icon size={64} />;
                        })()}
                    </div>

                    <div className="flex-1">
                        <h3 className="text-4xl font-bold mb-6">{styles[activeTab].title}</h3>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            {styles[activeTab].desc}
                        </p>

                        <div className="grid grid-cols-1 gap-4">
                            {styles[activeTab].pros.map((pro, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full bg-${styles[activeTab].color}-400`} />
                                    <span className="text-lg font-medium text-gray-200">{pro}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CommunicationQuestion;
