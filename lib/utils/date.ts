export type DateFormatPattern =
  | "relative"
  | "YYYY.MM.DD"
  | "YYYY-MM-DD"
  | "YYYY.MM.DD HH:mm"
  | "MM.DD";

/**
 * 날짜 입력값(ISO 문자열, Date 객체, 타임스탬프)을 지정한 포맷 형식으로 변환합니다.
 *
 * @param dateInput 변환할 날짜 (string | Date | number | null | undefined)
 * @param pattern 포맷 패턴 ("relative" | "YYYY.MM.DD" | "YYYY-MM-DD" | "YYYY.MM.DD HH:mm" | "MM.DD")
 * @returns 포맷팅된 날짜 문자열
 */
export const formatDate = (
  dateInput: string | Date | number | null | undefined,
  pattern: DateFormatPattern = "relative"
): string => {
  if (!dateInput) return "";

  const date = typeof dateInput === "object" ? dateInput : new Date(dateInput);
  if (isNaN(date.getTime())) return "";

  if (pattern === "relative") {
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
    return `${date.getMonth() + 1}.${String(date.getDate()).padStart(2, "0")}`;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  switch (pattern) {
    case "YYYY.MM.DD":
      return `${year}.${month}.${day}`;
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    case "YYYY.MM.DD HH:mm":
      return `${year}.${month}.${day} ${hours}:${minutes}`;
    case "MM.DD":
      return `${month}.${day}`;
    default:
      return `${year}.${month}.${day}`;
  }
};
