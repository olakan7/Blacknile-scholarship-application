import Image from './ui/Image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-4">
          <Image
            src="https://blacknile.net/wp-content/uploads/2022/12/BLACKNILE__2_-removebg-preview.png"
            alt="The Blacknile Foundation Logo"
            className="h-12 w-auto"
          />
          <p className="text-sm text-white">
            © {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}