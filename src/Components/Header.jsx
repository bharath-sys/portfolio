import React, { useState } from "react";
import { Box, Text, Stack, Flex, Icon, IconButton, Collapse } from "@chakra-ui/react";
import { MdClose, MdMenu } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ColorModeToggle from "./ColorModeToggle";

const MotionFlex = motion(Flex);

const Logo = () => {
    return (
        <Text
            fontSize="21px"
            fontWeight="600"
            color="inherit"
            letterSpacing="-0.01em"
        >
            <Link to={"/"}>Bharath Kumar</Link>
        </Text>
    );
};

const MenuToggle = ({ toggle, isOpen }) => {
    return (
        <IconButton
            display={{ base: "flex", md: "none" }}
            onClick={toggle}
            icon={<Icon as={isOpen ? MdClose : MdMenu} w={6} h={6} />}
            variant="ghost"
            aria-label="Toggle menu"
            color="inherit"
            _hover={{ bg: "rgba(0, 113, 227, 0.1)" }}
        />
    );
};

const NavLink = ({ to, children, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to} onClick={onClick}>
            <Text
                fontSize="12px"
                fontWeight={isActive ? "600" : "400"}
                color={isActive ? "inherit" : "gray.500"}
                transition="color 0.3s ease"
                _hover={{ color: "inherit" }}
                letterSpacing="0.01em"
                textTransform="uppercase"
            >
                {children}
            </Text>
        </Link>
    );
};

const MenuLinks = ({ isOpen, onClose }) => {
    return (
        <Collapse in={isOpen} animateOpacity>
            <Box
                display={{ base: "block", md: "none" }}
                pb={4}
                pt={4}
            >
                <Stack spacing={4} align="center">
                    <NavLink to="/about" onClick={onClose}>Projects</NavLink>
                    <NavLink to="/experience" onClick={onClose}>Experience</NavLink>
                    <NavLink to="/education" onClick={onClose}>Education</NavLink>
                    <NavLink to="/contact" onClick={onClose}>Contact</NavLink>
                </Stack>
            </Box>
        </Collapse>
    );
};

const DesktopMenuLinks = () => {
    return (
        <Stack
            spacing={8}
            align="center"
            direction="row"
            display={{ base: "none", md: "flex" }}
        >
            <NavLink to="/about">About</NavLink>
            <NavLink to="/experience">Experience</NavLink>
            <NavLink to="/education">Education</NavLink>
            <NavLink to="/contact">Contact</NavLink>
        </Stack>
    );
};

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <Box w="100%">
            <MotionFlex
                as="nav"
                align="center"
                justify="space-between"
                w="100%"
                maxW="980px"
                mx="auto"
                px={{ base: 6, md: 8 }}
                py={5}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <Logo />
                <Flex align="center" gap={4}>
                    <DesktopMenuLinks />
                    <ColorModeToggle />
                    <MenuToggle toggle={toggleMenu} isOpen={isOpen} />
                </Flex>
            </MotionFlex>
            <MenuLinks isOpen={isOpen} onClose={closeMenu} />
        </Box>
    );
}

export default Header;
