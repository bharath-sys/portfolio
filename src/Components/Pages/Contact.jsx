import React, { useState } from "react";
import { Flex, Box, Link, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text } from "@chakra-ui/react";

const ContactSection = () => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    return (
        <Flex align="center" justify="center" p="4" gap={5}>
            {/* LinkedIn */}
            <Box mr="4">
                <Link href="https://www.linkedin.com/in/kodigudla-bharath-kumar/" isExternal>
                    <Image src="https://firebasestorage.googleapis.com/v0/b/portfolio-668b7.appspot.com/o/Logos%2Ficons8-linkedin-240.png?alt=media&token=b8053f48-3fc7-4f3a-aad1-551b59ef4cec" alt="LinkedIn" w="50px" h="50px" />
                </Link>
            </Box>

            {/* Email */}
            <Box mr="4">
                <Link href="mailto:kbk.bharath12345@gmail.com">
                    <Image src="https://firebasestorage.googleapis.com/v0/b/portfolio-668b7.appspot.com/o/Logos%2Ficons8-gmail-240.png?alt=media&token=cf6611a1-4110-465e-8e29-7c9ae4402b67" alt="Email" w="50px" h="50px" />
                </Link>
            </Box>

            {/* Phone Number */}
            <Box onClick={() => { setIsContactModalOpen(true) }}>
                <Image src="https://firebasestorage.googleapis.com/v0/b/portfolio-668b7.appspot.com/o/Logos%2Ficons8-phone-240.png?alt=media&token=022740e7-c9a2-41dd-9d94-a1bc0761e982" alt="Phone" w="50px" h="50px" />
            </Box>
            {
                isContactModalOpen && <Modal isOpen={isContactModalOpen} onClose={() => { setIsContactModalOpen(false) }}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Contact</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>9963151489</Text>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            }
        </Flex>
    );
};

export default ContactSection;
