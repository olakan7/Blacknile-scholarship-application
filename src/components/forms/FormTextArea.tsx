import { useFormContext } from 'react-hook-form';

interface FormTextAreaProps {
  name: string;
  label: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
}

export default function FormTextArea({
  name,
  label,
  required = false,
  rows = 6,
  placeholder,
}: FormTextAreaProps) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        {...register(name)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}