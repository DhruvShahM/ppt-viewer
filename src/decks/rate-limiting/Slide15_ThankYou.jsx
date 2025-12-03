import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Slide15_ThankYou = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 bg-[length:400%_400%] animate-gradient-xy -z-20" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center z-10"
            >
                <h2 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-8">
                    Thank You!
                </h2>
                <p className="text-2xl text-slate-400 mb-12">
                    Rate Limiting — In-depth Explained
                </p>

                <div className="flex justify-center space-x-8">
                    <SocialLink icon={Github} href="#" label="GitHub" />
                    <SocialLink icon={Twitter} href="#" label="Twitter" />
                    <SocialLink icon={Linkedin} href="#" label="LinkedIn" />
                </div>
            </motion.div>
        </div>
    );
};

const SocialLink = ({ icon: Icon, href, label }) => (
    <motion.a
        href={href}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="bg-slate-800 p-4 rounded-full text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
        aria-label={label}
    >
        <Icon size={32} />
    </motion.a>
);

export default Slide15_ThankYou;
