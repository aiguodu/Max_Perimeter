import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Loader2, Pause } from 'lucide-react';
import { TTSState } from '../services/ttsService';

interface SubtitleOverlayProps {
  text: string;
  ttsState: TTSState;
  progress: number;
}

export const SubtitleOverlay: React.FC<SubtitleOverlayProps> = ({ text, ttsState, progress }) => {
  const isVisible = ttsState !== 'idle' || text !== '';

  return (
    <div className="absolute bottom-6 left-0 right-0 flex justify-center px-4 pointer-events-none z-10">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-[90%] max-w-lg bg-slate-900/70 backdrop-blur-md rounded-2xl p-4 shadow-2xl pointer-events-auto border border-white/10"
          >
            <div className="flex items-start space-x-3">
              {/* 状态图标 */}
              <div className="flex-shrink-0 mt-1">
                {ttsState === 'loading' && <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />}
                {ttsState === 'playing' && <Volume2 className="w-5 h-5 text-emerald-400 animate-pulse" />}
                {ttsState === 'paused' && <Pause className="w-5 h-5 text-amber-400" />}
                {ttsState === 'idle' && <Volume2 className="w-5 h-5 text-slate-400" />}
              </div>
              
              {/* 字幕内容区 */}
              <div className="flex-1 min-w-0">
                <div className="max-h-[80px] overflow-y-auto pr-2 custom-scrollbar">
                  <p className="text-white/95 text-sm md:text-base leading-relaxed font-medium tracking-wide">
                    {text}
                  </p>
                </div>
                
                {/* 进度条 */}
                {(ttsState === 'playing' || ttsState === 'paused') && (
                  <div className="mt-3 h-1 w-full bg-slate-700/50 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "linear", duration: 0.2 }}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
