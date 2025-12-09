import { motion, AnimatePresence } from "framer-motion";

const HindiChannels = () => {
  const code = `// Create channel
ch := make(chan int)

// Send data
go func() {
    ch <- 42
}()

// Receive data
val := <-ch`;

  return (
    <div className="h-full flex flex-col justify-center max-w-6xl mx-auto">
      <h2 className="text-5xl font-bold mb-12 text-blue-400">4. Channels</h2>

      <div className="grid grid-cols-2 gap-12">
        {/* LEFT CONTENT */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 p-6 rounded-xl border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-4 text-purple-400">
              Channels क्या हैं?
            </h3>
            <p className="text-xl text-gray-300 mb-4">
              Channels goroutines के बीच बात करने का ज़रिया हैं। यह pipe
              की तरह होते हैं जहाँ data flow करता है।
            </p>
            <p className="text-lg text-gray-400 italic">
              “Share memory by communicating.”
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 p-6 rounded-xl border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-4 text-green-400">
              Types of Channels
            </h3>
            <ul className="space-y-4 text-gray-300">
              <li>✅ <strong>Unbuffered:</strong> Sender waits for receiver</li>
              <li>✅ <strong>Buffered:</strong> Capacity ke sath data store hota hai</li>
            </ul>
          </motion.div>
        </div>

        {/* RIGHT VISUAL + CODE */}
        <div className="space-y-8">
          {/* CHANNEL VISUALIZATION */}
          <div className="relative h-56 bg-black/30 rounded-xl border border-white/10 flex items-center justify-between px-8">
            {/* Sender */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center"
            >
              <div className="text-sm text-gray-400 mb-1">Goroutine</div>
              <div className="px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-400 text-purple-300">
                Sender
              </div>
            </motion.div>

            {/* Channel */}
            <div className="relative w-48 h-14 rounded-full border-2 border-blue-400 flex items-center justify-center overflow-hidden">
              <span className="text-blue-300 text-sm">Channel</span>

              <AnimatePresence>
                <motion.div
                  initial={{ x: -90, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 90, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute px-3 py-1 text-sm rounded-full bg-blue-500 text-black font-bold"
                >
                  42
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Receiver */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center"
            >
              <div className="text-sm text-gray-400 mb-1">Main</div>
              <div className="px-4 py-2 rounded-lg bg-green-500/20 border border-green-400 text-green-300">
                Receiver
              </div>
            </motion.div>
          </div>

          {/* CODE BLOCK */}
          <motion.pre
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-black/40 p-6 rounded-xl font-mono text-sm text-green-300 overflow-x-auto"
          >
            {code}
          </motion.pre>
        </div>
      </div>
    </div>
  );
};

export default HindiChannels;
