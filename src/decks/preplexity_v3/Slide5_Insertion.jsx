import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, RotateCcw } from 'lucide-react';

const Slide5_Insertion = () => {
  const word = 'HELLO';
  const letters = word.split('');
  const nodes = ['ROOT', ...letters];

  const [isAnimating, setIsAnimating] = useState(false);
  const [step, setStep] = useState(0);

  /* ============= PROPERLY SYNCED STEPS ============= */
  const steps = useMemo(() => {
    const s = [
      {
        label: 'Start at ROOT',
        description: 'Initialize from root node',
        activeNode: 'ROOT',
      },
    ];

    // For each letter: Insert step, then Move step
    letters.forEach((letter, idx) => {
      s.push({
        label: `Insert '${letter}'`,
        description: `Create node ${letter}`,
        activeNode: idx === 0 ? 'ROOT' : letters[idx - 1],
      });
      s.push({
        label: `Move to '${letter}'`,
        description: `Traverse to node ${letter}`,
        activeNode: letter,
      });
    });

    // Final step
    s.push({
      label: 'Mark End',
      description: 'Set isEndOfWord = true',
      activeNode: letters[letters.length - 1],
    });

    return s;
  }, [letters]);

  /* ============= AUTO-ANIMATION ============= */
  useEffect(() => {
    let t;
    if (isAnimating && step < steps.length - 1) {
      t = setTimeout(() => setStep((s) => s + 1), 800);
    }
    return () => clearTimeout(t);
  }, [isAnimating, step, steps.length]);

  /* ============= NODE POSITIONS ============= */
  const nodePositions = useMemo(() => {
    return nodes.reduce((acc, n, i) => {
      acc[n] = { x: 120, y: 40 + i * 70 };
      return acc;
    }, {});
  }, [nodes]);

  /* ============= EDGE VISIBILITY ============= */
  // Edge from nodes[i] to nodes[i+1] becomes visible when we insert or move to that edge
  // Edge i appears at step (2*i + 1) - the "Insert" step for that letter
  const isEdgeVisible = (toNodeIndex) => {
    // toNodeIndex ranges from 1 to letters.length
    const insertStep = 2 * toNodeIndex - 1; // Step index when this edge/node is created
    return step >= insertStep;
  };

  /* ============= NODE CREATION & STATE ============= */
  const isNodeCreated = (nodeIndex) => {
    if (nodeIndex === 0) return true; // ROOT always exists
    // Node i (1-indexed) is created at step (2*i - 1)
    const creationStep = 2 * nodeIndex - 1;
    return step >= creationStep;
  };

  const isNodeActive = (node) => {
    return node === steps[step]?.activeNode;
  };

  const isNodeCompleted = (nodeIndex) => {
    if (nodeIndex === 0) return false; // ROOT doesn't get checkmark
    // Node i is "done" after we move to it, which is at step (2*i)
    const doneStep = 2 * nodeIndex;
    return step > doneStep;
  };

  /* ============= RENDER ============= */
  return (
    <div className="w-full h-screen flex items-center justify-center p-12">



      <div className="flex gap-14 max-w-6xl w-full">
        {/* ============= SVG VISUALIZATION ============= */}
        <svg width="240" height="500">
          {/* -------- EDGES -------- */}
          {letters.map((char, idx) => {
            const from = nodePositions[nodes[idx]];
            const to = nodePositions[char];
            const visible = isEdgeVisible(idx + 1);

            return (
              <motion.line
                key={`edge-${char}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#60a5fa"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: visible ? 1 : 0,
                  opacity: visible ? 1 : 0.2,
                }}
                transition={{ duration: 0.5 }}
              />
            );
          })}

          {/* -------- NODES -------- */}
          {nodes.map((node, idx) => {
            const pos = nodePositions[node];
            const created = isNodeCreated(idx);
            const active = isNodeActive(node);
            const done = isNodeCompleted(idx);

            return (
              <g key={node}>
                {/* Node Circle */}
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r="18"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: created ? 1 : 0,
                    opacity: created ? 1 : 0,
                    fill: active
                      ? '#3b82f6' // Blue when active
                      : done
                        ? '#10b981' // Green when completed
                        : '#475569', // Gray otherwise
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Node Label */}
                <motion.text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontWeight="bold"
                  fontSize="14"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: created ? 1 : 0 }}
                  transition={{ delay: 0.15 }}
                >
                  {node}
                </motion.text>

                {/* Active Pulse Ring */}
                {active && (
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r="20"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    animate={{ r: [18, 28, 18], opacity: [0.8, 0.2, 0.8] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                )}

                {/* Completion Checkmark */}
                {done && !active && idx !== 0 && (
                  <motion.text
                    x={pos.x + 14}
                    y={pos.y - 12}
                    fill="#10b981"
                    fontSize="16"
                    fontWeight="bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    ✓
                  </motion.text>
                )}
              </g>
            );
          })}

          {/* -------- END FLAG ============= */}
          {step === steps.length - 1 && (
            <motion.g
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.circle
                cx={nodePositions[letters[letters.length - 1]].x}
                cy={nodePositions[letters[letters.length - 1]].y - 30}
                r="7"
                fill="#f59e0b"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
              <text
                x={nodePositions[letters[letters.length - 1]].x}
                y={nodePositions[letters[letters.length - 1]].y - 45}
                textAnchor="middle"
                fill="#f59e0b"
                fontSize="12"
                fontWeight="bold"
              >
                isEndOfWord
              </text>
            </motion.g>
          )}
        </svg>

        {/* ============= INFO PANEL ============= */}
        <div className="flex-1 space-y-6">
          {/* Step Display */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-blue-400">
              {steps[step]?.label}
            </h3>
            <p className="text-slate-300 mt-2">{steps[step]?.description}</p>
            <p className="text-xs text-slate-400 mt-2">
              Step {step + 1} / {steps.length}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="bg-slate-800 h-2 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Controls */}
          <div className="flex gap-4">
            <button
              onClick={() => setIsAnimating((p) => !p)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 py-3 rounded-lg font-bold flex justify-center gap-2 items-center text-white transition"
            >
              <PlayCircle size={18} />
              {isAnimating ? 'Pause' : 'Play'}
            </button>

            <button
              onClick={() => {
                setStep(0);
                setIsAnimating(false);
              }}
              className="flex-1 bg-slate-700 hover:bg-slate-600 py-3 rounded-lg font-bold flex justify-center gap-2 items-center text-white transition"
            >
              <RotateCcw size={18} />
              Reset
            </button>
          </div>

          {/* Complexity Info */}
          <div className="bg-slate-800 p-4 rounded-lg font-mono text-green-400 border border-slate-700">
            <div className="text-sm">Time Complexity</div>
            <div className="text-lg font-bold">O(m) - m = word length</div>
          </div>

          {/* Active Node Info */}
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <p className="text-slate-400 text-sm">Current Active Node</p>
            <p className="text-white font-mono text-xl">
              {steps[step]?.activeNode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide5_Insertion;
