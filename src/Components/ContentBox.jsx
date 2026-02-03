import React from "react";
import { Box, Flex, Heading, Stack, Text, useColorMode } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchDataByCondition } from "../FireBase/api";
import SkeletonWrapper from "./SkeletonWrapper";
import ModernTimeline from "./ModernTimeline";
import About from "./Pages/About";
import ContactSection from "./Pages/Contact";
import SkillsSection from "./SkillsSection";
import ResumeSection from "./ResumeSection";
import { motion } from "framer-motion";

const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const ContentBox = ({ isHome }) => {
  const params = useParams();
  const page = isHome ? "home" : params?.action;
  const { colorMode } = useColorMode();

  const { data, isLoading } = useQuery({
    queryKey: ["fetchData", page],
    queryFn: () => fetchDataByCondition({ page: page, collection: 'Contents' }),
  });

  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      minH={isHome ? "70vh" : "auto"}
      textAlign="center"
      py={{ base: 8, md: 16 }}
    >
      <Stack
        spacing={{ base: 6, md: 10 }}
        w="100%"
        maxW="980px"
        align="center"
      >
        {/* Show heading for home, experience, education */}
        {(isHome || page === 'experience' || page === 'education') && (
          <Box>
            <SkeletonWrapper isLoading={isLoading} isText={true}>
              <MotionHeading
                as="h1"
                fontSize={{ base: "40px", md: "56px", lg: "72px" }}
                fontWeight="700"
                lineHeight="1.1"
                mb={4}
                color="inherit"
                letterSpacing="-0.02em"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {data?.[0]?.contents?.heading || "Welcome"}
              </MotionHeading>
            </SkeletonWrapper>

            <SkeletonWrapper isLoading={isLoading} isText={true}>
              <MotionText
                fontSize={{ base: "17px", md: "19px" }}
                color="gray.500"
                maxW="600px"
                mx="auto"
                fontWeight="400"
                lineHeight="1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {data?.[0]?.contents?.subHeading}
              </MotionText>
            </SkeletonWrapper>
          </Box>
        )}

        {/* Show heading for about and contact */}
        {(page === 'about' || page === 'contact') && (
          <Box>
            <SkeletonWrapper isLoading={isLoading} isText={true}>
              <MotionHeading
                as="h1"
                fontSize={{ base: "40px", md: "56px", lg: "72px" }}
                fontWeight="700"
                lineHeight="1.1"
                mb={4}
                color="inherit"
                letterSpacing="-0.02em"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {data?.[0]?.contents?.heading || (page === 'about' ? 'Projects' : 'Contact')}
              </MotionHeading>
            </SkeletonWrapper>

            <SkeletonWrapper isLoading={isLoading} isText={true}>
              <MotionText
                fontSize={{ base: "17px", md: "19px" }}
                color="gray.500"
                maxW="600px"
                mx="auto"
                fontWeight="400"
                lineHeight="1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {data?.[0]?.contents?.subHeading}
              </MotionText>
            </SkeletonWrapper>
          </Box>
        )}

        {/* Home page content */}
        {isHome && (
          <>
            <ResumeSection />
            <SkillsSection />
          </>
        )}

        <Box w="100%" pt={{ base: 6, md: 8 }}>
          {(page === 'experience' || page === 'education') && (
            <SkeletonWrapper isLoading={isLoading} isText={false}>
              <ModernTimeline page={page} />
            </SkeletonWrapper>
          )}
          {page === 'about' && <About />}
          {page === "contact" && <ContactSection />}
        </Box>
      </Stack>
    </Flex>
  );
};

export default ContentBox;
