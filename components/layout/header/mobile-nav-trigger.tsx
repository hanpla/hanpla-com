import MenuIcon from "@/components/icons/menu-icon";
import ThemeToggle from "@/components/ui/theme-toggle";

interface MobileNavTriggerProps {
  toggleMenu: () => void;
}

const MobileNavTrigger = ({ toggleMenu }: MobileNavTriggerProps) => (
  <div className="flex items-center gap-2 md:hidden">
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

export default MobileNavTrigger;
