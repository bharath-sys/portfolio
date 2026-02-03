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
    Button,
    Text,
    useColorMode,
    useToast,
    Icon,
    Flex,
    Box,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FireBase/main';
import { RiRobotLine } from 'react-icons/ri';
import { MdLock } from 'react-icons/md';

const MotionBox = motion(Box);

const JarvisLogin = ({ isOpen, onClose, onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { colorMode } = useColorMode();
    const toast = useToast();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast({
                title: 'Access Granted 🤖',
                description: 'Welcome back! You can now write blogs.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setEmail('');
            setPassword('');
            onSuccess();
            onClose();
        } catch (error) {
            toast({
                title: 'Access Denied ⚠️',
                description: 'Invalid credentials. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
            <ModalOverlay backdropFilter="blur(10px)" bg="rgba(0, 0, 0, 0.7)" />
            <ModalContent
                bg={colorMode === 'dark' ? 'rgba(29, 29, 31, 0.95)' : 'rgba(255, 255, 255, 0.95)'}
                backdropFilter="blur(20px)"
                border="2px solid"
                borderColor={colorMode === 'dark' ? 'rgba(0, 113, 227, 0.3)' : 'rgba(0, 113, 227, 0.2)'}
                borderRadius="24px"
                boxShadow="0 25px 50px -12px rgba(0, 113, 227, 0.5)"
            >
                <ModalHeader>
                    <Flex align="center" gap={3}>
                        <MotionBox
                            animate={{
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <Icon as={RiRobotLine} w={8} h={8} color="#0071e3" />
                        </MotionBox>
                        <Box>
                            <Text fontSize="24px" fontWeight="700" color="inherit">
                                JARVIS Authentication
                            </Text>
                            <Text fontSize="13px" color="gray.500" fontWeight="400">
                                Secure access required
                            </Text>
                        </Box>
                    </Flex>
                </ModalHeader>
                <ModalCloseButton color="gray.500" />
                <ModalBody pb={6}>
                    <Box as="form" onSubmit={handleLogin}>
                        <VStack spacing={4}>
                            <MotionBox
                                w="100%"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    size="lg"
                                    bg={colorMode === 'dark' ? 'rgba(0, 113, 227, 0.05)' : 'rgba(0, 113, 227, 0.03)'}
                                    border="1px solid"
                                    borderColor={colorMode === 'dark' ? 'rgba(0, 113, 227, 0.2)' : 'rgba(0, 113, 227, 0.15)'}
                                    borderRadius="12px"
                                    _focus={{
                                        borderColor: '#0071e3',
                                        boxShadow: '0 0 0 1px #0071e3',
                                    }}
                                />
                            </MotionBox>

                            <MotionBox
                                w="100%"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    size="lg"
                                    bg={colorMode === 'dark' ? 'rgba(0, 113, 227, 0.05)' : 'rgba(0, 113, 227, 0.03)'}
                                    border="1px solid"
                                    borderColor={colorMode === 'dark' ? 'rgba(0, 113, 227, 0.2)' : 'rgba(0, 113, 227, 0.15)'}
                                    borderRadius="12px"
                                    _focus={{
                                        borderColor: '#0071e3',
                                        boxShadow: '0 0 0 1px #0071e3',
                                    }}
                                />
                            </MotionBox>

                            <MotionBox
                                w="100%"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Button
                                    type="submit"
                                    isLoading={isLoading}
                                    size="lg"
                                    w="100%"
                                    bg="#0071e3"
                                    color="white"
                                    borderRadius="full"
                                    leftIcon={<Icon as={MdLock} />}
                                    _hover={{
                                        bg: '#0077ed',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 10px 30px rgba(0, 113, 227, 0.4)',
                                    }}
                                    transition="all 0.3s ease"
                                >
                                    Authenticate
                                </Button>
                            </MotionBox>

                            <Text fontSize="12px" color="gray.500" textAlign="center">
                                Powered by Firebase Authentication 🔒
                            </Text>
                        </VStack>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default JarvisLogin;
