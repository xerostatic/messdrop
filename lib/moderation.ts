// Simple profanity filter for family-safe content
// This list covers common profanity and slurs - keeping it PG

const BLOCKED_PATTERNS = [
  // Profanity
  /\bf+u+c+k+/i,
  /\bs+h+i+t+/i,
  /\ba+s+s+h+o+l+e/i,
  /\bb+i+t+c+h/i,
  /\bd+a+m+n/i,
  /\bc+u+n+t/i,
  /\bd+i+c+k/i,
  /\bp+u+s+s+y/i,
  /\bc+o+c+k/i,
  /\bw+h+o+r+e/i,
  /\bs+l+u+t/i,
  /\bb+a+s+t+a+r+d/i,
  /\bp+i+s+s/i,
  /\bc+r+a+p/i,
  /\bh+e+l+l\b/i,
  
  // Slurs and hate speech (abbreviated patterns)
  /\bn+i+g+g/i,
  /\bf+a+g/i,
  /\br+e+t+a+r+d/i,
  /\bt+r+a+n+n+y/i,
  /\bd+y+k+e/i,
  /\bk+i+k+e/i,
  /\bs+p+i+c/i,
  /\bc+h+i+n+k/i,
  /\bg+o+o+k/i,
  
  // Common leetspeak variants
  /\bf+u+k/i,
  /\bsh1t/i,
  /\ba55/i,
  /\b@ss/i,
  /\bph+u+c+k/i,
  /\bb1tch/i,
  
  // Sexual content
  /\bp+o+r+n/i,
  /\bs+e+x+y/i,
  /\bn+u+d+e/i,
  /\bx+x+x/i,
  /\bb+o+o+b/i,
  /\bt+i+t+s/i,
  /\bp+e+n+i+s/i,
  /\bv+a+g+i+n+a/i,
  
  // Violence
  /\bk+i+l+l\s*(yo)?u/i,
  /\bd+i+e\b/i,
  /\bs+u+i+c+i+d+e/i,
  /\bm+u+r+d+e+r/i,
  
  // Drugs (hard drugs, keeping it family safe)
  /\bc+o+c+a+i+n+e/i,
  /\bh+e+r+o+i+n/i,
  /\bm+e+t+h\b/i,
];

// Additional exact word matches (case insensitive)
const BLOCKED_WORDS = new Set([
  'ass', 'arse', 'balls', 'butt', 'crap', 'damn', 'dang', 'darn',
  'douche', 'douchebag', 'freaking', 'fricking', 'frickin',
  'goddamn', 'goddam', 'jackass', 'jerk', 'moron', 'idiot',
  'stupid', 'dumb', 'loser', 'suck', 'sucks', 'wtf', 'stfu',
  'lmao', 'lmfao', 'omfg', 'af', 'bs'
]);

export function isContentSafe(content: string): { safe: boolean; reason?: string } {
  const lowerContent = content.toLowerCase();
  
  // Check regex patterns
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(content)) {
      return { safe: false, reason: "Message contains inappropriate language" };
    }
  }
  
  // Check exact word matches
  const words = lowerContent.split(/\s+/);
  for (const word of words) {
    // Clean punctuation from word
    const cleanWord = word.replace(/[^a-z0-9]/g, '');
    if (BLOCKED_WORDS.has(cleanWord)) {
      return { safe: false, reason: "Message contains inappropriate language" };
    }
  }
  
  // Check for excessive caps (shouting)
  const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length;
  if (content.length > 10 && capsRatio > 0.7) {
    return { safe: false, reason: "Please don't shout" };
  }
  
  // Check for spam patterns (repeated characters)
  if (/(.)\1{5,}/.test(content)) {
    return { safe: false, reason: "Message looks like spam" };
  }
  
  // Check for URLs (prevent spam/phishing)
  if (/https?:\/\/|www\./i.test(content)) {
    return { safe: false, reason: "Links are not allowed" };
  }
  
  return { safe: true };
}

