/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lock, Unlock, Menu, X, Sparkles } from 'lucide-react';
import { SiteSettings } from '../types';

interface HeaderProps {
  settings: SiteSettings;
  onToggleAdmin: () => void;
  isAdminMode: boolean;
  scrollToSection: (id: string) => void;
  activeSection: string;
  currentPage: 'home' | 'greetings' | 'org' | 'history' | 'map' | 'reference' | 'digital-signage' | 'smart-ai' | 'smart-iot' | 'smart-service';
  onPageChange: (page: 'home' | 'greetings' | 'org' | 'history' | 'map' | 'reference' | 'digital-signage' | 'smart-ai' | 'smart-iot' | 'smart-service') => void;
}

export default function Header({
  settings,
  onToggleAdmin,
  isAdminMode,
  scrollToSection,
  activeSection,
  currentPage,
  onPageChange,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'About Us', hasDropdown: true },
    { id: 'services', label: 'Business' },
    { id: 'reference', label: 'Reference' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    setIsAboutDropdownOpen(false);
    
    if (id === 'reference') {
      onPageChange('reference');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentPage !== 'home') {
      onPageChange('home');
      // Delay scrolling slightly to allow state and DOM rendering
      setTimeout(() => {
        scrollToSection(id);
      }, 150);
    } else {
      scrollToSection(id);
    }
  };

  const handleSubPageClick = (page: 'greetings' | 'org' | 'history' | 'map') => {
    setIsMobileMenuOpen(false);
    setIsAboutDropdownOpen(false);
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Header transparency only on Hero section, on main home page, when not scrolled
  const isTransparent = !isScrolled && currentPage === 'home' && activeSection === 'hero';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 border-b ${
        isTransparent 
          ? 'bg-transparent border-transparent text-white' 
          : 'bg-white/95 border-zinc-100 text-zinc-850 shadow-sm backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo and Subtext */}
        <div 
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsAboutDropdownOpen(false);
            onPageChange('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          className="flex cursor-pointer flex-col justify-center select-none group"
        >
          <div className="flex items-center gap-1">
            <span className={`text-xl font-bold tracking-wider font-sans transition-colors duration-300 ${
              isTransparent ? 'text-white' : 'text-zinc-900'
            }`}>
              <span className="font-light">tune</span>
              <span className="font-black">media</span>
              <span className="text-blue-500 font-black">.</span>
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        {!isAdminMode ? (
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div 
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setIsAboutDropdownOpen(true)}
                    onMouseLeave={() => setIsAboutDropdownOpen(false)}
                  >
                    <button
                      className={`relative py-2 text-sm font-semibold transition-colors duration-300 ${
                        currentPage !== 'home'
                          ? isTransparent ? 'text-white' : 'text-blue-600'
                          : activeSection === item.id 
                            ? isTransparent ? 'text-white' : 'text-blue-600'
                            : isTransparent ? 'text-white/80 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'
                      }`}
                    >
                      {item.label}
                      {currentPage !== 'home' && (
                        <span className={`absolute bottom-0 left-0 h-[2px] w-full rounded-full ${
                          isTransparent ? 'bg-white' : 'bg-blue-600'
                        }`} />
                      )}
                    </button>

                    {/* Dropdown Menu - Subpage selectors */}
                    {isAboutDropdownOpen && (
                      <div className="absolute top-[32px] left-1/2 -translate-x-1/2 w-44 bg-white border border-zinc-150 rounded-lg shadow-xl py-2 flex flex-col z-50 animate-fadeIn text-left">
                        <button
                          onClick={() => handleSubPageClick('greetings')}
                          className="w-full text-left px-5 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-blue-600 transition-colors"
                        >
                          인사말
                        </button>
                        <button
                          onClick={() => handleSubPageClick('org')}
                          className="w-full text-left px-5 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-blue-600 transition-colors"
                        >
                          조직도
                        </button>
                        <button
                          onClick={() => handleSubPageClick('history')}
                          className="w-full text-left px-5 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-blue-600 transition-colors"
                        >
                          연혁
                        </button>
                        <button
                          onClick={() => handleSubPageClick('map')}
                          className="w-full text-left px-5 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-blue-600 transition-colors"
                        >
                          오시는길
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              const isItemActive = item.id === 'reference'
                ? currentPage === 'reference'
                : currentPage === 'home' && activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 text-sm font-semibold transition-colors duration-300 ${
                    isItemActive
                      ? isTransparent ? 'text-white' : 'text-blue-600'
                      : isTransparent ? 'text-white/80 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {item.label}
                  {isItemActive && (
                    <span className={`absolute bottom-0 left-0 h-[2px] w-full rounded-full ${
                      isTransparent ? 'bg-white' : 'bg-blue-600'
                    }`} />
                  )}
                </button>
              );
            })}
          </nav>
        ) : (
          <div className={`hidden md:flex items-center text-xs font-mono gap-2 px-3 py-1 border rounded-full ${
            isTransparent 
              ? 'bg-white/10 border-white/20 text-white/80' 
              : 'bg-zinc-50 border-zinc-200 text-zinc-500'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>ADMINISTRATOR MODE</span>
          </div>
        )}

        {/* Admin Dashboard Action & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleAdmin}
            id="admin-toggle-btn"
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-full border transition-all duration-300 ${
              isAdminMode
                ? isTransparent 
                  ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' 
                  : 'bg-zinc-100 text-zinc-800 border-zinc-250 hover:bg-zinc-200'
                : 'bg-blue-600 text-white border-transparent hover:bg-blue-700 shadow-md shadow-blue-600/20'
            }`}
          >
            {isAdminMode ? (
              <>
                <Unlock className="w-3.5 h-3.5" />
                <span>웹사이트 보기</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>관리자 대시보드</span>
              </>
            )}
          </button>

          {/* Mobile Menu Button */}
          {!isAdminMode && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors ${
                isTransparent ? 'text-white/80 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && !isAdminMode && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-zinc-150 py-6 px-6 flex flex-col gap-4 animate-fadeIn shadow-lg text-zinc-800">
          {navItems.map((item) => (
            <div key={item.id} className="flex flex-col gap-2">
              {item.hasDropdown ? (
                <div className="text-left py-2.5 text-base font-semibold text-zinc-650">
                  {item.label}
                </div>
              ) : (
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2.5 text-base font-semibold transition-colors ${
                    item.id === 'reference'
                      ? currentPage === 'reference' ? 'text-blue-600 font-bold' : 'text-zinc-650 hover:text-zinc-900'
                      : currentPage === 'home' && activeSection === item.id 
                        ? 'text-blue-600 font-bold' 
                        : 'text-zinc-650 hover:text-zinc-900'
                  }`}
                >
                  {item.label}
                </button>
              )}
              
              {item.hasDropdown && (
                <div className="pl-4 flex flex-col gap-2 border-l border-zinc-150">
                  <button
                    onClick={() => handleSubPageClick('greetings')}
                    className={`text-left py-1.5 text-xs font-semibold ${currentPage === 'greetings' ? 'text-blue-600' : 'text-zinc-500 hover:text-blue-600'}`}
                  >
                    • 인사말
                  </button>
                  <button
                    onClick={() => handleSubPageClick('org')}
                    className={`text-left py-1.5 text-xs font-semibold ${currentPage === 'org' ? 'text-blue-600' : 'text-zinc-500 hover:text-blue-600'}`}
                  >
                    • 조직도
                  </button>
                  <button
                    onClick={() => handleSubPageClick('history')}
                    className={`text-left py-1.5 text-xs font-semibold ${currentPage === 'history' ? 'text-blue-600' : 'text-zinc-500 hover:text-blue-600'}`}
                  >
                    • 연혁
                  </button>
                  <button
                    onClick={() => handleSubPageClick('map')}
                    className={`text-left py-1.5 text-xs font-semibold ${currentPage === 'map' ? 'text-blue-600' : 'text-zinc-500 hover:text-blue-600'}`}
                  >
                    • 오시는길
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
