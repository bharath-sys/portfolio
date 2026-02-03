import React, { useState, useEffect, useRef } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    VStack,
    Text,
    useColorMode,
    Icon,
    Flex,
    Box,
    Badge,
    Button,
    useToast,
    Switch,
    FormControl,
} from '@chakra-ui/react';
import { MdWorkOutline, MdDelete, MdEdit, MdMusicNote, MdMusicOff } from 'react-icons/md';
import { FaStar, FaCoffee } from 'react-icons/fa';
import { deleteDoc, doc } from 'firebase/firestore';
import db from '../FireBase/main';

const categoryConfig = {
    professional: {
        icon: MdWorkOutline,
        color: '#0071e3',
        label: 'Professional',
        musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    personal: {
        icon: FaStar,
        color: '#FF9500',
        label: 'Personal',
        musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    casual: {
        icon: FaCoffee,
        color: '#34C759',
        label: 'Casual',
        musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    },
};

const BlogViewer = ({ isOpen, onClose, blog, isAdmin, onEdit, onDelete }) => {
    const { colorMode } = useColorMode();
    const [isMusicEnabled, setIsMusicEnabled] = useState(false);
    const audioRef = useRef(null);
    const toast = useToast();

    // All hooks must be called before any conditional returns
    useEffect(() => {
        if (isOpen && isMusicEnabled && audioRef.current && blog) {
            audioRef.current.volume = 0.3;
            audioRef.current.play().catch(err => {
                console.log('Audio play failed:', err);
            });
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, [isOpen, isMusicEnabled, blog]);

    useEffect(() => {
        if (!isOpen) {
            setIsMusicEnabled(false);
        }
    }, [isOpen]);

    // Early return after all hooks
    if (!blog) return null;

    const category = categoryConfig[blog.category] || categoryConfig.professional;

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, 'Blogs', blog.id));
            toast({
                title: 'Blog Deleted',
                description: 'The blog has been successfully deleted.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            onDelete();
            onClose();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete blog. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleEdit = () => {
        onEdit(blog);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay backdropFilter="blur(10px)" bg="rgba(0, 0, 0, 0.6)" />
            <ModalContent
                bg={colorMode === 'dark' ? 'rgba(29, 29, 31, 0.95)' : 'rgba(255, 255, 255, 0.95)'}
                backdropFilter="blur(20px)"
                border="2px solid"
                borderColor={`${category.color}40`}
                borderRadius="24px"
                boxShadow={`0 25px 50px -12px ${category.color}40`}
                maxH="90vh"
            >
                <ModalHeader>
                    <VStack align="start" spacing={3}>
                        <Flex align="center" gap={2} w="90%">
                            <Badge
                                px={3}
                                py={1}
                                borderRadius="full"
                                fontSize="12px"
                                display="flex"
                                alignItems="center"
                                gap={1}
                                bg={colorMode === 'dark' ? `${category.color}20` : `${category.color}15`}
                                color={category.color}
                                border="1px solid"
                                borderColor={`${category.color}40`}
                            >
                                <Icon as={category.icon} w={3} h={3} />
                                {category.label}
                            </Badge>

                            <FormControl display="flex" alignItems="center" ml="auto" w="auto">
                                <Icon
                                    as={isMusicEnabled ? MdMusicNote : MdMusicOff}
                                    w={4}
                                    h={4}
                                    color={isMusicEnabled ? category.color : 'gray.500'}
                                    mr={2}
                                />
                                <Switch
                                    size="sm"
                                    colorScheme="blue"
                                    isChecked={isMusicEnabled}
                                    onChange={(e) => setIsMusicEnabled(e.target.checked)}
                                />
                            </FormControl>
                        </Flex>

                        <Text fontSize="28px" fontWeight="700" color="inherit" lineHeight="1.2">
                            {blog.title}
                        </Text>

                        {isAdmin && (
                            <Flex gap={2}>
                                <Button
                                    size="sm"
                                    leftIcon={<Icon as={MdEdit} />}
                                    onClick={handleEdit}
                                    bg={colorMode === 'dark' ? 'rgba(0, 113, 227, 0.15)' : 'rgba(0, 113, 227, 0.1)'}
                                    color="#0071e3"
                                    _hover={{
                                        bg: colorMode === 'dark' ? 'rgba(0, 113, 227, 0.25)' : 'rgba(0, 113, 227, 0.15)',
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="sm"
                                    leftIcon={<Icon as={MdDelete} />}
                                    onClick={handleDelete}
                                    bg={colorMode === 'dark' ? 'rgba(255, 59, 48, 0.15)' : 'rgba(255, 59, 48, 0.1)'}
                                    color="#FF3B30"
                                    _hover={{
                                        bg: colorMode === 'dark' ? 'rgba(255, 59, 48, 0.25)' : 'rgba(255, 59, 48, 0.15)',
                                    }}
                                >
                                    Delete
                                </Button>
                            </Flex>
                        )}
                    </VStack>
                </ModalHeader>
                <ModalCloseButton color="gray.500" />
                <ModalBody pb={6} overflowY="auto">
                    <Box
                        p={4}
                        bg={colorMode === 'dark' ? `${category.color}05` : `${category.color}03`}
                        borderRadius="16px"
                        border="1px solid"
                        borderColor={`${category.color}20`}
                    >
                        <Text
                            fontSize="17px"
                            color={colorMode === 'dark' ? 'gray.300' : 'gray.700'}
                            lineHeight="1.7"
                            whiteSpace="pre-wrap"
                        >
                            {blog.content}
                        </Text>
                    </Box>

                    {/* Hidden audio element */}
                    <audio ref={audioRef} loop>
                        <source src={category.musicUrl} type="audio/mpeg" />
                    </audio>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default BlogViewer;
