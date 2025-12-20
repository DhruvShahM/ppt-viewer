<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# please give me the code in the md content

```jsx
// Slide_11.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Hand, Lightbulb, Share2 } from 'lucide-react';

const Slide11_YourRole = () => {
  const actions = [
    {
      icon: Hand,
      title: "Advocate",
      subtitle: "Break the stigma around mental health",
      detail: "Normalize conversations, share your story, ask for help"
    },
    {
      icon: Zap,
      title: "Optimize",
      subtitle: "Use tools that exist today",
      detail: "Apps, teletherapy, communities—leverage them"
    },
    {
      icon: Lightbulb,
      title: "Innovate",
      subtitle: "Build the future of mental healthcare",
      detail: "Code, research, design—contribute your skills"
    },
    {
      icon: Share2,
      title: "Connect",
      subtitle: "Help others find resources & support",
      detail: "Be the bridge between people and help"
    }
  ];

  return (
    <div className="w-full h-screen flex items-center justify-center p-12 relative overflow-hidden">
      {/* Background animated elements (optional – remove if you want zero background visuals) */}
      {/* <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{ x: [-100, 100], y: [-100, 100] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      /> */}

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.h2
          className="text-5xl font-bold text-white mb-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your Role in This Future
        </motion.h2>

        <motion.div
          className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-12"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <div className="grid grid-cols-2 gap-8 mb-12">
          {actions.map((action, i) => {
            const Icon = action.icon;

            return (
              <motion.div
                key={i}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-slate-600 transition-all group relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, borderColor: "rgba(148, 163, 184, 1)" }}
              >
                <motion.div
                  className="mb-4 inline-block"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Icon className="w-10 h-10 text-blue-400" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-2">{action.title}</h3>
                <p className="text-gray-400 mb-3 font-semibold text-sm">{action.subtitle}</p>
                <p className="text-gray-300 text-base leading-relaxed">{action.detail}</p>

                {/* Hover indicator */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-gray-300 text-lg mb-6">
            The future of mental health won't be handed to us.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 font-semibold">
              We have to build it together.
            </span>
          </p>

          <motion.div
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-8 py-4 rounded-full border border-blue-500/50 backdrop-blur"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-white font-semibold">Start today</span>
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              →
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide11_YourRole;
```

```jsx
// Slide_12.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Brain } from 'lucide-react';

const Slide12_Conclusion = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center p-12 relative overflow-hidden">
      {/* Animated gradient orb (optional – remove if you want zero background visuals) */}
      {/* <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="w-96 h-96 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: 360
          }}
          transition={{
            scale: { duration: 4, repeat: Infinity, repeatType: 'reverse' },
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' }
          }}
        />
      </motion.div> */}

      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
        {/* Icons trio */}
        <motion.div
          className="flex justify-center gap-8 mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {[
            { icon: Heart, color: 'text-pink-400' },
            { icon: Brain, color: 'text-purple-400' },
            { icon: Sparkles, color: 'text-blue-400' }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                animate={{ y: [0, -15, 0] }}
                transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
              >
                <Icon className={`w-12 h-12 ${item.color}`} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="text-6xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Yes, Your Generation
          <br />
          <motion.span
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
            animate={{ backgroundPosition: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Will Be Healthier
          </motion.span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-gray-300 text-2xl mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Not because the challenges disappear.
          <br />
          Because the tools, understanding, and community will finally catch up.
        </motion.p>

        {/* Key statistics callout */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {[
            { value: '54%', label: 'Already improving' },
            { value: '24/7', label: 'Support availability' },
            { value: '87%', label: 'Intervention success' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-4"
              whileHover={{ scale: 1.05, borderColor: 'rgba(148, 163, 184, 1)' }}
            >
              <motion.div
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
              >
                {stat.value}
              </motion.div>
              <p className="text-gray-400 text-xs mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Final reflection */}
        <motion.div
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/50 rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p className="text-gray-200 text-lg italic leading-relaxed">
            "A positive future isn't determined by the absence of challenges, but by our willingness
            to imagine one, and the tools we build to make it real."
          </p>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.div
            className="inline-block"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-white text-2xl font-bold">
              The future is not decided.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
                It's being built right now.
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide12_Conclusion;
```

<span style="display:none">[^1][^10][^11][^12][^13][^14][^15][^16][^17][^18][^19][^2][^20][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://tailwindcss.com/docs/background-color

[^2]: https://shuffle.dev/tailwind/classes/background-color/bg-transparent

[^3]: https://github.com/tailwindlabs/tailwindcss/discussions/10548

[^4]: https://v2.tailwindcss.com/docs/background-opacity

[^5]: https://tailscan.com/tailwind/backgrounds/bg-transparent

[^6]: https://github.com/tailwindlabs/tailwindcss/discussions/3433

[^7]: https://tailwind.build/classes/background-color/bg-transparent

[^8]: https://blog.logrocket.com/guide-adding-gradients-tailwind-css/

[^9]: https://www.geeksforgeeks.org/css/tailwind-css-background-color/

[^10]: https://www.youtube.com/watch?v=5UPdRF5xpVM

[^11]: https://stackoverflow.com/questions/69856261/tailwind-bg-opacity

[^12]: https://stackoverflow.com/questions/66785996/cant-override-linear-gradient-in-tailwind

[^13]: https://www.geeksforgeeks.org/css/tailwind-css-background-opacity/

[^14]: https://tailwindcss.com/docs/background-image

[^15]: https://kombai.com/tailwind/background-color/

[^16]: https://www.creative-tim.com/twcomponents/gradient-generator

[^17]: https://v2.tailwindcss.com/docs/gradient-color-stops

[^18]: https://pagedone.io/docs/gradient

[^19]: https://www.geeksforgeeks.org/css/how-to-change-the-direction-of-a-gradient-in-tailwind-css/

[^20]: https://www.youtube.com/watch?v=hPpxdigttTI

