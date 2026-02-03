import { List, ListItem, Box, Text, Flex, Icon, useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdCheckCircle } from "react-icons/md";

const MotionListItem = motion(ListItem);

const ProfessionalBulletPoints = ({ data }) => {
  const { colorMode } = useColorMode();

  if (!data || !Array.isArray(data)) return null;

  return (
    <List spacing={4}>
      {data.map((point, index) => (
        <MotionListItem
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 * index }}
        >
          <Flex align="start" gap={4}>
            <Box
              mt={0.5}
              flexShrink={0}
              w={6}
              h={6}
              borderRadius="full"
              bg={colorMode === 'dark' ? "rgba(0, 113, 227, 0.15)" : "rgba(0, 113, 227, 0.1)"}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                as={MdCheckCircle}
                color="#0071e3"
                w={4}
                h={4}
              />
            </Box>
            <Text
              fontSize="17px"
              color={colorMode === 'dark' ? "rgba(245, 245, 247, 0.85)" : "rgba(29, 29, 31, 0.85)"}
              lineHeight="1.6"
              fontWeight="400"
            >
              {point}
            </Text>
          </Flex>
        </MotionListItem>
      ))}
    </List>
  );
};

export default ProfessionalBulletPoints;
