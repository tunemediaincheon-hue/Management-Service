/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Filter, MapPin, Calendar, Briefcase, X, ExternalLink } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioProps {
  projects: PortfolioItem[];
}

export default function Portfolio({ projects }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  // Extract unique categories for filter tabs
  const categories = ['ALL', ...Array.from(new Set(projects.map((p) => p.category)))];

  // Filtered list
  const filteredProjects = activeFilter === 'ALL'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 bg-white border-t border-zinc-100 px-6">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Heading */}
        <div className="text-center mb-12 select-none">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-color)] font-mono">
            PORTFOLIO SHOWCASE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight font-sans mt-2 mb-4">
            공간 디지털 전환 레퍼런스
          </h2>
          <div className="h-1 w-12 bg-[var(--accent-color)] mx-auto rounded-full mb-6" />
          <p className="text-sm sm:text-base text-zinc-600 font-sans max-w-2xl mx-auto">
            공공시설물, 플래그십 리테일, 복합 문화공간 등 업계 선두 브랜드 및 기업과 함께 실감 미디어와 IoT 네트워크 솔루션을 성공적으로 결합해 낸 혁신 사례입니다.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-[var(--accent-color)] text-white border-transparent shadow-md shadow-[var(--accent-color)]/25'
                  : 'bg-zinc-55 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300'
              }`}
            >
              {category === 'ALL' ? '전체 보기' : category}
            </button>
          ))}
        </div>

        {/* Projects Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-zinc-50/50 border border-zinc-200 rounded-xl overflow-hidden hover:border-blue-200 hover:bg-blue-50/10 transition-all duration-300 flex flex-col h-full shadow-xs"
            >
              {/* Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
                <img
                  src={project.image || 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=600'}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                <span className="absolute bottom-3 left-3 text-[10px] font-mono px-2 py-0.5 rounded bg-white/95 border border-zinc-200 text-zinc-700 font-semibold uppercase">
                  {project.category}
                </span>
              </div>

              {/* Text Container */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-base font-bold text-zinc-900 tracking-tight line-clamp-1 mb-2 group-hover:text-[var(--accent-color)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-500 font-sans line-clamp-2 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Date and tags preview */}
                <div className="flex flex-col gap-2 pt-3 border-t border-zinc-150">
                  <div className="flex items-center text-[10px] text-zinc-500 font-mono gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{project.date}</span>
                  </div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {(project.tags || []).slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-600 font-sans">
                        #{tag}
                      </span>
                    ))}
                    {(project.tags || []).length > 2 && (
                      <span className="text-[9px] text-zinc-400 font-mono pl-1">
                        +{(project.tags || []).length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Detail Modal Overlay */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div 
              className="relative w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white overflow-hidden max-h-[92vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Banner */}
              <div className="relative aspect-[21/9] w-full bg-zinc-100">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent opacity-30" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-900 rounded-full bg-white/80 border border-zinc-200 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8">
                {/* Headers */}
                <div className="mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent-color)] font-mono px-2.5 py-1 rounded bg-[var(--accent-color-light)] border border-[var(--accent-color)]/20 inline-block">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight font-sans mt-3">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Tech specifications grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-zinc-200 py-5 mb-6 text-xs text-zinc-500 font-sans">
                  <div className="flex items-center gap-2.5">
                    <Briefcase className="w-4 h-4 text-[var(--accent-color)] flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-zinc-400 block uppercase font-mono font-bold">발주 고객사</span>
                      <span className="text-zinc-800 font-semibold">{selectedProject.client}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[var(--accent-color)] flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-zinc-400 block uppercase font-mono font-bold">도입 위치</span>
                      <span className="text-zinc-800 font-semibold">{selectedProject.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[var(--accent-color)] flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-zinc-400 block uppercase font-mono font-bold">구축 연월</span>
                      <span className="text-zinc-800 font-semibold">{selectedProject.date}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-mono mb-3">구축 기술 요약 및 성과 (CASE STUDY)</h4>
                  <p className="text-sm text-zinc-700 font-sans leading-relaxed whitespace-pre-line bg-zinc-50 p-4 border border-zinc-150 rounded-xl">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(selectedProject.tags || []).map((tag, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-3 pt-5 border-t border-zinc-100">
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-full bg-[var(--accent-color)] text-white text-xs font-semibold hover:brightness-110 transition-all duration-300 inline-flex items-center gap-1.5"
                  >
                    <span>공간 구축 견적 의뢰</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setSelectedProject(null)}
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
