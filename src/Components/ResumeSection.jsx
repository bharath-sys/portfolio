import React from "react";
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const RESUME_ID = "1Oz6JUn_4-IRcxHcGIITc6xKoWcXVZP_M";
export const RESUME_URL = `https://drive.google.com/file/d/${RESUME_ID}/view`;
const EMBED_URL = `https://drive.google.com/file/d/${RESUME_ID}/preview`;

/** Résumé viewer. Rendered from the hero so it's one click from the top. */
const ResumeModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
    <ModalOverlay />
    <ModalContent maxH="92vh" overflow="hidden" mx={4}>
      <ModalHeader
        borderBottom="1px solid"
        borderColor="var(--line)"
        fontSize="17px"
        textTransform="uppercase"
        letterSpacing="-0.02em"
      >
        Résumé — Bharath Kumar
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody p={0}>
        <Box w="100%" h="78vh" bg="var(--bg)">
          {isOpen && (
            <iframe
              src={EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: "none" }}
              title="Résumé — Bharath Kumar"
            />
          )}
        </Box>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default ResumeModal;
