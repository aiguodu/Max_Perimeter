import React from 'react';
import { Lightbulb, MoveRight, Triangle, Calculator, Maximize2, CheckCircle2 } from 'lucide-react';

export interface StepData {
  title: string;
  icon: React.ReactNode;
  desc: string;
  detail: React.ReactNode;
  tts: string;
}

export const steps: StepData[] = [
  {
    title: "第一步：解题思路与模型构建",
    icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
    desc: "利用“平移构造法”将分散的线段集中。",
    detail: (
      <div className="space-y-2 text-slate-700">
        <p>观察题目条件：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>已知三边长：<span className="font-serif italic">AB = 2√2, BC = √2, CD = 2</span></li>
          <li>已知两角和：<span className="font-serif italic">∠B + ∠C = 225°</span></li>
        </ul>
        <p>要求四边形周长的最大值，实际上就是求未知边 <span className="font-serif italic">AD</span> 的最大值。</p>
        <p>遇到这种“定长”和“定角和”的问题，通常采用<strong>平移构造法</strong>，利用向量加法 <span className="font-serif italic">AD = AB + BC + CD</span>，将分散的线段集中到一个三角形中求解。</p>
      </div>
    ),
    tts: "同学们好！这道题要求四边形周长的最大值，其实就是求未知边 AD 的最大值。题目给出了三条边的长度和两个角的和。遇到这种“定长”和“定角和”的问题，我们最常用的杀手锏就是“平移构造法”，把分散的条件集中到一起。"
  },
  {
    title: "第二步：平移线段 CD",
    icon: <MoveRight className="w-5 h-5 text-blue-500" />,
    desc: "作向量平移，构造新的几何关系。",
    detail: (
      <div className="space-y-2 text-slate-700">
        <p>作 <span className="font-serif italic">BE // CD</span> 且 <span className="font-serif italic">BE = CD = 2</span>。</p>
        <p>这相当于将向量 <span className="font-serif italic">CD</span> 平移到了 <span className="font-serif italic">BE</span> 的位置。</p>
        <p>根据向量加法法则：</p>
        <p className="bg-slate-100 p-2 rounded text-center font-serif italic">
          AD = AB + BC + CD<br/>
          = AB + BC + BE<br/>
          = (AB + BE) + BC<br/>
          = AE + BC
        </p>
        <p>同时，连接 <span className="font-serif italic">ED</span>，易得四边形 <span className="font-serif italic">BCDE</span> 为平行四边形，所以 <span className="font-serif italic">ED = BC</span>。</p>
      </div>
    ),
    tts: "我们先来做一条辅助线。将线段 CD 平移，起点放在 B 点，得到线段 BE。注意，这里是向量平移，也就是大小和方向都完全一样。这样一来，根据向量加法，AD 向量就等于 AE 向量加上 BC 向量了。同时，连接ED，你会发现BCDE其实是一个平行四边形。"
  },
  {
    title: "第三步：分析 △ABE",
    icon: <Triangle className="w-5 h-5 text-emerald-500" />,
    desc: "计算 △ABE 中的夹角 ∠ABE。",
    detail: (
      <div className="space-y-2 text-slate-700">
        <p>在 <span className="font-serif italic">△ABE</span> 中，已知 <span className="font-serif italic">AB = 2√2</span>，<span className="font-serif italic">BE = 2</span>。</p>
        <p>接下来计算它们的夹角 <span className="font-serif italic">∠ABE</span>：</p>
        <p>设 <span className="font-serif italic">BC</span> 方向为水平向右。则 <span className="font-serif italic">BA</span> 的方向角为 <span className="font-serif italic">∠B</span>。</p>
        <p><span className="font-serif italic">CD</span> 的方向角为 <span className="font-serif italic">180° - ∠C</span>。因为 <span className="font-serif italic">BE // CD</span>，所以 <span className="font-serif italic">BE</span> 的方向角也是 <span className="font-serif italic">180° - ∠C</span>。</p>
        <p>因此，<span className="font-serif italic">BA</span> 与 <span className="font-serif italic">BE</span> 的夹角：</p>
        <p className="bg-slate-100 p-2 rounded text-center font-serif italic">
          ∠ABE = ∠B - (180° - ∠C)<br/>
          = ∠B + ∠C - 180°
        </p>
        <p>已知 <span className="font-serif italic">∠B + ∠C = 225°</span>，所以 <span className="font-serif italic">∠ABE = 45°</span>。</p>
      </div>
    ),
    tts: "接下来我们把目光聚焦在三角形 ABE 上。AB 和 BE 的长度我们都知道，那它们的夹角是多少呢？通过简单的角度推导，利用已知条件角B加角C等于225度，我们可以算出，角 ABE 刚好等于 45 度！"
  },
  {
    title: "第四步：构造直角三角形求 AE",
    icon: <Calculator className="w-5 h-5 text-purple-500" />,
    desc: "过点 A 作垂线，利用等腰直角三角形的性质求出 AE。",
    detail: (
      <div className="space-y-2 text-slate-700">
        <p>在 <span className="font-serif italic">△ABE</span> 中，已知 <span className="font-serif italic">AB = 2√2</span>，<span className="font-serif italic">∠ABE = 45°</span>。</p>
        <p>初中阶段我们还没学余弦定理，可以通过作高来求解：</p>
        <p>过点 <span className="font-serif italic">A</span> 作 <span className="font-serif italic">BE</span> 所在直线的垂线，垂足记为 <span className="font-serif italic">H</span>。</p>
        <p>在 <span className="font-serif italic">Rt△ABH</span> 中，因为 <span className="font-serif italic">∠ABH = 45°</span>，所以它是一个等腰直角三角形。</p>
        <p className="bg-slate-100 p-2 rounded text-center font-serif italic">
          AH = BH = AB × sin(45°)<br/>
          = 2√2 × (√2/2)<br/>
          = 2
        </p>
        <p>神奇的事情发生了！已知 <span className="font-serif italic">BE = 2</span>，而我们算出来 <span className="font-serif italic">BH = 2</span>，这说明垂足 <span className="font-serif italic">H</span> 刚好与点 <span className="font-serif italic">E</span> <strong>重合</strong>！</p>
        <p>这就意味着 <span className="font-serif italic">∠AEB = 90°</span>，且 <span className="font-serif italic">AE = AH = 2</span>。</p>
        <p>我们得到了一个非常关键的结论：无论四边形如何变化，只要满足题目条件，<span className="font-serif italic">AE</span> 的长度始终是定值 2。</p>
      </div>
    ),
    tts: "初中的同学们注意啦，我们还没学过余弦定理，怎么求 AE 呢？老办法，作高！过点 A 向 BE 所在直线作垂线，垂足记为 H。在直角三角形 ABH 中，因为有一个角是 45 度，所以它是等腰直角三角形。利用勾股定理或者三角函数很容易算出来，AH 和 BH 都等于 2。神奇的事情发生了！题目已知 BE 也是 2，说明垂足 H 刚好和点 E 重合了！也就是说，角 AEB 其实是个直角，而 AE 的长度就是 2。不管图形怎么变，AE 始终是定值 2。"
  },
  {
    title: "第五步：利用三角不等式求极值",
    icon: <Maximize2 className="w-5 h-5 text-rose-500" />,
    desc: "将求 AD 最大值转化为求 |AE + ED| 的最大值。",
    detail: (
      <div className="space-y-2 text-slate-700">
        <p>回到我们第二步的结论：</p>
        <p className="bg-slate-100 p-2 rounded text-center font-serif italic">
          AD = AE + BC
        </p>
        <p>因为四边形 <span className="font-serif italic">BCDE</span> 是平行四边形，所以 <span className="font-serif italic">BC = ED</span>。</p>
        <p>在 <span className="font-serif italic">△AED</span> 中，根据三角形三边关系（或向量三角不等式）：</p>
        <p className="bg-slate-100 p-2 rounded text-center font-serif italic">
          AD ≤ AE + ED = AE + BC
        </p>
        <p>代入已知数据：<span className="font-serif italic">AD ≤ 2 + √2</span>。</p>
        <p>当且仅当 <span className="font-serif italic">A, E, D</span> 三点共线（即 <span className="font-serif italic">AE</span> 与 <span className="font-serif italic">BC</span> 平行且同向）时，等号成立。</p>
      </div>
    ),
    tts: "现在距离真相只有一步之遥了。我们前面得出 AD 向量等于 AE 向量加 BC 向量。因为 BCDE 是平行四边形，BC 就等于 ED。在三角形 AED 中，两边之和大于第三边，所以 AD 肯定小于等于 AE 加 ED。当 A、E、D 三点共线的时候，AD 就能取到最大值，也就是 2 加上根号 2。"
  },
  {
    title: "第六步：计算周长最大值",
    icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    desc: "汇总各边长度，得出最终答案。",
    detail: (
      <div className="space-y-2 text-slate-700">
        <p>四边形 <span className="font-serif italic">ABCD</span> 的周长 <span className="font-serif italic">C</span> 计算公式为：</p>
        <p className="bg-slate-100 p-2 rounded text-center font-serif italic">
          C = AB + BC + CD + AD
        </p>
        <p>代入已知定长数据：</p>
        <p className="bg-slate-100 p-2 rounded text-center font-serif italic">
          C = 2√2 + √2 + 2 + AD<br/>
          = 3√2 + 2 + AD
        </p>
        <p>将 <span className="font-serif italic">AD</span> 的最大值 <span className="font-serif italic">2 + √2</span> 代入：</p>
        <p className="bg-slate-100 p-2 rounded text-center font-serif italic font-bold text-blue-600">
          C_max = 3√2 + 2 + (2 + √2) = 4 + 4√2
        </p>
        <p>所以，四边形 <span className="font-serif italic">ABCD</span> 周长的最大值为 <span className="font-serif italic font-bold">4 + 4√2</span>。</p>
      </div>
    ),
    tts: "最后，我们把四边形的四条边加起来。周长等于 AB 加 BC 加 CD，再加上我们刚求出来的 AD 的最大值。算一算，最终周长的最大值就是 4 加上 4倍根号2。这道题就完美解决啦！"
  }
];
