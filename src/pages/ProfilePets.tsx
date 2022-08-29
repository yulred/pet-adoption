import { Box, Container, Heading } from "@chakra-ui/react";
import ProfilePetsTabs from "../components/profile/ProfilePetsTabs";
import { useAuthContext } from "../context/AuthContext";

export default function ProfilePets() {
  const { isLoading } = useAuthContext();
 
  return (
    <Box p={12}>
      <Container w="75vw">
        <Heading size="lg" textAlign="left" mb={12}>My Pets</Heading>
      </Container>
      {!isLoading ? <ProfilePetsTabs /> : null}
    </Box>
  )
}