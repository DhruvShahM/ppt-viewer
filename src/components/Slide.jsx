import { motion } from 'framer-motion';

const Slide = ({ children, isActive }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : -100,
                pointerEvents: isActive ? 'auto' : 'none'
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center p-12 ${isActive ? 'z-10' : 'z-0'}`}
        >
            {children}
        </motion.div>
    );
};

export default Slide;
