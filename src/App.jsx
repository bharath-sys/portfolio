import * as React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "./index.css"; 
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from '@chakra-ui/react'
import Home from "./Components/Home";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ContentBox from "./Components/ContentBox";
const { Button } = chakraTheme.components

const theme = extendBaseTheme({
  
})

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraBaseProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} >
              <Route path=":action" element={<ContentBox />} />
            </Route>
          </Routes>
        </Router>
      </ChakraBaseProvider>
    </QueryClientProvider>
  );
}

export default App;
