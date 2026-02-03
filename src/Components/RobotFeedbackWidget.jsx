import React, { useState } from 'react';
import {
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    VStack,
    Input,
    Textarea,
    useColorMode,
    useToast,
    Text,
    Flex,
    Icon,
    SimpleGrid,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import db from '../FireBase/main';
import { RiRobotLine } from 'react-icons/ri';

const MotionBox = motion(Box);

// Human, animal and flower emojis
const avatarOptions = {
    humans: ['👨', '👩', '🧑', '👦', '👧', '👶', '👴', '👵', '🧔', '👱', '👨‍💼', '👩‍💼'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'],
    flowers: ['🌸', '🌺', '🌻', '🌷', '🌹', '🏵️', '🌼', '💐', '🌿', '🍀', '🌾', '🪷'],
};

const RobotFeedbackWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [feedback, setFeedback] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('👨');
    const [avatarCategory, setAvatarCategory] = useState('humans');
    const [isHovered, setIsHovered] = useState(false);
    const { colorMode } = useColorMode();
    const toast = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data) => {
            const feedbackRef = collection(db, 'Feedback');
            await addDoc(feedbackRef, {
                ...data,
                timestamp: serverTimestamp(),
            });
        },
        onSuccess: () => {
            toast({
                title: 'Thank you! 🤖',
                description: 'Your feedback has been received!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            queryClient.invalidateQueries(['feedbacks']);
            setName('');
            setFeedback('');
            setSelectedAvatar('👨');
            setAvatarCategory('humans');
            setIsOpen(false);
        },
        onError: () => {
            toast({
                title: 'Oops! 😅',
                description: 'Failed to submit feedback. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() && feedback.trim()) {
            mutation.mutate({
                name: name.trim(),
                feedback: feedback.trim(),
                avatar: selectedAvatar,
            });
        }
    };

    return (
        <>
            {/* Floating Robot Button */}
            <MotionBox
                position="fixed"
                bottom="30px"
                right="30px"
                zIndex={1000}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <MotionBox
                    animate={{
                        y: isHovered ? -5 : [0, -10, 0],
                    }}
                    transition={{
                        y: isHovered ? { duration: 0.3 } : { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                    }}
                >
                    <Button
                        onClick={() => setIsOpen(true)}
                        w="70px"
                        h="70px"
                        borderRadius="full"
                        bg={colorMode === 'dark' ? 'rgba(0, 113, 227, 0.2)' : 'rgba(0, 113, 227, 0.15)'}
                        backdropFilter="blur(20px)"
                        border="2px solid"
                        borderColor={colorMode === 'dark' ? 'rgba(0, 113, 227, 0.5)' : 'rgba(0, 113, 227, 0.3)'}
                        boxShadow="0 10px 40px rgba(0, 113, 227, 0.4)"
                        _hover={{
                            bg: colorMode === 'dark' ? 'rgba(0, 113, 227, 0.3)' : 'rgba(0, 113, 227, 0.25)',
                            borderColor: '#0071e3',
                            boxShadow: '0 15px 50px rgba(0, 113, 227, 0.6)',
                        }}
                        _active={{
                            transform: 'scale(0.95)',
                        }}
                        transition="all 0.3s ease"
                    >
                        <Icon as={RiRobotLine} w={8} h={8} color="#0071e3" />
                    </Button>
                </MotionBox>

                {/* Tooltip */}
                {isHovered && (
                    <MotionBox
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        position="absolute"
                        right="80px"
                        top="50%"
                        transform="translateY(-50%)"
                        bg={colorMode === 'dark' ? 'rgba(29, 29, 31, 0.95)' : 'rgba(255, 255, 255, 0.95)'}
                        backdropFilter="blur(20px)"
                        px={4}
                        py={2}
                        borderRadius="12px"
                        border="1px solid"
                        borderColor={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
                        boxShadow="0 10px 30px rgba(0, 0, 0, 0.3)"
                        whiteSpace="nowrap"
                    >
                        <Text fontSize="14px" fontWeight="600" color="inherit">
                            Share your feedback! 💬
                        </Text>
                    </MotionBox>
                )}
            </MotionBox>

            {/* Feedback Modal */}
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} isCentered size="md">
                <ModalOverlay backdropFilter="blur(10px)" bg="rgba(0, 0, 0, 0.6)" />
                <ModalContent
                    bg={colorMode === 'dark' ? 'rgba(29, 29, 31, 0.95)' : 'rgba(255, 255, 255, 0.95)'}
                    backdropFilter="blur(20px)"
                    border="1px solid"
                    borderColor={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
                    borderRadius="24px"
                    boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.7)"
                >
                    <ModalHeader>
                        <Flex align="center" gap={3}>
                            <Icon as={RiRobotLine} w={6} h={6} color="#0071e3" />
                            <Text fontSize="24px" fontWeight="700" color="inherit">
                                Hi! I'd love your feedback 🤖
                            </Text>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton color="gray.500" />
                    <ModalBody pb={6}>
                        <Box as="form" onSubmit={handleSubmit}>
                            <VStack spacing={4}>
                                <Text fontSize="15px" color="gray.500" textAlign="center">
                                    Your thoughts help me improve! Share what you think.
                                </Text>

                                {/* Avatar Selection */}
                                <Box w="100%">
                                    <Text fontSize="14px" fontWeight="600" color="inherit" mb={2}>
                                        Choose your avatar:
                                    </Text>

                                    <Flex gap={2} mb={3}>
                                        <Button
                                            size="sm"
                                            onClick={() => setAvatarCategory('humans')}
                                            bg={avatarCategory === 'humans' ? '#0071e3' : 'transparent'}
                                            color={avatarCategory === 'humans' ? 'white' : 'gray.500'}
                                            _hover={{
                                                bg: avatarCategory === 'humans' ? '#0077ed' : 'rgba(0, 113, 227, 0.1)',
                                            }}
                                        >
                                            Humans
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => setAvatarCategory('animals')}
                                            bg={avatarCategory === 'animals' ? '#0071e3' : 'transparent'}
                                            color={avatarCategory === 'animals' ? 'white' : 'gray.500'}
                                            _hover={{
                                                bg: avatarCategory === 'animals' ? '#0077ed' : 'rgba(0, 113, 227, 0.1)',
                                            }}
                                        >
                                            Animals
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => setAvatarCategory('flowers')}
                                            bg={avatarCategory === 'flowers' ? '#0071e3' : 'transparent'}
                                            color={avatarCategory === 'flowers' ? 'white' : 'gray.500'}
                                            _hover={{
                                                bg: avatarCategory === 'flowers' ? '#0077ed' : 'rgba(0, 113, 227, 0.1)',
                                            }}
                                        >
                                            Flowers
                                        </Button>
                                    </Flex>

                                    <SimpleGrid columns={6} spacing={2}>
                                        {avatarOptions[avatarCategory].map((emoji) => (
                                            <Button
                                                key={emoji}
                                                onClick={() => setSelectedAvatar(emoji)}
                                                p={2}
                                                h="auto"
                                                fontSize="24px"
                                                bg={selectedAvatar === emoji
                                                    ? (colorMode === 'dark' ? 'rgba(0, 113, 227, 0.2)' : 'rgba(0, 113, 227, 0.15)')
                                                    : 'transparent'
                                                }
                                                border="2px solid"
                                                borderColor={selectedAvatar === emoji ? '#0071e3' : 'transparent'}
                                                borderRadius="12px"
                                                _hover={{
                                                    bg: colorMode === 'dark' ? 'rgba(0, 113, 227, 0.15)' : 'rgba(0, 113, 227, 0.1)',
                                                }}
                                            >
                                                {emoji}
                                            </Button>
                                        ))}
                                    </SimpleGrid>
                                </Box>

                                <Input
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    size="lg"
                                    bg={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'}
                                    border="1px solid"
                                    borderColor={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
                                    borderRadius="12px"
                                    _focus={{
                                        borderColor: '#0071e3',
                                        boxShadow: '0 0 0 1px #0071e3',
                                    }}
                                />

                                <Textarea
                                    placeholder="Share your thoughts..."
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    required
                                    rows={4}
                                    size="lg"
                                    bg={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'}
                                    border="1px solid"
                                    borderColor={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
                                    borderRadius="12px"
                                    _focus={{
                                        borderColor: '#0071e3',
                                        boxShadow: '0 0 0 1px #0071e3',
                                    }}
                                />

                                <Button
                                    type="submit"
                                    isLoading={mutation.isPending}
                                    size="lg"
                                    w="100%"
                                    bg="#0071e3"
                                    color="white"
                                    borderRadius="full"
                                    leftIcon={<Icon as={RiRobotLine} />}
                                    _hover={{
                                        bg: '#0077ed',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 10px 30px rgba(0, 113, 227, 0.4)',
                                    }}
                                    transition="all 0.3s ease"
                                >
                                    Send Feedback
                                </Button>
                            </VStack>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default RobotFeedbackWidget;
