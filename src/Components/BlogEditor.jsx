import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    VStack,
    Input,
    Textarea,
    Button,
    Text,
    useColorMode,
    useToast,
    Icon,
    Flex,
    Box,
    SimpleGrid,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import db from '../FireBase/main';
import { MdWorkOutline, MdEdit } from 'react-icons/md';
import { FaStar, FaCoffee } from 'react-icons/fa';

const MotionBox = motion(Box);

const categories = [
    { id: 'professional', label: 'Professional', icon: MdWorkOutline, color: '#0071e3' },
    { id: 'personal', label: 'Personal', icon: FaStar, color: '#FF9500' },
    { id: 'casual', label: 'Casual', icon: FaCoffee, color: '#34C759' },
];

const BlogEditor = ({ isOpen, onClose, onSuccess }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('professional');
    const [isLoading, setIsLoading] = useState(false);
    const { colorMode } = useColorMode();
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const blogsRef = collection(db, 'Blogs');
            await addDoc(blogsRef, {
                title: title.trim(),
                content: content.trim(),
                category: selectedCategory,
                timestamp: serverTimestamp(),
            });

            toast({
                title: 'Blog Published! 📝',
                description: 'Your blog has been successfully published.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            setTitle('');
            setContent('');
            setSelectedCategory('professional');
            onSuccess();
            onClose();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to publish blog. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay backdropFilter="blur(10px)" bg="rgba(0, 0, 0, 0.6)" />
            <ModalContent
                bg={colorMode === 'dark' ? 'rgba(29, 29, 31, 0.95)' : 'rgba(255, 255, 255, 0.95)'}
                backdropFilter="blur(20px)"
                border="1px solid"
                borderColor={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
                borderRadius="24px"
                boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.7)"
                maxH="90vh"
            >
                <ModalHeader>
                    <Flex align="center" gap={3}>
                        <Icon as={MdEdit} w={6} h={6} color="#0071e3" />
                        <Text fontSize="24px" fontWeight="700" color="inherit">
                            Write a Blog
                        </Text>
                    </Flex>
                </ModalHeader>
                <ModalCloseButton color="gray.500" />
                <ModalBody pb={6} overflowY="auto">
                    <Box as="form" onSubmit={handleSubmit}>
                        <VStack spacing={4}>
                            <Box w="100%">
                                <Text fontSize="14px" fontWeight="600" color="inherit" mb={2}>
                                    Category
                                </Text>
                                <SimpleGrid columns={3} spacing={2}>
                                    {categories.map((cat) => (
                                        <Button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            size="md"
                                            bg={
                                                selectedCategory === cat.id
                                                    ? colorMode === 'dark'
                                                        ? 'rgba(0, 113, 227, 0.2)'
                                                        : 'rgba(0, 113, 227, 0.15)'
                                                    : 'transparent'
                                            }
                                            border="2px solid"
                                            borderColor={
                                                selectedCategory === cat.id
                                                    ? cat.color
                                                    : colorMode === 'dark'
                                                        ? 'rgba(255, 255, 255, 0.1)'
                                                        : 'rgba(0, 0, 0, 0.1)'
                                            }
                                            borderRadius="12px"
                                            _hover={{
                                                borderColor: cat.color,
                                                bg:
                                                    colorMode === 'dark'
                                                        ? 'rgba(0, 113, 227, 0.15)'
                                                        : 'rgba(0, 113, 227, 0.1)',
                                            }}
                                            leftIcon={<Icon as={cat.icon} color={cat.color} />}
                                        >
                                            <Text fontSize="13px" color="inherit">
                                                {cat.label}
                                            </Text>
                                        </Button>
                                    ))}
                                </SimpleGrid>
                            </Box>

                            <Input
                                placeholder="Blog Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                size="lg"
                                bg={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'}
                                border="1px solid"
                                borderColor={
                                    colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                                }
                                borderRadius="12px"
                                _focus={{
                                    borderColor: '#0071e3',
                                    boxShadow: '0 0 0 1px #0071e3',
                                }}
                            />

                            <Textarea
                                placeholder="Write your blog content here..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                rows={10}
                                size="lg"
                                bg={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'}
                                border="1px solid"
                                borderColor={
                                    colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                                }
                                borderRadius="12px"
                                _focus={{
                                    borderColor: '#0071e3',
                                    boxShadow: '0 0 0 1px #0071e3',
                                }}
                            />

                            <Button
                                type="submit"
                                isLoading={isLoading}
                                size="lg"
                                w="100%"
                                bg="#0071e3"
                                color="white"
                                borderRadius="full"
                                leftIcon={<Icon as={MdEdit} />}
                                _hover={{
                                    bg: '#0077ed',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 10px 30px rgba(0, 113, 227, 0.4)',
                                }}
                                transition="all 0.3s ease"
                            >
                                Publish Blog
                            </Button>
                        </VStack>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default BlogEditor;
