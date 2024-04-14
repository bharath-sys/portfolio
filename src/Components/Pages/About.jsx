import React, { useState } from 'react'
import { Flex, Box, Heading, Text, Image } from "@chakra-ui/react";
import ProjectModal from '../Modals/ProjectModal';

const projects = [
    {
        title: "Talk-A-Tive (chat app)",
        image: "https://firebasestorage.googleapis.com/v0/b/portfolio-668b7.appspot.com/o/meetme.png?alt=media&token=d8d96a11-f57c-47b6-965a-e6d854697cbb",
        description: "Realtime chat using socket.io , jwt tokens authentication,",
        demoLink : "https://chat-app-9xcv.onrender.com/login",
        codeRepoLink : "https://github.com/bharath-sys/chat-app?tab=readme-ov-file"
    },
    {
        title: "Food Deilvery App (backend)",
        image: "https://firebasestorage.googleapis.com/v0/b/portfolio-668b7.appspot.com/o/meetme.png?alt=media&token=d8d96a11-f57c-47b6-965a-e6d854697cbb",
        description: "documented API using postgresSql and node.js integrated with swagger ui",
        demoLink : "https://food-app-backend-df1q.onrender.com",
        codeRepoLink : "https://github.com/bharath-sys/food-app-backend"
    },
    // {
    //     title: "Project 3",
    //     description: "Description of project 1...",
    // },
    // {
    //     title: "Project 4",
    //     description: "Description of project 2...",
    // }
    // Add more projects as needed
];

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
    return (
        // project section 
        <Flex overflowX="scroll" p="4" maxW={"90%"}>
            {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </Flex>
    )
}

export default About