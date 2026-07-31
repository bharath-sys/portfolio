/**
 * Profile figures, taken from the live platform profiles.
 *
 * GitHub and LeetCode are fetched from their APIs on page load; these values
 * are the fallback when a request fails. GeeksforGeeks has no public API, so
 * its numbers always come from here.
 *
 * ── UPDATE THESE WHEN YOUR PROFILES MOVE ────────────────────────────────────
 * Only figures worth showing are listed. Anything at zero or unflattering
 * (follower counts, streaks, global rank) is deliberately left out.
 */

/** Years of professional full-stack experience. */
export const YEARS_EXPERIENCE = 4;

/** leetcode.com/u/k_b_k_bharath */
export const LEETCODE = {
  totalSolved: 490,
  easySolved: 245,
  mediumSolved: 221,
  hardSolved: 24,
  submissionsPastYear: 525,
  activeDays: 118,
  maxStreak: 11,
};

/** geeksforgeeks.org/user/bharathkumar41 */
export const GFG = {
  totalSolved: 170,
  codingScore: 430,
  instituteRank: 32,
  institute: "Amity University Jaipur",
  breakdown: {
    basic: 17,
    easy: 57,
    medium: 87,
    hard: 8,
  },
};

/** Combined problem count shown in the headline strip. */
export const TOTAL_SOLVED = LEETCODE.totalSolved + GFG.totalSolved;
