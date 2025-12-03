import React from 'react';
import { motion } from 'framer-motion';

const ContentSlide = ({ data }) => {
    const { title, content } = data;

    return (
        <div className="h-full w-full bg-slate-950 p-12 flex flex-col items-center justify-center relative">
            <h1 className="text-5xl font-bold text-white mb-12">{title}</h1>
            <ul className="space-y-6 text-2xl text-slate-300 list-disc pl-8">
                {content.map((item, index) => (
                    <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                    >
                        {item}
                    </motion.li>
                ))}
            </ul>
        </div>
    );
};

export default ContentSlide;
