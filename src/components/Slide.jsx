import { motion } from 'framer-motion';

const Slide = ({ children, isActive = true, noAnimation = false }) => {
    if (noAnimation) {
        return (
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-12 z-10">
                {children}
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : -100,
                pointerEvents: isActive ? 'auto' : 'none'
            }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center p-12 ${isActive ? 'z-10' : 'z-0'}`}
        >
            {children}
        </motion.div>
    );
};

export default Slide;
