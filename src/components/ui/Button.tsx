import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
}

export default function Button({ 
  children, 
  className, 
  loading, 
  loadingText,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading ? loadingText : children}
    </button>
  );
}