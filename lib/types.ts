export interface Article {
  volume: number;
  issue: number;
  title: string;
  authors: string[];
  pdf_url: string;
  doi: string;
  page_numbers: string | null;
  issue_url: string;
  local_path: string;
  keywords?: string[];
}

export interface JBWIndex {
  metadata: {
    total_volumes: number;
    total_issues: number;
    total_articles: number;
    total_pdfs_downloaded: number;
    scrape_date: string;
    status: string;
    errors_count: number;
  };
  articles: Article[];
}

export interface Issue {
  volume: number;
  issue: number;
  year: number;
  season: string;
  articles: Article[];
}

export interface VolumeData {
  volume: number;
  issues: Issue[];
  totalArticles: number;
}
