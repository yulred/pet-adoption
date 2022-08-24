import { Button } from "@chakra-ui/react";
import { useAuthContext } from "../../context/AuthContext";
import { Post } from "../../utils/api";

export default function ProfileMenuLogout() {
  const { cookie } = useAuthContext();

  const handleLogout = async () => {
    try {
      const res = await Post("/logout", cookie);
      if (res.ok) (window as Window).location = "/";
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <Button colorScheme="teal" onClick={handleLogout}>Log Out</Button>
  )
}