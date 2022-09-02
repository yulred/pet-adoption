import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Post } from "../../utils/api";
import { useAuthContext } from "../../context/AuthContext";

export default function ProfileMenuLogout() {
  const { clearCurrentUser } = useAuthContext();
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await Post("/logout", {});
      if (res.ok) {
        clearCurrentUser();
        navigate("/");
      }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <Button colorScheme="teal" onClick={handleLogout}>Log Out</Button>
  )
}