import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GeometrySVGProps {
  step: number;
}

export const GeometrySVG: React.FC<GeometrySVGProps> = ({ step }) => {
  // 核心坐标点 (基于数学推导，适配 SVG 坐标系)
  const A = { x: 313, y: 63 };
  const B = { x: 113, y: 263 };
  const C = { x: 150, y: 400 };
  const D = { x: 350, y: 400 };
  
  // 辅助点 E (平移 CD 至 BE)
  const E = { x: 313, y: 263 };

  // 动画配置
  const lineTransition = { duration: 1.5, ease: "easeInOut" };
  const fadeTransition = { duration: 0.8 };

  return (
    <div className="w-full h-full flex items-start pt-8 justify-center relative">
      {/* viewBox 增加底部冗余，防止字幕遮挡 */}
      <svg viewBox="0 0 500 500" className="w-full max-w-[450px] h-auto drop-shadow-sm">
        
        {/* 基础四边形 ABCD (始终显示) */}
        <polygon 
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`}
          fill="transparent"
          stroke="#334155"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* 顶点标签 (始终显示) */}
        <text x={A.x} y={A.y - 10} textAnchor="middle" className="font-serif italic text-lg fill-slate-700">A</text>
        <text x={B.x - 15} y={B.y + 5} textAnchor="end" className="font-serif italic text-lg fill-slate-700">B</text>
        <text x={C.x - 10} y={C.y + 20} textAnchor="middle" className="font-serif italic text-lg fill-slate-700">C</text>
        <text x={D.x + 10} y={D.y + 20} textAnchor="middle" className="font-serif italic text-lg fill-slate-700">D</text>

        {/* 步骤 1: 高亮目标边 AD */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.line
              x1={A.x} y1={A.y} x2={D.x} y2={D.y}
              stroke="#3b82f6" // blue-500
              strokeWidth="4"
              strokeDasharray="6 6"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </AnimatePresence>

        {/* 步骤 2: 平移 CD 至 BE，连接 AE, ED */}
        <AnimatePresence>
          {step >= 2 && (
            <>
              {/* 辅助线 BE */}
              <motion.line
                x1={B.x} y1={B.y} x2={E.x} y2={E.y}
                stroke="#ef4444" // red-500
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={lineTransition}
              />
              {/* 辅助线 AE */}
              <motion.line
                x1={A.x} y1={A.y} x2={E.x} y2={E.y}
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ ...lineTransition, delay: 0.5 }}
              />
              {/* 辅助线 ED (平行四边形) */}
              <motion.line
                x1={E.x} y1={E.y} x2={D.x} y2={D.y}
                stroke="#10b981" // emerald-500
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ ...lineTransition, delay: 1 }}
              />
              {/* 标签 E */}
              <motion.text 
                x={E.x + 15} y={E.y + 5} 
                className="font-serif italic text-lg fill-red-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                E
              </motion.text>
            </>
          )}
        </AnimatePresence>

        {/* 步骤 3 & 4: 高亮三角形 ABE */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.polygon
              points={`${A.x},${A.y} ${B.x},${B.y} ${E.x},${E.y}`}
              fill="rgba(59, 130, 246, 0.15)" // blue-500 with opacity
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={fadeTransition}
            />
          )}
        </AnimatePresence>

        {/* 步骤 3: 标注角度 45° */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {/* 简单的弧线表示角度 */}
              <path 
                d={`M ${B.x + 20} ${B.y - 20} A 30 30 0 0 1 ${B.x + 30} ${B.y}`} 
                fill="transparent" 
                stroke="#ef4444" 
                strokeWidth="2" 
              />
              <text x={B.x + 35} y={B.y - 15} className="text-sm fill-red-600 font-serif">45°</text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* 步骤 4: 标注 AE = 2 及直角符号 */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* 直角符号 (在 E 点) */}
              <path 
                d={`M ${E.x - 15} ${E.y} L ${E.x - 15} ${E.y - 15} L ${E.x} ${E.y - 15}`} 
                fill="transparent" 
                stroke="#ef4444" 
                strokeWidth="2" 
              />
              
              {/* 标注 AE = 2 */}
              <motion.text
                x={(A.x + E.x) / 2 + 10} 
                y={(A.y + E.y) / 2}
                className="font-serif font-bold text-lg fill-purple-600"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 1 }}
              >
                2
              </motion.text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* 步骤 5: 高亮三角形 AED (展示三角不等式) */}
        <AnimatePresence>
          {step >= 5 && (
            <motion.polygon
              points={`${A.x},${A.y} ${E.x},${E.y} ${D.x},${D.y}`}
              fill="rgba(244, 63, 94, 0.1)" // rose-500 with opacity
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={fadeTransition}
            />
          )}
        </AnimatePresence>

      </svg>
    </div>
  );
};
