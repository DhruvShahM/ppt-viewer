import { motion } from 'framer-motion';

const TestingMocking = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-blue-400">Testing & Mocking</h2>

            <div className="flex flex-col items-center gap-12">
                <p className="text-2xl text-gray-300 text-center max-w-4xl">
                    Interfaces are the <span className="text-green-400 font-bold">key</span> to testable code in Go.
                    They allow you to swap real implementations with mocks.
                </p>

                <div className="grid grid-cols-3 gap-8 w-full">
                    {/* Real Implementation */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 opacity-50">
                        <h3 className="text-xl font-bold text-gray-400 mb-4">Real Database</h3>
                        <div className="h-32 bg-red-900/20 rounded flex items-center justify-center text-red-400">
                            Slow / External
                        </div>
                    </div>

                    {/* Interface */}
                    <div className="bg-blue-500/10 p-6 rounded-xl border border-blue-500/30 flex flex-col items-center justify-center">
                        <h3 className="text-2xl font-bold text-blue-400 mb-4">Repository Interface</h3>
                        <div className="text-4xl">↔️</div>
                    </div>

                    {/* Mock Implementation */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 border-green-500/50">
                        <h3 className="text-xl font-bold text-green-400 mb-4">Mock Database</h3>
                        <div className="h-32 bg-green-900/20 rounded flex items-center justify-center text-green-400">
                            Fast / In-Memory
                        </div>
                    </div>
                </div>

                <div className="bg-[#1E1E1E] p-6 rounded-xl border border-white/10 font-mono text-sm w-full max-w-3xl">
                    <pre>
                        <code>
                            <span className="text-purple-400">type</span> Database <span className="text-purple-400">interface</span> {'{'}
                            {'\n    '}
                            GetUser(id <span className="text-blue-400">int</span>) (*User, <span className="text-blue-400">error</span>)
                            {'\n}'}
                            {'\n\n'}
                            <span className="text-gray-500">// In Test:</span>
                            {'\n'}
                            <span className="text-purple-400">type</span> MockDB <span className="text-purple-400">struct</span> {'{}'}
                            {'\n'}
                            <span className="text-purple-400">func</span> (m *MockDB) GetUser(id <span className="text-blue-400">int</span>) ... {'{'}
                            {'\n    '}
                            <span className="text-purple-400">return</span> &User{'{'}Name: "Test"{'}'}, <span className="text-yellow-300">nil</span>
                            {'\n}'}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default TestingMocking;
