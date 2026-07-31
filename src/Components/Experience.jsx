import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchDataByCondition } from "../FireBase/api";
import { MdWorkOutline } from "react-icons/md";
import { Label, Tag } from "./ui";
import WindowStack from "./WindowStack";

const slugify = (s, fallback) =>
  String(s || fallback)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const Experience = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchDetails", "experience"],
    queryFn: () =>
      fetchDataByCondition({ page: "experience", collection: "TimelineDetails" }),
  });

  const roles = React.useMemo(
    () =>
      (data ? [...data].sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0)) : []).map(
        (d, i) => ({
          key: d.id || `role-${i}`,
          tab: d?.header?.orgName || `Role ${i + 1}`,
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

  if (!roles.length) return <Label rule>Nothing to show yet</Label>;

  return (
    <WindowStack
      items={roles}
      accent="var(--acid)"
      path={(item) => `~/experience/${slugify(item?.header?.orgName, "role")}`}
      renderTitle={(item) => {
        const h = item.header || {};
        const current = /present/i.test(h.timeSpent || "");
        return (
          <Flex align="center" gap={3.5}>
            {/* Icon rather than the uploaded logo — logos arrive at wildly
                different crops and colours and break the terminal look. */}
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
              color="var(--accent-text)"
            >
              <Box as={MdWorkOutline} fontSize="17px" />
            </Flex>

            <Box flex="1" minW={0}>
              <Flex align="center" gap={2} wrap="wrap" mb="3px">
                <Text
                  fontFamily="var(--font-display)"
                  fontSize={{ base: "1.05rem", md: "1.2rem" }}
                  fontWeight="700"
                  letterSpacing="-0.025em"
                  textTransform="uppercase"
                  lineHeight="1.1"
                  color="var(--fg)"
                  noOfLines={1}
                >
                  {h.orgName}
                </Text>
                {current && <Tag accent>Now</Tag>}
              </Flex>
              <Text fontSize="11.5px" color="var(--fg-dim)" noOfLines={1}>
                {h.orgRole}
              </Text>
            </Box>

            <Text
              fontSize="10.5px"
              color="var(--fg-mute)"
              flexShrink={0}
              textAlign="right"
              display={{ base: "none", sm: "block" }}
            >
              {h.timeSpent}
            </Text>
          </Flex>
        );
      }}
      renderBody={(item) => {
        const details = Array.isArray(item.details) ? item.details : [];
        return details.length ? (
          <Box>
            {details.map((point, i) => (
              <Flex key={i} gap={3} align="flex-start" mb={i < details.length - 1 ? 3 : 0}>
                <Text color="var(--accent-text)" fontSize="11px" pt="3px" flexShrink={0}>
                  →
                </Text>
                <Text
                  fontFamily="var(--font-body)"
                  fontSize="14px"
                  lineHeight="1.6"
                  color="var(--fg-dim)"
                >
                  {point}
                </Text>
              </Flex>
            ))}
          </Box>
        ) : (
          <Text color="var(--fg-mute)">No details recorded</Text>
        );
      }}
    />
  );
};

export default Experience;
