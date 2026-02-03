import React from "react";
import { Box, Container } from "@chakra-ui/react";
import Header from "./Header.jsx";
import { Outlet, useLocation } from "react-router-dom";
import ContentBox from "./ContentBox.jsx";
import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";
import CursorMesh from "./CursorMesh";
import RobotFeedbackWidget from "./RobotFeedbackWidget";

const MotionBox = motion(Box);

const Home = (props) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <Box minH="100vh" position="relative">
      <AnimatedBackground />
      <CursorMesh />
      <Header />
      <Container maxW="980px" pt={8} pb={20} position="relative" zIndex={1}>
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {isHomePage && <ContentBox isHome={true} />}
          <Outlet />
        </MotionBox>
      </Container>
      <RobotFeedbackWidget />
    </Box>
  );
};

export default Home;
