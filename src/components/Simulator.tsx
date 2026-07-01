/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sliders, Tv, Eye, Cpu, Activity, TrendingUp, Zap, Thermometer, Sparkles, Check } from 'lucide-react';

export default function Simulator() {
  const [signageActive, setSignageActive] = useState(true);
  const [visionActive, setVisionActive] = useState(false);
  const [iotActive, setIotActive] = useState(false);

  // Simulated Metrics
  const [traffic, setTraffic] = useState(120);
  const [conversion, setConversion] = useState(8.5);
  const [energySaving, setEnergySaving] = useState(0);
  const [comfort, setComfort] = useState('보통 (Normal)');

  // Dynamic Calculation based on active technologies
  useEffect(() => {
    let baseTraffic = 120;
    let baseConversion = 8.5;
    let baseEnergy = 0;
    let baseComfort = '보통 (24.2°C)';

    if (signageActive) {
      baseTraffic += 45; // Signage attracts passersby
      baseConversion += 4.2; // Targeted screens increase conversion
    }
    if (visionActive) {
      baseTraffic += 65; // Better layout optimization over time
      baseConversion += 6.8; // Personalised product recommendations
      baseComfort = '쾌적 (23.5°C)';
    }
    if (iotActive) {
      baseEnergy += 38; // 38% energy saved by auto HVAC
      baseComfort = '최적 (22.0°C / 공기질 우수)';
    }

    if (visionActive && iotActive) {
      baseComfort = '스마트 인공지능 지능 제어 (22.2°C)';
    }

    // Add tiny random fluctuation for realistic simulation feel
    const timer = setInterval(() => {
      setTraffic(Math.round(baseTraffic + (Math.random() * 8 - 4)));
      setConversion(parseFloat((baseConversion + (Math.random() * 1.2 - 0.6)).toFixed(1)));
      setEnergySaving(Math.min(100, Math.max(0, Math.round(baseEnergy + (Math.random() * 4 - 2)))));
    }, 2000);

    setTraffic(baseTraffic);
    setConversion(baseConversion);
    setEnergySaving(baseEnergy);
    setComfort(baseComfort);

    return () => clearInterval(timer);
  }, [signageActive, visionActive, iotActive]);

  return (
    <section id="simulator" className="py-24 bg-zinc-50 border-t border-zinc-200 px-6 relative overflow-hidden">
      {/* Visual background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        
        {/* Section Heading */}
        <div className="text-center mb-16 select-none">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-color)] font-mono">
            INTERACTIVE EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight font-sans mt-2 mb-4">
            오프라인 공간 DT 효과 시뮬레이터
          </h2>
          <div className="h-1 w-12 bg-[var(--accent-color)] mx-auto rounded-full mb-6" />
          <p className="text-sm sm:text-base text-zinc-600 font-sans max-w-2xl mx-auto">
            매장에 도입할 솔루션 핵심 기술을 활성화하고, 매장의 핵심 방문 통계 지표와 에너지 고정비 보존 상태가 실시간으로 어떻게 변화하는지 모의 분석해보세요.
          </p>
        </div>

        {/* Simulator Dashboard Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Station (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between border border-zinc-200 bg-white p-6 sm:p-8 rounded-2xl relative shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sliders className="w-5 h-5 text-[var(--accent-color)]" />
                <h3 className="text-lg font-bold text-zinc-900 tracking-tight font-sans">
                  솔루션 컨트롤 스테이션
                </h3>
              </div>

              <p className="text-xs text-zinc-500 leading-relaxed font-sans mb-8">
                아래 툰미디어의 시그니처 하드웨어 제어 모듈 스위치를 클릭해 활성화해보세요. 다중 도입 시 고도화 융합 알고리즘 시너지가 발휘됩니다.
              </p>

              <div className="flex flex-col gap-5">
                {/* Switch 1: Signage */}
                <button
                  onClick={() => setSignageActive(!signageActive)}
                  className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 ${
                    signageActive
                      ? 'bg-[var(--accent-color-light)] border-[var(--accent-color)]/30 text-zinc-900'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-500 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-lg ${signageActive ? 'bg-[var(--accent-color)] text-white' : 'bg-zinc-200 text-zinc-500'} transition-colors`}>
                      <Tv className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-tight">지능형 사이니지 배포</h4>
                      <p className="text-[10px] text-zinc-400 mt-0.5">외부 연동형 실시간 타겟 콘텐츠 송출</p>
                    </div>
                  </div>
                  <div className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-300 ${signageActive ? 'bg-[var(--accent-color)]' : 'bg-zinc-200'}`}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${signageActive ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </button>

                {/* Switch 2: AI Vision */}
                <button
                  onClick={() => setVisionActive(!visionActive)}
                  className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 ${
                    visionActive
                      ? 'bg-[var(--accent-color-light)] border-[var(--accent-color)]/30 text-zinc-900'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-500 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-lg ${visionActive ? 'bg-[var(--accent-color)] text-white' : 'bg-zinc-200 text-zinc-500'} transition-colors`}>
                      <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-tight">AI 비전 행동 분석망</h4>
                      <p className="text-[10px] text-zinc-400 mt-0.5">비식별 카메라 기반 시각 주목도 수집</p>
                    </div>
                  </div>
                  <div className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-300 ${visionActive ? 'bg-[var(--accent-color)]' : 'bg-zinc-200'}`}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${visionActive ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </button>

                {/* Switch 3: IoT Sensors */}
                <button
                  onClick={() => setIotActive(!iotActive)}
                  className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 ${
                    iotActive
                      ? 'bg-[var(--accent-color-light)] border-[var(--accent-color)]/30 text-zinc-900'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-500 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-lg ${iotActive ? 'bg-[var(--accent-color)] text-white' : 'bg-zinc-200 text-zinc-500'} transition-colors`}>
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-tight">IoT 무선 가변 센서</h4>
                      <p className="text-[10px] text-zinc-400 mt-0.5">실내 오염도 및 전력 스마트 냉난방 제어</p>
                    </div>
                  </div>
                  <div className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-300 ${iotActive ? 'bg-[var(--accent-color)]' : 'bg-zinc-200'}`}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${iotActive ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </button>
              </div>
            </div>

            {/* Quick Summary Footer */}
            <div className="mt-8 pt-6 border-t border-zinc-150 flex items-center gap-2.5 text-[10px] text-zinc-400 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-color)] animate-spin-slow" />
              <span>실시간 예측 시뮬레이션 알고리즘 가동 중</span>
            </div>
          </div>

          {/* Display Dashboard (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between border border-zinc-200 bg-zinc-50/50 p-6 sm:p-8 rounded-2xl shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[var(--accent-color)]" />
                  <h3 className="text-lg font-bold text-zinc-900 tracking-tight font-sans">
                    매장 실시간 텔레메트리 대시보드
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 border border-blue-100 text-blue-600">
                  LIVE SIMULATION
                </span>
              </div>

              {/* 4 Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Metric 1 */}
                <div className="bg-white border border-zinc-200 p-4 rounded-xl">
                  <div className="flex justify-between items-start text-zinc-500 mb-2">
                    <span className="text-[10px] font-bold font-mono tracking-wider">방문객 수 (TRAFFIC)</span>
                    <TrendingUp className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black font-mono text-zinc-900 tracking-tight">
                      {traffic} <span className="text-xs text-zinc-400">명/시간</span>
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400 mt-1 block">
                    (기본치: 120명)
                  </span>
                </div>

                {/* Metric 2 */}
                <div className="bg-white border border-zinc-200 p-4 rounded-xl">
                  <div className="flex justify-between items-start text-zinc-500 mb-2">
                    <span className="text-[10px] font-bold font-mono tracking-wider">구매 전환율 (CONV.)</span>
                    <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black font-mono text-zinc-900 tracking-tight">
                      {conversion}%
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400 mt-1 block">
                    (기본치: 8.5%)
                  </span>
                </div>

                {/* Metric 3 */}
                <div className="bg-white border border-zinc-200 p-4 rounded-xl">
                  <div className="flex justify-between items-start text-zinc-500 mb-2">
                    <span className="text-[10px] font-bold font-mono tracking-wider">공조 전력 세이빙율 (ENERGY)</span>
                    <Zap className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black font-mono text-zinc-900 tracking-tight">
                      {energySaving}%
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400 mt-1 block">
                    (기본치: 0%)
                  </span>
                </div>

                {/* Metric 4 */}
                <div className="bg-white border border-zinc-200 p-4 rounded-xl">
                  <div className="flex justify-between items-start text-zinc-500 mb-2">
                    <span className="text-[10px] font-bold font-mono tracking-wider">공간 안락 지수 (COMFORT)</span>
                    <Thermometer className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                  <div className="text-sm font-bold text-zinc-850 tracking-tight font-sans truncate py-1">
                    {comfort}
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400 mt-1 block">
                    (기본치: 보통 24.2°C)
                  </span>
                </div>
              </div>

              {/* Dynamic Interactive Store Floorplan visualization */}
              <div className="border border-zinc-200 bg-white p-4 rounded-xl shadow-xs">
                <span className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider block mb-3">
                  스마트 매장 평면도 및 방문자 동선 모의 매핑 (MAP LAYOUT VIEW)
                </span>
                
                <div className="relative h-32 rounded-lg border border-zinc-150 bg-zinc-50 flex items-center justify-center overflow-hidden">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:1rem_1rem]" />
                  
                  {/* Inner Layout blocks */}
                  <div className="absolute left-4 top-4 bottom-4 w-12 border border-zinc-200 bg-white rounded flex items-center justify-center text-[8px] font-mono text-zinc-450">
                    S1 ZONE
                  </div>
                  <div className="absolute right-4 top-4 bottom-4 w-12 border border-zinc-200 bg-white rounded flex items-center justify-center text-[8px] font-mono text-zinc-450">
                    S2 ZONE
                  </div>
                  <div className="absolute top-4 left-24 right-24 h-6 border border-zinc-200 bg-white rounded flex items-center justify-center text-[8px] font-mono text-zinc-450">
                    MAIN AISLE
                  </div>

                  {/* Dynamic Floorplan Indicators */}
                  {signageActive && (
                    <div className="absolute left-1.5 top-1.5 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border border-zinc-200 text-[8px] font-bold text-[var(--accent-color)] font-mono animate-pulse">
                      <Tv className="w-2.5 h-2.5" />
                      <span>SIGNAGE ACTIVE</span>
                    </div>
                  )}

                  {visionActive && (
                    <div className="absolute top-1.5 right-1.5 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border border-zinc-200 text-[8px] font-bold text-blue-600 font-mono animate-pulse">
                      <Eye className="w-2.5 h-2.5" />
                      <span>VISION SCANNING</span>
                    </div>
                  )}

                  {iotActive && (
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border border-zinc-200 text-[8px] font-bold text-emerald-600 font-mono animate-pulse">
                      <Cpu className="w-2.5 h-2.5" />
                      <span>CLIMATE COMP</span>
                    </div>
                  )}

                  {/* Stylized moving dots */}
                  <div className={`absolute w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping`} style={{ top: '35%', left: '42%' }} />
                  <div className={`absolute w-2 h-2 rounded-full bg-[var(--accent-color)]`} style={{ top: '35%', left: '42%' }} />
                  
                  <div className="absolute w-1.5 h-1.5 rounded-full bg-blue-450" style={{ top: '55%', left: '55%' }} />
                  <div className="absolute w-1.5 h-1.5 rounded-full bg-zinc-400" style={{ top: '22%', left: '25%' }} />
                  <div className="absolute w-1.5 h-1.5 rounded-full bg-zinc-400" style={{ top: '75%', left: '72%' }} />

                  {/* Additional dots appearing when traffic is higher */}
                  {(signageActive || visionActive) && (
                    <>
                      <div className="absolute w-2 h-2 rounded-full bg-[var(--accent-color)] animate-pulse" style={{ top: '65%', left: '30%' }} />
                      <div className="absolute w-1.5 h-1.5 rounded-full bg-zinc-300" style={{ top: '45%', left: '62%' }} />
                      <div className="absolute w-1.5 h-1.5 rounded-full bg-zinc-300" style={{ top: '28%', left: '68%' }} />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Simulated ROI metrics block */}
            <div className="mt-6 pt-5 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-[10px] text-zinc-400 font-mono">시뮬레이션 종합 성과 평가 (ESTIMATED ROI)</span>
                <p className="text-sm font-bold text-zinc-900 font-sans mt-0.5">
                  {(signageActive && visionActive && iotActive) ? (
                    <span className="text-emerald-600">매장 경쟁력 극대화 패키지 적용 완료 (최상)</span>
                  ) : (signageActive || visionActive || iotActive) ? (
                    <span className="text-[var(--accent-color)]">오프라인 공간 전환 가시적 진전 (양호)</span>
                  ) : (
                    <span className="text-zinc-400">대기 중 - 기술 모듈을 활성화하세요</span>
                  )}
                </p>
              </div>
              
              <button
                onClick={() => {
                  setSignageActive(true);
                  setVisionActive(true);
                  setIotActive(true);
                }}
                className="px-4 py-2 rounded-full bg-white border border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-1.5 justify-center shadow-xs"
              >
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>모든 테크 동시 활성화</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
