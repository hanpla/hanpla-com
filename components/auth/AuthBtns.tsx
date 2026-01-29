// Icons
import { Loader2 } from "lucide-react";

export default function AuthBtn({
  isPending,
  text,
}: {
  isPending: boolean;
  text: string;
}) {
  return (
    <button
      className={`
        w-full font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2
        ${
          isPending
            ? "bg-neutral-400 cursor-not-allowed"
            : "bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.98]"
        }
      `}
      type="submit"
      disabled={isPending}
    >
      {isPending ? (
        <>
          {text} 중...
          <Loader2 className="w-5 h-5 animate-spin" />
        </>
      ) : (
        text
      )}
    </button>
  );
}
