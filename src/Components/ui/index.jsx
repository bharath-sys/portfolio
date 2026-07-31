import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { isFinePointer, useInView, useLocalTime, useMagnetic } from "../../lib/hooks";

export const MotionBox = motion(Box);
export const MotionFlex = motion(Flex);
export const MotionHeading = motion(Heading);
export const MotionText = motion(Text);

/* -------------------------------------------------------------------------- */
/* Reveal — scroll-triggered entrance                                          */
/* -------------------------------------------------------------------------- */

/**
 * Reveal uses a plain CSS transition rather than a motion component.
 * These appear dozens of times per page; keeping them off the animation
 * library means the entrance runs entirely on the compositor.
 */
const HIDDEN = {
  up: "translate3d(0, 26px, 0)",
  down: "translate3d(0, -22px, 0)",
  left: "translate3d(-32px, 0, 0)",
  right: "translate3d(32px, 0, 0)",
  fade: "none",
  scale: "scale(0.96)",
};

export const Reveal = ({
  children,
  from = "up",
  delay = 0,
  duration = 0.6,
  once = true,
  ...rest
}) => {
  const [ref, inView] = useInView({ once, threshold: 0.1 });

  return (
    <Box
      ref={ref}
      opacity={inView ? 1 : 0}
      transform={inView ? "none" : HIDDEN[from] || HIDDEN.up}
      transition={`opacity ${duration}s var(--ease-out) ${delay}s, transform ${duration}s var(--ease-out) ${delay}s`}
      willChange={inView ? "auto" : "opacity, transform"}
      {...rest}
    >
      {children}
    </Box>
  );
};

/* -------------------------------------------------------------------------- */
/* Label — mono uppercase eyebrow, optional index + rule                       */
/* -------------------------------------------------------------------------- */

export const Label = ({ children, index, accent = false, rule = false, ...rest }) => (
  <Flex align="center" gap={3} {...rest}>
    {index != null && (
      <Text
        as="span"
        textStyle="label"
        color="var(--accent-text)"
        letterSpacing="0.12em"
      >
        [{String(index).padStart(2, "0")}]
      </Text>
    )}
    <Text as="span" textStyle="label" color={accent ? "var(--accent-text)" : undefined}>
      {children}
    </Text>
    {rule && <Box flex="1" h="1px" bg="var(--line)" />}
  </Flex>
);

/* -------------------------------------------------------------------------- */
/* SectionHeader                                                               */
/* -------------------------------------------------------------------------- */

export const SectionHeader = ({ index, eyebrow, title, sub, align = "left" }) => (
  <Box mb={{ base: 10, md: 14 }} textAlign={align}>
    <Reveal from="fade">
      <Label
        index={index}
        rule={align === "left"}
        justify={align === "center" ? "center" : "flex-start"}
        mb={5}
      >
        {eyebrow}
      </Label>
    </Reveal>
    <Reveal from="up" delay={0.06}>
      <Heading
        as="h2"
        textStyle="sectionTitle"
        fontSize={{ base: "clamp(2.1rem,10vw,3rem)", md: "clamp(3rem,6vw,4.5rem)" }}
        color="var(--fg)"
      >
        {title}
      </Heading>
    </Reveal>
    {sub && (
      <Reveal from="up" delay={0.12}>
        <Text
          textStyle="body"
          mt={4}
          maxW="60ch"
          mx={align === "center" ? "auto" : 0}
        >
          {sub}
        </Text>
      </Reveal>
    )}
  </Box>
);

/* -------------------------------------------------------------------------- */
/* Panel — bordered surface with cursor spotlight + corner ticks               */
/* -------------------------------------------------------------------------- */

export const Panel = ({
  children,
  ticks = true,
  accent = "var(--acid)",
  hoverLift = true,
  p = { base: 6, md: 7 },
  ...rest
}) => (
  <Box
    role="group"
    position="relative"
    overflow="hidden"
    bg="var(--surface)"
    border="1px solid"
    borderColor="var(--line)"
    borderRadius="3px"
    p={p}
    // Hover handled purely in CSS — no mousemove listeners, no state, so a
    // grid of these costs nothing to render or scroll past.
    transition="border-color .28s var(--ease-out), transform .28s var(--ease-out), background-color .28s var(--ease-out)"
    _hover={{
      borderColor: "var(--line-2)",
      bg: "var(--surface-2)",
      transform: hoverLift ? "translateY(-3px)" : undefined,
    }}
    {...rest}
  >
    {ticks && (
      <>
        <CornerTick top="-1px" left="-1px" accent={accent} />
        <CornerTick top="-1px" right="-1px" accent={accent} flipX />
        <CornerTick bottom="-1px" left="-1px" accent={accent} flipY />
        <CornerTick bottom="-1px" right="-1px" accent={accent} flipX flipY />
      </>
    )}
    <Box position="relative" zIndex={1}>
      {children}
    </Box>
  </Box>
);

const CornerTick = ({ accent, flipX, flipY, ...pos }) => (
  <Box
    aria-hidden
    position="absolute"
    w="9px"
    h="9px"
    pointerEvents="none"
    borderTop="1.5px solid"
    borderLeft="1.5px solid"
    borderColor="transparent"
    transition="border-color .28s var(--ease-out)"
    transform={`scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`}
    transformOrigin="center"
    _groupHover={{ borderColor: accent }}
    {...pos}
  />
);

/* -------------------------------------------------------------------------- */
/* Marquee — infinite ticker strip                                             */
/* -------------------------------------------------------------------------- */

export const Marquee = ({
  items = [],
  reverse = false,
  speed = 38,
  separator = "◆",
  fontSize = { base: "13px", md: "15px" },
  py = 3,
  bg = "transparent",
  color = "var(--fg-dim)",
  borderY = true,
}) => {
  const doubled = [...items, ...items];
  return (
    <Box
      overflow="hidden"
      bg={bg}
      py={py}
      borderTop={borderY ? "1px solid" : "none"}
      borderBottom={borderY ? "1px solid" : "none"}
      borderColor="var(--line)"
      position="relative"
      zIndex={1}
    >
      <Box
        className={`bk-marquee${reverse ? " bk-marquee-rev" : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <Flex key={i} align="center" gap={{ base: 5, md: 8 }} pr={{ base: 5, md: 8 }}>
            <Text
              as="span"
              fontFamily="var(--font-mono)"
              fontSize={fontSize}
              letterSpacing="0.16em"
              textTransform="uppercase"
              color={color}
              whiteSpace="nowrap"
            >
              {item}
            </Text>
            <Text as="span" fontSize="9px" color="var(--accent-text)">
              {separator}
            </Text>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

/* -------------------------------------------------------------------------- */
/* Magnetic — wrapper that leans toward the cursor                             */
/* -------------------------------------------------------------------------- */

export const Magnetic = ({ children, strength = 0.28, ...rest }) => {
  const ref = useMagnetic(strength);
  return (
    <Box
      ref={ref}
      display="inline-block"
      transition="transform .45s var(--ease-out)"
      {...rest}
    >
      {children}
    </Box>
  );
};

/* -------------------------------------------------------------------------- */
/* Tag — small mono chip                                                       */
/* -------------------------------------------------------------------------- */

export const Tag = ({ children, accent = false, ...rest }) => (
  <Text
    as="span"
    display="inline-flex"
    alignItems="center"
    fontFamily="var(--font-mono)"
    fontSize="10px"
    letterSpacing="0.12em"
    textTransform="uppercase"
    px={2.5}
    py="5px"
    borderRadius="2px"
    border="1px solid"
    borderColor={accent ? "var(--acid)" : "var(--line)"}
    color={accent ? "var(--accent-text)" : "var(--fg-dim)"}
    bg={accent ? "var(--glow)" : "var(--surface)"}
    whiteSpace="nowrap"
    {...rest}
  >
    {children}
  </Text>
);

/* -------------------------------------------------------------------------- */
/* LiveDot — pulsing status dot                                                */
/* -------------------------------------------------------------------------- */

export const LiveDot = ({ color = "var(--acid)", size = "7px" }) => (
  <Box position="relative" w={size} h={size} flexShrink={0}>
    <Box position="absolute" inset={0} borderRadius="full" bg={color} />
    <Box
      position="absolute"
      inset={0}
      borderRadius="full"
      bg={color}
      sx={{ animation: "bkPulse 1.8s ease-in-out infinite" }}
    />
  </Box>
);

/* -------------------------------------------------------------------------- */
/* HoverSwap — text that flips to a duplicate on hover (link micro-interaction)*/
/* -------------------------------------------------------------------------- */

export const HoverSwap = ({ children, ...rest }) => (
  <Box
    position="relative"
    overflow="hidden"
    display="inline-block"
    role="group"
    lineHeight="1.15"
    {...rest}
  >
    <Box
      as="span"
      display="block"
      transition="transform .45s var(--ease-out)"
      _groupHover={{ transform: "translateY(-100%)" }}
    >
      {children}
    </Box>
    <Box
      as="span"
      display="block"
      position="absolute"
      top={0}
      left={0}
      color="var(--accent-text)"
      transform="translateY(100%)"
      transition="transform .45s var(--ease-out)"
      _groupHover={{ transform: "translateY(0)" }}
      aria-hidden
    >
      {children}
    </Box>
  </Box>
);

/* -------------------------------------------------------------------------- */
/* TerminalCard — the signature surface: title bar + monospace body            */
/* -------------------------------------------------------------------------- */

export const TerminalCard = ({
  path = "~",
  title,
  accent = "var(--acid)",
  children,
  bodyProps = {},
  ...rest
}) => (
  <Box
    role="group"
    position="relative"
    bg="var(--surface)"
    border="1px solid"
    borderColor="var(--line)"
    borderRadius="3px"
    overflow="hidden"
    transition="border-color .28s var(--ease-out), transform .28s var(--ease-out)"
    _hover={{ borderColor: "var(--line-2)" }}
    {...rest}
  >
    {/* title bar */}
    <Flex
      align="center"
      justify="space-between"
      gap={3}
      px={4}
      py={2.5}
      borderBottom="1px solid"
      borderColor="var(--line)"
      bg="var(--bg-alt)"
    >
      <Flex gap={1.5} flexShrink={0}>
        {["var(--flare)", accent, "var(--cyan)"].map((c, i) => (
          <Box key={i} w="8px" h="8px" borderRadius="full" bg={c} opacity={0.8} />
        ))}
      </Flex>
      <Text
        textStyle="label"
        fontSize="9px"
        noOfLines={1}
        textAlign="right"
        minW={0}
      >
        {path}
      </Text>
    </Flex>

    {title && (
      <Flex
        align="center"
        gap={2}
        px={{ base: 5, md: 6 }}
        pt={5}
        fontFamily="var(--font-mono)"
        fontSize="12px"
      >
        <Box as="span" color={accent}>
          $
        </Box>
        <Text as="span" color="var(--fg-mute)">
          {title}
        </Text>
      </Flex>
    )}

    <Box
      px={{ base: 5, md: 6 }}
      py={5}
      fontFamily="var(--font-mono)"
      fontSize="12.5px"
      {...bodyProps}
    >
      {children}
    </Box>
  </Box>
);

/** Dashed key/value row for use inside TerminalCard */
export const TerminalRow = ({ label, value, accent = false, last = false }) => (
  <Flex
    justify="space-between"
    align="baseline"
    gap={4}
    py={2}
    borderBottom={last ? "none" : "1px dashed"}
    borderColor="var(--line)"
  >
    <Text as="span" color="var(--fg-mute)" flexShrink={0}>
      {label}
    </Text>
    <Text
      as="span"
      textAlign="right"
      color={accent ? "var(--accent-text)" : "var(--fg)"}
      minW={0}
    >
      {value}
    </Text>
  </Flex>
);

/* -------------------------------------------------------------------------- */
/* Clock — isolated so its per-second tick never re-renders a parent           */
/* -------------------------------------------------------------------------- */

export const Clock = ({ suffix = "IST", ...rest }) => {
  const time = useLocalTime("Asia/Kolkata");
  return (
    <Text as="span" {...rest}>
      {time} {suffix}
    </Text>
  );
};

export { isFinePointer };
