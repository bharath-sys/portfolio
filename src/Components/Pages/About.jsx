import React, { useState } from 'react'
import { Flex, Box, Heading, Text, Image } from "@chakra-ui/react";
import ProjectModal from '../Modals/ProjectModal';
import { useQuery } from "@tanstack/react-query";
import { fetchDataByCondition } from "../../FireBase/api";


const ProjectCard = ({ project }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };
    return (
        <Box
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="4"
            m="2"
            minW="200px"
            minH="150px"
            onClick={handleOpenModal}
        >
            <Flex alignItems="center" mb="2">
                <Image src={project.image} alt="Project Icon" boxSize="32px" mr="2" />
                <Heading fontSize="xl">{project.title}</Heading>
            </Flex>
            <Text fontSize="md" color="gray.600">
                {project.description}
            </Text>
            <ProjectModal isOpen={isOpen} onClose={handleCloseModal} project={project} />
        </Box>
    );
};

const About = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["fetchData",'project'],
        queryFn: () => fetchDataByCondition({ page: 'about',collection:'Projects' }),
      });
    return (
        // project section 
        <Flex overflowX="scroll" p="4" maxW={"90%"}>
            {data?.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </Flex>
    )
}

export default About