/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesProps {
  services: ServiceItem[];
}

export default function Services({ services }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Dynamic Icon Renderer
  const renderIcon = (name: string, className: string = "w-6 h-6") => {
    // Safely cast to index of Icons
    const IconComponent = (Icons as any)[name];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    return <Icons.HelpCircle className={className} />;
  };

  return (
    <section id="services" className="py-24 bg-white border-t border-zinc-100 px-6">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Heading */}
        <div className="text-center mb-16 select-none">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-color)] font-mono">
            CORE SOLUTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight font-sans mt-2 mb-4">
            오프라인 공간을 바꾸는 핵심 3대 테크
          </h2>
          <div className="h-1 w-12 bg-[var(--accent-color)] mx-auto rounded-full mb-6" />
          <p className="text-sm sm:text-base text-zinc-600 font-sans max-w-2xl mx-auto">
            정체된 전통 공간에 감각적인 하드웨어 연동, 데이터 인지, 능동형 센서 메시네트워크를 주입하여 유동인구 몰입도와 비즈니스 매출을 극대화합니다.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group cursor-pointer relative rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/20 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
            >
              {/* Card Hover Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-b ${service.bgGradient || 'from-blue-100/10 via-transparent to-transparent'} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                {/* Icon Wrapper */}
                <div className="inline-flex p-3 rounded-xl bg-white border border-zinc-200 text-[var(--accent-color)] mb-6 group-hover:scale-110 transition-transform duration-300">
                  {renderIcon(service.iconName, "w-6 h-6")}
                </div>

                <h3 className="text-xl font-bold text-zinc-900 tracking-tight font-sans mb-3 group-hover:text-[var(--accent-color)] transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-zinc-600 font-sans leading-relaxed mb-6 line-clamp-3">
                  {service.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="relative z-10 flex items-center gap-2 text-xs font-semibold text-zinc-800 font-mono mt-auto group-hover:text-[var(--accent-color)] transition-colors">
                <span>자세히 알아보기</span>
                <Icons.ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal Overlay */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div 
              className="relative w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background gradient block */}
              <div className={`absolute inset-0 bg-gradient-to-b ${selectedService.bgGradient || 'from-blue-500/5 via-transparent to-transparent'} opacity-30 pointer-events-none`} />

              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-800 rounded-full bg-zinc-100 border border-zinc-200 transition-colors"
                aria-label="Close modal"
              >
                <Icons.X className="w-4 h-4" />
              </button>

              <div className="relative z-10">
                {/* Icon & Category */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-zinc-150 border border-zinc-200 text-[var(--accent-color)]">
                    {renderIcon(selectedService.iconName, "w-6 h-6")}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent-color)] font-mono">
                      SOLUTION DESCRIPTION
                    </span>
                    <h4 className="text-2xl font-black text-zinc-900 tracking-tight font-sans">
                      {selectedService.title}
                    </h4>
                  </div>
                </div>

                {/* Body Summary */}
                <p className="text-sm text-zinc-700 font-sans leading-relaxed mb-8 bg-zinc-50 border border-zinc-100 p-4 rounded-xl">
                  {selectedService.description}
                </p>

                {/* Bullet details */}
                <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-mono mb-4">
                  핵심 주요 기능 및 사양 (TECHNICAL DETAILS)
                </h5>
                <ul className="flex flex-col gap-3.5">
                  {selectedService.details && selectedService.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-color)] flex-shrink-0" />
                      <span className="text-sm text-zinc-600 font-sans leading-relaxed">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Footer Cta in Modal */}
                <div className="mt-8 pt-6 border-t border-zinc-100 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-full bg-[var(--accent-color)] text-white text-xs font-semibold hover:brightness-110 transition-all duration-300"
                  >
                    이 솔루션 견적 문의
                  </button>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-5 py-2.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 text-xs font-semibold hover:bg-zinc-200 hover:text-zinc-900 transition-all duration-300"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
