import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="bg-white border border-gray-300 p-6 mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900">About the Journal</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="journal-block">
            <div className="journal-block-title">Quick Links</div>
            <nav className="sidebar-nav py-2">
              <a href="#history">History & Mission</a>
              <a href="#contributors">Notable Contributors</a>
              <a href="#publication">Publication Info</a>
              <a href="#resources">Resources</a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-6">
          {/* History */}
          <section id="history" className="bg-white border border-gray-300 p-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">History & Mission</h2>
          <div className="prose prose-lg max-w-none font-serif">
            <p className="text-gray-700 leading-relaxed mb-4">
              The <em>Journal of Basic Writing</em> was founded in 1975 by Mina P.
              Shaughnessy, a pioneering educator who transformed how colleges approach
              teaching writing to underprepared students. Shaughnessy's groundbreaking
              work at the City University of New York (CUNY) during the Open Admissions
              era established basic writing as a legitimate field of scholarly inquiry.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Published by Baruch College, CUNY, JBW has been at the forefront of research
              in writing pedagogy for five decades. The journal publishes peer-reviewed
              articles exploring issues of access, equity, and excellence in writing
              instruction.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Over its 43-volume history, JBW has published seminal works on error
              analysis, assessment, critical pedagogy, multilingual writing, and social
              justice in composition. The journal continues to be an essential resource
              for writing teachers, program administrators, and researchers worldwide.
            </p>
          </div>
          </section>

          {/* Notable Contributors */}
          <section id="contributors" className="bg-white border border-gray-300 p-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Notable Contributors</h2>
          <p className="text-gray-700 mb-4">
            JBW has published work by many of the most influential scholars in composition
            studies, including:
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <ul className="list-disc list-inside space-y-2">
              <li>Mina P. Shaughnessy (founder)</li>
              <li>David Bartholomae</li>
              <li>Patricia Bizzell</li>
              <li>Min-Zhan Lu</li>
              <li>Bruce Horner</li>
            </ul>
            <ul className="list-disc list-inside space-y-2">
              <li>Ira Shor</li>
              <li>Mike Rose</li>
              <li>Lynn Quitman Troyka</li>
              <li>Marilyn Sternglass</li>
              <li>Karen L. Greenberg</li>
            </ul>
          </div>
          </section>

          {/* Publication Info */}
          <section id="publication" className="bg-white border border-gray-300 p-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Publication Information</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <strong className="text-gray-900">Publisher:</strong> Baruch College, CUNY
            </div>
            <div>
              <strong className="text-gray-900">Frequency:</strong> Semi-annual (Spring and
              Fall)
            </div>
            <div>
              <strong className="text-gray-900">ISSN:</strong> 0147-1635
            </div>
            <div>
              <strong className="text-gray-900">Access:</strong> Open access with one-year
              embargo
            </div>
            <div>
              <strong className="text-gray-900">Indexing:</strong> Available in ERIC and
              EBSCO databases
            </div>
          </div>
          </section>

          {/* Related Resources */}
          <section id="resources" className="bg-gray-100 border border-gray-300 p-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Related Resources</h2>
            <div className="space-y-3 text-sm">
              <div>
                <a
                  href="https://wac.colostate.edu/jbw/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8B1A1A] hover:underline inline-flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Original JBW Archive at WAC Clearinghouse
                </a>
              </div>
              <div>
                <a
                  href="https://wac.colostate.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8B1A1A] hover:underline inline-flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  WAC Clearinghouse
                </a>
              </div>
              <div>
                <Link href="/archive" className="text-[#8B1A1A] hover:underline">
                  Browse Complete Archive
                </Link>
              </div>
              <div>
                <Link href="/authors" className="text-[#8B1A1A] hover:underline">
                  Author Index
                </Link>
              </div>
              <div>
                <Link href="/search" className="text-[#8B1A1A] hover:underline">
                  Search Articles
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
