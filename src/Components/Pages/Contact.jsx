import React, { useState, useEffect, useRef } from "react";
import {
    Flex,
    Box,
    Icon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Text,
    VStack,
    useColorMode,
    Heading,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdPhone, MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import db from "../../FireBase/main";

const MotionBox = motion(Box);

const ContactItem = ({ href, icon, onClick, label }) => {
    const { colorMode } = useColorMode();

    return (
        <MotionBox
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Box
                as={onClick ? "button" : "a"}
                href={href}
                onClick={onClick}
                p={5}
                bg={colorMode === 'dark' ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)"}
                backdropFilter="blur(20px)"
                border="1px solid"
                borderColor={colorMode === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}
                borderRadius="18px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="all 0.3s ease"
                _hover={{
                    borderColor: "rgba(0, 113, 227, 0.5)",
                    bg: colorMode === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
                    boxShadow: "0 0 30px rgba(0, 113, 227, 0.2)"
                }}
                title={label}
            >
                <Icon as={icon} w={8} h={8} color="inherit" />
            </Box>
        </MotionBox>
    );
};

const FeedbackCarousel = () => {
    const scrollRef = useRef(null);
    const { colorMode } = useColorMode();

    const { data: feedbacks, isLoading } = useQuery({
        queryKey: ["feedbacks"],
        queryFn: async () => {
            const feedbackRef = collection(db, "Feedback");
            const q = query(feedbackRef, orderBy("timestamp", "desc"));
            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        },
    });

    useEffect(() => {
        if (!feedbacks || feedbacks.length === 0) return;

        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let scrollPosition = 0;
        const scrollSpeed = 0.5;
        let animationFrameId;

        const autoScroll = () => {
            scrollPosition += scrollSpeed;

            if (scrollPosition >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
                scrollPosition = 0;
                scrollContainer.scrollLeft = 0;
            } else {
                scrollContainer.scrollLeft = scrollPosition;
            }
            animationFrameId = requestAnimationFrame(autoScroll);
        };

        animationFrameId = requestAnimationFrame(autoScroll);

        const handleMouseEnter = () => {
            cancelAnimationFrame(animationFrameId);
        };

        const handleMouseLeave = () => {
            scrollPosition = scrollContainer.scrollLeft;
            animationFrameId = requestAnimationFrame(autoScroll);
        };

        scrollContainer.addEventListener('mouseenter', handleMouseEnter);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationFrameId);
            if (scrollContainer) {
                scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
                scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [feedbacks]);

    if (isLoading) {
        return (
            <Text fontSize="15px" color="gray.500" textAlign="center">
                Loading feedback...
            </Text>
        );
    }

    if (!feedbacks || feedbacks.length === 0) {
        return (
            <Text fontSize="15px" color="gray.500" textAlign="center">
                No feedback yet. Be the first to share your thoughts!
            </Text>
        );
    }

    return (
        <Flex
            ref={scrollRef}
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
            {feedbacks.map((item, index) => (
                <MotionBox
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    flexShrink={0}
                >
                    <Box
                        minW="280px"
                        maxW="320px"
                        p={5}
                        bg={colorMode === 'dark' ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)"}
                        backdropFilter="blur(20px)"
                        border="1px solid"
                        borderColor={colorMode === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}
                        borderRadius="18px"
                        transition="all 0.3s ease"
                        _hover={{
                            borderColor: "rgba(0, 113, 227, 0.3)",
                            bg: colorMode === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
                        }}
                    >
                        <Flex align="center" gap={3} mb={3}>
                            <Box
                                fontSize="32px"
                                w="40px"
                                h="40px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                {item.avatar || '🐶'}
                            </Box>
                            <Text fontSize="16px" fontWeight="600" color="inherit">
                                {item.name}
                            </Text>
                        </Flex>
                        <Text fontSize="14px" color="gray.500" lineHeight="1.5">
                            {item.feedback}
                        </Text>
                    </Box>
                </MotionBox>
            ))}
        </Flex>
    );
};

const ContactSection = () => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const { colorMode } = useColorMode();

    return (
        <Box w="100%">
            <Flex align="center" justify="center" p={8} gap={8} flexWrap="wrap">
                <ContactItem
                    href="https://www.linkedin.com/in/kodigudla-bharath-kumar/"
                    icon={FaLinkedin}
                    label="LinkedIn"
                />

                <ContactItem
                    href="mailto:kbk.bharath12345@gmail.com"
                    icon={MdEmail}
                    label="Email"
                />

                <ContactItem
                    onClick={() => setIsContactModalOpen(true)}
                    icon={MdPhone}
                    label="Phone"
                />

                {/* Phone Modal */}
                <Modal isCentered isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)}>
                    <ModalOverlay backdropFilter="blur(10px)" bg="rgba(0, 0, 0, 0.6)" />
                    <ModalContent
                        bg={colorMode === 'dark' ? "rgba(29, 29, 31, 0.95)" : "rgba(255, 255, 255, 0.95)"}
                        border="1px solid"
                        borderColor={colorMode === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}
                        borderRadius="18px"
                        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.7)"
                        backdropFilter="blur(20px)"
                    >
                        <ModalHeader color="inherit" fontWeight="700" fontSize="24px">Contact</ModalHeader>
                        <ModalCloseButton color="gray.500" />
                        <ModalBody pb={8}>
                            <VStack spacing={4} align="center">
                                <Text fontSize="28px" fontWeight="700" color="#0071e3" letterSpacing="wider">
                                    9963151489
                                </Text>
                                <Text color="gray.500" fontSize="17px">
                                    Always open for a quick chat!
                                </Text>
                            </VStack>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Flex>

            {/* Feedback Section */}
            <Box mt={12} px={4} overflow="hidden">
                <Heading
                    fontSize={{ base: "24px", md: "32px" }}
                    fontWeight="700"
                    textAlign="center"
                    color="inherit"
                    letterSpacing="-0.01em"
                    mb={6}
                >
                    Feedback
                </Heading>
                <FeedbackCarousel />
            </Box>
        </Box>
    );
};

export default ContactSection;
