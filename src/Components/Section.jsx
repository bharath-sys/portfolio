import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Reveal } from "./ui";
import useContents from "../lib/useContents";

/**
 * Section shell for the single-page layout.
 *
 * Owns the scroll anchor, the numbered terminal-style header, and the copy
 * pulled from the Firestore `Contents` doc for this section. Falls back to
 * local defaults so the page never renders empty while data loads.
 */
const Section = ({
  id,
  page,
  index,
  eyebrow,
  fallbackTitle,
  fallbackSub,
  children,
  borderTop = true,
  py = { base: 20, md: 32 },
}) => {
  const { heading, subHeading, isLoading } = useContents(page);
  const title = heading || fallbackTitle;
  const sub = subHeading || fallbackSub;

  return (
    <Box
      as="section"
      id={id}
      position="relative"
      zIndex={1}
      borderTop={borderTop ? "1px solid" : "none"}
      borderColor="var(--line)"
      // offset so the sticky header never covers a section heading
      sx={{ scrollMarginTop: "calc(var(--nav-h) + 12px)" }}
    >
      <Box maxW="var(--maxw)" mx="auto" px={{ base: 5, md: 8 }} py={py}>
        <Box mb={{ base: 10, md: 14 }}>
          <Reveal from="fade">
            <Flex align="center" gap={3} mb={{ base: 5, md: 7 }}>
              <Text textStyle="label" color="var(--accent-text)">
                [{String(index).padStart(2, "0")}]
              </Text>
              <Text textStyle="label">{eyebrow}</Text>
              <Box flex="1" h="1px" bg="var(--line)" />
              <Text textStyle="label" fontSize="9px" display={{ base: "none", sm: "block" }}>
                ./{id}
              </Text>
            </Flex>
          </Reveal>

          <Reveal from="up" delay={0.05}>
            {isLoading && !title ? (
              <Box
                w={{ base: "80%", md: "50%" }}
                h={{ base: "2.5rem", md: "4rem" }}
                bg="var(--surface-2)"
                borderRadius="2px"
                sx={{ animation: "bkPulse 1.4s ease-in-out infinite" }}
              />
            ) : (
              <Text
                as="h2"
                textStyle="sectionTitle"
                fontSize={{
                  base: "clamp(2rem, 10vw, 2.8rem)",
                  md: "clamp(2.8rem, 5.5vw, 4.2rem)",
                }}
                color="var(--fg)"
              >
                {title}
              </Text>
            )}
          </Reveal>

          {sub && (
            <Reveal from="up" delay={0.1}>
              <Text
                textStyle="body"
                mt={{ base: 5, md: 6 }}
                maxW="62ch"
                borderLeft="2px solid"
                borderColor="var(--acid)"
                pl={5}
              >
                {sub}
              </Text>
            </Reveal>
          )}
        </Box>

        {children}
      </Box>
    </Box>
  );
};

export default Section;
