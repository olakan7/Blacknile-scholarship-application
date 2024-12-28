import { GraduationCap } from 'lucide-react';
import { ReactNode } from 'react';
import Footer from '../Footer';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="flex justify-center">
              <GraduationCap className="h-12 w-12 text-indigo-600" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {title}
            </h2>
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}