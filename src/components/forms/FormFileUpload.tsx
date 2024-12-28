import { useFormContext } from 'react-hook-form';
import { Upload } from 'lucide-react';
import { useState } from 'react';

interface FormFileUploadProps {
  name: string;
  label: string;
  required?: boolean;
  accept?: string;
  helperText?: string;
}

export default function FormFileUpload({
  name,
  label,
  required = false,
  accept,
  helperText,
}: FormFileUploadProps) {
  const { register, formState: { errors }, watch } = useFormContext();
  const error = errors[name]?.message as string;
  const file = watch(name)?.[0];
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          {file ? (
            <div className="text-sm text-gray-600">
              <p className="font-medium text-indigo-600">{file.name}</p>
              <p className="mt-1">({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor={name}
                  className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id={name}
                    type="file"
                    className="sr-only"
                    accept={accept}
                    {...register(name)}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
            </>
          )}
          {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}