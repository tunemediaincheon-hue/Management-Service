import React, { useState } from 'react';
import waterprimeProduct1 from '../assets/images/evguard_product_1_1782971146270.jpg';
import waterprimeProduct2 from '../assets/images/evguard_product_2_1782971163249.jpg';
import waterprimeDemo1 from '../assets/images/evguard_demo_1_1783021414746.jpg';
import waterprimeDemo2 from '../assets/images/evguard_demo_2_1783021430096.jpg';
import waterprimeDemo3 from '../assets/images/evguard_demo_3_1783021444805.jpg';

import { 
  ShieldAlert, 
  Flame, 
  Zap, 
  Factory, 
  TrendingUp, 
  Users, 
  ExternalLink, 
  ArrowLeft, 
  ShieldCheck, 
  Play, 
  Award, 
  FileText, 
  Download, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  HelpCircle, 
  Info, 
  Layers, 
  Activity, 
  Wrench,
  BookOpen
} from 'lucide-react';
import { SiteSettings } from '../types';

interface WaterPrimePageProps {
  settings: SiteSettings;
  onBackToHome: () => void;
  onContactClick: () => void;
}

export default function WaterPrimePage({ settings, onBackToHome, onContactClick }: WaterPrimePageProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'products' | 'tech' | 'support'>('about');
  const [activeProductImage, setActiveProductImage] = useState<number>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const youtubeUrl = "https://www.bing.com/ck/a?!&&p=e599c87917be67fb26234fe1fdd3760fc3a983af441132614eb3b645557a14d6JmltdHM9MTc4Mjg2NDAwMA&ptn=3&ver=2&hsh=4&fclid=37c3f83c-6092-651a-3850-eefa61bb6452&u=a1L3ZpZGVvcy9yaXZlcnZpZXcvcmVsYXRlZHZpZGVvP3E9JWVjJWIyJWFkJWViJTlkJWJjKyVlYyVhMCU4NCVlYSViOCViMCVlYyViMCVhOCslZWQlOTklOTQlZWMlOWUlYWMrJWVkJTk1JTljJWViJWFjJWI4JWVjJWIyJWEwKyVlYyU5YyVhMCVlZCU4YSU5YyVlYiViOCU4YyUyYyYmbWlkPTk2QzcyMDJFODY0RTdEODFDQUIxOTZDNzIwMkU4NjRFN0Q4MUNBQjEmY2h1cmw9aHR0cHMlM2ElMmYlMmZ3d3cueW91dHViZS5jb20lMmZjaGFubmVsJTJmVUNGTDFzQ0Frc0Q2XzdKSVp3d0hjd2pRJm1jaWQ9RjQwOTFFQjM5NjQ2NDIwNEFERjhDRjc1Q0VFRDFFQTcmRk9STT1WQU1HWkM";

  // Product Slide Images & Parameters
  const productSlides = [
    {
      title: "워터프라임 배터리 침투형 소화 전용 유닛",
      desc: "특허 받은 열폭주 직접 관통 침투 소화 노즐이 적용되어, 차량 밑바닥 배터리 하우징 내부 고열 화재 발생부에 직접 소화액을 초강력 분사합니다.",
      image: waterprimeProduct1,
      type: "EV CLASS A, B, C, D",
      range: "4-6 M",
      capacity: "2.5 L",
      time: "초기 30초 이내 발동"
    },
    {
      title: "워터프라임 지능형 고압 연결 셋트",
      desc: "소방 호스 및 가압식 소화 가스 실린더가 다이렉트로 체결되어 고온 열폭주 셀 냉각을 위해 최적화된 물과 가스 혼합 소화 포뮬러를 지속 피딩합니다.",
      image: waterprimeProduct2,
      type: "EV SPECIALIST",
      range: "5-8 M",
      capacity: "연속 공급 가능",
      time: "실시간 조작 제어"
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const tabs = [
    { id: 'about', label: '회사소개', icon: Building2 },
    { id: 'products', label: '제품소개', icon: Flame },
    { id: 'tech', label: '기술 인증', icon: Award },
    { id: 'support', label: '고객센터', icon: Users },
  ] as const;

  return (
    <div className="bg-zinc-50 min-h-screen pt-24 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. Immersive Hero Banner Section */}
      <div className="relative bg-white border-b border-zinc-100 overflow-hidden">
        {/* Abstract Grid background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#18181b 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute -right-36 -top-36 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -left-36 bottom-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-12 pb-16 relative z-10">
          
          <button 
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-950 transition-colors uppercase tracking-wider mb-8 bg-zinc-100 px-4 py-2 rounded-full border border-zinc-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            메인 화면으로 돌아가기
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Narrative */}
            <div className="lg:col-span-7">
              <span className="text-xs font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-100 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-6">
                <ShieldAlert className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                EV FIRE RESPONSE · SINCE 1997
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 tracking-tight leading-tight mb-6">
                전기차 화재,<br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-extrabold">
                  골든타임
                </span>
                을 지킵니다.
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-zinc-600 leading-relaxed max-w-xl font-medium tracking-tight mb-8">
                WATER PRIME는 전기차 배터리 화재의 열폭주 특성을 완벽히 분석해 초기 진입과 피해 최소화를 위한 특허 및 디자인 등록 기반 전문 솔루션을 전개합니다.
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setActiveTab('products')}
                  className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs rounded-xl tracking-wider transition-all shadow-md shadow-zinc-950/10 uppercase inline-flex items-center gap-2"
                >
                  <span>WATER PRIME 핵심가치 보기</span>
                  <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                </button>
                <button 
                  onClick={onContactClick}
                  className="px-6 py-3.5 bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-250 font-bold text-xs rounded-xl tracking-wider transition-all"
                >
                  고객 문의하기
                </button>
              </div>
            </div>

            {/* Right Hero Decorative Floating Widgets */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[300px]">
              {/* Outer boundary circle decoration */}
              <div className="absolute w-72 h-72 border border-zinc-200/60 rounded-full flex items-center justify-center">
                <div className="absolute w-56 h-56 border border-zinc-200/40 rounded-full flex items-center justify-center">
                  <div className="absolute w-40 h-40 bg-zinc-50/50 border border-zinc-200/20 rounded-full" />
                </div>
              </div>

              {/* Central Floating Badge */}
              <div className="relative w-44 h-44 bg-blue-50/70 border border-blue-100 rounded-full shadow-lg backdrop-blur-sm flex flex-col items-center justify-center animate-bounce duration-[4000ms]">
                <ShieldCheck className="w-16 h-16 text-blue-600 mb-2 drop-shadow-sm" />
                <span className="text-[10px] font-bold text-zinc-400 tracking-wider">BATTERY SHIELD</span>
              </div>

              {/* Floating Spec 1 */}
              <div className="absolute -top-4 right-10 bg-white border border-zinc-150 rounded-2xl p-4 shadow-xl flex items-center gap-3 animate-fadeIn">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-zinc-400 block uppercase font-mono tracking-wider">Patent</span>
                  <span className="text-xs font-black text-zinc-800">특허·디자인 등록 완비</span>
                </div>
              </div>

              {/* Floating Spec 2 */}
              <div className="absolute bottom-6 -left-4 bg-white border border-zinc-150 rounded-2xl p-4 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-zinc-400 block uppercase font-mono tracking-wider">EV Battery</span>
                  <span className="text-xs font-black text-zinc-800">열폭주 직접 대응</span>
                </div>
              </div>

              {/* Floating Spec 3 */}
              <div className="absolute bottom-12 -right-4 bg-white border border-zinc-150 rounded-2xl p-4 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-zinc-400 block uppercase font-mono tracking-wider">Response</span>
                  <span className="text-xs font-black text-zinc-800">&lt; 30 SEC 가동</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Banner Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-12 mt-12 border-t border-zinc-100 max-w-2xl">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">1,997</div>
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono mt-1">Since</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-blue-600 tracking-tight">100%</div>
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono mt-1">EV Fire Coverage</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-purple-600 tracking-tight">30초</div>
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono mt-1">Response Time</div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Marquee Ribbon style */}
      <div className="bg-zinc-950 text-white py-4 overflow-hidden border-y border-zinc-800 select-none">
        <div className="flex whitespace-nowrap gap-12 text-xs font-black uppercase tracking-widest animate-pulse">
          <span className="flex items-center gap-2 text-red-500">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            열폭주 THERMAL RUNAWAY
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white" />
            EV BATTERY SAFETY SYSTEM
          </span>
          <span className="flex items-center gap-2 text-blue-400">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            대한민국 NO.1 파트너
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white" />
            전기차 전용 소화기 공동 생산
          </span>
          <span className="flex items-center gap-2 text-red-500">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            열폭주 THERMAL RUNAWAY
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white" />
            EV BATTERY SAFETY SYSTEM
          </span>
        </div>
      </div>

      {/* 3. Sticky Sub-Navigation Tab Panel */}
      <div className="sticky top-[80px] z-30 bg-white border-b border-zinc-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="flex overflow-x-auto gap-1 md:gap-8 py-4 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    // Slight scroll offset to look polished
                    const el = document.getElementById('waterprime-content-start');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 flex-shrink-0 ${
                    isActive 
                      ? 'bg-zinc-900 text-white shadow-md shadow-zinc-900/15' 
                      : 'text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-zinc-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div id="waterprime-content-start" className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        
        {/* ==================== TAB 1: 회사소개 (About Us) ==================== */}
        {activeTab === 'about' && (
          <div className="space-y-20 animate-fadeIn">
            
            {/* Introductory Narrative Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block font-mono mb-2">— ABOUT WATER PRIME — 01</span>
                <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
                  전기차 화재,<br />
                  왜 <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">전문 대응</span>이<br />
                  필요한가?
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed mt-6">
                  전기차에 탑재되는 리튬이온 배터리는 화재 발생 시 외부 산소와 유관하게 자체 화학반응을 통한 '열폭주'에 돌입합니다. 일반적인 ABC 분말 소화제로는 배터리 셀 내부 침투가 불가능해 진압이 무의미합니다.
                </p>
              </div>

              <div className="lg:col-span-7 bg-white border border-zinc-150 rounded-3xl p-8 shadow-sm">
                <h3 className="text-lg font-black text-zinc-900 mb-6 flex items-center gap-2">
                  <Info className="w-5 h-5 text-red-600" />
                  전기차 배터리 화재의 4대 핵심 위협 요소
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-5 bg-gradient-to-br from-red-50 to-rose-50 border border-red-100 rounded-2xl relative overflow-hidden">
                    <span className="text-xs font-black text-red-300 font-mono absolute top-4 right-4">01</span>
                    <h4 className="text-sm font-black text-zinc-900 mb-2">열폭주 현상</h4>
                    <span className="text-[9px] font-bold text-red-600 block uppercase font-mono tracking-wider mb-2">Thermal Runaway</span>
                    <p className="text-xs text-zinc-500 leading-relaxed">배터리 셀 내부 온도가 급격히 상승하며 통제 불능 상태로 폭발적 확산되는 위험.</p>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl relative overflow-hidden">
                    <span className="text-xs font-black text-blue-300 font-mono absolute top-4 right-4">02</span>
                    <h4 className="text-sm font-black text-zinc-900 mb-2">재발화 위험</h4>
                    <span className="text-[9px] font-bold text-blue-600 block uppercase font-mono tracking-wider mb-2">Re-ignition</span>
                    <p className="text-xs text-zinc-500 leading-relaxed">겉보기엔 진압된 후에도 배터리 내부 잔열에 의해 몇 시간 혹은 며칠 뒤 빈번히 재폭발.</p>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl relative overflow-hidden">
                    <span className="text-xs font-black text-purple-300 font-mono absolute top-4 right-4">03</span>
                    <h4 className="text-sm font-black text-zinc-900 mb-2">급속 확산</h4>
                    <span className="text-[9px] font-bold text-purple-600 block uppercase font-mono tracking-wider mb-2">Rapid Spread</span>
                    <p className="text-xs text-zinc-500 leading-relaxed">인접 리튬이온 셀로 연쇄 전파되어 불과 단 몇 분 만에 차량 전체로 화염 번짐.</p>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-zinc-50 to-zinc-100 border border-zinc-200 rounded-2xl relative overflow-hidden">
                    <span className="text-xs font-black text-zinc-400 font-mono absolute top-4 right-4">04</span>
                    <h4 className="text-sm font-black text-zinc-900 mb-2">지하주차장 피해</h4>
                    <span className="text-[9px] font-bold text-zinc-500 block uppercase font-mono tracking-wider mb-2">Underground</span>
                    <p className="text-xs text-zinc-500 leading-relaxed">환기가 되지 않는 지하 밀폐공간 발생 시 대형 가스로 인한 질식 및 아파트 대형 참사 유발.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CEO / Brand Greetings Block */}
            <div className="bg-white border border-zinc-150 rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-4 aspect-[3/4] rounded-2xl overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600" 
                  alt="WATER PRIME Technology Center" 
                  className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-base font-black">WATER PRIME R&D LAB</h4>
                  <p className="text-[10px] text-zinc-300 font-mono mt-1">Since 1997 · Safety Engineering</p>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  사람의 생명과 안전을 지키는 기술 기업<span className="text-blue-600">.</span>
                </h3>
                
                <div className="text-sm sm:text-base text-zinc-650 leading-relaxed space-y-4 font-sans">
                  <p>
                    안녕하십니까. WATER PRIME를 찾아주신 여러분께 진심으로 감사드립니다.
                  </p>
                  <p>
                    전기차 시대의 빠른 성장은 우리에게 무한한 편의를 가져다주었지만, 동시에 지하 주차장 전기차 배터리 화재 위협이라는 새로운 공포를 안겨주었습니다. 열폭주와 유독가스 차단이 되지 않으면 단순한 물 살포로는 화재를 제어할 수 없습니다.
                  </p>
                  <p>
                    <strong>WATER PRIME</strong>는 지난 수십 년간 축적해 온 방재 원천 기술을 총망라하여, 배터리 팩 내부로 직접 가스 소화 물질을 주입하는 파괴적 소화 특허 기술을 완성하였습니다. 우리는 단순한 제품 공급업체에 머물지 않고, 아파트 단지 주민들과 소방 인력들의 골든타임을 확보하는 "소중한 일상 안전 전위대" 역할을 자처합니다.
                  </p>
                  <p>
                    고객의 무한 신뢰에 오직 무결점 품질과 첨단 안전 기술로 보답할 것을 강력히 약속드립니다.
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
                  <div className="text-xs sm:text-sm font-bold text-zinc-700">
                    — 고객 생명과 재산 지킴이 <span className="text-zinc-900 font-black">김용진 올림</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono bg-zinc-50 border border-zinc-150 px-2 py-1 rounded-md">WATER PRIME CEO</span>
                </div>
              </div>
            </div>

            {/* Our Vision & Mission (Dark Theme) */}
            <div className="bg-zinc-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest font-mono bg-blue-950/80 border border-blue-900/60 px-3 py-1 rounded-full">Our Vision</span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-4">
                  "전기차 화재 안전 분야의 글로벌 리딩 브랜드"
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                  <span className="text-2xl font-black text-blue-400 font-mono">01</span>
                  <h4 className="text-sm font-bold text-white mt-3 mb-1">화재 대응 기술 혁신</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">전기차 배터리 열폭주 메커니즘 분석에 특화된 침투형 노즐 등 선구적 기술 지속 R&D</p>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                  <span className="text-2xl font-black text-indigo-400 font-mono">02</span>
                  <h4 className="text-sm font-bold text-white mt-3 mb-1">신속한 초기 진입</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">연기/열 감지 즉시 비전문가도 30초 내에 직관적으로 화재 차량에 장비를 거치 완료하는 설계</p>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                  <span className="text-2xl font-black text-purple-400 font-mono">03</span>
                  <h4 className="text-sm font-bold text-white mt-3 mb-1">공공 안전 인프라</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">아파트 지하 주차구역, 충전타워, 쇼핑몰에 규격화된 소방 장비 설치를 통해 보편적 안전망 구축</p>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                  <span className="text-2xl font-black text-red-400 font-mono">04</span>
                  <h4 className="text-sm font-bold text-white mt-3 mb-1">품질 경영</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">일말의 오차도 허용치 않는 온리움디엔씨 공장의 엄격한 정밀 가공 및 엄중한 검수 생산 체계</p>
                </div>
              </div>
            </div>

            {/* Collaboration Synergy box */}
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="max-w-xl">
                  <h4 className="text-xs font-black uppercase tracking-widest font-mono text-yellow-300 mb-2">Double Core Synergy</h4>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">주식회사 온리움디엔씨 정밀 제조 및 공동 생산 인프라</h3>
                  <p className="text-xs sm:text-sm text-blue-100 leading-relaxed mt-4">
                    WATER PRIME의 원천 특허 방재 특화 기어와 <strong>주식회사 온리움디엔씨의 압도적인 자본 조달망, 고성능 정밀 금형 조립 제조 라인</strong>이 하나로 만나, 신뢰할 수 있는 소방 규격 제품의 대량 생산 및 신속 조달을 책임집니다.
                  </p>
                </div>
                <button 
                  onClick={onContactClick}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs tracking-wider px-6 py-4 rounded-xl shadow-md flex-shrink-0 transition-colors uppercase inline-flex items-center gap-1.5 self-start lg:self-center"
                >
                  <span>제휴/도입 시너지 문의하기</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Download patent PDF in About Us */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-2xl text-blue-600 flex-shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black text-zinc-900">[회사소개 기술 특허 자료] 전기차 화재 대응 특화 소화 장치 특허서류</h4>
                  <p className="text-xs text-zinc-500 mt-1">대한민국 특허청 공식 출원 제 10-2025-0047078호 기술 명세서 및 특허 도면 명세 전문 PDF</p>
                </div>
              </div>
              <a 
                href="https://waterprime.co.kr/docs/patent-10-2025-0047078.pdf"
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="px-5 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs shadow-md transition-all duration-300 inline-flex items-center gap-2 whitespace-nowrap self-stretch md:self-center justify-center"
              >
                <span>특허서류 PDF 다운로드</span>
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        )}

        {/* ==================== TAB 2: 제품소개 (Products) ==================== */}
        {activeTab === 'products' && (
          <div className="space-y-20 animate-fadeIn">
            
            {/* Header intro */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono bg-blue-50 px-3 py-1 rounded-full">
                WATER PRIME PRODUCTS & SOLUTIONS
              </span>
              <h3 className="text-3xl font-black text-zinc-900 tracking-tight mt-4">
                EV 전기차 전용 침투형 소화기
              </h3>
              <p className="text-sm sm:text-base text-zinc-500 mt-4 leading-relaxed">
                전기차 배터리 팩 물리 구조의 완전 무장을 해제시키는 압도적 관통 능력과 
                다단 소화 포뮬러 주입 설계가 담긴 오직 하나뿐인 차세대 소화 유닛입니다.
              </p>
            </div>

            {/* Core Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-zinc-150 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 mb-5">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-zinc-900 mb-2">EV 화재 대응 특화 설계</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">전기차 배터리 화재의 핵심인 열폭주 차단용 관통 돌침 방식의 다단 주입식 특화 구조 설계.</p>
              </div>

              <div className="bg-white border border-zinc-150 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-5">
                  <Flame className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-zinc-900 mb-2">초기 확산 억제</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">열폭주 배터리 팩 최하단 코어 셀에 30초 이내 집중 분사를 개시해 골든타임 사수.</p>
              </div>

              <div className="bg-white border border-zinc-150 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-5">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-zinc-900 mb-2">간편한 사용성</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">복잡한 교육 없이 소방 전문가는 물론 경비원, 입주민도 즉각 안전 거치가 가능한 인체공학 구조.</p>
              </div>

              <div className="bg-white border border-zinc-150 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-5">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-zinc-900 mb-2">다양한 설치 환경</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">아파트 지하주차장 소방 거치함, 공공기관 의무 충전 타워 등 국내 규격 완벽 대응형 유연 설계.</p>
              </div>
            </div>

            {/* Interactive Product Carousel (No Mock / Highly Stylized) */}
            <div className="bg-white border border-zinc-150 rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Slideshow Selector Images */}
              <div className="lg:col-span-6 space-y-6">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-zinc-200 shadow-inner">
                  <img 
                    src={productSlides[activeProductImage].image} 
                    alt={productSlides[activeProductImage].title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-zinc-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase font-mono border border-white/10">
                    TYPE: {productSlides[activeProductImage].type}
                  </div>
                </div>

                {/* Indicators / Selector buttons */}
                <div className="flex gap-4">
                  {productSlides.map((slide, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveProductImage(idx)}
                      className={`flex-1 text-left p-3.5 rounded-xl border transition-all duration-300 ${
                        activeProductImage === idx
                          ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20'
                          : 'border-zinc-200 hover:border-zinc-400 bg-transparent'
                      }`}
                    >
                      <div className="text-[10px] font-mono font-bold text-zinc-400">PRODUCT 0{idx + 1}</div>
                      <div className="text-xs font-black text-zinc-800 mt-0.5 truncate">{slide.title}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slide Detail parameters */}
              <div className="lg:col-span-6 space-y-6">
                <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase font-mono">TECHNICAL DETAIL</span>
                <h4 className="text-2xl font-black text-zinc-900 tracking-tight">
                  {productSlides[activeProductImage].title}
                </h4>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {productSlides[activeProductImage].desc}
                </p>

                {/* Parameters specs list */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-100">
                  <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/60">
                    <span className="text-[9px] font-bold text-zinc-400 block font-mono uppercase tracking-widest">SPRAY RANGE</span>
                    <span className="text-sm font-black text-zinc-800 mt-1 block">{productSlides[activeProductImage].range}</span>
                  </div>
                  <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/60">
                    <span className="text-[9px] font-bold text-zinc-400 block font-mono uppercase tracking-widest">LIQUID CAPACITY</span>
                    <span className="text-sm font-black text-zinc-800 mt-1 block">{productSlides[activeProductImage].capacity}</span>
                  </div>
                  <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/60">
                    <span className="text-[9px] font-bold text-zinc-400 block font-mono uppercase tracking-widest">DEPLOYMENT COEFF</span>
                    <span className="text-sm font-black text-zinc-800 mt-1 block">{productSlides[activeProductImage].time}</span>
                  </div>
                  <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/60">
                    <span className="text-[9px] font-bold text-zinc-400 block font-mono uppercase tracking-widest">PRODUCT CERT</span>
                    <span className="text-sm font-black text-zinc-800 mt-1 block">KIPO 특허출원 완료</span>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    onClick={onContactClick}
                    className="flex-1 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs rounded-xl tracking-wider uppercase transition-colors"
                  >
                    제품 견적 문의 &rarr;
                  </button>
                  <button 
                    onClick={() => setActiveTab('tech')}
                    className="px-5 py-3 border border-zinc-250 hover:bg-zinc-50 text-zinc-700 font-bold text-xs rounded-xl transition-colors"
                  >
                    특허 자료 확인
                  </button>
                </div>
              </div>
            </div>

            {/* Simulated Live Action / 시연 현장 Gallery */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase font-mono">FIELD VERIFICATION</span>
                  <h3 className="text-2xl font-black text-zinc-900 tracking-tight mt-1">실제 대응 시연 현장</h3>
                </div>
                <span className="text-xs text-zinc-500 font-medium leading-relaxed">
                  전국 주요 소방서 및 지자체, 대단지 아파트 소방 합동 심의를 마쳐 완벽한 현장 작동성이 입증되었습니다.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-zinc-150 rounded-2xl overflow-hidden shadow-sm group">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={waterprimeDemo1} 
                      alt="현장 출동 시연" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-3 left-3 bg-zinc-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[10px] font-bold font-mono">01</span>
                  </div>
                  <div className="p-5">
                    <h4 className="text-sm font-black text-zinc-900 mb-1">현장 출동 시연</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">실제 소방 대원 및 관리 주체 배석 하 안전 신속 거치 및 장비 가동 메커니즘 전개 시연.</p>
                  </div>
                </div>

                <div className="bg-white border border-zinc-150 rounded-2xl overflow-hidden shadow-sm group">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={waterprimeDemo2} 
                      alt="실전 분사 테스트" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-3 left-3 bg-zinc-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[10px] font-bold font-mono">02</span>
                  </div>
                  <div className="p-5">
                    <h4 className="text-sm font-black text-zinc-900 mb-1">실전 분사 테스트</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">리튬이온 배터리 열폭주 모형 셀 내로 관통 핀 침투 고압 질소 및 소화 약제 연속 분사 냉각 성공.</p>
                  </div>
                </div>

                <div className="bg-white border border-zinc-150 rounded-2xl overflow-hidden shadow-sm group">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={waterprimeDemo3} 
                      alt="대응 훈련 현장" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-3 left-3 bg-zinc-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[10px] font-bold font-mono">03</span>
                  </div>
                  <div className="p-5">
                    <h4 className="text-sm font-black text-zinc-900 mb-1">대응 훈련 현장</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">대규모 지하 주차구역 가상 화재 합동 모의 소방훈련 연계 즉시 살포 가이드라인 및 매뉴얼 훈련.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-8 pt-10">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-[10px] font-mono font-bold tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase">PRICING — 05</span>
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 mt-3">투명한 가격 정책</h3>
                <p className="text-xs sm:text-sm text-zinc-500 mt-2 leading-relaxed">단품 구매부터 완벽한 방재 안전을 위한 24시간 실시간 조달 케어 옵션을 선택하세요.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* 1. Outright Purchase Card */}
                <div className="md:col-span-4 bg-white border border-zinc-150 rounded-3xl p-6 sm:p-8 shadow-sm hover:border-zinc-300 transition-colors">
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">PRODUCT ONLY</span>
                  <h4 className="text-lg font-black text-zinc-900 mt-2">본품 단일 구매</h4>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">워터프라임 소화기 본품 수령 및 입주단지 소방거치대에 자체 관리 보관용.</p>
                  
                  <div className="my-8">
                    <span className="text-4xl font-black text-zinc-900">495</span>
                    <span className="text-sm font-bold text-zinc-500 ml-1">만원 (부가세 별도)</span>
                  </div>

                  <ul className="space-y-3.5 text-xs text-zinc-650 border-t border-zinc-100 pt-6">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>워터프라임 배터리 침투식 본품 1대</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>고성능 가이드 호스 및 가압 키트</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>상세 거치 가이드 및 보관 매뉴얼</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>본사 공식 품질 보증 1년 (A/S 제공)</span>
                    </li>
                  </ul>
                </div>

                {/* 2. Premium 24H Managed Service Card */}
                <div className="md:col-span-4 bg-gradient-to-b from-zinc-900 to-zinc-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-zinc-800">
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase font-mono animate-pulse">
                    BEST CHOICE
                  </div>
                  
                  <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">MANAGED SERVICE</span>
                  <h4 className="text-lg font-black text-white mt-2">24시간 관리 서비스</h4>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">정기적인 사후 수습과 긴급 전담 매니저 매칭을 통한 완벽한 안전 관리 패키지.</p>
                  
                  <div className="my-8">
                    <span className="text-4xl font-black text-white">180,000</span>
                    <span className="text-sm font-bold text-zinc-400 ml-1">원 / 월</span>
                  </div>

                  <ul className="space-y-3.5 text-xs text-zinc-300 border-t border-zinc-800 pt-6 mb-8">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>24시간 사고 현장 출동 기술 지원</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>분기별 1회 정밀 하드웨어 보건 점검</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>연 2회 입주민/방재팀 전원 소방 훈련 교육</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>전담 케어 소방 전위 매니저 배정</span>
                    </li>
                  </ul>

                  <button 
                    onClick={onContactClick}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold tracking-widest rounded-xl shadow-md uppercase transition-all duration-300"
                  >
                    관리 서비스 신청하기
                  </button>
                </div>

                {/* 3. Custom / Extra Services Cards */}
                <div className="md:col-span-4 bg-white border border-zinc-150 rounded-3xl p-6 sm:p-8 shadow-sm hover:border-zinc-300 transition-colors">
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">INDIVIDUAL OPTIONS</span>
                  <h4 className="text-lg font-black text-zinc-900 mt-2">개별 서비스 옵션</h4>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">필요한 항목만 개별적으로 단품 신청 및 정산하는 실용 옵션.</p>
                  
                  <div className="mt-6 border-t border-zinc-100 pt-4 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-700">긴급 소방 출동 서비스</span>
                      <span className="font-mono font-black text-zinc-900">100,000원 / 회</span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-t border-zinc-50 pt-3">
                      <span className="font-bold text-zinc-700">수시 기기 정밀점검</span>
                      <span className="font-mono font-black text-zinc-900">100,000원 / 회</span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-t border-zinc-50 pt-3">
                      <span className="font-bold text-zinc-700">사고 후속 조치/수습</span>
                      <span className="font-mono font-black text-zinc-900">300,000원 / 회</span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-t border-zinc-50 pt-3">
                      <span className="font-bold text-zinc-700">임직원 소방 정기 교육</span>
                      <span className="font-mono font-black text-zinc-900">400,000원 / 5인</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-zinc-400 leading-normal mt-10">
                    * 위 금액은 현장 환경 및 도입 개소 수량에 따라 차등 적용되므로, 상세 견적은 반드시 본사 전담 영업망을 통해 컨설팅 받으시길 권장합니다.
                  </p>
                </div>

              </div>
            </div>

            {/* Download design PDF in Products */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-2xl text-purple-600 flex-shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black text-zinc-900">[제품소개 외관 디자인 자료] 워터프라임 소화기 외관 디자인 등록서류</h4>
                  <p className="text-xs text-zinc-500 mt-1">대한민국 특허청 공식 디자인 등록 제 30-2025-0013240호 디자인 명세서 및 투시도 명세 전문 PDF</p>
                </div>
              </div>
              <a 
                href="https://waterprime.co.kr/docs/design-30-2025-0013240.pdf"
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="px-5 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs shadow-md transition-all duration-300 inline-flex items-center gap-2 whitespace-nowrap self-stretch md:self-center justify-center"
              >
                <span>외관디자인 PDF 다운로드</span>
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        )}

        {/* ==================== TAB 3: 기술 인증 (Technology & Certifications) ==================== */}
        {activeTab === 'tech' && (
          <div className="space-y-20 animate-fadeIn">
            
            {/* Core Tech Analysis section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest font-mono block">— TECHNOLOGY — 06</span>
                <h3 className="text-3xl font-black text-zinc-900 tracking-tight leading-tight">
                  열폭주 분석 기반의<br />
                  현장 중심 안전 기술
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  WATER PRIME의 핵심 강점은 배터리 내부 압력 조율과 직접 소화액 강제 관통 메커니즘에 있습니다. 단순 표면 냉각에 머무르는 기존 소수 대안물과 격이 다른 소방 학술 R&D 데이터를 바탕으로 안전 솔루션을 구현합니다.
                </p>

                {/* Flow step list */}
                <div className="space-y-4 pt-4">
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-650 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">01</div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-zinc-900">화재 감지</h5>
                      <p className="text-xs text-zinc-500 leading-relaxed mt-1">충전 주차구역 온도 이상 증가 센싱 및 대피 알림 유기적 발동.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start border-t border-zinc-100 pt-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-650 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">02</div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-zinc-900">초기 진압</h5>
                      <p className="text-xs text-zinc-500 leading-relaxed mt-1">특허 관통 돌침을 이용해 골든타임 30초 내 내부 직접 가스포 주입 개시.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start border-t border-zinc-100 pt-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-650 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">03</div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-zinc-900">확산 차단</h5>
                      <p className="text-xs text-zinc-500 leading-relaxed mt-1">배터리 인접 셀 간 극소 산소 차단막 주입을 통한 연쇄 전폭 및 전소 완전 원천 차폐.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-zinc-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-zinc-800 relative overflow-hidden flex flex-col justify-between min-h-[400px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
                
                <div>
                  <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-6">
                    <div>
                      <span className="text-[10px] font-bold text-red-400 font-mono tracking-widest uppercase">Battery Core Sensor Diagnostic</span>
                      <h4 className="text-lg font-bold text-white mt-1">실시간 배터리 모듈 모의 제어</h4>
                    </div>
                    <span className="text-xs font-bold text-red-500 bg-red-950/80 border border-red-900/60 px-2 py-0.5 rounded-full animate-pulse">
                      ● CORE TEMP 1,000℃+
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-8">
                    리튬 배터리 열폭주 발생 시 화재 중심 셀을 실시간 자동 파괴 관통 소화하여 전체 차량으로 번지는 전파 압력을 상실시키는 유기적 피딩 메커니즘 도식화.
                  </p>

                  {/* Grid of Battery Simulator elements */}
                  <div className="grid grid-cols-6 gap-2">
                    {Array.from({ length: 12 }).map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`aspect-square rounded-lg border flex flex-col items-center justify-center text-[10px] font-mono font-bold transition-all duration-1000 ${
                          idx === 6 
                            ? 'bg-red-600 border-red-500 text-white animate-pulse shadow-lg shadow-red-600/50 scale-105' 
                            : 'bg-zinc-900/80 border-zinc-800 text-zinc-500'
                        }`}
                      >
                        <span>C{idx + 1}</span>
                        <span className={`text-[8px] mt-0.5 ${idx === 6 ? 'text-white' : 'text-zinc-650'}`}>
                          {idx === 6 ? '1020°C' : '26°C'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mt-8 flex items-center justify-between text-xs font-bold text-zinc-400 font-mono">
                  <span>WATER PRIME TELEMETRY SIMULATION</span>
                  <span>STATUS: READY</span>
                </div>
              </div>
            </div>

            {/* Crucial Patents & Registrations with direct PDF links */}
            <div className="space-y-8 pt-10" id="tech-patents">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-[10px] font-mono font-bold tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase">KIPO PATENT — 08</span>
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 mt-3">특허 및 디자인 등록 현황</h3>
                <p className="text-xs sm:text-sm text-zinc-500 mt-2 leading-relaxed">
                  WATER PRIME의 독창적인 기술과 인체공학적 안전 디자인 설계는 특허청(KIPO)에 엄격히 공식 등록되어 권리를 완벽히 보호받고 있습니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* 1. Patent Link Card */}
                <div className="bg-white border border-zinc-150 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl group-hover:scale-150 transition-all duration-500" />
                  
                  <div>
                    {/* Header with circular KIPO badge */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">KIPO PATENT</span>
                        <span className="text-xs font-bold text-blue-600 uppercase mt-0.5">특허 출원 완료</span>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center bg-zinc-50 select-none flex-shrink-0 shadow-inner group-hover:border-blue-200 transition-colors">
                        <span className="text-[10px] font-black text-zinc-800 tracking-tighter">KIPO</span>
                      </div>
                    </div>

                    <h4 className="text-lg font-black text-zinc-900 leading-tight mb-2">
                      전기차 화재 대응 특화 소화 장치
                    </h4>
                    <p className="text-xs text-zinc-500 font-mono bg-zinc-50 border border-zinc-150 px-2.5 py-1 rounded-md inline-block">
                      제 10-2025-0047078호
                    </p>
                    <p className="text-xs text-zinc-500 leading-relaxed mt-4">
                      열폭주 반응 중인 고온 배터리 팩 내부 하우징을 안전거리에서 강력 돌출 관통하여 가압 가스와 복합 액체 소방물질을 직송 주입하는 특허 구조 설계입니다.
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-100">
                    <a 
                      href="https://waterprime.co.kr/docs/patent-10-2025-0047078.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs rounded-xl tracking-wider uppercase transition-colors shadow-sm"
                    >
                      <FileText className="w-4 h-4" />
                      <span>출원서류 PDF 다운로드</span>
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* 2. Design 1 Link Card */}
                <div className="bg-white border border-zinc-150 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:scale-150 transition-all duration-500" />
                  
                  <div>
                    {/* Header with circular KIPO badge */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">KIPO DESIGN</span>
                        <span className="text-xs font-bold text-purple-600 uppercase mt-0.5">디자인 등록 완료</span>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center bg-zinc-50 select-none flex-shrink-0 shadow-inner group-hover:border-purple-200 transition-colors">
                        <span className="text-[10px] font-black text-zinc-800 tracking-tighter">KIPO</span>
                      </div>
                    </div>

                    <h4 className="text-lg font-black text-zinc-900 leading-tight mb-2">
                      워터프라임 소화기 외관 디자인
                    </h4>
                    <p className="text-xs text-zinc-500 font-mono bg-zinc-50 border border-zinc-150 px-2.5 py-1 rounded-md inline-block">
                      제 30-2025-0013240호
                    </p>
                    <p className="text-xs text-zinc-500 leading-relaxed mt-4">
                      비전문가 및 방재 주체가 긴장된 비상 상황 하에서도 무의식적으로 즉각 쥐고 거치할 수 있도록 최적 각도 설계된 유압 파워 어셈블리 외관 디자인 구조입니다.
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-100">
                    <a 
                      href="https://waterprime.co.kr/docs/design-30-2025-0013240.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs rounded-xl tracking-wider uppercase transition-colors shadow-sm"
                    >
                      <FileText className="w-4 h-4" />
                      <span>출원서류 PDF 다운로드</span>
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* 3. Design 2 Link Card */}
                <div className="bg-white border border-zinc-150 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:scale-150 transition-all duration-500" />
                  
                  <div>
                    {/* Header with circular KIPO badge */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">KIPO DESIGN</span>
                        <span className="text-xs font-bold text-emerald-600 uppercase mt-0.5">디자인 등록 완료</span>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center bg-zinc-50 select-none flex-shrink-0 shadow-inner group-hover:border-emerald-200 transition-colors">
                        <span className="text-[10px] font-black text-zinc-800 tracking-tighter">KIPO</span>
                      </div>
                    </div>

                    <h4 className="text-lg font-black text-zinc-900 leading-tight mb-2">
                      워터프라임 분사 노즐 구조 디자인
                    </h4>
                    <p className="text-xs text-zinc-500 font-mono bg-zinc-50 border border-zinc-150 px-2.5 py-1 rounded-md inline-block">
                      제 30-2025-0013241호
                    </p>
                    <p className="text-xs text-zinc-500 leading-relaxed mt-4">
                      관통과 동시에 복사열을 신속 무력화하기 위한 입체 홀 분사 배치 설계로, 약제 유도각 분사 성능을 비약적으로 조율한 특화 침투 분사 팁 디자인입니다.
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-100">
                    <a 
                      href="https://waterprime.co.kr/docs/design-30-2025-0013241.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs rounded-xl tracking-wider uppercase transition-colors shadow-sm"
                    >
                      <FileText className="w-4 h-4" />
                      <span>출원서류 PDF 다운로드</span>
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ==================== TAB 4: 고객센터 (Customer Center / support) ==================== */}
        {activeTab === 'support' && (
          <div className="space-y-20 animate-fadeIn">
            
            {/* Customer Center Intro Title */}
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono bg-blue-50 px-3 py-1 rounded-full">
                WATER PRIME CUSTOMER SUPPORT
              </span>
              <h3 className="text-3xl font-black text-zinc-900 tracking-tight mt-4">
                고객의 안전과 만족을 최우선으로
              </h3>
              <p className="text-sm sm:text-base text-zinc-500 mt-4 leading-relaxed">
                WATER PRIME 도입 상담, 카탈로그 요청, 정기 A/S 안전 기술 지원 등 
                모든 의문을 소방 방재 전문 엔지니어와 실시간 소통하여 신속히 해결하세요.
              </p>
            </div>

            {/* Quick Action Hub Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-zinc-150 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                    <Info className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-black text-zinc-900 mb-2">공지사항</h4>
                  <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                    WATER PRIME의 최신 성능 업그레이드 소식, 법령 개정에 따른 소방 기준 안내, 주요 안전 시연 세미나 행사 정보를 확인하십시오.
                  </p>
                </div>
                <button 
                  onClick={() => alert("현재 준비 중인 공지사항 게시판입니다.")}
                  className="mt-8 text-xs font-bold text-blue-650 hover:text-blue-800 text-left"
                >
                  자세히 보기 &rarr;
                </button>
              </div>

              <div className="bg-white border border-zinc-150 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-black text-zinc-900 mb-2">A/S 및 기술지원</h4>
                  <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                    구축 단지의 안전성 유지를 위해, 현장 조치 가이드, 오작동 자가 점검 및 부품 노화 교체 소방 엔지니어 기술 지원을 신청하세요.
                  </p>
                </div>
                <button 
                  onClick={onContactClick}
                  className="mt-8 text-xs font-bold text-orange-650 hover:text-orange-800 text-left"
                >
                  신청하기 &rarr;
                </button>
              </div>

              <div className="bg-white border border-zinc-150 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-black text-zinc-900 mb-2">카탈로그 다운로드</h4>
                  <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                    아파트 입주민 대표회의, 기관 조달 심의에 즉시 사용 가능한 당사의 정밀 세부 기술 카탈로그 및 포트폴리오를 받아보실 수 있습니다.
                  </p>
                </div>
                <button 
                  onClick={onContactClick}
                  className="mt-8 text-xs font-bold text-purple-650 hover:text-purple-850 text-left"
                >
                  다운로드 신청 &rarr;
                </button>
              </div>
            </div>

            {/* Customer Center Download / Technical Document Center */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-200 pb-5">
                <div>
                  <h4 className="text-lg font-black text-zinc-900">WATER PRIME 공식 기술/디자인 증빙 자료실</h4>
                  <p className="text-xs text-zinc-500 mt-1">소방 허가 심의, 주민대표회의 증빙 제출에 즉시 사용 가능한 공식 규격 출원 서류 일체입니다.</p>
                </div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full uppercase font-mono">
                  3 Documents Loaded
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* File 1 */}
                <a 
                  href="https://waterprime.co.kr/docs/patent-10-2025-0047078.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="bg-white hover:bg-zinc-100/65 border border-zinc-200 p-5 rounded-2xl flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div className="text-left">
                      <span className="text-xs font-bold text-zinc-800 block">특허 출원 명세서</span>
                      <span className="text-[10px] text-zinc-400 font-mono">제 10-2025-0047078호</span>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                </a>

                {/* File 2 */}
                <a 
                  href="https://waterprime.co.kr/docs/design-30-2025-0013240.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="bg-white hover:bg-zinc-100/65 border border-zinc-200 p-5 rounded-2xl flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <div className="text-left">
                      <span className="text-xs font-bold text-zinc-800 block">외관 디자인 등록증</span>
                      <span className="text-[10px] text-zinc-400 font-mono">제 30-2025-0013240호</span>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-zinc-400 group-hover:text-purple-600 transition-colors" />
                </a>

                {/* File 3 */}
                <a 
                  href="https://waterprime.co.kr/docs/design-30-2025-0013241.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="bg-white hover:bg-zinc-100/65 border border-zinc-200 p-5 rounded-2xl flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <div className="text-left">
                      <span className="text-xs font-bold text-zinc-800 block">분사 노즐 디자인 등록증</span>
                      <span className="text-[10px] text-zinc-400 font-mono">제 30-2025-0013241호</span>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
                </a>
              </div>
            </div>

            {/* YouTube Analysis Action Link Banner */}
            <div className="bg-red-50 border border-red-200/60 rounded-3xl p-8 flex flex-col lg:flex-row items-center gap-8 justify-between shadow-sm relative overflow-hidden group">
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-red-500/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/10 group-hover:scale-105 transition-transform flex-shrink-0">
                  <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-red-600 uppercase tracking-widest font-mono block">Media & News — 07</span>
                  <h4 className="text-base sm:text-lg font-extrabold text-zinc-900 mt-1">영상으로 보는 전기차 화재 배터리 폭발 위험성</h4>
                  <p className="text-xs text-zinc-500 mt-1">유튜브 공식 실전 테스트 시연 및 보도 영상을 통해 EV 화재 위협의 실상과 대응책을 확인해 보세요.</p>
                </div>
              </div>
              
              <a 
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 transition-colors px-6 py-3.5 rounded-xl shadow-md w-full lg:w-auto flex-shrink-0"
              >
                시연 영상 바로가기
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Accordion FAQ section */}
            <div className="space-y-6 pt-6">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-[10px] font-mono font-bold tracking-widest text-blue-600 uppercase">FAQ — 09</span>
                <h3 className="text-2xl font-black text-zinc-900 mt-1">자주 묻는 질문</h3>
              </div>

              <div className="max-w-3xl mx-auto space-y-4">
                
                {/* FAQ 1 */}
                <div className="bg-white border border-zinc-150 rounded-2xl overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleFaq(0)}
                    className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 text-sm sm:text-base font-bold text-zinc-900 hover:bg-zinc-50"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span>Q. 전기차 화재는 일반 소화기로 진압 가능한가요?</span>
                    </span>
                    {activeFaq === 0 ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                  </button>
                  
                  {activeFaq === 0 && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 animate-fadeIn">
                      전기차 배터리 화재는 일반 화재와 연소 메커니즘 자체가 다릅니다. 고전압 배터리 내부에 에너지가 응축되어 있으며, 외부 공기 공급 없이 자체 열폭주(Thermal Runaway)를 거듭하므로, 일반 ABC 분말 소화제는 표면에만 묻고 내부 온도하강을 유도하지 못합니다. 반드시 배터리 팩 내부로 침투하여 다이렉트 소화 포뮬러를 주입할 수 있는 <strong>WATER PRIME 전용 초기 대응 침투 장비와 전문 소방 체계</strong>가 필요합니다.
                    </div>
                  )}
                </div>

                {/* FAQ 2 */}
                <div className="bg-white border border-zinc-150 rounded-2xl overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleFaq(1)}
                    className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 text-sm sm:text-base font-bold text-zinc-900 hover:bg-zinc-50"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span>Q. 어떤 장소에 설치가 필요한가요?</span>
                    </span>
                    {activeFaq === 1 ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                  </button>
                  
                  {activeFaq === 1 && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 animate-fadeIn">
                      전기차 충전 및 상시 주차가 활발하게 일어나는 모든 인프라 존이 주요 도입 대상입니다. 대표적으로 <strong>아파트 지하주차장 소방 구역, 공공기관 빌딩 충전 스탠드, 대형 쇼핑몰 및 백화점 물류 하역 구역, 그리고 배터리 충전 빈도가 높은 관공서 및 물류센터 거점</strong>입니다. 각 장소의 배관 배치, 소방 연동망, 주차 면수에 알맞은 상세 설치 환경 및 소화 용량 배치에 대하여 당사 소방 전담팀의 맞춤 전문 컨설팅을 즉시 지원해 드립니다.
                    </div>
                  )}
                </div>

                {/* FAQ 3 */}
                <div className="bg-white border border-zinc-150 rounded-2xl overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleFaq(2)}
                    className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 text-sm sm:text-base font-bold text-zinc-900 hover:bg-zinc-50"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span>Q. 대량 구매 및 납품 상담이 가능한가요?</span>
                    </span>
                    {activeFaq === 2 ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                  </button>
                  
                  {activeFaq === 2 && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 animate-fadeIn">
                      네, 적극적으로 가능합니다. 관공서 조달 대량 납품, 1,000세대 이상 아파트 신축 단지 일괄 분양 거치대 도입, 기업용 플랜트 충전타워 대량 패키지 구매 등에 대하여 당사의 <strong>B2B 전담 영업 추진팀</strong>에서 정밀 조율된 세부 조력 상담을 상시 전개하고 있습니다. 현장의 상세 구조에 부합하는 소방 심의 도서 자료 배포 및 대량 공급 조건에 최적화된 최상의 특별 견적과 장기 무상 메인터넌스 혜택을 함께 약속드립니다.
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        )}

      </div>

      {/* 5. Direct Footer Inquiry Callout Banner */}
      <div className="bg-zinc-100 border-t border-zinc-200 py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h4 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">전기차 안전, 완벽하게 대비하십시오.</h4>
          <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed mt-3 max-w-xl mx-auto">
            망설이는 찰나의 순간이 엄청난 자산 참사와 생명 위협으로 이어질 수 있습니다. 특허와 자본이 융합된 단 하나의 안전 브랜드 WATER PRIME와 지금 즉시 논의하세요.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={onContactClick}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl tracking-wider uppercase shadow-md shadow-blue-600/10 transition-colors inline-flex items-center gap-1.5"
            >
              <span>전담 컨설턴트 무료 통화 상담 신청</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </button>
            <button
              onClick={() => {
                setActiveTab('tech');
                const el = document.getElementById('waterprime-content-start');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="px-6 py-3.5 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-250 font-bold text-xs rounded-xl tracking-wider transition-colors"
            >
              특허 및 디자인 출원서 받기
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
