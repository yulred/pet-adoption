import { Heading, Text } from "@chakra-ui/react";
import { useAuthContext } from "../../context/AuthContext";

export default function Header() {
  const { currentUser } = useAuthContext();

  return (
    <>
      <Heading fontWeight="semibold">{currentUser.name ? `${currentUser.name},` : null}</Heading>
      <Heading fontWeight="semibold">Change a Life</Heading>
      <Text fontSize="xl" mt={4}>...adopt a pet.</Text>
    </>
  )
}