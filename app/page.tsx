import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 bg-background text-foreground transition-colors duration-300">
      <main className="flex flex-col items-center gap-6 max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          hanpla.com
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          초기화 및 프리텐다드 폰트 설정이 완료되었습니다.
        </p>
        <div className="mt-2">
          <ThemeToggle />
        </div>
      </main>
    </div>
  );
}
