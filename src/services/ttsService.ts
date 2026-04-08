export type TTSState = 'idle' | 'loading' | 'playing' | 'paused';

class TTSService {
  private synth = window.speechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null;
  private onStateChange: ((state: TTSState) => void) | null = null;
  private onProgress: ((progress: number) => void) | null = null;
  private progressInterval: number | null = null;

  // 模拟后端 API 接口地址
  // 实际使用时，请在 vite.config.ts 中配置代理，将 /api/tts 转发到后端
  private readonly API_URL = '/api/tts';

  public setCallbacks(
    onStateChange: (state: TTSState) => void,
    onProgress: (progress: number) => void
  ) {
    this.onStateChange = onStateChange;
    this.onProgress = onProgress;
  }

  public async play(text: string) {
    this.stop();
    this.setState('loading');

    try {
      // ==========================================
      // 真实后端调用示例 (被注释)
      // ==========================================
      /*
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (!response.ok) throw new Error('TTS API failed');
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onplay = () => this.setState('playing');
      audio.onended = () => this.setState('idle');
      audio.ontimeupdate = () => {
        if (this.onProgress) {
          this.onProgress((audio.currentTime / audio.duration) * 100);
        }
      };
      await audio.play();
      return;
      */

      // ==========================================
      // 浏览器原生 SpeechSynthesis 降级方案 (用于演示)
      // ==========================================
      // 模拟一点网络延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      this.utterance = new SpeechSynthesisUtterance(text);
      this.utterance.lang = 'zh-CN';
      this.utterance.rate = 1.0;

      this.utterance.onstart = () => {
        this.setState('playing');
        this.startProgressSimulation();
      };

      this.utterance.onend = () => {
        this.setState('idle');
        this.stopProgressSimulation();
        if (this.onProgress) this.onProgress(100);
      };

      this.utterance.onerror = () => {
        this.setState('idle');
        this.stopProgressSimulation();
      };

      this.synth.speak(this.utterance);

    } catch (error) {
      console.error('TTS Error:', error);
      this.setState('idle');
    }
  }

  public stop() {
    this.synth.cancel();
    this.stopProgressSimulation();
    this.setState('idle');
    if (this.onProgress) this.onProgress(0);
  }

  private setState(state: TTSState) {
    if (this.onStateChange) {
      this.onStateChange(state);
    }
  }

  // 模拟进度条 (因为原生 SpeechSynthesis 不提供精确进度)
  private startProgressSimulation() {
    this.stopProgressSimulation();
    let progress = 0;
    this.progressInterval = window.setInterval(() => {
      progress += 1; // 假设每100ms增加1%，总时长约10秒
      if (progress > 95) progress = 95; // 留一点等 onend 触发
      if (this.onProgress) this.onProgress(progress);
    }, 100);
  }

  private stopProgressSimulation() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }
}

export const ttsService = new TTSService();
