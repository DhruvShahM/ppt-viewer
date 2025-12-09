## Slide1_Title.jsx

```jsx
import React from "react";
import { motion } from "framer-motion";
import { SunMedium, Sparkles } from "lucide-react";

const Slide1_Title = () => {
  return (
    <div className="w-full h-screen bg-slate-900 text-white flex items-center justify-center overflow-hidden">
      {/* animated gradient background (particle-ish) */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-sky-700/10 via-purple-800/10 to-rose-700/5 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* central card */}
      <motion.div
        className="relative z-10 max-w-3xl w-[90%] p-10 rounded-2xl bg-gradient-to-br from-slate-800/70 to-slate-900/60 backdrop-blur-sm shadow-2xl border border-white/5"
        initial={{ y: 30, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            className="p-3 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500"
          >
            <SunMedium className="w-9 h-9 text-white" />
          </motion.div>

          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              Types of Design Patterns in System Design
            </h1>
            <p className="mt-2 text-slate-300">
              Visual, animated explainer — Rate Limiting · CAP · OAuth2 · Microservices · Resilience
            </p>
          </div>
        </div>

        {/* animated packet stream */}
        <div className="mt-8 h-44 relative overflow-hidden">
          <motion.div
            className="absolute left-0 top-8 flex gap-3"
            initial={{ x: -400 }}
            animate={{ x: 1200 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-6 h-3 rounded-full bg-white/90 shadow"
                initial={{ scale: [0.6, 1, 0.8] }}
                animate={{ y: [0, -8, 0] }}
                transition={{ delay: i * 0.08, duration: 1.2, repeat: Infinity }}
              />
            ))}
          </motion.div>

          <motion.div
            className="absolute right-4 bottom-4 px-3 py-1 rounded-full bg-white/5 border border-white/6 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Sparkles className="w-4 h-4 text-white/80" />
            <span className="text-sm text-slate-300">Animated overview</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Slide1_Title;
```

## Slide2_RateLimiting.jsx

```jsx
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Zap, Gauge } from "lucide-react";

const Token = ({ delay }) => (
  <motion.div
    className="w-4 h-4 rounded-full bg-emerald-400 shadow-sm"
    initial={{ x: -40, opacity: 0, scale: 0.6 }}
    animate={{ x: 0, opacity: 1, scale: [1, 0.85, 1] }}
    transition={{ delay, duration: 0.9, repeat: Infinity, repeatType: "loop" }}
  />
);

const Slide2_RateLimiting = () => {
  const [tokens, setTokens] = useState(5);
  const controls = useAnimation();

  useEffect(() => {
    // simple refill animation loop
    const id = setInterval(() => {
      setTokens((t) => Math.min(10, t + 1));
      controls.start({ rotate: [0, 6, -6, 0], transition: { duration: 0.9 } });
    }, 1800);
    return () => clearInterval(id);
  }, [controls]);

  // simulate bursts consuming tokens
  useEffect(() => {
    const burst = setInterval(() => {
      setTokens((t) => Math.max(0, t - (Math.random() > 0.6 ? 3 : 1)));
    }, 2400);
    return () => clearInterval(burst);
  }, []);

  return (
    <div className="w-full h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="relative z-10 w-[1100px] max-w-[95%] p-8 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/5 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={controls}
              className="p-3 rounded-lg bg-gradient-to-br from-amber-500 to-rose-400"
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-semibold">Rate Limiting — Token Bucket</h2>
              <p className="text-slate-300">Control bursts, refill rate, and fairness</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Gauge className="w-5 h-5 text-slate-300" />
            <div className="text-sm text-slate-300">Tokens: <span className="text-white">{tokens}</span></div>
          </div>
        </div>

        {/* visualization */}
        <div className="mt-8 grid grid-cols-3 gap-6 items-center">
          {/* bucket */}
          <div className="col-span-1 flex flex-col items-center">
            <div className="relative w-40 h-48 rounded-lg bg-slate-800/40 border border-white/6 flex items-end p-3">
              {/* tokens stack */}
              <div className="w-full flex flex-col-reverse gap-2">
                {Array.from({ length: tokens }).map((_, i) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="h-3 rounded-md bg-emerald-400/90"
                  />
                ))}
              </div>

              {/* gauge overlay */}
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/6 border border-white/5 text-xs"
                animate={{ scale: [1, 1.06, 1], opacity: [0.9, 1, 0.95] }}
                transition={{ repeat: Infinity, duration: 2.4 }}
              >
                refill: 1 token / 1.8s
              </motion.div>
            </div>
            <div className="mt-4 text-sm text-slate-300">Token bucket (capacity: 10)</div>
          </div>

          {/* requests stream */}
          <div className="col-span-2">
            <div className="relative h-48 bg-gradient-to-b from-slate-900/0 to-slate-800/10 rounded-lg p-4 border border-white/4 overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                {/* incoming requests */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute left-[-6%] top-[10%]"
                    initial={{ x: -120, y: i * 32 }}
                    animate={{ x: ["-120%", "110%"] }}
                    transition={{ repeat: Infinity, duration: 4 + (i % 3), delay: i * 0.18, ease: "linear" }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs text-slate-200">REQ</div>
                      <motion.div
                        animate={{ scale: [1, 1.06, 1] }}
                        transition={{ repeat: Infinity, duration: 2 + (i % 2) }}
                        className={`w-28 p-2 rounded-md bg-white/5 ${i % 3 === 0 ? "border border-amber-400/20" : ""}`}
                      >
                        <div className="text-xs text-slate-200">service.call()</div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}

                {/* rejection flash */}
                <motion.div
                  className="absolute right-6 top-6 px-3 py-1 rounded-md bg-red-500/80 text-xs text-white shadow"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: [0, 1, 0], y: [-6, 0, -6] }}
                  transition={{ repeat: Infinity, duration: 3.6, delay: 1 }}
                >
                  Rate limited — 429
                </motion.div>
              </div>
            </div>

            <div className="mt-4 text-sm text-slate-300">
              Tokens are consumed per request; refill rate controls throughput and burst capacity.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide2_RateLimiting;
```

## Slide3_CAPTheorem.jsx

```jsx
import React from "react";
import { motion } from "framer-motion";
import { CloudCog, ServerCog, Activity } from "lucide-react";

/**
 * Visual metaphor:
 * - Three pillars: Consistency, Availability, Partition tolerance
 * - Animated requests trying to reach nodes; when partitioned, trade-offs animate
 */

const Pillar = ({ title, color, icon: Icon, highlight }) => (
  <motion.div
    className={`flex-1 p-6 rounded-xl bg-gradient-to-br ${color} border border-white/6 shadow-md`}
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: highlight ? -6 : 0, opacity: 1, scale: highlight ? 1.02 : 1 }}
    transition={{ duration: 0.6 }}
  >
    <div className="flex items-center gap-3">
      <div className="p-3 rounded-md bg-white/6">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-slate-200 mt-1">Core property</p>
      </div>
    </div>
  </motion.div>
);

const Slide3_CAPTheorem = () => {
  return (
    <div className="w-full h-screen bg-slate-900 text-white flex items-center justify-center overflow-hidden">
      <div className="w-[1100px] max-w-[95%] p-8 rounded-2xl bg-slate-900/60 border border-white/4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">CAP Theorem — Visual Simulation</h2>
            <p className="text-slate-300 mt-1">Pick two: Consistency, Availability, Partition tolerance</p>
          </div>
          <div className="text-sm text-slate-400">Simulated cluster · 3 nodes</div>
        </div>

        <div className="mt-6 flex gap-6">
          <Pillar title="Consistency" color="from-indigo-600 to-violet-600" icon={CloudCog} highlight />
          <Pillar title="Availability" color="from-emerald-600 to-teal-600" icon={Activity} />
          <Pillar title="Partition Tolerance" color="from-rose-600 to-pink-600" icon={ServerCog} />
        </div>

        {/* cluster simulation */}
        <div className="mt-8 relative">
          <div className="grid grid-cols-3 gap-6">
            {["Node A", "Node B", "Node C"].map((label, i) => (
              <motion.div
                key={label}
                className="p-4 rounded-xl bg-slate-800/40 border border-white/6 flex flex-col items-center gap-3"
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 * i }}
              >
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-slate-700/60 to-slate-800/60 flex items-center justify-center">
                  <div className="text-sm font-medium">{label}</div>
                </div>

                <div className="w-full flex items-center justify-center gap-2">
                  {/* status dot */}
                  <motion.div
                    className="w-3 h-3 rounded-full"
                    animate={{ backgroundColor: ["#34D399", "#F59E0B", "#EF4444"][i % 3] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  />
                  <div className="text-xs text-slate-300">replica</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* network partition event */}
          <motion.div
            className="absolute inset-x-0 top-[-18px] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="px-3 py-1 rounded-full bg-white/6 text-xs text-slate-200 border border-white/6">
              Network partition detected — split brain risk
            </div>
          </motion.div>

          {/* request flow lines */}
          <div className="absolute inset-0 pointer-events-none">
            {/* requests from left to center */}
            <motion.div
              className="absolute left-6 top-28 flex gap-2"
              initial={{ x: -120 }}
              animate={{ x: 0 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            >
              <motion.div className="w-4 h-2 rounded-full bg-white/80" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 1.2 }} />
              <motion.div className="w-4 h-2 rounded-full bg-white/80" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1.1 }} />
            </motion.div>

            {/* blocked link to Node C to show partition */}
            <motion.div
              className="absolute right-24 top-16 w-[1px] h-36 bg-white/6"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: [0.6, 0.12, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.8 }}
            >
              <div className="absolute -left-6 -top-3 px-2 py-1 rounded text-xs bg-red-600/80">partitioned</div>
            </motion.div>
          </div>
        </div>

        {/* trade-off visualization */}
        <div className="mt-8 flex items-center gap-6">
          <motion.div
            className="flex-1 p-4 rounded-lg bg-white/5 border border-white/6"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-slate-300">When partition occurs:</div>
            <ul className="mt-3 text-sm text-slate-200 space-y-2">
              <li>• Choose Consistency + Partition tolerance → sacrifice Availability</li>
              <li>• Choose Availability + Partition tolerance → allow eventual consistency</li>
            </ul>
          </motion.div>

          <motion.div
            className="w-48 p-4 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/6"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs text-slate-300">Quick hint</div>
            <div className="mt-2 font-semibold">No system can guarantee all three under network partition.</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide3_CAPTheorem;
```

## Slide4_OAuth2Flow.jsx

```jsx
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
```

## Slide5_MicroservicesArch.jsx

```jsx
import React from "react";
import { motion } from "framer-motion";
import { Grid, Cpu, Zap } from "lucide-react";

/**
 * Visualize microservices architecture:
 * - Many small services (cards) communicating via API Gateway / Message Bus
 * - Animated events across bus, service scaling animation (pop)
 */

const Service = ({ name, color, scaleDelay = 0 }) => (
  <motion.div
    className={`p-3 rounded-lg ${color} border border-white/6 shadow-sm min-w-[140px]`}
    initial={{ scale: 0.98, opacity: 0 }}
    animate={{ scale: [1, 1.02, 1], opacity: 1 }}
    transition={{ duration: 0.8, delay: scaleDelay, repeat: Infinity, repeatDelay: 4 }}
  >
    <div className="flex items-center gap-3">
      <div className="p-2 rounded bg-white/6">
        <Cpu className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="font-semibold text-sm">{name}</div>
        <div className="text-xs text-slate-200">stateless</div>
      </div>
    </div>
  </motion.div>
);

const Slide5_MicroservicesArch = () => {
  return (
    <div className="w-full h-screen bg-slate-900 text-white flex items-center justify-center overflow-hidden">
      <div className="w-[1200px] max-w-[95%] p-8 rounded-2xl bg-slate-900/50 border border-white/5 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-md bg-gradient-to-br from-indigo-600 to-violet-600">
              <Grid className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Microservices Architecture</h2>
              <p className="text-slate-300 mt-1">Service decomposition, API gateway, message bus</p>
            </div>
          </div>

          <div className="text-sm text-slate-400">scale independently · resilience</div>
        </div>

        <div className="mt-8 flex gap-6 items-start">
          {/* left: services */}
          <div className="flex flex-col gap-4 w-1/2">
            <div className="flex gap-4">
              <Service name="Auth" color="bg-indigo-700/40" scaleDelay={0} />
              <Service name="Users" color="bg-emerald-700/40" scaleDelay={0.3} />
              <Service name="Payments" color="bg-rose-600/40" scaleDelay={0.6} />
            </div>

            <div className="flex gap-4">
              <Service name="Search" color="bg-sky-600/40" scaleDelay={0.9} />
              <Service name="Notifications" color="bg-yellow-600/40" scaleDelay={1.2} />
            </div>
          </div>

          {/* center: bus and gateway */}
          <div className="w-1/2 flex flex-col items-center gap-6">
            <motion.div
              className="w-full p-4 rounded-lg bg-white/5 border border-white/6"
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-white/6">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">API Gateway</div>
                    <div className="text-xs text-slate-300">routing · auth · rate limiting</div>
                  </div>
                </div>

                <div className="text-xs text-slate-300">Ingress</div>
              </div>
            </motion.div>

            <div className="w-full h-36 relative bg-slate-800/30 rounded-lg p-4 border border-white/6 overflow-hidden">
              {/* message bus particles */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-amber-400/90"
                  initial={{ x: i * 20, y: 12 + (i % 3) * 14, opacity: 0.9 }}
                  animate={{ x: [i * 20, 720 - i * 20], opacity: [0.9, 0.4, 0.9] }}
                  transition={{ repeat: Infinity, duration: 6 + (i % 4), delay: i * 0.12, ease: "linear" }}
                />
              ))}

              <div className="absolute left-4 bottom-3 text-xs text-slate-300">Event bus → publish / subscribe</div>
            </div>

            <motion.div
              className="w-full p-3 rounded-lg bg-white/5 border border-white/6 text-sm text-slate-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Services scale independently; messages travel across the bus — decoupling producers and consumers.
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide5_MicroservicesArch;
```

## Slide6_ResiliencePatterns.jsx

```jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Repeat, ShieldCheck } from "lucide-react";

/**
 * Shows Circuit Breaker, Retry, Bulkhead patterns with interactive toggles and animated state transitions
 */

const PatternCard = ({ title, icon: Icon, children, active }) => (
  <motion.div
    className={`p-4 rounded-lg border border-white/6 min-w-[220px] ${active ? "bg-emerald-700/8" : "bg-slate-800/30"}`}
    initial={{ scale: 0.98, opacity: 0 }}
    animate={{ scale: active ? 1.02 : 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-3">
      <div className="p-2 rounded bg-white/6">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-slate-300 mt-1">{children}</div>
      </div>
    </div>
  </motion.div>
);

const Slide6_ResiliencePatterns = () => {
  const [active, setActive] = useState("circuit");

  return (
    <div className="w-full h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="w-[1100px] max-w-[95%] p-8 rounded-2xl bg-slate-900/50 border border-white/5 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Resilience Patterns</h2>
            <p className="text-slate-300 mt-1">Circuit breaker · Retry · Bulkhead</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm text-slate-400">Interactive</div>
          </div>
        </div>

        <div className="mt-6 flex gap-6">
          <div className="flex flex-col gap-4 w-1/2">
            <div className="flex gap-4">
              <button
                onClick={() => setActive("circuit")}
                className={`px-3 py-2 rounded ${active === "circuit" ? "bg-white/6" : "bg-white/3/10"}`}
              >
                Circuit
              </button>
              <button
                onClick={() => setActive("retry")}
                className={`px-3 py-2 rounded ${active === "retry" ? "bg-white/6" : "bg-white/3/10"}`}
              >
                Retry
              </button>
              <button
                onClick={() => setActive("bulkhead")}
                className={`px-3 py-2 rounded ${active === "bulkhead" ? "bg-white/6" : "bg-white/3/10"}`}
              >
                Bulkhead
              </button>
            </div>

            <div className="mt-2 grid grid-cols-3 gap-4">
              <PatternCard title="Circuit Breaker" icon={AlertTriangle} active={active === "circuit"}>
                Open on failures, short-circuit calls to fail fast.
              </PatternCard>
              <PatternCard title="Retry" icon={Repeat} active={active === "retry"}>
                Backoff and bounded retries to handle transient errors.
              </PatternCard>
              <PatternCard title="Bulkhead" icon={ShieldCheck} active={active === "bulkhead"}>
                Isolate failures with resource partitions.
              </PatternCard>
            </div>
          </div>

          {/* simulation panel */}
          <div className="w-1/2">
            <div className="p-4 rounded-lg bg-white/5 border border-white/6 h-[260px]">
              <div className="text-sm text-slate-300">Simulation</div>

              <div className="mt-6 flex items-center gap-4">
                <div className="w-2/3">
                  <div className="relative h-24 bg-slate-800/30 rounded-lg p-4 overflow-hidden">
                    {/* service node */}
                    <motion.div
                      className="absolute left-6 top-6 w-32 h-12 rounded-md bg-slate-700/60 flex items-center justify-center"
                      animate={{ x: active === "bulkhead" ? [0, 12, -12, 0] : 0 }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                    >
                      <div className="text-xs">downstream service</div>
                    </motion.div>

                    {/* client requests */}
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute left-[-10%] top-[6%]"
                        initial={{ x: -120 }}
                        animate={{ x: active === "circuit" && i > 2 ? -40 : 720 }}
                        transition={{
                          duration: active === "retry" ? 4 : 3 + (i % 3),
                          repeat: Infinity,
                          ease: "linear",
                          delay: i * 0.18
                        }}
                      >
                        <div className="w-12 h-6 rounded bg-white/6 flex items-center justify-center text-xs">
                          REQ
                        </div>
                      </motion.div>
                    ))}

                    {/* circuit breaker shield */}
                    <motion.div
                      className="absolute right-6 top-6 px-3 py-1 rounded bg-red-600/80 text-xs"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: active === "circuit" ? [0.9, 1.06, 1] : 0.9, opacity: active === "circuit" ? 1 : 0.25 }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                      Circuit: {active === "circuit" ? "OPEN" : "CLOSED"}
                    </motion.div>
                  </div>
                </div>

                <div className="w-1/3">
                  <div className="text-sm text-slate-300">Status</div>
                  <div className="mt-2 p-3 rounded bg-white/6 text-sm">
                    {active === "circuit" && <div>Fail ratio high → fast-fail (open)</div>}
                    {active === "retry" && <div>Retries with backoff until success or limit reached</div>}
                    {active === "bulkhead" && <div>Requests routed to isolated pool to protect others</div>}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-300">
              Combine patterns: retries with circuit breakers and bulkheads to design robust systems.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide6_ResiliencePatterns;
```
