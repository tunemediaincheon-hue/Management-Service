/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SiteSettings } from '../types';

interface FooterProps {
  settings: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 py-16 px-6 relative z-10 select-none">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        
        {/* Left branding */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-lg font-black tracking-wider text-zinc-900 uppercase font-sans">
              {settings.logoText || 'tunemedia'}
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent-color)]" />
          </div>
          <p className="text-[10px] text-zinc-500 font-sans tracking-wide uppercase">
            © {new Date().getFullYear()} {settings.companyName || '주식회사 툰미디어'}. All rights reserved.
          </p>
        </div>

        {/* Right official metadata (Corporate Information) */}
        <div className="text-[10px] text-zinc-500 font-sans leading-relaxed max-w-xl md:text-right flex flex-col gap-1">
          <div className="flex flex-wrap md:justify-end gap-x-3 gap-y-1">
            <span>회사명: {settings.companyName || '주식회사 툰미디어'}</span>
            <span className="hidden sm:inline text-zinc-300">|</span>
            <span>대표: {settings.ceo || '주현정'}</span>
            <span className="hidden sm:inline text-zinc-300">|</span>
            <span>사업자등록번호: {settings.registrationNumber || '589-19-02880'}</span>
          </div>
          
          <div className="flex flex-wrap md:justify-end gap-x-3 gap-y-1">
            <span>주소: {settings.address || '인천광역시 미추홀구 석정로 229, 5층 (도화동, 해정타운및jst)'}</span>
          </div>

          <div className="flex flex-wrap md:justify-end gap-x-3 gap-y-1 mt-1 font-mono">
            <span>대표번호: {settings.phone || '010-9654-9882'}</span>
            <span className="text-zinc-300">|</span>
            <span>이메일: {settings.email || 'tunemediaincheon@gmail.com'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
