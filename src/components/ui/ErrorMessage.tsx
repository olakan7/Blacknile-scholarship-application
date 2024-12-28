interface ErrorMessageProps {
  message: string | null;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="text-sm text-red-700">{message}</div>
    </div>
  );
}