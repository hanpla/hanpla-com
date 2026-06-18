import Logo from "@/components/ui/logo";

interface AuthHeaderProps {
  title: string;
}

const AuthHeader = ({ title }: AuthHeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Logo className="text-3xl font-extrabold tracking-wider" />

      <h1 className="mt-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h1>
    </div>
  );
};

export default AuthHeader;
