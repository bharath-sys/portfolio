import { Box, Skeleton, SkeletonText, useColorMode } from "@chakra-ui/react";
import React from "react";

const SkeletonWrapper = ({ isText, isLoading, children }) => {
  const { colorMode } = useColorMode();

  const startColor = colorMode === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)";
  const endColor = colorMode === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

  const component = isText ? (
    <Box>
      <SkeletonText
        startColor={startColor}
        endColor={endColor}
        isLoaded={!isLoading}
        noOfLines={1}
        skeletonHeight="5"
      >
        {children}
      </SkeletonText>
    </Box>
  ) : (
    <Skeleton
      startColor={startColor}
      endColor={endColor}
      isLoaded={!isLoading}
      skeletonHeight="5"
    >
      {children}
    </Skeleton>
  );
  return component;
};

export default SkeletonWrapper;
