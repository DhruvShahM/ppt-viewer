import React from "react";
import { motion } from "framer-motion";
import { KeyRound, UserCheck, Link2 } from "lucide-react";

/**
 * Animated OAuth2 Authorization Code flow:
 * - User -> Client -> Auth Server -> Resource Server
 * - Show tokens appearing, code exchanged, and scopes highlighted
 */

const Node = ({ label, subtitle, bg }) => (
  <motion.div
    className={`p-4 rounded-xl ${bg} border border-white/6 flex flex-col items-center gap-2`}
    initial={{ y: 12, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <div className="text-sm font-semibold">{label}</div>
    {subtitle && <div className="text-xs text-slate-300">{subtitle}</div>}
  </motion.div>
);

const Slide4_OAuth2Flow = () => {
  return (
    <div className="w-full h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="w-[1100px] max-w-[95%] p-8 rounded-2xl bg-slate-900/50 border border-white/5 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">OAuth 2.0 — Authorization Code Flow</h2>
            <p className="text-slate-300 mt-1">Secure delegated access using short-lived tokens</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-4 gap-6 items-center">
          <Node label="User" subtitle="browser" bg="bg-slate-800/40" />
          <Node label="Client" subtitle="your app" bg="bg-indigo-700/40" />
          <Node label="Auth Server" subtitle="identity provider" bg="bg-rose-600/40" />
          <Node label="Resource" subtitle="API / data" bg="bg-emerald-600/40" />
        </div>

        {/* animated arrows and token exchange */}
        <div className="mt-8 relative h-40">
          {/* arrow: user -> client (consent) */}
          <motion.div
            className="absolute left-14 top-8 flex items-center gap-3"
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-24 text-xs text-slate-200">User grants consent</div>
            <Link2 className="w-5 h-5 text-slate-200" />
          </motion.div>

          {/* code token */}
          <motion.div
            className="absolute left-1/3 top-6 flex items-center gap-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="px-2 py-1 rounded bg-white/6 text-xs">auth code</div>
            <motion.div
              className="px-2 py-1 rounded bg-white/6 text-xs"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
            >
              exchange
            </motion.div>
            <div className="px-2 py-1 rounded bg-white/6 text-xs">access token</div>
          </motion.div>

          {/* token moving to resource */}
          <motion.div
            className="absolute left-1/2 top-20 flex gap-2"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center shadow">
              <KeyRound className="w-4 h-4 text-white" />
            </motion.div>
            <div className="text-sm text-slate-200">token → resource</div>
          </motion.div>

          {/* scopes visualization */}
          <motion.div
            className="absolute right-8 top-6 p-3 rounded-lg bg-white/6 border border-white/6 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="font-semibold text-xs">Scopes</div>
            <div className="mt-2 text-xs text-slate-200 space-y-1">
              <div>• read:messages</div>
              <div>• write:profile</div>
            </div>
          </motion.div>
        </div>

        <div className="mt-6 text-sm text-slate-300 flex items-center gap-3">
          <UserCheck className="w-4 h-4" />
          <div>
            Authorization code flow keeps credentials off the browser and issues short-lived tokens to the client.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide4_OAuth2Flow;