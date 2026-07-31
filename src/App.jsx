import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import theme from "./theme";
import Home from "./Components/Home";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

/**
 * Single-page portfolio — no router. Every section lives on one document and
 * the header scrolls between anchors, so there are no route transitions to
 * pay for and the whole page is one continuous read.
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Home />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
