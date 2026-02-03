import React from "react";
import { Avatar, Box, Flex, Heading, Text, Tag, Spacer, useColorMode, Icon } from "@chakra-ui/react";
import { MdWorkOutline } from "react-icons/md";

const CustomCardHeader = ({ data }) => {
  const { colorMode } = useColorMode();

  return (
    <Box w="100%">
      <Flex gap={5} alignItems="start" wrap="wrap">
        <Box position="relative">
          <Avatar
            size="xl"
            name={data?.orgName}
            src={data?.logo}
            bg={colorMode === 'dark' ? "rgba(0, 113, 227, 0.1)" : "rgba(0, 113, 227, 0.08)"}
            border="2px solid"
            borderColor={colorMode === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <Box
            position="absolute"
            bottom="-2px"
            right="-2px"
            bg="#0071e3"
            borderRadius="full"
            p={1.5}
            border="2px solid"
            borderColor={colorMode === 'dark' ? "#000" : "#fff"}
          >
            <Icon as={MdWorkOutline} w={3} h={3} color="white" />
          </Box>
        </Box>

        <Box flex="1" minW="200px">
          <Heading
            fontSize={{ base: "24px", md: "28px" }}
            fontWeight="700"
            color="inherit"
            letterSpacing="-0.02em"
            mb={2}
            lineHeight="1.2"
          >
            {data?.orgName}
          </Heading>
          <Text
            fontSize="19px"
            color="#0071e3"
            fontWeight="600"
            mb={1}
          >
            {data?.orgRole}
          </Text>
          <Tag
            size="md"
            bg={colorMode === 'dark' ? "rgba(168, 85, 247, 0.1)" : "rgba(168, 85, 247, 0.08)"}
            color={colorMode === 'dark' ? "#a855f7" : "#7c3aed"}
            borderRadius="full"
            px={4}
            py={1.5}
            fontWeight="600"
            fontSize="14px"
            border="1px solid"
            borderColor={colorMode === 'dark' ? "rgba(168, 85, 247, 0.2)" : "rgba(168, 85, 247, 0.15)"}
          >
            {data?.timeSpent}
          </Tag>
        </Box>
      </Flex>

      <Box
        h="1px"
        bgGradient={colorMode === 'dark'
          ? "linear(to-r, transparent, rgba(255, 255, 255, 0.1), transparent)"
          : "linear(to-r, transparent, rgba(0, 0, 0, 0.1), transparent)"
        }
        my={6}
      />
    </Box>
  );
};

export default CustomCardHeader;
