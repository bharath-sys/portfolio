import React, { useEffect, useState } from "react";
import { Box, Flex, Icon, IconButton, Stack, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { MdClose, MdMenu } from "react-icons/md";
import ColorModeToggle from "./ColorModeToggle";
import { Clock, LiveDot } from "./ui";
import { useScrollBar, useScrolled } from "../lib/hooks";
import { scrollToSection, useActiveSection } from "../lib/scroll";

const MotionBox = motion(Box);

const NAV = [
  { id: "profiles", label: "Profiles" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = NAV.map((n) => n.id);

/* ---------------------------------------------------------------- logo --- */

const Logo = ({ onClick }) => (
  <Flex
    as="button"
    type="button"
    onClick={onClick}
    align="center"
    gap={2.5}
    role="group"
    aria-label="Back to top"
  >
    <Flex
      w="28px"
      h="28px"
      align="center"
      justify="center"
      border="1px solid"
      borderColor="var(--line-2)"
      borderRadius="2px"
      fontFamily="var(--font-mono)"
      fontSize="12px"
      fontWeight="700"
      letterSpacing="-0.06em"
      flexShrink={0}
      transition="all .3s var(--ease-out)"
      _groupHover={{
        bg: "var(--acid)",
        color: "var(--acid-ink)",
        borderColor: "var(--acid)",
        transform: "rotate(-6deg)",
      }}
    >
      BK
    </Flex>
    <Box display={{ base: "none", sm: "block" }} textAlign="left">
      <Text
        fontFamily="var(--font-display)"
        fontSize="14px"
        fontWeight="700"
        letterSpacing="-0.02em"
        textTransform="uppercase"
        lineHeight="1"
      >
        Bharath Kumar
      </Text>
      <Text textStyle="label" fontSize="9px" mt="3px">
        Full-Stack Engineer
      </Text>
    </Box>
  </Flex>
);

/* ------------------------------------------------------------- nav link --- */

const NavLink = ({ id, label, index, active, onClick }) => (
  <Flex
    as="button"
    type="button"
    onClick={() => onClick(id)}
    role="group"
    align="baseline"
    gap={1.5}
    position="relative"
    py={1}
    aria-current={active ? "true" : undefined}
  >
    <Text
      as="span"
      fontFamily="var(--font-mono)"
      fontSize="9px"
      color={active ? "var(--accent-text)" : "var(--fg-mute)"}
      transition="color .25s"
      _groupHover={{ color: "var(--accent-text)" }}
    >
      {String(index).padStart(2, "0")}
    </Text>
    <Text
      as="span"
      fontFamily="var(--font-mono)"
      fontSize={{ base: "16px", md: "12px" }}
      fontWeight={500}
      letterSpacing="0.1em"
      textTransform="uppercase"
      color={active ? "var(--fg)" : "var(--fg-dim)"}
      transition="color .25s"
      _groupHover={{ color: "var(--fg)" }}
    >
      {label}
    </Text>
    <Box
      position="absolute"
      bottom="-2px"
      left={0}
      h="1.5px"
      bg="var(--acid)"
      w={active ? "100%" : "0%"}
      transition="width .4s var(--ease-out)"
      _groupHover={{ w: "100%" }}
    />
  </Flex>
);

/* -------------------------------------------------------------- header --- */

function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(12);
  const progressRef = useScrollBar();
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    // let the overlay close before measuring scroll position
    requestAnimationFrame(() => scrollToSection(id));
  };

  const toTop = () => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* status strip */}
      <Box
        display={{ base: "none", md: "block" }}
        borderBottom="1px solid"
        borderColor="var(--line)"
        bg="var(--bg-alt)"
        position="relative"
        zIndex={60}
      >
        <Flex
          maxW="var(--maxw)"
          mx="auto"
          px={{ base: 5, md: 8 }}
          h="30px"
          align="center"
          justify="space-between"
          gap={6}
        >
          <Flex align="center" gap={2.5}>
            <LiveDot />
            <Text textStyle="label" fontSize="9px" color="var(--fg-dim)">
              Available for work
            </Text>
          </Flex>
          <Flex align="center" gap={6}>
            <Text textStyle="label" fontSize="9px">
              Hyderabad, IN
            </Text>
            <Clock textStyle="label" fontSize="9px" color="var(--fg-dim)" />
          </Flex>
        </Flex>
      </Box>

      {/* nav */}
      <Box
        as="header"
        position="sticky"
        top={0}
        zIndex={50}
        borderBottom="1px solid"
        borderColor={scrolled ? "var(--line)" : "transparent"}
        bg={scrolled ? "var(--bg)" : "transparent"}
        transition="background-color .3s var(--ease-out), border-color .3s var(--ease-out)"
      >
        <Flex
          maxW="var(--maxw)"
          mx="auto"
          px={{ base: 5, md: 8 }}
          h="var(--nav-h)"
          align="center"
          justify="space-between"
          gap={6}
        >
          <Logo onClick={toTop} />

          <Flex
            as="nav"
            display={{ base: "none", lg: "flex" }}
            align="center"
            gap={6}
          >
            {NAV.map((item, i) => (
              <NavLink
                key={item.id}
                {...item}
                index={i + 1}
                active={active === item.id}
                onClick={go}
              />
            ))}
          </Flex>

          <Flex align="center" gap={2}>
            <Box
              as="button"
              type="button"
              onClick={() => go("contact")}
              display={{ base: "none", sm: "flex" }}
              alignItems="center"
              h="34px"
              px={4}
              border="1px solid"
              borderColor="var(--acid)"
              bg="var(--acid)"
              color="var(--acid-ink)"
              borderRadius="2px"
              fontFamily="var(--font-mono)"
              fontSize="11px"
              letterSpacing="0.1em"
              textTransform="uppercase"
              transition="all .3s var(--ease-out)"
              _hover={{
                bg: "transparent",
                color: "var(--accent-text)",
                transform: "translate(-2px,-2px)",
                boxShadow: "4px 4px 0 0 var(--acid)",
              }}
            >
              Get in touch
            </Box>
            <ColorModeToggle />
            <IconButton
              display={{ base: "inline-flex", lg: "none" }}
              onClick={() => setOpen((v) => !v)}
              icon={<Icon as={open ? MdClose : MdMenu} w={5} h={5} />}
              variant="ghost"
              size="sm"
              aria-label="Toggle navigation"
              color="var(--fg)"
            />
          </Flex>
        </Flex>

        {/* reading progress — written straight to the DOM */}
        <Box
          ref={progressRef}
          position="absolute"
          bottom="-1px"
          left={0}
          h="1.5px"
          w="0%"
          bg="var(--acid)"
          willChange="width"
        />
      </Box>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <MotionBox
            key="mobile-nav"
            position="fixed"
            inset={0}
            zIndex={45}
            bg="var(--bg)"
            pt="calc(var(--nav-h) + 24px)"
            px={6}
            overflowY="auto"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Stack spacing={0} divider={<Box h="1px" bg="var(--line)" />}>
              {NAV.map((item, i) => (
                <Box key={item.id} py={4}>
                  <NavLink
                    {...item}
                    index={i + 1}
                    active={active === item.id}
                    onClick={go}
                  />
                </Box>
              ))}
            </Stack>

            <Flex mt={8} gap={3} wrap="wrap" pb={10}>
              {[
                ["GitHub", "https://github.com/bharath-sys"],
                ["LinkedIn", "https://www.linkedin.com/in/kodigudla-bharath-kumar/"],
                ["Email", "mailto:kbk.bharath12345@gmail.com"],
              ].map(([label, href]) => (
                <Box
                  key={label}
                  as="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  px={4}
                  py={2}
                  border="1px solid"
                  borderColor="var(--line-2)"
                  borderRadius="2px"
                  fontFamily="var(--font-mono)"
                  fontSize="11px"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                >
                  {label} ↗
                </Box>
              ))}
            </Flex>
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
