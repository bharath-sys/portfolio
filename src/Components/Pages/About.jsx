import React, { useState } from 'react'
import { Flex, Box, Heading, Text, Image, SimpleGrid, useColorMode, Button } from "@chakra-ui/react";
import ProjectModal from '../Modals/ProjectModal';
import { useQuery } from "@tanstack/react-query";
import { fetchDataByCondition } from "../../FireBase/api";
import { motion } from "framer-motion";
import CodingProfiles from "../CodingProfiles";
import BlogSection from "../BlogSection";

const MotionBox = motion(Box);

const ProjectCard = ({ project }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { colorMode } = useColorMode();

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);

    return (
        <MotionBox
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            onClick={handleOpenModal}
            cursor="pointer"
            h="100%"
        >
            <Box
                p={6}
                h="100%"
                bg={colorMode === 'dark' ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)"}
                backdropFilter="blur(20px)"
                border="1px solid"
                borderColor={colorMode === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}
                borderRadius="18px"
                transition="all 0.3s ease"
                _hover={{
                    borderColor: "rgba(0, 113, 227, 0.5)",
                    bg: colorMode === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)"
                }}
            >
                <Flex alignItems="center" mb={4}>
                    <Image
                        src={project.image}
                        alt={project.title}
                        boxSize="48px"
                        mr={4}
                        borderRadius="12px"
                    />
                    <Heading fontSize="21px" fontWeight="700" color="inherit" letterSpacing="-0.01em">
                        {project.title}
                    </Heading>
                </Flex>
                <Text fontSize="17px" color="gray.500" lineHeight="1.47059" noOfLines={3}>
                    {project.description}
                </Text>
                <ProjectModal isOpen={isOpen} onClose={handleCloseModal} project={project} />
            </Box>
        </MotionBox>
    );
};

const About = () => {
    const [activeTab, setActiveTab] = useState('coding');
    const { colorMode } = useColorMode();

    const { data, isLoading } = useQuery({
        queryKey: ["fetchData", 'project'],
        queryFn: () => fetchDataByCondition({ page: 'about', collection: 'Projects' }),
    });

    return (
        <Box w="100%">
            {/* Tab Navigation */}
            <Flex gap={4} mb={8} justify="center" flexWrap="wrap">
                <Button
                    onClick={() => setActiveTab('coding')}
                    size="lg"
                    bg={activeTab === 'coding'
                        ? (colorMode === 'dark' ? 'rgba(0, 113, 227, 0.15)' : 'rgba(0, 113, 227, 0.12)')
                        : (colorMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)')
                    }
                    color={activeTab === 'coding' ? '#0071e3' : 'gray.500'}
                    border="2px solid"
                    borderColor={activeTab === 'coding'
                        ? (colorMode === 'dark' ? 'rgba(0, 113, 227, 0.4)' : 'rgba(0, 113, 227, 0.3)')
                        : (colorMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)')
                    }
                    borderRadius="full"
                    px={8}
                    py={6}
                    fontSize="17px"
                    fontWeight="600"
                    _hover={{
                        bg: colorMode === 'dark' ? 'rgba(0, 113, 227, 0.15)' : 'rgba(0, 113, 227, 0.12)',
                        borderColor: '#0071e3',
                        color: '#0071e3',
                    }}
                    transition="all 0.3s ease"
                >
                    Coding Profiles
                </Button>
                <Button
                    onClick={() => setActiveTab('projects')}
                    size="lg"
                    bg={activeTab === 'projects'
                        ? (colorMode === 'dark' ? 'rgba(0, 113, 227, 0.15)' : 'rgba(0, 113, 227, 0.12)')
                        : (colorMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)')
                    }
                    color={activeTab === 'projects' ? '#0071e3' : 'gray.500'}
                    border="2px solid"
                    borderColor={activeTab === 'projects'
                        ? (colorMode === 'dark' ? 'rgba(0, 113, 227, 0.4)' : 'rgba(0, 113, 227, 0.3)')
                        : (colorMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)')
                    }
                    borderRadius="full"
                    px={8}
                    py={6}
                    fontSize="17px"
                    fontWeight="600"
                    _hover={{
                        bg: colorMode === 'dark' ? 'rgba(0, 113, 227, 0.15)' : 'rgba(0, 113, 227, 0.12)',
                        borderColor: '#0071e3',
                        color: '#0071e3',
                    }}
                    transition="all 0.3s ease"
                >
                    Projects
                </Button>
                <Button
                    onClick={() => setActiveTab('blog')}
                    size="lg"
                    bg={activeTab === 'blog'
                        ? (colorMode === 'dark' ? 'rgba(0, 113, 227, 0.15)' : 'rgba(0, 113, 227, 0.12)')
                        : (colorMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)')
                    }
                    color={activeTab === 'blog' ? '#0071e3' : 'gray.500'}
                    border="2px solid"
                    borderColor={activeTab === 'blog'
                        ? (colorMode === 'dark' ? 'rgba(0, 113, 227, 0.4)' : 'rgba(0, 113, 227, 0.3)')
                        : (colorMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)')
                    }
                    borderRadius="full"
                    px={8}
                    py={6}
                    fontSize="17px"
                    fontWeight="600"
                    _hover={{
                        bg: colorMode === 'dark' ? 'rgba(0, 113, 227, 0.15)' : 'rgba(0, 113, 227, 0.12)',
                        borderColor: '#0071e3',
                        color: '#0071e3',
                    }}
                    transition="all 0.3s ease"
                >
                    Blog
                </Button>
            </Flex>

            {/* Tab Content */}
            <MotionBox
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {activeTab === 'coding' && <CodingProfiles />}

                {activeTab === 'projects' && (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="100%">
                        {data?.map((project, index) => (
                            <ProjectCard key={index} project={project} />
                        ))}
                    </SimpleGrid>
                )}

                {activeTab === 'blog' && <BlogSection />}

            </MotionBox>
        </Box>
    )
}

export default About;