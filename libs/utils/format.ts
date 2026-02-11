import { AbbrSearchParams } from "../types/board";

type DateInput = string | number | Date;

export function normalize(text: string) {
  return text.replace(/\s+/g, "").toLowerCase();
}

export function maskIp(userIp: string) {
  const maskedIp = userIp.split(".").slice(0, 2).join(".");
  return maskedIp;
}

export const formatDate = {
  // 1. 기본 날짜: 2025. 12. 26.
  simple: (date: DateInput) => {
    return new Intl.DateTimeFormat("ko-KR", {
      dateStyle: "medium",
    }).format(new Date(date));
  },

  // 2. 상세 시간 포함: 2025. 12. 26. 18:29
  full: (date: DateInput) => {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false, // 24시간제 적용
    }).format(new Date(date));
  },

  // 3. 상대적 시간: 방금 전, 5분 전, 3시간 전
  relative: (date: DateInput) => {
    const now = new Date();
    const target = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);

    if (diffInSeconds < 60) return "방금 전";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}시간 전`;

    // 하루 이상 지나면 그냥 날짜 표시
    return formatDate.full(date);
  },

  // 4. 요일 포함: 2025. 12. 26. (금)
  withDay: (date: DateInput) => {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "short",
    }).format(new Date(date));
  },

  onlyHour: (date: DateInput) => {
    const now = new Date();
    const target = new Date(date);

    // 날짜가 같은지 확인 (연, 월, 일 비교)
    const isToday =
      now.getFullYear() === target.getFullYear() &&
      now.getMonth() === target.getMonth() &&
      now.getDate() === target.getDate();

    if (isToday) {
      return new Intl.DateTimeFormat("ko-KR", {
        timeStyle: "short",
        hour12: false,
      }).format(target);
    } else {
      return new Intl.DateTimeFormat("ko-KR", {
        month: "numeric",
        day: "numeric",
      }).format(target);
    }
  },
};

export function formatAbbrSearchParams(search: {
  [key: string]: string | undefined;
}) {
  return {
    page: Number(search.page || 1),
    likeCount: Number(search.likeCount || 0),
    searchType: search.searchType,
    postSearch: search.postSearch,
  };
}

export function formatIp(ip: string) {
  const formatedIp = ip.replace(/^(\d+\.\d+).+/, "$1");

  return formatedIp;
}
