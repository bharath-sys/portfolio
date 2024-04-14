import { List, ListItem, Box, Text, Flex } from "@chakra-ui/react";

// Define common styles
const commonDotStyle = {
  w: "6px",
  h: "6px",
  bg: "red.500",
  borderRadius: "50%",
  display: "inline-block",
  mr: "2",
};

// Common styles for font
const commonFontStyle = {
  // fontFamily: "monospace",
  fontSize: ["xs", "sm", "sm"],
};

const ProfessionalBulletPoints = () => {
  return (
    <List spacing={4}>
      <ListItem>
        <Flex alignItems={"center"} gap={3}>
          <Box {...commonDotStyle} />
          <Text {...commonFontStyle}>
            Worked In Company Central Database Management and Ticketing System.
          </Text>
        </Flex>
      </ListItem>
      <ListItem>
        <Flex alignItems={"center"} gap={3}>
          <Box {...commonDotStyle} />
          <Text {...commonFontStyle}>
            Built Dynamic UI, Robust Backend for Company Products
          </Text>
        </Flex>
      </ListItem>
      <ListItem>
        <Flex alignItems={"center"} gap={3}>
          <Box {...commonDotStyle} />
          <Text {...commonFontStyle}>
            Specialized in MERN stack devlopment
          </Text>
        </Flex>
      </ListItem>
    </List>
  );
};

export default ProfessionalBulletPoints;
