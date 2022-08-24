import "./App.css";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import NavBar from "./components/nav/NavBar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Pet from "./pages/Pet";
import ProfileSettings from "./pages/ProfileSettings";
import ProfilePets from "./pages/ProfilePets";
import AuthProvider from "./context/AuthContext";
import { theme } from "./themes/theme";

export const App = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <Box textAlign="center" fontSize="xl">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/pet/:id" element={<Pet />} />
            <Route path="/profile" element={<Outlet />}>
              <Route path="settings" element={<ProfileSettings />} />
              <Route path="mypets" element={<ProfilePets />} />
            </Route>
          </Routes>
        </Router>
      </Box>
    </AuthProvider>
  </ChakraProvider>
)