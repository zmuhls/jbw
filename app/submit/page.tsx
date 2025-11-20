import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function SubmitPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="bg-white border border-gray-300 p-6 mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Submit to the Journal</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="journal-block">
            <div className="journal-block-title">Quick Links</div>
            <nav className="sidebar-nav py-2">
              <a href="#guidelines">Submission Guidelines</a>
              <a href="#requirements">Manuscript Requirements</a>
              <a href="#topics">Preferred Topics</a>
              <a href="#process">Review Process</a>
            </nav>
          </div>

          {/* Contact */}
          <div className="journal-block">
            <div className="journal-block-title">Contact</div>
            <div className="p-4 text-sm">
              <a
                href="mailto:jbwcuny@gmail.com"
                className="text-[#2B5AA0] hover:underline flex items-center"
              >
                <Mail className="h-4 w-4 mr-2" />
                jbwcuny@gmail.com
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-6">
          {/* Overview */}
          <section className="bg-white border border-gray-300 p-6">
            <div className="prose prose-lg max-w-none font-serif">
              <p className="text-gray-700 leading-relaxed">
                The <em>Journal of First-Year Writing</em> welcomes submissions that address first-year writing
                pedagogy, theory, and research. Articles must clearly address First-Year Writing and/or
                must situate settings of instruction or institutional agency in explicit relation
                to First-Year Writing concerns.
              </p>
            </div>
          </section>

          {/* Submission Guidelines */}
          <section id="guidelines" className="bg-white border border-gray-300 p-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Submission Guidelines</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <strong className="text-gray-900">Manuscript Length:</strong> 25–30 pages (7,500–9,000 words) including Works Cited
              </div>
              <div>
                <strong className="text-gray-900">Format:</strong> Follow current MLA guidelines
              </div>
              <div>
                <strong className="text-gray-900">File Type:</strong> Submit as Word document or Google Docs link
              </div>
              <div>
                <strong className="text-gray-900">Email:</strong>{' '}
                <a href="mailto:jbwcuny@gmail.com" className="text-[#2B5AA0] hover:underline">
                  jbwcuny@gmail.com
                </a>
              </div>
            </div>
          </section>

          {/* Manuscript Requirements */}
          <section id="requirements" className="bg-white border border-gray-300 p-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Manuscript Requirements</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <strong className="text-gray-900">Cover Page:</strong> Include author name(s), institutional affiliations, contact information, and a brief bio
              </div>
              <div>
                <strong className="text-gray-900">Second Page:</strong> Title only (no author information), a 250–300 word abstract, and 5–7 keywords
              </div>
              <div>
                <strong className="text-gray-900">Notes:</strong> Use minimal endnotes
              </div>
              <div>
                <strong className="text-gray-900">Student Work:</strong> Excerpts from student writing require written permission and IRB documentation
              </div>
            </div>
          </section>

          {/* Preferred Topics */}
          <section id="topics" className="bg-white border border-gray-300 p-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Preferred Topics & Approaches</h2>
            <p className="text-gray-700 mb-4">
              The journal welcomes submissions that employ a variety of methodological and theoretical frameworks, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Antiracist and social justice frameworks</li>
              <li>Second-language writing theory</li>
              <li>Ethnographic and qualitative methods</li>
              <li>Digital composing and multimodal pedagogy</li>
              <li>Writing center practice and research</li>
              <li>Translingual approaches</li>
            </ul>
          </section>

          {/* Review Process */}
          <section id="process" className="bg-white border border-gray-300 p-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Review Process</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Authors will receive a confirmation of receipt, followed by notification about
                whether the submission will be sent for peer review. The review process typically
                takes <strong>6–8 weeks</strong>.
              </p>
              <p>
                <strong className="text-gray-900">Publication Schedule:</strong> The journal publishes
                spring and fall issues annually with support from the CUNY Office of Academic Affairs.
              </p>
            </div>
          </section>

          {/* Guest-Edited Issues */}
          <section className="bg-gray-100 border border-gray-300 p-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Guest-Edited Issues</h2>
            <p className="text-gray-700">
              Proposals for guest-edited special issues are welcome. Please contact the editors at{' '}
              <a href="mailto:jbwcuny@gmail.com" className="text-[#2B5AA0] hover:underline">
                jbwcuny@gmail.com
              </a>{' '}
              to discuss your proposal.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
