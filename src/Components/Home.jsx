import React from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "./Hero";
import StatsStrip from "./StatsStrip";
import SkillsSection from "./SkillsSection";
import CodingProfiles from "./CodingProfiles";
import Experience from "./Experience";
import Education from "./Education";
import Contact from "./Contact";
import Section from "./Section";
import TerminalBackdrop from "./AnimatedBackground";
import Cursor from "./CursorMesh";
import { Label, Reveal } from "./ui";
import useContents from "../lib/useContents";

/**
 * Single page. Capability first (stack, problem solving), then the record
 * (experience and education side by side as stacked terminal windows), then
 * contact. Section copy comes from the Firestore `Contents` collection.
 */
const Home = () => {
  const home = useContents("home");

  return (
    <Box minH="100vh" position="relative">
      <TerminalBackdrop />
      <Cursor />
      <Header />

      <Box as="main">
        <Box id="top">
          <Hero
            heading={home.heading}
            subHeading={home.subHeading}
            isLoading={home.isLoading}
          />
        </Box>

        <StatsStrip />

        <Section
          id="profiles"
          page="profiles"
          index={1}
          eyebrow="Problem solving"
          fallbackTitle="Coding profiles"
          fallbackSub="GitHub and LeetCode figures are fetched live from their public APIs."
          borderTop={false}
        >
          <CodingProfiles />
        </Section>

        {/* experience + education, side by side */}
        <Box
          as="section"
          id="experience"
          position="relative"
          zIndex={1}
          borderTop="1px solid"
          borderColor="var(--line)"
          sx={{ scrollMarginTop: "calc(var(--nav-h) + 12px)" }}
        >
          <Box
            maxW="var(--maxw)"
            mx="auto"
            px={{ base: 5, md: 8 }}
            py={{ base: 20, md: 32 }}
          >
            <Reveal from="fade">
              <Label index={2} rule mb={{ base: 5, md: 7 }}>
                Track record
              </Label>
            </Reveal>

            <Reveal from="up" delay={0.05}>
              <Text
                as="h2"
                textStyle="sectionTitle"
                fontSize={{
                  base: "clamp(2rem, 10vw, 2.8rem)",
                  md: "clamp(2.8rem, 5.5vw, 4.2rem)",
                }}
                color="var(--fg)"
                mb={{ base: 10, md: 14 }}
              >
                Where I&apos;ve worked
                <Box as="span" color="var(--accent-text)">
                  {" "}
                  &amp; studied
                </Box>
              </Text>
            </Reveal>

            <Grid
              templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
              gap={{ base: 12, lg: 8 }}
              alignItems="start"
            >
              <Box>
                <Label mb={4} accent>
                  Work experience
                </Label>
                <Experience />
              </Box>

              <Box id="education" sx={{ scrollMarginTop: "calc(var(--nav-h) + 12px)" }}>
                <Label mb={4} accent>
                  Education
                </Label>
                <Education />
              </Box>
            </Grid>
          </Box>
        </Box>

        <Section
          id="stack"
          page="stack"
          index={3}
          eyebrow="Toolkit"
          fallbackTitle="What I work with"
          fallbackSub="The tools I use day to day, grouped by where they sit in the stack."
        >
          <SkillsSection />
        </Section>

        <Section
          id="contact"
          page="contact"
          index={4}
          eyebrow="Contact"
          fallbackTitle="Get in touch"
          fallbackSub="Email gets the fastest reply — usually within a day."
        >
          <Contact />
        </Section>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;
