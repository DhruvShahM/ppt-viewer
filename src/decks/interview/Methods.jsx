import { motion } from 'framer-motion';

const Methods = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-blue-400">Methods & Receivers</h2>

            <div className="grid grid-cols-2 gap-12">
                {/* Value Receiver */}
                <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-green-400">Value Receiver</h3>
                    <code className="block bg-black/30 p-4 rounded mb-4 font-mono text-sm">
                        func (u User) Notify()
                    </code>
                    <ul className="space-y-2 text-gray-300">
                        <li>• Receives a <span className="text-white font-bold">copy</span> of the struct.</li>
                        <li>• Cannot modify the original struct.</li>
                        <li>• Safer for concurrency (read-only).</li>
                    </ul>
                </div>

                {/* Pointer Receiver */}
                <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-purple-400">Pointer Receiver</h3>
                    <code className="block bg-black/30 p-4 rounded mb-4 font-mono text-sm">
                        func (u *User) Update()
                    </code>
                    <ul className="space-y-2 text-gray-300">
                        <li>• Receives the <span className="text-white font-bold">memory address</span>.</li>
                        <li>• Can modify the original struct.</li>
                        <li>• Avoids copying large structs (performance).</li>
                    </ul>
                </div>
            </div>

            <div className="mt-12 text-center text-gray-400 italic">
                "If in doubt, use a pointer receiver."
            </div>
        </div>
    );
};

export default Methods;
