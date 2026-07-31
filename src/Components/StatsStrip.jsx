import React from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import { useCountUp } from "../lib/hooks";
import { useGitHubStats, useLeetCodeStats } from "../lib/useLiveStats";
import { GFG, LEETCODE, YEARS_EXPERIENCE } from "../config/profileStats";

/*
 * Four numbers, chosen because they're the ones worth leading with.
 * Nothing at zero and nothing unflattering appears here.
 */

const Cell = ({ value, suffix = "", label, note, index, total }) => {
  const numeric = typeof value === "number";
  const [ref, counted] = useCountUp(numeric ? value : 0, { duration: 1300 });

  return (
    <Box
      ref={ref}
      py={{ base: 7, md: 9 }}
      px={{ base: 4, md: 6 }}
      borderRight={{ base: "none", md: index < total - 1 ? "1px solid" : "none" }}
      borderBottom={{ base: index < total - 1 ? "1px solid" : "none", md: "none" }}
      borderColor="var(--line)"
      position="relative"
      role="group"
      transition="background-color .3s var(--ease-out)"
      _hover={{ bg: "var(--surface)" }}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        h="2px"
        w="0%"
        bg="var(--acid)"
        transition="width .45s var(--ease-out)"
        _groupHover={{ w: "100%" }}
      />
      <Text
        fontFamily="var(--font-display)"
        fontSize={{ base: "2.3rem", md: "3rem" }}
        fontWeight="700"
        lineHeight="1"
        letterSpacing="-0.05em"
        color="var(--fg)"
        sx={{ fontVariantNumeric: "tabular-nums" }}
      >
        {numeric ? counted.toLocaleString() : value}
        <Box as="span" color="var(--accent-text)">
          {suffix}
        </Box>
      </Text>
      <Text textStyle="label" mt={3}>
        {label}
      </Text>
      {note && (
        <Text textStyle="label" fontSize="9px" mt={1.5} color="var(--fg-mute)">
          {note}
        </Text>
      )}
    </Box>
  );
};

const StatsStrip = () => {
  const gh = useGitHubStats();
  const lc = useLeetCodeStats();

  const leetSolved = lc.data?.totalSolved ?? LEETCODE.totalSolved;

  const cells = [
    {
      value: YEARS_EXPERIENCE,
      suffix: "+",
      label: "Years professional",
      note: "Full-stack",
    },
    {
      value: leetSolved + GFG.totalSolved,
      suffix: "+",
      label: "Problems solved",
      note: "LeetCode + GeeksforGeeks",
    },
    {
      value: GFG.codingScore,
      label: "GFG coding score",
      note: `Institute rank #${GFG.instituteRank}`,
    },
    {
      value: gh.data?.publicRepos ?? "—",
      label: "Public repos",
      note: "GitHub · live",
    },
  ];

  return (
    <Box borderY="1px solid" borderColor="var(--line)" position="relative" zIndex={1}>
      <Box maxW="var(--maxw)" mx="auto" px={{ base: 5, md: 8 }}>
        <Grid templateColumns={{ base: "1fr 1fr", md: "repeat(4, 1fr)" }}>
          {cells.map((c, i) => (
            <Cell key={c.label} {...c} index={i} total={cells.length} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default StatsStrip;
