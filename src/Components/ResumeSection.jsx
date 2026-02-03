import React from 'react';
import { Box, Button, useColorMode, Icon, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { MdDescription } from 'react-icons/md';

const MotionBox = motion(Box);

const ResumeSection = () => {
    const { colorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const resumeUrl = "https://drive.google.com/file/d/1Ob-FC73O9aBVgGB4vFQV8vlIVtXHd1JO/view";
    const embedUrl = "https://drive.google.com/file/d/1Ob-FC73O9aBVgGB4vFQV8vlIVtXHd1JO/preview";

    return (
        <>
            <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                mt={8}
            >
                <Button
                    size="lg"
                    onClick={onOpen}
                    bg={colorMode === 'dark' ? 'rgba(0, 113, 227, 0.1)' : 'rgba(0, 113, 227, 0.08)'}
                    color="#0071e3"
                    border="2px solid"
                    borderColor={colorMode === 'dark' ? 'rgba(0, 113, 227, 0.3)' : 'rgba(0, 113, 227, 0.2)'}
                    borderRadius="full"
                    px={8}
                    py={6}
                    fontSize="17px"
                    fontWeight="600"
                    leftIcon={<Icon as={MdDescription} w={5} h={5} />}
                    _hover={{
                        bg: colorMode === 'dark' ? 'rgba(0, 113, 227, 0.15)' : 'rgba(0, 113, 227, 0.12)',
                        borderColor: '#0071e3',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 10px 30px rgba(0, 113, 227, 0.2)',
                    }}
                    transition="all 0.3s ease"
                >
                    View Resume
                </Button>
            </MotionBox>

            <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
                <ModalOverlay
                    bg={colorMode === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.6)'}
                    backdropFilter="blur(10px)"
                />
                <ModalContent
                    bg={colorMode === 'dark' ? '#000' : '#fff'}
                    border="1px solid"
                    borderColor={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
                    borderRadius="24px"
                    maxH="90vh"
                    overflow="hidden"
                >
                    <ModalHeader
                        fontSize="24px"
                        fontWeight="700"
                        color="inherit"
                        borderBottom="1px solid"
                        borderColor={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
                    >
                        Resume
                    </ModalHeader>
                    <ModalCloseButton
                        color="inherit"
                        _hover={{
                            bg: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                        }}
                    />
                    <ModalBody p={0}>
                        <Box w="100%" h="80vh">
                            <iframe
                                src={embedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 'none' }}
                                title="Resume"
                            />
                        </Box>
                        <Box
                            p={4}
                            borderTop="1px solid"
                            borderColor={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
                            textAlign="center"
                        >
                            <Button
                                as="a"
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="md"
                                bg="#0071e3"
                                color="white"
                                borderRadius="full"
                                px={6}
                                _hover={{
                                    bg: '#0077ed',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 10px 30px rgba(0, 113, 227, 0.3)',
                                }}
                                transition="all 0.3s ease"
                            >
                                Open in New Tab
                            </Button>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ResumeSection;
