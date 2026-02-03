import React from 'react';
import { Box, Flex, Heading, Text, SimpleGrid, Icon, useColorMode, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { SiLeetcode, SiGeeksforgeeks, SiGithub } from 'react-icons/si';
import { MdCode, MdCheckCircle } from 'react-icons/md';

const MotionBox = motion(Box);

const ActivityCalendar = ({ colorMode }) => {
    // Generate 8 weeks of activity data (reduced for better fit)
    const weeks = 8;
    const daysPerWeek = 7;

    const getRandomActivity = () => {
        const rand = Math.random();
        if (rand > 0.7) return 4;
        if (rand > 0.5) return 3;
        if (rand > 0.3) return 2;
        if (rand > 0.15) return 1;
        return 0;
    };

    const getColor = (level) => {
        if (colorMode === 'dark') {
            const colors = [
                'rgba(255, 255, 255, 0.03)',
                'rgba(0, 113, 227, 0.3)',
                'rgba(0, 113, 227, 0.5)',
                'rgba(0, 113, 227, 0.7)',
                'rgba(0, 113, 227, 0.9)',
            ];
            return colors[level];
        } else {
            const colors = [
                'rgba(0, 0, 0, 0.03)',
                'rgba(0, 113, 227, 0.2)',
                'rgba(0, 113, 227, 0.4)',
                'rgba(0, 113, 227, 0.6)',
                'rgba(0, 113, 227, 0.8)',
            ];
            return colors[level];
        }
    };

    return (
        <Flex gap={1} justify="center" flexWrap="wrap" maxW="100%">
            {Array.from({ length: weeks }).map((_, weekIndex) => (
                <Flex key={weekIndex} direction="column" gap={1}>
                    {Array.from({ length: daysPerWeek }).map((_, dayIndex) => {
                        const activity = getRandomActivity();
                        return (
                            <MotionBox
                                key={dayIndex}
                                w="8px"
                                h="8px"
                                borderRadius="2px"
                                bg={getColor(activity)}
                                border="1px solid"
                                borderColor={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}
                                whileHover={{ scale: 1.3 }}
                                transition={{ duration: 0.2 }}
                            />
                        );
                    })}
                </Flex>
            ))}
        </Flex>
    );
};

const PlatformCard = ({ platform, icon, color, stats, url }) => {
    const { colorMode } = useColorMode();

    return (
        <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6 }}
        >
            <Link href={url} isExternal _hover={{ textDecoration: 'none' }}>
                <Box
                    p={5}
                    bg={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'}
                    backdropFilter="blur(20px)"
                    border="2px solid"
                    borderColor={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}
                    borderRadius="18px"
                    transition="all 0.3s ease"
                    h="100%"
                    _hover={{
                        borderColor: color,
                        boxShadow: `0 0 40px ${color}30`,
                    }}
                >
                    <Flex align="center" gap={3} mb={3}>
                        <Icon as={icon} w={6} h={6} color={color} />
                        <Heading fontSize="20px" fontWeight="700" color="inherit">
                            {platform}
                        </Heading>
                    </Flex>

                    <SimpleGrid columns={2} spacing={3} mb={3}>
                        {stats.map((stat, index) => (
                            <Box key={index}>
                                <Text fontSize="24px" fontWeight="700" color={color} mb={0.5}>
                                    {stat.value}
                                </Text>
                                <Text fontSize="12px" color="gray.500" textTransform="uppercase" letterSpacing="0.05em">
                                    {stat.label}
                                </Text>
                            </Box>
                        ))}
                    </SimpleGrid>

                    <Box
                        p={2.5}
                        bg={colorMode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.5)'}
                        borderRadius="12px"
                        mb={2}
                    >
                        <ActivityCalendar colorMode={colorMode} />
                    </Box>

                    <Text fontSize="11px" color="gray.500" textAlign="center">
                        Activity pattern (simulated)
                    </Text>
                </Box>
            </Link>
        </MotionBox>
    );
};

const CodingProfiles = () => {
    const { colorMode } = useColorMode();

    const leetcodeStats = [
        { value: '500+', label: 'Problems' },
        { value: '150+', label: 'Rating' },
    ];

    const gfgStats = [
        { value: '300+', label: 'Problems' },
        { value: '5★', label: 'Rating' },
    ];

    const githubStats = [
        { value: '50+', label: 'Repositories' },
        { value: '200+', label: 'Contributions' },
    ];

    return (
        <Box w="100%">
            <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                mb={6}
            >
                <Flex align="center" justify="center" gap={3} mb={2}>
                    <Icon as={MdCode} w={7} h={7} color="#0071e3" />
                    <Heading
                        fontSize={{ base: "24px", md: "32px" }}
                        fontWeight="700"
                        textAlign="center"
                        color="inherit"
                        letterSpacing="-0.01em"
                    >
                        Coding Profiles
                    </Heading>
                </Flex>
                <Text
                    fontSize="15px"
                    color="gray.500"
                    textAlign="center"
                    maxW="600px"
                    mx="auto"
                >
                    Consistent problem-solving across platforms
                </Text>
            </MotionBox>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={4}>
                <PlatformCard
                    platform="LeetCode"
                    icon={SiLeetcode}
                    color="#FFA116"
                    stats={leetcodeStats}
                    url="https://leetcode.com/u/k_b_k_bharath/"
                />
                <PlatformCard
                    platform="GeeksforGeeks"
                    icon={SiGeeksforgeeks}
                    color="#2F8D46"
                    stats={gfgStats}
                    url="https://www.geeksforgeeks.org/user/bharathkumar41/"
                />
                <PlatformCard
                    platform="GitHub"
                    icon={SiGithub}
                    color={colorMode === 'dark' ? '#ffffff' : '#181717'}
                    stats={githubStats}
                    url="https://github.com/bharath-sys"
                />
            </SimpleGrid>

            {/* Additional Stats */}
            <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <Flex
                    p={4}
                    bg={colorMode === 'dark' ? 'rgba(0, 113, 227, 0.05)' : 'rgba(0, 113, 227, 0.03)'}
                    borderRadius="18px"
                    border="1px solid"
                    borderColor={colorMode === 'dark' ? 'rgba(0, 113, 227, 0.2)' : 'rgba(0, 113, 227, 0.15)'}
                    align="center"
                    justify="center"
                    gap={6}
                    flexWrap="wrap"
                >
                    <Flex align="center" gap={2}>
                        <Icon as={MdCheckCircle} w={4} h={4} color="#0071e3" />
                        <Text fontSize="15px" fontWeight="600" color="inherit">
                            800+ Total Problems
                        </Text>
                    </Flex>
                    <Flex align="center" gap={2}>
                        <Icon as={MdCode} w={4} h={4} color="#0071e3" />
                        <Text fontSize="15px" fontWeight="600" color="inherit">
                            Active Daily Coder
                        </Text>
                    </Flex>
                </Flex>
            </MotionBox>

            {/* Note about data */}
            <Text fontSize="12px" color="gray.500" textAlign="center" mt={3} fontStyle="italic">
                Note: Stats are manually updated. Activity patterns are simulated for visual representation.
            </Text>
        </Box>
    );
};

export default CodingProfiles;
