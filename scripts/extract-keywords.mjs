#!/usr/bin/env node
/**
 * Extract keywords from JBW PDF articles
 * Searches for "KEYWORDS:" pattern in PDFs and updates jbw-index.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const INDEX_PATH = path.join(ROOT, 'public', 'jbw-index.json');
const PROGRESS_PATH = path.join(ROOT, 'keyword_extraction_progress.json');

// Configuration
const BATCH_SIZE = 20; // Process in batches to save progress
const DELAY_BETWEEN_REQUESTS = 500; // ms delay between PDF fetches

/**
 * Load progress from file
 */
function loadProgress() {
  if (fs.existsSync(PROGRESS_PATH)) {
    return JSON.parse(fs.readFileSync(PROGRESS_PATH, 'utf-8'));
  }
  return {
    lastProcessedIndex: -1,
    successfulExtractions: 0,
    failedExtractions: 0,
    startTime: new Date().toISOString()
  };
}

/**
 * Save progress to file
 */
function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_PATH, JSON.stringify(progress, null, 2));
}

/**
 * Dynamically import pdfjs-dist (ESM)
 */
async function getPdfJs() {
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
  return pdfjsLib;
}

/**
 * Fetch PDF from URL and return buffer
 */
async function fetchPdf(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'JBW-Website-Keyword-Extractor/1.0'
    }
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return new Uint8Array(await response.arrayBuffer());
}

/**
 * Extract text from PDF buffer
 */
async function extractTextFromPdf(pdfBuffer, pdfjsLib) {
  const loadingTask = pdfjsLib.getDocument({ data: pdfBuffer });
  const pdf = await loadingTask.promise;

  let fullText = '';
  // Only check first 3 pages - keywords are always near the beginning
  const maxPages = Math.min(3, pdf.numPages);

  for (let i = 1; i <= maxPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
}

/**
 * Parse keywords from text
 * Looks for patterns like "KEYWORDS:" or "Keywords:" followed by comma-separated terms
 */
function parseKeywords(text) {
  // Normalize whitespace
  const normalizedText = text.replace(/\s+/g, ' ');

  // Various patterns to match keywords section
  const patterns = [
    /KEYWORDS?\s*:\s*([^\.]+?)(?:\.|$)/i,
    /KEY\s*WORDS?\s*:\s*([^\.]+?)(?:\.|$)/i,
    /Key\s*words?\s*:\s*([^\.]+?)(?:\.|$)/i
  ];

  for (const pattern of patterns) {
    const match = normalizedText.match(pattern);
    if (match) {
      const keywordsStr = match[1].trim();
      // Split by comma or semicolon, clean up each keyword
      const keywords = keywordsStr
        .split(/[,;]/)
        .map(k => k.trim().toLowerCase())
        .map(k => k.replace(/\s*doi:\s*10.*$/i, '').trim()) // Remove DOI fragments
        .map(k => k.replace(/(\w)\s+-\s+(\w)/g, '$1$2')) // Fix broken hyphenation (e.g., "dis - course" -> "discourse")
        .filter(k => k.length > 0 && k.length < 100) // Filter out empty and overly long strings
        .filter(k => !k.includes('abstract')) // Filter out abstract markers
        .filter(k => !/^\d+$/.test(k)); // Filter out numbers

      if (keywords.length > 0) {
        return keywords;
      }
    }
  }

  return null;
}

/**
 * Sleep helper
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main extraction function
 */
async function main() {
  console.log('Loading JBW index...');
  const index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'));
  const articles = index.articles;

  console.log(`Total articles: ${articles.length}`);

  // Find articles without keywords (excluding non-article entries)
  const articlesToProcess = articles
    .map((article, idx) => ({ article, idx }))
    .filter(({ article }) => {
      // Skip entries that aren't real articles
      const title = article.title.toLowerCase();
      if (title.includes('editorial board') ||
          title.includes('view the members') ||
          title.includes('editors\' column') ||
          title === 'introduction' ||
          title === 'book review' ||
          !article.pdf_url) {
        return false;
      }
      // Skip if already has keywords
      return !article.keywords || article.keywords.length === 0;
    });

  console.log(`Articles needing keyword extraction: ${articlesToProcess.length}`);

  if (articlesToProcess.length === 0) {
    console.log('All articles already have keywords!');
    return;
  }

  // Load progress
  const progress = loadProgress();
  console.log(`Previous progress: ${progress.successfulExtractions} successful, ${progress.failedExtractions} failed`);

  // Find starting point
  let startIdx = 0;
  if (progress.lastProcessedIndex >= 0) {
    startIdx = articlesToProcess.findIndex(({ idx }) => idx > progress.lastProcessedIndex);
    if (startIdx === -1) startIdx = articlesToProcess.length;
  }

  console.log(`Starting from index ${startIdx} (article index ${startIdx < articlesToProcess.length ? articlesToProcess[startIdx].idx : 'done'})`);

  // Load pdfjs
  const pdfjsLib = await getPdfJs();

  let successCount = progress.successfulExtractions;
  let failCount = progress.failedExtractions;
  let processed = 0;

  for (let i = startIdx; i < articlesToProcess.length; i++) {
    const { article, idx } = articlesToProcess[i];

    console.log(`\n[${i+1}/${articlesToProcess.length}] Processing: ${article.title.substring(0, 60)}...`);
    console.log(`  Volume ${article.volume}, Issue ${article.issue}`);
    console.log(`  URL: ${article.pdf_url}`);

    try {
      // Fetch PDF
      const pdfBuffer = await fetchPdf(article.pdf_url);
      console.log(`  Downloaded: ${(pdfBuffer.length / 1024).toFixed(1)} KB`);

      // Extract text
      const text = await extractTextFromPdf(pdfBuffer, pdfjsLib);

      // Parse keywords
      const keywords = parseKeywords(text);

      if (keywords && keywords.length > 0) {
        console.log(`  ✓ Found keywords: ${keywords.join(', ')}`);
        articles[idx].keywords = keywords;
        successCount++;
      } else {
        console.log(`  ○ No keywords found`);
        failCount++;
      }
    } catch (error) {
      console.log(`  ✗ Error: ${error.message}`);
      failCount++;
    }

    processed++;

    // Save progress periodically
    if (processed % BATCH_SIZE === 0 || i === articlesToProcess.length - 1) {
      progress.lastProcessedIndex = idx;
      progress.successfulExtractions = successCount;
      progress.failedExtractions = failCount;
      saveProgress(progress);

      // Save updated index
      fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2));
      console.log(`\n  === Saved progress: ${successCount} successful, ${failCount} failed ===`);
    }

    // Rate limiting
    await sleep(DELAY_BETWEEN_REQUESTS);
  }

  console.log('\n========================================');
  console.log('Extraction complete!');
  console.log(`Successful: ${successCount}`);
  console.log(`Failed/No keywords: ${failCount}`);
  console.log('========================================');
}

main().catch(console.error);
