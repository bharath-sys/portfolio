import React from "react";
import { Box, Flex, Tooltip, useColorMode } from "@chakra-ui/react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

/**
 * Brutalist two-state switch — a bordered track with a hard-edged knob.
 */
const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === "dark";

  return (
    <Tooltip label={dark ? "Light mode" : "Dark mode"} openDelay={400}>
      <Flex
        as="button"
        type="button"
        aria-label="Toggle colour mode"
        onClick={toggleColorMode}
        w="54px"
        h="28px"
        p="2px"
        align="center"
        position="relative"
        border="1px solid"
        borderColor="var(--line-2)"
        borderRadius="2px"
        bg="var(--surface)"
        transition="border-color .3s"
        _hover={{ borderColor: "var(--acid)" }}
        flexShrink={0}
      >
        <Flex
          w="22px"
          h="22px"
          align="center"
          justify="center"
          bg="var(--acid)"
          color="var(--acid-ink)"
          borderRadius="1px"
          transform={dark ? "translateX(0)" : "translateX(26px)"}
          transition="transform .4s var(--ease-out)"
          fontSize="13px"
        >
          <Box as={dark ? MdDarkMode : MdLightMode} />
        </Flex>
      </Flex>
    </Tooltip>
  );
};

export default ColorModeToggle;
