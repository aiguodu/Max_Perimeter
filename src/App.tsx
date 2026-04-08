import React, { useState, useEffect } from 'react';
import { GeometrySVG } from './components/GeometrySVG';
import { StepPanel } from './components/StepPanel';
import { SubtitleOverlay } from './components/SubtitleOverlay';
import { steps } from './data/steps';
import { ttsService, TTSState } from './services/ttsService';
import { ChevronLeft, ChevronRight, RotateCcw, Play } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState(0);
  const [ttsState, setTtsState] = useState<TTSState>('idle');
  const [ttsProgress, setTtsProgress] = useState(0);

  useEffect(() => {
    ttsService.setCallbacks(setTtsState, setTtsProgress);
    return () => {
      ttsService.stop();
    };
  }, []);

  // 当步骤切换时，自动停止上一段语音，并播放新语音
  useEffect(() => {
    ttsService.play(steps[step].tts);
  }, [step]);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setStep(0);
  };

  const handleReplayTTS = () => {
    ttsService.play(steps[step].tts);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col border border-slate-200">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
              几何动点极值
            </span>
            <h1 className="text-lg font-bold text-slate-800">
              四边形周长最大值问题
            </h1>
          </div>
          <div className="text-sm text-slate-500 font-medium">
            步骤 {step + 1} / {steps.length}
          </div>
        </header>

        {/* Main Content Area (Fixed Height 570px) */}
        <main className="flex flex-col md:flex-row h-[570px]">
          
          {/* Left: Geometry SVG Area (55%) */}
          <div className="w-full md:w-[55%] h-full bg-white relative overflow-hidden">
            <GeometrySVG step={step} />
            <SubtitleOverlay 
              text={steps[step].tts} 
              ttsState={ttsState} 
              progress={ttsProgress} 
            />
          </div>

          {/* Right: Logic & Step Panel (45%) */}
          <div className="w-full md:w-[45%] h-full">
            <StepPanel step={step} />
          </div>

        </main>

        {/* Footer Controls */}
        <footer className="h-20 bg-white border-t border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              <span>重新开始</span>
            </button>
            <button 
              onClick={handleReplayTTS}
              disabled={ttsState === 'playing' || ttsState === 'loading'}
              className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4" />
              <span>重播讲解</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={handlePrev}
              disabled={step === 0}
              className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>上一步</span>
            </button>
            <button 
              onClick={handleNext}
              disabled={step === steps.length - 1}
              className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm shadow-blue-200"
            >
              <span>下一步</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}
