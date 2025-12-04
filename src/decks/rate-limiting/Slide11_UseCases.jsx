import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Code, CreditCard, UploadCloud, MessageSquare } from 'lucide-react';

const useCases = [
    {
        title: "Login Attempts",
        icon: Lock,
        color: "text-red-400",
        bg: "bg-red-500/20",
        delay: 0
    },
    {
        title: "API Usage",
        icon: Code,
        color: "text-blue-400",
        bg: "bg-blue-500/20",
        pulse: true,
        delay: 0.1
    },
    {
        title: "Payment Requests",
        icon: CreditCard,
        color: "text-green-400",
        bg: "bg-green-500/20",
        delay: 0.2
    },
    {
        title: "File Uploads",
        icon: UploadCloud,
        color: "text-purple-400",
        bg: "bg-purple-500/20",
        delay: 0.3
    },
    {
        title: "Messaging Apps",
        icon: MessageSquare,
        color: "text-yellow-400",
        bg: "bg-yellow-500/20",
        delay: 0.4
    }
];

const Slide11_UseCases = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-900 text-white p-8">
            <h2 className="text-4xl font-bold mb-16 text-white">Where Rate Limiting is Used?</h2>

            <div className="flex flex-wrap justify-center gap-8 w-full max-w-5xl">
                {useCases.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: item.delay
                        }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className={`w-32 h-32 rounded-2xl ${item.bg} flex items-center justify-center relative`}>
                            <item.icon size={64} className={item.color} />

                            {item.pulse && (
                                <motion.div
                                    className={`absolute inset-0 rounded-2xl border-2 ${item.color.replace('text', 'border')} opacity-50`}
                                    animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            )}
                        </div>

                        <h3 className="text-xl font-semibold text-gray-300">{item.title}</h3>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Slide11_UseCases;
