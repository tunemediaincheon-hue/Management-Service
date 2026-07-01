/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { SiteSettings } from '../types';

interface ContactProps {
  settings: SiteSettings;
  onSubmitInquiry: (data: { name: string; email: string; company: string; content: string }) => void;
}

export default function Contact({ settings, onSubmitInquiry }: ContactProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim() || !subject.trim() || !content.trim()) {
      setError('모든 항목을 입력해주세요.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/meebrqby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          email: email,
          subject: subject,
          content: content
        })
      });

      if (response.ok) {
        onSubmitInquiry({ 
          name, 
          email, 
          company: `연락처: ${phone} / 제목: ${subject}`, 
          content 
        });
        setSubmitted(true);
        
        // Reset form fields
        setName('');
        setPhone('');
        setEmail('');
        setSubject('');
        setContent('');
      } else {
        const data = await response.json();
        if (data && data.errors) {
          setError(data.errors.map((err: any) => err.message).join(', '));
        } else {
          setError('문의 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    } catch (err) {
      setError('서버와의 통신에 실패했습니다. 네트워크 연결을 확인해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-24 px-6 sm:px-12 lg:px-24 select-none relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #091e36 0%, #051221 100%)'
      }}
    >
      {/* Decorative subtle ambient wave/glow matches Photograph 3 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,73,131,0.25),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(8,30,55,0.6),transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Dark Blue Contact Us Info Block (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans mb-4">
                Contact Us
              </h2>
              <p className="text-sm sm:text-base text-white font-sans leading-relaxed max-w-md mb-12">
                문의하실 부분이 있으시면 내용을 남겨주세요.<br />빠른 시일 내에 연락 드리겠습니다.
              </p>
            </div>

            {/* Direct Contact Details Block with pure icon layout */}
            <div className="flex flex-col gap-6 pt-8 border-t border-white/10 text-white/90">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1 text-sm sm:text-base font-medium font-sans">
                  <p className="leading-relaxed">
                    {settings.address || '인천광역시 남동구 청능대로 559, 4층 4556호 (논현동, 논현메디컬센터)'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-sm sm:text-base font-semibold font-mono">
                  {settings.phone || '010-9654-9882'}
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium font-mono">
                  {settings.email || 'tunemediaincheon@gmail.com'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean White Form Container matching Screenshot 3 (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl shadow-2xl">
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {error && (
                  <p className="text-xs text-rose-600 bg-rose-50 border border-rose-100 p-3 rounded-lg font-sans">
                    {error}
                  </p>
                )}

                {/* 이름 Field */}
                <div>
                  <input
                    type="text"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#f8f9fa] border border-zinc-200 rounded-lg px-4 py-3.5 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-sans"
                    required
                  />
                </div>

                {/* 연락처 Field */}
                <div>
                  <input
                    type="text"
                    placeholder="연락처"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#f8f9fa] border border-zinc-200 rounded-lg px-4 py-3.5 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-sans"
                    required
                  />
                </div>

                {/* 이메일 Field */}
                <div>
                  <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#f8f9fa] border border-zinc-200 rounded-lg px-4 py-3.5 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-mono"
                    required
                  />
                </div>

                {/* 제목 Field */}
                <div>
                  <input
                    type="text"
                    placeholder="제목"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#f8f9fa] border border-zinc-200 rounded-lg px-4 py-3.5 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-sans"
                    required
                  />
                </div>

                {/* 문의 내용 Textarea */}
                <div>
                  <textarea
                    placeholder="문의 내용"
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-[#f8f9fa] border border-zinc-200 rounded-lg p-4 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-sans resize-none leading-relaxed"
                    required
                  />
                </div>

                {/* Submit Button placed left-aligned as in Screenshot 3 */}
                <div className="pt-2 flex justify-start">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3 bg-[#024a9c] hover:bg-[#023c80] text-white text-sm font-bold rounded-full shadow-lg shadow-blue-900/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? '제출 중...' : '제출하기'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-10 px-4 animate-scaleUp">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-150 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                
                <h3 className="text-lg font-bold text-zinc-900 font-sans tracking-tight mb-1.5">
                  문의가 제출되었습니다!
                </h3>
                
                <p className="text-xs sm:text-sm text-zinc-500 font-sans leading-relaxed max-w-sm mb-6">
                  보내주신 소중한 문의 내용을 검토하여 이메일 또는 연락처로 신속하게 답변 드리겠습니다. 감사합니다.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 text-xs font-semibold hover:bg-zinc-200 hover:text-zinc-900 transition-all duration-300"
                >
                  추가 문의 작성하기
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
