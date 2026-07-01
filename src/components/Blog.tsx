/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, User, ArrowRight, X, Clock, Eye } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogProps {
  blogs: BlogPost[];
}

export default function Blog({ blogs }: BlogProps) {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-24 bg-white border-t border-zinc-100 px-6">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Heading */}
        <div className="text-center mb-16 select-none">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-color)] font-mono">
            INSIGHTS & ARTICLES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight font-sans mt-2 mb-4">
            디지털 공간 지식 저장소
          </h2>
          <div className="h-1 w-12 bg-[var(--accent-color)] mx-auto rounded-full mb-6" />
          <p className="text-sm sm:text-base text-zinc-600 font-sans max-w-2xl mx-auto">
            툰미디어 DT 전문가진이 기고하는 리테일 기술 연구 보고서, 최신 트렌드 동향, 그리고 하드웨어 융합에 유용한 가이드를 지금 읽어보세요.
          </p>
        </div>

        {/* Blogs Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              onClick={() => setSelectedBlog(blog)}
              className="group cursor-pointer bg-zinc-50/50 border border-zinc-200 rounded-2xl overflow-hidden hover:border-blue-200 hover:bg-blue-50/10 transition-all duration-300 flex flex-col justify-between h-full shadow-xs"
            >
              <div>
                {/* Image Wrap */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 border-b border-zinc-200">
                  <img
                    src={blog.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600'}
                    alt={blog.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--accent-color)] text-white font-sans">
                    {blog.category || '인사이트'}
                  </span>
                </div>

                {/* Info and Titles */}
                <div className="p-6">
                  {/* Meta items */}
                  <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-mono mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{blog.date}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-900 tracking-tight line-clamp-2 leading-snug mb-3 group-hover:text-[var(--accent-color)] transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-zinc-600 font-sans leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>
                </div>
              </div>

              {/* Read button */}
              <div className="p-6 pt-0 flex justify-between items-center border-t border-zinc-150 mt-4">
                <div className="flex items-center text-[10px] text-zinc-500 font-mono gap-1">
                  <Eye className="w-3 h-3" />
                  <span>조회 {blog.views || 0}</span>
                </div>
                
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 group-hover:text-[var(--accent-color)] transition-colors">
                  <span>보고서 열람</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Read Blog Modal Pane */}
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div 
              className="relative w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white overflow-hidden max-h-[92vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Cover Banner */}
              <div className="relative aspect-[21/9] w-full bg-zinc-100 border-b border-zinc-150">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent opacity-30" />
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-900 rounded-full bg-white/80 border border-zinc-200 transition-colors"
                  aria-label="Close reader"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Reader Content */}
              <div className="p-6 sm:p-10">
                <div className="mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent-color)] font-mono px-2.5 py-1 rounded bg-[var(--accent-color-light)] border border-[var(--accent-color)]/20 inline-block">
                    {selectedBlog.category || '기술 칼럼'}
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight font-sans mt-4 leading-tight">
                    {selectedBlog.title}
                  </h3>
                </div>

                {/* Article Info Bar */}
                <div className="flex flex-wrap gap-4 items-center border-y border-zinc-200 py-3.5 mb-8 text-xs text-zinc-500 font-sans">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-zinc-400" />
                    <span className="text-zinc-700 font-medium">{selectedBlog.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-zinc-400" />
                    <span>작성일: {selectedBlog.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 ml-auto">
                    <Clock className="w-4 h-4 text-zinc-400" />
                    <span>독서 3분 분량</span>
                  </div>
                </div>

                {/* Article Prose content */}
                <div className="text-sm sm:text-base text-zinc-700 font-sans leading-relaxed whitespace-pre-line mb-8 space-y-4">
                  {selectedBlog.content}
                </div>

                {/* Article Tags */}
                <div className="flex flex-wrap gap-2 mb-8 border-t border-zinc-200 pt-6">
                  {(selectedBlog.tags || []).map((tag, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Back to insight action */}
                <div className="flex justify-between items-center border-t border-zinc-200 pt-6">
                  <span className="text-xs text-zinc-450 font-sans">© {new Date().getFullYear()} tunemedia Co. All rights reserved.</span>
                  <button
                    onClick={() => setSelectedBlog(null)}
                    className="px-5 py-2.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 text-xs font-semibold hover:bg-zinc-200 hover:text-zinc-900 transition-all duration-300"
                  >
                    목록으로 돌아가기
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
