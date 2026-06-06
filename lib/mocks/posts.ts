export interface MockPost {
  id: number;
  title: string;
  content: string;
  author: string;
  views: number;
  likes: number;
  comments_count: number;
  created_at: string; // ISO String format
}

// Helper to create dates relative to now
const getRelativeDateISO = (
  minutesOffset: number = 0,
  hoursOffset: number = 0,
  daysOffset: number = 0
): string => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutesOffset);
  date.setHours(date.getHours() - hoursOffset);
  date.setDate(date.getDate() - daysOffset);
  return date.toISOString();
};

export const MOCK_POSTS: MockPost[] = [
  {
    id: 1,
    title: "React 19에서 변경된 주요 기능을 정리해 보았습니다",
    content:
      "이번 React 19 업데이트에서 useActionState 훅과 use 최적화, Server Actions 가 큰 변화를 가져왔습니다. 자세한 사용법을 정리했으니 참고하세요.",
    author: "리액트마스터",
    views: 142,
    likes: 12,
    comments_count: 5,
    created_at: getRelativeDateISO(5), // 5 minutes ago (Today)
  },
  {
    id: 2,
    title: "Next.js 16과 Turbopack 빌드 속도 비교 후기",
    content:
      "Turbopack을 적용했을 때의 로컬 컴파일 시간과 기존 Webpack 대비 차이점을 공유합니다. 확실히 체감이 되는 속도 차이를 보이고 있네요.",
    author: "넥스트러버",
    views: 89,
    likes: 8,
    comments_count: 3,
    created_at: getRelativeDateISO(0, 2), // 2 hours ago (Today)
  },
  {
    id: 3,
    title: "Supabase SSR 연동 시 쿠키 갱신 이슈 질문입니다",
    content:
      "createServerClient를 사용할 때 미들웨어에서 쿠키 세션이 정상적으로 갱신되지 않고 만료되는 현상이 있습니다. 혹시 해결해보신 분 계신가요?",
    author: "개발초보",
    views: 53,
    likes: 2,
    comments_count: 8,
    created_at: getRelativeDateISO(0, 18), // 18 hours ago (Today)
  },
  {
    id: 4,
    title: "초보자를 위한 Tailwind CSS 반응형 디자인 꿀팁 5가지",
    content:
      "모바일 우선주의 디자인 패턴, sm/md/lg 분기점 설정 요령, 그리고 커스텀 테마를 쉽게 구성하는 방법을 핵심만 추려 전달합니다.",
    author: "퍼블리셔J",
    views: 210,
    likes: 19,
    comments_count: 12,
    created_at: getRelativeDateISO(0, 0, 1), // Yesterday
  },
  {
    id: 5,
    title: "Vercel 배포 시 캐싱 전략에 대해 고민이 있습니다",
    content:
      "정적 페이지와 동적 페이지의 캐시 라이프사이클을 어떻게 조화롭게 튜닝해야 하는지, 특히 CDN 레벨에서의 Revalidate 주기에 대한 경험을 여쭙니다.",
    author: "인프라요정",
    views: 75,
    likes: 4,
    comments_count: 2,
    created_at: getRelativeDateISO(0, 0, 2), // 2 days ago
  },
  {
    id: 6,
    title: "TypeScript 5.x 신규 데코레이터 적용해보신 분?",
    content:
      "새롭게 표준 사양에 부합하게 개편된 5.x 데코레이터를 적용하려는데, 기존 legacy decorator 옵션과의 충돌이나 실제 운영 환경의 번들 이슈가 궁금합니다.",
    author: "타입매니아",
    views: 104,
    likes: 5,
    comments_count: 6,
    created_at: getRelativeDateISO(0, 0, 3), // 3 days ago
  },
  {
    id: 7,
    title: "웹 앱 접근성(A11y) 개선을 위해 지켜야 할 체크리스트",
    content:
      "WAI-ARIA 규격 준수, 스크린 리더 친화적인 마크업 작성 팁, 시각적 대비 확보를 위해 가장 먼저 챙겨야 할 실무 팁들을 나열해 보았습니다.",
    author: "디자이너K",
    views: 62,
    likes: 3,
    comments_count: 1,
    created_at: getRelativeDateISO(0, 0, 5), // 5 days ago
  },
  {
    id: 8,
    title: "Zustand와 Jotai 중 어떤 전역 상태 라이브러리를 선호하시나요?",
    content:
      "단순하고 유연한 Flux 패턴의 Zustand와 아토믹 기반의 세밀한 Jotai 중에서, 대규모 프로젝트를 구축할 때의 각각의 장단점을 토론해 보고 싶습니다.",
    author: "아키텍트",
    views: 177,
    likes: 15,
    comments_count: 14,
    created_at: getRelativeDateISO(0, 0, 7), // 7 days ago
  },
];
