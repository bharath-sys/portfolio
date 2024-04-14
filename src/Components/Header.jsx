import React, { useEffect, useState } from "react";
import { Box, Text, Stack, Flex, Icon } from "@chakra-ui/react";
import { MdClose, MdMenu } from "react-icons/md";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useBreakpointValue } from "@chakra-ui/react";
import "../index.css"; 

const Logo = () => {
    return (
        <Box>
            <Text fontSize="lg" fontWeight="bold" color="black">
                <Link to={"/"}>Bharath Kumar</Link>
            </Text>
        </Box>
    );
};

const MenuToggle = ({ toggle, isOpen }) => {
    return (
        <Box display={{ base: "block", md: "none" }} onClick={toggle}>
            {isOpen ? <Icon as={MdClose} /> : <Icon as={MdMenu} />}
        </Box>
    );
};



const MenuLinks = ({ isOpen }) => {
    const backgroundColor = useBreakpointValue({ base: "white", lg: "transparent",md: "transparent"});
    // const fontColor = useBreakpointValue({ base:"white", lg: "black", md: "black"});
    const borderRadius = useBreakpointValue({ base: "10px", lg: 0, md: 0 });
    return (
        <Box
            display={{ base: isOpen ? "block" : "none", md: "block" }}
            flexBasis={{ base: "100%", md: "auto" }}
            position={{ base: "fixed", md: "static" }}
            top="18" // Ensure it starts from the top of the viewport
            right="20" // Ensure it starts from the left of the viewport
            zIndex="10" // Set a higher z-index to ensure it appears on top
        >
            <Stack
                spacing={8}
                minW={"150px"}
                minH={"50px"}
                align="center"
                justify={["center", "space-between", "flex-end"]}
                direction={["column","row"]}
                paddingTop={[4, 4, 0]}
                opacity={100}
                backgroundColor={backgroundColor}
                borderRadius={borderRadius}
                color={"black"}
            >
                <Link to={"/about"}>About</Link>
                <Link to={"/experience"}>Experience</Link>
                <Link to={"/education"}>Education</Link>
                <Link to={"/contact"}>Contact</Link>
            </Stack>
        </Box>
    );
};

const NavBarContainer = ({ children }) => {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            width="100%"
            padding={8}
            bg={"transparent"}
            color={"gray.600"}
        >
            {children}
        </Flex>
    );
};

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    return (
        <NavBarContainer>
            <Logo />
            <MenuToggle toggle={toggleMenu} isOpen={isOpen} />
            <MenuLinks isOpen={isOpen} />
        </NavBarContainer>
    );
}

export default Header;
