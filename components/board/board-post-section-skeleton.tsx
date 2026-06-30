interface BoardPostSectionSkeletonProps {
  showFilter?: boolean;
}

const BoardPostSectionSkeleton = (props: BoardPostSectionSkeletonProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { showFilter } = props;
  // 실제 목록 영역이 채울 예상 높이(최소 700px)를 고정 확보한 투명한 자리표시 컨테이너입니다.
  // 캐시가 즉시 응답하므로 회색 뼈대 노이즈를 렌더링하기보다 빈 영역만 확보해두어 번쩍임(Layout Shift)을 원천 차단합니다.
  return <div className="min-h-[700px] w-full bg-transparent" />;
};

export default BoardPostSectionSkeleton;
