'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b-4 border-[#7A8866] shadow-sm">
      {/* Top Bar with Journal Name */}
      <div className="bg-gradient-to-r from-[#7A8866] to-[#5A6846] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="block hover:opacity-90 transition-opacity">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold mb-1">
              Journal of Basic Writing
            </h1>
            <p className="text-sm text-green-100">
              Published by Baruch College, CUNY • ISSN 0147-1635
            </p>
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-between w-full">
              <div className="flex items-center space-x-1">
                <Link
                  href="/"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-800 hover:bg-green-50 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-800 hover:bg-green-50 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/submit"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-800 hover:bg-green-50 transition-colors"
                >
                  Submit
                </Link>
                <Link
                  href="/archive"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-800 hover:bg-green-50 transition-colors"
                >
                  Archive
                </Link>
              </div>
              <Link
                href="/search"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-800 hover:bg-green-50 transition-colors"
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
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/submit"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Submit
              </Link>
              <Link
                href="/archive"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Archive
              </Link>
              <Link
                href="/search"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-800"
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
