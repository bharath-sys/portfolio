import React from 'react';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import TypingEffect from './TypeEffect';

const ContentBox = () => {
    const params = useParams();
    console.log(params, "params");
    return (
        <Flex
            align="center"
            justify={{ base: "center", md: "center", xl: "center" }}
            direction={{ base: "column-reverse", md: "row" }}
            wrap="no-wrap"
            minH="70vh"
            p={5} // Add padding to the Flex component if needed
        >
            <Stack
                p={10}
                spacing={10}
                w={{ base: "100%", md: "100%" }}
                align={["center", "center", "center", "center"]}
                maxW={"800px"}
                minH={"350px"}
            >
                <Heading as='h1' fontFamily="monospace" fontSize="4xl">
                    {params?.action?.toLocaleUpperCase() || `Welcome to My </> World`}
                </Heading>
                <Heading
                    as="h2"
                    fontSize="2xl"
                    color="primary.900"
                    opacity="0.8"
                    fontWeight="normal"
                    lineHeight={1.5}
                    textAlign={["center", "center", "left", "left"]}
                >
                    I am a Software Engineer
                </Heading>
                <Text fontSize="2xl" mt={1} color="green" opacity="1">
                    <TypingEffect text={['Node.js','React.Js','Redux','Mongo DB','SQL']}/>
                </Text>
            </Stack>
        </Flex>
    );
}

export default ContentBox;
