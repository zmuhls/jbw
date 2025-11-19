# Journal of Basic Writing Website

A modern static website for the Journal of Basic Writing (JBW), an academic journal founded in 1975 by Mina P. Shaughnessy at CUNY. This site provides access to 43 volumes of archives (1975-2024) with enhanced browsing, search, and author indexing capabilities.

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000`.

### Building for Production

```bash
# Build static export
npm run build

# Preview production build
npm start
```

The build outputs static files to the `/out` directory, ready for deployment to any static hosting service.

### Linting

```bash
npm run lint
```

## Architecture

### Technology Stack

- **Framework**: Next.js 15 with App Router (static export mode)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Fonts**: Inter (UI) and Crimson Text (academic content)
- **Icons**: lucide-react
- **PDF Viewer**: PDF.js via pdfjs-dist and react-pdf

### Static Export Configuration

The site is configured for static deployment with no server-side rendering:

- Outputs to `/out` directory
- Base path: `/jbw` (for deployment under subdirectory)
- All assets prefixed with `/jbw/`
- Images unoptimized (no Next.js Image Optimization API)

### Data Architecture

All journal data is stored in a single JSON file at `/public/jbw-index.json`:

```
{
  "metadata": {
    "total_volumes": 43,
    "total_issues": 87,
    "total_articles": 747,
    ...
  },
  "articles": [
    {
      "volume": 1,
      "issue": 1,
      "title": "...",
      "authors": ["..."],
      "pdf_url": "https://wac.colostate.edu/docs/jbw/...",
      "doi": "...",
      ...
    }
  ]
}
```

Data access functions in `lib/data.ts` load and cache this JSON, providing filtering, search, and aggregation capabilities.

## Pages and Components

### Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with journal stats, featured sections, sidebar navigation |
| `/about` | History, editorial team, publication info, contact, archive details |
| `/submit` | Submission guidelines, manuscript requirements, review process |
| `/archive` | Complete archive browser with expandable volumes/issues |
| `/authors` | Alphabetical author index with article listings |
| `/search` | Full-text search across titles and authors |

### Core Components

- **Header.tsx** - Site header with responsive navigation (Home, About, Submit, Archive, Search)
- **Footer.tsx** - Site footer with copyright, links, and contact information

### Styling System

Custom CSS classes defined in `app/globals.css`:

- `.journal-block` - Content block containers
- `.journal-block-title` - Section headers
- `.sidebar-nav` - Sidebar navigation with hover states
- `.article-content` - Typography for article content (serif font)

Brand colors:
- Primary red: `#8B1A1A`
- Primary maroon: `#5D0F0F`
- Accent gold: `#C9A961`
- Background cream: `#FAF9F6`

## Key Features

### Volume-to-Year Mapping

Volumes don't map linearly to years due to publication gaps (2014-2021). The `getYearFromVolume()` function in `lib/data.ts` handles this mapping correctly.

### Author Name Cleaning

Scraped author data contains metadata (DOIs, page numbers). The `cleanAuthorName()` function strips this before display.

### Dynamic Statistics

The homepage displays dynamic counts for articles and unique authors, calculated from the JSON index at build time.

### External PDF Links

All PDFs are hosted on the WAC Clearinghouse (wac.colostate.edu) and linked directly - no local storage or proxying required.

## Deployment

### Static Hosting

Build the site and deploy the `/out` directory to any static hosting service:

- GitHub Pages
- Netlify
- Vercel (static mode)
- AWS S3 + CloudFront
- Any web server

### Base Path Configuration

The site is configured to be served from `/jbw`. To change this:

1. Update `basePath` and `assetPrefix` in `next.config.ts`
2. Update the fetch path in `lib/data.ts:getJBWIndex()`

## Sustainability and Maintainability

### Content Updates

**Updating journal data**: Replace `/public/jbw-index.json` with new data following the existing schema. The site will automatically reflect changes on next build.

**Updating editorial team**: Edit the Editorial Team section in `app/about/page.tsx`.

**Updating submission guidelines**: Edit `app/submit/page.tsx`.

### Adding New Volumes

1. Add article entries to `jbw-index.json`
2. Update the volume-to-year mapping in `lib/data.ts:getYearFromVolume()` if needed
3. Rebuild the site

### Dependencies

**Minimal dependencies**: The site uses few dependencies to reduce maintenance burden:
- Next.js (framework)
- Tailwind CSS (styling)
- lucide-react (icons)
- PDF.js packages (PDF viewing)

**No backend required**: All data is static JSON, eliminating database maintenance, API versioning, and server costs.

### Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Link text descriptions
- Color contrast following WCAG guidelines
- Note: Early PDF archives lack structural markup for screen readers (documented in About page)

### Performance

- Static generation for fast page loads
- Client-side data caching after initial load
- External PDF hosting reduces bandwidth costs
- No JavaScript required for basic navigation

### Long-term Considerations

1. **PDF hosting dependency**: Site relies on WAC Clearinghouse for PDF access. Consider local backup strategy if needed.

2. **JSON data integrity**: Validate JSON schema when updating to prevent build failures.

3. **Next.js upgrades**: The site uses standard App Router patterns, making framework upgrades straightforward.

4. **Styling maintenance**: Tailwind CSS utility classes are self-documenting and don't require CSS file maintenance.

5. **Content ownership**: All content is stored in version-controlled files (not a CMS database), ensuring long-term preservation and portability.

## Development Notes

### Client vs Server Components

- Homepage (`page.tsx`) is an async server component that fetches data at build time
- Archive, Authors, Search pages use `'use client'` for interactive features
- About and Submit pages are server components (static content)

### Path Alias

Import components and utilities with `@/*`:
```typescript
import { getAllArticles } from '@/lib/data';
import Header from '@/components/Header';
```

### Type Safety

All data structures are typed in `lib/types.ts`:
- `Article` - Individual article metadata
- `Issue` - Articles grouped by volume/issue
- `VolumeData` - Issues grouped by volume
- `JBWIndex` - Complete data structure

## License

Journal content is copyrighted by City University of New York (ISSN 0147-1635).

## Contact

- **Journal**: jbwcuny@gmail.com
- **WAC Clearinghouse**: mike.palmquist@colostate.edu
