import { Box, Container, Heading } from "@chakra-ui/react";
import ProfileSettingsForm from "../components/profile/ProfileSettingsForm";
import ProfilePasswordForm from "../components/profile/ProfilePasswordForm";
import { useAuthContext } from "../context/AuthContext";

export default function ProfileSettings() {
  const { isLoading } = useAuthContext();
 
  return (
    <Box p={12}>
      <Container w="75vw">
        <Heading size="lg" textAlign="left" mb={12}>Profile Settings</Heading>
        <Heading size="md" textAlign="left" mb={8}>Update Profile</Heading>
        {!isLoading ? <ProfileSettingsForm /> : null}
        <Heading size="md" textAlign="left" mt={12} mb={8}>Change Password</Heading>
        {!isLoading ? <ProfilePasswordForm /> : null}
      </Container>
    </Box>
  )
}