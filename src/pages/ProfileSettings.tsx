import { Box, Container, Heading, useColorMode } from "@chakra-ui/react";
import ProfileSettingsForm from "../components/profile/ProfileSettingsForm";
import { useAuthContext } from "../context/AuthContext";

export default function Home() {
  const { colorMode } = useColorMode();
  const { isLoading } = useAuthContext();
 
  return (
    <Box p={12}>
      <Container w="75vw">
        <Heading size="lg" textAlign="left" mb={12}>Profile Settings</Heading>
        {!isLoading ? <ProfileSettingsForm /> : null}
      </Container>
    </Box>
  )
}