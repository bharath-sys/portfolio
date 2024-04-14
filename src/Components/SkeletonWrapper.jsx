import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";
import React from "react";

const SkeletonWrapper = ({ isText, isLoading, children }) => {
  const initialColor = "#F7F7F7"; // Light gray
  const endColor = "#E0E0E0"; // Slightly darker gray
  const component = isText ? (
    <Box>
      <SkeletonText
        startColor={initialColor}
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
      startColor={initialColor}
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
