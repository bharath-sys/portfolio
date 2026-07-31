import React from "react";
import { Box, Flex, Grid, Text, useToast } from "@chakra-ui/react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { MdArrowOutward, MdContentCopy, MdEmail, MdPhone } from "react-icons/md";
import { Clock, LiveDot, Reveal, TerminalCard, TerminalRow } from "./ui";

const EMAIL = "kbk.bharath12345@gmail.com";
const PHONE = "9963151489";

/* ------------------------------------------------------------- channels --- */

const CHANNELS = [
  {
    key: "email",
    icon: MdEmail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    accent: "var(--acid)",
    rows: [
      ["reply", "< 24 hours"],
      ["best for", "Anything"],
    ],
  },
  {
    key: "linkedin",
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "/in/kodigudla-bharath-kumar",
    href: "https://www.linkedin.com/in/kodigudla-bharath-kumar/",
    accent: "#0A66C2",
    rows: [
      ["reply", "< 48 hours"],
      ["best for", "Roles & intros"],
    ],
  },
  {
    key: "github",
    icon: SiGithub,
    label: "GitHub",
    value: "github.com/bharath-sys",
    href: "https://github.com/bharath-sys",
    accent: "var(--violet)",
    rows: [
      ["reply", "On issues / PRs"],
      ["best for", "Code"],
    ],
  },
  {
    key: "phone",
    icon: MdPhone,
    label: "Phone",
    value: PHONE,
    href: `tel:${PHONE}`,
    accent: "var(--cyan)",
    rows: [
      ["hours", "09:00 – 21:00 IST"],
      ["best for", "Quick chats"],
    ],
  },
];

const ChannelCard = ({ c }) => (
  <TerminalCard
    as="a"
    href={c.href}
    target={c.href.startsWith("http") ? "_blank" : undefined}
    rel="noopener noreferrer"
    path={`~/contact/${c.key}`}
    accent={c.accent}
    display="flex"
    flexDirection="column"
    h="100%"
    _hover={{ borderColor: c.accent, transform: "translateY(-3px)" }}
    bodyProps={{ display: "flex", flexDirection: "column", flex: "1" }}
  >
    <Flex align="center" justify="space-between" gap={3} mb={5}>
      <Flex align="center" gap={3} minW={0}>
        <Box as={c.icon} fontSize="19px" color={c.accent} flexShrink={0} />
        <Text
          fontFamily="var(--font-display)"
          fontSize="16px"
          fontWeight="700"
          letterSpacing="-0.02em"
          textTransform="uppercase"
          color="var(--fg)"
        >
          {c.label}
        </Text>
      </Flex>
      <Box
        as={MdArrowOutward}
        fontSize="16px"
        color="var(--fg-mute)"
        flexShrink={0}
        transition="all .3s var(--ease-out)"
        _groupHover={{ color: c.accent, transform: "translate(4px,-4px)" }}
      />
    </Flex>

    <Text color="var(--fg)" fontSize="12px" wordBreak="break-all" mb={5}>
      {c.value}
    </Text>

    <Box mt="auto">
      {c.rows.map(([k, v], i) => (
        <TerminalRow key={k} label={k} value={v} last={i === c.rows.length - 1} />
      ))}
    </Box>
  </TerminalCard>
);

/* --------------------------------------------------------------- export --- */

const Contact = () => {
  const toast = useToast();

  const copy = async (text, what) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: `${what} copied`,
        status: "success",
        duration: 2000,
        position: "bottom-right",
      });
    } catch {
      toast({ title: "Copy failed", status: "error", duration: 2000 });
    }
  };

  return (
    <Box w="100%">
      <Grid
        templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={5}
      >
        {CHANNELS.map((c, i) => (
          <Reveal key={c.key} from="up" delay={i * 0.06}>
            <ChannelCard c={c} />
          </Reveal>
        ))}
      </Grid>

      <Reveal from="up" delay={0.1}>
        <Grid
          mt={5}
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={5}
          alignItems="stretch"
        >
          <TerminalCard path="~/availability" title="status --now" h="100%">
            <TerminalRow label="open to" value="Full-time · Contract" accent />
            <TerminalRow label="notice" value="Negotiable" />
            <TerminalRow label="timezone" value={<Clock as="span" />} />
            <TerminalRow label="location" value="Hyderabad, India" />
            <TerminalRow label="remote" value="Yes" last />
            <Flex align="center" gap={2.5} mt={5}>
              <LiveDot />
              <Text color="var(--accent-text)" fontSize="11.5px">
                Actively taking conversations
              </Text>
            </Flex>
          </TerminalCard>

          <TerminalCard path="~/quick-copy" title="cat contact.txt" h="100%">
            {[
              [EMAIL, "Email"],
              [PHONE, "Number"],
            ].map(([value, what]) => (
              <Flex
                key={what}
                as="button"
                type="button"
                onClick={() => copy(value, what)}
                w="100%"
                align="center"
                justify="space-between"
                gap={4}
                py={3.5}
                px={4}
                mb={3}
                border="1px solid"
                borderColor="var(--line)"
                borderRadius="2px"
                transition="border-color .25s"
                _hover={{ borderColor: "var(--acid)" }}
              >
                <Text
                  fontSize={{ base: "11.5px", md: "12.5px" }}
                  color="var(--fg)"
                  wordBreak="break-all"
                  textAlign="left"
                >
                  {value}
                </Text>
                <Flex align="center" gap={2} flexShrink={0} color="var(--fg-mute)">
                  <Text fontSize="10px" letterSpacing="0.1em" textTransform="uppercase">
                    Copy
                  </Text>
                  <Box as={MdContentCopy} fontSize="13px" />
                </Flex>
              </Flex>
            ))}
            <Text color="var(--fg-mute)" fontSize="11px" mt={2} className="bk-caret">
              <Box as="span" color="var(--accent-text)">
                $
              </Box>{" "}
            </Text>
          </TerminalCard>
        </Grid>
      </Reveal>
    </Box>
  );
};

export default Contact;
