
# AI Slide Generation Prompt

**Copy and paste the text below to instruct any AI assistant (like ChatGPT, Claude, or Gemini) to generate compatible slides for this project.**

---

**Role:** You are an expert Frontend Developer and Motion Graphics Designer specializing in React, Tailwind CSS, and Framer Motion.

**Goal:** Create a visually stunning, animated presentation slide component for a React application.

## 1. Technical Requirements
*   **Framework:** React (Functional Component).
*   **Styling:** Tailwind CSS. Use `bg-slate-950` for the background and `text-white`. Use gradients (e.g., `bg-gradient-to-r from-cyan-400 to-blue-500`) for text or accents.
*   **Animation:** `framer-motion` (Imports: `motion`, `AnimatePresence`).
    *   Use `initial`, `animate`, `exit` props.
    *   Create continuous loops for diagrams using `transition: { repeat: Infinity }`.
*   **Icons:** `lucide-react` (e.g., `Zap`, `Server`, `Database`).
*   **File Format:** Single `.jsx` file.
*   **Delivery:** Bundle all files into a single Markdown response. Use `## Filename.jsx` as a separator header before each file's code block.

## 2. File Naming & Export Standards (CRITICAL)
To prevent syntax errors, follow these rules strictly:
*   **PascalCase naming:** Use PascalCase for all React components and filenames (e.g., `SlideTitleCard.jsx`).
*   **Valid Identifiers:** Component names and import variables must be valid JS identifiers (e.g., `import Slide1_Title from './Slide1_Title.jsx'`).
*   **NO DOTS in variables:** Do NOT include dots in variable names (e.g., do NOT use `import Slide1.jsx from ...`).
*   **No Messy Filenames:** Do NOT use double underscores (e.g., `__Slide1.jsx__`) or double extensions (e.g., `Slide1.jsx.jsx`).
*   **Single Extension:** Use exactly one `.jsx` extension.
*   **Clean Exports:** Each file must have exactly one `export default ComponentName;`.
*   **DO NOT generate Setup_Instructions.jsx** - All dependencies are already installed in the project.

## 3. Component Boilerplate (MUST FOLLOW)
Use this exact structure for compatibility:

```javascript
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react'; // Add icons you need

const SlideComponent = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 text-white p-8 relative overflow-hidden">

            {/* 2. Main Content (Z-Index 10) */}
            <div className="z-10 text-center max-w-5xl w-full">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                >
                    [INSERT TITLE HERE]
                </motion.h2>

                <div className="flex items-center justify-center gap-12">
                     {/* INSERT DIAGRAM / CONTENT HERE */}
                     {/* Use motion.div for animated boxes, circles, paths */}
                </div>
            </div>
        </div>
    );
};

export default SlideComponent;
```

## 4. Design Guidelines
*   **Dark Mode Only:** The app is strictly dark mode.
*   **No Heavy Libraries:** Do not use `recharts` or `threejs` unless explicitly asked. Built diagrams using CSS/Divs/SVG.
*   **Visual Hierarchy:** Titles should be large (text-5xl+), Body text should be readable (text-lg/xl).
*   **Color Palette:** Slate (900/950) for backgrounds. Blue, Cyan, Purple, Pink, Emerald for accents.

## 5. Task
Generate a slide on the following topic:
**[INSERT YOUR TOPIC HERE]**

(Describe what you want to see, e.g., "Show a load balancer distributing requests to three servers.")
