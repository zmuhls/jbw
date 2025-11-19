export function getYearFromVolume(volume: number): number {
  // Based on WAC Clearinghouse archive
  // Volumes 1-3 spanned multiple years (1975-1984)
  if (volume === 1) return 1975;
  if (volume === 2) return 1978;
  if (volume === 3) return 1980;
  // From Volume 4 onwards: year = 1981 + volume
  // e.g., Vol 4 = 1985, Vol 43 = 2024
  return 1981 + volume;
}

export function getSeason(issue: number): string {
  return issue === 1 ? 'Spring' : 'Fall';
}
