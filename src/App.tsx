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
import AdminPet from "./pages/AdminPet";
import AuthProvider from "./context/AuthContext";
import SearchProvider from "./context/SearchContext";
import { theme } from "./themes/theme";
import { UserRoute, AdminRoute } from "./utils/ProtectedRoutes"; 

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
              <Route path="settings" element={<UserRoute><ProfileSettings /></UserRoute>} />
              <Route path="mypets" element={<UserRoute><ProfilePets /></UserRoute>} />
            </Route>
            <Route path="/dashboard" element={<Outlet />}>
              <Route index element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="user/:id" element={<AdminRoute><AdminUser /></AdminRoute>} />
              <Route path="pet/:id" element={<AdminRoute><AdminPet /></AdminRoute>} />
            </Route>
          </Routes>
        </Router>
      </Box>
    </AuthProvider>
  </ChakraProvider>
)