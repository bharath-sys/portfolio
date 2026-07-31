import React from "react";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { Clock, HoverSwap, Label, LiveDot, Marquee } from "./ui";
import { scrollToSection } from "../lib/scroll";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/bharath-sys" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kodigudla-bharath-kumar/" },
  { label: "LeetCode", href: "https://leetcode.com/u/k_b_k_bharath/" },
  {
    label: "GeeksforGeeks",
    href: "https://www.geeksforgeeks.org/user/bharathkumar41/",
  },
];

const SECTIONS = [
  { label: "Profiles", id: "profiles" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Stack", id: "stack" },
  { label: "Contact", id: "contact" },
];

const Footer = () => (
  <Box as="footer" position="relative" zIndex={1}>
    <Marquee
      items={[
        "LET'S BUILD SOMETHING",
        "OPEN TO OPPORTUNITIES",
        "KBK.BHARATH12345@GMAIL.COM",
        "SHIP · MEASURE · ITERATE",
      ]}
      speed={32}
      color="var(--fg)"
      fontSize={{ base: "14px", md: "18px" }}
      py={4}
    />

    <Box borderBottom="1px solid" borderColor="var(--line)">
      <Box
        maxW="var(--maxw)"
        mx="auto"
        px={{ base: 5, md: 8 }}
        py={{ base: 12, md: 20 }}
      >
        <Grid
          templateColumns={{ base: "1fr", md: "1.4fr 1fr 1fr" }}
          gap={{ base: 10, md: 12 }}
        >
          <Box>
            <Text
              textStyle="display"
              fontSize={{ base: "clamp(2.2rem,11vw,3rem)", md: "3.4rem" }}
              lineHeight="0.9"
              mb={5}
            >
              Let&apos;s
              <br />
              <Box as="span" color="var(--accent-text)">
                ship it.
              </Box>
            </Text>
            <Box
              as="a"
              href="mailto:kbk.bharath12345@gmail.com"
              display="inline-block"
              fontFamily="var(--font-mono)"
              fontSize={{ base: "13px", md: "15px" }}
              className="bk-underline-sweep"
              color="var(--fg-dim)"
              _hover={{ color: "var(--fg)" }}
              transition="color .3s"
            >
              kbk.bharath12345@gmail.com
            </Box>
          </Box>

          <Box>
            <Label mb={5}>Sections</Label>
            <Flex direction="column" gap={2.5} align="flex-start">
              {SECTIONS.map((s) => (
                <Box
                  key={s.id}
                  as="button"
                  type="button"
                  onClick={() => scrollToSection(s.id)}
                >
                  <HoverSwap
                    fontFamily="var(--font-mono)"
                    fontSize="13px"
                    color="var(--fg-dim)"
                  >
                    {s.label}
                  </HoverSwap>
                </Box>
              ))}
            </Flex>
          </Box>

          <Box>
            <Label mb={5}>Elsewhere</Label>
            <Flex direction="column" gap={2.5} align="flex-start">
              {SOCIALS.map((s) => (
                <Box
                  key={s.label}
                  as="a"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HoverSwap
                    fontFamily="var(--font-mono)"
                    fontSize="13px"
                    color="var(--fg-dim)"
                  >
                    {s.label} ↗
                  </HoverSwap>
                </Box>
              ))}
            </Flex>
          </Box>
        </Grid>
      </Box>
    </Box>

    <Box maxW="var(--maxw)" mx="auto" px={{ base: 5, md: 8 }} py={5}>
      <Flex
        justify="space-between"
        align="center"
        gap={4}
        wrap="wrap"
        fontFamily="var(--font-mono)"
        fontSize="10px"
        letterSpacing="0.14em"
        textTransform="uppercase"
        color="var(--fg-mute)"
      >
        <Text>© {new Date().getFullYear()} Bharath Kumar</Text>
        <Flex align="center" gap={2}>
          <LiveDot />
          <Text>
            Hyderabad — <Clock as="span" />
          </Text>
        </Flex>
        <Text>React · Chakra · Firebase</Text>
      </Flex>
    </Box>
  </Box>
);

export default Footer;
