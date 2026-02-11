export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <header className="border-b border-neutral-200">{children}</header>;
}
