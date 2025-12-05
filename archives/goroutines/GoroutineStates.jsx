import { motion } from 'framer-motion';

const GoroutineStates = () => {
    const states = [
        { id: 'idle', label: '_Gidle', color: 'gray' },
        { id: 'runnable', label: '_Grunnable', color: 'blue' },
        { id: 'running', label: '_Grunning', color: 'green' },
        { id: 'waiting', label: '_Gwaiting', color: 'yellow' },
        { id: 'dead', label: '_Gdead', color: 'red' },
    ];

    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-16 text-center text-purple-400">Goroutine Lifecycle</h2>

            <div className="flex justify-center items-center gap-8 relative h-96">

                {/* State Nodes */}
                {states.map((state, index) => (
                    <div key={state.id} className="relative z-10 flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.2 }}
                            className={`w-32 h-32 rounded-full border-4 border-${state.color}-500 bg-${state.color}-500/10 flex items-center justify-center text-xl font-bold text-${state.color}-400 shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
                        >
                            {state.label}
                        </motion.div>
                    </div>
                ))}

                {/* Arrows (Simplified for visual flow) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563" />
                        </marker>
                    </defs>
                    {/* Idle -> Runnable */}
                    <line x1="18%" y1="50%" x2="28%" y2="50%" stroke="#4B5563" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    {/* Runnable -> Running */}
                    <line x1="38%" y1="50%" x2="48%" y2="50%" stroke="#4B5563" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    {/* Running -> Waiting */}
                    <path d="M 55% 40% Q 60% 10% 65% 40%" stroke="#4B5563" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                    {/* Waiting -> Runnable */}
                    <path d="M 65% 60% Q 60% 90% 55% 60%" stroke="#4B5563" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                    {/* Running -> Dead */}
                    <line x1="58%" y1="50%" x2="88%" y2="50%" stroke="#4B5563" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
                </svg>

                {/* Labels for transitions */}
                <div className="absolute top-1/4 left-[60%] text-xs text-gray-500">Channel/Syscall</div>
                <div className="absolute bottom-1/4 left-[60%] text-xs text-gray-500">Ready</div>
            </div>
        </div>
    );
};

export default GoroutineStates;
