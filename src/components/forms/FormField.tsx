import { useFormContext } from 'react-hook-form';
import Input from '../ui/Input';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  placeholder?: string;
}

export default function FormField({
  name,
  label,
  type = 'text',
  required = false,
  ...props
}: FormFieldProps) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Input
        id={name}
        type={type}
        {...register(name)}
        label={label}
        className="mt-1"
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}