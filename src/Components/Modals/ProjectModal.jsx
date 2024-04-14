import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Text, Flex } from "@chakra-ui/react";

const ProjectModal = ({ isOpen, onClose, project }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{project.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>{project.description}</Text>
                </ModalBody>
                <ModalFooter>
                    <Flex gap={5}>
                        <Button as="a"
                            href={project?.demoLink}
                            target="_blank"  // Open link in new tab
                            rel="noopener noreferrer" // Security attribute for external links
                            colorScheme="blue" // Change color scheme as neededon
                        >Demo Link</Button>
                        <Button as="a"
                            href={project?.codeRepoLink}
                            target="_blank"  // Open link in new tab
                            rel="noopener noreferrer" // Security attribute for external links
                            colorScheme="blue" // Change color scheme as neededon
                        >Code Link</Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ProjectModal;
