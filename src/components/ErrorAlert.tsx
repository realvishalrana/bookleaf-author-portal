interface Props {
  message: string;
  className?: string;
}

export function ErrorAlert({ message, className = "mt-4" }: Props) {
  return (
    <p
      className={`rounded-md bg-red-50 px-4 py-2 text-sm text-red-600 ${className}`.trim()}
      role="alert"
    >
      {message}
    </p>
  );
}
