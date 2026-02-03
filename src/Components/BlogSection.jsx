import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Heading,
    Text,
    Flex,
    Icon,
    useColorMode,
    Button,
    Badge,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import db, { auth } from '../FireBase/main';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { MdWorkOutline, MdEdit, MdAdminPanelSettings, MdVisibility, MdLogout } from 'react-icons/md';
import { FaStar, FaCoffee } from 'react-icons/fa';
import JarvisLogin from './JarvisLogin';
import BlogEditor from './BlogEditor';
import BlogViewer from './BlogViewer';

const MotionBox = motion(Box);

const categoryConfig = {
    professional: { icon: MdWorkOutline, color: '#0071e3' },
    personal: { icon: FaStar, color: '#FF9500' },
    casual: { icon: FaCoffee, color: '#34C759' },
};

const BlogSection = () => {
    const scrollRef = useRef(null);
    const [mode, setMode] = useState('guest'); // 'guest' or 'admin'
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [blogToEdit, setBlogToEdit] = useState(null);
    const { colorMode } = useColorMode();

    const { data: blogs, isLoading, refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const blogsRef = collection(db, 'Blogs');
            const q = query(blogsRef, orderBy('timestamp', 'desc'));
            const snapshot = await getDocs(q);
            return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        },
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
            if (!user && mode === 'admin') {
                setMode('guest');
            }
        });
        return () => unsubscribe();
    }, [mode]);

    useEffect(() => {
        if (!blogs || blogs.length === 0) return;

        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let scrollPosition = 0;
        const scrollSpeed = 0.5;
        let animationFrameId;

        const autoScroll = () => {
            scrollPosition += scrollSpeed;

            if (scrollPosition >= scrollContainer.scrollWidth / 2) {
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
    }, [blogs]);

    const duplicatedBlogs = blogs ? [...blogs, ...blogs] : [];

    const handleModeSwitch = (newMode) => {
        if (newMode === 'admin' && !isAuthenticated) {
            setIsLoginOpen(true);
        } else {
            setMode(newMode);
        }
    };

    const handleLoginSuccess = () => {
        setMode('admin');
    };

    const handleLogout = async () => {
        await signOut(auth);
        setMode('guest');
    };

    const handleBlogClick = (blog) => {
        setSelectedBlog(blog);
        setIsViewerOpen(true);
    };

    const handleEditBlog = (blog) => {
        setBlogToEdit(blog);
        setIsEditorOpen(true);
    };

    const handleCloseEditor = () => {
        setIsEditorOpen(false);
        setBlogToEdit(null);
    };

    return (
        <Box w="100%">
            <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                mb={6}
            >
                <Flex align="center" justify="space-between" mb={6} flexWrap="wrap" gap={4}>
                    <Box>
                        <Flex align="center" gap={3} mb={2}>
                            <Heading
                                fontSize={{ base: '24px', md: '32px' }}
                                fontWeight="700"
                                color="inherit"
                                letterSpacing="-0.01em"
                            >
                                Blog
                            </Heading>
                            <Badge
                                colorScheme={mode === 'admin' ? 'blue' : 'gray'}
                                px={3}
                                py={1}
                                borderRadius="full"
                                fontSize="12px"
                                display="flex"
                                alignItems="center"
                                gap={1}
                            >
                                <Icon as={mode === 'admin' ? MdAdminPanelSettings : MdVisibility} w={3} h={3} />
                                {mode === 'admin' ? 'Admin Mode' : 'Guest Mode'}
                            </Badge>
                        </Flex>
                        <Text fontSize="15px" color="gray.500">
                            {mode === 'admin'
                                ? 'Create and manage your blogs'
                                : 'Explore thoughts, experiences, and insights'}
                        </Text>
                    </Box>

                    <Flex gap={2} flexWrap="wrap">
                        {/* Mode Toggle Buttons */}
                        <Button
                            onClick={() => handleModeSwitch('guest')}
                            size="md"
                            bg={mode === 'guest'
                                ? (colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)')
                                : 'transparent'
                            }
                            color={mode === 'guest' ? 'inherit' : 'gray.500'}
                            border="1px solid"
                            borderColor={mode === 'guest'
                                ? (colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)')
                                : (colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)')
                            }
                            borderRadius="full"
                            leftIcon={<Icon as={MdVisibility} />}
                            _hover={{
                                bg: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                            }}
                        >
                            Guest
                        </Button>

                        <Button
                            onClick={() => handleModeSwitch('admin')}
                            size="md"
                            bg={mode === 'admin'
                                ? 'rgba(0, 113, 227, 0.15)'
                                : 'transparent'
                            }
                            color={mode === 'admin' ? '#0071e3' : 'gray.500'}
                            border="1px solid"
                            borderColor={mode === 'admin'
                                ? 'rgba(0, 113, 227, 0.3)'
                                : (colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)')
                            }
                            borderRadius="full"
                            leftIcon={<Icon as={MdAdminPanelSettings} />}
                            _hover={{
                                bg: 'rgba(0, 113, 227, 0.15)',
                                borderColor: 'rgba(0, 113, 227, 0.3)',
                                color: '#0071e3',
                            }}
                        >
                            Admin
                        </Button>

                        {/* Admin Actions */}
                        {mode === 'admin' && isAuthenticated && (
                            <>
                                <Button
                                    onClick={() => setIsEditorOpen(true)}
                                    size="md"
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
                                    Write Blog
                                </Button>

                                <Button
                                    onClick={handleLogout}
                                    size="md"
                                    variant="ghost"
                                    color="gray.500"
                                    leftIcon={<Icon as={MdLogout} />}
                                    _hover={{
                                        bg: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                    </Flex>
                </Flex>
            </MotionBox>

            {isLoading ? (
                <Text fontSize="15px" color="gray.500" textAlign="center">
                    Loading blogs...
                </Text>
            ) : !blogs || blogs.length === 0 ? (
                <Box textAlign="center" py={12}>
                    <Text fontSize="15px" color="gray.500" mb={4}>
                        No blogs yet. {mode === 'admin' && isAuthenticated ? 'Write the first one!' : 'Check back soon!'}
                    </Text>
                </Box>
            ) : (
                <Box overflow="hidden">
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
                        {duplicatedBlogs.map((blog, index) => {
                            const category = categoryConfig[blog.category] || categoryConfig.professional;
                            return (
                                <MotionBox
                                    key={`${blog.id}-${index}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: (index % blogs.length) * 0.05 }}
                                    flexShrink={0}
                                    whileHover={{ y: -4 }}
                                    onClick={() => handleBlogClick(blog)}
                                    cursor="pointer"
                                >
                                    <Box
                                        minW="320px"
                                        maxW="360px"
                                        p={5}
                                        bg={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'}
                                        backdropFilter="blur(20px)"
                                        border="1px solid"
                                        borderColor={
                                            colorMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
                                        }
                                        borderRadius="18px"
                                        transition="all 0.3s ease"
                                        _hover={{
                                            borderColor: category.color,
                                            bg: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                                        }}
                                    >
                                        <Flex align="center" gap={3} mb={3}>
                                            <Box
                                                p={2}
                                                bg={colorMode === 'dark' ? `${category.color}20` : `${category.color}15`}
                                                borderRadius="12px"
                                            >
                                                <Icon as={category.icon} w={5} h={5} color={category.color} />
                                            </Box>
                                            <Text fontSize="18px" fontWeight="700" color="inherit" noOfLines={1}>
                                                {blog.title}
                                            </Text>
                                        </Flex>
                                        <Text fontSize="14px" color="gray.500" lineHeight="1.5" noOfLines={3}>
                                            {blog.content}
                                        </Text>
                                    </Box>
                                </MotionBox>
                            );
                        })}
                    </Flex>
                </Box>
            )}

            <JarvisLogin
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSuccess={handleLoginSuccess}
            />

            <BlogEditor
                isOpen={isEditorOpen}
                onClose={handleCloseEditor}
                onSuccess={refetch}
                blogToEdit={blogToEdit}
            />

            <BlogViewer
                isOpen={isViewerOpen}
                onClose={() => setIsViewerOpen(false)}
                blog={selectedBlog}
                isAdmin={mode === 'admin' && isAuthenticated}
                onEdit={handleEditBlog}
                onDelete={refetch}
            />
        </Box>
    );
};

export default BlogSection;
