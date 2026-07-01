/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  User, 
  Cpu, 
  ChevronLeft, 
  ChevronRight,
  Monitor,
  Video
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  date: string;
  location: string;
  description: string;
  longDescription: string;
  features: string[];
  techStack: string[];
  image: string;
  videoUrl?: string;
  isMp4?: boolean;
  externalLink?: string;
}

const projectsData: Project[] = [
  {
    id: 'ssu-giga-led',
    title: '숭실대학교 120주년 기념 기가 LED 미디어월',
    category: '초대형 LED 디스플레이',
    client: '숭실대학교',
    date: '2023.10',
    location: '서울시 동작구 숭실대학교',
    description: '숭실대학교 메인 대강당의 웅장한 내부 인테리어와 조화를 이루는 초고해상도 기가 LED 미디어월 시스템 구축.',
    longDescription: '숭실대학교 설립 120주년을 기념하여 대학 본관 메인 대강당 및 로비에 초대형 기가 LED 미디어월을 구축하였습니다. 건축물의 우아한 아치형 곡선 및 따뜻한 원목 인테리어와 자연스럽게 연계되도록 디스플레이 레이아웃을 정교하게 통합 설계했습니다. 실시간 고화질 영상 재생뿐만 아니라 학내 주요 행사, 안내, 미디어 아트 등 다양한 시각 콘텐츠를 유연하고 즉각적으로 제어할 수 있는 스마트 사이니지 운영 인프라가 구현되었습니다.',
    features: [
      '대강당 건축 레이아웃 맞춤형 초대형 고화질 LED 솔루션 설계',
      '웹 기반 통합 관리 기능으로 원격 실시간 콘텐츠 스케줄링 제어',
      '다양한 화면 분할 레이아웃 및 외부 라이브 스트리밍 소스 연동 지원',
      '저전력 고신뢰성 설계로 연중무휴 장시간 연속 안정 운영 보장'
    ],
    techStack: [
      'Smart Sign CMS v3.0',
      'Ultra High-Pitch Giga LED Display',
      'Novastar LED Controller System',
      'Real-time Video Processing Matrix'
    ],
    image: '/src/assets/images/ref_ssu_giga_led_1782845318346.jpg',
    externalLink: 'https://www.tunemedia.co.kr/portfolio/%ec%88%ad%ec%8b%a4%ed%95%99%ea%b5%90/'
  },
  {
    id: 'daechi-edelui-led',
    title: '대치 디에이치 에델루이 외부형 고휘도 LED 미디어 월',
    category: '외부형 LED 광고 보드',
    client: '디에이치 에델루이',
    date: '2023.08',
    location: '서울시 강남구 대치동',
    description: '대치동 중심 상권 건물의 외부 벽면에 압도적인 선명도를 자랑하는 아웃도어용 초고휘도 방수 LED 사이니지 구현.',
    longDescription: '강남 대치동의 프리미엄 랜드마크 빌딩 외부 파사드에 대형 아웃도어 LED 미디어 월을 성공적으로 안착시켰습니다. 강렬한 태양광 아래에서도 왜곡 없는 완벽한 시인성을 보장하기 위해 8,500 nits 이상의 하이엔드 고휘도 디바이스를 적용했으며, 가혹한 계절 변화와 악천후 속에서도 안심하고 운영 가능한 원격 전력 차단 제어 기술과 완벽한 방수(IP65) 엔지니어링 설계를 반영하였습니다.',
    features: [
      '태양광 직사광선 아래에서도 뛰어난 가시성을 제공하는 8500+ nits 고휘도',
      'IP65 등급의 실외 방진·방수 기성 구조물 및 열 배출 쿨링 시스템 설계',
      '원격 IoT 전원 차단 장치(Smart IoT Power Module)를 통한 비상 전력 관리',
      '대치동 유동 인구를 타겟팅하는 세련된 미디어 아트 루프 재생 인프라'
    ],
    techStack: [
      'Outdoor High-Brightness LED Panel',
      'Smart IoT Smart Power Switch',
      'Novastar Taurus Controller',
      'Custom Steel Framing Architecture'
    ],
    image: '/src/assets/images/ref_daechi_led_1782845331008.jpg',
    videoUrl: 'https://www.youtube.com/embed/BPuDySMsZd8'
  },
  {
    id: 'banpo-maple-xi',
    title: '반포 메이플자이 고품격 아파트 커뮤니티 미디어월',
    category: '실내 하이엔드 디스플레이',
    client: '반포 메이플자이',
    date: '2023.06',
    location: '서울시 서초구 반포동',
    description: '하이엔드 프리미엄 주거 단지 내 커뮤니티 센터 로비에 연출된 고급 인테리어 융합 미디어 월 솔루션.',
    longDescription: '반포 메이플자이 입주민만을 위한 최고급 커뮤니티 라운지 로비 공간에 명품 미디어 월을 디자인 및 구축하였습니다. 단순한 광고나 정보 전달을 넘어 주거 환경의 품격을 높이는 수려한 자연 경관, 시즌별 맞춤형 미디어 아트, 커뮤니티 공지 사항 등을 상시 송출합니다. 극도의 슬림 베젤 패널과 툰미디어만의 예술적 레이아웃 배치를 통해 공간 인테리어의 미학적 시너지를 극대화했습니다.',
    features: [
      '초슬림 베젤 LCD 비디오월 구성을 통한 이음새 없는 자연스러운 대화면',
      '자연 예술, 미세먼지 지수, 계절 변화를 반영한 지능형 반응형 테마 디자인',
      '모바일 태블릿을 활용한 관리자의 원격 원터치 테마 및 레이아웃 전환 기술',
      '공간 음향 스피커와 하모니를 이루는 사운드 인터랙션 비디오 무비 세팅'
    ],
    techStack: [
      'Smart Sign Board Engine',
      'Ultra Slim Bezel LG Display Video Wall',
      'Multi-channel Audio Sync Controller',
      'FHD Multi-View Hardware Matrix'
    ],
    image: '/src/assets/images/ref_banpo_maple_1782845344423.jpg',
    videoUrl: 'https://www.youtube.com/embed/wiJOJa7VOdk'
  },
  {
    id: 'yamaha-service',
    title: '야마하 음악교실 디지털 사이니지 통합 운영 서비스',
    category: '리테일 프랜차이즈 운영 서비스',
    client: '야마하 음악교실',
    date: '2023.03',
    location: '전국 주요 지점 및 대리점',
    description: '전국 야마하 음악교실 직영점 및 대리점에 설치된 홍보용 디지털 디스플레이의 실시간 원격 콘텐츠 편성과 통합 유지보수.',
    longDescription: '전국 단위로 운영 중인 야마하 음악교실의 오프라인 공간 미디어 채널을 하나로 연결하는 맞춤 운영 대행을 수행하고 있습니다. 본사 마케팅 팀에서 배포하는 고해상도 교육 과정 프로모션, 시즌 이벤트, 교육생 연주 영상 등의 미디어 데이터를 실시간 네트워크 기반으로 지점별 원격 스케줄 배포 및 모니터링을 진행하며, 툰미디어의 전문 관제 센터를 통해 365일 무중단 동작 신뢰성을 유지하고 있습니다.',
    features: [
      '전국 50여 개 직영/가맹 매장 디스플레이 일괄 통합 원격 실시간 관제 및 편성',
      '클라우드 기반 미디어 자산 분배 시스템으로 지점별 맞춤 광고 송출',
      '장비의 오프라인 상태나 에러 발생 시 SMS/메일 즉시 얼럿 알림 시스템',
      '정기 원격 펌웨어 업데이트 및 하드웨어 오작동의 빠른 현장 긴급 점검 출동'
    ],
    techStack: [
      'Smart Sign Cloud Server',
      'Android Smart Signboard Box',
      'Network Alive Monitoring Daemon',
      'Full HD H.264/H.265 Media Decoder'
    ],
    image: '/src/assets/images/ref_yamaha_store_1782845354312.jpg',
    videoUrl: 'https://www.youtube.com/embed/c3t_Q7esQow'
  },
  {
    id: 'amore-oshan',
    title: '아모레퍼시픽 오산 스토리 가든 미디어 시스템 구축 및 위탁 운영',
    category: '브랜드 홍보 전시관 SI',
    client: '아모레퍼시픽',
    date: '2022.12',
    location: '경기도 오산시 아모레 뷰티 파크',
    description: '방문객에게 깊은 몰입감을 선사하는 스토리 가든 내 디지털 미디어 인프라 고도화 설계 및 전문 위탁 운영 서비스.',
    longDescription: '아모레퍼시픽의 철학과 헤리티지를 오감으로 체험하는 오산 뷰티 파크 내 스토리 가든의 핵심 디지털 미디어 전시 장비들을 완벽히 고도화 구축 및 종합 관리하고 있습니다. 대형 버티컬 디스플레이, 터치 키오스크, 프로젝션 맵핑 시스템을 하드웨어 레벨에서 유기적으로 연동하여 몰입도를 최고조로 높였으며, 정기 검진 및 콘텐츠 최적화 퍼포먼스를 통해 격조 높은 브랜드 아이덴티티를 안정적으로 유지하고 있습니다.',
    features: [
      '미디어 가이드, 디지털 스토리 보드, 가상 가든 시네마 하드웨어 정밀 세팅',
      'MP4 스트리밍 기반 무손실 대용량 원시 영상 소스 원격 제어 및 플레이어 셋업',
      '공간 동선 시나리오와 연동되는 센서 액추에이터 및 통합 오토메이션 시퀀싱',
      'VIP 도슨트 진행에 최적화된 태블릿 반응형 스마트 멀티 컨트롤 패널 탑재'
    ],
    techStack: [
      'Custom Exhibition Media Player',
      'Vertical HD Dynamic Display Server',
      'RS232/IP Device Integrated Controller',
      'Solid State Media Streamer'
    ],
    image: '/src/assets/images/ref_amore_factory_1782845504174.jpg',
    videoUrl: 'http://www.tunemedia.co.kr/wp-content/uploads/2024/10/tune_%EC%95%84%EB%AA%A8%EB%A0%88%EC%98%A4%EC%82%B0_%EC%8A%A4%ED%86%A0%EB%A6%AC%EA%B0%80%EB%93%A0.mp4',
    isMp4: true
  },
  {
    id: 'incheon-airport',
    title: '인천국제공항 여객터미널 스마트 안내 디지털 키오스크 구축',
    category: '공공 인프라 스마트 키오스크',
    client: '인천국제공항공사',
    date: '2022.09',
    location: '인천시 중구 인천국제공항',
    description: '공항 방문객 및 여행객을 위한 실시간 위치 안내, 비행 정보 연동 터치식 안내 키오스크 하드웨어 및 시스템 소프트웨어 연계.',
    longDescription: '글로벌 허브 인천국제공항 제1, 2여객터미널 로비에 고장 없는 초정밀 터치식 가이드 키오스크 인프라를 마련하였습니다. 여객 터미널 내 복잡한 경로를 3D 인터랙티브 지도로 빠르고 쉽게 탐색하고, 공항 항공편 DB에 실시간 접근하여 탑승 게이트 및 출발/도착 지각 여부 등 중요한 실시간 일정을 안내받을 수 있습니다. 공항이라는 높은 공공 보안 기준에 맞춘 엄격한 데이터 프로토콜 하에 설계되어 극한의 신뢰도를 달성했습니다.',
    features: [
      '글로벌 공공 표준에 대응하는 다국어(한국어, 영어, 중국어, 일본어) 지원 UI 시스템',
      '공항 항공 네트워크 허브 서버와의 보안 소켓 연동을 통한 실시간 비행 스케줄 수집',
      '터치 스크린 하드웨어 오동작 시 원격 소프트웨어 하드 리셋 모듈 탑재',
      '안정적인 충격 흡수 프레임 및 눈부심 방지 강화유리가 접목된 인체공학적 디자인'
    ],
    techStack: [
      'Dual-touch Professional Glass Display',
      'Embedded Industrial Windows PC',
      'Safe Tunneling API Socket Interface',
      'Automatic Kiosk State Restorer'
    ],
    image: '/src/assets/images/ref_airport_kiosk_1782845520602.jpg',
    videoUrl: 'https://www.youtube.com/embed/saT99H4tpFI'
  },
  {
    id: 'dongwoo-finechem',
    title: '동우화인켐 투명 LED 미디어 아트 전시 기획 및 솔루션',
    category: '차세대 디스플레이 전시관',
    client: '동우화인켐',
    date: '2022.06',
    location: '서울 강남구 무역센터 COEX 전시관',
    description: '시각적 한계를 뛰어넘어 투과율과 선명함을 한 번에 충족하는 차세대 투명 LED 필름 디스플레이 아트 연출.',
    longDescription: '세계적인 화학 소재 및 광학 필름 기술 기업인 동우화인켐의 혁신 기술력을 과시하는 COEX 특별 전시회 현장에 투명 LED 미디어 전시관을 성공적으로 구축하였습니다. 전시관 부스의 유리 벽면 전체에 75% 이상의 뛰어난 빛 투과율을 자랑하는 초박형 자착식 투명 LED 필름을 부착하여, 관람객들이 유리를 통해 실내 전시품을 선명히 보면서 동시에 허공에 둥둥 떠다니는 신비로운 미디어 그래픽과 역동적인 스노우 아트 콘텐츠를 만끽할 수 있게 연출해 폭발적인 관심을 이끌어냈습니다.',
    features: [
      '유리 소재 고유의 투명도를 훼손하지 않으면서 6,000 nits 수준의 압도적 밝기 구현',
      '전시관 공간에 어우러지는 특수 이펙트(비행, 함박눈 모션 그래픽) 맞춤형 제작',
      '가볍고 얇은 LED 필름 부착 방식으로 유리 외벽 구조 변경 없는 비파괴 시공',
      '관람객 접근 감지 센서 연동형 반응형 인터랙티브 미디어 시나리오 프로그램 탑재'
    ],
    techStack: [
      'Transparent Adhesive LED Film',
      'Synchronous High-Resolution LED Sender',
      'Interactive Distance Ultrasonic Sensor',
      'Media Art Playback Server'
    ],
    image: '/src/assets/images/ref_dongwoo_fine_1782845532293.jpg',
    videoUrl: 'https://www.youtube.com/embed/CqF1L5Wl814'
  },
  {
    id: 'innisfree-retail',
    title: '이니스프리 전국 오프라인 매장 통합 디지털 사이니지 인프라',
    category: '리테일 매장 공간 DT',
    client: '이니스프리 (아모레퍼시픽 그룹)',
    date: '2022.04',
    location: '전국 이니스프리 로드샵 및 백화점 매장',
    description: '전국 매장 윈도우와 내부에 유기적인 에코 웰 테마의 파노라마 디스플레이 망을 일괄 교체 및 클라우드 통합 관제.',
    longDescription: '자연주의 화장품 브랜드 이니스프리의 전국 오프라인 핵심 스토어들에 실시간 클라우드 연동형 스마트 사이니지망을 구축하였습니다. 매장 입구 전면 윈도우에 설치된 세로형 고휘도 패널들과 카운터 뒤 파노라마 가로 배너 형태 디스플레이가 동기화되어 매장의 계절별 캠페인 시각 테마(녹색 숲, 청정 제주 등)를 공간에 생생하게 채워냅니다. 툰미디어 원격 CMS로 캠페인 테마 및 상품 가격표 변경 등을 즉시 전 지점에 수초 만에 동시 배정 및 업데이트할 수 있게 디지털 전환(DT)을 실현하였습니다.',
    features: [
      '본사와 전국 가맹 매장을 초고속 무선 LTE로 연결하는 전용 클라우드 사이니지 허브 구성',
      '윈도우 쇼케이스 전용 3,000 nits 실내 고휘도 디바이스 선정을 통한 시인성 강화',
      '자연 친화적 플랜테리어(인테리어 조화) 및 매장 원목 마감재와 이질감 없는 하우징 설계',
      '실시간 프로모션 시간대별 자동 가격표 가변(Dynamic Menu-Board) 템플릿 배포'
    ],
    techStack: [
      'Smart Sign Enterprise CMS v3.0',
      'High-Brightness Window Showcase Monitor',
      'LTE Embedded Network Router Node',
      'HTML5 Web-App Menu Board Player'
    ],
    image: '/src/assets/images/ref_innisfree_store_1782845543161.jpg',
    videoUrl: 'https://www.youtube.com/embed/sat99h4tpfI'
  }
];

interface ReferenceProps {
  settings: any;
  onBackToHome: () => void;
}

export default function Reference({ settings, onBackToHome }: ReferenceProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Scroll to top when selected project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedProjectId]);

  const activeProject = projectsData.find(p => p.id === selectedProjectId);
  const activeIndex = projectsData.findIndex(p => p.id === selectedProjectId);

  const handleNextProject = () => {
    if (activeIndex !== -1) {
      const nextIndex = (activeIndex + 1) % projectsData.length;
      setSelectedProjectId(projectsData[nextIndex].id);
    }
  };

  const handlePrevProject = () => {
    if (activeIndex !== -1) {
      const prevIndex = (activeIndex - 1 + projectsData.length) % projectsData.length;
      setSelectedProjectId(projectsData[prevIndex].id);
    }
  };

  return (
    <div className="bg-white min-h-screen text-zinc-800 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* ==========================================
            A. DETAIL VIEW / SITE ("각각의 사이트")
           ========================================== */}
        <AnimatePresence mode="wait">
          {selectedProjectId && activeProject ? (
            <motion.div
              key="project-detail"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="space-y-12"
            >
              {/* Back & Breadcrumb header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-150 pb-5 gap-4">
                <button
                  onClick={() => setSelectedProjectId(null)}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-blue-600 transition-colors duration-300"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  <span>레퍼런스 목록으로 가기</span>
                </button>
                <div className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">
                  Reference &gt; <span className="text-blue-600">{activeProject.category}</span>
                </div>
              </div>

              {/* Project Title Banner */}
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full tracking-wider uppercase">
                  {activeProject.category}
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
                  {activeProject.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-zinc-500 max-w-4xl font-medium leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Dynamic Video Embed / Image Display */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Media Container (Left 7 Columns) */}
                <div className="lg:col-span-8 space-y-6">
                  {activeProject.videoUrl ? (
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-16/9 border border-zinc-200">
                      {activeProject.isMp4 ? (
                        <video
                          src={activeProject.videoUrl}
                          className="w-full h-full object-cover"
                          controls
                          autoPlay
                          muted
                          playsInline
                        />
                      ) : (
                        <iframe
                          src={activeProject.videoUrl}
                          title={activeProject.title}
                          className="absolute inset-0 w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      )}
                    </div>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-16/9 border border-zinc-200">
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* About the Project (Long Description) */}
                  <div className="bg-zinc-50 border border-zinc-150 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
                    <h3 className="text-lg font-bold text-zinc-900 font-sans flex items-center gap-2">
                      <Monitor className="w-5 h-5 text-blue-600" />
                      프로젝트 개요 및 성과
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-650 leading-relaxed font-sans whitespace-pre-wrap">
                      {activeProject.longDescription}
                    </p>
                  </div>
                </div>

                {/* Meta Details Panel & Features (Right 4 Columns) */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Metadata Table */}
                  <div className="bg-white border border-zinc-150 rounded-2xl p-6 shadow-sm space-y-5">
                    <h3 className="text-base font-black text-zinc-900 border-b border-zinc-100 pb-3">
                      Project Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-zinc-400" />
                        <div>
                          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">Client</p>
                          <p className="text-xs sm:text-sm font-semibold text-zinc-800">{activeProject.client}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-zinc-400" />
                        <div>
                          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">Date</p>
                          <p className="text-xs sm:text-sm font-semibold text-zinc-800">{activeProject.date}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-zinc-400" />
                        <div>
                          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">Location</p>
                          <p className="text-xs sm:text-sm font-semibold text-zinc-800">{activeProject.location}</p>
                        </div>
                      </div>

                      {activeProject.externalLink && (
                        <div className="pt-2 border-t border-zinc-100">
                          <a
                            href={activeProject.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/10"
                          >
                            <span>공식 웹사이트 보기</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Core Features list */}
                  <div className="bg-white border border-zinc-150 rounded-2xl p-6 shadow-sm space-y-4">
                    <h3 className="text-base font-black text-zinc-900 flex items-center gap-2">
                      <Cpu className="w-4.5 h-4.5 text-blue-600" />
                      핵심 솔루션 구성
                    </h3>
                    <ul className="space-y-2.5">
                      {activeProject.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-650 leading-relaxed font-medium">
                          <span className="text-blue-500 font-bold mt-1">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Applied Technologies list */}
                  <div className="bg-white border border-zinc-150 rounded-2xl p-6 shadow-sm space-y-3">
                    <h3 className="text-sm font-black text-zinc-400 uppercase tracking-widest font-mono">
                      Technology Applied
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.techStack.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-mono font-bold text-zinc-600">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ==========================================
                  C. BOTTOM NAVIGATION BAR ("마지막 사진처럼 맨 밑에는 다음 페이지 넘어갈 수 있게 해줘")
                 ========================================== */}
              <div className="border-t border-zinc-150 pt-8 flex items-center justify-between">
                <button
                  onClick={handlePrevProject}
                  className="inline-flex items-center gap-2 px-5 py-3 border border-zinc-200 rounded-xl hover:border-blue-500 hover:bg-blue-50/20 text-sm font-bold text-zinc-700 hover:text-blue-600 transition-all duration-300 group"
                >
                  <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                  <span>이전 레퍼런스</span>
                </button>
                
                <button
                  onClick={() => setSelectedProjectId(null)}
                  className="hidden sm:inline-flex px-4 py-2 text-sm font-bold text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  목록 전체보기
                </button>

                <button
                  onClick={handleNextProject}
                  className="inline-flex items-center gap-2 px-5 py-3 border border-zinc-200 rounded-xl hover:border-blue-500 hover:bg-blue-50/20 text-sm font-bold text-zinc-700 hover:text-blue-600 transition-all duration-300 group"
                >
                  <span>다음 레퍼런스</span>
                  <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

            </motion.div>
          ) : (
            
            /* ==========================================
                B. MAIN REFERENCE GALLERY VIEW ("첫번째 사진")
               ========================================== */
            <motion.div
              key="project-gallery"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-14 animate-fadeIn"
            >
              {/* Reference Header */}
              <div className="text-center space-y-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight font-sans">
                  포트폴리오 및 레퍼런스
                </h2>
                <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
                <p className="text-sm sm:text-base text-zinc-500 max-w-xl mx-auto leading-relaxed font-sans font-medium">
                  전국 각지의 오프라인 매장, 공공기관, 대학교 강당에서 완벽하게 증명된 툰미디어의 최고급 디지털 트랜스포메이션 사례입니다.
                </p>
              </div>

              {/* Grid Cards of 8 Projects (exactly references) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.map((project, idx) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProjectId(project.id)}
                    className="group cursor-pointer bg-white border border-zinc-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1.5"
                  >
                    {/* Card Image */}
                    <div className="relative aspect-16/10 overflow-hidden bg-zinc-950 border-b border-zinc-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-300" />
                      
                      {/* Play action icon overlay if video is attached */}
                      {project.videoUrl && (
                        <div className="absolute top-4 right-4 bg-zinc-950/80 backdrop-blur-md text-white p-2 rounded-full border border-white/20 transition-transform duration-300 group-hover:scale-110 shadow-lg">
                          <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                        </div>
                      )}

                      {/* Display Tag in bottom-left */}
                      <span className="absolute bottom-4 left-4 text-[10px] font-mono font-bold tracking-widest text-white uppercase px-2.5 py-1 bg-blue-600/90 backdrop-blur-sm rounded-md shadow-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Card Information */}
                    <div className="p-6 flex flex-col flex-grow justify-between gap-5 text-left">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold font-sans">
                          <span>{project.client}</span>
                          <span>•</span>
                          <span>{project.date}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-blue-600 transition-colors line-clamp-1 leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      {/* Card Footer Link */}
                      <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-blue-600 font-bold text-xs tracking-wider uppercase">
                        <span>프로젝트 상세보기</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
