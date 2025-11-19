# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 static export website for the Journal of Basic Writing (JBW), an academic journal founded in 1975 by Mina Shaughnessy at CUNY. The site provides access to 43 volumes of archives (1975-2024) with enhanced browsing, search, and author indexing capabilities.

## Tech Stack

- **Framework**: Next.js 15 with App Router (static export mode)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Fonts**: Inter (sans-serif) and Crimson Text (serif for academic content)
- **PDF**: PDF.js via pdfjs-dist and react-pdf packages
- **Icons**: lucide-react
- **Deployment**: Static export configured for `/jbw` base path

## Development Commands

```bash
# Start development server (runs at http://localhost:3000/jbw/)
npm run dev

# Build static site (outputs to /out directory)
npm run build

# Start production preview
npm start

# Run linter
npm run lint
```

## Project Architecture

### Static Export Configuration

The site is configured as a static export in [next.config.ts](next.config.ts):
- `output: 'export'` - Generates static HTML/CSS/JS
- `basePath: '/jbw'` - Deployed under /jbw subdirectory
- `assetPrefix: '/jbw/'` - All assets prefixed with /jbw
- `images.unoptimized: true` - No server-side image optimization
- Build errors for TypeScript/ESLint are ignored during builds

### Data Architecture

All journal data is loaded from a single static JSON file at `/public/jbw-index.json`:

**Core Types** ([lib/types.ts](lib/types.ts)):
- `Article`: Individual article with volume, issue, title, authors, PDF URL, DOI
- `JBWIndex`: Complete index with metadata and all articles array
- `Issue`: Groups articles by volume/issue with year and season
- `VolumeData`: Groups issues by volume with article counts

**Server-Only Data Access** ([lib/data.ts](lib/data.ts)):
- Uses `'server-only'` directive - **cannot be imported in client components**
- `getJBWIndex()`: Loads and caches the complete JSON index
- `getAllArticles()`: Returns all articles from the index
- `getArticlesByVolume(volume)`: Filter articles by volume number
- `getArticlesByIssue(volume, issue)`: Filter by specific issue
- `searchArticles(query)`: Search by title or author
- `getAllIssues()`: Returns all issues sorted descending
- `getAllVolumes()`: Returns volumes with nested issues
- `getAuthorIndex()`: Returns Map of author names to their articles
- `getUniqueAuthorCount()`: Returns count of distinct authors

**Client-Safe Utilities** ([lib/utils.ts](lib/utils.ts)):
- `getYearFromVolume(volume)`: Converts volume number to publication year (handles publication gaps)
- `getSeason(issue)`: Returns 'Spring' or 'Fall' based on issue number

**Client Component Data Pattern**: Client components must fetch data directly:
```typescript
fetch('/jbw/jbw-index.json')
  .then(res => res.json())
  .then((data: JBWIndex) => /* use data.articles */);
```

### App Structure (Next.js App Router)

```
app/
  layout.tsx          - Root layout with Inter/Crimson fonts, Header, Footer
  page.tsx            - Homepage with stats, featured sections, sidebar (async server component)
  about/page.tsx      - About journal, editorial team, contact info, archive details
  archive/page.tsx    - Complete archive browser (expandable volumes/issues)
  authors/page.tsx    - Author index (alphabetical filter, uses getYearFromVolume)
  search/page.tsx     - Search interface
  submit/page.tsx     - Submission guidelines, requirements, review process
```

All pages under `app/` use the App Router. Pages that need client-side interactivity use `'use client'` directive. The homepage is an async server component that fetches data at build time.

### Component Structure

```
components/
  Header.tsx          - Site header with navigation
  Footer.tsx          - Site footer
```

Components are imported with `@/*` path alias (configured in tsconfig.json).

### Styling System

[app/globals.css](app/globals.css):
- Tailwind CSS 4 imported at top
- CSS custom properties for fonts and brand colors:
  - `--primary-green: #7A8866` (olive-green header/accents)
  - `--primary-green-dark: #5A6846` (header gradient end)
  - `--accent-gold: #C9A961`
  - `--bg-cream: #FAF9F6`
- Link text color: `#4A5838` (darker olive for readability)
- Hover states: `hover:bg-green-50 hover:text-green-800`
- Custom classes:
  - `.sidebar-nav` - Sidebar navigation links with hover states
  - `.article-content` - Typography for article content (serif font)
  - `.issue-box` - Issue cards with hover effects
  - `.journal-block` - Generic content blocks
  - `.journal-block-title` - Block section headers

Font families are defined via CSS variables set by Next.js font loaders in layout.tsx.

### PDF Integration

The site uses PDF.js for displaying journal articles. PDFs are hosted on WAC Clearinghouse (wac.colostate.edu) and linked directly - no local storage or proxying.

## Key Implementation Details

1. **Server vs Client component data access**:
   - Server components (like `app/page.tsx`) can import from `lib/data.ts`
   - Client components (`'use client'`) must fetch `/jbw/jbw-index.json` directly and cannot import from `lib/data.ts` (it uses `'server-only'`)
   - Use `lib/utils.ts` for client-safe utilities like `getYearFromVolume()`

2. **Client-side rendering for interactive pages**: Archive, Authors, and Search pages use `'use client'` because they need useState/useEffect for data loading and filtering.

3. **Volume-to-year mapping**: Volumes don't map linearly to years (there are publication gaps 2014-2021). The mapping is hardcoded in `lib/utils.ts:getYearFromVolume()`.

4. **Author name cleaning**: Author names from scraped data contain metadata (DOIs, page numbers). Client components must implement `cleanAuthorName()` locally.

5. **Issue seasons**: Issue 1 = Spring, Issue 2 = Fall.

## Important Constraints

- Site must be deployable as static files (no server-side rendering)
- All paths must work with `/jbw` base path
- PDF links point to external WAC Clearinghouse URLs
- No backend or API - all data comes from static JSON
- Images must be unoptimized (no Next.js Image Optimization API)
