import "./App.css";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import NavBar from "./components/nav/NavBar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Pet from "./pages/Pet";
import ProfileSettings from "./pages/ProfileSettings";
import ProfilePets from "./pages/ProfilePets";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUser from "./pages/AdminUser";
import AuthProvider from "./context/AuthContext";
import SearchProvider from "./context/SearchContext";
import { theme } from "./themes/theme";
import PetDetails from "./components/pets/PetDetails";

export const App = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <Box textAlign="center" fontSize="xl">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<SearchProvider />}>
              <Route path="/search" element={<Search />} />
              <Route path="/pet/:id" element={<Pet />} />
            </Route>
            <Route path="/profile" element={<Outlet />}>
              <Route path="settings" element={<ProfileSettings />} />
              <Route path="mypets" element={<ProfilePets />} />
            </Route>
            <Route path="/dashboard" element={<Outlet />}>
              <Route index element={<AdminDashboard />} />
              <Route path="user/:id" element={<AdminUser />} />
              <Route path="pet/:id" element={<PetDetails />} />
            </Route>
          </Routes>
        </Router>
      </Box>
    </AuthProvider>
  </ChakraProvider>
)