import { Box, Container, Heading } from "@chakra-ui/react";
import DashboardTabs from "../components/admin/DashboardTabs";
import { useAuthContext } from "../context/AuthContext";

export default function AdminDashboard() {
  const { isLoading } = useAuthContext();
 
  return (
    <Box p={12}>
      <Container w="75vw">
        <Heading size="lg" textAlign="left" mb={12}>Dashboard</Heading>
      </Container>
      {!isLoading ? <DashboardTabs /> : null}
    </Box>
  )
}