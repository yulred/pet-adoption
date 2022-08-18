import "./App.css";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/nav/NavBar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Pet from "./pages/Pet";
import { theme } from "./themes/theme";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/pet/:id" element={<Pet />} />
        </Routes>
      </Router>
    </Box>
  </ChakraProvider>
)