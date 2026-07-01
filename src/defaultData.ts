/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiteSettings, ServiceItem, PortfolioItem, BlogPost, Inquiry } from './types';

export const DEFAULT_SETTINGS: SiteSettings = {
  metaTitle: "tunemedia | 오프라인 공간 디지털 트랜스포메이션(DT) 전문 에이전시",
  metaDescription: "툰미디어는 디지털 사이니지, AI 비전 분석, IoT 연동 센서 등을 활용하여 오프라인 매장 및 복합문화공간의 혁신적인 디지털 트랜스포메이션을 제공합니다.",
  metaKeywords: "tunemedia, 툰미디어, 공간DT, 디지털트랜스포메이션, 디지털사이니지, AI비전, 매장분석, IoT센서, 스마트공간",
  ogImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
  logoText: "tunemedia",
  logoSubText: "space DT solutions",
  accentColor: "#2563EB", // Blue-600
  fontFamily: "sans",
  heroBadge: "OFFLINE SPACE DIGITAL TRANSFORMATION",
  heroTitle: "고객과 함께 오프라인 공간의 가치를 높입니다.",
  heroSubtitle: "Tuning every moment with Tune Media_",
  heroCtaText: "전문 솔루션 문의하기",
  heroImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
  companyName: "주식회사 툰미디어 (tunemedia Co., Ltd.)",
  ceo: "인천지점대표 이순미",
  address: "인천광역시 남동구 청능대로 559, 4층 4556호 (논현동, 논현메디컬센터)",
  phone: "010-9654-9882",
  email: "tunemediaincheon@gmail.com",
  registrationNumber: "211-88-80505"
};

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "signage",
    title: "스마트 디지털 사이니지",
    description: "공간의 격을 높이는 초고화질 대화형 미디어 월 및 원격 콘텐츠 스케줄링 관리 클라우드",
    iconName: "Tv",
    bgGradient: "from-blue-500/10 via-blue-50/10 to-white",
    details: [
      "초대형 무안경 3D 아나몰픽 미디어 월 콘텐츠 제작 및 하드웨어 인프라 구축",
      "실시간 스케줄링 및 지능형 화면 분할이 가능한 자체 독자 개발 클라우드 CMS 제공",
      "날씨, 혼잡도, 주요 이벤트 등 외부 공공 데이터 API 연동 실시간 반응형 미디어 표출",
      "대화형 키오스크 및 터치스크린과 모바일 웹 연계형 실감형 인터랙티브 캠페인 기획"
    ]
  },
  {
    id: "vision",
    title: "AI 비전 공간 분석 솔루션",
    description: "비식별 행동 정밀 추적으로 고객 동선, 체류 시간, 인구통계학적 요소를 실시간 분석하는 테크",
    iconName: "Eye",
    bgGradient: "from-indigo-500/10 via-indigo-50/10 to-white",
    details: [
      "CCTV 및 특수 비전 센서를 활용한 방문자 성별·연령대 추정 (개인 식별 없는 완벽한 개인정보 비식별화)",
      "구역별 체류 시간, 관심 상품 앞 응시 지속 시간, 동선 병목 현상 정밀 트래킹 열지도(Heatmap)",
      "매장 이벤트 전후 유입률 및 전환율을 정량 지표로 측정하여 공간 운영 효율 최적화 보고서 발행",
      "유동인구 분석 결과를 스마트 사이니지와 연계하여 타겟 기반 실시간 상품 추천 팝업 광고 실현"
    ]
  },
  {
    id: "iot",
    title: "IoT 스마트 공간 최적화",
    description: "센서 네트워크 기반 조명, 실내 기후, 혼잡도를 자동 제어하는 무선 공간 효율 극대화 솔루션",
    iconName: "Cpu",
    bgGradient: "from-sky-500/10 via-sky-50/10 to-white",
    details: [
      "무선 메시 센서망(조도, 온도, 습도, CO2, 미세먼지)을 이용한 매장 전체 실시간 상태 모니터링",
      "공간 혼잡도에 따라 냉난방 및 환기 설비를 조절하여 에너지 사용량 최대 35% 이상 자동 절감",
      "동선 분석 결과와 연계해 특정 존의 방문 밀도에 대응한 가변 조명 시나리오 자동 연동",
      "원격 시설 이상 동작 감지 및 스마트 점검 정기 알림 등 통합 시설물 안전 진단 대시보드"
    ]
  }
];

export const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  {
    id: "p1",
    title: "더 현대 서울 플래그십 존 공간 DT",
    category: "AI Vision & IoT Integration",
    client: "현대백화점 주식회사",
    location: "서울 영등포구 여의도동",
    description: "더 현대 서울의 메인 홀 플래그십 존에 AI 비전 정밀 센서와 대형 미디어 아트를 유기적으로 융합했습니다. 실시간 매장 대기 인원을 추적하여 혼잡도를 미디어 가변 효과로 표현하고, 실시간 실내 오염도 측정에 맞추어 냉난방 공조 설비를 가동하여 쾌적한 프리미엄 쇼핑 환경을 자동 보장합니다.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200",
    date: "2026-03-15",
    tags: ["AI비전", "미디어아트", "IoT에너지세이빙", "혼잡도트래킹"]
  },
  {
    id: "p2",
    title: "서울역 대합실 초대형 스마트 미디어 월 플랫폼",
    category: "Digital Signage",
    client: "한국철도공사 (KORAIL)",
    location: "서울 용산구 서울역",
    description: "서울역의 중앙 맞이방에 가로 30M, 세로 4M 규모의 하이엔드 LED 스마트 미디어 월을 설치하고, 열차 일정 정보 API와 독자 CMS 플랫폼을 연동했습니다. 긴급 안내 자막 실시간 자동 표출 및 시기별 광고 콘텐츠 스케줄을 원격 모바일 앱으로 1초 만에 수정 및 통합 배포 제어할 수 있습니다.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
    date: "2026-01-20",
    tags: ["초대형LED", "클라우드CMS", "실시간통합제어", "공공정보연동"]
  },
  {
    id: "p3",
    title: "성수동 무신사 컴파운드 IoT 인터랙티브 공간",
    category: "IoT & Interaction",
    client: "무신사 테라스",
    location: "서울 성동구 성수동",
    description: "MZ 세대가 선호하는 성수 복합문화공간에 스마트 인터랙션을 도입했습니다. 매장에 배치된 AI 카메라가 내방객의 아우터 스타일과 무드를 인식해 스마트 거울과 사이니지에 맞춤형 스타일링 및 착장 제안 숏폼을 자동으로 띄우고, 착용 부스 안의 조명 색상을 스마트 연출 모드로 변경시킵니다.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
    date: "2025-11-05",
    tags: ["지능형피팅", "스마트조명", "상호작용", "큐레이션"]
  },
  {
    id: "p4",
    title: "성수 플래그십 아모레 스토어 리테일 테크",
    category: "AI Vision & Signage",
    client: "아모레퍼시픽 주식회사",
    location: "서울 성동구 성수동",
    description: "아모레퍼시픽 매장 입구 및 셀프 테스트 구역에 AI 시각 추적 장치를 도입하여, 고객들이 손에 쥐는 화장품 품목의 반응 분석률을 데이터화했습니다. 방문자가 특정 브랜드를 선택하는 순간 그 브랜드 스토리를 후면 사이니지가 즉시 감지하여 풍부하게 큐레이션합니다.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    date: "2025-08-12",
    tags: ["리테일테크", "AI비전", "화장품반응센서", "스토리미디어"]
  }
];

export const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: "b1",
    title: "2026 오프라인 리테일 테크의 메가 트렌드: '공간 DT'의 필요성",
    summary: "더 이상 단순한 판매 매장은 경쟁력이 없습니다. 온라인이 줄 수 없는 실감형 경험을 극대화하는 공간 디지털화와 오프라인 데이터 수집의 핵심 비결을 알아봅니다.",
    content: "온라인 이커머스의 비약적인 성장은 역설적으로 오프라인 매장의 정의를 완전히 뒤바꿔 놓았습니다. 이제 소비자들은 단순한 상품 구매가 아닌, 오감을 자극하는 독점적이고 독창적인 '브랜드 경험'을 위해 매장을 찾습니다.\n\n툰미디어가 제안하는 '공간 DT(Digital Transformation)'는 오프라인 매장 전면에 아름다운 디지털 사이니지를 구축하는 시각적 변화에 머무르지 않습니다. 무선 IoT 환경 분석과 정교한 AI 비전 카메라 시스템이 그 밑단에 유기적으로 연결될 때, 공간은 지능을 가진 존재처럼 실시간으로 고객에게 반응하게 됩니다.\n\n예컨대 방문객들의 밀도와 움직임을 열지도(Heatmap)로 실시간 포착하여, 유난히 동선이 붐비는 코너에는 모바일 팝업 할인 쿠폰을 자동 발송하거나 사이니지 화면을 이벤트 모드로 자동 가변 송출합니다. 동시에 그 존의 에어컨 온도를 낮춰 쾌적한 쇼핑 지수를 조절하는 것이 진정한 데이터 기반 공간 스마트화의 예시입니다. 대기업들이 앞다투어 공간 DT에 공격적인 투자를 감행하는 이유가 바로 여기에 있습니다.",
    author: "김태혁 수석 연구원",
    date: "2026-06-18",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
    tags: ["공간DT", "리테일테크", "트렌드", "오프라인혁신"],
    category: "트렌드 리포트",
    views: 421
  },
  {
    id: "b2",
    title: "개인정보 침해 없는 AI 비전 매장 동선 분석 시스템 가이드",
    summary: "카메라 기반 분석 기술의 대두와 함께 제기되는 프라이버시 염려를 완벽하게 해소하는 '엣지 기반 비식별 행동 인지 솔루션'의 신뢰성과 구조적 안정성을 분석합니다.",
    content: "리테일 점주와 대기업 브랜드 디렉터가 AI 비전 도입을 고려할 때 가장 먼저 우려하는 부분은 단연 '개인정보 보호법 및 고객의 심리적 저항감'입니다.\n\n툰미디어의 AI 비전 솔루션은 이러한 프라이버시 문제를 완벽히 해결하기 위해 하드웨어 '엣지 디바이스 단에서의 실시간 원천 비식별 처리(On-Device Realtime Anonymization)'를 수행합니다.\n\n카메라에서 수집된 원본 영상은 외부 서버나 인터넷 망으로 일절 전송되지 않으며 가공되지 않은 얼굴 이미지나 특정 부위는 실시간 딥러닝 필터를 통해 좌표값, 성별 추정치, 연령대 그룹 코드(예: 'GROUP_20_MALE') 등 순수한 숫자 통계 데이터로 즉시 메타포맷팅됩니다. 가공이 끝난 영상 데이터는 즉각적으로 휘발성 메모리에서 완전히 영구 영점 처리되어 삭제됩니다.\n\n이를 통해 방문객은 자신의 안면 이미지가 어딘가에 녹화되거나 유출될 염려 없이 마음껏 매장을 탐색할 수 있으며, 기업은 방문 패턴과 쇼핑 전환율을 정량화된 수치로 완벽히 정형화할 수 있게 됩니다.",
    author: "이지은 AI 테크 리드",
    date: "2026-05-10",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
    tags: ["AI비전", "개인정보보호", "엣지컴퓨팅", "기술분석"],
    category: "테크 리포트",
    views: 312
  },
  {
    id: "b3",
    title: "친환경 고효율 스마트 빌딩을 위한 무선 IoT 메시 센서망 도입 전략",
    summary: "리테일 공간의 고질적인 관리 요소인 높은 냉난방 전력비와 조명 유지 비용. 실시간 공간 유동인구 맞춤형 조절 시나리오로 에너지 효율을 최대 35% 아끼는 노하우.",
    content: "기후 위기 시대에 공간을 소유하고 운영하는 모든 비즈니스 운영자들에게 'ESG 경영 및 관리 비용 최적화'는 필수적인 어젠다가 되었습니다.\n\n인원 수 대비 지나치게 세게 가동되는 냉난방기, 혹은 아무도 머물지 않는데 대낮처럼 환히 켜진 외곽 조명 등은 매달 고정비 상승의 원인입니다. 툰미디어의 IoT 스마트 공간 자동화 솔루션은 저전력 무선 블루투스 메시(BLE Mesh) 기술을 토대로 매장의 모든 콘센트, 공조 장치, 조명을 중앙 지능형 코어와 통합시킵니다.\n\n특히 당사 AI 비전과 IoT 센서망의 '상호 연동 크로스 컨트롤'을 도입하면, 방문객 밀집도가 50% 미만인 시간대에는 구역별 조도를 자연 채광 밝기에 맞춰 최적 수준으로 조절하고, 매장 미운영 시간에는 불필요한 대기 전력을 완전 차단합니다. 24시간 공간을 직접 순찰하고 켜고 끌 필요 없이, 미리 정의된 소프트웨어 시나리오에 의해 조작되는 툰미디어의 무선 메시 솔루션으로 공간의 품격과 효율을 동시에 업그레이드 하십시오.",
    author: "박우진 하드웨어 아키텍트",
    date: "2026-04-28",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    tags: ["IoT", "스마트빌딩", "친환경에너지", "자동화센서"],
    category: "테크 리포트",
    views: 288
  }
];

export const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: "inq1",
    name: "박동준 본부장",
    email: "dj.park@lotteshopping.com",
    company: "롯데백화점 신규 MD팀",
    content: "명동 본점 영플라자 1층 로비 및 에스컬레이터 유휴 벽면에 가로 15미터 규모의 가변 반응형 무안경 3D 미디어 아트 월과 주변부 유동 인구 정밀 추적 AI Vision 솔루션을 함께 통합 도입하고 싶습니다. 견적 대략적인 안내와 공간 실사 가능한 일정이 어떻게 될까요?",
    date: "2026-06-29 14:20:10",
    status: "new"
  },
  {
    id: "inq2",
    name: "한예슬 대표",
    email: "yeseul@moodandspace.co.kr",
    company: "무드앤스페이스 성수",
    content: "이번 8월에 새로 오픈하는 프라이빗 디자인 복합 매장에 방문객 행동을 분석해 음악 분위기가 가변적으로 조절되고 전용 태블릿 키오스크로 의류 큐레이션 추천이 들어가는 IoT 융합 세팅이 궁금합니다. 소규모 매장에도 견적 범위 내로 패키지 구성이 가능한지 여쭤봅니다.",
    date: "2026-06-28 09:11:45",
    status: "read"
  }
];
