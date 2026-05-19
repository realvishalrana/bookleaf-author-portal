interface Props {
  message?: string;
}

export function EmptyState({ message = "No items found." }: Props) {
  return <p className="text-slate-600">{message}</p>;
}
