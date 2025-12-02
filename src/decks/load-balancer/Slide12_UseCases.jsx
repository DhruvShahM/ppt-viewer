import React from 'react';
import { motion } from 'framer-motion';

const Slide12_UseCases = () => {
    const useCases = [
        { title: "High Traffic Websites", icon: "🌐", color: "bg-blue-500" },
        { title: "Microservices", icon: "🧩", color: "bg-purple-500" },
        { title: "E-commerce", icon: "🛒", color: "bg-green-500" },
        { title: "Video Streaming", icon: "🎬", color: "bg-red-500" },
        { title: "Banking Systems", icon: "🏦", color: "bg-yellow-500" }
    ];

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 z-10">Use Cases</h2>

            <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl z-10">
                {useCases.map((useCase, index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className={`w-32 h-32 ${useCase.color} rounded-3xl flex items-center justify-center shadow-lg shadow-${useCase.color.replace('bg-', '')}/50 text-6xl`}>
                            {useCase.icon}
                        </div>
                        <span className="text-xl font-bold text-white text-center max-w-[150px]">
                            {useCase.title}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Background Particles */}
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white/5 rounded-full"
                    style={{
                        width: Math.random() * 50 + 20,
                        height: Math.random() * 50 + 20,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -50, 0],
                        opacity: [0, 0.3, 0]
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

export default Slide12_UseCases;
