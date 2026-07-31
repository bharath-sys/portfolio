import React from "react";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { SiGeeksforgeeks, SiGithub, SiLeetcode } from "react-icons/si";
import { MdArrowOutward } from "react-icons/md";
import { Label, LiveDot, Reveal, TerminalCard, TerminalRow } from "./ui";
import {
  GFG_USER,
  GITHUB_USER,
  LEETCODE_USER,
  useGitHubStats,
  useLeetCodeStats,
} from "../lib/useLiveStats";
import { GFG, LEETCODE } from "../config/profileStats";

/*
 * GitHub and LeetCode are fetched from their public APIs on load; if a call
 * fails the card falls back to the recorded figures in config/profileStats.js.
 * GeeksforGeeks has no public API, so it always reads from config.
 */

/* ----------------------------------------------------------------- bits --- */

const Stat = ({ value, label, color, loading }) => (
  <Box>
    <Text
      fontFamily="var(--font-display)"
      fontSize={{ base: "1.8rem", md: "2.1rem" }}
      fontWeight="700"
      lineHeight="1"
      letterSpacing="-0.04em"
      color={color}
      sx={{ fontVariantNumeric: "tabular-nums" }}
    >
      {loading ? "··" : typeof value === "number" ? value.toLocaleString() : value}
    </Text>
    <Text textStyle="label" fontSize="9px" mt={2}>
      {label}
    </Text>
  </Box>
);

/** Stacked difficulty bar — proportions come straight from the numbers. */
const DifficultyBar = ({ segments }) => {
  const total = segments.reduce((s, [, v]) => s + v, 0) || 1;
  return (
    <Box>
      <Flex h="6px" borderRadius="1px" overflow="hidden" mb={3}>
        {segments.map(([label, value, color]) => (
          <Box key={label} w={`${(value / total) * 100}%`} bg={color} />
        ))}
      </Flex>
      <Flex gap={4} wrap="wrap">
        {segments.map(([label, value, color]) => (
          <Flex key={label} align="center" gap={1.5}>
            <Box w="7px" h="7px" bg={color} borderRadius="1px" />
            <Text fontSize="10.5px" color="var(--fg-mute)">
              {label} {value}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

const Source = ({ live, loading }) => (
  <Flex
    align="center"
    gap={2}
    mt={5}
    pt={4}
    borderTop="1px solid"
    borderColor="var(--line)"
  >
    {live && <LiveDot />}
    <Text
      fontSize="10px"
      letterSpacing="0.1em"
      textTransform="uppercase"
      color="var(--fg-mute)"
    >
      {loading ? "Fetching…" : live ? "Live from API" : "From profile"}
    </Text>
  </Flex>
);

const CardHead = ({ icon: IconCmp, name, handle, color }) => (
  <Flex align="center" justify="space-between" gap={3} mb={6}>
    <Flex align="center" gap={3} minW={0}>
      <Box as={IconCmp} fontSize="20px" color={color} flexShrink={0} />
      <Box minW={0}>
        <Text
          fontFamily="var(--font-display)"
          fontSize="16px"
          fontWeight="700"
          letterSpacing="-0.02em"
          textTransform="uppercase"
          lineHeight="1.1"
          color="var(--fg)"
        >
          {name}
        </Text>
        <Text textStyle="label" fontSize="9px" mt="3px" noOfLines={1}>
          @{handle}
        </Text>
      </Box>
    </Flex>
    <Box
      as={MdArrowOutward}
      fontSize="17px"
      color="var(--fg-mute)"
      flexShrink={0}
      transition="all .3s var(--ease-out)"
      _groupHover={{ color, transform: "translate(4px,-4px)" }}
    />
  </Flex>
);

/* --------------------------------------------------------------- export --- */

const CodingProfiles = () => {
  const gh = useGitHubStats();
  const lc = useLeetCodeStats();

  const lcLive = !!lc.data?.totalSolved;
  const leet = lcLive ? { ...LEETCODE, ...lc.data } : LEETCODE;

  const cardProps = (color) => ({
    as: "a",
    target: "_blank",
    rel: "noopener noreferrer",
    accent: color,
    h: "100%",
    display: "flex",
    flexDirection: "column",
    _hover: { borderColor: color, transform: "translateY(-3px)" },
    bodyProps: { display: "flex", flexDirection: "column", flex: "1" },
  });

  return (
    <Box w="100%">
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={5}>
        {/* ----------------------------------------------------- LeetCode */}
        <Reveal from="up">
          <TerminalCard
            {...cardProps("#FFA116")}
            href={`https://leetcode.com/u/${LEETCODE_USER}/`}
            path="~/profiles/leetcode"
          >
            <CardHead
              icon={SiLeetcode}
              name="LeetCode"
              handle={LEETCODE_USER}
              color="#FFA116"
            />

            <Grid templateColumns="1fr 1fr" gap={5} mb={6}>
              <Stat
                value={leet.totalSolved}
                label="Problems solved"
                color="#FFA116"
                loading={lc.isLoading}
              />
              <Stat
                value={leet.mediumSolved}
                label="Medium solved"
                color="var(--fg)"
                loading={lc.isLoading}
              />
            </Grid>

            <Box mb={6}>
              <DifficultyBar
                segments={[
                  ["Easy", leet.easySolved, "#00B8A3"],
                  ["Medium", leet.mediumSolved, "#FFB800"],
                  ["Hard", leet.hardSolved, "#FF375F"],
                ]}
              />
            </Box>

            <Box mt="auto">
              <TerminalRow
                label="active days / yr"
                value={LEETCODE.activeDays}
                accent
              />
              <TerminalRow
                label="submissions / yr"
                value={LEETCODE.submissionsPastYear}
              />
              <TerminalRow label="longest streak" value={`${LEETCODE.maxStreak} days`} last />
            </Box>

            <Source live={lcLive} loading={lc.isLoading} />
          </TerminalCard>
        </Reveal>

        {/* ---------------------------------------------------------- GFG */}
        <Reveal from="up" delay={0.07}>
          <TerminalCard
            {...cardProps("#2F8D46")}
            href={`https://www.geeksforgeeks.org/user/${GFG_USER}/`}
            path="~/profiles/geeksforgeeks"
          >
            <CardHead
              icon={SiGeeksforgeeks}
              name="GeeksforGeeks"
              handle={GFG_USER}
              color="#2F8D46"
            />

            <Grid templateColumns="1fr 1fr" gap={5} mb={6}>
              <Stat value={GFG.totalSolved} label="Problems solved" color="#2F8D46" />
              <Stat value={GFG.codingScore} label="Coding score" color="var(--fg)" />
            </Grid>

            <Box mb={6}>
              <DifficultyBar
                segments={[
                  ["Basic", GFG.breakdown.basic, "#7CB342"],
                  ["Easy", GFG.breakdown.easy, "#00B8A3"],
                  ["Medium", GFG.breakdown.medium, "#FFB800"],
                  ["Hard", GFG.breakdown.hard, "#FF375F"],
                ]}
              />
            </Box>

            <Box mt="auto">
              <TerminalRow label="institute rank" value={`#${GFG.instituteRank}`} accent />
              <TerminalRow label="institute" value={GFG.institute} last />
            </Box>

            <Source live={false} />
          </TerminalCard>
        </Reveal>

        {/* ------------------------------------------------------- GitHub */}
        <Reveal from="up" delay={0.14}>
          <TerminalCard
            {...cardProps("#8B949E")}
            href={`https://github.com/${GITHUB_USER}`}
            path="~/profiles/github"
          >
            <CardHead icon={SiGithub} name="GitHub" handle={GITHUB_USER} color="#8B949E" />

            <Grid templateColumns="1fr 1fr" gap={5} mb={6}>
              <Stat
                value={gh.data?.publicRepos ?? "—"}
                label="Public repos"
                color="var(--fg)"
                loading={gh.isLoading}
              />
              <Stat
                value={
                  gh.data?.memberSince ? gh.data.memberSince.getFullYear() : "—"
                }
                label="On GitHub since"
                color="var(--fg)"
                loading={gh.isLoading}
              />
            </Grid>

            <Text
              fontFamily="var(--font-body)"
              fontSize="14px"
              lineHeight="1.6"
              color="var(--fg-dim)"
              mb={6}
            >
              Source for the projects above, plus the smaller experiments that
              don&apos;t make the portfolio.
            </Text>

            <Box mt="auto">
              <TerminalRow label="primary" value="JavaScript · TypeScript" />
              <TerminalRow label="focus" value="React · Node · tooling" last />
            </Box>

            <Source live={!!gh.data} loading={gh.isLoading} />
          </TerminalCard>
        </Reveal>
      </Grid>

      <Reveal from="fade" delay={0.15}>
        <Flex
          mt={5}
          px={{ base: 5, md: 6 }}
          py={4}
          border="1px dashed"
          borderColor="var(--line)"
          borderRadius="2px"
          justify="space-between"
          align="center"
          gap={3}
          wrap="wrap"
        >
          <Label>
            {LEETCODE.totalSolved + GFG.totalSolved} problems solved across both
            platforms
          </Label>
          <Text textStyle="label" fontSize="9px" color="var(--fg-mute)">
            GitHub &amp; LeetCode fetched live on load
          </Text>
        </Flex>
      </Reveal>
    </Box>
  );
};

export default CodingProfiles;
