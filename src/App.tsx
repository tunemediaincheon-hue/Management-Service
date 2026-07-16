/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  DEFAULT_SETTINGS, 
  DEFAULT_SERVICES, 
  DEFAULT_PORTFOLIO, 
  DEFAULT_BLOGS, 
  DEFAULT_INQUIRIES 
} from './defaultData';
import { SiteSettings, ServiceItem, PortfolioItem, BlogPost, Inquiry } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import IntroSection from './components/IntroSection';
import BusinessSection from './components/BusinessSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import AboutPages from './components/AboutPages';
import Reference from './components/Reference';
import WaterPrimePage from './components/WaterPrimePage';

// ----------------------------------------------------
// Safe localStorage wrapper to prevent crash in IFrame / sandbox
// ----------------------------------------------------
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn(`localStorage.getItem failed for key "${key}":`, e);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`localStorage.setItem failed for key "${key}":`, e);
    }
  }
};

export default function App() {
  // ----------------------------------------------------
  // Persistent States loaded from LocalStorage
  // ----------------------------------------------------
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = safeLocalStorage.getItem('tunemedia_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Check if old default title or subtitle exists, and migrate to new values
        if (parsed.heroTitle === "오프라인 공간에\n지능형 디지털 경험을 채우다" || parsed.heroTitle === "오프라인 공간에 지능형 디지털 경험을 채우다") {
          parsed.heroTitle = "고객과 함께 오프라인 공간의 가치를 높입니다.";
        }
        if (!parsed.heroSubtitle || parsed.heroSubtitle === "Tuning every moment with Tune Media_" || parsed.heroSubtitle.includes("정적인 오프라인 공간을 데이터 기반의 생동감 넘치는 스마트 플레이스로") || parsed.heroSubtitle.includes("ONRIUM DMC")) {
          parsed.heroSubtitle = "Tuning every moment with Tune Media under ONRIUM D&C_";
        }
        // Force update of address to correct spelling and new requested location
        if (!parsed.address || parsed.address.includes("청능대") || parsed.address.includes("메디컬센터") || parsed.address.includes("테헤란로") || parsed.address.includes("해정타운")) {
          parsed.address = "인천광역시 미추홀구 석정로 229, 5층 (도화동, 행정타운 및 JST)";
        }
        // Force update of CEO and Registration Number if old defaults
        if (!parsed.ceo || parsed.ceo === "김툰미" || parsed.ceo === "김홍국, 이순미" || parsed.ceo.includes("이순미")) {
          parsed.ceo = "주현정";
        }
        if (!parsed.registrationNumber || parsed.registrationNumber === "120-88-12345" || parsed.registrationNumber === "211-88-80505") {
          parsed.registrationNumber = "589-19-02880";
        }
        if (!parsed.phone || parsed.phone === "02-1234-5678" || parsed.phone === "02-546-0804") {
          parsed.phone = "010-9654-9882";
        }
        if (!parsed.email || parsed.email === "contact@tunemedia.io" || parsed.email === "yhkim@tunemedia.co.kr") {
          parsed.email = "tunemediaincheon@gmail.com";
        }
        
        // Brand Rebranding auto-migration
        if (!parsed.logoText || parsed.logoText === "tunemedia" || parsed.logoText.includes("툰미디어") || parsed.logoText.includes("온리움디엠씨")) {
          parsed.logoText = "온리움디엔씨";
        }
        if (!parsed.logoSubText || parsed.logoSubText === "space DT solutions" || parsed.logoSubText === "tunemedai solution") {
          parsed.logoSubText = "tunemedia solution";
        }
        if (!parsed.companyName || parsed.companyName.includes("툰미디어") || parsed.companyName === "주식회사 툰미디어 (tunemedia Co., Ltd.)" || parsed.companyName.includes("온리움디엠씨") || parsed.companyName.includes("ONRIUM DMC")) {
          parsed.companyName = "주식회사 온리움디엔씨 (ONRIUM D&C Co., Ltd.)";
        }
        if (!parsed.metaTitle || parsed.metaTitle.includes("tunemedia") || parsed.metaTitle.includes("툰미디어") || parsed.metaTitle.includes("온리움디엠씨")) {
          parsed.metaTitle = "온리움디엔씨 | 온리움디엔씨 공간 DT 전문 브랜드 튠 미디어";
        }
        if (!parsed.metaDescription || parsed.metaDescription.includes("툰미디어는 디지털 사이니지") || parsed.metaDescription.includes("tunemedai") || parsed.metaDescription.includes("온리움디엠씨")) {
          parsed.metaDescription = "주식회사 온리움디엔씨는 공간 DT 전문 브랜드 튠 미디어(tunemedia)를 두고, 디지털 사이니지, AI 비전 분석, IoT 연동 센서 등을 활용하여 혁신적인 오프라인 디지털 트랜스포메이션을 제공합니다.";
        }
        if (!parsed.metaKeywords || parsed.metaKeywords.includes("tunemedia, 툰미디어") || parsed.metaKeywords.includes("tunemedai") || parsed.metaKeywords.includes("온리움디엠씨") || parsed.metaKeywords.includes("온리움DMC")) {
          parsed.metaKeywords = "온리움디엔씨, 온리움D&C, tunemedia, 튠 미디어, 툰미디어, 공간DT, 디지털트랜스포메이션, 디지털사이니지, AI비전, 매장분석, IoT센서";
        }
        if (!parsed.heroBadge || parsed.heroBadge === "OFFLINE SPACE DIGITAL TRANSFORMATION" || parsed.heroBadge === "ONRIUM DMC | TUNEMEDAI SPACE DT" || parsed.heroBadge.includes("ONRIUM DMC")) {
          parsed.heroBadge = "ONRIUM D&C | TUNEMEDIA SPACE DT";
        }
        
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse tunemedia_settings from localStorage:', e);
    }
    return DEFAULT_SETTINGS;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = safeLocalStorage.getItem('tunemedia_services');
      return saved ? JSON.parse(saved) : DEFAULT_SERVICES;
    } catch (e) {
      console.error('Failed to parse tunemedia_services from localStorage, falling back to defaults:', e);
      return DEFAULT_SERVICES;
    }
  });

  const [projects, setProjects] = useState<PortfolioItem[]>(() => {
    try {
      const saved = safeLocalStorage.getItem('tunemedia_projects');
      return saved ? JSON.parse(saved) : DEFAULT_PORTFOLIO;
    } catch (e) {
      console.error('Failed to parse tunemedia_projects from localStorage, falling back to defaults:', e);
      return DEFAULT_PORTFOLIO;
    }
  });

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    try {
      const saved = safeLocalStorage.getItem('tunemedia_blogs');
      return saved ? JSON.parse(saved) : DEFAULT_BLOGS;
    } catch (e) {
      console.error('Failed to parse tunemedia_blogs from localStorage, falling back to defaults:', e);
      return DEFAULT_BLOGS;
    }
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = safeLocalStorage.getItem('tunemedia_inquiries');
      return saved ? JSON.parse(saved) : DEFAULT_INQUIRIES;
    } catch (e) {
      console.error('Failed to parse tunemedia_inquiries from localStorage, falling back to defaults:', e);
      return DEFAULT_INQUIRIES;
    }
  });

  // UI Control states
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [currentPage, setCurrentPage] = useState<'home' | 'greetings' | 'org' | 'history' | 'map' | 'reference' | 'digital-signage' | 'smart-ai' | 'smart-iot' | 'smart-service' | 'waterprime'>('home');

  // ----------------------------------------------------
  // Save changes to LocalStorage on updates
  // ----------------------------------------------------
  useEffect(() => {
    safeLocalStorage.setItem('tunemedia_settings', JSON.stringify(settings));
    
    // Dynamically update standard SEO metadata on the page
    if (settings.metaTitle) {
      document.title = settings.metaTitle;
    }
    
    // Description meta tag
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', settings.metaDescription || '');

    // Keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', settings.metaKeywords || '');
  }, [settings]);

  useEffect(() => {
    safeLocalStorage.setItem('tunemedia_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    safeLocalStorage.setItem('tunemedia_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    safeLocalStorage.setItem('tunemedia_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    safeLocalStorage.setItem('tunemedia_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // ----------------------------------------------------
  // Scroll Listener for active navigation highlighting
  // ----------------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      if (isAdminMode) return;
      const sections = ['hero', 'intro', 'services', 'contact'];
      // scroll buffer
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdminMode]);

  // ----------------------------------------------------
  // Action Handlers
  // ----------------------------------------------------
  const handleScrollToSection = (id: string) => {
    if (isAdminMode) {
      // Exit admin mode and scroll to section
      setIsAdminMode(false);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  const handleInboundInquiry = (data: { name: string; email: string; company: string; content: string }) => {
    const newInquiry: Inquiry = {
      id: `inq_${Date.now()}`,
      name: data.name,
      email: data.email,
      company: data.company,
      content: data.content,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'new'
    };
    setInquiries([newInquiry, ...inquiries]);
  };

  const handleResetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    setServices(DEFAULT_SERVICES);
    setProjects(DEFAULT_PORTFOLIO);
    setBlogs(DEFAULT_BLOGS);
    setInquiries(DEFAULT_INQUIRIES);
  };

  // Convert hex color to semi-transparent hexes for styles
  const primaryAccent = settings.accentColor || '#8B5CF6';
  const accentLight = `${primaryAccent}25`; // ~15% opacity
  const accentHover = `${primaryAccent}dd`; // ~85% opacity

  return (
    <div className="bg-white text-zinc-900 min-h-screen relative font-sans">
      
      {/* Real-time Dynamic CSS Variables Injector */}
      <style>{`
        :root {
          --accent-color: ${primaryAccent};
          --accent-color-hover: ${accentHover};
          --accent-color-light: ${accentLight};
        }
        
        /* Smooth transitions */
        .animate-fadeIn {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-scaleUp {
          animation: scaleUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }

        /* Wave movement keyframes */
        @keyframes waveMove {
          0% {
            transform: translate3d(-90px, 0, 0);
          }
          100% {
            transform: translate3d(85px, 0, 0);
          }
        }
        
        .animate-wave-slow {
          animation: waveMove 25s cubic-bezier(.55,.5,.45,.5) infinite;
        }
        .animate-wave-medium {
          animation: waveMove 18s cubic-bezier(.55,.5,.45,.5) infinite;
          animation-delay: -2s;
        }
        .animate-wave-fast {
          animation: waveMove 12s cubic-bezier(.55,.5,.45,.5) infinite;
          animation-delay: -4s;
        }
        .animate-wave-base {
          animation: waveMove 8s cubic-bezier(.55,.5,.45,.5) infinite;
          animation-delay: -5s;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #ffffff;
        }
        ::-webkit-scrollbar-thumb {
          background: #e4e4e7;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: var(--accent-color);
        }

        /* Admin Panel Custom Light Theme Styling overrides */
        .admin-panel-light, .admin-panel-light div, .admin-panel-light aside, .admin-panel-light main {
          background-color: #ffffff !important;
          color: #27272a !important;
          border-color: #e4e4e7 !important;
        }
        .admin-panel-light aside {
          background-color: #fafafa !important;
          border-color: #e4e4e7 !important;
        }
        .admin-panel-light main {
          background-color: #ffffff !important;
        }
        /* inputs inside admin panel */
        .admin-panel-light input, 
        .admin-panel-light textarea, 
        .admin-panel-light select {
          background-color: #ffffff !important;
          border-color: #d4d4d8 !important;
          color: #18181b !important;
        }
        .admin-panel-light input:focus, 
        .admin-panel-light textarea:focus {
          border-color: var(--accent-color) !important;
          outline: none;
          box-ring: 1px var(--accent-color);
        }
        /* cards inside admin panel */
        .admin-panel-light .bg-zinc-900\/40,
        .admin-panel-light .bg-zinc-900\/20,
        .admin-panel-light .bg-zinc-900\/10,
        .admin-panel-light .bg-black\/40 {
          background-color: #fafafa !important;
          border-color: #e4e4e7 !important;
        }
        .admin-panel-light .text-white {
          color: #09090b !important;
        }
        .admin-panel-light .text-zinc-300 {
          color: #27272a !important;
        }
        .admin-panel-light .text-zinc-400 {
          color: #52525b !important;
        }
        .admin-panel-light .text-zinc-500 {
          color: #71717a !important;
        }
        .admin-panel-light .text-zinc-650 {
          color: #3f3f46 !important;
        }
        /* table backgrounds */
        .admin-panel-light .bg-zinc-950,
        .admin-panel-light .bg-zinc-950\/60 {
          background-color: #f4f4f5 !important;
          color: #18181b !important;
        }
        .admin-panel-light .border-zinc-900,
        .admin-panel-light .border-zinc-800,
        .admin-panel-light .border-zinc-850 {
          border-color: #e4e4e7 !important;
        }
        .admin-panel-light tr.hover\:bg-zinc-900\/10:hover {
          background-color: #f4f4f5 !important;
        }
        /* buttons & labels */
        .admin-panel-light button.bg-zinc-900,
        .admin-panel-light label.bg-zinc-900 {
          background-color: #f4f4f5 !important;
          border-color: #e4e4e7 !important;
          color: #27272a !important;
        }
        .admin-panel-light button.bg-zinc-900:hover,
        .admin-panel-light label.bg-zinc-900:hover {
          background-color: #e4e4e7 !important;
        }
        .admin-panel-light button.bg-rose-950\/20 {
          background-color: #fef2f2 !important;
          border-color: #fecaca !important;
          color: #dc2626 !important;
        }
        .admin-panel-light button.bg-rose-950\/20:hover {
          background-color: #fee2e2 !important;
        }
      `}</style>

      {/* Header element is always persistent */}
      <Header
        settings={settings}
        onToggleAdmin={() => {
          setIsAdminMode(!isAdminMode);
          setCurrentPage('home'); // Go to home when toggling admin
        }}
        isAdminMode={isAdminMode}
        scrollToSection={handleScrollToSection}
        activeSection={activeSection}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Layout Content routing */}
      {!isAdminMode ? (
        <main className="animate-fadeIn">
          {/* Main Public website view */}
          {currentPage === 'home' ? (
            <>
              <Hero 
                settings={settings} 
                onCtaClick={() => handleScrollToSection('contact')} 
              />
              
              <IntroSection 
                onEnterTuneMedia={() => handleScrollToSection('services')} 
                onEnterWaterPrime={() => {
                  setCurrentPage('waterprime');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
              
              <BusinessSection onPageChange={setCurrentPage} />
              
              <Contact 
                settings={settings} 
                onSubmitInquiry={handleInboundInquiry} 
              />
            </>
          ) : currentPage === 'reference' ? (
            <Reference
              settings={settings}
              onBackToHome={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : currentPage === 'waterprime' ? (
            <WaterPrimePage
              settings={settings}
              onBackToHome={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onContactClick={() => {
                setCurrentPage('home');
                setTimeout(() => {
                  handleScrollToSection('contact');
                }, 150);
              }}
            />
          ) : (
            <AboutPages
              subPage={currentPage as 'greetings' | 'org' | 'history' | 'map' | 'digital-signage' | 'smart-ai' | 'smart-iot' | 'smart-service'}
              settings={settings}
              onBackToHome={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
          
          <Footer 
            settings={settings} 
          />
        </main>
      ) : (
        <div className="animate-fadeIn admin-panel-light">
          {/* Admin Dashboard view */}
          <AdminPanel
            settings={settings}
            onChangeSettings={setSettings}
            blogs={blogs}
            onChangeBlogs={setBlogs}
            projects={projects}
            onChangeProjects={setProjects}
            inquiries={inquiries}
            onChangeInquiries={setInquiries}
            onResetDefaults={handleResetDefaults}
          />
        </div>
      )}
    </div>
  );
}
