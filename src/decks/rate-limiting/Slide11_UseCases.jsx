import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, Code, CreditCard, UploadCloud, MessageCircle } from 'lucide-react';

const Slide11_UseCases = () => {
    const useCases = [
        {
            title: "Login Attempts",
            icon: LogIn,
            color: "text-red-400",
            bg: "bg-red-400/10"
        },
        {
            title: "API Usage",
            icon: Code,
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            pulse: true
        },
        {
            title: "Payment Requests",
            icon: CreditCard,
            color: "text-green-400",
            bg: "bg-green-400/10"
        },
        {
            title: "File Uploads",
            icon: UploadCloud,
            color: "text-purple-400",
            bg: "bg-purple-400/10"
        },
        {
            title: "Messaging Apps",
            icon: MessageCircle,
            color: "text-pink-400",
            bg: "bg-pink-400/10"
        },
    ];

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <h2 className="text-5xl font-bold text-white mb-16 z-10">Where is it Used?</h2>

            <div className="flex flex-wrap justify-center gap-10 w-full max-w-6xl z-10">
                {useCases.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 200,
                            damping: 15
                        }}
                        className={`flex flex-col items-center justify-center w-64 h-64 rounded-3xl border border-slate-700/50 backdrop-blur-sm ${item.bg} hover:bg-slate-800 transition-colors duration-300`}
                    >
                        <motion.div
                            animate={item.pulse ? { scale: [1, 1.1, 1] } : {}}
                            transition={item.pulse ? { duration: 2, repeat: Infinity } : {}}
                            className="mb-6"
                        >
                            <item.icon size={64} className={item.color} />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-slate-200 text-center">{item.title}</h3>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Slide11_UseCases;
