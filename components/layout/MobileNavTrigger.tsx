import ThemeToggle from "@/components/ui/ThemeToggle";
import MenuIcon from "@/components/icons/MenuIcon";

interface MobileNavTriggerProps {
  toggleMenu: () => void;
}

export default function MobileNavTrigger({ toggleMenu }: MobileNavTriggerProps) {
  return (
    <div className="flex items-center gap-3 md:hidden">
      <ThemeToggle />
      <button
        onClick={toggleMenu}
        className="hover:text-foreground dark:hover:text-foreground cursor-pointer rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900/60"
        aria-label="Open menu"
      >
        <MenuIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
