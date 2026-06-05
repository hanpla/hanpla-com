import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="bg-background text-foreground flex flex-1 flex-col items-center justify-center p-6 transition-colors duration-300 sm:p-12 md:p-24">
      <main className="flex max-w-2xl flex-col items-center gap-6 text-center">
        <h1 className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl dark:from-zinc-100 dark:to-zinc-400">
          hanpla.com
        </h1>
        <p className="max-w-md text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
          반응형 헤더 컴포넌트 추가 및 테마 설정이 정상적으로 로드되었습니다.
        </p>
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/30">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            화면 하단에서도 다크 모드를 테스트해 보세요:
          </span>
          <ThemeToggle />
        </div>
      </main>
    </div>
  );
}
