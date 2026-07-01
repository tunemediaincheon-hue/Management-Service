/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SiteSettings } from '../types';

interface HeroProps {
  settings: SiteSettings;
  onCtaClick: () => void;
}

export default function Hero({ settings, onCtaClick }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-6 text-center select-none"
      style={{
        background: 'linear-gradient(135deg, #091e36 0%, #081e35 25%, #051221 100%)'
      }}
    >
      {/* Background radial glow accents for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,73,131,0.55),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(8,30,55,0.9),transparent_70%)] pointer-events-none" />

      {/* Floating Organic Fluid Blobs matching the screenshot wavy background style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft flowing wave blob 1 */}
        <div 
          className="absolute top-[-10%] left-[-15%] w-[80vw] h-[80vw] sm:w-[50vw] sm:h-[50vw] bg-blue-600/10 blur-[100px] animate-[pulse_12s_ease-in-out_infinite]" 
          style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
        />
        {/* Soft flowing wave blob 2 */}
        <div 
          className="absolute top-[20%] right-[-15%] w-[70vw] h-[70vw] sm:w-[45vw] sm:h-[45vw] bg-sky-500/10 blur-[120px] animate-[pulse_16s_ease-in-out_infinite_2s]" 
          style={{ borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%' }}
        />
        {/* Soft flowing wave blob 3 */}
        <div 
          className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] sm:w-[40vw] sm:h-[40vw] bg-indigo-500/10 blur-[110px] animate-[pulse_14s_ease-in-out_infinite_1s]" 
          style={{ borderRadius: '50% 50% 30% 70% / 50% 60% 40% 50%' }}
        />
      </div>

      {/* Main Content Wrapper */}
      <div className="relative mx-auto max-w-5xl w-full flex flex-col items-center z-10 pt-16 pb-28">
        {/* Upper Sub-title / Core Message */}
        <div className="animate-fadeIn mb-8">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white/95 tracking-wide max-w-3xl drop-shadow-md">
            {settings.heroTitle || '고객과 함께 오프라인 공간의 가치를 높입니다.'}
          </p>
        </div>

        {/* Huge Display Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-tight mb-12 drop-shadow-lg font-sans">
          {settings.heroSubtitle || 'Tuning every moment with Tune Media_'}
          <span className="inline-block w-1.5 h-12 md:h-20 bg-blue-400 ml-1.5 animate-pulse" />
        </h1>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fadeIn mt-2">
          <button
            onClick={onCtaClick}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 text-white text-sm font-bold tracking-wide hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
          >
            <span>{settings.heroCtaText || '전문 솔루션 문의하기'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('services');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold tracking-wide hover:bg-white/20 transition-all duration-300 backdrop-blur-xs"
          >
            <span>솔루션 살펴보기</span>
          </button>
        </div>
      </div>

      {/* Spinning Welcome circular text badge at the bottom center */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center select-none z-10">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
            <defs>
              <path id="circlePath" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
            </defs>
            <text className="text-[6px] font-bold fill-white/40 uppercase tracking-[0.24em] font-mono">
              <textPath href="#circlePath">
                welcome to tunemedia_ welcome to tunemedia_ 
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
