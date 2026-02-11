interface LayoutProps {
  children: React.ReactNode;
  onClose: () => void;
}

export function ModalLayout({ children, onClose }: LayoutProps) {
  return (
    <div
      className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm flex justify-center items-start pt-20 md:pt-40"
      onClick={onClose}
    >
      {children}
    </div>
  );
}

export function ModalContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full max-w-xl mx-4 bg-white rounded-2xl shadow-2xl p-6 overflow-hidden ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}
