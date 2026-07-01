/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export default function IntroSection() {
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
              
              <div className="flex items-baseline font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight select-none">
                <span className="text-zinc-400 font-light">tune</span>
                <span className="text-blue-500 font-extrabold ml-1">media</span>
                <span className="text-blue-500 font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none">.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Title and Deep Value Statement */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight font-sans mb-8">
              Tuning every space with Tune Media
            </h2>

            <div className="text-sm sm:text-base text-zinc-600 leading-relaxed space-y-6 font-sans max-w-2xl">
              <p>
                상업공간, 쇼핑몰, 백화점, 면세점, 지하철, 공항, 상점등 다양한 공간에서 쉽게 접할 수 있는 디지털사이니지, LED전광판, 키오스크등에 인터렉션, AI, IOT 등의 기술을 접목하여 고객의 디지털트랜스포메이션을 돕는 일을 하고 있습니다.
              </p>
              <p>
                HW공급뿐 아니라 SW, 컨텐츠 개발과 AI, IOT 센싱등의 최신기술을 접목하여 다량의 디바이스를 안정적으로 운영관리 해드립니다.
              </p>
            </div>

            <div className="mt-10 flex justify-end">
              <span className="text-base font-black text-blue-600 tracking-tight select-none border-b-2 border-blue-600/20 pb-1">
                주식회사 툰미디어
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
