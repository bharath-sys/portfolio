import React from 'react';
import { Box, Heading, Text, SimpleGrid, Icon, useColorMode, Link, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { MdMusicNote } from 'react-icons/md';
import { SiSpotify } from 'react-icons/si';

const MotionBox = motion(Box);

const PersonalSection = () => {
    const { colorMode } = useColorMode();

    return (
        <Box w="100%" mt={12}>
            <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                mb={8}
            >
                <Flex align="center" justify="center" gap={3} mb={3}>
                    <Icon as={MdMusicNote} w={7} h={7} color="#0071e3" />
                    <Heading
                        fontSize={{ base: "24px", md: "32px" }}
                        fontWeight="700"
                        textAlign="center"
                        color="inherit"
                        letterSpacing="-0.01em"
                    >
                        Personal
                    </Heading>
                </Flex>
                <Text
                    fontSize="15px"
                    color="gray.500"
                    textAlign="center"
                    maxW="600px"
                    mx="auto"
                >
                    A glimpse into my interests beyond code
                </Text>
            </MotionBox>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                {/* Music Section */}
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    whileHover={{ y: -6 }}
                >
                    <Link
                        href="https://open.spotify.com/user/kbk.bharath12345@gmail.com"
                        isExternal
                        _hover={{ textDecoration: 'none' }}
                    >
                        <Box
                            p={6}
                            bg={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'}
                            backdropFilter="blur(20px)"
                            border="2px solid"
                            borderColor={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}
                            borderRadius="18px"
                            transition="all 0.3s ease"
                            h="100%"
                            _hover={{
                                borderColor: '#1DB954',
                                boxShadow: '0 0 40px rgba(29, 185, 84, 0.3)',
                            }}
                        >
                            <Flex align="center" gap={3} mb={4}>
                                <Icon as={SiSpotify} w={8} h={8} color="#1DB954" />
                                <Heading fontSize="24px" fontWeight="700" color="inherit">
                                    Music
                                </Heading>
                            </Flex>

                            <Text fontSize="15px" color="gray.500" mb={4}>
                                Check out what I'm listening to on Spotify
                            </Text>

                            <Box
                                p={3}
                                bg={colorMode === 'dark' ? 'rgba(29, 185, 84, 0.1)' : 'rgba(29, 185, 84, 0.05)'}
                                borderRadius="12px"
                                border="1px solid"
                                borderColor={colorMode === 'dark' ? 'rgba(29, 185, 84, 0.2)' : 'rgba(29, 185, 84, 0.15)'}
                            >
                                <Text fontSize="14px" color="#1DB954" fontWeight="600" textAlign="center">
                                    View My Top Listens →
                                </Text>
                            </Box>
                        </Box>
                    </Link>
                </MotionBox>
            </SimpleGrid>
        </Box>
    );
};

export default PersonalSection;
