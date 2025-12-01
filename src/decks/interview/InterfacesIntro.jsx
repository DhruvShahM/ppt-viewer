import { motion } from 'framer-motion';

const InterfacesIntro = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-blue-400">Interfaces</h2>

            <div className="flex flex-col gap-12">
                <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                    <h3 className="text-3xl font-bold mb-6 text-white">Definition</h3>
                    <p className="text-xl text-gray-300 mb-6">
                        An interface is a <span className="text-blue-400">contract</span>. It specifies a set of method signatures.
                    </p>
                    <pre className="bg-black/30 p-4 rounded font-mono text-lg">
                        <code>
                            <span className="text-purple-400">type</span> Speaker <span className="text-purple-400">interface</span> {'{'}
                            {'\n    '}
                            Speak() <span className="text-blue-400">string</span>
                            {'\n}'}
                        </code>
                    </pre>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold mb-4 text-yellow-400">Duck Typing</h3>
                        <p className="text-gray-300">
                            "If it walks like a duck and quacks like a duck, it's a duck."
                        </p>
                        <p className="text-gray-400 mt-2 text-sm">
                            Go interfaces are implemented <span className="font-bold text-white">implicitly</span>. No `implements` keyword needed.
                        </p>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold mb-4 text-red-400">No Methods?</h3>
                        <p className="text-gray-300">
                            Yes! An interface can have 0 methods.
                        </p>
                        <p className="text-gray-400 mt-2 text-sm">
                            See next slide: The Empty Interface.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterfacesIntro;
