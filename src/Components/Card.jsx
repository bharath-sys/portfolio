import {
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Box,
  useColorMode,
  Badge,
  Flex
} from "@chakra-ui/react";
import React from "react";
import ProfessionalBulletPoints from "./ProfessionalBulletPoints";
import CustomCardHeader from "./CustomCardHeader";
import { useQuery } from "@tanstack/react-query";
import { fetchDataByCondition } from "../FireBase/api";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const DetailCard = ({ page }) => {
  const { colorMode } = useColorMode();
  const { data, isLoading } = useQuery({
    queryKey: ["fetchDetails", page],
    queryFn: () => fetchDataByCondition({ page: page, collection: 'TimelineDetails' }),
  });

  const sortedData = data?.sort((a, b) => a?.order - b?.order);

  return (
    <SimpleGrid columns={{ base: 1 }} spacing={8} w="100%">
      {sortedData?.map((details, index) => (
        <MotionBox
          key={details.id || index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          whileHover={{ y: -6 }}
        >
          <Box
            position="relative"
            overflow="hidden"
            borderRadius="24px"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              bgGradient: "linear(to-r, #0071e3, #a855f7, #ec4899)",
              opacity: 0.8,
            }}
          >
            <Card
              h="100%"
              bg={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)'}
              backdropFilter="blur(30px)"
              border="1px solid"
              borderColor={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
              borderRadius="24px"
              transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
              _hover={{
                borderColor: colorMode === 'dark' ? 'rgba(0, 113, 227, 0.4)' : 'rgba(0, 113, 227, 0.3)',
                bg: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                boxShadow: colorMode === 'dark'
                  ? '0 20px 60px rgba(0, 113, 227, 0.15)'
                  : '0 20px 60px rgba(0, 113, 227, 0.1)',
              }}
            >
              <CardHeader pb={4} pt={6} px={8}>
                <CustomCardHeader data={details?.header} />
              </CardHeader>
              <CardBody pt={0} px={8} pb={8}>
                {details?.details && <ProfessionalBulletPoints data={details?.details} />}
              </CardBody>
            </Card>
          </Box>
        </MotionBox>
      ))}
    </SimpleGrid>
  );
};

export default DetailCard;
