import { useQuery } from "@tanstack/react-query";

export const GITHUB_USER = "bharath-sys";
export const LEETCODE_USER = "k_b_k_bharath";
export const GFG_USER = "bharathkumar41";

const DAY = 24 * 60 * 60 * 1000;

/**
 * Live profile stats.
 *
 * Everything shown on the site comes from these calls — nothing is hard-coded,
 * so a number is either real or it isn't displayed. When a request fails the
 * hook returns null and the UI renders a dash rather than a placeholder value.
 */

/* ------------------------------------------------------------- GitHub ---- */
/* Official public API, CORS-enabled, no auth required.                       */

export function useGitHubStats() {
  return useQuery({
    queryKey: ["github", GITHUB_USER],
    staleTime: DAY,
    gcTime: DAY,
    retry: 1,
    queryFn: async () => {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USER}`);
      if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
      const data = await res.json();
      return {
        publicRepos: data.public_repos ?? null,
        followers: data.followers ?? null,
        following: data.following ?? null,
        memberSince: data.created_at ? new Date(data.created_at) : null,
        name: data.name || null,
        bio: data.bio || null,
      };
    },
  });
}

/* ----------------------------------------------------------- LeetCode ---- */
/* Community-run mirror of LeetCode's stats. It is occasionally offline, which */
/* is why every consumer must handle a null result.                           */

export function useLeetCodeStats() {
  return useQuery({
    queryKey: ["leetcode", LEETCODE_USER],
    staleTime: DAY,
    gcTime: DAY,
    retry: 1,
    queryFn: async () => {
      const res = await fetch(
        `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USER}`
      );
      if (!res.ok) throw new Error(`LeetCode API responded ${res.status}`);
      const data = await res.json();
      if (data.status !== "success") throw new Error(data.message || "No data");
      return {
        totalSolved: data.totalSolved ?? null,
        easySolved: data.easySolved ?? null,
        mediumSolved: data.mediumSolved ?? null,
        hardSolved: data.hardSolved ?? null,
        ranking: data.ranking ?? null,
        acceptanceRate: data.acceptanceRate ?? null,
      };
    },
  });
}

/** Years since the first public GitHub activity — derived, not asserted. */
export function yearsSince(date) {
  if (!date) return null;
  const years = (Date.now() - date.getTime()) / (365.25 * DAY);
  return Math.floor(years);
}
