import { Button } from "@chakra-ui/react";
import { Post } from "../../utils/api";
import { useAuthContext } from "../../context/AuthContext";

export default function ProfileMenuLogout() {
  const { clearCurrentUser } = useAuthContext();

  const handleLogout = async () => {
    try {
      const res = await Post("/logout", {});
      if (res.ok) clearCurrentUser();
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <Button colorScheme="teal" onClick={handleLogout}>Log Out</Button>
  )
}