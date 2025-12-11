import Link from 'next/link';
import { BookOpen, FileText, Search } from 'lucide-react';
import { getUniqueAuthorCount, getAllArticles, getAllVolumes, getAllIssues } from '@/lib/data';
import { isEditorialContent } from '@/lib/utils';

export default async function Home() {
  const [authorCount, articles, volumes, issues] = await Promise.all([
    getUniqueAuthorCount(),
    getAllArticles(),
    getAllVolumes(),
    getAllIssues()
  ]);
  const articleCount = articles.filter(a => !isEditorialContent(a.title)).length;
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
              <div className="text-xs text-gray-600 mb-2">Vol. 44 No. 1 (2025)</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Spring 2025</h3>
              <Link
                href="/archive"
                className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
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
              <Link href="/about#editorial-team">Editorial Team</Link>
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
              Journal of First-Year Writing
            </h2>
            <div className="prose max-w-none font-serif text-gray-700">
              <p className="mb-4">
                The Journal of First-Year Writing (formerly the Journal of Basic Writing), is dedicated to publishing research supporting equity and access to college through innovative writing and literacy instruction in first-year composition.
              </p>
              <p className="mb-4">
                Since its founding at the City University of New York in 1975, JFW (formerly known by the shorthand JBW) has published peer-reviewed scholarship on writing instruction, assessment, critical pedagogy, multilingual writing, and educational equity, and continues to be an important resource for writing instructors, administrators, and scholars worldwide.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white border border-gray-300 p-4 text-center">
              <div className="text-3xl font-bold mb-1"><span className="text-[#2B5AA0]">{volumes.length}</span></div>
              <div className="text-xs text-gray-600">Volumes</div>
            </div>
            <div className="bg-white border border-gray-300 p-4 text-center">
              <div className="text-3xl font-bold mb-1"><span className="text-[#2B5AA0]">{issues.length}</span></div>
              <div className="text-xs text-gray-600">Issues</div>
            </div>
            <div className="bg-white border border-gray-300 p-4 text-center">
              <div className="text-3xl font-bold mb-1"><span className="text-[#2B5AA0]">{articleCount}</span></div>
              <div className="text-xs text-gray-600">Articles</div>
            </div>
            <div className="bg-white border border-gray-300 p-4 text-center">
              <div className="text-3xl font-bold mb-1"><span className="text-[#2B5AA0]">{authorCount}</span></div>
              <div className="text-xs text-gray-600">Authors</div>
            </div>
            <div className="bg-white border border-gray-300 p-4 text-center">
              <div className="text-3xl font-bold mb-1"><span className="text-[#2B5AA0]">50</span></div>
              <div className="text-xs text-gray-600">Years</div>
            </div>
          </div>

          {/* Featured Content */}
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/archive"
              className="bg-white border border-gray-300 p-6 hover:border-[#2B5AA0] hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-3">
                <BookOpen className="h-5 w-5 text-[#2B5AA0] mr-2" />
                <h3 className="font-semibold text-gray-900">Archive</h3>
              </div>
              <p className="text-sm text-gray-600">
                Browse all {volumes.length} volumes from 1975 to 2025.
              </p>
            </Link>

            <Link
              href="/search"
              className="bg-white border border-gray-300 p-6 hover:border-[#2B5AA0] hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-3">
                <Search className="h-5 w-5 text-[#2B5AA0] mr-2" />
                <h3 className="font-semibold text-gray-900">Search</h3>
              </div>
              <p className="text-sm text-gray-600">
                Search across all articles by title, author, or keyword.
              </p>
            </Link>

            <Link
              href="/authors"
              className="bg-white border border-gray-300 p-6 hover:border-[#2B5AA0] hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-3">
                <FileText className="h-5 w-5 text-[#2B5AA0] mr-2" />
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
