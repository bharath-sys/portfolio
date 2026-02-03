import React from 'react';
import { Box, Flex, Heading, Text, Avatar, useColorMode, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useQuery } from "@tanstack/react-query";
import { fetchDataByCondition } from "../FireBase/api";
import { MdWorkOutline, MdSchool } from "react-icons/md";

const MotionBox = motion(Box);

const TimelineItem = ({ data, index, isEducation }) => {
    const { colorMode } = useColorMode();
    const isEven = index % 2 === 0;

    return (
        <MotionBox
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            position="relative"
        >
            <Flex
                direction={{ base: "column", md: isEven ? "row" : "row-reverse" }}
                align="center"
                gap={6}
                mb={12}
            >
                {/* Content */}
                <Box flex={1} textAlign={{ base: "center", md: isEven ? "right" : "left" }}>
                    <Text
                        fontSize="14px"
                        color="#0071e3"
                        fontWeight="600"
                        mb={2}
                        textTransform="uppercase"
                        letterSpacing="0.05em"
                    >
                        {data?.header?.timeSpent}
                    </Text>
                    <Heading
                        fontSize="24px"
                        fontWeight="700"
                        color="inherit"
                        mb={2}
                        letterSpacing="-0.01em"
                    >
                        {data?.header?.orgName}
                    </Heading>
                    <Text fontSize="17px" color="gray.500" mb={4}>
                        {data?.header?.orgRole}
                    </Text>
                    {data?.details && (
                        <Box
                            p={4}
                            bg={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'}
                            borderRadius="12px"
                            border="1px solid"
                            borderColor={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}
                        >
                            {data.details.slice(0, 2).map((detail, i) => (
                                <Text
                                    key={i}
                                    fontSize="15px"
                                    color="gray.500"
                                    mb={i < 1 ? 2 : 0}
                                    textAlign={{ base: "center", md: isEven ? "right" : "left" }}
                                >
                                    • {detail}
                                </Text>
                            ))}
                        </Box>
                    )}
                </Box>

                {/* Center Avatar */}
                <Box
                    position="relative"
                    flexShrink={0}
                    zIndex={2}
                >
                    <Box
                        w="80px"
                        h="80px"
                        borderRadius="full"
                        bg={colorMode === 'dark' ? '#000' : '#fff'}
                        border="4px solid"
                        borderColor={colorMode === 'dark' ? 'rgba(0, 113, 227, 0.3)' : 'rgba(0, 113, 227, 0.2)'}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                    >
                        <Avatar
                            size="md"
                            name={data?.header?.orgName}
                            src={data?.header?.logo}
                            bg="rgba(0, 113, 227, 0.1)"
                        />
                        <Box
                            position="absolute"
                            bottom="-2px"
                            right="-2px"
                            bg="#0071e3"
                            borderRadius="full"
                            p={1.5}
                            border="2px solid"
                            borderColor={colorMode === 'dark' ? '#000' : '#fff'}
                        >
                            <Icon as={isEducation ? MdSchool : MdWorkOutline} w={3} h={3} color="white" />
                        </Box>
                    </Box>
                </Box>

                {/* Spacer for alignment */}
                <Box flex={1} display={{ base: "none", md: "block" }} />
            </Flex>
        </MotionBox>
    );
};

const ModernTimeline = ({ page }) => {
    const { colorMode } = useColorMode();
    const isEducation = page === 'education';

    const { data, isLoading } = useQuery({
        queryKey: ["fetchDetails", page],
        queryFn: () => fetchDataByCondition({ page: page, collection: 'TimelineDetails' }),
    });

    const sortedData = data?.sort((a, b) => a?.order - b?.order);

    // Vertical timeline for both education and experience
    return (
        <Box w="100%" maxW="900px" mx="auto" position="relative" py={8}>
            <Box
                position="absolute"
                left="50%"
                top={0}
                bottom={0}
                w="2px"
                bgGradient={colorMode === 'dark'
                    ? "linear(to-b, transparent, rgba(0, 113, 227, 0.5), transparent)"
                    : "linear(to-b, transparent, rgba(0, 113, 227, 0.3), transparent)"
                }
                transform="translateX(-50%)"
                display={{ base: "none", md: "block" }}
            />

            {sortedData?.map((item, index) => (
                <TimelineItem
                    key={item.id || index}
                    data={item}
                    index={index}
                    isEducation={isEducation}
                />
            ))}
        </Box>
    );
};

export default ModernTimeline;
