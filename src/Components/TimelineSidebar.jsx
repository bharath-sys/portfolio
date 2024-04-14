import { Progress, VStack, Circle } from "@chakra-ui/react";

const TimelineSidebar = () => {
  return (
    <VStack spacing={4}>
      <Circle bg="blue.500" size="12px" borderWidth="2px" borderColor="white" />
      <Progress value={25} colorScheme="blue" size="xs" w="20px" />
      <Circle bg="blue.500" size="12px" borderWidth="2px" borderColor="white" />
      <Progress value={50} colorScheme="blue" size="xs" w="20px" />
      <Circle bg="blue.500" size="12px" borderWidth="2px" borderColor="white" />
      <Progress value={75} colorScheme="blue" size="xs" w="20px" />
      <Circle bg="blue.500" size="12px" borderWidth="2px" borderColor="white" />
    </VStack>
  );
};

export default TimelineSidebar;
