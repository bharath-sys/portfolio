import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import Header from './Header.jsx';
import { Outlet, useLocation } from 'react-router-dom';
import ContentBox from './ContentBox.jsx';

const Home = (props) => {
    const location = useLocation();
    let HomePage = false;
    if(location?.pathname == "/"){
        HomePage = true;
    }
    return (
        <Box w="100vw" h="100vh" color={"black"}>
            <Container>
                <Header />
                {HomePage && <ContentBox/>}
                <Outlet /> {/* Render child routes */}
            </Container>
        </Box>
    );
}

export default Home;
