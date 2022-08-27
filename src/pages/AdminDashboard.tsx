import { Box, Container, Heading } from "@chakra-ui/react";
import UsersData from "../components/admin/UsersData";
import { useAuthContext } from "../context/AuthContext";

export default function AdminDashboard() {
  const { isLoading } = useAuthContext();
 
  return (
    <Box p={12}>
      <Container w="75vw">
        <Heading size="lg" textAlign="left" mb={12}>Users</Heading>
        {!isLoading ? <UsersData /> : null}
      </Container>
    </Box>
  )
}