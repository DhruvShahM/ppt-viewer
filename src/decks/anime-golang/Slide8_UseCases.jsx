import React from 'react';
import { motion } from 'framer-motion';
import { Server, Activity, Globe, Database } from 'lucide-react';

const Slide8_UseCases = () => {
    const cases = [
        { icon: Globe, title: "Web Servers", desc: "Handling 10k+ requests/sec" },
        { icon: Activity, title: "Background Jobs", desc: "Sending emails, processing logs" },
        { icon: Server, title: "Microservices", desc: "Talking to other services concurrently" },
        { icon: Database, title: "Data Pipelines", desc: "ETL jobs processing massive data" },
    ];

    return (
        <div className="h-full w-full bg-slate-900 p-12 flex flex-col items-center justify-center relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-5" />

            <h2 className="text-5xl font-black text-white mb-16 z-10">
                Real-World <span className="text-[#00ADD8]">Superpowers</span>
            </h2>

            <div className="grid grid-cols-2 gap-8 w-full max-w-5xl z-10">
                {cases.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-[#00ADD8] transition-all group"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-[#00ADD8]/10 rounded-xl text-[#00ADD8] group-hover:bg-[#00ADD8] group-hover:text-white transition-colors">
                                <item.icon size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                <p className="text-slate-400 text-sm">{item.desc}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Gopher with Tool */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12"
            >
                <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center border-4 border-[#00ADD8] shadow-[0_0_30px_rgba(0,173,216,0.4)]">
                    <span className="text-5xl">🛠️</span>
                </div>
            </motion.div>
        </div>
    );
};

export default Slide8_UseCases;
