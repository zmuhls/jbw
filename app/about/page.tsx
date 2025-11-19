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
              <a href="#editorial-team">Editorial Team</a>
              <a href="#editorial-board">Editorial Board</a>
              <a href="#contributors">Notable Contributors</a>
              <a href="#publication">Publication Info</a>
              <a href="#contact">Contact</a>
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

          {/* Editorial Team */}
          <section id="editorial-team" className="bg-white border border-gray-300 p-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Editorial Team</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Editors</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>Lisa Blankenship, Baruch College, CUNY</li>
                  <li>Dominique Zino, LaGuardia Community College, CUNY</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Associate Editors</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>Charissa Che, John Jay College of Criminal Justice</li>
                  <li>Mudiwa Pettus, Medgar Evers College</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Consulting Editors</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>Hope Parisi, Kingsborough Community College</li>
                  <li>Cheryl C. Smith, Baruch College</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Production Editor</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>Zach Muhlbauer, CUNY Graduate Center</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Editorial Board */}
          <section id="editorial-board" className="bg-white border border-gray-300 p-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Editorial Board</h2>
            <p className="text-gray-700">
              The Editorial Board provides guidance on journal direction and reviews submissions.
              Board members are leading scholars in basic writing, composition studies, and related fields.
            </p>
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
              <strong className="text-gray-900">Indexing:</strong> Available in ERIC,
              EBSCO&apos;s Communication and Mass Media Complete, and JSTOR (excluding the last two years)
            </div>
          </div>
          </section>

          {/* Archive Information */}
          <section className="bg-white border border-gray-300 p-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Archive Information</h2>
            <div className="space-y-4 text-gray-700 text-sm">
              <div>
                <strong className="text-gray-900">Archiving Process:</strong> PDF files for volumes 1–22
                were scanned as 600 pixels per inch color images, converted to grayscale where appropriate,
                and optimized for web viewing at 200 pixels per inch. Archival copies are preserved at 600
                pixels per inch. More recent issues have been generated directly from InDesign files.
              </div>
              <div>
                <strong className="text-gray-900">Accessibility Note:</strong> Because most early PDF
                documents were created by scanning print documents, they lack structural markup (headings,
                etc.). Screen readers will not be able to determine heading levels and other information
                that would ease the reading process.
              </div>
              <div>
                <strong className="text-gray-900">Embargo Period:</strong> Each volume is made available
                on this site following a one-year embargo period.
              </div>
            </div>
          </section>

          {/* Acknowledgments */}
          <section className="bg-white border border-gray-300 p-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Acknowledgments</h2>
            <p className="text-gray-700 text-sm">
              The WAC Clearinghouse and JBW offer special thanks to Ann Schwalm, Mark Shelstad, and
              Clarissa Trapp of the Colorado State University Libraries and to Vince Darcangelo of
              the Colorado State University Testing Center for their work scanning early issues of
              the JBW archives. We also offer appreciation to Bonne August, Jim Cody, Theresa Enos,
              Karen Uehling, Shirley Rose, and Jessica Schreyer for contributing their personal copies
              of the journal to this project.
            </p>
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
                  className="text-[#4A5838] hover:underline inline-flex items-center"
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
                  className="text-[#4A5838] hover:underline inline-flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  WAC Clearinghouse
                </a>
              </div>
              <div>
                <Link href="/archive" className="text-[#4A5838] hover:underline">
                  Browse Complete Archive
                </Link>
              </div>
              <div>
                <Link href="/authors" className="text-[#4A5838] hover:underline">
                  Author Index
                </Link>
              </div>
              <div>
                <Link href="/search" className="text-[#4A5838] hover:underline">
                  Search Articles
                </Link>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="bg-white border border-gray-300 p-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <strong className="text-gray-900">Email:</strong>{' '}
                <a href="mailto:jbwcuny@gmail.com" className="text-[#4A5838] hover:underline">
                  jbwcuny@gmail.com
                </a>
              </div>
              <div>
                <strong className="text-gray-900">Mailing Address:</strong>
                <address className="not-italic mt-1">
                  Department of English<br />
                  Kingsborough Community College<br />
                  City University of New York<br />
                  2001 Oriental Blvd.<br />
                  Brooklyn, NY 11235
                </address>
              </div>
              <div>
                <strong className="text-gray-900">WAC Clearinghouse:</strong>{' '}
                <a href="mailto:mike.palmquist@colostate.edu" className="text-[#4A5838] hover:underline">
                  mike.palmquist@colostate.edu
                </a>
              </div>
              <div>
                <strong className="text-gray-900">Subscriptions:</strong>
                <address className="not-italic mt-1">
                  P.O. Box 465<br />
                  Hanover, PA 17331<br />
                  Phone: (717) 632-3535<br />
                  Fax: (717) 633-8920<br />
                  Email:{' '}
                  <a href="mailto:pubsvc.tsp@sheridan.com" className="text-[#4A5838] hover:underline">
                    pubsvc.tsp@sheridan.com
                  </a>
                </address>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
