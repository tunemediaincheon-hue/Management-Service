/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TrendingUp, Users, Factory, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';

interface IntroSectionProps {
  onEnterTuneMedia?: () => void;
  onEnterEVGuard?: () => void;
}

export default function IntroSection({ onEnterTuneMedia, onEnterEVGuard }: IntroSectionProps) {
  const handleTuneMediaClick = () => {
    if (onEnterTuneMedia) {
      onEnterTuneMedia();
    } else {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEVGuardClick = () => {
    if (onEnterEVGuard) {
      onEnterEVGuard();
    }
  };

  return (
    <section id="intro" className="py-24 sm:py-32 bg-white px-6 sm:px-12 lg:px-24 select-none relative overflow-hidden">
      {/* Background soft layout elements for an elegant editorial look */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-zinc-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute left-10 bottom-10 w-72 h-72 bg-blue-50/30 rounded-full blur-2xl opacity-40 pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Huge polished minimalist logo branding */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-start py-8">
            <div className="relative group">
              {/* Soft decorative shadow block behind logo */}
              <div className="absolute -inset-4 bg-zinc-50/50 rounded-2xl scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
              
              <div className="flex flex-col select-none">
                <div className="flex items-baseline font-sans text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none">
                  <span className="text-zinc-900 font-extrabold">온리움디엠씨</span>
                  <span className="text-blue-500 font-black">.</span>
                </div>
                <div className="flex items-center gap-1.5 mt-3 pl-1 font-mono text-xs sm:text-sm text-zinc-400 tracking-widest uppercase">
                  <span>tunemedia solution</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Title and Deep Value Statement */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight font-sans mb-8">
              Tuning every space with Onrium DMC
            </h2>

            <div className="text-sm sm:text-base text-zinc-600 leading-relaxed space-y-6 font-sans max-w-2xl">
              <p>
                주식회사 온리움디엠씨는 공간 DT 전문 브랜드 <strong>튠 미디어(Tune Media)</strong>와 전기차 화재 대응 전문 솔루션 기업인 <strong>EVGUARD(이브이가드)</strong>를 핵심 주력으로 두어, 상업공간의 혁신과 안전 생태계를 동시에 선도합니다.
              </p>
              <p>
                단순 하드웨어(HW) 공급에 그치지 않고, 다양한 파트너사들과의 마케팅 연결 및 유기적인 제휴, 독보적인 원천 기술을 바탕으로 한 <strong>고품질 하드웨어 및 솔루션 공동 제품 생산</strong> 체계를 구축하였습니다. 온리움디엠씨의 풍부한 자본 운용력과 영업 추진 네트워크를 적극 활용해 시장 장악력을 극대화하고 있습니다.
              </p>
            </div>

            <div className="mt-10 flex justify-end">
              <span className="text-base font-black text-blue-600 tracking-tight select-none border-b-2 border-blue-600/20 pb-1">
                주식회사 온리움디엠씨 협업 생태계
              </span>
            </div>
          </div>

        </div>

        {/* ONRIUM DMC Business Mechanism Section */}
        <div className="mt-24 pt-16 border-t border-zinc-100">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono bg-blue-50 px-3 py-1 rounded-full">
              ONRIUM DMC COLLABORATION ECOSYSTEM
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight mt-4">
              온리움디엠씨 협업 기반 밸류체인
            </h3>
            <p className="text-sm sm:text-base text-zinc-500 mt-4 leading-relaxed">
              주식회사 온리움디엠씨는 탄탄한 자본 유치 및 영업 네트워크, 마케팅 커넥션, 
              정밀 하드웨어 제조 및 공동 생산 라인을 결합하여 파트너 브랜드들의 성공적인 비즈니스 도약을 지원합니다.
            </p>
          </div>

          {/* Three Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* 1. Sales & Capital */}
            <div className="bg-zinc-50/50 border border-zinc-150 rounded-2xl p-6 transition-all duration-300 hover:bg-white hover:shadow-lg hover:border-zinc-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-5">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                </div>
                <h4 className="text-base font-bold text-zinc-900 mb-2">자본 유치 & 비즈니스 영업</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  신규 사업 추진 및 핵심 기술 투자를 위한 대규모 자본금 운용과 전국적인 온·오프라인 비즈니스 핵심 거점 영업망 확장을 정교하게 전개합니다.
                </p>
              </div>
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider font-mono mt-6">
                Capital & Sales Promotion
              </span>
            </div>

            {/* 2. Marketing Connection */}
            <div className="bg-zinc-50/50 border border-zinc-150 rounded-2xl p-6 transition-all duration-300 hover:bg-white hover:shadow-lg hover:border-zinc-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-5">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="text-base font-bold text-zinc-900 mb-2">마케팅 제휴 & 연결 시너지</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  광고주 및 수요처 다이렉트 매칭, 미디어 채널 제휴, 전략적 협업 커넥션을 통해 비즈니스 가치와 대고객 도달률을 비약적으로 확장합니다.
                </p>
              </div>
              <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider font-mono mt-6">
                Marketing Connection
              </span>
            </div>

            {/* 3. Joint Hardware Production */}
            <div className="bg-zinc-50/50 border border-zinc-150 rounded-2xl p-6 transition-all duration-300 hover:bg-white hover:shadow-lg hover:border-zinc-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-5">
                  <Factory className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="text-base font-bold text-zinc-900 mb-2">협업을 통한 공동 제품 생산</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  독보적인 특허 및 핵심 기술을 갖춘 파트너사와 협업하여, 온리움디엠씨 공장의 엄격한 정밀 제조 조립 품질 하에 완벽한 고성능 제품을 탄생시킵니다.
                </p>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider font-mono mt-6">
                Joint HW Production
              </span>
            </div>

          </div>

          {/* Double Core Brands Highlight */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* 4. Interactive tunemedia (Core Space DT) */}
            <div 
              onClick={handleTuneMediaClick}
              className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-8 shadow-md hover:shadow-xl hover:shadow-blue-500/15 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer border border-blue-500 group overflow-hidden"
            >
              {/* Glowing animated background background element */}
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500 pointer-events-none" />
              
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/10">
                  <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[10px] font-bold tracking-widest uppercase font-mono bg-yellow-400 text-zinc-950 px-2.5 py-1 rounded-full">
                    Core Space DT
                  </span>
                </div>
                <h4 className="text-xl font-black tracking-tight mb-3 flex items-center gap-1.5">
                  <span>튠 미디어 (Tune Media)</span>
                  <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1.5 transition-transform" />
                </h4>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-md">
                  <strong>[클릭하여 바로입장]</strong> 온리움디엠씨의 공간 디지털 트랜스포메이션 브랜드로, 스마트 사이니지 CMS, 지능형 AI 비전 분석, 사물인터넷(IoT) 연동 공간 제어 솔루션을 통합 서비스합니다.
                </p>
              </div>
              
              <div className="mt-8 flex items-center justify-between text-xs font-bold text-yellow-300 group-hover:text-white transition-colors border-t border-white/10 pt-4">
                <span>Smart Space DT 솔루션 탐색하기</span>
                <span className="text-xs font-bold">Entry &rarr;</span>
              </div>
            </div>

            {/* 5. EVGUARD (EV Fire Safety Solution) */}
            <div 
              onClick={handleEVGuardClick}
              className="relative bg-gradient-to-br from-red-600 to-rose-700 text-white rounded-3xl p-8 shadow-md hover:shadow-xl hover:shadow-red-500/15 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer border border-red-500 group overflow-hidden"
            >
              {/* Glowing animated background background element */}
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500 pointer-events-none" />
              
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/10">
                  <ShieldAlert className="w-6 h-6 text-white animate-pulse" />
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[10px] font-bold tracking-widest uppercase font-mono bg-white text-rose-700 px-2.5 py-1 rounded-full">
                    EV Safety Leader
                  </span>
                </div>
                <h4 className="text-xl font-black tracking-tight mb-3 flex items-center gap-1.5">
                  <span>EVGUARD (이브이가드)</span>
                  <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1.5 transition-transform" />
                </h4>
                <p className="text-xs sm:text-sm text-rose-100 leading-relaxed max-w-md">
                  <strong>[클릭하여 바로입장]</strong> 온리움디엠씨와의 공동 생산 및 영업망 협업으로 전개하는 전기차 화재 대응 전문 솔루션입니다. 열폭주 분석 기반의 전용 소화 장비로 아파트, 공공기관의 충전 구역 안전을 책임집니다.
                </p>
              </div>
              
              <div className="mt-8 flex items-center justify-between text-xs font-bold text-white group-hover:text-yellow-200 transition-colors border-t border-white/10 pt-4">
                <span>EVGUARD 기술 & 솔루션 탐색하기</span>
                <span className="text-xs font-bold">Entry &rarr;</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
