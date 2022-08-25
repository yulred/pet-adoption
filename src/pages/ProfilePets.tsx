import { Box, Container, Heading } from "@chakra-ui/react";
import ProfilePetsList from "../components/profile/ProfilePetsList";
import { useAuthContext } from "../context/AuthContext";

export default function Home() {
  const { isLoading } = useAuthContext();
 
  return (
    <Box p={12}>
      <Container w="75vw">
        <Heading size="lg" textAlign="left" mb={12}>My Pets</Heading>
      </Container>
      {!isLoading ? <ProfilePetsList /> : null}
    </Box>
  )
}