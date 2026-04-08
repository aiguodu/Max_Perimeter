import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { steps } from '../data/steps';

interface StepPanelProps {
  step: number;
}

export const StepPanel: React.FC<StepPanelProps> = ({ step }) => {
  const currentData = steps[step];

  return (
    <div className="w-full h-full bg-slate-50 border-l border-slate-200 p-6 md:p-8 flex flex-col overflow-y-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col space-y-6"
        >
          {/* 标题区 */}
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-200">
            <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
              {currentData.icon}
            </div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              {currentData.title}
            </h2>
          </div>

          {/* 核心结论 */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-blue-500">
            <p className="text-slate-700 font-medium">
              {currentData.desc}
            </p>
          </div>

          {/* 详细推导 */}
          <div className="prose prose-slate prose-sm max-w-none">
            {currentData.detail}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
