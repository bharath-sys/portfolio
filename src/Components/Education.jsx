import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchDataByCondition } from "../FireBase/api";
import { MdSchool } from "react-icons/md";
import { Label } from "./ui";
import WindowStack from "./WindowStack";

const slugify = (s, fallback) =>
  String(s || fallback)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const Row = ({ label, value, last }) => (
  <Flex
    justify="space-between"
    align="baseline"
    gap={4}
    py={2.5}
    borderBottom={last ? "none" : "1px dashed"}
    borderColor="var(--line)"
  >
    <Text color="var(--fg-mute)" flexShrink={0}>
      {label}
    </Text>
    <Text color="var(--fg)" textAlign="right" minW={0}>
      {value}
    </Text>
  </Flex>
);

const Education = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchDetails", "education"],
    queryFn: () =>
      fetchDataByCondition({ page: "education", collection: "TimelineDetails" }),
  });

  const items = React.useMemo(
    () =>
      (data ? [...data].sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0)) : []).map(
        (d, i) => ({
          key: d.id || `edu-${i}`,
          tab: (d?.header?.orgName || `Entry ${i + 1}`).split(" ")[0],
          ...d,
        })
      ),
    [data]
  );

  if (isLoading) {
    return (
      <Box
        h={{ base: "460px", md: "480px" }}
        bg="var(--surface-2)"
        borderRadius="2px"
        sx={{ animation: "bkPulse 1.5s ease-in-out infinite" }}
      />
    );
  }

  if (!items.length) return <Label rule>Nothing to show yet</Label>;

  return (
    <WindowStack
      items={items}
      accent="var(--violet)"
      path={(item) => `~/education/${slugify(item?.header?.orgName, "entry")}`}
      renderTitle={(item) => {
        const h = item.header || {};
        return (
          <Flex align="center" gap={3.5}>
            {/* Icon rather than the uploaded logo, for a consistent look */}
            <Flex
              w="38px"
              h="38px"
              flexShrink={0}
              align="center"
              justify="center"
              border="1px solid"
              borderColor="var(--line-2)"
              borderRadius="2px"
              bg="var(--surface)"
              color="var(--violet)"
            >
              <Box as={MdSchool} fontSize="17px" />
            </Flex>

            <Box flex="1" minW={0}>
              <Text
                fontFamily="var(--font-display)"
                fontSize={{ base: "1.05rem", md: "1.2rem" }}
                fontWeight="700"
                letterSpacing="-0.025em"
                textTransform="uppercase"
                lineHeight="1.1"
                color="var(--fg)"
                noOfLines={1}
                mb="3px"
              >
                {h.orgName}
              </Text>
              <Text fontSize="11.5px" color="var(--fg-dim)" noOfLines={1}>
                {h.orgRole}
              </Text>
            </Box>

            <Text
              fontSize="10.5px"
              color="var(--fg-mute)"
              flexShrink={0}
              display={{ base: "none", sm: "block" }}
            >
              {h.timeSpent}
            </Text>
          </Flex>
        );
      }}
      renderBody={(item, i) => {
        const h = item.header || {};
        return (
          <Box>
            <Row label="institution" value={h.orgName} />
            <Row label="programme" value={h.orgRole} />
            <Row label="period" value={h.timeSpent} />
            <Row label="stage" value={i === 0 ? "Most recent" : `Prior (${i + 1})`} last />
          </Box>
        );
      }}
    />
  );
};

export default Education;
