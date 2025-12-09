import { motion } from 'framer-motion';


const HindiIntro = () => {
    return (
        <div className="h-full flex flex-col justify-center max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-blue-400">1. Introduction to Concurrency</h2>

            <div className="grid grid-cols-2 gap-12">
                <div className="space-y-8">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-purple-400">Concurrency क्या है?</h3>
                        <p className="text-xl text-gray-300 leading-relaxed mb-4">
                            Concurrency का मतलब है एक साथ कई कार्यों (tasks) को <strong>manage</strong> करना। यह ज़रूरी नहीं कि वे एक ही समय पर execute हो रहे हों।
                        </p>
                        <p className="text-gray-400 text-sm border-t border-white/10 pt-4">
                            Example: एक ही समय पर खाना बनाना और phone पर बात करना।
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-green-400">Concurrency बनाम Parallelism</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                            <li><strong>Concurrency:</strong> एक साथ कई चीजों से निपटना। (Structure)</li>
                            <li><strong>Parallelism:</strong> एक साथ कई चीजें करना। (Execution)</li>
                        </ul>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10"
                >
                    <h3 className="text-2xl font-bold mb-4 text-orange-400">Go क्यों बेहतर है?</h3>
                    <ul className="list-disc pl-6 space-y-4 text-gray-300 text-lg">
                        <li><strong>Lightweight Threads:</strong> Goroutines OS threads से बहुत हल्की होती हैं (सिर्फ 2KB stack)।</li>
                        <li><strong>Smart Scheduler:</strong> Go का runtime scheduler (GMP) goroutines को कुशलतापूर्वक manage करता है।</li>
                        <li><strong>Channels:</strong> Communication के लिए सुरक्षित और सरल तरीका।</li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default HindiIntro;
