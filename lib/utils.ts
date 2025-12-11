export function getYearFromVolume(volume: number): number {
  // Complete volume-to-year mapping based on actual publication data
  const volumeToYear: { [key: number]: number } = {
    1: 1975,   // Volume 1, Number 1 (Spring 1975)
    2: 1978,   // Volume 2, Number 1 (Fall/Winter 1978) 
    3: 1984,   // Volume 3, Number 4 (Spring/Summer 1984) - spans 1980-1984
    4: 1985,   // Volume 4, Number 2 (Fall 1985)
    5: 1986,   // Volume 5, Number 2 (Fall 1986)
    6: 1987,   // Volume 6, Number 2 (Fall 1987)
    7: 1988,   // Volume 7, Number 2 (Fall 1988)
    8: 1989,   // Volume 8, Number 2 (Fall 1989)
    9: 1990,   // Volume 9, Number 2 (Fall 1990)
    10: 1991,  // Volume 10, Number 2 (Fall 1991)
    11: 1992,  // Volume 11, Number 2 (Fall 1992)
    12: 1993,  // Volume 12, Number 2 (Fall 1993)
    13: 1994,  // Volume 13, Number 2 (Fall 1994)
    14: 1995,  // Volume 14, Number 2 (Fall 1995)
    15: 1996,  // Volume 15, Number 2 (Fall 1996)
    16: 1997,  // Volume 16, Number 2 (Fall 1997)
    17: 1998,  // Volume 17, Number 2 (Fall 1998)
    18: 1999,  // Volume 18, Number 2 (Fall 1999)
    19: 2000,  // Volume 19, Number 2 (Fall 2000)
    20: 2001,  // Volume 20, Number 2 (Fall 2001)
    21: 2002,  // Volume 21, Number 2 (Fall 2002)
    22: 2003,  // Volume 22, Number 2 (Fall 2003)
    23: 2004,  // Volume 23, Number 2 (Fall 2004)
    24: 2005,  // Volume 24, Number 2 (Fall 2005)
    25: 2006,  // Volume 25, Number 2 (Fall 2006)
    26: 2007,  // Volume 26, Number 2 (Fall 2007)
    27: 2008,  // Volume 27, Number 2 (Fall 2008)
    28: 2009,  // Volume 28, Number 2 (Fall 2009)
    29: 2010,  // Volume 29, Number 2 (Fall 2010)
    30: 2011,  // Volume 30, Number 2 (Fall 2011)
    31: 2012,  // Volume 31, Number 2 (Fall 2012)
    32: 2013,  // Volume 32, Number 2 (Fall 2013)
    33: 2014,  // Volume 33, Number 1 (2014)
    34: 2015,  // Volume 34, Number 1 (2015)
    35: 2016,  // Volume 35, Number 1 (2016)
    36: 2017,  // Volume 36, Number 2 (Fall 2017)
    37: 2018,  // Volume 37, Number 2 (Fall 2018)
    38: 2019,  // Volume 38, Number 2 (Fall 2019)
    39: 2020,  // Volume 39, Number 2 (Fall 2020)
    40: 2021,  // Volume 40, Number 1 (Spring 2021)
    41: 2022,  // Volume 41, Number 1-2 (Spring/Fall 2022)
    42: 2023,  // Volume 42, Number 2 (Fall 2023)
    43: 2024,  // Volume 43, Number 2 (Fall 2024)
    44: 2025,  // Volume 44, Number 1 (Spring 2025)
  };

  // Return mapped year or fallback to 1975
  return volumeToYear[volume] || 1975;
}

export function getIssueSeason(volume: number, issue: number): string {
  // Special cases for early volumes with complex season patterns
  const issueSeasonMap: { [key: string]: string } = {
    // Volume 3 issues
    '3.1': 'Fall/Winter',     // Volume 3, Issue 1 (Fall/Winter 1980)
    '3.2': 'Spring/Summer',   // Volume 3, Issue 2 (Spring/Summer 1981) 
    '3.3': 'Fall/Winter',     // Volume 3, Issue 3 (Fall/Winter 1981)
    '3.4': 'Spring/Summer',   // Volume 3, Issue 4 (Spring/Summer 1984)
    
    // Volume 2 issues 
    '2.1': 'Fall/Winter',     // Volume 2, Issue 1 (Fall/Winter 1978)
    '2.2': 'Spring/Summer',   // Volume 2, Issue 2 (Spring/Summer 1979)
    '2.3': 'Fall/Winter',     // Volume 2, Issue 3 (Fall/Winter 1979)
    '2.4': 'Spring/Summer',   // Volume 2, Issue 4 (Spring/Summer 1980)
    
    // Volume 1 issues
    '1.1': 'Spring',          // Volume 1, Issue 1 (Spring 1975)
    '1.2': 'Fall/Winter',     // Volume 1, Issue 2 (Fall/Winter 1976)
    '1.3': 'Spring/Summer',   // Volume 1, Issue 3 (Spring/Summer 1977)
    '1.4': 'Spring/Summer',   // Volume 1, Issue 4 (Spring/Summer 1978)
  };
  
  const key = `${volume}.${issue}`;
  
  // Use specific mapping if available, otherwise default Spring/Fall pattern
  return issueSeasonMap[key] || (issue === 1 ? 'Spring' : 'Fall');
}

export function getIssueYear(volume: number, issue: number): number {
  // Special cases for early volumes with irregular publication patterns
  const issueYearMap: { [key: string]: number } = {
    // Volume 3 issues span multiple years
    '3.1': 1980,  // Volume 3, Issue 1 (Fall/Winter 1980)
    '3.2': 1981,  // Volume 3, Issue 2 (Spring/Summer 1981) 
    '3.3': 1981,  // Volume 3, Issue 3 (Fall/Winter 1981)
    '3.4': 1984,  // Volume 3, Issue 4 (Spring/Summer 1984)
    
    // Volume 2 issues 
    '2.1': 1978,  // Volume 2, Issue 1 (Fall/Winter 1978)
    '2.2': 1979,  // Volume 2, Issue 2 (Spring/Summer 1979)
    '2.3': 1979,  // Volume 2, Issue 3 (Fall/Winter 1979)
    '2.4': 1980,  // Volume 2, Issue 4 (Spring/Summer 1980)
    
    // Volume 1 issues
    '1.1': 1975,  // Volume 1, Issue 1 (Spring 1975)
    '1.2': 1976,  // Volume 1, Issue 2 (Fall/Winter 1976)
    '1.3': 1977,  // Volume 1, Issue 3 (Spring/Summer 1977)
    '1.4': 1978,  // Volume 1, Issue 4 (Spring/Summer 1978)
  };
  
  const key = `${volume}.${issue}`;
  
  // Use specific mapping if available, otherwise fall back to volume year
  return issueYearMap[key] || getYearFromVolume(volume);
}

// Legacy function for backward compatibility
export function getSeason(issue: number): string {
  return issue === 1 ? 'Spring' : 'Fall';
}

// Check if an article title is editorial content (not a peer-reviewed article)
export function isEditorialContent(title: string): boolean {
  const lowerTitle = title.toLowerCase();
  return (
    lowerTitle.startsWith("editors' column") ||
    lowerTitle.startsWith("editor's column") ||
    lowerTitle === 'editorial board' ||
    lowerTitle === 'view the members'
  );
}
