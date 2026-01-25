interface Props {
  text: string;
  height: number;
}

export default function EmptyList({ text, height }: Props) {
  return (
    <div
      style={{ height: `${height}px` }}
      className="text-neutral-400 text-sm flex items-center justify-center"
    >
      {text}
    </div>
  );
}
