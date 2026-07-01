/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Diamond, 
  Compass, 
  Layers, 
  MapPin, 
  Phone, 
  Train, 
  Bus, 
  Building2,
  PhoneCall,
  Award,
  Activity,
  Calendar,
  CheckCircle2,
  Monitor,
  Server,
  Settings,
  Shield,
  Clock,
  Laptop,
  Check,
  Cpu,
  Radio,
  ChevronRight,
  Thermometer,
  Lightbulb,
  Wifi,
  Smartphone,
  Flame,
  Zap,
  Lock,
  Wind,
  Sun,
  RefreshCw,
  Eye,
  Database,
  Bot
} from 'lucide-react';
import { SiteSettings } from '../types';

interface AboutPagesProps {
  subPage: 'greetings' | 'org' | 'history' | 'map' | 'digital-signage' | 'smart-ai' | 'smart-iot' | 'smart-service';
  settings: SiteSettings;
  onBackToHome: () => void;
}

export default function AboutPages({ subPage, settings, onBackToHome }: AboutPagesProps) {
  // Image paths from our generated assets
  const skyscraperImg = '/src/assets/images/greetings_skyscrapers_1782840703259.jpg';
  const teamImg = '/src/assets/images/greetings_team_1782840720839.jpg';
  const officeImg = '/src/assets/images/history_smart_office_1782840758172.jpg';
  const aiHandheldImg = '/src/assets/images/history_ai_handheld_1782840779598.jpg';
  const cmsImg = '/src/assets/images/cms_service_thumbnail_1782844054984.jpg';
  const aiVisionImg = '/src/assets/images/ai_vision_thumbnail_1782844076504.jpg';

  const [activeTechPill, setActiveTechPill] = useState<string>('1-1');
  const [activeAiTechPill, setActiveAiTechPill] = useState<string>('ai-1-1');
  const [aiScannerState, setAiScannerState] = useState<'p1' | 'p2' | 'p3'>('p1');

  // Smart IoT Sub-page States
  const [activeIotPill, setActiveIotPill] = useState<string>('1-1');
  const [phoneLightOn, setPhoneLightOn] = useState<boolean>(true);
  const [phoneTemp, setPhoneTemp] = useState<number>(23);
  const [phonePowerOn, setPhonePowerOn] = useState<boolean>(true);
  const [phoneCameraActive, setPhoneCameraActive] = useState<boolean>(true);
  const [phoneFanSpeed, setPhoneFanSpeed] = useState<'미풍' | '약풍' | '강풍'>('약풍');
  const [breakerActive, setBreakerActive] = useState<boolean>(true);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState<number>(0);

  // Smart Service Sub-page States
  const [serviceTimelineStep, setServiceTimelineStep] = useState<number>(0);
  const [serviceEffectActive, setServiceEffectActive] = useState<string>('fade');
  const [servicePackageSelected, setServicePackageSelected] = useState<string>('full');
  const [verificationFile, setVerificationFile] = useState<{ name: string; res: string; size: string; status: 'idle' | 'analyzing' | 'success' }>({
    name: 'summer_campaign_main_1080p.mp4',
    res: '1920x1080',
    size: '85.4MB',
    status: 'idle'
  });

  const iotPillDetails: Record<string, { title: string, desc: string, metric: string }> = {
    '1-1': { title: '공기질 센싱 (Air Quality)', desc: '매장 내 초미세먼지(PM2.5/PM10) 및 휘발성 유기화합물 수치를 실시간으로 정밀 측정하여, 최적의 대기 환경을 자동 관리하고 환기 설비를 연동 제어합니다.', metric: 'PM2.5 공기질 우수 (12㎍/㎥)' },
    '1-2': { title: '일산화탄소 센싱 (CO Sensing)', desc: '주방이나 가열 시설이 있는 주요 포인트를 상시 스캔하여 일산화탄소 등 불완전 연소 가스 발생 시 경보 알람과 강제 환기 송풍을 연동 개시합니다.', metric: '가스 밀도 최적 (0.1 ppm)' },
    '1-3': { title: '이산화탄소 센싱 (CO2 Sensing)', desc: '밀폐된 카페나 매장 좌석 구역 내 이산화탄소 농도를 측정하여 공기 답답함과 졸음을 예방하며, 최적 실내 쾌적성을 위해 냉난방 공조 세기를 자동 조절합니다.', metric: 'CO2 농도 720 ppm (정상)' },
    '1-4': { title: '습도 센싱 (Humidity)', desc: '매장의 목재 인테리어, 정밀 전자기기, 식음료 보존 및 고객의 쾌적성 향상을 위해 실내 최적 습도 영역(45% ~ 55%)을 실시간 자동 감지하여 모니터링합니다.', metric: '실내 상대 습도 48%' },
    '2-1': { title: '화재 및 전압 관리 (Fire & Voltage)', desc: '전력 수배전반 배선의 온습도 이상 발열이나 정전, 이상 전압 유입을 감지하여 안전 사고를 예방하고 관리자에게 자동 모바일 SMS 경보를 가동합니다.', metric: '시스템 전압 220V 정상동작' },
    '2-2': { title: '출입문 관리 (Door Access Control)', desc: '매장 운영 준비 시간 및 야간 비영업 시간에 출입문의 정밀 잠금 상태와 개폐 기록을 원격 모니터링하고 원격 디지털 키를 연동합니다.', metric: '주출입문 및 후문 잠금 유지 중' },
    '2-3': { title: '움직임 관리 (Motion Detection)', desc: '야간이나 휴일 보안 가동 시 매장 내부의 갑작스러운 인체 감지 및 적외선 움직임을 식별하여 즉각적인 로컬 조명 점등 및 관제 긴급 알람을 전송합니다.', metric: '적외선 초소형 모션센서 동작대기' },
    '3-1': { title: 'On/Off 제어 (Smart Power Control)', desc: '스마트 배전반 릴레이 및 IoT 멀티탭 콘센트를 원격 연동하여 조명 회로, 커피머신 예열 장비 등의 전원 공급 및 일괄 차단을 클릭 한 번으로 수행합니다.', metric: '개별 릴레이 전원 공급 활성화' },
    '3-2': { title: '동작 스케줄링 (Smart Scheduling)', desc: '요일별 출퇴근 시간에 맞추어 간판 조명, 에어컨, 난방기를 일제히 예열하거나 자동 소등하는 통합 스케줄 테이블 기능을 제공합니다.', metric: '오후 10시 전체 소등 예약 대기' },
    '3-3': { title: '매장 모니터링 (Store Live Monitoring)', desc: '지점별 실시간 순간 부하 전력량과 총 전력 누적치를 정밀 계측하여 매장에 불필요하게 낭비되는 대기전력을 진단하고 탄소 발자국을 줄입니다.', metric: '순간 소비전력 2.45 kW (저전력)' }
  };

  const techPillDetails: Record<string, { title: string, desc: string }> = {
    '1-1': { title: '스케줄 관리', desc: '시간, 요일, 기간 단위로 상세 편성 스케줄을 기획하여 적시에 최적의 동영상이 송출되도록 편성표를 원격 전송합니다.' },
    '1-2': { title: '싱크(동기화) 스케줄 관리', desc: '여러 대의 디스플레이가 동시 작동할 때, 0.1초 미만의 싱크 동기화를 통해 대형 미디어월처럼 일체감 있게 송출을 맞춥니다.' },
    '1-3': { title: 'USB기반 컨텐츠 재생', desc: '네트워크 장애 시에도 미리 캐싱된 데이터 및 USB 오프라인 디렉토리를 탐색하여 송출 무중단을 보장합니다.' },
    '1-4': { title: '용이한 외부장비 연동', desc: 'LED 패널, 센서 모듈, 외부 미디어 서버와의 연동 규격을 갖춰 다양한 연동 환경을 한눈에 컨트롤합니다.' },
    '2-1': { title: '실시간 상태 모니터링', desc: '네트워크 상태, CPU 온도, 메모리 사용량, 현재 화면 캡처 등을 실시간 원격 대시보드로 실시간 자동 전송합니다.' },
    '2-2': { title: '원격 접속', desc: '원격 터미널 프로토콜을 통해 장애 발생 시 현장 방문 없이 즉각적인 스크립트 수정 및 펌웨어 배포가 가능합니다.' },
    '2-3': { title: '로그인 및 권한 관리', desc: '본사 총괄 관리자, 지점 관리자, 매장 점주 등 다계층 권한(RBAC) 설정을 통해 송출 보안 사고를 완벽 예방합니다.' },
    '3-1': { title: '플레이어 유지보수', desc: '비정상 프로세스 다운 시 실시간 자가 회복 알고리즘(Watchdog)을 가동하여 자동 복구 재생 및 로그를 수집합니다.' },
    '3-2': { title: '서버 유지보수', desc: '클라우드 분산 서버 인프라를 활용하여 서버 장애 시 백업 서버로 즉시 자동 스위칭(Failover)하는 이중화 설계를 구현합니다.' },
    '3-3': { title: '데이터 관리', desc: '로그 전송 주기 조절 및 압축 알고리즘을 통해 통신 비용을 최소화하고, 송출 결과를 DB로 통계 분석합니다.' },
    '3-4': { title: '모듈 관리', desc: '소프트웨어의 다양한 플러그인 모듈(날씨, 미세먼지, 자막, 뉴스 피드 등)을 필요에 따라 손쉽게 켜고 끕니다.' }
  };

  const aiTechPillDetails: Record<string, { title: string, desc: string, dataMetric?: string }> = {
    'ai-1-1': { title: '피플 카운트 (People Count)', desc: '매장 출입구 및 특정 구역을 통과하는 인원을 실시간으로 감지하고 카운팅하여 방문객 추이를 정밀 분석합니다.', dataMetric: '일평균 1,240명 통과 감지' },
    'ai-1-2': { title: '성별 및 연령 분석 (Demographics)', desc: '카메라 영상 속 얼굴 형태 정보를 기반으로 개인을 식별하지 않고 성별 및 연령층을 분류하여 실시간 통계 데이터로 가공합니다.', dataMetric: '성별 인식률 98.4% 달성' },
    'ai-1-3': { title: '재방문자 분석 (Returning Visitor)', desc: '특정 주기에 감지되는 고유 메타 데이터 특성을 대조하여 신규 고객과 재방문 단골 고객의 비율 및 주기를 정확히 트래킹합니다.', dataMetric: '재방문 비율 24.3% 감지' },
    'ai-2-1': { title: '구역별 체류 시간 분석 (Dwell Time)', desc: '매장 내 진열대나 특정 프로모션 존 앞에 고객이 머무는 시간을 초 단위로 분석하여 고객의 관심도를 수치화합니다.', dataMetric: '진열대 평균 체류: 2분 12초' },
    'ai-2-2': { title: '이동 방향 비율 추세 (Flow Trend)', desc: '고객의 이동 동선 패스를 그려 매장 내 주동선과 막다른 길을 진단하고, 매장 레이아웃 배치 효율성을 과학적으로 제시합니다.', dataMetric: '우측 동선 선호 비율 68%' },
    'ai-2-3': { title: '구매 전환율 분석 (Conversion)', desc: '체류 시간 데이터와 실제 결제 데이터를 결합하여 방문객 대비 구매 결정을 내린 실질 구매 전환율을 정교하게 연산합니다.', dataMetric: '체류 대비 구매율 18.5%' },
    'ai-3-1': { title: '고객 맞춤형 광고 송출 (Targeted Ads)', desc: '카메라 앞 대기 중인 고객의 연령대/성별에 대응하는 추천 기획전 배너나 맞춤 상품 광고를 스마트 사인 디스플레이에 즉각 표출합니다.', dataMetric: '타겟 광고 송출 반응도 35% 향상' },
    'ai-3-2': { title: '위급 상황 시 방법 알람 (Safety Guard)', desc: '매장 내 쓰러짐, 침입, 장시간 비정상 움직임 부재 등 위급/보안 장애 상황을 실시간 감지하여 관리자에게 원격 자동 알람을 보냅니다.', dataMetric: '상황 인지 자동 실시간 통보 1.2초' },
    'ai-3-3': { title: '재고 관리 및 상품 관리 (Shelf Management)', desc: '진열대의 상품 유무 상태를 카메라가 정기 스캔하여 빈 진열 공간 발생 시 점주 대시보드로 자동 충전 알림을 푸시합니다.', dataMetric: '품절 상태 방치 시간 80% 감소' }
  };

  return (
    <div className="bg-white text-zinc-800 min-h-screen py-10 px-4 sm:px-6 lg:px-8 mt-20">
      {/* Back button and page indicator */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between border-b border-zinc-100 pb-5">
        <button
          onClick={onBackToHome}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-blue-600 transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>메인페이지로 돌아가기</span>
        </button>
        <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-bold">
          {subPage === 'digital-signage' ? (
            <>Business &gt; Digital Signage</>
          ) : subPage === 'smart-ai' ? (
            <>Business &gt; Smart AI</>
          ) : subPage === 'smart-iot' ? (
            <>Business &gt; Smart IoT</>
          ) : subPage === 'smart-service' ? (
            <>Business &gt; 운영 서비스</>
          ) : (
            <>About Us &gt; {subPage === 'greetings' ? '인사말' : subPage === 'org' ? '조직도' : subPage === 'history' ? '연혁' : '오시는길'}</>
          )}
        </span>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* ==========================================
            1. GREETINGS PAGE (인사말)
            - 1st & 2nd photos
           ========================================== */}
        {subPage === 'greetings' && (
          <div className="animate-fadeIn space-y-20">
            {/* Main Header */}
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight font-sans">
                인사말
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
            </div>

            {/* Photo 1: Skyscrapers with Greeting Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Image box left */}
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl aspect-4/3 border border-zinc-100">
                <img
                  src={skyscraperImg}
                  alt="Tunemedia Building"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Greeting copy right */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono mb-2">
                  ABOUT US
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-900 leading-tight mb-6">
                  {settings.logoText || '툰미디어'}를 찾아주셔서<br />감사합니다.
                </h3>
                
                <div className="text-sm sm:text-base text-zinc-650 leading-relaxed space-y-5 font-sans">
                  <p>
                    {settings.logoText || '툰미디어'}는 2012년 설립이후 오프라인공간에서 디지털사이니지, AI비전, IOT를 활용하여 디지털트랜스포메이션(DT)에 많은 경험을 가지고 있습니다.
                  </p>
                  <p>
                    또한 다양한 공간에 최신의 기술을 적용하는데 그치지 않고 수많은 디바이스를 안정적으로 운영할 수 있도록 도움을 드릴 수 있습니다.
                  </p>
                  <p className="font-semibold text-zinc-800">
                    고객의 일을 내 일처럼 책임감 가지고 열심히 할 수 있도록 툰미디어 구성원들은 준비되어 있습니다.
                  </p>
                </div>

                <div className="mt-8 text-right">
                  <p className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
                    {settings.logoText || '툰미디어'} 직원 일동
                  </p>
                </div>
              </div>
            </div>

            {/* Photo 2: Wide Team banner and Business Info */}
            <div className="space-y-16 pt-10">
              {/* Overlay team banner */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-16/6 min-h-[220px]">
                <img
                  src={teamImg}
                  alt="Team collaboration"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-zinc-900/75 mix-blend-multiply" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 sm:p-10 z-10">
                  <p className="text-xs sm:text-sm font-bold text-blue-400 tracking-wider uppercase mb-2">
                    왜 디지털 사이니지는 툰미디어와 함께 해야 할까요?
                  </p>
                  <h4 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
                    스마트한 공간관리의 새로운 기준, 툰미디어
                  </h4>
                </div>
              </div>

              {/* Our Business cards */}
              <div className="space-y-10">
                <div className="text-center max-w-xl mx-auto">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono">
                    OUR BUSINESS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-zinc-900 mt-1.5">
                    {settings.logoText || '툰미디어'}의 사업
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: 디지털사이니지 */}
                  <div className="bg-white border border-zinc-150 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col items-center text-center group">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                      <Diamond className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="text-base font-bold text-zinc-900 mb-2">디지털사이니지</h4>
                    <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                      필드에서 검증된 CMS 시스템인 스마트사인들을 만나보세요!
                    </p>
                  </div>

                  {/* Card 2: 스마트 Ai */}
                  <div className="bg-white border border-zinc-150 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col items-center text-center group">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                      <Compass className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="text-base font-bold text-zinc-900 mb-2">스마트 Ai</h4>
                    <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                      Ai 카메라와 스마트 셋탑을 활용하여 매장을 효율적으로 관리해 보세요!
                    </p>
                  </div>

                  {/* Card 3: 스마트 IoT */}
                  <div className="bg-white border border-zinc-150 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col items-center text-center group">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                      <Layers className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="text-base font-bold text-zinc-900 mb-2">스마트 IoT</h4>
                    <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                      전력 관리도 CMS를 통하여 편리하고 스마트하게 사용해 보세요!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            2. ORGANIZATION PAGE (조직도)
            - 3rd photo
           ========================================== */}
        {subPage === 'org' && (
          <div className="animate-fadeIn space-y-12">
            {/* Main Header */}
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight font-sans">
                조직도
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
              <p className="text-xs sm:text-sm text-zinc-500 mt-3 font-mono">
                {settings.logoText || 'tunemedia'} Organization Chart
              </p>
            </div>

            {/* Interactive Custom Tree Diagram block */}
            <div className="bg-zinc-50 border border-zinc-150 rounded-2xl p-6 sm:p-10 overflow-x-auto">
              <div className="min-w-[800px] flex flex-col items-center py-6">
                
                {/* Level 1: CEO */}
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center text-center shadow-xl z-10 group hover:scale-105 transition-transform duration-300">
                    <span className="text-white text-xs font-semibold tracking-wide uppercase">대표이사</span>
                    <span className="text-white text-lg font-black tracking-tight mt-1">(CEO)</span>
                  </div>
                  {/* Connector line down */}
                  <div className="w-0.5 h-8 bg-blue-600" />
                </div>

                {/* Level 2 Area: business & management splits */}
                <div className="relative w-full flex flex-col items-center">
                  {/* Horizontal line right for 경영지원팀 */}
                  <div className="absolute top-0 left-1/2 w-[160px] h-0.5 bg-blue-600" />
                  
                  {/* 경영지원팀 vertical drop right */}
                  <div className="absolute top-0 left-[calc(50%+160px)] w-0.5 h-16 bg-blue-600" />
                  
                  {/* 경영지원팀 box */}
                  <div className="absolute top-16 left-[calc(50%+60px)] w-52 flex justify-center">
                    <div className="bg-blue-600 text-white font-bold text-xs py-3 px-6 rounded-lg shadow-md tracking-wider text-center w-full">
                      경영지원팀
                    </div>
                  </div>

                  {/* Main branch continuing down to 사업총괄본부 */}
                  <div className="w-0.5 h-16 bg-blue-600" />

                  {/* 사업총괄본부 box */}
                  <div className="bg-blue-600 text-white font-bold text-sm py-3.5 px-8 rounded-lg shadow-md tracking-wider text-center z-10 w-52">
                    사업총괄본부
                  </div>

                  {/* Connector line down to bottom row */}
                  <div className="w-0.5 h-12 bg-blue-600" />
                </div>

                {/* Level 3: Five Branches row */}
                <div className="w-full">
                  {/* Huge horizontal connector line spanning 5 columns */}
                  <div className="h-0.5 bg-blue-600 w-[80%] mx-auto" />
                  
                  {/* Five columns layout */}
                  <div className="grid grid-cols-5 gap-4 mt-0 w-full px-2">
                    
                    {/* Col 1: 미디어 운영팀 */}
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-6 bg-blue-600" />
                      <div className="w-full flex flex-col rounded-xl overflow-hidden shadow-sm border border-zinc-200">
                        <div className="bg-blue-600 text-white font-bold text-[11px] sm:text-xs py-3 px-1 text-center tracking-tight">
                          미디어 운영팀
                        </div>
                        <div className="flex flex-col bg-zinc-50 border-t border-zinc-150">
                          <div className="bg-[#505050] text-white text-[10px] sm:text-[11px] py-2.5 px-1 text-center border-b border-zinc-600">
                            미디어 운영 관리
                          </div>
                          <div className="bg-[#505050] text-white text-[10px] sm:text-[11px] py-2.5 px-1 text-center border-b border-zinc-600">
                            협력사 관리
                          </div>
                          <div className="bg-[#505050] text-white text-[10px] sm:text-[11px] py-2.5 px-1 text-center">
                            미디어 운영
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Col 2: 디지털미디어팀 */}
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-6 bg-blue-600" />
                      <div className="w-full flex flex-col rounded-xl overflow-hidden shadow-sm border border-zinc-200">
                        <div className="bg-blue-600 text-white font-bold text-[11px] sm:text-xs py-3 px-1 text-center tracking-tight">
                          디지털미디어팀
                        </div>
                        <div className="flex flex-col bg-zinc-50 border-t border-zinc-150">
                          <div className="bg-[#505050] text-white text-[10px] sm:text-[11px] py-2.5 px-1 text-center border-b border-zinc-600 leading-tight">
                            디지털 사이니지 기획/영업
                          </div>
                          <div className="bg-[#505050] text-white text-[10px] sm:text-[11px] py-2.5 px-1 text-center border-b border-zinc-600 leading-tight">
                            SI 프로젝트 현장 구축
                          </div>
                          <div className="bg-[#505050] text-white text-[10px] sm:text-[11px] py-2.5 px-1 text-center leading-tight">
                            시장 개발 및 고객사 발굴
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Col 3: 콘텐츠팀 */}
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-6 bg-blue-600" />
                      <div className="w-full flex flex-col rounded-xl overflow-hidden shadow-sm border border-zinc-200">
                        <div className="bg-blue-600 text-white font-bold text-[11px] sm:text-xs py-3 px-1 text-center tracking-tight">
                          콘텐츠팀
                        </div>
                        <div className="flex flex-col bg-zinc-50 border-t border-zinc-150">
                          <div className="bg-[#505050] text-white text-[10px] sm:text-[11px] py-2.5 px-1 text-center border-b border-zinc-600">
                            콘텐츠 제작
                          </div>
                          <div className="bg-[#505050] text-white text-[10px] sm:text-[11px] py-2.5 px-1 text-center border-b border-zinc-600">
                            콘텐츠 운영 관리
                          </div>
                          <div className="bg-[#505050] text-white text-[10px] sm:text-[11px] py-2.5 px-1 text-center leading-tight">
                            브랜드 콘텐츠 전략 수립
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Col 4: 마케팅팀 */}
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-6 bg-blue-600" />
                      <div className="w-full flex flex-col rounded-xl overflow-hidden shadow-sm border border-zinc-200">
                        <div className="bg-blue-600 text-white font-bold text-[11px] sm:text-xs py-3 px-1 text-center tracking-tight">
                          마케팅팀
                        </div>
                        <div className="flex flex-col bg-zinc-50 border-t border-zinc-150">
                          <div className="bg-[#505050] text-white text-[10px] sm:text-[11px] py-2.5 px-1 text-center border-b border-zinc-600">
                            상품·홍보 기획
                          </div>
                          <div className="bg-[#505050] text-white text-[10px] sm:text-[11px] py-2.5 px-1 text-center border-b border-zinc-600 leading-tight">
                            국내외 마케팅 전략 수립
                          </div>
                          <div className="bg-[#505050] text-white text-[10px] sm:text-[11px] py-2.5 px-1 text-center">
                            SNS마케팅
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Col 5: 부설 연구소 */}
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-6 bg-blue-600" />
                      <div className="w-full flex flex-col rounded-xl overflow-hidden shadow-sm border border-zinc-200">
                        <div className="bg-blue-600 text-white font-bold text-[11px] sm:text-xs py-3 px-1 text-center tracking-tight">
                          부설 연구소
                        </div>
                        <div className="flex flex-col bg-zinc-50 border-t border-zinc-150">
                          <div className="bg-[#505050] text-white text-[10px] sm:text-[11px] py-2.5 px-1 text-center border-b border-zinc-600 leading-tight">
                            국책 과제 및 신기술 R&D
                          </div>
                          <div className="bg-[#505050] text-white text-[10px] sm:text-[11px] py-2.5 px-1 text-center border-b border-zinc-600 leading-tight">
                            시장 및 기술동향 조사
                          </div>
                          <div className="bg-[#505050] text-white text-[10px] sm:text-[11px] py-2.5 px-1 text-center">
                            제품 연구 개발
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            3. HISTORY PAGE (연혁)
            - 4th photo
           ========================================== */}
        {subPage === 'history' && (
          <div className="animate-fadeIn space-y-12">
            {/* Main Header */}
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight font-sans">
                연혁
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
              <p className="text-xs sm:text-sm text-zinc-500 mt-3 font-mono">
                {settings.logoText || 'tunemedia'} Corporate History
              </p>
            </div>

            {/* Grid layout of timeline cards matching photograph 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto pt-6">
              
              {/* Card 1: 2022~2024 */}
              <div className="bg-white border border-zinc-150 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col items-center">
                {/* Circular image header */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500/20 mb-6 shadow-md shadow-zinc-100">
                  <img
                    src={skyscraperImg}
                    alt="2022~2024 Era"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-900 mb-5 font-sans">
                  2022~2024
                </h3>
                <ul className="text-xs sm:text-sm text-zinc-600 space-y-3.5 leading-relaxed text-center sm:text-left font-sans font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>통합운영플랫폼 Smart Sign 3.0 런칭</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>비디오제작물 신고증 취득</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>CES 2024 전시회 참가</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>LG U+ 매장 CMS 운영·관리</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>아모레 광교 스토어 AI 서비스 구축</span>
                  </li>
                </ul>
              </div>

              {/* Card 2: 2019~2021 */}
              <div className="bg-white border border-zinc-150 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col items-center">
                {/* Circular image header */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500/20 mb-6 shadow-md shadow-zinc-100">
                  <img
                    src={aiHandheldImg}
                    alt="2019~2021 Era"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-900 mb-5 font-sans">
                  2019~2021
                </h3>
                <ul className="text-xs sm:text-sm text-zinc-600 space-y-3.5 leading-relaxed text-center sm:text-left font-sans font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Smart sign GS인증</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>중기청 R&D 과제수주(AI관련)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>AI 비즈 특허증 (특허출원)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>투명LED ISE 2020전시회 참가</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>투명LED 전담법인 클로우엠 Spin-off</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: 2016~2018 */}
              <div className="bg-white border border-zinc-150 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col items-center">
                {/* Circular image header */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500/20 mb-6 shadow-md shadow-zinc-100">
                  <img
                    src={officeImg}
                    alt="2016~2018 Era"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-900 mb-5 font-sans">
                  2016~2018
                </h3>
                <ul className="text-xs sm:text-sm text-zinc-600 space-y-3.5 leading-relaxed text-center sm:text-left font-sans font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>통합운영플랫폼 Smart Sign 2.0 런칭</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>툰미디어 부설연구소 설립</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>LG전자 디지털 사이니지 전문점 등록</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>삼성전자 디지털 사이니지 협력</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>LG U+ 매장 멀티비전 운영 플랫폼 구축</span>
                  </li>
                </ul>
              </div>

              {/* Card 4: 2012~2015 */}
              <div className="bg-white border border-zinc-150 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col items-center">
                {/* Circular image header */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500/20 mb-6 shadow-md shadow-zinc-100">
                  <img
                    src={teamImg}
                    alt="2012~2015 Era"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-900 mb-5 font-sans">
                  2012~2015
                </h3>
                <ul className="text-xs sm:text-sm text-zinc-600 space-y-3.5 leading-relaxed text-center sm:text-left font-sans font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>통합운영플랫폼 Smart Sign 1.0 런칭</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>아모레퍼시픽 그룹 운영 협력사 등록</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Smart Sign-Novastar 연동개발 (MCTRL300)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>현대IT 디지털 사이니지 협력</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        )}

        {/* ==========================================
            4. LOCATION PAGE (오시는길)
            - 5th photo
           ========================================== */}
        {subPage === 'map' && (
          <div className="animate-fadeIn space-y-12">
            {/* Main Header */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight font-sans">
                오시는 길
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
            </div>

            {/* Embedded interactive Google Map block - exact address coordinates */}
            <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-lg h-[400px] w-full">
              <iframe
                title="Tunemedia Location Map"
                src="https://maps.google.com/maps?q=인천광역시 남동구 청능대로 559&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Columns layout matching photograph 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 pt-4 max-w-5xl mx-auto">
              {/* Left Column: 회사정보 */}
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-black text-zinc-900 font-sans">
                    회사 정보
                  </h3>
                </div>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-50 p-1.5 rounded-md">
                      <Phone className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">대표번호</p>
                      <p className="text-sm sm:text-base font-bold text-zinc-800 font-mono mt-0.5">
                        Tel : {settings.phone || '010-9654-9882'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-50 p-1.5 rounded-md">
                      <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">주소</p>
                      <p className="text-sm sm:text-base font-bold text-zinc-800 leading-relaxed mt-0.5 font-sans">
                        {settings.address || '인천광역시 남동구 청능대로 559, 4층 4556호 (논현동, 논현메디컬센터)'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: 교통안내 */}
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
                  <Train className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-black text-zinc-900 font-sans">
                    교통안내
                  </h3>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-emerald-50 p-1.5 rounded-md">
                      <Train className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider font-bold">지하철</p>
                      <p className="text-sm sm:text-base font-semibold text-zinc-700 leading-relaxed mt-0.5 font-sans">
                        수인분당선 인천논현역 3번 또는 4번 출구 도보 2분
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-indigo-50 p-1.5 rounded-md">
                      <Bus className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider font-bold">버스</p>
                      <p className="text-sm sm:text-base font-semibold text-zinc-700 leading-relaxed mt-0.5 font-sans">
                        간선 16-1, 20, 112 / 광역 M6410 인천논현역 하차
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ==========================================
            5. DIGITAL SIGNAGE PAGE (디지털 사이니지)
            - Replicates Image 1 & Image 2 perfectly
           ========================================== */}
        {subPage === 'digital-signage' && (
          <div className="animate-fadeIn space-y-16">
            
            {/* Full-width network header banner block */}
            <div className="-mx-4 sm:-mx-6 lg:-mx-8 -mt-10 mb-12 relative overflow-hidden bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-white py-16 px-6 text-center select-none shadow-2xl rounded-2xl">
              {/* Decorative background grid pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-blue-500 rounded-full animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-300 rounded-full opacity-60" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:3rem_3rem]" />
              </div>
              
              <div className="relative z-10 max-w-7xl mx-auto py-6">
                <span className="text-xs sm:text-sm font-bold text-blue-400 uppercase tracking-widest font-mono mb-2 block">
                  사업분야
                </span>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-sans text-white">
                  Business
                </h1>
              </div>

              {/* Breadcrumb row */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm border-t border-white/5 py-2.5 px-6 sm:px-12 flex justify-end">
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-zinc-300">
                  HOME &gt; Business &gt; Digital Signage
                </span>
              </div>
            </div>

            {/* Centered Page Main Title */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight font-sans">
                Digital Signage
              </h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full" />
            </div>

            {/* CMS Service Description Section - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto pt-6">
              {/* Left Column: Copy */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
                    CMS Service
                  </span>
                  <h3 className="text-2xl sm:text-3.5xl font-black text-zinc-900 tracking-tight leading-tight">
                    SMART SIGN
                  </h3>
                </div>
                
                <div className="space-y-5 text-sm sm:text-base text-zinc-650 leading-relaxed space-y-4 font-sans">
                  <p className="font-semibold text-zinc-900">
                    디지털 사이니지를 관리하는 통합 관리 솔루션입니다.
                  </p>
                  <p>
                    디스플레이에 송출되는 콘텐츠 제작, 관리, 모니터링이 가능하도록 지원하는 Contents Management System 으로 10년 이상 축적된 운영 경험과 네트워크 기반으로 구축된 인프라를 바탕으로 언제 어디서든 안정적으로 서비스를 제공하고 있습니다.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-blue-600 text-white text-xs font-bold shadow-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-blue-600/20 hover:-translate-y-0.5"
                  >
                    <span>통합 구축 문의하기</span>
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Right Column: Illustration Image */}
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-150 aspect-16/10 bg-zinc-50 group">
                <img
                  src={cmsImg}
                  alt="SMART SIGN CMS Layout"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* CMS Core Advantages - Shaded Blue Box Section with 4 Cards */}
            <div className="bg-[#ecf5fc] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#d2e6f7] max-w-6xl mx-auto relative overflow-hidden">
              {/* Background solid visual grid connectors */}
              <div className="absolute top-[72px] left-20 right-20 h-0.5 bg-blue-250/20 hidden lg:block z-0" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
                
                {/* Advantage 1 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center text-blue-600 relative z-10 shadow-md mb-5 group-hover:border-blue-500 group-hover:scale-105 transition-all duration-300">
                    <Award className="w-6 h-6 text-blue-600 animate-pulse" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-zinc-900 mb-3 tracking-tight">
                    검증된 운영 노하우
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans max-w-xs">
                    수년간 축적된 운영 경험과 네트워크 기반으로 구축된 인프라를 바탕으로 안정적이고 검증된 서비스를 고객에게 제공하고 있습니다.
                  </p>
                </div>

                {/* Advantage 2 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center text-blue-600 relative z-10 shadow-md mb-5 group-hover:border-blue-500 group-hover:scale-105 transition-all duration-300">
                    <CheckCircle2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-zinc-900 mb-3 tracking-tight">
                    GS 1등급 인증
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans max-w-xs">
                    소프트웨어산업진흥법 제13조에 의거한 소프트웨어의 품질을 인정 받았으며, 국내/외 약 8,000 여개의 미디어를 운영/관리하는 안정된 솔루션 입니다.
                  </p>
                </div>

                {/* Advantage 3 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center text-blue-600 relative z-10 shadow-md mb-5 group-hover:border-blue-500 group-hover:scale-105 transition-all duration-300">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-zinc-900 mb-3 tracking-tight">
                    실시간 모니터링 & 제어
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans max-w-xs">
                    다운로드 상태, CPU 상태 실시간으로 모니터링이 가능하며, STB on/off, sleep/wake up 등 Player 기반 원격 제어가 가능합니다. * Win/Android 버전 기능 상이
                  </p>
                </div>

                {/* Advantage 4 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center text-blue-600 relative z-10 shadow-md mb-5 group-hover:border-blue-500 group-hover:scale-105 transition-all duration-300">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-zinc-900 mb-3 tracking-tight">
                    스마트 스케줄링
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans max-w-xs">
                    일별, 요일, 시간대별 예약 일정 기능을 제공하고, 우선 순위 영상 재생, 긴급 영상 송출 등 다양한 일정 제어 및 스케줄 관리가 가능합니다.
                  </p>
                </div>

              </div>
            </div>

            {/* CMS Service Technologies - Interactive Non-Stop Solutions */}
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono block">
                  CMS Service Technologies
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-950">
                  유지/보수/관리까지 한번에 가능한 Non-Stop 솔루션
                </h3>
              </div>

              {/* Technologies Interactive Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Left Side: Detail view block for active interactive state */}
                <div className="lg:col-span-5 bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full min-h-[300px] shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="space-y-4 relative z-10">
                    <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-bold font-mono tracking-wider">
                      MODULE ID: {activeTechPill}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-zinc-900">
                      {techPillDetails[activeTechPill]?.title}
                    </h4>
                    <p className="text-sm text-zinc-600 leading-relaxed font-sans">
                      {techPillDetails[activeTechPill]?.desc}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-3 relative z-10 border-t border-zinc-150 pt-4 text-xs font-semibold text-zinc-450 font-sans">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>실시간 제어 프로세스 작동 중</span>
                  </div>
                </div>

                {/* Right Side: Interactive Flow diagrams */}
                <div className="lg:col-span-7 space-y-8">
                  
                  {/* Category 1 */}
                  <div className="space-y-3.5">
                    <h5 className="text-xs font-bold text-blue-600 tracking-wide flex items-center gap-1.5 uppercase font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      컨텐츠 스케줄 관리
                    </h5>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { id: '1-1', label: '스케줄 관리' },
                        { id: '1-2', label: '싱크(동기화) 스케줄 관리' },
                        { id: '1-3', label: 'USB기반 컨텐츠 재생' },
                        { id: '1-4', label: '용이한 외부장비 연동' }
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setActiveTechPill(p.id)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold transition-all duration-300 ${
                            activeTechPill === p.id
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/10 scale-[1.02]'
                              : 'bg-white border-zinc-200 text-zinc-700 hover:border-blue-300 hover:bg-blue-50/20'
                          }`}
                        >
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-mono ${
                            activeTechPill === p.id ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500'
                          }`}>
                            {p.id}
                          </span>
                          <span>{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category 2 */}
                  <div className="space-y-3.5">
                    <h5 className="text-xs font-bold text-blue-600 tracking-wide flex items-center gap-1.5 uppercase font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      실시간 모니터링
                    </h5>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { id: '2-1', label: '실시간 상태 모니터링' },
                        { id: '2-2', label: '원격 접속' },
                        { id: '2-3', label: '로그인 및 권한 관리' }
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setActiveTechPill(p.id)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold transition-all duration-300 ${
                            activeTechPill === p.id
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/10 scale-[1.02]'
                              : 'bg-white border-zinc-200 text-zinc-700 hover:border-blue-300 hover:bg-blue-50/20'
                          }`}
                        >
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-mono ${
                            activeTechPill === p.id ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500'
                          }`}>
                            {p.id}
                          </span>
                          <span>{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category 3 */}
                  <div className="space-y-3.5">
                    <h5 className="text-xs font-bold text-blue-600 tracking-wide flex items-center gap-1.5 uppercase font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      유지보수
                    </h5>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { id: '3-1', label: '플레이어 유지보수' },
                        { id: '3-2', label: '서버 유지보수' },
                        { id: '3-3', label: '데이터 관리' },
                        { id: '3-4', label: '모듈 관리' }
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setActiveTechPill(p.id)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold transition-all duration-300 ${
                            activeTechPill === p.id
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/10 scale-[1.02]'
                              : 'bg-white border-zinc-200 text-zinc-700 hover:border-blue-300 hover:bg-blue-50/20'
                          }`}
                        >
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-mono ${
                            activeTechPill === p.id ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500'
                          }`}>
                            {p.id}
                          </span>
                          <span>{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

        {/* ==========================================
            6. SMART AI PAGE (스마트 AI)
            - Replicates Image 1, Image 2, Image 3 perfectly
           ========================================== */}
        {subPage === 'smart-ai' && (
          <div className="animate-fadeIn space-y-16">
            
            {/* Full-width network header banner block */}
            <div className="-mx-4 sm:-mx-6 lg:-mx-8 -mt-10 mb-12 relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-16 px-6 text-center select-none shadow-2xl rounded-2xl">
              {/* Decorative background grid pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-blue-500 rounded-full animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-300 rounded-full opacity-60" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:3rem_3rem]" />
              </div>
              
              <div className="relative z-10 max-w-7xl mx-auto py-6">
                <span className="text-xs sm:text-sm font-bold text-blue-400 uppercase tracking-widest font-mono mb-2 block">
                  사업분야
                </span>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-sans text-white">
                  Business
                </h1>
              </div>

              {/* Breadcrumb row */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm border-t border-white/5 py-2.5 px-6 sm:px-12 flex justify-end">
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-zinc-300">
                  HOME &gt; Business &gt; Smart AI
                </span>
              </div>
            </div>

            {/* Centered Page Main Title */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight font-sans">
                Smart AI
              </h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full" />
            </div>

            {/* AI Service SMART EYE - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto pt-6">
              {/* Left Column: Interactive Visual Simulator matching Photo 1 */}
              <div className="lg:col-span-6 flex flex-col items-center">
                
                {/* Visual camera simulator card */}
                <div className="w-full max-w-lg bg-zinc-50 border border-zinc-200 rounded-2xl p-6 relative overflow-hidden shadow-xl aspect-4/3 flex items-center justify-center">
                  {/* Outer security grid background lines */}
                  <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-60" />
                  
                  {/* The interactive scanning view overlay */}
                  <div className="relative w-full h-full flex items-center justify-between z-10">
                    
                    {/* Left side overlay cards column exactly like Photograph 1 */}
                    <div className="flex flex-col gap-4 w-1/2 pr-2">
                      {/* Box 1: Gender & Age */}
                      <div className="bg-white border-l-4 border-black shadow-md rounded-r-lg py-2.5 px-3 flex items-center gap-3 transition-all duration-300 transform hover:scale-102">
                        <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600">
                          <span className="text-xs font-semibold">👤</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-400 font-bold leading-tight">성별</span>
                          <span className="text-xs sm:text-sm font-black text-zinc-800 leading-none">
                            {aiScannerState === 'p1' ? '30대 남자' : aiScannerState === 'p2' ? '20대 여자' : '40대 여자'}
                          </span>
                        </div>
                      </div>

                      {/* Box 2: Visit Count */}
                      <div className="bg-white border-l-4 border-black shadow-md rounded-r-lg py-2.5 px-3 flex items-center gap-3 transition-all duration-300 transform hover:scale-102">
                        <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600">
                          <span className="text-xs font-semibold">🏠</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-400 font-bold leading-tight">방문횟수</span>
                          <span className="text-xs sm:text-sm font-black text-zinc-800 leading-none">
                            {aiScannerState === 'p1' ? '3회' : aiScannerState === 'p2' ? '1회' : '12회 (VVIP)'}
                          </span>
                        </div>
                      </div>

                      {/* Box 3: Dwell Time */}
                      <div className="bg-white border-l-4 border-black shadow-md rounded-r-lg py-2.5 px-3 flex items-center gap-3 transition-all duration-300 transform hover:scale-102">
                        <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600">
                          <span className="text-xs font-semibold">⏱️</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-400 font-bold leading-tight">체류시간</span>
                          <span className="text-xs sm:text-sm font-black text-zinc-800 leading-none">
                            {aiScannerState === 'p1' ? '3분 15초' : aiScannerState === 'p2' ? '45초' : '8분 40초'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side illustration and scanning frame exactly like Photo 1 */}
                    <div className="w-1/2 h-full flex flex-col justify-center items-center relative pl-2">
                      {/* Ceiling mounted camera simulation */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                        <div className="w-8 h-5 bg-zinc-700 rounded-full shadow-md border border-zinc-500" />
                        <div className="w-2 h-4 bg-zinc-500" />
                        <div className="w-3 h-3 rounded-full bg-zinc-900 border border-blue-500 flex items-center justify-center">
                          <div className="w-1 h-1 bg-red-500 rounded-full animate-ping" />
                        </div>
                        
                        {/* Semi-transparent red light beam projection */}
                        <div className="w-24 h-48 bg-red-500/10 clip-path-cone top-6 origin-top -mt-0.5 pointer-events-none border-l border-r border-dashed border-red-400/35" />
                      </div>

                      {/* User silhouette wireframe with interactive scanning box */}
                      <div className="relative border-2 border-red-500 rounded-lg p-1.5 bg-red-50/5 animate-pulse mt-12">
                        <div className="w-20 h-36 border border-dashed border-red-400 rounded flex flex-col items-center justify-center p-2 text-center text-[10px] font-bold text-red-600 font-mono">
                          <span className="text-xl mb-1">👤</span>
                          <span>DETECTION</span>
                          <span className="text-[8px] bg-red-500 text-white px-1 rounded mt-1">
                            {aiScannerState === 'p1' ? 'M 30s 98%' : aiScannerState === 'p2' ? 'F 20s 97%' : 'F 40s 99%'}
                          </span>
                        </div>
                        
                        {/* Horizontal scanner light line moving */}
                        <div className="absolute left-0 right-0 h-0.5 bg-red-500 shadow-lg shadow-red-500 animate-scanner-line" />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Simulated Persona selector buttons to showcase high-fidelity interactivity */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setAiScannerState('p1')}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                      aiScannerState === 'p1'
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    피험자 1 (남성)
                  </button>
                  <button
                    onClick={() => setAiScannerState('p2')}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                      aiScannerState === 'p2'
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    피험자 2 (신규 여성)
                  </button>
                  <button
                    onClick={() => setAiScannerState('p3')}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                      aiScannerState === 'p3'
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    피험자 3 (단골 VVIP)
                  </button>
                </div>
              </div>

              {/* Right Column: Text copy matching Photo 1 */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
                    Ai Service
                  </span>
                  <h3 className="text-2xl sm:text-3.5xl font-black text-zinc-900 tracking-tight leading-tight">
                    SMART EYE
                  </h3>
                </div>
                
                <div className="space-y-5 text-sm sm:text-base text-zinc-650 leading-relaxed font-sans">
                  <p className="font-semibold text-zinc-900 text-lg">
                    방문 고객의 연령, 성별 뿐만 아니라 시간대 별로 분석합니다.
                  </p>
                  <p>
                    자체 기술력으로 개발한 AI 알고리즘을 이용하여 변화하고 있는 오프라인 공간의 고객 경험을 혁신하기 위해 영상 기반의 오프라인 방문자 분석 솔루션을 제공하고 있습니다.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-blue-600 text-white text-xs font-bold shadow-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-blue-600/20 hover:-translate-y-0.5"
                  >
                    <span>구축 상담 문의하기</span>
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* AI Core Advantages - Shaded Blue Box Section with 4 Cards matching Photo 2 */}
            <div className="bg-[#ecf5fc] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#d2e6f7] max-w-6xl mx-auto relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
                
                {/* Advantage 1 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center text-blue-600 relative z-10 shadow-md mb-5 group-hover:border-blue-500 group-hover:scale-105 transition-all duration-300">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-zinc-900 mb-3 tracking-tight">
                    높은 인식률과 정확도
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans max-w-xs">
                    얼굴 인식 뿐만 아니라 빠르게 움직이는 사물 등 급격한 주변 환경 변화에도 높은 인식률과 정확도를 유지합니다.
                  </p>
                </div>

                {/* Advantage 2 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center text-blue-600 relative z-10 shadow-md mb-5 group-hover:border-blue-500 group-hover:scale-105 transition-all duration-300">
                    <Cpu className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-zinc-900 mb-3 tracking-tight">
                    높은 호환성과 확장성
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans max-w-xs">
                    추가 장비 설치 없이 기존의 CCTV 영상을 분석하여 오프라인 매장의 객체 정보를 데이터화 합니다.
                  </p>
                </div>

                {/* Advantage 3 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center text-blue-600 relative z-10 shadow-md mb-5 group-hover:border-blue-500 group-hover:scale-105 transition-all duration-300">
                    <Monitor className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-zinc-900 mb-3 tracking-tight">
                    고해상도 AI 알고리즘 개발
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans max-w-xs">
                    딥러닝 기반 객체인식 알고리즘으로 600*600 부터 1080 * 1080 까지 고해상도 지원을 실현합니다.
                  </p>
                </div>

                {/* Advantage 4 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center text-blue-600 relative z-10 shadow-md mb-5 group-hover:border-blue-500 group-hover:scale-105 transition-all duration-300">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-zinc-900 mb-3 tracking-tight">
                    개인정보보호법 준수
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans max-w-xs">
                    민감정보를 취득 하지 않고 메타 정보를 활용하는 합법적인 서비스 입니다.
                  </p>
                </div>

              </div>
            </div>

            {/* AI Service Technologies - Interactive Solutions Block */}
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono block">
                  AI Service Technologies
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-950">
                  빅데이터를 이용한 고객, 매장 맞춤형 솔루션
                </h3>
              </div>

              {/* Technologies Interactive Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Left Side: Detail view block for active interactive state */}
                <div className="lg:col-span-5 bg-slate-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full min-h-[340px] shadow-2xl relative overflow-hidden group border border-slate-800">
                  <div className="absolute top-0 right-0 p-16 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                  
                  {/* Decorative digital screen styling */}
                  <div className="absolute top-4 right-4 flex gap-1.5 z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>

                  <div className="space-y-5 relative z-10">
                    <span className="inline-flex px-3 py-1 rounded-full bg-blue-900/40 text-blue-400 border border-blue-800/60 text-[10px] font-bold font-mono tracking-wider">
                      ANALYSIS MODULE ID: {activeAiTechPill.toUpperCase()}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {aiTechPillDetails[activeAiTechPill]?.title}
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans">
                      {aiTechPillDetails[activeAiTechPill]?.desc}
                    </p>
                  </div>

                  <div className="mt-8 relative z-10 border-t border-slate-800 pt-5 space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400 font-bold">시뮬레이션 실시간 지표</span>
                      <span className="text-emerald-400 font-black">
                        {aiTechPillDetails[activeAiTechPill]?.dataMetric}
                      </span>
                    </div>
                    {/* Simulated pulse graph */}
                    <div className="h-6 flex items-end gap-1 w-full bg-slate-900/50 rounded p-1 border border-slate-800/40">
                      {[...Array(24)].map((_, i) => {
                        const heights = [20, 40, 30, 60, 80, 45, 90, 70, 30, 50, 40, 75, 85, 45, 60, 70, 95, 30, 40, 55, 65, 80, 90, 50];
                        const h = heights[(i + activeAiTechPill.charCodeAt(activeAiTechPill.length - 1)) % heights.length];
                        return (
                          <div
                            key={i}
                            style={{ height: `${h}%` }}
                            className="bg-blue-500/80 w-full rounded-sm transition-all duration-500"
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Side: Interactive Flow diagrams matching layout of Photo 2 */}
                <div className="lg:col-span-7 space-y-8">
                  
                  {/* Category 1 */}
                  <div className="space-y-3.5">
                    <h5 className="text-xs font-bold text-blue-600 tracking-wide flex items-center gap-1.5 uppercase font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      빅데이터 수집 및 고객 분석
                    </h5>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { id: 'ai-1-1', label: '피플 카운트' },
                        { id: 'ai-1-2', label: '성별 및 연령 분석' },
                        { id: 'ai-1-3', label: '재방문자 분석' }
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setActiveAiTechPill(p.id)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold transition-all duration-300 ${
                            activeAiTechPill === p.id
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/10 scale-[1.02]'
                              : 'bg-white border-zinc-200 text-zinc-700 hover:border-blue-300 hover:bg-blue-50/20'
                          }`}
                        >
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-mono ${
                            activeAiTechPill === p.id ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500'
                          }`}>
                            {p.id.replace('ai-', '')}
                          </span>
                          <span>{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category 2 */}
                  <div className="space-y-3.5">
                    <h5 className="text-xs font-bold text-blue-600 tracking-wide flex items-center gap-1.5 uppercase font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      행동 분석 및 매장 데이터 축적
                    </h5>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { id: 'ai-2-1', label: '구역별 체류 시간 분석' },
                        { id: 'ai-2-2', label: '이동 방향 비율 추세' },
                        { id: 'ai-2-3', label: '구매 전환율 분석' }
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setActiveAiTechPill(p.id)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold transition-all duration-300 ${
                            activeAiTechPill === p.id
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/10 scale-[1.02]'
                              : 'bg-white border-zinc-200 text-zinc-700 hover:border-blue-300 hover:bg-blue-50/20'
                          }`}
                        >
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-mono ${
                            activeAiTechPill === p.id ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500'
                          }`}>
                            {p.id.replace('ai-', '')}
                          </span>
                          <span>{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category 3 */}
                  <div className="space-y-3.5">
                    <h5 className="text-xs font-bold text-blue-600 tracking-wide flex items-center gap-1.5 uppercase font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      매장 별 맞춤 솔루션
                    </h5>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { id: 'ai-3-1', label: '고객 맞춤형 광고 송출' },
                        { id: 'ai-3-2', label: '위급 상황 시 방법 알람' },
                        { id: 'ai-3-3', label: '재고 관리 및 상품 관리' }
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setActiveAiTechPill(p.id)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold transition-all duration-300 ${
                            activeAiTechPill === p.id
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/10 scale-[1.02]'
                              : 'bg-white border-zinc-200 text-zinc-700 hover:border-blue-300 hover:bg-blue-50/20'
                          }`}
                        >
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-mono ${
                            activeAiTechPill === p.id ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500'
                          }`}>
                            {p.id.replace('ai-', '')}
                          </span>
                          <span>{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* AI Service 4 core capabilities flow matching Photo 3 */}
            <div className="max-w-6xl mx-auto space-y-8 pt-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
                  Core Analytics Stream
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight leading-tight">
                  오프라인 공간 인식 프로세스
                </h3>
                <div className="w-12 h-0.5 bg-blue-600 mx-auto rounded-full" />
              </div>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Card 1: Bio Analysis */}
                <div className="bg-white border border-zinc-150 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    {/* Badge */}
                    <div className="text-xs font-mono font-bold text-zinc-400">
                      01. 생체 분석
                    </div>
                    {/* Graphic Wireframe representation */}
                    <div className="w-full aspect-square rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center relative overflow-hidden p-4">
                      {/* Face bounding box mockup */}
                      <div className="border-2 border-dashed border-sky-400 rounded-lg p-2 flex flex-col items-center justify-center relative w-full h-full">
                        <span className="text-3xl">👤</span>
                        <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-sky-500" />
                        <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-sky-500" />
                        <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-sky-500" />
                        <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-sky-500" />
                        <span className="text-[9px] bg-sky-500 text-white font-mono rounded px-1 mt-1 font-bold">고객 인식 완료</span>
                      </div>
                    </div>
                    {/* Titles */}
                    <div className="space-y-1">
                      <h4 className="text-base font-extrabold text-blue-650 font-sans">
                        인터랙티브 키오스크
                      </h4>
                      <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                        방문 고객의 성별, 연령대 등을 분류하고 Big Data 기반의 맞춤형 콘텐츠를 송출합니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2: Sales Analysis */}
                <div className="bg-white border border-zinc-150 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    {/* Badge */}
                    <div className="text-xs font-mono font-bold text-zinc-400">
                      02. 매출 분석
                    </div>
                    {/* Graphic Wireframe representation */}
                    <div className="w-full aspect-square rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center relative overflow-hidden p-4">
                      {/* RFID scanner simulation */}
                      <div className="border-2 border-dashed border-emerald-400 rounded-lg p-2 flex flex-col items-center justify-center relative w-full h-full bg-emerald-50/5">
                        <span className="text-3xl">💳</span>
                        <div className="mt-2 flex items-center gap-1 px-1.5 py-0.5 bg-emerald-500 text-white font-mono text-[8px] rounded font-bold animate-pulse">
                          <span>RFID TAG SCANNING</span>
                        </div>
                        <span className="text-[9px] text-emerald-600 font-bold mt-1">RFID 스티커 태그</span>
                      </div>
                    </div>
                    {/* Titles */}
                    <div className="space-y-1">
                      <h4 className="text-base font-extrabold text-blue-650 font-sans">
                        스마트 장바구니
                      </h4>
                      <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                        RFID기술을 활용하여 상품 구매 패턴 및 연계성 분석이 가능한 스마트 장바구니로 활용합니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3: Behavior Analysis */}
                <div className="bg-white border border-zinc-150 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    {/* Badge */}
                    <div className="text-xs font-mono font-bold text-zinc-400">
                      03. 행동 분석
                    </div>
                    {/* Graphic Wireframe representation */}
                    <div className="w-full aspect-square rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center relative overflow-hidden p-4">
                      {/* Floor layout wireframe */}
                      <div className="border-2 border-dashed border-amber-400 rounded-lg p-2 flex flex-col items-center justify-center relative w-full h-full bg-amber-50/5">
                        <span className="text-3xl">📹</span>
                        {/* Mesh grid */}
                        <div className="absolute inset-2 border border-dashed border-amber-300/30 grid grid-cols-3 grid-rows-3 opacity-60 pointer-events-none">
                          <div className="bg-red-500/10 border-r border-b border-dashed border-amber-300/30" />
                          <div className="bg-yellow-500/15 border-r border-b border-dashed border-amber-300/30 animate-pulse" />
                          <div className="border-b border-dashed border-amber-300/30" />
                          <div className="border-r border-b border-dashed border-amber-300/30" />
                          <div className="bg-red-500/20 border-r border-b border-dashed border-amber-300/30" />
                          <div className="border-b border-dashed border-amber-300/30" />
                          <div className="border-r border-dashed border-amber-300/30" />
                          <div className="border-r border-dashed border-amber-300/30" />
                          <div className="bg-green-500/10" />
                        </div>
                        <span className="text-[9px] text-amber-700 font-bold font-mono z-10 bg-white/80 px-1 rounded shadow-sm">AI CAMERA ACTIVE</span>
                      </div>
                    </div>
                    {/* Titles */}
                    <div className="space-y-1">
                      <h4 className="text-base font-extrabold text-blue-650 font-sans">
                        매장 AI 카메라
                      </h4>
                      <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                        매장 내 방문 고객 군집도, 성별, 연령대 등을 수치화 하여 오프라인 매장의 효율적인 운용이 가능합니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 4: Object Analysis */}
                <div className="bg-white border border-zinc-150 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    {/* Badge */}
                    <div className="text-xs font-mono font-bold text-zinc-400">
                      04. 객체 분석
                    </div>
                    {/* Graphic Wireframe representation */}
                    <div className="w-full aspect-square rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center relative overflow-hidden p-4">
                      {/* Scale detector with donut */}
                      <div className="border-2 border-dashed border-indigo-400 rounded-lg p-2 flex flex-col items-center justify-center relative w-full h-full bg-indigo-50/5">
                        <span className="text-3.5xl">🍩</span>
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                        <span className="text-[9px] bg-indigo-500 text-white font-mono rounded px-1 mt-2 font-bold">물체 인식 (Donut)</span>
                        <span className="text-[8px] text-zinc-400 mt-0.5">정밀도 99.2%</span>
                      </div>
                    </div>
                    {/* Titles */}
                    <div className="space-y-1">
                      <h4 className="text-base font-extrabold text-blue-650 font-sans">
                        자동 계산기
                      </h4>
                      <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                        매장의 빠른 회전율을 위해 사전에 학습한 상품을 즉시 인식하여 결제할 수 있도록 도와줍니다.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ==========================================
            6. SMART IoT PAGE (Smart IoT)
            - Replicating Image 1, 2, and 3
           ========================================== */}
        {subPage === 'smart-iot' && (
          <div className="space-y-20 max-w-7xl mx-auto px-4 py-8">
            
            {/* 1. Header Area with staggered text animations */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4"
            >
              <span className="text-xs font-black uppercase tracking-widest text-blue-600 font-mono bg-blue-50 px-3 py-1 rounded-full">
                IoT SERVICE
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight font-sans">
                Smart IoT
              </h2>
              <p className="text-sm sm:text-base text-zinc-500 max-w-2xl mx-auto font-sans leading-relaxed">
                매장 내 디바이스를 연결하여 모니터링하고 제어하는 지능형 기술 및 서비스로, 사용자가 원하는 형태로 자유롭게 활용이 가능한 최적화 솔루션입니다.
              </p>
              <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
            </motion.div>

            {/* 2. Hero Section: Image Display Frame alongside Features Card Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Image Showcase with Floating Mockup Container and Ambient Glow */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.96, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-7 flex flex-col items-center justify-center relative py-6"
              >
                {/* Neon Backlight Ambient Glow */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-teal-500/5 blur-3xl pointer-events-none" 
                />

                {/* Main Image Frame Mockup */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    rotate: 0.5,
                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15)"
                  }}
                  className="relative w-full overflow-hidden rounded-[24px] bg-white p-3 border-2 border-zinc-200/60 shadow-xl transition-all duration-300"
                >
                  {/* High-tech device header strip */}
                  <div className="flex justify-between items-center px-4 py-2 border-b border-zinc-100 mb-3 bg-zinc-50/50 -mx-3 -mt-3 rounded-t-[22px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono font-bold tracking-wider">TUNE IoT PREVIEW CONSOLE</span>
                    <div className="w-4 h-4 rounded bg-zinc-200/50 flex items-center justify-center">
                      <span className="text-[8px] text-zinc-500">⚡</span>
                    </div>
                  </div>

                  {/* The Actual Slide Image */}
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-950 group">
                    <motion.img 
                      src="/src/assets/images/smart_iot_thumbnail_1782844091537.jpg" 
                      alt="Smart IoT Service Overview"
                      className="w-full h-full object-cover select-none"
                      referrerPolicy="no-referrer"
                      whileHover={{ scale: 1.015 }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* Visual watermark / label overlays */}
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-mono text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      <span>LIVE PREVIEW ACTIVE</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column: Key Benefits and Feature Focus Points */}
              <div className="lg:col-span-5 space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-2"
                >
                  <h3 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
                    통합형 디바이스 통합 관리
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed font-sans">
                    원거리 제어부터 모니터링, 데이터 수집까지 모든 기기를 한 번에 통제하는 스마트 비즈니스 플랫폼입니다.
                  </p>
                </motion.div>

                {/* Staggered cards list for the 4 core pillars */}
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      icon: <Radio className="w-5 h-5 text-blue-600" />,
                      title: "다양한 센서연동",
                      desc: "조명, 온습도, 공기질 정밀 실시간 환경 감지 및 공조 연동제어 기술 탑재"
                    },
                    {
                      id: 2,
                      icon: <Zap className="w-5 h-5 text-amber-500" />,
                      title: "에너지 데이터 수집 및 분석",
                      desc: "소비 전력량을 정밀 확인하고 탄소 발자국을 줄이는 효율 극대화 솔루션"
                    },
                    {
                      id: 3,
                      icon: <Calendar className="w-5 h-5 text-emerald-500" />,
                      title: "원격 모니터링 제어 및 스케줄링",
                      desc: "모바일 앱을 통해 원격 동작 시간 설정과 일괄 소등 예약 제어 가능"
                    },
                    {
                      id: 4,
                      icon: <Cpu className="w-5 h-5 text-indigo-500" />,
                      title: "손쉬운 도입 시스템",
                      desc: "인터넷 환경만 준비되면 어디든 기기 추가 후 즉시 가동되는 유연한 호환성"
                    }
                  ].map((feat, idx) => (
                    <motion.div
                      key={feat.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.12 }}
                      whileHover={{ 
                        x: 6,
                        backgroundColor: "rgba(244, 244, 245, 0.8)",
                        borderColor: "rgba(59, 130, 246, 0.2)"
                      }}
                      className="p-4 rounded-xl border border-zinc-150 bg-white flex items-start gap-4 transition-all duration-300 shadow-sm cursor-default"
                    >
                      <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0">
                        {feat.icon}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm sm:text-base font-black text-zinc-900">{feat.title}</h4>
                        <p className="text-xs sm:text-sm text-zinc-500 leading-normal font-sans">{feat.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>

            {/* 3. Deep Dive Info & CTA Action Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-[#ecf5fc] rounded-[32px] p-8 sm:p-12 border border-blue-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 items-center">
                
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="text-xl sm:text-2xl font-black text-zinc-950 font-sans">
                    오프라인 매장 맞춤형 IoT 솔루션 도입하기
                  </h4>
                  <p className="text-sm text-zinc-600 leading-relaxed font-sans">
                    식음료 매장, 카페, 프랜차이즈, 사무실 등 모든 상업 공간에 최적화된 기기 연동과 맞춤 시나리오 제어 서비스를 누리실 수 있습니다. 언제든지 전문 엔지니어가 무료 설계 상담을 지원합니다.
                  </p>
                </div>

                <div className="flex justify-start md:justify-end">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      // Navigate to contact or open inquiry dialog
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        onBackToHome();
                        setTimeout(() => {
                          const sec = document.getElementById('contact');
                          if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                        }, 300);
                      }
                    }}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 text-white font-black text-sm tracking-wide shadow-lg hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    도입 상담 신청하기
                  </motion.button>
                </div>

              </div>
            </motion.div>

          </div>
        )}

        {subPage === 'smart-service' && (
          <div className="animate-fadeIn space-y-24 max-w-7xl mx-auto px-4 py-8">
            
            {/* Header Block matching Image 1 */}
            <div className="text-center relative">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight font-sans">
                운영 서비스
              </h2>
              <div className="w-full h-px bg-zinc-200 mt-6 mb-12" />
            </div>

            {/* 1. MEDIA OPERATION SERVICE (Image 1 Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Copy matching Image 1 */}
              <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                  <span className="text-[#025a9c] font-black uppercase tracking-wider text-xs">
                    Management Service
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
                    미디어 운영 전문 서비스
                  </h3>
                </div>

                <div className="space-y-6 text-zinc-700 font-sans leading-relaxed">
                  <p className="text-lg font-bold text-zinc-800">
                    다양한 디지털 사이니지의 미디어를 전문적으로 운영하는 서비스입니다.
                  </p>
                  <p className="text-zinc-500 text-sm sm:text-base">
                    디지털 사이니지의 종류, 편성되는 스케줄, 송출되어야 하는 스케줄의 특성에 상관없이 모든 미디어 운영 서비스가 가능합니다.
                  </p>
                </div>
              </div>

              {/* Right Column: Isometric illustration from Image 1 */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-[500px] overflow-hidden rounded-2xl shadow-md border border-zinc-100">
                  <img 
                    src="/src/assets/images/operation_service_thumbnail_1782844106516.jpg" 
                    alt="미디어 운영 전문 서비스"
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

            </div>

            {/* 2. PROCESS FLOW TIMELINE (Image 2 Layout) */}
            <div className="bg-[#ecf5fc] border border-blue-50 rounded-[32px] p-8 sm:p-12 space-y-12 shadow-sm">
              
              {/* Timeline Header Info */}
              <div className="text-center space-y-2">
                <h4 className="text-xl sm:text-2xl font-black text-zinc-900 font-sans">미디어 운영 프로세스</h4>
              </div>

              {/* 4 Graphic Columns representing Step 1 to 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                
                {/* Column 1: 고객사 편성요청 */}
                <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm flex flex-col items-center justify-between min-h-[300px] relative">
                  
                  {/* Illustration placeholder SVG representing 고객사 편성요청 */}
                  <div className="w-full flex-1 flex items-center justify-center mb-6">
                    <svg className="w-24 h-24 text-blue-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="15" y="20" width="70" height="50" rx="6" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="2"/>
                      <circle cx="35" cy="45" r="12" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2"/>
                      <rect x="52" y="38" width="22" height="4" rx="2" fill="#38bdf8"/>
                      <rect x="52" y="46" width="16" height="4" rx="2" fill="#93c5fd"/>
                      <rect x="52" y="54" width="20" height="4" rx="2" fill="#cbd5e1"/>
                      <circle cx="35" cy="45" r="4" fill="#0284c7"/>
                      <path d="M50 78 L65 78 A5 5 0 0 0 70 73 L70 65" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3"/>
                      <circle cx="50" cy="78" r="3" fill="#38bdf8"/>
                    </svg>
                  </div>

                  <div className="w-full text-center space-y-2">
                    <h5 className="text-[#025a9c] font-black text-base">고객사 편성요청</h5>
                    <p className="text-zinc-500 text-xs leading-relaxed font-medium">
                      고객사가 특정한 지역, 브랜드, 매장 등에 미디어 편성을 요청합니다.
                    </p>
                  </div>

                  {/* Horizontal Arrow for Desktop */}
                  <div className="hidden lg:flex absolute top-1/2 -right-6 -translate-y-1/2 z-10 items-center justify-center">
                    <svg className="w-4 h-4 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Column 2: 컨텐츠 확인작업 */}
                <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm flex flex-col items-center justify-between min-h-[300px] relative">
                  
                  {/* Illustration placeholder SVG representing 컨텐츠 확인작업 */}
                  <div className="w-full flex-1 flex items-center justify-center mb-6">
                    <svg className="w-24 h-24 text-blue-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="20" y="15" width="60" height="60" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2"/>
                      <rect x="28" y="23" width="44" height="28" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2"/>
                      <path d="M42 37 L48 43 L60 31" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="28" y="58" width="16" height="4" rx="2" fill="#94a3b8"/>
                      <rect x="48" y="58" width="24" height="4" rx="2" fill="#cbd5e1"/>
                      <rect x="28" y="66" width="36" height="4" rx="2" fill="#e2e8f0"/>
                    </svg>
                  </div>

                  <div className="w-full text-center space-y-2">
                    <h5 className="text-[#025a9c] font-black text-base">컨텐츠 확인작업</h5>
                    <p className="text-zinc-500 text-xs leading-relaxed font-medium">
                      특정 미디어에 편성할 컨텐츠의 포맷, 해상도, 용량, 개수 등을 확인 후 미디어 편성 가능여부를 판단합니다.
                    </p>
                  </div>

                  {/* Horizontal Arrow for Desktop */}
                  <div className="hidden lg:flex absolute top-1/2 -right-6 -translate-y-1/2 z-10 items-center justify-center">
                    <svg className="w-4 h-4 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Column 3: 스케줄 업로드 */}
                <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm flex flex-col items-center justify-between min-h-[300px] relative">
                  
                  {/* Illustration placeholder SVG representing 스케줄 업로드 */}
                  <div className="w-full flex-1 flex items-center justify-center mb-6">
                    <svg className="w-24 h-24 text-blue-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="20" y="20" width="60" height="60" rx="8" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="2"/>
                      <circle cx="50" cy="45" r="16" fill="#e8f5e9" stroke="#4caf50" strokeWidth="2" strokeDasharray="3 3"/>
                      <path d="M50 35 L50 51 M44 45 L50 51 L56 45" stroke="#4caf50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="30" y="68" width="40" height="4" rx="2" fill="#a5f3fc"/>
                      <circle cx="50" cy="70" r="3" fill="#06b6d4"/>
                    </svg>
                  </div>

                  <div className="w-full text-center space-y-2">
                    <h5 className="text-[#025a9c] font-black text-base">스케줄 업로드</h5>
                    <p className="text-zinc-500 text-xs leading-relaxed font-medium">
                      미디어 편성을 요청한 시간과 특성에 맞춰 스케줄을 업로드합니다.
                    </p>
                  </div>

                  {/* Horizontal Arrow for Desktop */}
                  <div className="hidden lg:flex absolute top-1/2 -right-6 -translate-y-1/2 z-10 items-center justify-center">
                    <svg className="w-4 h-4 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Column 4: 피드백 및 확인작업 */}
                <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm flex flex-col items-center justify-between min-h-[300px] relative">
                  
                  {/* Illustration placeholder SVG representing 피드백 및 확인작업 */}
                  <div className="w-full flex-1 flex items-center justify-center mb-6">
                    <svg className="w-24 h-24 text-blue-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="35" fill="#fef2f2" stroke="#fecaca" strokeWidth="2"/>
                      <path d="M38 52 L46 60 L64 40" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M32 30 A8 8 0 0 1 42 22 L45 25" stroke="#fca5a5" strokeWidth="2" strokeDasharray="3 3"/>
                      <path d="M68 70 A8 8 0 0 1 58 78 L55 75" stroke="#fca5a5" strokeWidth="2" strokeDasharray="3 3"/>
                    </svg>
                  </div>

                  <div className="w-full text-center space-y-2">
                    <h5 className="text-[#025a9c] font-black text-base">피드백 및 확인작업</h5>
                    <p className="text-zinc-500 text-xs leading-relaxed font-medium">
                      고객사의 요청에 맞춰 일정이 적용 되면 적용된 일정에 대한 피드백을 받습니다.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* 3. CONTENTS PRODUCTION (Image 3 Layout) */}
            <div className="space-y-12">
              
              {/* Header block matching Image 3 */}
              <div className="space-y-2">
                <span className="text-[#025a9c] font-black uppercase tracking-wider text-xs">
                  Contents Service
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
                  컨텐츠 제작
                </h3>
                <p className="text-zinc-500 text-sm sm:text-base max-w-3xl leading-relaxed">
                  고객사의 요청에 따라 각 디지털 사이니지를 가장 효과적으로 보여줄 수 있는 컨텐츠를 직접 기획, 제작 합니다.
                </p>
              </div>

              {/* Connected Flow Diagram from Image 3 */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                
                {/* Left & Middle visual flow diagram (8 cols) */}
                <div className="lg:col-span-8 bg-white border border-zinc-150 rounded-3xl p-6 sm:p-10 flex flex-col justify-between space-y-12 shadow-sm">
                  
                  {/* Top: 3 steps diagram */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 relative w-full pb-6 border-b border-zinc-100">
                    
                    {/* Step 1: 컨텐츠 제작 요청 */}
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full border-2 border-zinc-200 bg-white flex flex-col items-center justify-center p-4 text-center shadow-sm">
                        <span className="text-sm font-extrabold text-zinc-800 leading-tight">컨텐츠<br />제작 요청</span>
                      </div>
                    </div>

                    {/* Gradient Arrow Connector 1 */}
                    <div className="hidden md:block flex-1 h-1 bg-gradient-to-r from-zinc-200 to-sky-300 mx-2" />

                    {/* Step 2: 기획안 제작 & 컨텐츠 제작 Double Circle Container */}
                    <div className="border border-blue-200 rounded-[48px] px-8 py-5 bg-sky-50/30 flex items-center gap-6 shadow-sm relative">
                      <div className="w-24 h-24 rounded-full border border-zinc-300 bg-white flex flex-col items-center justify-center p-2 text-center">
                        <span className="text-xs font-bold text-zinc-700 leading-tight">기획안<br />제작</span>
                      </div>
                      <div className="h-12 w-px bg-zinc-200" />
                      <div className="w-24 h-24 rounded-full border border-zinc-300 bg-white flex flex-col items-center justify-center p-2 text-center">
                        <span className="text-xs font-bold text-zinc-700 leading-tight">컨텐츠<br />제작</span>
                      </div>
                    </div>

                    {/* Solid Navy Arrow Connector 2 */}
                    <div className="hidden md:block flex-1 h-1.5 bg-[#025a9c] mx-2 relative">
                      <div className="absolute right-0 -top-1 w-3.5 h-3.5 border-t-4 border-r-4 border-[#025a9c] transform rotate-45" />
                    </div>

                    {/* Step 3: 최종 결과물 (Solid Navy Circle) */}
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full bg-[#0d346b] flex flex-col items-center justify-center p-4 text-center shadow-md">
                        <span className="text-base font-black text-white leading-tight">최종<br />결과물</span>
                      </div>
                    </div>

                  </div>

                  {/* Bottom details split */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                    
                    {/* Left vertical flow below "컨텐츠 제작 요청" */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-2 text-[#025a9c] font-black text-xs uppercase tracking-wider">
                        <span>• Work Flow Stages</span>
                      </div>
                      
                      <div className="flex flex-col items-center space-y-2 max-w-[240px]">
                        {[
                          "요구사항 확인",
                          "제안 기획안 작성",
                          "컨텐츠 제작/시안 컨펌",
                          "컨텐츠 제작 완료"
                        ].map((txt, idx) => (
                          <React.Fragment key={idx}>
                            <div className="w-full py-2.5 px-4 bg-white border border-zinc-200 rounded-lg shadow-sm text-center">
                              <span className="text-xs font-bold text-zinc-700">{txt}</span>
                            </div>
                            {idx < 3 && (
                              <svg className="w-3 h-3 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Right side SKILLS and EFFECTS */}
                    <div className="space-y-6">
                      
                      {/* SKILLS section */}
                      <div className="space-y-3">
                        <div className="text-zinc-400 font-extrabold text-xs tracking-wider uppercase">SKILLS</div>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { letter: 'Ps', bg: 'bg-[#001e36]', text: 'text-[#00c8ff]', border: 'border-[#00c8ff]/30', label: 'Photoshop' },
                            { letter: 'Ai', bg: 'bg-[#331c00]', text: 'text-[#ff9a00]', border: 'border-[#ff9a00]/30', label: 'Illustrator' },
                            { letter: 'Ae', bg: 'bg-[#20003c]', text: 'text-[#d19aff]', border: 'border-[#d19aff]/30', label: 'After Effects' },
                            { letter: 'Pr', bg: 'bg-[#15002e]', text: 'text-[#ea77ff]', border: 'border-[#ea77ff]/30', label: 'Premiere Pro' },
                            { letter: 'Mo', bg: 'bg-[#002422]', text: 'text-[#00ffd5]', border: 'border-[#00ffd5]/30', label: 'Animate' },
                            { letter: 'C4D', bg: 'bg-[#091833]', text: 'text-[#4facfe]', border: 'border-[#4facfe]/30', label: 'Cinema4D' }
                          ].map((tool, idx) => (
                            <div 
                              key={idx} 
                              className={`w-10 h-10 border rounded-lg flex flex-col items-center justify-center p-1 ${tool.bg} ${tool.text} ${tool.border} shadow-sm cursor-default hover:scale-105 transition-all`}
                              title={tool.label}
                            >
                              <span className="text-sm font-black font-sans leading-none">{tool.letter}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* EFFECTS section */}
                      <div className="space-y-3 pt-2">
                        <div className="text-zinc-400 font-extrabold text-xs tracking-wider uppercase">EFFECTS</div>
                        <ul className="space-y-2 text-xs sm:text-sm text-zinc-500 font-medium">
                          <li>Fade in, Fade out / Gradation Shadow</li>
                          <li>Glitch / Glow / Text Animation</li>
                          <li>Slider Control / Key Frame / Time Echo</li>
                          <li>Mograph / Tracking</li>
                        </ul>
                      </div>

                    </div>

                  </div>

                </div>

                {/* Right text description cards (4 cols) */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
                  
                  {/* General Content Card */}
                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 space-y-4 hover:shadow-md transition-all flex-1 flex flex-col justify-center">
                    <h4 className="text-lg font-black text-zinc-900 font-sans border-b border-zinc-150 pb-2">일반 컨텐츠</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed font-sans font-medium">
                      다양한 디지털 사이니지의 목적에 맞게 실사 촬영, 2D 그래픽 등 가장 효과적인 방법으로 컨텐츠를 제작
                    </p>
                  </div>

                  {/* 3D Content Card */}
                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 space-y-4 hover:shadow-md transition-all flex-1 flex flex-col justify-center">
                    <h4 className="text-lg font-black text-zinc-900 font-sans border-b border-zinc-150 pb-2">3D 컨텐츠</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed font-sans font-medium">
                      설치되어 있는 사이니지의 주변 구조와 환경을 활용하여 공간감과 입체감, 현실감이 느껴지는 컨텐츠를 제작
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* 4. MANAGEMENT PRODUCT PACKAGES (Image 4 Layout) */}
            <div className="space-y-12">
              
              {/* Header */}
              <div className="space-y-2">
                <span className="text-[#025a9c] font-black uppercase tracking-wider text-xs">
                  Management package
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
                  운영 상품 패키지
                </h3>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left Column: Specifications Tabular Package Table */}
                <div className="lg:col-span-8 bg-white border border-zinc-200 rounded-3xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-center border-collapse min-w-[550px]">
                      <thead>
                        <tr className="bg-zinc-100 border-b border-zinc-200 text-xs text-zinc-500 font-black font-sans">
                          <th className="py-4 px-4 text-left">상품</th>
                          <th className="py-4 px-4">업로드</th>
                          <th className="py-4 px-4">원격지원</th>
                          <th className="py-4 px-4">유선지원</th>
                          <th className="py-4 px-4">A/S</th>
                          <th className="py-4 px-4">리포팅</th>
                          <th className="py-4 px-4">컨텐츠</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm font-sans font-bold text-zinc-700">
                        
                        <tr className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                          <td className="py-5 px-4 text-left font-black text-zinc-900">FULL 패키지</td>
                          <td className="py-5 px-4 text-zinc-500 font-medium">2회/월</td>
                          <td className="py-5 px-4 text-emerald-500 text-lg">○</td>
                          <td className="py-5 px-4 text-emerald-500 text-lg">○</td>
                          <td className="py-5 px-4 text-emerald-500 text-lg">○</td>
                          <td className="py-5 px-4 text-emerald-500 text-lg">○</td>
                          <td className="py-5 px-4 text-[#025a9c] font-black">1종/월</td>
                        </tr>

                        <tr className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                          <td className="py-5 px-4 text-left font-black text-zinc-900">A 패키지</td>
                          <td className="py-5 px-4 text-zinc-500 font-medium">2회/월</td>
                          <td className="py-5 px-4 text-emerald-500 text-lg">○</td>
                          <td className="py-5 px-4 text-emerald-500 text-lg">○</td>
                          <td className="py-5 px-4 text-emerald-500 text-lg">○</td>
                          <td className="py-5 px-4 text-emerald-500 text-lg">○</td>
                          <td className="py-5 px-4 text-red-400 text-lg">✕</td>
                        </tr>

                        <tr className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                          <td className="py-5 px-4 text-left font-black text-zinc-900">B 패키지</td>
                          <td className="py-5 px-4 text-zinc-500 font-medium">2회/월</td>
                          <td className="py-5 px-4 text-red-400 text-lg">✕</td>
                          <td className="py-5 px-4 text-red-400 text-lg">✕</td>
                          <td className="py-5 px-4 text-emerald-500 text-lg">○</td>
                          <td className="py-5 px-4 text-emerald-500 text-lg">○</td>
                          <td className="py-5 px-4 text-red-400 text-lg">✕</td>
                        </tr>

                        <tr className="hover:bg-zinc-50 transition-colors">
                          <td className="py-5 px-4 text-left font-black text-zinc-900">C 패키지</td>
                          <td className="py-5 px-4 text-zinc-500 font-medium">2회/월</td>
                          <td className="py-5 px-4 text-red-400 text-lg">✕</td>
                          <td className="py-5 px-4 text-red-400 text-lg">✕</td>
                          <td className="py-5 px-4 text-red-400 text-lg">✕</td>
                          <td className="py-5 px-4 text-red-400 text-lg">✕</td>
                          <td className="py-5 px-4 text-red-400 text-lg">✕</td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Column: Descriptions notes from Image 4 */}
                <div className="lg:col-span-4 flex flex-col justify-center h-full min-h-[220px]">
                  
                  <div className="space-y-6 text-sm text-zinc-500 font-sans font-semibold leading-relaxed">
                    <p className="flex items-start gap-1">
                      <span className="flex-shrink-0">-</span>
                      <span>A/S 및 원격, 유선지원을 통해 장애원인 확인 및 원격 트러블 슈팅을 진행합니다.</span>
                    </p>
                    <p className="flex items-start gap-1">
                      <span className="flex-shrink-0">-</span>
                      <span>고객사에서 제공한 이미지를 기준으로 소통하여 컨텐츠를 제작합니다.</span>
                    </p>
                    <p className="flex items-start gap-1">
                      <span className="flex-shrink-0">-</span>
                      <span>운영한 컨텐츠와 일정을 기반으로 월별 리포팅을 제공합니다.</span>
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}
