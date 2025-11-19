import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-sm text-gray-600 space-y-2">
          <p>
            <strong>Journal of Basic Writing</strong> | ISSN 0147-1635
          </p>
          <p>
            Published by Baruch College, CUNY
          </p>
          <p>
            © 1976–{new Date().getFullYear()} City University of New York. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 pt-4">
            <Link href="/about" className="text-[#4A5838] hover:underline">
              About
            </Link>
            <span className="text-gray-400">|</span>
            <a
              href="https://wac.colostate.edu/jbw/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4A5838] hover:underline"
            >
              Original Archive
            </a>
            <span className="text-gray-400">|</span>
            <Link href="/about#contact" className="text-[#4A5838] hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
