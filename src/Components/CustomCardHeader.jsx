import React from "react";
import { Avatar, Box, CardHeader, Flex, Heading, Text } from "@chakra-ui/react";
const CustomCardHeader = ({data}) => {
  return (
    <>
      <Flex gap={14} alignItems={"center"}>
        <Avatar
          size="lg"
          name={data?.orgName}
          src={data?.logo}
        />
        <Flex direction={"column"}>
          <Text
            fontFamily="monospace"
            as="b"
            fontSize={{ base: "1.2em", md: "1.5em", lg: "1.5em" }}
          >
            {data?.orgName}
          </Text>
          <Text fontFamily="monospace" as="i">
            {data?.orgRole}
          </Text>
        </Flex>
        <Heading as="h1" fontFamily="monospace" fontSize={"xs"}>
          {data?.timeSpent}
        </Heading>
      </Flex>
      <Box h={0.5} backgroundColor={data?.borderColor} margin="10px" />
    </>
  );
};

export default CustomCardHeader;
