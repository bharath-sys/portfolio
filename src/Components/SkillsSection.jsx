import React, { useEffect, useRef } from 'react';
import { Box, Heading, Text, Icon, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
    SiReact,
    SiNodedotjs,
    SiMongodb,
    SiExpress,
    SiJavascript,
    SiTypescript,
    SiDocker,
    SiGit,
    SiAmazonaws,
    SiRedis
} from 'react-icons/si';

const MotionBox = motion(Box);

const skills = [
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'Express', icon: SiExpress, color: '#000000' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'Git', icon: SiGit, color: '#F05032' },
    { name: 'AWS', icon: SiAmazonaws, color: '#FF9900' },
    { name: 'Redis', icon: SiRedis, color: '#DC382D' },
];

const SkillCard = ({ skill, index }) => {
    const { colorMode } = useColorMode();

    return (
        <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -8, scale: 1.05 }}
            flexShrink={0}
            w="140px"
        >
            <Box
                p={5}
                bg={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'}
                backdropFilter="blur(20px)"
                border="1px solid"
                borderColor={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}
                borderRadius="18px"
                textAlign="center"
                transition="all 0.3s ease"
                h="100%"
                _hover={{
                    borderColor: skill.color,
                    boxShadow: `0 0 30px ${skill.color}40`,
                }}
            >
                <Icon
                    as={skill.icon}
                    w={10}
                    h={10}
                    color={skill.color}
                    mb={2}
                />
                <Text
                    fontSize="15px"
                    fontWeight="600"
                    color="inherit"
                >
                    {skill.name}
                </Text>
            </Box>
        </MotionBox>
    );
};

const SkillsSection = () => {
    const scrollRef = useRef(null);
    const { colorMode } = useColorMode();

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let scrollPosition = 0;
        const scrollSpeed = 0.5;
        let animationFrameId;

        const autoScroll = () => {
            scrollPosition += scrollSpeed;

            if (scrollPosition >= scrollContainer.scrollWidth / 2) {
                scrollPosition = 0;
            }

            scrollContainer.scrollLeft = scrollPosition;
            animationFrameId = requestAnimationFrame(autoScroll);
        };

        animationFrameId = requestAnimationFrame(autoScroll);

        const handleMouseEnter = () => {
            cancelAnimationFrame(animationFrameId);
        };

        const handleMouseLeave = () => {
            animationFrameId = requestAnimationFrame(autoScroll);
        };

        scrollContainer.addEventListener('mouseenter', handleMouseEnter);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationFrameId);
            scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
            scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const duplicatedSkills = [...skills, ...skills];

    return (
        <Box w="100%" mt={{ base: 8, md: 12 }} overflow="hidden">
            <Heading
                fontSize={{ base: "28px", md: "36px" }}
                fontWeight="700"
                mb={6}
                textAlign="center"
                color="inherit"
                letterSpacing="-0.01em"
            >
                Tech Stack
            </Heading>

            <Box
                ref={scrollRef}
                display="flex"
                gap={4}
                overflowX="hidden"
                py={4}
                css={{
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {duplicatedSkills.map((skill, index) => (
                    <SkillCard key={`${skill.name}-${index}`} skill={skill} index={index} />
                ))}
            </Box>
        </Box>
    );
};

export default SkillsSection;
