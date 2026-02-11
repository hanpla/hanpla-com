// Components

import PageHeader from "../common/ui/PageHeader";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function AuthLayout({
  title,
  description,
  children,
}: AuthLayoutProps) {
  return (
    <div className="max-w-md mx-auto px-4 py-12 md:py-24">
      <div className="text-center mb-10">
        <PageHeader title={title} />
        <p className="text-neutral-500 text-sm mt-2">{description}</p>
      </div>
      {children}
    </div>
  );
}
