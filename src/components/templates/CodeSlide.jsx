import React from 'react';
import { motion } from 'framer-motion';

const CodeSlide = ({ data }) => {
    const { title, description, code } = data;

    return (
        <div className="h-full w-full bg-[#1e1e1e] p-12 flex flex-col items-center justify-center relative">
            <h2 className="text-4xl font-bold text-white mb-4" dangerouslySetInnerHTML={{ __html: title }} />
            <p className="text-xl text-slate-400 mb-8">{description}</p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#2d2d2d] rounded-xl shadow-2xl overflow-hidden border border-slate-700 w-full max-w-5xl p-6"
            >
                <pre className="font-mono text-sm leading-relaxed text-white whitespace-pre-wrap">
                    {code}
                </pre>
            </motion.div>
        </div>
    );
};

export default CodeSlide;
