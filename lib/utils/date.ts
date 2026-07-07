/**
 * 날짜 문자열을 상대적 시간(N분 전, N시간 전) 또는 절대적 날짜 형식으로 변환합니다.
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffMins < 60) {
    return `${Math.max(1, diffMins)}분 전`;
  }
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }
  return date.toLocaleDateString("ko-KR", {
    month: "numeric",
    day: "numeric",
  });
};
