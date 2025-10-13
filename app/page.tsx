import Link from 'next/link';
import { BookOpen, FileText, Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Browse */}
          <div className="journal-block">
            <div className="journal-block-title">Browse</div>
            <nav className="sidebar-nav py-2">
              <Link href="/archive">By Issue</Link>
              <Link href="/authors">By Author</Link>
              <Link href="/search">Search</Link>
            </nav>
          </div>

          {/* Current Issue */}
          <div className="journal-block">
            <div className="journal-block-title">Current Issue</div>
            <div className="p-4">
              <div className="text-xs text-gray-600 mb-2">Vol. 43 No. 2 (2024)</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Fall 2024</h3>
              <Link
                href="/archive"
                className="text-xs text-[#8B1A1A] hover:underline"
              >
                View Issue →
              </Link>
            </div>
          </div>

          {/* Information */}
          <div className="journal-block">
            <div className="journal-block-title">Information</div>
            <nav className="sidebar-nav py-2">
              <Link href="/about">About the Journal</Link>
              <Link href="/about#editorial-board">Editorial Board</Link>
              <Link href="/about#contact">Contact</Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          {/* Welcome Message */}
          <div className="bg-white border border-gray-300 p-6 mb-6">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              Journal of Basic Writing
            </h2>
            <div className="prose max-w-none font-serif text-gray-700">
              <p className="mb-4">
                The <em>Journal of Basic Writing</em> was founded in 1975 by Mina P.
                Shaughnessy at CUNY. Published by Baruch College, the journal is dedicated to research, theory, and pedagogy in basic writing and composition studies.
              </p>
              <p className="mb-4">
                For fifty years, JBW has published peer-reviewed scholarship on writing
                instruction, assessment, critical pedagogy, multilingual writing, and
                educational equity. The journal remains an essential resource for writing
                teachers, program administrators, and researchers worldwide.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-gray-300 p-4 text-center">
              <div className="text-3xl font-bold text-[#8B1A1A] mb-1">43</div>
              <div className="text-xs text-gray-600">Volumes</div>
            </div>
            <div className="bg-white border border-gray-300 p-4 text-center">
              <div className="text-3xl font-bold text-[#8B1A1A] mb-1">87</div>
              <div className="text-xs text-gray-600">Issues</div>
            </div>
            <div className="bg-white border border-gray-300 p-4 text-center">
              <div className="text-3xl font-bold text-[#8B1A1A] mb-1">709</div>
              <div className="text-xs text-gray-600">Articles</div>
            </div>
            <div className="bg-white border border-gray-300 p-4 text-center">
              <div className="text-3xl font-bold text-[#8B1A1A] mb-1">50</div>
              <div className="text-xs text-gray-600">Years</div>
            </div>
          </div>

          {/* Featured Content */}
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/archive"
              className="bg-white border border-gray-300 p-6 hover:border-[#8B1A1A] hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-3">
                <BookOpen className="h-5 w-5 text-[#8B1A1A] mr-2" />
                <h3 className="font-semibold text-gray-900">Archive</h3>
              </div>
              <p className="text-sm text-gray-600">
                Browse all 43 volumes from 1975 to 2024.
              </p>
            </Link>

            <Link
              href="/search"
              className="bg-white border border-gray-300 p-6 hover:border-[#8B1A1A] hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-3">
                <Search className="h-5 w-5 text-[#8B1A1A] mr-2" />
                <h3 className="font-semibold text-gray-900">Search</h3>
              </div>
              <p className="text-sm text-gray-600">
                Search across all articles by title, author, or keyword.
              </p>
            </Link>

            <Link
              href="/authors"
              className="bg-white border border-gray-300 p-6 hover:border-[#8B1A1A] hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-3">
                <FileText className="h-5 w-5 text-[#8B1A1A] mr-2" />
                <h3 className="font-semibold text-gray-900">Authors</h3>
              </div>
              <p className="text-sm text-gray-600">
                Explore works by hundreds of scholars in the field.
              </p>
            </Link>
          </div>

          {/* Publication Info */}
          <div className="bg-gray-100 border border-gray-300 p-6 mt-6">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Publication Information</h3>
            <dl className="text-sm space-y-2">
              <div className="flex">
                <dt className="font-medium text-gray-700 w-32">Publisher:</dt>
                <dd className="text-gray-600">Baruch College, CUNY</dd>
              </div>
              <div className="flex">
                <dt className="font-medium text-gray-700 w-32">ISSN:</dt>
                <dd className="text-gray-600">0147-1635</dd>
              </div>
              <div className="flex">
                <dt className="font-medium text-gray-700 w-32">Frequency:</dt>
                <dd className="text-gray-600">Semi-annual (Spring & Fall)</dd>
              </div>
              <div className="flex">
                <dt className="font-medium text-gray-700 w-32">Founded:</dt>
                <dd className="text-gray-600">1975</dd>
              </div>
            </dl>
          </div>
        </main>
      </div>
    </div>
  );
}
