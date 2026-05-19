interface Props {
  message?: string;
  className?: string;
}

export function LoadingState({ message = "Loading…", className = "" }: Props) {
  return (
    <p className={`text-slate-600 ${className}`.trim()}>{message}</p>
  );
}
