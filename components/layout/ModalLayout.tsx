export default function ModalLayout({ onClose }: { onClose: () => void }) {
  return <div className="fixed inset-0 z-10 bg-black/10" onClick={onClose} />;
}
