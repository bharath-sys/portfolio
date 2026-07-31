import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

/**
 * A shuffling deck of terminal windows.
 *
 * The focused card sits square at the front; the rest fan out behind it,
 * rotated and stepped down like a hand of cards. Clicking the front card
 * deals it to the back, clicking any card behind pulls it forward, and the
 * tab strip jumps straight to one. Everything is a transform, so the shuffle
 * runs on the compositor and never reflows the page.
 */

/*
 * Stack geometry: each card behind steps a fixed distance to the right.
 * No rotation and no vertical drift, so the deck stays square and the edges
 * line up like a neat pile of windows.
 */
const STEP_X = 16; // px to the right per card behind
const VISIBLE = 4; // front card + 3 behind

const WindowStack = ({
  items = [],
  renderTitle,
  renderBody,
  path = "~",
  accent = "var(--acid)",
  height = { base: "440px", md: "470px" },
}) => {
  const [active, setActive] = useState(0);
  const count = items.length;

  if (!count) return null;

  const next = () => setActive((v) => (v + 1) % count);

  return (
    <Box>
      {/* tab strip */}
      <Flex gap={2} mb={5} wrap="wrap">
        {items.map((item, i) => {
          const on = i === active;
          return (
            <Box
              key={item.key || i}
              as="button"
              type="button"
              onClick={() => setActive(i)}
              px={3}
              py={2}
              maxW="190px"
              border="1px solid"
              borderColor={on ? accent : "var(--line)"}
              bg={on ? accent : "transparent"}
              color={on ? "var(--acid-ink)" : "var(--fg-dim)"}
              borderRadius="2px"
              fontFamily="var(--font-mono)"
              fontSize="10.5px"
              letterSpacing="0.08em"
              textTransform="uppercase"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              transition="all .25s var(--ease-out)"
              _hover={on ? {} : { borderColor: "var(--line-strong)", color: "var(--fg)" }}
              aria-pressed={on}
            >
              {item.tab}
            </Box>
          );
        })}
      </Flex>

      {/* deck — right margin leaves room for the stepped cards behind */}
      <Box
        position="relative"
        h={height}
        mr={`${STEP_X * (VISIBLE - 1)}px`}
      >
        {items.map((item, i) => {
          const depth = (i - active + count) % count;
          const shown = depth < VISIBLE;
          const front = depth === 0;

          return (
            <Box
              key={item.key || i}
              position="absolute"
              top={0}
              left={0}
              right={0}
              h="100%"
              zIndex={count - depth}
              opacity={shown ? 1 : 0}
              pointerEvents={shown ? "auto" : "none"}
              transform={`translate3d(${depth * STEP_X}px, 0, 0)`}
              filter={front ? "none" : `brightness(${1 - depth * 0.05})`}
              transition="transform .4s var(--ease-out), opacity .3s var(--ease-out), filter .3s var(--ease-out)"
              onClick={front ? undefined : () => setActive(i)}
              cursor={front ? "default" : "pointer"}
            >
              <Box
                h="100%"
                display="flex"
                flexDirection="column"
                bg="var(--bg-alt)"
                border="1px solid"
                borderColor={front ? "var(--line-2)" : "var(--line)"}
                borderRadius="3px"
                overflow="hidden"
                boxShadow={
                  front
                    ? "0 22px 50px -28px rgba(0,0,0,.6)"
                    : "0 14px 30px -24px rgba(0,0,0,.55)"
                }
                transition="border-color .3s var(--ease-out), box-shadow .3s var(--ease-out)"
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
                  bg="var(--surface)"
                  flexShrink={0}
                >
                  <Flex gap={1.5} flexShrink={0}>
                    {["var(--flare)", accent, "var(--cyan)"].map((c, k) => (
                      <Box
                        key={k}
                        w="8px"
                        h="8px"
                        borderRadius="full"
                        bg={c}
                        opacity={front ? 0.85 : 0.35}
                      />
                    ))}
                  </Flex>
                  <Text textStyle="label" fontSize="9px" noOfLines={1} textAlign="right">
                    {typeof path === "function" ? path(item, i) : path}
                  </Text>
                </Flex>

                {renderTitle && (
                  <Box
                    px={{ base: 5, md: 6 }}
                    py={4}
                    borderBottom="1px solid"
                    borderColor="var(--line)"
                    flexShrink={0}
                  >
                    {renderTitle(item, i)}
                  </Box>
                )}

                <Box
                  flex="1"
                  minH={0}
                  overflowY="auto"
                  className="no-scrollbar"
                  px={{ base: 5, md: 6 }}
                  py={5}
                  fontFamily="var(--font-mono)"
                  fontSize="12.5px"
                >
                  {renderBody(item, i)}
                </Box>

                {/* deal control */}
                <Flex
                  align="center"
                  justify="space-between"
                  px={{ base: 5, md: 6 }}
                  py={2.5}
                  borderTop="1px solid"
                  borderColor="var(--line)"
                  flexShrink={0}
                >
                  <Text textStyle="label" fontSize="9px">
                    {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                  </Text>
                  {count > 1 && front && (
                    <Text
                      as="button"
                      type="button"
                      onClick={next}
                      textStyle="label"
                      fontSize="9px"
                      color="var(--accent-text)"
                      _hover={{ textDecoration: "underline" }}
                    >
                      Next →
                    </Text>
                  )}
                </Flex>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default WindowStack;
