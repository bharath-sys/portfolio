import React from "react";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import TypingEffect from "./TypeEffect";
import { useQuery } from "@tanstack/react-query";
import { fetchDataByCondition } from "../FireBase/api";
import SkeletonWrapper from "./SkeletonWrapper";
import DetailCard from "./Card";
import About from "./Pages/About";
import EducationTimelineExample from "./Pages/Education";
import ContactSection from "./Pages/Contact";

const ContentBox = ({ isHome }) => {
  const params = useParams();
  const page = isHome ? "home" : params?.action;
  const { data, isLoading } = useQuery({
    queryKey: ["fetchData", page],
    queryFn: () => fetchDataByCondition({ page:page,collection:'Contents' }),
  });
  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "center", xl: "center" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="wrap"
      minH="70vh"
      p={5} // Add padding to the Flex component if needed
    >
      <Stack
        p={5}
        spacing={10}
        w={{ base: "100%", md: "100%" }}
        align={["center", "center", "center", "center"]}
        maxW={"800px"}
        minH={"350px"}
      >
        <SkeletonWrapper isLoading={isLoading} isText={true}>
          <Heading as="h1" fontFamily="monospace" fontSize={{base :"3xl",md:"4xl"}} flexWrap={"wrap"}>
            {data?.[0]?.contents?.heading || "No Heading found"}
          </Heading>
        </SkeletonWrapper>
        <SkeletonWrapper isLoading={isLoading} isText={true}>
          <Heading
            as="h2"
            fontSize={{base : "xl",md:"2xl"}}
            color="primary.900"
            opacity="0.8"
            fontWeight="normal"
            lineHeight={1.5}
            textAlign={["center", "center", "left", "left"]}
          >
            {data?.[0]?.contents?.subHeading || "No Heading Found"}
          </Heading>
        </SkeletonWrapper>
        <SkeletonWrapper isLoading={isLoading} isText={true}>
          {data?.[0]?.contents?.typeWriterArray &&
            <Box fontSize="2xl" mt={1} color="green" opacity="1">
              <TypingEffect
                isLoading={isLoading}
                text={data?.[0]?.contents?.typeWriterArray || ["no data found"]}
              />
            </Box>
          }
        </SkeletonWrapper>
        {
          page == 'experience' &&
          <SkeletonWrapper isLoading={isLoading} isText={false}>
            <DetailCard page={page}/>
          </SkeletonWrapper>
        }
        {
          page == 'about' &&
          <About/>
        }
        {
          page == 'education' &&
          <DetailCard page={page}/>
        }
        {
          page == "contact" && 
          <ContactSection/>
        }
      </Stack>
    </Flex>
  );
};

export default ContentBox;
