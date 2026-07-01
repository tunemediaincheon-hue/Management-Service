/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, Settings, FileText, Briefcase, Inbox, 
  Plus, Edit, Trash2, Save, RotateCcw, Download, Upload,
  Sliders, Search, Globe, Building, CheckCircle2, X
} from 'lucide-react';
import { SiteSettings, BlogPost, PortfolioItem, Inquiry } from '../types';

interface AdminPanelProps {
  settings: SiteSettings;
  onChangeSettings: (settings: SiteSettings) => void;
  blogs: BlogPost[];
  onChangeBlogs: (blogs: BlogPost[]) => void;
  projects: PortfolioItem[];
  onChangeProjects: (projects: PortfolioItem[]) => void;
  inquiries: Inquiry[];
  onChangeInquiries: (inquiries: Inquiry[]) => void;
  onResetDefaults: () => void;
}

type TabType = 'overview' | 'settings' | 'seo' | 'blog' | 'portfolio' | 'inquiries';

export default function AdminPanel({
  settings,
  onChangeSettings,
  blogs,
  onChangeBlogs,
  projects,
  onChangeProjects,
  inquiries,
  onChangeInquiries,
  onResetDefaults,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  // Blog form states
  const [blogFormOpen, setBlogFormOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSummary, setBlogSummary] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogCategory, setBlogCategory] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [blogTags, setBlogTags] = useState('');

  // Portfolio form states
  const [portfolioFormOpen, setPortfolioFormOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [projectClient, setProjectClient] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectImage, setProjectImage] = useState('');
  const [projectDate, setProjectDate] = useState('');
  const [projectTags, setProjectTags] = useState('');

  // Search filter states
  const [blogSearch, setBlogSearch] = useState('');
  const [portfolioSearch, setPortfolioSearch] = useState('');

  // Handle generic setting input updates
  const handleSettingChange = (key: keyof SiteSettings, value: string) => {
    onChangeSettings({
      ...settings,
      [key]: value
    });
  };

  // State Import/Export handlers
  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      settings,
      blogs,
      projects,
      inquiries
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `tunemedia_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.settings) onChangeSettings(parsed.settings);
          if (parsed.blogs) onChangeBlogs(parsed.blogs);
          if (parsed.projects) onChangeProjects(parsed.projects);
          if (parsed.inquiries) onChangeInquiries(parsed.inquiries);
          alert('데이터 백업 복원이 정상 완료되었습니다!');
        } catch (err) {
          alert('올바른 형식의 백업 JSON 파일이 아닙니다.');
        }
      };
    }
  };

  // Inquiry action handlers
  const handleInquiryStatus = (id: string, newStatus: 'read' | 'replied' | 'new') => {
    onChangeInquiries(
      inquiries.map((inq) => inq.id === id ? { ...inq, status: newStatus } : inq)
    );
  };

  const handleInquiryDelete = (id: string) => {
    if (window.confirm('이 문의 건을 정말 삭제하시겠습니까?')) {
      onChangeInquiries(inquiries.filter((inq) => inq.id !== id));
    }
  };

  // Blog submission handler
  const saveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogSummary || !blogContent) {
      alert('제목, 요약, 상세 글 내용은 필수 기입 요건입니다.');
      return;
    }

    const newBlog: BlogPost = {
      id: editingBlogId || `b_${Date.now()}`,
      title: blogTitle,
      summary: blogSummary,
      content: blogContent,
      author: blogAuthor || '관리자',
      date: new Date().toISOString().slice(0, 10),
      image: blogImage || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600',
      tags: blogTags ? blogTags.split(',').map(t => t.trim()) : ['공간DT'],
      category: blogCategory || '일반 인사이트',
      views: editingBlogId ? (blogs.find(b => b.id === editingBlogId)?.views || 0) : 1
    };

    if (editingBlogId) {
      onChangeBlogs(blogs.map(b => b.id === editingBlogId ? newBlog : b));
    } else {
      onChangeBlogs([newBlog, ...blogs]);
    }

    // Reset Form
    setBlogFormOpen(false);
    setEditingBlogId(null);
    setBlogTitle('');
    setBlogSummary('');
    setBlogContent('');
    setBlogAuthor('');
    setBlogCategory('');
    setBlogImage('');
    setBlogTags('');
  };

  const startEditBlog = (blog: BlogPost) => {
    setEditingBlogId(blog.id);
    setBlogTitle(blog.title);
    setBlogSummary(blog.summary);
    setBlogContent(blog.content);
    setBlogAuthor(blog.author);
    setBlogCategory(blog.category);
    setBlogImage(blog.image);
    setBlogTags(blog.tags.join(', '));
    setBlogFormOpen(true);
  };

  const deleteBlog = (id: string) => {
    if (window.confirm('이 블로그 포스트를 삭제하시겠습니까?')) {
      onChangeBlogs(blogs.filter(b => b.id !== id));
    }
  };

  // Portfolio submission handler
  const savePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle || !projectClient || !projectDescription) {
      alert('프로젝트명, 고객사, 상세 설명은 필수 기입 요건입니다.');
      return;
    }

    const newProject: PortfolioItem = {
      id: editingProjectId || `p_${Date.now()}`,
      title: projectTitle,
      category: projectCategory || 'Digital Signage',
      client: projectClient,
      location: projectLocation || '서울',
      description: projectDescription,
      image: projectImage || 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=600',
      date: projectDate || new Date().toISOString().slice(0, 7),
      tags: projectTags ? projectTags.split(',').map(t => t.trim()) : ['공간DT', '툰미디어']
    };

    if (editingProjectId) {
      onChangeProjects(projects.map(p => p.id === editingProjectId ? newProject : p));
    } else {
      onChangeProjects([newProject, ...projects]);
    }

    // Reset Form
    setPortfolioFormOpen(false);
    setEditingProjectId(null);
    setProjectTitle('');
    setProjectCategory('');
    setProjectClient('');
    setProjectLocation('');
    setProjectDescription('');
    setProjectImage('');
    setProjectDate('');
    setProjectTags('');
  };

  const startEditPortfolio = (proj: PortfolioItem) => {
    setEditingProjectId(proj.id);
    setProjectTitle(proj.title);
    setProjectCategory(proj.category);
    setProjectClient(proj.client);
    setProjectLocation(proj.location);
    setProjectDescription(proj.description);
    setProjectImage(proj.image);
    setProjectDate(proj.date);
    setProjectTags(proj.tags.join(', '));
    setPortfolioFormOpen(true);
  };

  const deletePortfolio = (id: string) => {
    if (window.confirm('이 포트폴리오를 삭제하시겠습니까?')) {
      onChangeProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-zinc-950 text-zinc-300 font-sans flex flex-col md:flex-row border-t border-zinc-900 select-none">
      
      {/* Admin Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-zinc-950 border-b md:border-b-0 md:border-r border-zinc-900 p-6 flex flex-col justify-between">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[var(--accent-color)] tracking-widest font-mono uppercase">
              TUNEMEDIA ADMIN
            </span>
            <span className="text-sm font-bold text-white mt-1">
              공간 통합 관리 시스템
            </span>
          </div>

          <nav className="flex md:flex-col gap-1 overflow-x-auto pb-3 md:pb-0 scrollbar-none">
            {/* Nav links */}
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'overview'
                  ? 'bg-[var(--accent-color)] text-white'
                  : 'hover:bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">관리 홈</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'settings'
                  ? 'bg-[var(--accent-color)] text-white'
                  : 'hover:bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              <Sliders className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">디자인 & 카피 설정</span>
            </button>

            <button
              onClick={() => setActiveTab('seo')}
              className={`flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'seo'
                  ? 'bg-[var(--accent-color)] text-white'
                  : 'hover:bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">SEO & 메타 설정</span>
            </button>

            <button
              onClick={() => setActiveTab('blog')}
              className={`flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'blog'
                  ? 'bg-[var(--accent-color)] text-white'
                  : 'hover:bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">인사이트(블로그) 관리</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'portfolio'
                  ? 'bg-[var(--accent-color)] text-white'
                  : 'hover:bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">포트폴리오 관리</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-lg transition-all relative ${
                activeTab === 'inquiries'
                  ? 'bg-[var(--accent-color)] text-white'
                  : 'hover:bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              <Inbox className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">고객 문의 로그</span>
              {inquiries.filter(i => i.status === 'new').length > 0 && (
                <span className="absolute top-2.5 right-2 h-4 w-4 rounded-full bg-rose-500 text-[9px] text-white flex items-center justify-center font-bold">
                  {inquiries.filter(i => i.status === 'new').length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Global actions */}
        <div className="hidden md:flex flex-col gap-3 pt-6 border-t border-zinc-900 mt-8 text-xs">
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-lg transition-colors w-full"
          >
            <Download className="w-3.5 h-3.5" />
            <span>설정 내보내기 (JSON)</span>
          </button>

          <label className="flex items-center gap-2 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-lg cursor-pointer transition-colors w-full justify-center">
            <Upload className="w-3.5 h-3.5" />
            <span>설정 가져오기</span>
            <input type="file" accept=".json" onChange={importData} className="hidden" />
          </label>

          <button
            onClick={() => {
              if (window.confirm('주의: 모든 사이트 설정, 작성된 블로그, 문의가 초기 기본값으로 리셋됩니다. 계속하시겠습니까?')) {
                onResetDefaults();
                alert('초기값으로 완벽히 복원되었습니다.');
              }
            }}
            className="flex items-center gap-2 px-3 py-2 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/30 text-rose-400 rounded-lg transition-colors w-full"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>시스템 전체 초기화</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Working Space */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-[calc(100vh-5rem)]">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-8 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">툰미디어 관리 플랫폼 개요</h2>
              <p className="text-xs text-zinc-500 mt-1 font-sans">실시간 문의 접수 현황과 데이터 자산 보유 상태를 한눈에 제어합니다.</p>
            </div>

            {/* Grid stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 select-none">
              <div className="bg-zinc-900/40 border border-zinc-900 p-5 rounded-xl">
                <span className="text-[10px] font-bold text-zinc-500 font-mono block">신규 고객 문의</span>
                <span className="text-3xl font-black text-white font-mono block mt-1.5">{inquiries.filter(i => i.status === 'new').length}건</span>
                <span className="text-[9px] text-zinc-600 block mt-2 font-mono">총 {inquiries.length}건 누적</span>
              </div>
              <div className="bg-zinc-900/40 border border-zinc-900 p-5 rounded-xl">
                <span className="text-[10px] font-bold text-zinc-500 font-mono block">활성 칼럼 수</span>
                <span className="text-3xl font-black text-white font-mono block mt-1.5">{blogs.length}개</span>
                <span className="text-[9px] text-zinc-600 block mt-2 font-mono">가장 최근: {blogs[0]?.date || '-'}</span>
              </div>
              <div className="bg-zinc-900/40 border border-zinc-900 p-5 rounded-xl">
                <span className="text-[10px] font-bold text-zinc-500 font-mono block">포트폴리오 레퍼런스</span>
                <span className="text-3xl font-black text-white font-mono block mt-1.5">{projects.length}개</span>
                <span className="text-[9px] text-zinc-600 block mt-2 font-mono">가장 최근: {projects[0]?.date || '-'}</span>
              </div>
              <div className="bg-zinc-900/40 border border-zinc-900 p-5 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 font-mono block">브랜드 테마 액센트</span>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="h-5 w-5 rounded border border-zinc-800" style={{ backgroundColor: settings.accentColor }} />
                    <span className="text-xs font-semibold text-white font-mono uppercase">{settings.accentColor}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className="text-[9px] font-bold text-[var(--accent-color)] text-left hover:underline font-sans mt-2"
                >
                  디자인 설정으로 변경
                </button>
              </div>
            </div>

            {/* Quick Inquiry Feed */}
            <div className="border border-zinc-900 bg-black/40 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-900">
                <span className="text-xs font-bold text-white tracking-tight">접수된 최근 공간 DT 의뢰</span>
                <button onClick={() => setActiveTab('inquiries')} className="text-[10px] font-bold text-[var(--accent-color)] hover:underline font-mono">전체 로그 가기 →</button>
              </div>

              {inquiries.length === 0 ? (
                <p className="text-xs text-zinc-500 py-6 text-center">현재 접수된 실사 상담 신청 문의가 없습니다.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {inquiries.slice(0, 3).map((inq) => (
                    <div key={inq.id} className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-lg flex justify-between items-center text-xs gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${inq.status === 'new' ? 'bg-rose-500 animate-pulse' : 'bg-zinc-700'}`} />
                          <span className="font-bold text-white font-sans">{inq.name} ({inq.company || '개인'})</span>
                          <span className="text-[10px] text-zinc-500 font-mono">{inq.date}</span>
                        </div>
                        <p className="text-zinc-400 mt-1.5 line-clamp-1">{inq.content}</p>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        {inq.status === 'new' ? (
                          <button 
                            onClick={() => handleInquiryStatus(inq.id, 'read')}
                            className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] text-zinc-400"
                          >
                            읽음 확인
                          </button>
                        ) : (
                          <span className="text-[10px] text-zinc-500 font-mono uppercase bg-zinc-900 px-2 py-0.5 rounded border border-zinc-900">CHECKED</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: SITE CUSTOMIZER */}
        {activeTab === 'settings' && (
          <div className="flex flex-col gap-8 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">디자인 & 텍스트 실시간 커스터마이저</h2>
              <p className="text-xs text-zinc-500 mt-1 font-sans">바꾸는 정보는 메인 페이지 디자인과 소개 문구에 실시간으로 즉시 동기화 반영됩니다.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form parameters */}
              <div className="flex flex-col gap-6">
                
                {/* Visual Accent Customizer */}
                <div className="p-5 bg-zinc-900/20 border border-zinc-900 rounded-xl flex flex-col gap-4">
                  <span className="text-xs font-bold text-white tracking-tight flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[var(--accent-color)]" />
                    <span>브랜드 테마 액센트 컬러 설정</span>
                  </span>
                  
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={settings.accentColor}
                      onChange={(e) => handleSettingChange('accentColor', e.target.value)}
                      className="w-12 h-12 rounded border-2 border-zinc-800 bg-transparent cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-bold text-white font-mono">{settings.accentColor}</span>
                      <p className="text-[10px] text-zinc-500 mt-1 leading-normal font-sans">
                        메인 버튼, 액티브 하이라이트 등 메인 사이트의 핵심 테마를 바꿀 컬러 코드입니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fonts customization */}
                <div className="p-5 bg-zinc-900/20 border border-zinc-900 rounded-xl flex flex-col gap-4">
                  <span className="text-xs font-bold text-white tracking-tight flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[var(--accent-color)]" />
                    <span>로고 텍스트 및 기본 정보</span>
                  </span>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">상단 로고 텍스트 (Logo Text)</label>
                      <input
                        type="text"
                        value={settings.logoText}
                        onChange={(e) => handleSettingChange('logoText', e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">상단 로고 서브태그 (Logo Subtag)</label>
                      <input
                        type="text"
                        value={settings.logoSubText}
                        onChange={(e) => handleSettingChange('logoSubText', e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Hero section customization */}
                <div className="p-5 bg-zinc-900/20 border border-zinc-900 rounded-xl flex flex-col gap-4">
                  <span className="text-xs font-bold text-white tracking-tight flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[var(--accent-color)]" />
                    <span>메인 영웅 영역(Hero Section) 카피</span>
                  </span>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">히어로 배지 카피 (Hero Badge)</label>
                    <input
                      type="text"
                      value={settings.heroBadge}
                      onChange={(e) => handleSettingChange('heroBadge', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">히어로 메인 헤드라인 (줄바꿈 \n 사용 가능)</label>
                    <textarea
                      rows={2}
                      value={settings.heroTitle}
                      onChange={(e) => handleSettingChange('heroTitle', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded p-3 text-xs text-white resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">히어로 서브 설명 서술문</label>
                    <textarea
                      rows={3}
                      value={settings.heroSubtitle}
                      onChange={(e) => handleSettingChange('heroSubtitle', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded p-3 text-xs text-white leading-relaxed resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">메인 CTA 버튼 텍스트</label>
                    <input
                      type="text"
                      value={settings.heroCtaText}
                      onChange={(e) => handleSettingChange('heroCtaText', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

              </div>

              {/* Right Side Corporate Info */}
              <div className="flex flex-col gap-6">
                <div className="p-5 bg-zinc-900/20 border border-zinc-900 rounded-xl flex flex-col gap-4">
                  <span className="text-xs font-bold text-white tracking-tight flex items-center gap-2">
                    <Building className="w-4 h-4 text-[var(--accent-color)]" />
                    <span>회사 법적 표기 정보 (하단 Footer 표시)</span>
                  </span>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">공식 회사명</label>
                    <input
                      type="text"
                      value={settings.companyName}
                      onChange={(e) => handleSettingChange('companyName', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">대표이사명</label>
                      <input
                        type="text"
                        value={settings.ceo}
                        onChange={(e) => handleSettingChange('ceo', e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">사업자등록번호</label>
                      <input
                        type="text"
                        value={settings.registrationNumber}
                        onChange={(e) => handleSettingChange('registrationNumber', e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">회사 공식 사업장 주소</label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) => handleSettingChange('address', e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">대표연락처 전화번호</label>
                      <input
                        type="text"
                        value={settings.phone}
                        onChange={(e) => handleSettingChange('phone', e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">공식 문의 접수 이메일</label>
                      <input
                        type="text"
                        value={settings.email}
                        onChange={(e) => handleSettingChange('email', e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Instant Check Box */}
                <div className="p-5 bg-[var(--accent-color-light)] border border-[var(--accent-color)]/30 rounded-xl flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--accent-color)] flex-shrink-0" />
                  <span className="text-xs text-zinc-300 font-sans leading-relaxed">
                    입력하신 값들은 브라우저 로컬 저장소(localStorage)에 안전하게 자동 저장되며, 상단의 <strong>[웹사이트 보기]</strong> 토글을 통해 메인 페이지에서 실시간 변경된 모습을 확인하실 수 있습니다.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SEO CONFIG */}
        {activeTab === 'seo' && (
          <div className="flex flex-col gap-8 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">SEO 및 소셜 통합 설정</h2>
              <p className="text-xs text-zinc-500 mt-1 font-sans">포털 검색 엔진 상위 노출(SEO)을 위한 메타데이터 구조를 편집하고 Open Graph 소셜 태그를 지정합니다.</p>
            </div>

            <div className="p-6 bg-zinc-900/20 border border-zinc-900 rounded-xl flex flex-col gap-5 max-w-3xl">
              <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-900">
                <Globe className="w-5 h-5 text-[var(--accent-color)]" />
                <span className="text-sm font-bold text-white font-sans">검색엔진 최적화 표준 메타 필드</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">메타 타이틀 (Meta Title Tag)</label>
                <input
                  type="text"
                  value={settings.metaTitle}
                  onChange={(e) => handleSettingChange('metaTitle', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">메타 설명문 (Meta Description Tag)</label>
                <textarea
                  rows={3}
                  value={settings.metaDescription}
                  onChange={(e) => handleSettingChange('metaDescription', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded p-3 text-xs text-white leading-relaxed resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">검색 키워드 (Keywords - 콤마로 구분)</label>
                <input
                  type="text"
                  value={settings.metaKeywords}
                  onChange={(e) => handleSettingChange('metaKeywords', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">오픈그래프 대표 소셜 이미지 주소 (Open Graph Image URL)</label>
                <input
                  type="text"
                  value={settings.ogImage}
                  onChange={(e) => handleSettingChange('ogImage', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white font-mono"
                />
                <span className="text-[9px] text-zinc-600">카카오톡, 페이스북, 링크드인 링크 공유 시 노출될 대표 썸네일 이미지 주소입니다.</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BLOG WRITER */}
        {activeTab === 'blog' && (
          <div className="flex flex-col gap-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">인사이트 아카이브 & 포스트 작성</h2>
                <p className="text-xs text-zinc-500 mt-1 font-sans">고객들에게 배포될 새로운 칼럼, 보도자료, 트렌드 리포트를 관리합니다.</p>
              </div>

              {!blogFormOpen && (
                <button
                  onClick={() => {
                    setEditingBlogId(null);
                    setBlogTitle('');
                    setBlogSummary('');
                    setBlogContent('');
                    setBlogAuthor('');
                    setBlogCategory('');
                    setBlogImage('');
                    setBlogTags('');
                    setBlogFormOpen(true);
                  }}
                  className="px-4 py-2 bg-[var(--accent-color)] text-white hover:brightness-110 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 self-start"
                >
                  <Plus className="w-4 h-4" />
                  <span>새 블로그 글 작성</span>
                </button>
              )}
            </div>

            {/* Form Drawer / Area */}
            {blogFormOpen ? (
              <form onSubmit={saveBlog} className="bg-zinc-900/10 border border-zinc-900 rounded-xl p-6 flex flex-col gap-5 max-w-4xl">
                <div className="flex justify-between items-center pb-3 border-b border-zinc-900">
                  <span className="text-sm font-bold text-white font-sans">{editingBlogId ? '기존 블로그 포스트 수정' : '새 포스트 작성'}</span>
                  <button 
                    type="button" 
                    onClick={() => setBlogFormOpen(false)}
                    className="p-1.5 text-zinc-500 hover:text-white rounded-full bg-zinc-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">포스트 제목 <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      placeholder="제목 입력"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">카테고리 / 분류</label>
                    <input
                      type="text"
                      placeholder="예: 트렌드 리포트, 보도자료"
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">작성 에디터 / 부서명</label>
                    <input
                      type="text"
                      placeholder="예: 김민수 선임 연구원"
                      value={blogAuthor}
                      onChange={(e) => setBlogAuthor(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">태그 필드 (콤마로 구분)</label>
                    <input
                      type="text"
                      placeholder="예: AI비전, 스마트매장"
                      value={blogTags}
                      onChange={(e) => setBlogTags(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">썸네일 메인 이미지 URL</label>
                    <input
                      type="text"
                      placeholder="Unsplash 이미지 주소 등"
                      value={blogImage}
                      onChange={(e) => setBlogImage(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">블로그 간략 요약문 <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    placeholder="리스트 및 카드로 노출될 설명"
                    value={blogSummary}
                    onChange={(e) => setBlogSummary(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">메인 상세 리포트 글 본문 (Markdown형식 지원하지 않으므로 일반 줄바꿈 활용) <span className="text-rose-500">*</span></label>
                  <textarea
                    rows={8}
                    placeholder="리포트 전반 본문 내용 작성..."
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-3 text-xs text-white font-sans leading-relaxed resize-y"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-900">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded bg-[var(--accent-color)] text-white text-xs font-bold hover:brightness-110 flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>작성 및 최종 배포하기</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlogFormOpen(false)}
                    className="px-5 py-2.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs hover:bg-zinc-800 hover:text-white"
                  >
                    취소
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Search query input */}
                <div className="relative max-w-md w-full">
                  <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="배포 글 제목 또는 카테고리 검색..."
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-color)]"
                  />
                </div>

                {/* Grid Lists */}
                <div className="border border-zinc-900 rounded-xl overflow-hidden bg-black/40">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-zinc-900 text-zinc-500 uppercase font-mono font-bold tracking-wider bg-zinc-950">
                        <th className="p-4">배포 포스트 명</th>
                        <th className="p-4">분류</th>
                        <th className="p-4">작성 에디터</th>
                        <th className="p-4">작성일자</th>
                        <th className="p-4">조회수</th>
                        <th className="p-4 text-right">관리 액션</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900/60">
                      {blogs
                        .filter(b => b.title.toLowerCase().includes(blogSearch.toLowerCase()) || b.category.toLowerCase().includes(blogSearch.toLowerCase()))
                        .map((blog) => (
                          <tr key={blog.id} className="hover:bg-zinc-900/10">
                            <td className="p-4 text-white font-bold max-w-sm truncate">{blog.title}</td>
                            <td className="p-4">{blog.category}</td>
                            <td className="p-4">{blog.author}</td>
                            <td className="p-4 font-mono text-[11px]">{blog.date}</td>
                            <td className="p-4 font-mono text-[11px]">{blog.views}</td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end gap-1.5">
                                <button
                                  onClick={() => startEditBlog(blog)}
                                  className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                                  title="수정"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => deleteBlog(blog.id)}
                                  className="p-1.5 rounded bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/30 text-rose-400"
                                  title="삭제"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PORTFOLIO WRITER */}
        {activeTab === 'portfolio' && (
          <div className="flex flex-col gap-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">공간 혁신 포트폴리오 관리</h2>
                <p className="text-xs text-zinc-500 mt-1 font-sans">고객들이 신뢰할 수 있도록 우리 에이전시의 대형 공간 DT 성공 레퍼런스를 편집합니다.</p>
              </div>

              {!portfolioFormOpen && (
                <button
                  onClick={() => {
                    setEditingProjectId(null);
                    setProjectTitle('');
                    setProjectCategory('');
                    setProjectClient('');
                    setProjectLocation('');
                    setProjectDescription('');
                    setProjectImage('');
                    setProjectDate('');
                    setProjectTags('');
                    setPortfolioFormOpen(true);
                  }}
                  className="px-4 py-2 bg-[var(--accent-color)] text-white hover:brightness-110 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 self-start"
                >
                  <Plus className="w-4 h-4" />
                  <span>새 포트폴리오 추가</span>
                </button>
              )}
            </div>

            {/* Portfolio Form Area */}
            {portfolioFormOpen ? (
              <form onSubmit={savePortfolio} className="bg-zinc-900/10 border border-zinc-900 rounded-xl p-6 flex flex-col gap-5 max-w-4xl">
                <div className="flex justify-between items-center pb-3 border-b border-zinc-900">
                  <span className="text-sm font-bold text-white font-sans">{editingProjectId ? '기존 레퍼런스 수정' : '새 레퍼런스 등록'}</span>
                  <button 
                    type="button" 
                    onClick={() => setPortfolioFormOpen(false)}
                    className="p-1.5 text-zinc-500 hover:text-white rounded-full bg-zinc-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">레퍼런스 프로젝트명 <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      placeholder="예: 현대백화점 본점 미디어 월 구축"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">솔루션 분류 (Category)</label>
                    <input
                      type="text"
                      placeholder="예: Digital Signage, AI Vision"
                      value={projectCategory}
                      onChange={(e) => setProjectCategory(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">발주 고객사 <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      placeholder="예: 아모레퍼시픽"
                      value={projectClient}
                      onChange={(e) => setProjectClient(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">구축 주소 / 위치</label>
                    <input
                      type="text"
                      placeholder="예: 서울 성동구 성수동"
                      value={projectLocation}
                      onChange={(e) => setProjectLocation(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">구축 연월일</label>
                    <input
                      type="text"
                      placeholder="예: 2026-03-15"
                      value={projectDate}
                      onChange={(e) => setProjectDate(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">테크 태그 (콤마 구분)</label>
                    <input
                      type="text"
                      placeholder="예: AI비전, 반응형조명"
                      value={projectTags}
                      onChange={(e) => setProjectTags(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">소개 이미지 주소</label>
                  <input
                    type="text"
                    placeholder="Unsplash 이미지 주소 등"
                    value={projectImage}
                    onChange={(e) => setProjectImage(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">프로젝트 상세 성과 및 스펙 설명 <span className="text-rose-500">*</span></label>
                  <textarea
                    rows={6}
                    placeholder="구체적인 하드웨어 대수, 소프트웨어 연동 세부 사양, 성과 및 소감을 정밀 기록..."
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-3 text-xs text-white font-sans leading-relaxed resize-y"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-900">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded bg-[var(--accent-color)] text-white text-xs font-bold hover:brightness-110 flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>레퍼런스 최종 완료</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPortfolioFormOpen(false)}
                    className="px-5 py-2.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs hover:bg-zinc-800 hover:text-white"
                  >
                    취소
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="relative max-w-md w-full">
                  <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="프로젝트 타이틀 또는 고객사 검색..."
                    value={portfolioSearch}
                    onChange={(e) => setPortfolioSearch(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-color)]"
                  />
                </div>

                <div className="border border-zinc-900 rounded-xl overflow-hidden bg-black/40">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-zinc-900 text-zinc-500 uppercase font-mono font-bold tracking-wider bg-zinc-950">
                        <th className="p-4">공간 프로젝트명</th>
                        <th className="p-4">카테고리</th>
                        <th className="p-4">발주 고객사</th>
                        <th className="p-4">구축 연도</th>
                        <th className="p-4">위치</th>
                        <th className="p-4 text-right">관리 액션</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900/60">
                      {projects
                        .filter(p => p.title.toLowerCase().includes(portfolioSearch.toLowerCase()) || p.client.toLowerCase().includes(portfolioSearch.toLowerCase()))
                        .map((proj) => (
                          <tr key={proj.id} className="hover:bg-zinc-900/10">
                            <td className="p-4 text-white font-bold max-w-sm truncate">{proj.title}</td>
                            <td className="p-4">{proj.category}</td>
                            <td className="p-4 font-semibold text-zinc-300">{proj.client}</td>
                            <td className="p-4 font-mono text-[11px]">{proj.date}</td>
                            <td className="p-4">{proj.location}</td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end gap-1.5">
                                <button
                                  onClick={() => startEditPortfolio(proj)}
                                  className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                                  title="수정"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => deletePortfolio(proj.id)}
                                  className="p-1.5 rounded bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/30 text-rose-400"
                                  title="삭제"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: INQUIRIES LOG */}
        {activeTab === 'inquiries' && (
          <div className="flex flex-col gap-8 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">공간 제안 신청 및 고객 실사 로그</h2>
              <p className="text-xs text-zinc-500 mt-1 font-sans">고객들이 메인 웹사이트 제안서를 통해 직접 신청 기재한 인바운드 DB 내역입니다.</p>
            </div>

            <div className="flex flex-col gap-4">
              {inquiries.length === 0 ? (
                <div className="p-12 text-center border border-zinc-900 bg-black/40 rounded-xl">
                  <Inbox className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                  <p className="text-xs text-zinc-500">현재 접수된 문의 내역이 비어 있습니다.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {inquiries.map((inq) => (
                    <div 
                      key={inq.id} 
                      className={`p-6 border rounded-xl flex flex-col justify-between gap-4 transition-all duration-300 bg-zinc-950 ${
                        inq.status === 'new' 
                          ? 'border-rose-500/30 shadow-md shadow-rose-500/2' 
                          : 'border-zinc-900'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-900 pb-3">
                        <div className="flex items-center gap-2.5">
                          <span className={`h-2.5 w-2.5 rounded-full ${
                            inq.status === 'new' ? 'bg-rose-500 animate-pulse' : 'bg-zinc-700'
                          }`} />
                          <h4 className="text-sm font-bold text-white">{inq.name}</h4>
                          <span className="text-[10px] text-zinc-500 font-mono">/</span>
                          <span className="text-xs text-zinc-400 font-medium">{inq.company || '개인소속'}</span>
                          <span className="text-[10px] text-zinc-500 font-mono">/</span>
                          <span className="text-xs font-mono text-zinc-500">{inq.email}</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-600">{inq.date}</span>
                      </div>

                      {/* Content text */}
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line font-sans bg-black/40 p-4 border border-zinc-900 rounded-lg">
                        {inq.content}
                      </p>

                      {/* Status changing actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-950 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">현재 상태제어:</span>
                          <button
                            onClick={() => handleInquiryStatus(inq.id, 'new')}
                            className={`px-2 py-1 rounded text-[10px] font-bold font-mono ${
                              inq.status === 'new' 
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                                : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'
                            }`}
                          >
                            NEW
                          </button>
                          <button
                            onClick={() => handleInquiryStatus(inq.id, 'read')}
                            className={`px-2 py-1 rounded text-[10px] font-bold font-mono ${
                              inq.status === 'read' 
                                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' 
                                : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'
                            }`}
                          >
                            READ
                          </button>
                          <button
                            onClick={() => handleInquiryStatus(inq.id, 'replied')}
                            className={`px-2 py-1 rounded text-[10px] font-bold font-mono ${
                              inq.status === 'replied' 
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                                : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'
                            }`}
                          >
                            REPLIED
                          </button>
                        </div>

                        <button
                          onClick={() => handleInquiryDelete(inq.id)}
                          className="px-2.5 py-1 rounded bg-rose-950/20 border border-rose-900/30 text-rose-400 hover:bg-rose-950/40 text-[10px] font-semibold transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>로그 기록 삭제</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
