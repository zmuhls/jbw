'use client';

import Link from 'next/link';
import Image from 'next/image';
import coverImage from '@/img/cover.jpeg';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      {/* Photo Collage Header */}
      <div className="relative bg-[#1E5B8C]">
        <Link href="/" className="block hover:opacity-95 transition-opacity" aria-label="Home">
          <Image
            src={coverImage}
            alt="Journal of First-Year Writing header with portraits of notable writers and educators"
            priority
            sizes="100vw"
            className="w-full h-auto max-h-44 sm:max-h-52 md:max-h-60 lg:max-h-64 xl:max-h-72 object-contain"
          />
        </Link>
      </div>

      {/* Navigation Bar with gradient blend */}
      <nav className="bg-gradient-to-b from-[#2B5AA0]/20 via-[#2B5AA0]/10 to-white border-b border-gray-200" style={{
        background: 'linear-gradient(to bottom, rgba(43, 90, 160, 0.15) 0%, rgba(43, 90, 160, 0.08) 30%, rgba(255, 255, 255, 1) 70%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-between w-full">
              <div className="flex items-center space-x-1">
                <Link
                  href="/"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#2B5AA0] hover:bg-white/80 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#2B5AA0] hover:bg-white/80 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/submit"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#2B5AA0] hover:bg-white/80 transition-colors"
                >
                  Submit
                </Link>
                <Link
                  href="/archive"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#2B5AA0] hover:bg-white/80 transition-colors"
                >
                  Archive
                </Link>
              </div>
              <Link
                href="/search"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#2B5AA0] hover:bg-white/80 transition-colors"
              >
                Search
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-3 border-t border-gray-200">
              <Link
                href="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-white/80 hover:text-[#2B5AA0]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-white/80 hover:text-[#2B5AA0]"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/submit"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-white/80 hover:text-[#2B5AA0]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Submit
              </Link>
              <Link
                href="/archive"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-white/80 hover:text-[#2B5AA0]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Archive
              </Link>
              <Link
                href="/search"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-white/80 hover:text-[#2B5AA0]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Search
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
