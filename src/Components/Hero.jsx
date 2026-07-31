import React from "react";
import { Box, Flex, Grid, Text, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdArrowOutward, MdDescription, MdEmail } from "react-icons/md";
import { LiveDot, Magnetic, MotionBox, TerminalCard, TerminalRow } from "./ui";
import ResumeModal, { RESUME_URL } from "./ResumeSection";
import { useScramble } from "../lib/hooks";
import { scrollToSection } from "../lib/scroll";
import { YEARS_EXPERIENCE } from "../config/profileStats";

const MotionText = motion(Text);
const EASE = [0.16, 1, 0.3, 1];

/* --------------------------------------------------------- kinetic type --- */

const KineticHeading = ({ text, delay = 0 }) => {
  const words = String(text || "").split(" ").filter(Boolean);

  return (
    <Box>
      {words.map((word, i) => (
        <Box
          key={`${word}-${i}`}
          display="inline-block"
          overflow="hidden"
          verticalAlign="bottom"
          mr="0.22em"
        >
          <MotionText
            as="span"
            display="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.85, delay: delay + i * 0.06, ease: EASE }}
          >
            {word}
          </MotionText>
        </Box>
      ))}
    </Box>
  );
};

/* ---------------------------------------------------------------- socials -- */

const SOCIALS = [
  { icon: FaGithub, href: "https://github.com/bharath-sys", label: "GitHub" },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/kodigudla-bharath-kumar/",
    label: "LinkedIn",
  },
  { icon: MdEmail, href: "mailto:kbk.bharath12345@gmail.com", label: "Email" },
];

const SocialButton = ({ icon: IconCmp, href, label }) => (
  <Magnetic strength={0.2}>
    <Flex
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      w="46px"
      h="46px"
      align="center"
      justify="center"
      border="1px solid"
      borderColor="var(--line-2)"
      borderRadius="2px"
      color="var(--fg-dim)"
      fontSize="17px"
      transition="all .3s var(--ease-out)"
      _hover={{
        bg: "var(--acid)",
        color: "var(--acid-ink)",
        borderColor: "var(--acid)",
      }}
    >
      <Box as={IconCmp} />
    </Flex>
  </Magnetic>
);

/* ------------------------------------------------------------------ Hero -- */

const Hero = ({ heading, subHeading, isLoading }) => {
  const role = useScramble("FULL-STACK ENGINEER", { speed: 30 });
  const resume = useDisclosure();

  const title = heading || "Full-stack engineer who ships end to end.";
  const sub =
    subHeading ||
    `${YEARS_EXPERIENCE}+ years building production web applications — React front ends, Node services, and the databases and deployments behind them.`;

  return (
    <Box
      position="relative"
      maxW="var(--maxw)"
      mx="auto"
      px={{ base: 5, md: 8 }}
      pt={{ base: 9, md: 12 }}
      pb={{ base: 10, md: 12 }}
    >
      <Grid
        templateColumns={{ base: "1fr", lg: "1.45fr 1fr" }}
        gap={{ base: 9, lg: 12 }}
        alignItems="center"
      >
        {/* ---------------------------------------------------------- left */}
        <Box>
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Flex align="center" gap={3} mb={{ base: 5, md: 6 }} wrap="wrap">
              <Flex
                align="center"
                gap={2}
                px={3}
                py={1.5}
                border="1px solid"
                borderColor="var(--line)"
                borderRadius="2px"
                bg="var(--surface)"
              >
                <LiveDot />
                <Text textStyle="label" fontSize="10px" color="var(--fg-dim)">
                  Open to opportunities
                </Text>
              </Flex>
              <Text
                textStyle="label"
                fontSize="10px"
                color="var(--accent-text)"
                fontFamily="var(--font-mono)"
              >
                {role}
              </Text>
            </Flex>
          </MotionBox>

          <Box
            as="h1"
            textStyle="display"
            fontSize={{
              base: "clamp(2.1rem, 9.5vw, 3rem)",
              md: "clamp(2.8rem, 5.4vw, 4.3rem)",
            }}
            color="var(--fg)"
            mb={{ base: 5, md: 6 }}
          >
            {isLoading && !heading ? (
              <Box
                w="80%"
                h="0.85em"
                bg="var(--surface-2)"
                borderRadius="2px"
                sx={{ animation: "bkPulse 1.4s ease-in-out infinite" }}
              />
            ) : (
              <KineticHeading text={title} delay={0.12} />
            )}
          </Box>

          <MotionBox
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
          >
            <Text
              textStyle="body"
              fontSize={{ base: "14.5px", md: "16px" }}
              maxW="54ch"
              mb={{ base: 7, md: 8 }}
              borderLeft="2px solid"
              borderColor="var(--acid)"
              pl={5}
            >
              {sub}
            </Text>

            <Flex gap={3} align="center" wrap="wrap">
              {/* primary: what a recruiter wants first */}
              <Magnetic strength={0.15}>
                <Flex
                  as="button"
                  type="button"
                  onClick={resume.onOpen}
                  role="group"
                  align="center"
                  gap={3}
                  h="54px"
                  px={7}
                  bg="var(--acid)"
                  color="var(--acid-ink)"
                  border="1px solid var(--acid)"
                  borderRadius="2px"
                  fontFamily="var(--font-mono)"
                  fontSize="12px"
                  letterSpacing="0.12em"
                  textTransform="uppercase"
                  transition="all .3s var(--ease-out)"
                  _hover={{
                    bg: "transparent",
                    color: "var(--accent-text)",
                    transform: "translate(-3px,-3px)",
                    boxShadow: "5px 5px 0 0 var(--acid)",
                  }}
                >
                  <Box as={MdDescription} fontSize="16px" />
                  View résumé
                </Flex>
              </Magnetic>

              <Flex
                as="button"
                type="button"
                onClick={() => scrollToSection("profiles")}
                role="group"
                align="center"
                gap={3}
                h="54px"
                px={6}
                border="1px solid"
                borderColor="var(--line-2)"
                borderRadius="2px"
                color="var(--fg-dim)"
                fontFamily="var(--font-mono)"
                fontSize="12px"
                letterSpacing="0.12em"
                textTransform="uppercase"
                transition="all .3s var(--ease-out)"
                _hover={{ borderColor: "var(--fg)", color: "var(--fg)" }}
              >
                Explore the work
                <Box
                  as={MdArrowOutward}
                  transition="transform .3s var(--ease-out)"
                  _groupHover={{ transform: "translate(3px,-3px)" }}
                />
              </Flex>

              <Flex gap={2}>
                {SOCIALS.map((s) => (
                  <SocialButton key={s.label} {...s} />
                ))}
              </Flex>
            </Flex>

            <Box
              as="a"
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              display="inline-block"
              mt={5}
              fontFamily="var(--font-mono)"
              fontSize="11px"
              letterSpacing="0.1em"
              textTransform="uppercase"
              color="var(--fg-mute)"
              className="bk-underline-sweep"
              _hover={{ color: "var(--fg)" }}
              transition="color .25s"
            >
              or download the PDF ↗
            </Box>
          </MotionBox>
        </Box>

        {/* --------------------------------------------------------- right */}
        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        >
          <TerminalCard path="~/bharath — profile" title="whoami --verbose">
            {[
              ["role", "Full-Stack Engineer", false],
              ["experience", `${YEARS_EXPERIENCE}+ years`, false],
              ["frontend", "React · TypeScript", false],
              ["backend", "Node · Express · MongoDB", false],
              ["platform", "AWS · Docker · Redis", false],
              ["location", "Hyderabad, India", false],
              ["status", "open to offers", true],
            ].map(([k, v, accent], i, arr) => (
              <TerminalRow
                key={k}
                label={k}
                value={v}
                accent={accent}
                last={i === arr.length - 1}
              />
            ))}

            <Text mt={4} color="var(--fg-mute)" className="bk-caret">
              <Box as="span" color="var(--accent-text)">
                $
              </Box>{" "}
            </Text>
          </TerminalCard>
        </MotionBox>
      </Grid>

      <ResumeModal isOpen={resume.isOpen} onClose={resume.onClose} />
    </Box>
  );
};

export default Hero;
