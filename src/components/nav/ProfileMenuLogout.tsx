import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "../../context/SessionContext";
import { Post } from "../../utils/api";

export default function ProfileMenuLogout() {
  const { cookie } = useSessionContext();
  let navigate = useNavigate();

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