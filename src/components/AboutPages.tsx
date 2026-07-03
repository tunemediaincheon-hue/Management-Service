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
  User,
  Home,
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

import skyscraperImg from '../assets/images/greetings_skyscrapers_1782840703259.jpg';
import teamImg from '../assets/images/greetings_team_1782840720839.jpg';
import officeImg from '../assets/images/history_smart_office_1782840758172.jpg';
import aiHandheldImg from '../assets/images/history_ai_handheld_1782840779598.jpg';
import cmsImg from '../assets/images/cms_service_thumbnail_1782844054984.jpg';
import aiVisionImg from '../assets/images/ai_vision_thumbnail_1782844076504.jpg';
import smartIotThumbnail from '../assets/images/smart_iot_thumbnail_1782844091537.jpg';
import operationServiceThumbnail from '../assets/images/operation_service_thumbnail_1782844106516.jpg';

interface AboutPagesProps {
  subPage: 'greetings' | 'org' | 'history' | 'map' | 'digital-signage' | 'smart-ai' | 'smart-iot' | 'smart-service' | 'evguard';
  settings: SiteSettings;
  onBackToHome: () => void;
}

export default function AboutPages({ subPage, settings, onBackToHome }: AboutPagesProps) {

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
                  {settings.logoText || '온리움디엠씨'}를 찾아주셔서<br />감사합니다.
                </h3>
                
                <div className="text-sm sm:text-base text-zinc-650 leading-relaxed space-y-5 font-sans">
                  <p>
                    {settings.companyName || '주식회사 온리움디엠씨'}는 공간 DT 전문 브랜드 <strong>튠미디어(tunemedai)</strong>를 중심으로 오프라인 공간의 디지털 트랜스포메이션(DT)에 선구적인 기술과 노하우를 제공해오고 있습니다.
                  </p>
                  <p>
                    디지털 사이니지, 지능형 AI 비전 분석, 고효율 스마트 IoT 센싱망 기술을 융합하여 다양한 실내외 오프라인 공간의 매력을 극대화할 뿐만 아니라, 수많은 스마트 디바이스들을 안정적으로 통합 관제하고 유지보수할 수 있는 종합 솔루션을 제공합니다.
                  </p>
                  <p className="font-semibold text-zinc-800">
                    고객의 사업을 내 일처럼 진정 어린 책임감과 전문적인 자부심으로 임하기 위해 온리움디엠씨 튠미디어 구성원들은 늘 준비되어 있습니다.
                  </p>
                </div>

                <div className="mt-8 text-right">
                  <p className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
                    {settings.logoText || '온리움디엠씨'} 직원 일동
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
                    왜 디지털 사이니지 공간 기획은 온리움디엠씨와 해야 할까요?
                  </p>
                  <h4 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
                    스마트한 공간관리의 새로운 기준, 온리움디엠씨 튠미디어
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
                    {settings.logoText || '온리움디엠씨'}의 사업
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
                src="https://maps.google.com/maps?q=인천광역시 미추홀구 석정로 229&t=&z=16&ie=UTF8&iwloc=&output=embed"
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
                        {settings.address || '인천광역시 미추홀구 석정로 229, 5층 (도화동, 해정타운및jst)'}
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
                        국철 1호선 제물포역 2번 출구 도보 8분, 또는 도화역 2번 출구 도보 10분
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
                        제물포스마트타운(JST) 정류장 하차 (간선 10, 13, 14, 62, 82 / 지선 510, 511 등)
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

            {/* CMS Core Advantages - Polished Timeline Board replicating Photo 2 */}
            <div className="bg-[#eaf5ff]/80 rounded-[32px] p-6 sm:p-10 lg:p-12 border border-[#bcdbf8] max-w-6xl mx-auto relative overflow-hidden shadow-inner">
              
              {/* Horizontal connecting line across columns on desktop/tablet */}
              <div className="absolute top-[174px] left-[15%] right-[15%] h-[2px] bg-[#9fd0f9] hidden lg:block z-0" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
                
                {/* Advantage 1: 검증된 운영 노하우 */}
                <div className="flex flex-col items-center text-center group">
                  {/* Custom Vector Illustration 1 */}
                  <div className="h-32 w-full flex items-end justify-center mb-4 select-none">
                    <svg viewBox="0 0 200 120" className="w-44 h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Grid background representing networking */}
                      <path d="M 20,95 L 180,95 M 50,45 L 50,110 M 150,45 L 150,110" stroke="#bfdbfe/40" strokeWidth="1" strokeDasharray="2 2" />
                      {/* Central console platform */}
                      <rect x="25" y="45" width="150" height="60" rx="10" fill="#e1f2ff" stroke="#9fd0f9" strokeWidth="1.5" />
                      <rect x="40" y="55" width="55" height="35" rx="6" fill="white" stroke="#c0e2fc" strokeWidth="1" />
                      {/* Screen details */}
                      <line x1="48" y1="65" x2="87" y2="65" stroke="#9fd0f9" strokeWidth="2" strokeLinecap="round" />
                      <line x1="48" y1="73" x2="75" y2="73" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="48" y1="81" x2="68" y2="81" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
                      
                      {/* Server Tower */}
                      <rect x="110" y="55" width="50" height="35" rx="6" fill="#1e293b" />
                      {/* Server drive bays */}
                      <rect x="115" y="60" width="40" height="6" rx="1.5" fill="#0f172a" />
                      <circle cx="121" cy="63" r="1.5" fill="#10b981" />
                      <circle cx="127" cy="63" r="1.5" fill="#10b981" />
                      
                      <rect x="115" y="69" width="40" height="6" rx="1.5" fill="#0f172a" />
                      <circle cx="121" cy="72" r="1.5" fill="#10b981" />
                      <circle cx="127" cy="72" r="1.5" fill="#3b82f6" />
                      
                      <rect x="115" y="78" width="40" height="6" rx="1.5" fill="#0f172a" />
                      <circle cx="121" cy="81" r="1.5" fill="#ef4444" className="animate-pulse" />
                      <circle cx="127" cy="81" r="1.5" fill="#10b981" />

                      {/* Small operator avatars */}
                      <circle cx="50" cy="100" r="6" fill="#64748b" />
                      <path d="M 42,118 Q 42,109 50,109 Q 58,109 58,118" fill="#64748b" />
                      
                      <circle cx="100" cy="100" r="6" fill="#0066cc" />
                      <path d="M 92,118 Q 92,109 100,109 Q 108,109 108,118" fill="#0066cc" />

                      <circle cx="150" cy="100" r="6" fill="#38bdf8" />
                      <path d="M 142,118 Q 142,109 150,109 Q 158,109 158,118" fill="#38bdf8" />
                    </svg>
                  </div>

                  {/* Connecting Node on the Line */}
                  <div className="relative flex items-center justify-center my-4 w-full">
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-[#3aa1ff] flex items-center justify-center z-10 shadow-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0066cc] animate-pulse" />
                    </div>
                  </div>

                  <h4 className="text-base sm:text-[17px] font-extrabold text-[#0066cc] mb-3 tracking-tight font-sans">
                    검증된 운영 노하우
                  </h4>
                  <p className="text-xs sm:text-[13px] text-zinc-650 leading-relaxed font-sans max-w-[240px]">
                    수년간 축적된 운영 경험과 네트워크 기반으로 구축된 인프라를 바탕으로 안정적이고 검증된 서비스를 고객에게 제공하고 있습니다.
                  </p>
                </div>

                {/* Advantage 2: GS 1등급 인증 */}
                <div className="flex flex-col items-center text-center group">
                  {/* Custom Vector Illustration 2 */}
                  <div className="h-32 w-full flex items-end justify-center mb-4 select-none">
                    <svg viewBox="0 0 200 120" className="w-44 h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Document clipboard in background */}
                      <rect x="35" y="20" width="60" height="85" rx="5" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
                      <rect x="50" y="14" width="30" height="10" rx="3" fill="#94a3b8" />
                      <line x1="45" y1="38" x2="85" y2="38" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="45" y1="48" x2="75" y2="48" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
                      <line x1="45" y1="58" x2="85" y2="58" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
                      <line x1="45" y1="68" x2="65" y2="68" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
                      <line x1="45" y1="78" x2="80" y2="78" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Ribbon banner tails */}
                      <path d="M 118,75 L 110,112 L 122,106 L 126,112 Z" fill="#0284c7" />
                      <path d="M 132,75 L 130,114 L 138,107 L 146,114 Z" fill="#0369a1" />

                      {/* Rosette emblem */}
                      <g transform="translate(130, 58)">
                        <circle cx="0" cy="0" r="26" fill="#38bdf8" className="animate-pulse" />
                        <circle cx="0" cy="0" r="21" fill="#0066cc" />
                        <circle cx="0" cy="0" r="18" fill="white" />
                        <circle cx="0" cy="0" r="15" fill="#f0f9ff" />
                        <text x="0" y="-1" textAnchor="middle" fill="#0066cc" fontSize="8" fontWeight="900" fontFamily="sans-serif">1등급</text>
                        <text x="0" y="7" textAnchor="middle" fill="#22c55e" fontSize="6.5" fontWeight="900" fontFamily="sans-serif">GOOD</text>
                      </g>

                      {/* Small stars */}
                      <path d="M 172,30 L 174,33 L 178,34 L 175,37 L 176,41 L 172,39 L 168,41 L 169,37 L 166,34 L 170,33 Z" fill="#f59e0b" className="animate-pulse" />
                      <path d="M 110,25 L 111,28 L 114,29 L 112,31 L 113,34 L 110,32 L 107,34 L 108,31 L 106,29 L 109,28 Z" fill="#f59e0b" />
                    </svg>
                  </div>

                  {/* Connecting Node on the Line */}
                  <div className="relative flex items-center justify-center my-4 w-full">
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-[#3aa1ff] flex items-center justify-center z-10 shadow-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0066cc] animate-pulse" />
                    </div>
                  </div>

                  <h4 className="text-base sm:text-[17px] font-extrabold text-[#0066cc] mb-3 tracking-tight font-sans">
                    GS 소프트웨어품질인증
                  </h4>
                  <p className="text-xs sm:text-[13px] text-zinc-650 leading-relaxed font-sans max-w-[240px]">
                    소프트웨어산업진흥법 제13조에 의거한 소프트웨어의 품질을 인정 받았으며, 국내/외 약 8,000 여개의 미디어를 운영/관리하는 안정된 솔루션 입니다.
                  </p>
                </div>

                {/* Advantage 3: 실시간 상태 모니터링 및 원격제어 */}
                <div className="flex flex-col items-center text-center group">
                  {/* Custom Vector Illustration 3 */}
                  <div className="h-32 w-full flex items-end justify-center mb-4 select-none">
                    <svg viewBox="0 0 200 120" className="w-44 h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Host server unit */}
                      <rect x="35" y="40" width="55" height="65" rx="6" fill="#334155" stroke="#475569" strokeWidth="1" />
                      <rect x="41" y="48" width="43" height="10" rx="2" fill="#0f172a" />
                      <circle cx="47" cy="53" r="1.5" fill="#10b981" />
                      <line x1="53" y1="53" x2="78" y2="53" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />

                      <rect x="41" y="62" width="43" height="10" rx="2" fill="#0f172a" />
                      <circle cx="47" cy="67" r="1.5" fill="#3b82f6" />
                      <line x1="53" y1="67" x2="80" y2="67" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />

                      <rect x="41" y="76" width="43" height="10" rx="2" fill="#0f172a" />
                      <circle cx="47" cy="81" r="1.5" fill="#10b981" />
                      <line x1="53" y1="81" x2="74" y2="81" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />

                      {/* Antenna / Wireless Signal wave */}
                      <path d="M 105,45 A 25,25 0 0,1 135,75" stroke="#0066cc" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 3" className="animate-pulse" />
                      <path d="M 105,35 A 35,35 0 0,1 145,75" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />

                      {/* Display dashboard interface */}
                      <rect x="120" y="45" width="45" height="58" rx="5" fill="white" stroke="#0066cc" strokeWidth="2" />
                      <rect x="124" y="49" width="37" height="40" rx="3" fill="#f8fafc" />
                      <path d="M 128,78 L 136,68 L 144,73 L 152,58 L 157,66" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="142" cy="95" r="2.5" fill="#94a3b8" />

                      {/* Remote controller sitting figure */}
                      <circle cx="68" cy="24" r="5" fill="#475569" />
                      <path d="M 60,39 Q 60,31 68,31 Q 76,31 76,39 Z" fill="#475569" />
                      <rect x="73" y="27" width="11" height="8" rx="1.5" fill="#38bdf8" className="animate-pulse" />
                    </svg>
                  </div>

                  {/* Connecting Node on the Line */}
                  <div className="relative flex items-center justify-center my-4 w-full">
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-[#3aa1ff] flex items-center justify-center z-10 shadow-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0066cc] animate-pulse" />
                    </div>
                  </div>

                  <h4 className="text-base sm:text-[17px] font-extrabold text-[#0066cc] mb-3 tracking-tight font-sans">
                    실시간 상태 모니터링 및 원격제어
                  </h4>
                  <p className="text-xs sm:text-[13px] text-zinc-650 leading-relaxed font-sans max-w-[240px]">
                    다운로드 상태, CPU 상태 실시간으로 모니터링이 가능하며, STB on/off, sleep/wake up 등 Player 기반 원격 제어가 가능합니다. <span className="text-[10px] text-zinc-400 block mt-1">* Win버전/Android 버전 기능 상이</span>
                  </p>
                </div>

                {/* Advantage 4: 스마트 스케줄링 */}
                <div className="flex flex-col items-center text-center group">
                  {/* Custom Vector Illustration 4 */}
                  <div className="h-32 w-full flex items-end justify-center mb-4 select-none">
                    <svg viewBox="0 0 200 120" className="w-44 h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Large grid schedule schedule sheet */}
                      <rect x="35" y="30" width="100" height="75" rx="6" fill="white" stroke="#cbd5e1" strokeWidth="1.5" />
                      <rect x="35" y="30" width="100" height="18" rx="6" fill="#0066cc" />
                      <circle cx="45" cy="39" r="2.5" fill="white" />
                      <circle cx="53" cy="39" r="2.5" fill="white" />
                      <text x="85" y="42" textAnchor="middle" fill="white" fontSize="9" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">SCHEDULE</text>
                      
                      {/* Calendar grid items */}
                      <rect x="42" y="55" width="22" height="12" rx="3" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="0.5" />
                      <rect x="68" y="55" width="30" height="12" rx="3" fill="#bbf7d0" stroke="#4ade80" strokeWidth="0.5" />
                      <rect x="102" y="55" width="26" height="12" rx="3" fill="#fed7aa" stroke="#fb923c" strokeWidth="0.5" />

                      <rect x="42" y="73" width="34" height="12" rx="3" fill="#fef08a" stroke="#facc15" strokeWidth="0.5" />
                      <rect x="80" y="73" width="48" height="12" rx="3" fill="#ddd6fe" stroke="#a78bfa" strokeWidth="0.5" />
                      
                      {/* Clock & file sync item */}
                      <rect x="145" y="45" width="32" height="42" rx="4" fill="#f0fdf4" stroke="#4ade80" strokeWidth="1.5" />
                      <circle cx="161" cy="60" r="8" fill="white" stroke="#10b981" strokeWidth="1.5" />
                      <path d="M 161,56 L 161,60 L 164,60" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M 161,78 L 161,84 M 158,81 L 161,78 L 164,81" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce" />
                    </svg>
                  </div>

                  {/* Connecting Node on the Line */}
                  <div className="relative flex items-center justify-center my-4 w-full">
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-[#3aa1ff] flex items-center justify-center z-10 shadow-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0066cc] animate-pulse" />
                    </div>
                  </div>

                  <h4 className="text-base sm:text-[17px] font-extrabold text-[#0066cc] mb-3 tracking-tight font-sans">
                    스마트 스케줄링
                  </h4>
                  <p className="text-xs sm:text-[13px] text-zinc-650 leading-relaxed font-sans max-w-[240px]">
                    일별, 요일, 시간대별 예약 일정 기능을 제공하고, 우선 순위 영상 재생, 긴급 영상 송출 등 다양한 일정 제어 및 스케줄 관리가 가능합니다.
                  </p>
                </div>

              </div>
            </div>

            {/* CMS Service Technologies - Interactive Non-Stop Solutions replicating Photo 1 */}
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
                
                {/* Left Side: Stunning Isometric Control Room Visual + Active Detail Board */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                  
                  {/* Breathtaking Isometric Scene Container */}
                  <div className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden aspect-16/11 group min-h-[340px]">
                    
                    {/* Dark Grid Background */}
                    <div className="absolute inset-0 opacity-15 pointer-events-none">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
                    </div>

                    {/* SVG Canvas for Isometric Illustration */}
                    <svg viewBox="0 0 500 340" className="w-full h-full relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      
                      {/* Floor Grid (Isometric Perspective) */}
                      <polygon points="50,230 250,110 450,230 250,340" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                      <polygon points="70,230 250,122 430,230 250,328" fill="#0f172a" opacity="0.6" />

                      {/* Zone 1: Digital Signage Kiosks / Display Wall (Highlighted if starts with "1-") */}
                      <g className="transition-all duration-500" style={{ filter: activeTechPill.startsWith('1-') ? 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.6))' : 'none' }}>
                        {/* Kiosk Device 1 (Left) */}
                        <polygon points="120,180 140,170 140,220 120,230" fill={activeTechPill.startsWith('1-') ? '#0066cc' : '#334155'} stroke="#475569" strokeWidth="1" />
                        <polygon points="140,170 148,166 148,216 140,220" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                        <polygon points="120,180 140,170 148,166 128,176" fill="#475569" />
                        {/* Glowing Screen Area */}
                        <polygon points="124,183 138,176 138,210 124,217" fill={activeTechPill.startsWith('1-') ? '#38bdf8' : '#1e293b'} />
                        <line x1="128" y1="190" x2="134" y2="187" stroke="white" strokeWidth="1" opacity="0.8" />
                        <line x1="128" y1="196" x2="134" y2="193" stroke="white" strokeWidth="1" opacity="0.8" />
                        {/* Indicator Tag 1-1 */}
                        {activeTechPill === '1-1' && <circle cx="134" cy="195" r="4" fill="#f59e0b" className="animate-ping" />}

                        {/* Wall Mounted Wide Display (Back Center) */}
                        <polygon points="210,130 290,130 290,170 210,170" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                        <polygon points="214,134 286,134 286,166 214,166" fill={activeTechPill.startsWith('1-') ? '#0284c7' : '#0f172a'} />
                        {/* Abstract Media Content inside Display */}
                        {activeTechPill.startsWith('1-') && (
                          <>
                            <circle cx="250" cy="150" r="10" fill="#38bdf8" opacity="0.7" />
                            <path d="M 235,160 L 250,145 L 265,160 Z" fill="#22c55e" opacity="0.8" />
                          </>
                        )}
                        {/* Indicator Tag 1-2 */}
                        {activeTechPill === '1-2' && <circle cx="250" cy="150" r="4" fill="#f59e0b" className="animate-ping" />}
                      </g>

                      {/* Zone 2: CCTV Dome & Demographic Customer Profile (Highlighted if "2-") */}
                      <g className="transition-all duration-500">
                        {/* Ceiling Camera */}
                        <circle cx="340" cy="50" r="10" fill="#475569" stroke="#64748b" strokeWidth="1.5" />
                        <circle cx="340" cy="54" r="5" fill="#1e293b" />
                        <circle cx="340" cy="54" r="1.5" fill="#ef4444" className="animate-pulse" />

                        {/* Scanner Light Cone (Only when 2- is active) */}
                        <polygon 
                          points="340,54 300,240 380,240" 
                          fill="url(#scannerGlow)" 
                          opacity={activeTechPill.startsWith('2-') ? '0.25' : '0.04'} 
                          className="transition-all duration-500"
                        />

                        {/* Standing Person Silhouette */}
                        <circle cx="340" cy="170" r="10" fill={activeTechPill.startsWith('2-') ? '#38bdf8' : '#64748b'} className="transition-all duration-500" />
                        <path d="M 325,240 Q 325,190 340,190 Q 355,190 355,240 Z" fill={activeTechPill.startsWith('2-') ? '#38bdf8' : '#64748b'} className="transition-all duration-500" />
                        {/* Demographic Target Box */}
                        {activeTechPill.startsWith('2-') && (
                          <rect x="315" y="152" width="50" height="92" rx="4" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" className="animate-pulse" />
                        )}

                        {/* Connected Badges pointing from Demographic Person (Exactly as shown in Photo 1!) */}
                        {activeTechPill.startsWith('2-') && (
                          <g className="animate-fadeIn">
                            {/* Connector Lines */}
                            <path d="M 315,160 L 230,135" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
                            <path d="M 315,195 L 210,195" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
                            <path d="M 315,225 L 230,250" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />

                            {/* Badge 1: 성별 */}
                            <g transform="translate(100, 115)">
                              <rect x="0" y="0" width="125" height="30" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                              <circle cx="15" cy="15" r="7" fill="#38bdf8" />
                              <text x="15" y="18" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">1</text>
                              <text x="30" y="19" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">성별: 30대 남자</text>
                            </g>

                            {/* Badge 2: 방문횟수 */}
                            <g transform="translate(80, 180)">
                              <rect x="0" y="0" width="125" height="30" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                              <circle cx="15" cy="15" r="7" fill="#38bdf8" />
                              <text x="15" y="18" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">2</text>
                              <text x="30" y="19" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">방문횟수: 3회</text>
                            </g>

                            {/* Badge 3: 체류시간 */}
                            <g transform="translate(100, 235)">
                              <rect x="0" y="0" width="125" height="30" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                              <circle cx="15" cy="15" r="7" fill="#38bdf8" />
                              <text x="15" y="18" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">3</text>
                              <text x="30" y="19" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">체류시간: 3분 15초</text>
                            </g>
                          </g>
                        )}
                      </g>

                      {/* Zone 3: Server Cabinets & Cloud (Highlighted if starts with "3-") */}
                      <g className="transition-all duration-500" style={{ filter: activeTechPill.startsWith('3-') ? 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.6))' : 'none' }}>
                        {/* Server Cabinet Cabinet (Right back) */}
                        <polygon points="390,140 430,120 430,190 390,210" fill={activeTechPill.startsWith('3-') ? '#065f46' : '#1e293b'} stroke="#334155" strokeWidth="1" />
                        <polygon points="430,120 440,115 440,185 430,190" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                        <polygon points="390,140 430,120 440,115 400,135" fill="#334155" />
                        
                        {/* Server flashing LED matrix */}
                        {activeTechPill.startsWith('3-') ? (
                          <>
                            <circle cx="400" cy="155" r="1.5" fill="#10b981" className="animate-pulse" />
                            <circle cx="405" cy="153" r="1.5" fill="#38bdf8" />
                            <circle cx="410" cy="151" r="1.5" fill="#10b981" />
                            <circle cx="415" cy="149" r="1.5" fill="#ef4444" className="animate-ping" />

                            <circle cx="400" cy="170" r="1.5" fill="#38bdf8" />
                            <circle cx="405" cy="168" r="1.5" fill="#10b981" />
                            <circle cx="410" cy="166" r="1.5" fill="#ef4444" />
                            <circle cx="415" cy="164" r="1.5" fill="#10b981" />
                          </>
                        ) : (
                          <>
                            <circle cx="400" cy="155" r="1.5" fill="#475569" />
                            <circle cx="405" cy="153" r="1.5" fill="#475569" />
                            <circle cx="410" cy="151" r="1.5" fill="#475569" />
                            <circle cx="400" cy="170" r="1.5" fill="#475569" />
                          </>
                        )}

                        {/* Glowing Cloud Base in the middle */}
                        <g transform="translate(250, 200)" className="transition-all duration-500">
                          <circle cx="0" cy="0" r="18" fill={activeTechPill.startsWith('3-') ? '#10b981' : '#1e293b'} opacity="0.8" />
                          <circle cx="-10" cy="5" r="12" fill={activeTechPill.startsWith('3-') ? '#10b981' : '#1e293b'} opacity="0.8" />
                          <circle cx="10" cy="5" r="12" fill={activeTechPill.startsWith('3-') ? '#10b981' : '#1e293b'} opacity="0.8" />
                          <path d="M -12,8 L 12,8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                          <path d="M -6,2 C -6,-5 6,-5 6,2" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                          {/* Pulsing halo */}
                          {activeTechPill.startsWith('3-') && (
                            <circle cx="0" cy="0" r="26" stroke="#10b981" strokeWidth="1.5" fill="none" className="animate-ping" />
                          )}
                        </g>
                      </g>

                      {/* Gradients Definitions */}
                      <defs>
                        <linearGradient id="scannerGlow" x1="340" y1="54" x2="340" y2="240" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Zone Quick Indicator Badge */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-wider text-white select-none uppercase font-mono">
                      <span className={`w-2 h-2 rounded-full ${
                        activeTechPill.startsWith('1-') ? 'bg-sky-400' : activeTechPill.startsWith('2-') ? 'bg-red-500' : 'bg-emerald-500'
                      }`} />
                      <span>
                        {activeTechPill.startsWith('1-') ? 'Contents Zone' : activeTechPill.startsWith('2-') ? 'Security & Demographic NOC' : 'Cloud Maintenance Zone'}
                      </span>
                    </div>
                  </div>

                  {/* High-Contrast Interactive Detail Card below the illustration */}
                  <div className="bg-[#f8fafc] border border-zinc-250 rounded-2xl p-6 flex flex-col justify-between h-auto shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="space-y-4 relative z-10 text-left">
                      <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-extrabold font-mono tracking-wider uppercase">
                        Active Process ID: {activeTechPill}
                      </span>
                      <h4 className="text-lg sm:text-xl font-extrabold text-zinc-900 tracking-tight leading-tight">
                        {techPillDetails[activeTechPill]?.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed font-sans font-medium">
                        {techPillDetails[activeTechPill]?.desc}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-3 relative z-10 border-t border-zinc-200 pt-4 text-[11px] font-bold text-zinc-450 font-sans">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>통합 모니터링 시스템 실시간 수집 연동 중</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Interactive Category Pillars */}
                <div className="lg:col-span-6 space-y-8 flex flex-col justify-between">
                  
                  {/* Category 1 */}
                  <div className="space-y-3.5 text-left">
                    <h5 className="text-xs font-bold text-blue-600 tracking-wide flex items-center gap-1.5 uppercase font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      컨텐츠 스케줄 관리
                    </h5>
                    <div className="flex flex-wrap gap-2.5">
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
                              ? 'bg-[#0066cc] border-[#0066cc] text-white shadow-md shadow-blue-600/10 scale-[1.02]'
                              : 'bg-white border-zinc-250 text-zinc-700 hover:border-blue-300 hover:bg-blue-50/20'
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
                  <div className="space-y-3.5 text-left">
                    <h5 className="text-xs font-bold text-blue-600 tracking-wide flex items-center gap-1.5 uppercase font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      실시간 모니터링
                    </h5>
                    <div className="flex flex-wrap gap-2.5">
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
                              ? 'bg-[#0066cc] border-[#0066cc] text-white shadow-md shadow-blue-600/10 scale-[1.02]'
                              : 'bg-white border-zinc-250 text-zinc-700 hover:border-blue-300 hover:bg-blue-50/20'
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
                  <div className="space-y-3.5 text-left">
                    <h5 className="text-xs font-bold text-blue-600 tracking-wide flex items-center gap-1.5 uppercase font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      유지보수
                    </h5>
                    <div className="flex flex-wrap gap-2.5">
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
                              ? 'bg-[#0066cc] border-[#0066cc] text-white shadow-md shadow-blue-600/10 scale-[1.02]'
                              : 'bg-white border-zinc-250 text-zinc-700 hover:border-blue-300 hover:bg-blue-50/20'
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
              {/* Left Column: Polished Image Showcase matching Photo 1 */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <div className="w-full relative overflow-hidden rounded-[24px] bg-white p-2 border-2 border-zinc-200/60 shadow-xl transition-all duration-300">
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#fafafa] border border-zinc-100 flex items-center justify-between p-4 sm:p-6 select-none shadow-inner">
                    
                    {/* 3 stacked badges on the left */}
                    <div className="flex flex-col justify-between h-full py-4 z-20 w-[140px] sm:w-[170px]">
                      
                      {/* Badge 1: Gender / Age */}
                      <div className="relative flex items-center bg-white border border-zinc-200/80 rounded-lg shadow-sm p-2 sm:p-2.5 pl-3 sm:pl-4 pr-3 sm:pr-4 w-full h-[52px] sm:h-[60px] hover:shadow-md transition-shadow duration-300">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-black rounded-l-lg" />
                        <div className="flex-shrink-0 text-zinc-700 mr-2 sm:mr-3">
                          <User className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-800" />
                        </div>
                        <div className="h-full w-[1px] bg-zinc-200 mr-2" />
                        <div className="flex flex-col items-end w-full justify-center">
                          <span className="text-[8px] sm:text-[9px] text-zinc-400 font-bold tracking-tight font-sans">성별</span>
                          <span className="text-xs sm:text-sm font-extrabold text-zinc-900 font-sans tracking-tight">30대 남자</span>
                        </div>
                      </div>

                      {/* Badge 2: Visit Count */}
                      <div className="relative flex items-center bg-white border border-zinc-200/80 rounded-lg shadow-sm p-2 sm:p-2.5 pl-3 sm:pl-4 pr-3 sm:pr-4 w-full h-[52px] sm:h-[60px] hover:shadow-md transition-shadow duration-300">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-black rounded-l-lg" />
                        <div className="flex-shrink-0 text-zinc-700 mr-2 sm:mr-3">
                          <Home className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-800" />
                        </div>
                        <div className="h-full w-[1px] bg-zinc-200 mr-2" />
                        <div className="flex flex-col items-end w-full justify-center">
                          <span className="text-[8px] sm:text-[9px] text-zinc-400 font-bold tracking-tight font-sans">방문횟수</span>
                          <span className="text-xs sm:text-sm font-extrabold text-zinc-900 font-sans tracking-tight">3회</span>
                        </div>
                      </div>

                      {/* Badge 3: Stay Duration */}
                      <div className="relative flex items-center bg-white border border-zinc-200/80 rounded-lg shadow-sm p-2 sm:p-2.5 pl-3 sm:pl-4 pr-3 sm:pr-4 w-full h-[52px] sm:h-[60px] hover:shadow-md transition-shadow duration-300">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-black rounded-l-lg" />
                        <div className="flex-shrink-0 text-zinc-700 mr-2 sm:mr-3">
                          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-800" />
                        </div>
                        <div className="h-full w-[1px] bg-zinc-200 mr-2" />
                        <div className="flex flex-col items-end w-full justify-center">
                          <span className="text-[8px] sm:text-[9px] text-zinc-400 font-bold tracking-tight font-sans">체류시간</span>
                          <span className="text-xs sm:text-sm font-extrabold text-zinc-900 font-sans tracking-tight">3분 15초</span>
                        </div>
                      </div>

                    </div>

                    {/* Connecting Lines and Anchors Overlay */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-15" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* Line 1: Badge 1 -> Customer upper body */}
                      <path d="M 44,22 L 72,22" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
                      <circle cx="72" cy="22" r="1.5" fill="white" stroke="#64748b" strokeWidth="1" />

                      {/* Line 2: Badge 2 -> Kiosk screen area */}
                      <path d="M 44,50 L 61,50" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
                      <circle cx="61" cy="50" r="1.5" fill="white" stroke="#64748b" strokeWidth="1" />

                      {/* Line 3: Badge 3 -> Kiosk lower screen area */}
                      <path d="M 44,78 L 61,72" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
                      <circle cx="61" cy="72" r="1.5" fill="white" stroke="#64748b" strokeWidth="1" />
                    </svg>

                    {/* Scanning Light Cone */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 animate-pulse" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <polygon points="58,11 86,22 86,95 64,95" fill="url(#scannerConeGradient)" />
                      <defs>
                        <linearGradient id="scannerConeGradient" x1="58%" y1="11%" x2="75%" y2="75%">
                          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Right side interactive scene: Kiosk + Camera + Standing Customer */}
                    <div className="relative flex-1 h-full z-10 flex items-center justify-end pl-2 sm:pl-4">
                      
                      {/* The Kiosk Structure */}
                      <div className="absolute right-[36%] bottom-[10%] w-[56px] sm:w-[68px] h-[72%] sm:h-[78%] flex flex-col items-center justify-end">
                        
                        {/* Kiosk Header Label */}
                        <div className="text-[6px] text-zinc-400 font-bold uppercase tracking-widest mb-1 select-none font-mono">
                          Kiosk Device
                        </div>

                        {/* Kiosk body shell */}
                        <div className="w-full h-full bg-gradient-to-b from-[#bde0fe] to-[#a2d2ff] border border-sky-300 rounded-t-xl shadow-lg p-1.5 flex flex-col justify-between">
                          
                          {/* Inner Screen */}
                          <div className="w-full h-[82%] bg-white rounded-md p-1 border border-sky-100 flex flex-col justify-between relative overflow-hidden">
                            {/* Graphic screen details */}
                            <div className="space-y-1">
                              {/* Screen Logo */}
                              <div className="flex items-center justify-between">
                                <span className="text-[4px] font-black text-sky-600 tracking-tight font-mono">HURREST</span>
                              </div>
                              {/* Product illustration on screen */}
                              <div className="w-full h-10 sm:h-12 bg-sky-50/50 rounded flex items-center justify-center border border-sky-100/30 overflow-hidden relative">
                                <span className="text-[12px] sm:text-[14px] z-10 filter drop-shadow">🧴</span>
                                {/* Background glow */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-sky-100/40 to-transparent" />
                              </div>
                            </div>

                            {/* Promotional / Data text box */}
                            <div className="space-y-0.5 bg-sky-500/10 rounded p-0.5 border border-sky-500/20 text-center">
                              <span className="text-[4px] block font-extrabold text-sky-700 tracking-tight font-mono">SPECIAL</span>
                              <span className="text-[6px] block font-black text-sky-800 leading-none">65% OFF</span>
                              <span className="text-[3px] block font-medium text-sky-600">STAY & SAVE</span>
                            </div>
                          </div>

                          {/* Kiosk Base Interface slot */}
                          <div className="w-full h-4 bg-sky-100/50 rounded-b border-t border-sky-200/50 flex items-center justify-center">
                            <div className="w-4 h-0.5 bg-sky-300 rounded-full" />
                          </div>
                        </div>

                        {/* Double step metallic base */}
                        <div className="w-[110%] h-1 bg-zinc-300 rounded-t shadow-xs" />
                        <div className="w-[124%] h-1 bg-zinc-400/80 rounded-t shadow-sm" />
                      </div>

                      {/* AI Camera mounted above kiosk */}
                      <div className="absolute right-[40%] bottom-[81%] z-30 flex flex-col items-center">
                        <div className="relative">
                          {/* Arm mount */}
                          <div className="w-1.5 h-3 bg-zinc-400 rotate-[35deg] rounded" />
                          {/* Camera cylinder */}
                          <div className="absolute top-1.5 -left-1 w-6 h-3.5 bg-gradient-to-r from-zinc-300 to-zinc-200 rounded-md shadow border border-zinc-400 rotate-[15deg] flex items-center justify-end pr-0.5">
                            {/* Camera lens */}
                            <div className="w-2.5 h-2.5 bg-zinc-800 rounded-full border border-zinc-600 flex items-center justify-center">
                              <div className="w-1 h-1 bg-red-500 rounded-full animate-ping" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Customer Profile Scanning Box */}
                      <div className="absolute right-[6%] bottom-[10%] w-[76px] sm:w-[94px] h-[72%] sm:h-[78%] z-20">
                        {/* Red visual bracket bounding box */}
                        <div className="w-full h-full border border-red-500 bg-red-500/5 rounded-lg flex items-center justify-center p-1 sm:p-2 relative">
                          
                          {/* Corner Brackets */}
                          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-red-500" />
                          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-red-500" />
                          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-red-500" />
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-red-500" />

                          {/* Human Profile Silhouette */}
                          <svg viewBox="0 0 100 200" className="w-full h-full text-white/95 filter drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]" fill="currentColor">
                            <path d="M 60,25 
                                     c 5.5,0 10,-4.5 10,-10 s -4.5,-10 -10,-10 s -10,4.5 -10,10 s 4.5,10 10,10 z 
                                     M 62,28 
                                     c -5,0 -12,2 -15,5 
                                     c -2.5,2.5 -4.5,6 -6,11 
                                     l -8,18 
                                     c -1.5,3.5 -0.5,5.5 1.5,6.5 
                                     s 4.5,0.5 6,-2.5 
                                     l 6.5,-15 
                                     l 2,15 
                                     c 0.5,3.5 1,12 1,22 
                                     l -2.5,35 
                                     c -1.5,15 -3.5,30 -5,45 
                                     c -0.5,4 1.5,7 4.5,7 
                                     s 5,-2 5.5,-5.5 
                                     l 4.5,-32.5 
                                     l 4.5,32.5 
                                     c 0.5,3.5 2.5,5.5 5.5,5.5 
                                     s 5,-3 4.5,-7 
                                     l -5,-45 
                                     c -1.5,-15 -3.5,-30 -3.5,-45 
                                     l 0.5,-20 
                                     c 3,0 6,-3 7,-8 
                                     l 3.5,-18 
                                     c 1.5,-6.5 -2.5,-11 -8.5,-11 z" />
                          </svg>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>

              {/* Right Column: Text copy matching Photo 1 */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono">
                    Ai Service
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight leading-tight">
                    SMART EYE
                  </h3>
                </div>
                
                <div className="space-y-5 text-sm sm:text-base text-zinc-600 leading-relaxed font-sans">
                  <p className="font-extrabold text-zinc-900 text-lg sm:text-xl">
                    방문 고객의 연령, 성별 뿐만 아니라 시간대 별로 분석합니다.
                  </p>
                  <p className="font-medium text-zinc-500 text-sm sm:text-base">
                    자체 기술력으로 개발한 AI 알고리즘을 이용하여 변화하고 있는 오프라인 공간의 고객 경험을 혁신하기 위해 영상 기반의 오프라인 방문자 분석 솔루션을 제공하고 있습니다.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white text-xs font-bold shadow-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-blue-600/20 hover:-translate-y-0.5"
                  >
                    <span>구축 상담 문의하기</span>
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* AI Core Advantages - Timeline Shaded Blue Box Section with 4 Cards matching Photo 2 */}
            <div className="bg-[#ecf5fc] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#d2e6f7] max-w-6xl mx-auto relative overflow-hidden">
              
              {/* Background horizontal timeline line (desktop only) */}
              <div className="absolute top-[168px] left-[12.5%] right-[12.5%] h-0.5 bg-sky-200/50 hidden md:block z-0" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-6 relative z-10">
                
                {/* Card 1: 높은 인식률과 정확도 */}
                <div className="flex flex-col items-center text-center group">
                  {/* Custom Target SVG Illustration */}
                  <div className="mb-4 h-32 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 select-none">
                    <svg className="w-24 h-24 text-sky-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" className="opacity-40" />
                      <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="3" className="opacity-60" />
                      <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="4" className="opacity-80" />
                      <circle cx="50" cy="50" r="8" fill="currentColor" />
                      <line x1="50" y1="5" x2="50" y2="25" stroke="currentColor" strokeWidth="2" />
                      <line x1="50" y1="75" x2="50" y2="95" stroke="currentColor" strokeWidth="2" />
                      <line x1="5" y1="50" x2="25" y2="50" stroke="currentColor" strokeWidth="2" />
                      <line x1="75" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="2" />
                      <g transform="translate(62, 38) rotate(-45)">
                        <line x1="0" y1="20" x2="0" y2="-10" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                        <polygon points="0,-15 -6,-5 6,-5" fill="#ef4444" />
                        <path d="M-4,15 L0,10 L4,15" stroke="#ef4444" strokeWidth="2" fill="none" />
                      </g>
                    </svg>
                  </div>
                  
                  {/* Timeline Bullet Node */}
                  <div className="relative w-full h-8 flex items-center justify-center hidden md:flex mb-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-sky-500 border-4 border-white shadow-md z-10" />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-2">
                    <h4 className="text-lg font-black text-sky-600 tracking-tight leading-snug">
                      높은 인식률과<br className="hidden lg:inline" /> 정확도
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-sans font-medium px-2">
                      얼굴 인식 뿐만 아니라 빠르게 움직이는 사물 등 급격한 주변 환경 변화에도 높은 인식률과 정확도를 유지합니다.
                    </p>
                  </div>
                </div>

                {/* Card 2: 높은 호환성과 확장성 */}
                <div className="flex flex-col items-center text-center group">
                  {/* Custom Camera SVG Illustration */}
                  <div className="mb-4 h-32 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 select-none">
                    <svg className="w-24 h-24 text-sky-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="25" y="35" width="40" height="20" rx="4" transform="rotate(-15 45 45)" fill="currentColor" />
                      <path d="M54 28 L64 33 L60 48 L50 43 Z" fill="#3b82f6" />
                      <circle cx="62" cy="38" r="4" fill="#1e293b" />
                      <path d="M30 46 L20 54 L20 62 L26 62 L26 56 Z" fill="currentColor" opacity="0.8" />
                      <rect x="16" y="60" width="14" height="4" rx="1" fill="#1e293b" />
                      
                      <circle cx="75" cy="22" r="4" fill="#3b82f6" />
                      <circle cx="85" cy="48" r="6" fill="#0ea5e9" />
                      <circle cx="70" cy="72" r="5" fill="#10b981" />
                      <circle cx="45" cy="80" r="4" fill="#6366f1" />
                      
                      <line x1="58" y1="38" x2="75" y2="22" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2 2" />
                      <line x1="58" y1="38" x2="85" y2="48" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="2 2" />
                      <line x1="58" y1="38" x2="70" y2="72" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" />
                      <line x1="58" y1="38" x2="45" y2="80" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="2 2" />
                    </svg>
                  </div>
                  
                  {/* Timeline Bullet Node */}
                  <div className="relative w-full h-8 flex items-center justify-center hidden md:flex mb-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-sky-500 border-4 border-white shadow-md z-10" />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-2">
                    <h4 className="text-lg font-black text-sky-600 tracking-tight leading-snug">
                      높은 호환성과<br className="hidden lg:inline" /> 확장성
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-sans font-medium px-2">
                      추가 장비 설치 없이 기존의 CCTV 영상을 분석하여 오프라인 매장의 객체 정보를 데이터화 합니다.
                    </p>
                  </div>
                </div>

                {/* Card 3: 고해상도 AI 알고리즘 개발 */}
                <div className="flex flex-col items-center text-center group">
                  {/* Custom Laptop SVG Illustration */}
                  <div className="mb-4 h-32 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 select-none">
                    <svg className="w-24 h-24 text-sky-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="20" y="32" width="60" height="38" rx="4" fill="currentColor" />
                      <rect x="24" y="36" width="52" height="30" rx="2" fill="#1e293b" />
                      <path d="M42 70 L35 78 L65 78 L58 70 Z" fill="currentColor" opacity="0.8" />
                      
                      <rect x="28" y="40" width="44" height="22" rx="1" fill="#0f172a" />
                      <path d="M28 56 L38 46 L48 54 L58 42 L72 56 Z" fill="currentColor" opacity="0.5" />
                      <circle cx="60" cy="45" r="3" fill="#fbbf24" />
                      
                      <path d="M50 25 L50 5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
                      <path d="M35 28 L25 15" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
                      <path d="M65 28 L75 15" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
                      
                      <polygon points="50,5 47,10 53,10" fill="#10b981" />
                      <polygon points="25,15 23,20 29,18" fill="#3b82f6" />
                      <polygon points="75,15 71,18 77,20" fill="#0ea5e9" />
                    </svg>
                  </div>
                  
                  {/* Timeline Bullet Node */}
                  <div className="relative w-full h-8 flex items-center justify-center hidden md:flex mb-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-sky-500 border-4 border-white shadow-md z-10" />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-2">
                    <h4 className="text-lg font-black text-sky-600 tracking-tight leading-snug">
                      고해상도 AI<br className="hidden lg:inline" /> 알고리즘 개발
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-sans font-medium px-2">
                      딥러닝 기반 객체인식 알고리즘으로 600*600 부터 1080 * 1080 까지 고해상도 지원을 실현합니다.
                    </p>
                  </div>
                </div>

                {/* Card 4: 개인정보보호법 준수 */}
                <div className="flex flex-col items-center text-center group">
                  {/* Custom Scale SVG Illustration */}
                  <div className="mb-4 h-32 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 select-none">
                    <svg className="w-24 h-24 text-sky-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="52" y="22" width="30" height="46" rx="2" fill="white" stroke="currentColor" strokeWidth="2" />
                      <line x1="58" y1="32" x2="76" y2="32" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                      <line x1="58" y1="40" x2="76" y2="40" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                      <line x1="58" y1="48" x2="71" y2="48" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                      
                      <path d="M18 68 L38 68" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      <line x1="28" y1="68" x2="28" y2="33" stroke="currentColor" strokeWidth="3" />
                      <line x1="13" y1="36" x2="43" y2="36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      
                      <line x1="13" y1="36" x2="8" y2="50" stroke="currentColor" strokeWidth="1" />
                      <line x1="13" y1="36" x2="18" y2="50" stroke="currentColor" strokeWidth="1" />
                      <path d="M6 50 C6 55, 20 55, 20 50 Z" fill="currentColor" opacity="0.8" />
                      
                      <line x1="43" y1="36" x2="38" y2="50" stroke="currentColor" strokeWidth="1" />
                      <line x1="43" y1="36" x2="48" y2="50" stroke="currentColor" strokeWidth="1" />
                      <path d="M36 50 C36 55, 50 55, 50 50 Z" fill="currentColor" opacity="0.8" />
                      
                      <g transform="translate(68, 64) rotate(-30)">
                        <rect x="-8" y="-4" width="16" height="8" rx="1" fill="#b45309" />
                        <rect x="-1" y="4" width="2" height="15" rx="1" fill="#b45309" />
                        <ellipse cx="0" cy="20" rx="8" ry="3" fill="#78350f" />
                      </g>
                    </svg>
                  </div>
                  
                  {/* Timeline Bullet Node */}
                  <div className="relative w-full h-8 flex items-center justify-center hidden md:flex mb-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-sky-500 border-4 border-white shadow-md z-10" />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-2">
                    <h4 className="text-lg font-black text-sky-600 tracking-tight leading-snug">
                      개인정보보호법<br className="hidden lg:inline" /> 준수
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-sans font-medium px-2">
                      민감정보를 취득 하지 않고 메타 정보를 활용하는 합법적인 서비스 입니다.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* AI Service Technologies - Interactive Solutions Block */}
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono block text-left">
                  AI Service Technologies
                </span>
                <h3 className="text-2xl sm:text-3.5xl font-black text-zinc-950 tracking-tight leading-snug text-left">
                  빅데이터를 이용한 고객, 매장<br />
                  맞춤형 솔루션
                </h3>
              </div>

              {/* Technologies Interactive Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
                
                {/* Left Side: Categories & Interactive Pills (lg:col-span-5) */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Category 1 */}
                  <div className="space-y-3">
                    <h5 className="text-xs sm:text-sm font-black text-sky-500 tracking-tight flex items-center gap-1.5 font-sans">
                      빅데이터 수집 및 고객 분석
                    </h5>
                    <div className="flex flex-wrap gap-2.5">
                      {[
                        { id: 'ai-1-1', label: '피플 카운트' },
                        { id: 'ai-1-2', label: '성별 및 연령 분석' },
                        { id: 'ai-1-3', label: '재방문자 분석' }
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setActiveAiTechPill(p.id)}
                          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full border text-xs font-black transition-all duration-300 ${
                            activeAiTechPill === p.id
                              ? 'bg-blue-50 border-blue-400 text-blue-600 shadow-sm scale-[1.02]'
                              : 'bg-white border-zinc-200/85 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50/50'
                          }`}
                        >
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-black font-mono ${
                            activeAiTechPill === p.id ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-500'
                          }`}>
                            {p.id.replace('ai-1-', '1-').replace('ai-2-', '2-').replace('ai-3-', '3-')}
                          </span>
                          <span>{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category 2 */}
                  <div className="space-y-3">
                    <h5 className="text-xs sm:text-sm font-black text-sky-500 tracking-tight flex items-center gap-1.5 font-sans">
                      행동 분석 및 매장 데이터 축적
                    </h5>
                    <div className="flex flex-wrap gap-2.5">
                      {[
                        { id: 'ai-2-1', label: '구역별 체류 시간 분석' },
                        { id: 'ai-2-2', label: '이동 방향 비율 추세' },
                        { id: 'ai-2-3', label: '구매 전환율 분석' }
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setActiveAiTechPill(p.id)}
                          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full border text-xs font-black transition-all duration-300 ${
                            activeAiTechPill === p.id
                              ? 'bg-blue-50 border-blue-400 text-blue-600 shadow-sm scale-[1.02]'
                              : 'bg-white border-zinc-200/85 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50/50'
                          }`}
                        >
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-black font-mono ${
                            activeAiTechPill === p.id ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-500'
                          }`}>
                            {p.id.replace('ai-1-', '1-').replace('ai-2-', '2-').replace('ai-3-', '3-')}
                          </span>
                          <span>{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category 3 */}
                  <div className="space-y-3">
                    <h5 className="text-xs sm:text-sm font-black text-sky-500 tracking-tight flex items-center gap-1.5 font-sans">
                      매장 별 맞춤 솔루션
                    </h5>
                    <div className="flex flex-wrap gap-2.5">
                      {[
                        { id: 'ai-3-1', label: '고객 맞춤형 광고 송출' },
                        { id: 'ai-3-2', label: '위급 상황 시 방법 알람' },
                        { id: 'ai-3-3', label: '재고 관리 및 상품 관리' }
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setActiveAiTechPill(p.id)}
                          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full border text-xs font-black transition-all duration-300 ${
                            activeAiTechPill === p.id
                              ? 'bg-blue-50 border-blue-400 text-blue-600 shadow-sm scale-[1.02]'
                              : 'bg-white border-zinc-200/85 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50/50'
                          }`}
                        >
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-black font-mono ${
                            activeAiTechPill === p.id ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-500'
                          }`}>
                            {p.id.replace('ai-1-', '1-').replace('ai-2-', '2-').replace('ai-3-', '3-')}
                          </span>
                          <span>{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Description Banner */}
                  <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 mt-6 animate-fadeIn">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200 text-[9px] font-black font-mono">
                        {activeAiTechPill.toUpperCase()}
                      </span>
                      <h4 className="text-xs font-black text-zinc-800">
                        {aiTechPillDetails[activeAiTechPill]?.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-zinc-500 font-medium leading-relaxed font-sans">
                      {aiTechPillDetails[activeAiTechPill]?.desc}
                    </p>
                  </div>

                </div>

                {/* Right Side: 3D Isometric Map Illustration (lg:col-span-7) */}
                <div className="lg:col-span-7 flex items-center justify-center relative p-1">
                  <div className="relative w-full rounded-2xl overflow-hidden shadow-md border border-zinc-100 bg-white p-2">
                    <img
                      src={smartIotThumbnail}
                      alt="맞춤형 솔루션 오프라인 맵"
                      className="w-full h-auto object-cover rounded-xl"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* AI Service 4 core capabilities flow matching Photo 3 */}
            <div className="max-w-6xl mx-auto space-y-8 pt-10">
              
              {/* Outer Wrapper for Timeline and Cards */}
              <div className="relative w-full">
                
                {/* Horizontal continuous timeline connector line (desktop only) */}
                <div className="absolute top-[40px] left-1 right-1 h-[2px] bg-zinc-150 z-0 hidden lg:block" />

                {/* 4 Column Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                  
                  {/* Column 1 */}
                  <div className="space-y-3 flex flex-col">
                    {/* Step Title */}
                    <div className="text-sm font-black text-zinc-400 font-mono tracking-tight pl-1 uppercase">
                      01. 생체 분석
                    </div>
                    {/* Circle Node Container */}
                    <div className="h-6 flex items-center relative pl-1">
                      <div className="w-3.5 h-3.5 rounded-full border-[3.5px] border-sky-100 bg-sky-400 shadow-xs z-10" />
                      {/* Local line for mobile/tablet where continuous line is hidden */}
                      <div className="absolute left-0 right-0 h-[2px] bg-zinc-150 z-0 lg:hidden" />
                    </div>
                    
                    {/* Image Box */}
                    <div className="w-full aspect-[4/3] bg-white border border-zinc-150 rounded-2xl flex items-center justify-center p-3 relative overflow-hidden hover:border-blue-300 transition-colors duration-300 shadow-sm mt-2">
                      {/* Card 1 Illustration */}
                      <div className="flex items-center gap-6 w-full max-w-[240px] justify-between">
                        {/* Kiosk Device */}
                        <div className="relative flex flex-col items-center">
                          {/* Label: Built-in camera */}
                          <div className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-zinc-800" />
                            <span className="text-[8px] font-black text-zinc-400 font-mono">Built-in camera</span>
                          </div>
                          
                          {/* Kiosk Body */}
                          <div className="w-[44px] h-[115px] bg-white border border-zinc-250 rounded-lg shadow-xs flex flex-col p-1 justify-between relative z-10">
                            {/* Camera pinhole */}
                            <div className="w-1 h-1 rounded-full bg-zinc-800 mx-auto mb-1" />
                            
                            {/* Screen */}
                            <div className="w-full h-[76px] bg-sky-50 border border-zinc-150 rounded overflow-hidden relative flex flex-col">
                              <div className="w-full h-full bg-gradient-to-b from-sky-400 to-indigo-500 p-1 flex flex-col justify-between text-white text-[4px] font-sans">
                                <span className="font-extrabold scale-75 origin-top-left leading-tight">Healthy Food<br/>Guaranteed</span>
                                <div className="w-5 h-5 rounded-full bg-white/20 border border-white/30 mx-auto flex items-center justify-center overflow-hidden">
                                  <span className="text-xs scale-75">🥗</span>
                                </div>
                                <div className="w-full h-0.5 bg-white/40 rounded-full scale-90" />
                              </div>
                            </div>
                            
                            {/* Bezel details */}
                            <div className="flex justify-between items-center px-0.5 mt-0.5">
                              <div className="w-2.5 h-0.5 bg-zinc-300 rounded-full" />
                              <div className="w-1 h-1 rounded-full bg-zinc-300" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Face recognition border box */}
                        <div className="relative flex flex-col items-center">
                          <div className="w-[75px] h-[85px] border-2 border-dashed border-red-400 rounded-lg bg-red-50/5 flex flex-col items-center justify-center p-1.5 relative">
                            {/* Red bracket corners */}
                            <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-red-500" />
                            <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-red-500" />
                            <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-red-500" />
                            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-red-500" />
                            
                            {/* Face silhouette path */}
                            <svg className="w-10 h-10 text-red-300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M50 15 C38 15 32 25 32 38 C32 45 35 50 40 55 C32 62 25 72 25 85 L75 85 C75 72 68 62 60 55 C65 50 68 45 68 38 C68 25 62 15 50 15 Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span className="text-[9px] font-black text-zinc-500 mt-1.5">고객 인식</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Title & Desc */}
                    <div className="space-y-1.5 pt-2">
                      <h4 className="text-lg sm:text-xl font-black text-sky-600 font-sans tracking-tight leading-tight">
                        인터렉티브<br className="hidden sm:block" /> 키오스크
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-sans font-medium">
                        방문 고객의 성별, 연령대 등을 분류하고 Big Data 기반의 맞춤형 콘텐츠를 송출합니다.
                      </p>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-3 flex flex-col">
                    {/* Step Title */}
                    <div className="text-sm font-black text-zinc-400 font-mono tracking-tight pl-1 uppercase">
                      02. 매출 분석
                    </div>
                    {/* Circle Node Container */}
                    <div className="h-6 flex items-center relative pl-1">
                      <div className="w-3.5 h-3.5 rounded-full border-[3.5px] border-sky-100 bg-sky-400 shadow-xs z-10" />
                      {/* Local line for mobile/tablet where continuous line is hidden */}
                      <div className="absolute left-0 right-0 h-[2px] bg-zinc-150 z-0 lg:hidden" />
                    </div>
                    
                    {/* Image Box */}
                    <div className="w-full aspect-[4/3] bg-white border border-zinc-150 rounded-2xl flex items-center justify-center p-3 relative overflow-hidden hover:border-blue-300 transition-colors duration-300 shadow-sm mt-2">
                      {/* Card 2 Illustration */}
                      <div className="flex items-center gap-4 w-full max-w-[240px] justify-between">
                        {/* Scanner device on stand */}
                        <div className="relative">
                          <div className="w-[48px] h-[82px] bg-zinc-50 border border-zinc-250 rounded-lg shadow-xs p-1 flex flex-col justify-between relative z-10">
                            <div className="w-full h-[64px] bg-slate-900 border border-zinc-200 rounded overflow-hidden relative flex items-center justify-center">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800 p-1 flex flex-col justify-between text-white text-[3.5px] font-sans">
                                <span className="font-extrabold">SHOPPING SMART</span>
                                <div className="w-full h-6 flex items-end justify-center gap-[1px]">
                                  <div className="w-1 h-2 bg-white/20 rounded-sm" />
                                  <div className="w-1 h-4 bg-white/40 rounded-sm" />
                                  <div className="w-1 h-5 bg-white/60 rounded-sm" />
                                  <div className="w-1 h-3 bg-white/20 rounded-sm" />
                                  <div className="w-1 h-4.5 bg-white/80 rounded-sm" />
                                </div>
                                <div className="flex justify-between items-center text-[2.5px]">
                                  <span>TOTAL ITEMS: 3</span>
                                  <span>12,500원</span>
                                </div>
                              </div>
                            </div>
                            <div className="w-1.5 h-0.5 bg-zinc-400 rounded-full mx-auto" />
                          </div>
                          <div className="w-[34px] h-[6px] bg-zinc-300 rounded mx-auto -mt-[1px] relative z-0" />
                          <div className="w-[42px] h-[2px] bg-zinc-400 rounded mx-auto" />
                        </div>

                        {/* RFID Tag scanning */}
                        <div className="relative flex flex-col items-center">
                          <div className="relative w-[70px] h-[70px] flex items-center justify-center">
                            <div className="w-[58px] h-[36px] bg-gradient-to-r from-sky-400 to-blue-500 border border-blue-400 rounded-md shadow-xs p-1 flex flex-col justify-between text-white relative z-10 rotate-12">
                              <div className="flex justify-between items-center">
                                <span className="text-[4.5px] font-bold font-mono">TUNE TAG</span>
                                <span className="text-[6px]">📶</span>
                              </div>
                              <div className="w-5 h-0.5 bg-white/30 rounded" />
                              <span className="text-[3.5px] text-white/80 text-right font-mono">RFID ACTIVE</span>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-14 h-14 rounded-full border border-blue-400/20 animate-ping absolute" />
                              <div className="w-10 h-10 rounded-full border border-blue-400/30 animate-pulse absolute" />
                            </div>
                          </div>
                          <span className="text-[9px] font-black text-zinc-500 mt-1">RFID 스티커</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Title & Desc */}
                    <div className="space-y-1.5 pt-2">
                      <h4 className="text-lg sm:text-xl font-black text-sky-600 font-sans tracking-tight leading-tight">
                        스마트<br className="hidden sm:block" /> 장바구니
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-sans font-medium">
                        RFID기술을 활용하여 상품 구매 패턴 및 연계성 분석이 가능한 스마트 장바구니로 활용합니다.
                      </p>
                    </div>
                  </div>

                  {/* Column 3 */}
                  <div className="space-y-3 flex flex-col">
                    {/* Step Title */}
                    <div className="text-sm font-black text-zinc-400 font-mono tracking-tight pl-1 uppercase">
                      03. 행동 분석
                    </div>
                    {/* Circle Node Container */}
                    <div className="h-6 flex items-center relative pl-1">
                      <div className="w-3.5 h-3.5 rounded-full border-[3.5px] border-sky-100 bg-sky-400 shadow-xs z-10" />
                      {/* Local line for mobile/tablet where continuous line is hidden */}
                      <div className="absolute left-0 right-0 h-[2px] bg-zinc-150 z-0 lg:hidden" />
                    </div>
                    
                    {/* Image Box */}
                    <div className="w-full aspect-[4/3] bg-white border border-zinc-150 rounded-2xl flex items-center justify-center p-3 relative overflow-hidden hover:border-blue-300 transition-colors duration-300 shadow-sm mt-2">
                      {/* Card 3 Illustration */}
                      <div className="w-full h-full relative flex flex-col justify-between">
                        {/* AI Camera looking down */}
                        <div className="absolute top-0 left-0 z-20 flex items-center gap-1">
                          <div className="relative">
                            <svg className="w-12 h-12 text-zinc-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="20" y="20" width="10" height="25" rx="2" fill="currentColor" />
                              <path d="M25 32 L50 32" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                              <rect x="42" y="18" width="40" height="22" rx="4" fill="#d4d4d8" stroke="currentColor" strokeWidth="3" />
                              <rect x="76" y="21" width="8" height="16" rx="2" fill="currentColor" />
                              <circle cx="80" cy="29" r="3" fill="#ef4444" className="animate-pulse" />
                            </svg>
                          </div>
                          <span className="text-[8px] font-black text-zinc-400 font-mono bg-zinc-50 px-1 py-0.5 rounded border border-zinc-200">AI 카메라</span>
                        </div>

                        {/* 3D Isometric mini store */}
                        <div className="absolute bottom-0 right-0 w-[125px] h-[90px] z-10">
                          <svg className="w-full h-full" viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M70 20 L130 50 L70 80 L10 50 Z" fill="#f4f4f5" stroke="#e4e4e7" strokeWidth="1.5" />
                            <path d="M50 30 L90 50 L70 60 L30 40 Z" fill="#fef08a" opacity="0.6" />
                            <path d="M70 40 L110 60 L90 70 L50 50 Z" fill="#86efac" opacity="0.5" />
                            <circle cx="70" cy="50" r="12" fill="#3b82f6" opacity="0.15" />
                            
                            <g transform="translate(60, 25)">
                              <path d="M10 10 L30 20 L20 25 L0 15 Z" fill="#e4e4e7" stroke="#d4d4d8" />
                              <path d="M0 15 L0 25 L20 35 L20 25 Z" fill="#d4d4d8" stroke="#c4c4c7" />
                              <path d="M20 25 L20 35 L30 30 L30 20 Z" fill="#c4c4c7" stroke="#b4b4b9" />
                            </g>
                            <circle cx="45" cy="48" r="3" fill="#3b82f6" stroke="white" strokeWidth="0.8" />
                            <circle cx="85" cy="58" r="3" fill="#3b82f6" stroke="white" strokeWidth="0.8" />
                            <path d="M30 32 L45 48" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.5" />
                            <path d="M30 32 L85 58" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.3" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Card Title & Desc */}
                    <div className="space-y-1.5 pt-2">
                      <h4 className="text-lg sm:text-xl font-black text-sky-600 font-sans tracking-tight leading-tight">
                        매장<br className="hidden sm:block" /> AI 카메라
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-sans font-medium">
                        매장 내 방문 고객 군집도, 성별, 연령대 등을 수치화 하여 오프라인 매장의 효율적인 운용이 가능합니다.
                      </p>
                    </div>
                  </div>

                  {/* Column 4 */}
                  <div className="space-y-3 flex flex-col">
                    {/* Step Title */}
                    <div className="text-sm font-black text-zinc-400 font-mono tracking-tight pl-1 uppercase">
                      04. 객체 분석
                    </div>
                    {/* Circle Node Container */}
                    <div className="h-6 flex items-center relative pl-1">
                      <div className="w-3.5 h-3.5 rounded-full border-[3.5px] border-sky-100 bg-sky-400 shadow-xs z-10" />
                      {/* Local line for mobile/tablet where continuous line is hidden */}
                      <div className="absolute left-0 right-0 h-[2px] bg-zinc-150 z-0 lg:hidden" />
                    </div>
                    
                    {/* Image Box */}
                    <div className="w-full aspect-[4/3] bg-white border border-zinc-150 rounded-2xl flex items-center justify-center p-3 relative overflow-hidden hover:border-blue-300 transition-colors duration-300 shadow-sm mt-2">
                      {/* Card 4 Illustration */}
                      <div className="flex flex-col items-center justify-between w-full h-full max-w-[180px] relative">
                        <div className="w-full h-full relative flex flex-col justify-end">
                          {/* Upper Arch structure */}
                          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[115px] h-[65px] border-t-[6px] border-l-[6px] border-r-[6px] border-zinc-200 rounded-t-lg z-0 flex flex-col justify-between">
                            <div className="w-full text-center relative -top-3">
                              <div className="inline-flex items-center gap-0.5 bg-white px-1 py-0.5 rounded border border-zinc-100 shadow-xxs">
                                <span className="w-1 h-1 rounded-full bg-zinc-800" />
                                <span className="text-[7px] font-black text-zinc-400 font-mono">Built-in camera</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Down-pointing camera lens */}
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-zinc-700 rounded-full z-10 border border-white flex items-center justify-center shadow-xs">
                            <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                          </div>

                          {/* Plate & Donut */}
                          <div className="w-[100px] h-[48px] bg-zinc-50 border border-zinc-200 rounded-lg shadow-inner mx-auto mb-4 z-10 flex items-center justify-center relative p-1">
                            <div className="relative">
                              <div className="w-8 h-8 rounded-full bg-amber-600 border border-amber-750 shadow-md flex items-center justify-center relative overflow-hidden">
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-50 border border-amber-750" />
                                <div className="absolute top-1 left-2.5 w-0.5 h-0.5 bg-white rounded-full" />
                                <div className="absolute bottom-1.5 right-1.5 w-0.5 h-0.5 bg-white rounded-full" />
                              </div>
                              <div className="absolute -inset-2 border border-dashed border-red-500 rounded-lg animate-pulse">
                                <div className="absolute -right-12 top-1/2 -translate-y-1/2 bg-red-500 text-white font-sans font-black text-[6px] px-1 py-0.5 rounded shadow-xxs whitespace-nowrap">
                                  물체 인식
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Front Bezel instruction strip */}
                          <div className="w-full h-4 bg-sky-600 rounded-b-md border border-sky-650 flex items-center justify-center z-20 text-[6.5px] font-black text-white shadow-xs font-sans px-1">
                            지정된 공간에 상품을 올려주세요
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Title & Desc */}
                    <div className="space-y-1.5 pt-2">
                      <h4 className="text-lg sm:text-xl font-black text-sky-600 font-sans tracking-tight leading-tight">
                        자동<br className="hidden sm:block" /> 계산기
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-sans font-medium">
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
          <div className="space-y-24 max-w-7xl mx-auto px-4 py-8 select-none">
            
            {/* Header Area */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center relative mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight font-sans">
                Smart IoT
              </h2>
              <div className="w-full h-px bg-zinc-200 mt-6" />
            </motion.div>

            {/* Image 1 Content Area: SMART SENSE (Left: Beautiful Animated 3D floating SVG, Right: Text & Active Controller) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: 3D Perspective Floating Scene */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
                
                {/* Neon Backlight Ambient Glow */}
                <div className="absolute w-[85%] h-[85%] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

                {/* Perspective Container */}
                <div 
                  className="relative w-full max-w-[420px] aspect-[4/3] flex items-center justify-center"
                  style={{ perspective: "1200px" }}
                >
                  
                  {/* Floating Toggles (Above Phone, Left) */}
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                    className="absolute top-[8%] left-[10%] z-20 flex flex-col gap-2 scale-90 sm:scale-100"
                  >
                    <div className="bg-white/95 backdrop-blur-md border border-zinc-200 rounded-xl p-2.5 shadow-md flex items-center gap-2.5">
                      <div className="flex flex-col text-left">
                        <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest font-mono">POWER SWITCH</span>
                        <span className="text-[10px] font-black text-zinc-800">조명 제어</span>
                      </div>
                      <button 
                        onClick={() => setPhoneLightOn(!phoneLightOn)}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 ${phoneLightOn ? 'bg-blue-600' : 'bg-zinc-300'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${phoneLightOn ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    <div className="bg-white/95 backdrop-blur-md border border-zinc-200 rounded-xl p-2.5 shadow-md flex items-center gap-2.5">
                      <div className="flex flex-col text-left">
                        <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest font-mono">HVAC STATUS</span>
                        <span className="text-[10px] font-black text-zinc-800">공조 전원</span>
                      </div>
                      <button 
                        onClick={() => setPhonePowerOn(!phonePowerOn)}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 ${phonePowerOn ? 'bg-[#ef4444]' : 'bg-zinc-300'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${phonePowerOn ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </motion.div>

                  {/* Glowing 3D Light Bulb (Top Left/Center) */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    className="absolute top-[10%] left-[45%] z-25 flex flex-col items-center"
                  >
                    <div className="relative">
                      {/* Glow halo */}
                      {phoneLightOn && (
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute -inset-6 rounded-full bg-cyan-400/40 blur-lg pointer-events-none"
                        />
                      )}
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-tr flex items-center justify-center shadow-lg border-2 transition-all duration-500 ${
                        phoneLightOn 
                          ? 'from-cyan-400 to-sky-300 text-white border-cyan-300 scale-105' 
                          : 'from-zinc-100 to-zinc-200 text-zinc-400 border-zinc-300'
                      }`}>
                        <Lightbulb className={`w-7 h-7 ${phoneLightOn ? 'animate-pulse' : ''}`} />
                      </div>
                    </div>
                  </motion.div>

                  {/* 3D Wi-Fi Router with pulsing wave nodes (Top Right) */}
                  <motion.div 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                    className="absolute top-[12%] right-[10%] z-20 flex flex-col items-center"
                  >
                    <div className="relative bg-white border-2 border-zinc-200 rounded-2xl p-3 shadow-lg flex items-center justify-center w-14 h-14">
                      {/* Pulse waves */}
                      <span className="absolute -inset-2 rounded-2xl border border-purple-400/30 animate-ping pointer-events-none" />
                      <Wifi className="w-6 h-6 text-purple-600" />
                    </div>
                  </motion.div>

                  {/* 3D Thermometer with live value (Center Left) */}
                  <motion.div 
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    className="absolute top-[42%] left-[4%] z-20"
                  >
                    <div className="bg-white border border-zinc-200 rounded-2xl p-2.5 shadow-md flex items-center gap-2 scale-90 sm:scale-100">
                      <div className="p-1.5 rounded-lg bg-red-50 text-red-500 border border-red-100">
                        <Thermometer className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[8px] font-black text-zinc-400 tracking-wider">실내 온도</span>
                        <span className="text-xs font-black text-zinc-800 font-mono tracking-tight">{phoneTemp}°C</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* 3D Security Dome Camera (Bottom Left) */}
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2.1 }}
                    className="absolute bottom-[10%] left-[12%] z-20"
                  >
                    <div className="bg-white border border-zinc-200 rounded-2xl p-2.5 shadow-md flex items-center gap-2.5 scale-90 sm:scale-100">
                      <div className="relative">
                        <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center">
                          <Eye className="w-4 h-4" />
                        </div>
                        {phoneCameraActive && (
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white animate-pulse" />
                        )}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[8px] font-black text-zinc-400 tracking-wider">보안 카메라</span>
                        <span className="text-xs font-black text-zinc-800">{phoneCameraActive ? '감지 중' : '비활성'}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Smartphone screen (The focal point) */}
                  <motion.div 
                    style={{ 
                      transform: "rotateX(15deg) rotateY(-20deg) rotateZ(10deg)",
                      transformStyle: "preserve-3d" 
                    }}
                    animate={{ 
                      y: [0, -12, 0],
                      rotateZ: [10, 8, 10]
                    }}
                    transition={{ 
                      duration: 7, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute bottom-[15%] right-[18%] w-[150px] sm:w-[170px] h-[270px] sm:h-[310px] bg-slate-900 rounded-[28px] border-[5px] border-zinc-200 shadow-2xl p-2.5 flex flex-col justify-between"
                  >
                    {/* Speaker & notch */}
                    <div className="w-full flex justify-center mb-1">
                      <div className="w-12 h-3.5 bg-black rounded-b-xl flex justify-center items-center gap-1">
                        <div className="w-4 h-0.5 bg-zinc-700 rounded-full" />
                        <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                      </div>
                    </div>

                    {/* App Display Canvas */}
                    <div className="w-full flex-1 bg-[#f4f7fa] rounded-[18px] p-2 flex flex-col justify-between overflow-hidden relative border border-slate-950/20 shadow-inner">
                      
                      {/* App Header */}
                      <div className="flex justify-between items-center pb-1 border-b border-zinc-200">
                        <span className="text-[7px] font-black text-blue-600 font-mono">TUNE SMART</span>
                        <div className="flex items-center gap-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[5px] text-zinc-400 font-bold font-mono uppercase tracking-wider">Connected</span>
                        </div>
                      </div>

                      {/* App UI Grid Controls */}
                      <div className="flex-1 py-1.5 space-y-1.5 overflow-y-auto no-scrollbar">
                        
                        {/* Light Card Status */}
                        <div className={`p-1.5 rounded-lg border transition-all duration-300 flex items-center justify-between ${
                          phoneLightOn ? 'bg-white border-blue-200 shadow-xs' : 'bg-zinc-100/50 border-zinc-200/40'
                        }`}>
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[10px] ${phoneLightOn ? 'text-blue-500' : 'text-zinc-400'}`}>💡</span>
                            <div className="flex flex-col text-left">
                              <span className="text-[6px] text-zinc-400 font-bold leading-none">조명 상태</span>
                              <span className="text-[8px] font-black text-zinc-800 leading-tight">{phoneLightOn ? '켜짐' : '꺼짐'}</span>
                            </div>
                          </div>
                          <span className={`text-[5px] font-black px-1 py-0.5 rounded ${phoneLightOn ? 'bg-blue-50 text-blue-600' : 'bg-zinc-200 text-zinc-500'}`}>
                            {phoneLightOn ? 'ACTIVE' : 'OFF'}
                          </span>
                        </div>

                        {/* Temp Control Display Card */}
                        <div className="p-1.5 rounded-lg border bg-white border-zinc-150 shadow-xs flex flex-col gap-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] text-zinc-400 font-bold">공조 온도 제어</span>
                            <span className="text-[9px] font-black text-zinc-900 font-mono">{phoneTemp}°C</span>
                          </div>
                          <div className="w-full bg-zinc-100 h-1 rounded-full overflow-hidden flex">
                            <div className="bg-red-500 h-full" style={{ width: `${((phoneTemp - 16) / 14) * 100}%` }} />
                          </div>
                        </div>

                        {/* Power state Card */}
                        <div className={`p-1.5 rounded-lg border transition-all duration-300 flex items-center justify-between ${
                          phonePowerOn ? 'bg-white border-red-200 shadow-xs' : 'bg-zinc-100/50 border-zinc-200/40'
                        }`}>
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[10px] ${phonePowerOn ? 'text-red-500 animate-spin' : 'text-zinc-400'}`}>🌀</span>
                            <div className="flex flex-col text-left">
                              <span className="text-[6px] text-zinc-400 font-bold leading-none">공조 팬 세기</span>
                              <span className="text-[8px] font-black text-zinc-800 leading-tight">{phonePowerOn ? `가동중 (${phoneFanSpeed})` : '꺼짐'}</span>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* App Footer Navigation Bar */}
                      <div className="h-4 bg-zinc-900 -mx-2 -mb-2 rounded-b-[18px] flex items-center justify-around px-2 text-[5px] font-extrabold text-white/50">
                        <span className="text-white">HOME</span>
                        <span>DEVICES</span>
                        <span>SCENES</span>
                      </div>

                    </div>

                    {/* Home Indicator */}
                    <div className="w-16 h-1 bg-zinc-600 rounded-full mx-auto mt-1.5" />
                  </motion.div>

                </div>
              </div>

              {/* Right Column: Text Information & Control Panel Interface */}
              <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
                <div className="space-y-2.5">
                  <span className="text-xs font-black uppercase tracking-widest text-blue-600 font-mono bg-blue-50 px-3 py-1 rounded-full inline-block">
                    IoT Service
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight leading-none">
                    SMART SENSE
                  </h3>
                </div>

                <div className="space-y-5 text-sm sm:text-base text-zinc-650 leading-relaxed font-sans font-medium text-left">
                  <p className="text-lg font-black text-zinc-900 leading-snug">
                    매장 내 사물을 연결하여 정보를 상호 소통하는 지능형 기술 및 서비스입니다.
                  </p>
                  <p className="text-zinc-500 text-sm">
                    디바이스 간 유기적인 자동 연동부터 실시간 이상 감지, 일괄 소등 예약 제어까지! 복잡한 설정 없이도 점주 스케줄에 따른 스마트 매장 연출이 자유자재로 이루어집니다.
                  </p>
                </div>

                {/* Live Interactive Remote Control Pad Block */}
                <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-2 border-b border-zinc-200 pb-2.5">
                    <span className="text-base">📱</span>
                    <h4 className="text-xs font-black text-zinc-800 uppercase tracking-wider font-mono">Live Demo Controller (실시간 제어 대시보드)</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    
                    {/* Control 1: Bulb Toggle */}
                    <button 
                      onClick={() => setPhoneLightOn(!phoneLightOn)}
                      className={`p-3 rounded-xl border-2 text-left flex flex-col justify-between gap-2.5 transition-all duration-300 hover:scale-[1.02] ${
                        phoneLightOn 
                          ? 'bg-cyan-50/50 border-cyan-400 shadow-sm' 
                          : 'bg-white border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="text-lg">💡</span>
                        <div className={`w-2.5 h-2.5 rounded-full ${phoneLightOn ? 'bg-cyan-500 animate-ping' : 'bg-zinc-300'}`} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-400 font-bold leading-none">매장 조명 스위치</span>
                        <span className="text-xs font-black text-zinc-800 mt-1">{phoneLightOn ? 'ON (조명 점등)' : 'OFF (일괄 소등)'}</span>
                      </div>
                    </button>

                    {/* Control 2: HVAC Power Toggle */}
                    <button 
                      onClick={() => setPhonePowerOn(!phonePowerOn)}
                      className={`p-3 rounded-xl border-2 text-left flex flex-col justify-between gap-2.5 transition-all duration-300 hover:scale-[1.02] ${
                        phonePowerOn 
                          ? 'bg-red-50/50 border-red-300 shadow-sm' 
                          : 'bg-white border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="text-lg">🌀</span>
                        <div className={`w-2.5 h-2.5 rounded-full ${phonePowerOn ? 'bg-red-500 animate-pulse' : 'bg-zinc-300'}`} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-400 font-bold leading-none">실내 냉난방 공조</span>
                        <span className="text-xs font-black text-zinc-800 mt-1">{phonePowerOn ? 'ON (기기 가동)' : 'OFF (가동 중지)'}</span>
                      </div>
                    </button>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    
                    {/* Control 3: Temp slider */}
                    <div className="bg-white border border-zinc-200 rounded-xl p-3 flex flex-col justify-center gap-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-zinc-400 font-bold">공조 온도 정밀 설정</span>
                        <span className="text-xs font-black text-zinc-800 font-mono">{phoneTemp}°C</span>
                      </div>
                      <input 
                        type="range" 
                        min="16" 
                        max="30" 
                        value={phoneTemp}
                        onChange={(e) => setPhoneTemp(Number(e.target.value))}
                        className="w-full h-1 bg-zinc-150 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    {/* Control 4: Camera Toggle */}
                    <div className="bg-white border border-zinc-200 rounded-xl p-3 flex items-center justify-between">
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] text-zinc-400 font-bold">보안 감지 CCTV 모드</span>
                        <span className="text-xs font-black text-zinc-800 mt-0.5">{phoneCameraActive ? '보안 적외선 감지 작동중' : '사생활 보호 오프'}</span>
                      </div>
                      <button 
                        onClick={() => setPhoneCameraActive(!phoneCameraActive)}
                        className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-300 ${phoneCameraActive ? 'bg-emerald-500' : 'bg-zinc-300'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${phoneCameraActive ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </div>

                  </div>
                </div>
              </div>

            </div>

            {/* Image 1 Bottom: Timeline Grid Section with gorgeous continuous line matching Photo 1 */}
            <div className="bg-[#ecf5fc] rounded-[32px] p-6 sm:p-10 border border-[#d2e6f7] relative overflow-hidden">
              
              {/* Horizontal continuous timeline line (desktop only) */}
              <div className="absolute top-[152px] left-[12%] right-[12%] h-0.5 bg-blue-200/50 hidden lg:block z-0" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                
                {/* Timeline Card 1 */}
                <motion.div 
                  whileHover={{ y: -6, backgroundColor: "rgba(255,255,255,0.95)" }}
                  className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-zinc-200/60 shadow-sm flex flex-col justify-between min-h-[310px] transition-all duration-300 group text-left"
                >
                  {/* SVG Illustration: 다양한 센서연동 */}
                  <div className="h-28 flex items-center justify-center select-none">
                    <svg className="w-20 h-20 text-blue-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="25" y="15" width="50" height="70" rx="6" fill="#f0f9ff" stroke="currentColor" strokeWidth="2" />
                      {/* Switch Button Circle */}
                      <circle cx="50" cy="38" r="14" fill="#38bdf8" stroke="currentColor" strokeWidth="1.5" className="group-hover:animate-pulse" />
                      <line x1="50" y1="33" x2="50" y2="43" stroke="white" strokeWidth="3" strokeLinecap="round" />
                      {/* ON/OFF texts */}
                      <text x="50" y="65" fill="currentColor" fontSize="7" fontWeight="bold" textAnchor="middle">ON</text>
                      <text x="50" y="76" fill="#cbd5e1" fontSize="7" fontWeight="bold" textAnchor="middle">OFF</text>

                      {/* Surrounding Connected Sensor Nodes */}
                      <circle cx="15" cy="25" r="5" fill="#bae6fd" stroke="currentColor" strokeWidth="1" />
                      <circle cx="85" cy="25" r="5" fill="#bae6fd" stroke="currentColor" strokeWidth="1" />
                      <circle cx="12" cy="55" r="5" fill="#bae6fd" stroke="currentColor" strokeWidth="1" />
                      <circle cx="88" cy="55" r="5" fill="#bae6fd" stroke="currentColor" strokeWidth="1" />

                      <line x1="25" y1="30" x2="20" y2="27" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="75" y1="30" x2="80" y2="27" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="25" y1="50" x2="17" y2="53" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="75" y1="50" x2="83" y2="53" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                    </svg>
                  </div>

                  {/* Node Connector representation */}
                  <div className="relative w-full h-6 items-center justify-center hidden lg:flex">
                    <div className="w-3.5 h-3.5 rounded-full bg-blue-500 border-4 border-white shadow-md z-10 group-hover:scale-125 transition-transform" />
                  </div>

                  {/* Titles & Copy */}
                  <div className="space-y-2 mt-2">
                    <h4 className="text-base sm:text-lg font-black text-zinc-950 font-sans tracking-tight">
                      다양한 센서연동
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-sans font-medium">
                      조명, 공조, 환경, 소음센서 연동, 과열 차단 등 다양한 센서와의 연동이 유동적으로 가능합니다.
                    </p>
                  </div>
                </motion.div>

                {/* Timeline Card 2 */}
                <motion.div 
                  whileHover={{ y: -6, backgroundColor: "rgba(255,255,255,0.95)" }}
                  className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-zinc-200/60 shadow-sm flex flex-col justify-between min-h-[310px] transition-all duration-300 group text-left"
                >
                  {/* SVG Illustration: 에너지 사용 데이터수집 */}
                  <div className="h-28 flex items-center justify-center select-none">
                    <svg className="w-20 h-20 text-blue-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="15" y="25" width="46" height="34" rx="4" fill="#f8fafc" stroke="currentColor" strokeWidth="2" />
                      {/* Charts on computer screen */}
                      <path d="M22 48 L32 38 L40 46 L52 34" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="22" y="51" width="6" height="4" fill="#bae6fd" />
                      <rect x="30" y="47" width="6" height="8" fill="#38bdf8" />
                      <rect x="38" y="50" width="6" height="5" fill="#38bdf8" />
                      <rect x="46" y="43" width="6" height="12" fill="currentColor" />
                      {/* Computer Stand */}
                      <path d="M38 59 L38 67 M30 67 L46 67" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

                      {/* Server drive box */}
                      <rect x="68" y="30" width="18" height="35" rx="2" fill="#e2e8f0" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="72" y1="36" x2="82" y2="36" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="72" y1="44" x2="82" y2="44" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="72" y1="52" x2="82" y2="52" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="73" cy="60" r="1.5" fill="#10b981" className="group-hover:animate-ping" />
                      <circle cx="78" cy="60" r="1.5" fill="#ef4444" />
                    </svg>
                  </div>

                  {/* Node Connector representation */}
                  <div className="relative w-full h-6 items-center justify-center hidden lg:flex">
                    <div className="w-3.5 h-3.5 rounded-full bg-blue-500 border-4 border-white shadow-md z-10 group-hover:scale-125 transition-transform" />
                  </div>

                  {/* Titles & Copy */}
                  <div className="space-y-2 mt-2">
                    <h4 className="text-base sm:text-lg font-black text-zinc-950 font-sans tracking-tight">
                      에너지 사용 데이터수집
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-sans font-medium">
                      카테고리별 전력소모량을 비교 분석하고, 사용한 전력, 에너지 사용량을 실시간으로 확인 가능합니다.
                    </p>
                  </div>
                </motion.div>

                {/* Timeline Card 3 */}
                <motion.div 
                  whileHover={{ y: -6, backgroundColor: "rgba(255,255,255,0.95)" }}
                  className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-zinc-200/60 shadow-sm flex flex-col justify-between min-h-[310px] transition-all duration-300 group text-left"
                >
                  {/* SVG Illustration: 원격 모니터링 제어 */}
                  <div className="h-28 flex items-center justify-center select-none">
                    <svg className="w-20 h-20 text-blue-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Big Phone */}
                      <rect x="36" y="15" width="40" height="70" rx="6" fill="#f8fafc" stroke="currentColor" strokeWidth="2" />
                      <rect x="41" y="22" width="30" height="52" rx="2" fill="currentColor" opacity="0.1" />
                      <circle cx="56" cy="80" r="2.5" fill="currentColor" />

                      {/* Small Standing Person Profile */}
                      <path d="M16 65 C16 57, 26 57, 26 65 L26 85 M21 52 C23.5 52, 25 50.5, 25 48 C25 45.5, 23.5 44, 21 44 C18.5 44, 17 45.5, 17 48 C17 50.5, 18.5 52, 21 52 Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Communication Line */}
                      <path d="M26 54 L36 48" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
                      <polygon points="36,48 31,48 34,51" fill="#ef4444" />
                    </svg>
                  </div>

                  {/* Node Connector representation */}
                  <div className="relative w-full h-6 items-center justify-center hidden lg:flex">
                    <div className="w-3.5 h-3.5 rounded-full bg-blue-500 border-4 border-white shadow-md z-10 group-hover:scale-125 transition-transform" />
                  </div>

                  {/* Titles & Copy */}
                  <div className="space-y-2 mt-2">
                    <h4 className="text-base sm:text-lg font-black text-zinc-950 font-sans tracking-tight">
                      원격 모니터링 및 스케줄링
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-sans font-medium">
                      ‘언제’, ‘어디서든’ 스마트폰 앱을 통하여 각종 기기의 원격 모니터링 제어가 가능하고 스케줄링이 가능합니다.
                    </p>
                  </div>
                </motion.div>

                {/* Timeline Card 4 */}
                <motion.div 
                  whileHover={{ y: -6, backgroundColor: "rgba(255,255,255,0.95)" }}
                  className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-zinc-200/60 shadow-sm flex flex-col justify-between min-h-[310px] transition-all duration-300 group text-left"
                >
                  {/* SVG Illustration: 손쉬운 도입 시스템 */}
                  <div className="h-28 flex items-center justify-center select-none">
                    <svg className="w-20 h-20 text-blue-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Cozy chair with laptop user */}
                      <path d="M15 65 L10 80 L30 80 L25 65 Z" fill="#e2e8f0" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 45 L12 65 C12 70, 28 70, 28 65 L28 45" stroke="currentColor" strokeWidth="2" />
                      
                      {/* Laptop overlay */}
                      <path d="M24 55 L38 55 L36 63 L22 63 Z" fill="currentColor" opacity="0.15" />
                      <line x1="22" y1="63" x2="38" y2="63" stroke="currentColor" strokeWidth="2" />

                      {/* Globe/Browser outline behind */}
                      <circle cx="65" cy="40" r="22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                      <path d="M43 40 L87 40 M65 18 L65 62" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                    </svg>
                  </div>

                  {/* Node Connector representation */}
                  <div className="relative w-full h-6 items-center justify-center hidden lg:flex">
                    <div className="w-3.5 h-3.5 rounded-full bg-blue-500 border-4 border-white shadow-md z-10 group-hover:scale-125 transition-transform" />
                  </div>

                  {/* Titles & Copy */}
                  <div className="space-y-2 mt-2">
                    <h4 className="text-base sm:text-lg font-black text-zinc-950 font-sans tracking-tight">
                      손쉬운 도입 시스템
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-sans font-medium">
                      사용자가 원하는 장소, 위치에 손쉽게 설치 가능하며, 인터넷이 연결된 곳이면 도입이 가능한 시스템 입니다.
                    </p>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* Image 2 Section: Key Features Interactive Layout */}
            <div className="space-y-8 pt-10 border-t border-zinc-100">
              
              {/* Header Texts */}
              <div className="space-y-2 text-left">
                <span className="text-xs font-black uppercase tracking-wider text-blue-600 font-mono">
                  IoT Service Key Features
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight leading-none">
                  빅데이터를 이용한 고객, 매장 맞춤형 솔루션
                </h3>
              </div>

              {/* Master Dashboard Split Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-4">
                
                {/* Left Columns (lg:col-span-5): Rounded categories with pills */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Category 1: 환경 관리 */}
                  <div className="bg-white border border-zinc-200 rounded-2xl p-4.5 space-y-3.5 shadow-sm">
                    <h5 className="text-xs sm:text-sm font-black text-blue-600 flex items-center gap-1.5 uppercase font-mono tracking-wider border-b border-zinc-100 pb-2 text-left">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      환경 관리 (Environmental Control)
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: '1-1', label: '공기질 센싱' },
                        { id: '1-2', label: '일산화탄소 센싱' },
                        { id: '1-3', label: '이산화탄소 센싱' },
                        { id: '1-4', label: '습도 센싱' }
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setActiveIotPill(p.id)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-black transition-all duration-300 ${
                            activeIotPill === p.id
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-[1.02]'
                              : 'bg-zinc-50 border-zinc-200/80 text-zinc-700 hover:bg-zinc-100/60'
                          }`}
                        >
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-mono font-bold ${
                            activeIotPill === p.id ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-500'
                          }`}>
                            {p.id}
                          </span>
                          <span>{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category 2: HVAC 관리 */}
                  <div className="bg-white border border-zinc-200 rounded-2xl p-4.5 space-y-3.5 shadow-sm">
                    <h5 className="text-xs sm:text-sm font-black text-amber-600 flex items-center gap-1.5 uppercase font-mono tracking-wider border-b border-zinc-100 pb-2 text-left">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      HVAC 관리 (Climate & Power Controls)
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: '3-1', label: 'On/Off 제어' },
                        { id: '3-2', label: '동작 스케줄링' },
                        { id: '3-3', label: '매장 모니터링' }
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setActiveIotPill(p.id)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-black transition-all duration-300 ${
                            activeIotPill === p.id
                              ? 'bg-amber-600 border-amber-600 text-white shadow-md scale-[1.02]'
                              : 'bg-zinc-50 border-zinc-200/80 text-zinc-700 hover:bg-zinc-100/60'
                          }`}
                        >
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-mono font-bold ${
                            activeIotPill === p.id ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-500'
                          }`}>
                            {p.id}
                          </span>
                          <span>{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category 3: 보안 관리 */}
                  <div className="bg-white border border-zinc-200 rounded-2xl p-4.5 space-y-3.5 shadow-sm">
                    <h5 className="text-xs sm:text-sm font-black text-rose-600 flex items-center gap-1.5 uppercase font-mono tracking-wider border-b border-zinc-100 pb-2 text-left">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      보안 관리 (Security NOC)
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: '2-1', label: '화재 및 전압 관리' },
                        { id: '2-2', label: '출입문 관리' },
                        { id: '2-3', label: '움직임 관리' }
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setActiveIotPill(p.id)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-black transition-all duration-300 ${
                            activeIotPill === p.id
                              ? 'bg-rose-600 border-rose-600 text-white shadow-md scale-[1.02]'
                              : 'bg-zinc-50 border-zinc-200/80 text-zinc-700 hover:bg-zinc-100/60'
                          }`}
                        >
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-mono font-bold ${
                            activeIotPill === p.id ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-500'
                          }`}>
                            {p.id}
                          </span>
                          <span>{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Columns (lg:col-span-7): Interactive 3D Café Map with Coordinate Hotspots */}
                <div className="lg:col-span-7 space-y-4">
                  
                  {/* Map frame */}
                  <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-zinc-200 bg-white p-2">
                    <div className="relative overflow-hidden rounded-xl bg-zinc-950 aspect-[5/3]">
                      <img 
                        src={smartIotThumbnail} 
                        alt="3D Store Isometric Map"
                        className="w-full h-full object-cover select-none"
                        referrerPolicy="no-referrer"
                      />

                      {/* Coordinate Hotspot Badges Overlays */}
                      {[
                        { id: '1-1', top: '33%', left: '80%' },
                        { id: '1-2', top: '26%', left: '82.5%' },
                        { id: '1-3', top: '16%', left: '76%' },
                        { id: '1-4', top: '37%', left: '87.5%' },
                        { id: '2-1', top: '20%', left: '79%' },
                        { id: '2-2', top: '33%', left: '58%' },
                        { id: '2-3', top: '38%', left: '68%' },
                        { id: '3-1', top: '29%', left: '64%' },
                        { id: '3-2', top: '63%', left: '54%' },
                        { id: '3-3', top: '64%', left: '73%' }
                      ].map((badge) => {
                        const isSelected = activeIotPill === badge.id;
                        const isSecurityAlert = badge.id === '2-1';
                        
                        return (
                          <button
                            key={badge.id}
                            onClick={() => setActiveIotPill(badge.id)}
                            style={{ top: badge.top, left: badge.left }}
                            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                          >
                            <div className="relative flex items-center justify-center">
                              {/* Glowing Ping Rings for selected active item */}
                              {isSelected && (
                                <span className={`absolute -inset-2 rounded-full border-2 animate-ping opacity-75 pointer-events-none ${
                                  badge.id.startsWith('1-') ? 'border-blue-400' : badge.id.startsWith('2-') ? 'border-rose-400' : 'border-amber-400'
                                }`} />
                              )}
                              
                              {/* Flashing alert dot for 2-1 (Fire / Voltage) */}
                              {isSecurityAlert && (
                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-white animate-pulse" />
                              )}

                              {/* Central badge circle */}
                              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border text-[9px] sm:text-[10px] font-black font-mono flex items-center justify-center shadow-md transition-all duration-300 hover:scale-115 ${
                                isSelected
                                  ? badge.id.startsWith('1-')
                                    ? 'bg-blue-600 border-blue-600 text-white font-extrabold'
                                    : badge.id.startsWith('2-')
                                      ? 'bg-rose-600 border-rose-600 text-white font-extrabold'
                                      : 'bg-amber-500 border-amber-500 text-zinc-950 font-extrabold'
                                  : 'bg-white/95 border-zinc-300 text-zinc-700 hover:bg-white'
                              }`}>
                                {badge.id}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Selected Detail Panel Box underneath the map */}
                  <motion.div 
                    key={activeIotPill}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`border rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between text-left ${
                      activeIotPill.startsWith('1-')
                        ? 'bg-blue-50/40 border-blue-200'
                        : activeIotPill.startsWith('2-')
                          ? 'bg-rose-50/40 border-rose-200'
                          : 'bg-amber-50/30 border-amber-200'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-black font-mono uppercase tracking-wider ${
                          activeIotPill.startsWith('1-')
                            ? 'bg-blue-100 text-blue-800'
                            : activeIotPill.startsWith('2-')
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                        }`}>
                          ID: {activeIotPill}
                        </span>
                        <h4 className="text-base sm:text-lg font-black text-zinc-900 leading-none">
                          {iotPillDetails[activeIotPill]?.title}
                        </h4>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed font-sans font-medium">
                        {iotPillDetails[activeIotPill]?.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-zinc-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      
                      {/* Left: Metric info */}
                      <div className="flex items-center gap-2 text-xs font-bold text-zinc-650">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        <span>실시간 감지 데이터:</span>
                        <span className="text-zinc-900 font-mono text-xs">{iotPillDetails[activeIotPill]?.metric}</span>
                      </div>

                      {/* Right: Live Interactive toggles only for HVAC/Power controls (3-1, 3-2, etc) */}
                      {activeIotPill === '3-1' && (
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-bold text-zinc-500">배전 릴레이 스위치</span>
                          <button 
                            onClick={() => setPhonePowerOn(!phonePowerOn)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all shadow-sm ${
                              phonePowerOn 
                                ? 'bg-amber-500 text-zinc-950 hover:bg-amber-600' 
                                : 'bg-zinc-200 text-zinc-500 hover:bg-zinc-300'
                            }`}
                          >
                            {phonePowerOn ? 'ON (전원 차단하기)' : 'OFF (전원 공급하기)'}
                          </button>
                        </div>
                      )}

                    </div>
                  </motion.div>

                </div>

              </div>
            </div>

            {/* Deep Dive Call to Action Area */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-[#ecf5fc] rounded-[32px] p-8 sm:p-12 border border-blue-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 items-center">
                
                <div className="lg:col-span-2 space-y-4 text-left">
                  <h4 className="text-xl sm:text-2xl font-black text-zinc-950 font-sans">
                    오프라인 매장 맞춤형 IoT 솔루션 도입하기
                  </h4>
                  <p className="text-sm text-zinc-650 leading-relaxed font-sans font-medium">
                    식음료 매장, 카페, 프랜차이즈, 사무실 등 모든 상업 공간에 최적화된 기기 연동과 맞춤 시나리오 제어 서비스를 누리실 수 있습니다. 언제든지 전문 엔지니어가 무료 설계 상담을 지원합니다.
                  </p>
                </div>

                <div className="flex justify-start md:justify-end">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
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
                    src={operationServiceThumbnail} 
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
