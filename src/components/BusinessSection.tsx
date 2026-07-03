/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronRight, Layers, Cpu, Radio, ShieldCheck, ShieldAlert, X } from 'lucide-react';

import cmsServiceThumbnail from '../assets/images/cms_service_thumbnail_1782844054984.jpg';
import aiVisionThumbnail from '../assets/images/ai_vision_thumbnail_1782844076504.jpg';
import smartIotThumbnail from '../assets/images/smart_iot_thumbnail_1782844091537.jpg';
import operationServiceThumbnail from '../assets/images/operation_service_thumbnail_1782844106516.jpg';
import evguardProduct1 from '../assets/images/evguard_product_1_1782971146270.jpg';

interface BusinessSectionProps {
  onPageChange?: (page: 'home' | 'greetings' | 'org' | 'history' | 'map' | 'reference' | 'digital-signage' | 'smart-ai' | 'smart-iot' | 'smart-service' | 'evguard') => void;
}

export default function BusinessSection({ onPageChange }: BusinessSectionProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const businessItems = [
    {
      id: 'cms',
      title: 'Smart Sign CMS',
      description: '디지털 사이니지를 운영관리하고 모니터링하는 컨텐츠 송출/관리 시스템',
      image: cmsServiceThumbnail,
      icon: <Layers className="w-6 h-6 text-blue-400" />,
      details: [
        '실시간 웹 기반 원격 콘텐츠 업로드 및 스케줄링',
        '다양한 디바이스 모니터링 및 자동 리부팅 원격 제어',
        '필드에서 수만 대 장비 운영으로 검증된 독보적 안정성',
        '다중 레이아웃 템플릿 지원 (비디오, 이미지, 웹페이지, SNS 연동)'
      ]
    },
    {
      id: 'ai',
      title: 'Smart AI',
      description: 'AI비전 기술을 통해 사물인식, 사람인식을 활용한 대시보드서비스와 타겟 광고시스템',
      image: aiVisionThumbnail,
      icon: <Cpu className="w-6 h-6 text-blue-400" />,
      details: [
        '실시간 AI 카메라 객체 인식 및 유동인구 맞춤형 표적 타겟팅 광고 송출',
        '체류 시간, 성별, 연령대 정보 통계 수집 및 데이터 시각화 대시보드',
        '오프라인 매장 고객 동선 분석 및 히트맵 리포트 생성',
        '클라우드 기반 딥러닝 인지 엔진 자동 업데이트 시스템'
      ]
    },
    {
      id: 'iot',
      title: 'Smart IoT',
      description: 'IoT를 활용하여 디바이스의 제어 및 모니터링 시스템',
      image: smartIotThumbnail,
      icon: <Radio className="w-6 h-6 text-blue-400" />,
      details: [
        '스마트 멀티탭 및 센서를 연동한 에너지 효율 원격 전력 차단/공급',
        '온습도 센서, 대기질 정밀 실시간 환경 모니터링 연동',
        '이상 전류 감지 시 관리자 자동 SMS 경보 알림 시스템',
        '스마트 디바이스 통합 관제 프로토콜 구축'
      ]
    },
    {
      id: 'service',
      title: '운영 서비스',
      description: '웹, 모바일, 사이니지 등 다양한 매체/디바이스의 운영관리서비스',
      image: operationServiceThumbnail,
      icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
      details: [
        '전국 규모 현장 유지 보수망 연동 24/7 장애 지원',
        '디지털 사이니지 하드웨어 최적화 장치 설계 및 설치 시공 일괄 지원',
        '맞춤형 콘텐츠 기획, 제작 및 원격 송출 편성을 대행하는 컨시어지 케어',
        '웹/모바일 하이브리드 관리 솔루션 제공'
      ]
    },
    {
      id: 'evguard',
      title: 'EVGUARD (전기차 화재 대응)',
      description: '주식회사 온리움디엠씨 협업 전기차 배터리 열폭주 대응 파괴식 침투 소방 솔루션',
      image: evguardProduct1,
      icon: <ShieldAlert className="w-6 h-6 text-blue-400" />,
      details: [
        '특허 받은 열폭주 배터리 직접 침투 소화 노즐 기술 탑재',
        '골든타임 30초 내 신속 장비 거치 및 직접 소방 가스 주입 개시',
        '전기차 전용 소화기 및 전위 보관함 제조 조립 인프라 완비',
        '주식회사 온리움디엠씨 정밀 부품 설계 및 금형 기술 협업 생산 실현'
      ]
    }
  ];

  const handleItemClick = (id: string) => {
    if (id === 'cms' && onPageChange) {
      onPageChange('digital-signage');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'ai' && onPageChange) {
      onPageChange('smart-ai');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'iot' && onPageChange) {
      onPageChange('smart-iot');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'service' && onPageChange) {
      onPageChange('smart-service');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'evguard' && onPageChange) {
      onPageChange('evguard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveModal(id);
    }
  };

  return (
    <section id="services" className="py-24 bg-zinc-50 border-t border-zinc-100 px-6 sm:px-12 select-none">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight font-sans">
            사업분야
          </h2>
          <div className="w-12 h-1 bg-blue-600 mt-4 rounded-full" />
        </div>

        {/* 2x2 Bento Grid matching Photograph 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {businessItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`group cursor-pointer relative rounded-2xl overflow-hidden aspect-video min-h-[220px] sm:min-h-[280px] shadow-md border border-zinc-200/50 hover:shadow-xl hover:border-blue-300 transition-all duration-500 ${
                item.id === 'evguard' ? 'md:col-span-2' : ''
              }`}
            >
              {/* Background cover image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Dark tint overlay with vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/70 to-black/45 group-hover:via-black/75 transition-colors duration-500" />

              {/* Card Content Overlay */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10 text-white">
                
                {/* Upper row: Optional visual category indicator */}
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/25 text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent transition-all duration-300">
                    {item.icon}
                  </div>
                </div>

                {/* Lower row: Copy blocks */}
                <div className="space-y-3.5">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans max-w-lg group-hover:text-zinc-100 transition-colors">
                    {item.description}
                  </p>

                  {/* Show More Trigger with Chevron inside circle */}
                  <div className="pt-2.5 flex items-center gap-1 text-[11px] font-bold font-mono tracking-widest text-zinc-400 group-hover:text-blue-400 transition-colors">
                    <span>SHOW MORE</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal for Business Areas */}
      {activeModal && (
        (() => {
          const item = businessItems.find(x => x.id === activeModal);
          if (!item) return null;
          return (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-fadeIn"
              onClick={() => setActiveModal(null)}
            >
              <div 
                className="relative w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto animate-scaleUp"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-800 rounded-full bg-zinc-100 border border-zinc-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Hero header block */}
                <div className="flex items-center gap-4 mb-6 pb-5 border-b border-zinc-100">
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 tracking-wider font-mono uppercase">
                      ONRIUM DMC SOLUTION
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight font-sans">
                      {item.title}
                    </h4>
                  </div>
                </div>

                {/* Intro summary sentence */}
                <p className="text-sm font-semibold text-zinc-800 bg-blue-50/40 border border-blue-100/50 p-4 rounded-xl leading-relaxed mb-6 font-sans">
                  {item.description}
                </p>

                {/* Bullet details */}
                <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono mb-4">
                  핵심 서비스 사양 및 특장점
                </h5>
                <ul className="space-y-4">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                      <span className="text-sm text-zinc-650 leading-relaxed font-sans">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Bottom interactive action button */}
                <div className="mt-8 pt-6 border-t border-zinc-100 flex justify-end">
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all duration-300"
                  >
                    이 비즈니스 제안 문의하기
                  </button>
                </div>
              </div>
            </div>
          );
        })()
      )}

    </section>
  );
}
