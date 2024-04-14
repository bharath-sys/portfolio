import React from "react";
import { Box, Container } from "@chakra-ui/react";
import Header from "./Header.jsx";
import { Outlet, useLocation } from "react-router-dom";
import ContentBox from "./ContentBox.jsx";

const Home = (props) => {
  const location = useLocation();
  let HomePage = false;
  if (location?.pathname == "/") {
    HomePage = true;
  }
  return (
    <Box size="xl" color={"black"}>
        <Header/>
        {HomePage && <ContentBox isHome={true} />}
        <Outlet /> {/* Render child routes */}
    </Box>
  );
};

export default Home;
