import React, { useState } from "react";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import {
  SiAmazonaws,
  SiDocker,
  SiExpress,
  SiGit,
  SiGraphql,
  SiJavascript,
  SiJest,
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { Reveal } from "./ui";

const GROUPS = [
  {
    id: "frontend",
    title: "Front end",
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#38BDF8" },
    ],
  },
  {
    id: "backend",
    title: "Back end",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#3C873A" },
      { name: "Express", icon: SiExpress, color: "#EDEDED" },
      { name: "GraphQL", icon: SiGraphql, color: "#E535AB" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
    ],
  },
  {
    id: "platform",
    title: "Platform",
    items: [
      { name: "AWS", icon: SiAmazonaws, color: "#FF9900" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Jest", icon: SiJest, color: "#C21325" },
    ],
  },
];

const ALL = GROUPS.flatMap((g) => g.items);

/* Hover is pure CSS — no state, no listeners, so the whole grid is inert
   until the pointer is actually over a cell. */
const SkillCell = ({ skill, index }) => (
  <Flex
    role="group"
    direction="column"
    justify="space-between"
    position="relative"
    overflow="hidden"
    aspectRatio="1 / 1"
    p={{ base: 3, md: 4 }}
    border="1px solid"
    borderColor="var(--line)"
    borderRadius="2px"
    bg="var(--surface)"
    color="var(--fg)"
    transition="background-color .25s var(--ease-out), border-color .25s var(--ease-out), transform .25s var(--ease-out), color .25s var(--ease-out)"
    _hover={{
      bg: skill.color,
      borderColor: skill.color,
      color: "#0a0a0a",
      transform: "translateY(-4px)",
    }}
  >
    <Flex justify="space-between" align="flex-start">
      <Box
        as={skill.icon}
        fontSize={{ base: "20px", md: "24px" }}
        color={skill.color}
        transition="color .25s"
        _groupHover={{ color: "#0a0a0a" }}
      />
      <Text
        fontFamily="var(--font-mono)"
        fontSize="9px"
        opacity={0.55}
        letterSpacing="0.08em"
      >
        {String(index + 1).padStart(2, "0")}
      </Text>
    </Flex>
    <Text
      fontFamily="var(--font-mono)"
      fontSize={{ base: "10px", md: "11px" }}
      letterSpacing="0.06em"
      textTransform="uppercase"
      fontWeight={600}
    >
      {skill.name}
    </Text>
  </Flex>
);

const SkillsSection = () => {
  const [filter, setFilter] = useState("all");
  const visible =
    filter === "all" ? ALL : GROUPS.find((g) => g.id === filter)?.items || ALL;

  return (
    <Box w="100%">
      <Box>
        <Reveal from="fade">
          <Flex gap={2} mb={8} wrap="wrap">
            {[{ id: "all", title: "Everything" }, ...GROUPS].map((g) => {
              const active = filter === g.id;
              return (
                <Box
                  key={g.id}
                  as="button"
                  type="button"
                  onClick={() => setFilter(g.id)}
                  px={4}
                  py={2}
                  border="1px solid"
                  borderColor={active ? "var(--acid)" : "var(--line)"}
                  bg={active ? "var(--acid)" : "transparent"}
                  color={active ? "var(--acid-ink)" : "var(--fg-dim)"}
                  borderRadius="2px"
                  fontFamily="var(--font-mono)"
                  fontSize="11px"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  transition="all .3s var(--ease-out)"
                  _hover={
                    active ? {} : { borderColor: "var(--line-strong)", color: "var(--fg)" }
                  }
                >
                  {g.title}
                </Box>
              );
            })}
          </Flex>
        </Reveal>

        <Grid
          templateColumns={{
            base: "repeat(3, 1fr)",
            sm: "repeat(4, 1fr)",
            md: "repeat(6, 1fr)",
            lg: "repeat(8, 1fr)",
          }}
          gap={{ base: 2.5, md: 3 }}
        >
          {visible.map((skill, i) => (
            <Reveal key={skill.name} from="scale" delay={i * 0.035} duration={0.55}>
              <SkillCell skill={skill} index={i} />
            </Reveal>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SkillsSection;
