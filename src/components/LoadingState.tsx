interface Props {
  message?: string;
  className?: string;
}

export function LoadingState({
  message = "Loading…",
  className = "text-sm text-slate-600",
}: Props) {
  return <p className={className}>{message}</p>;
}
