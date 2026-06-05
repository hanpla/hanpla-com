import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-12 md:p-24 bg-background text-foreground transition-colors duration-300">
      <main className="flex flex-col items-center gap-6 max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
          hanpla.com
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-md">
          반응형 헤더 컴포넌트 추가 및 테마 설정이 정상적으로 로드되었습니다.
        </p>
        <div className="mt-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-sm flex items-center gap-3">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">화면 하단에서도 다크 모드를 테스트해 보세요:</span>
          <ThemeToggle />
        </div>
      </main>
    </div>
  );
}
