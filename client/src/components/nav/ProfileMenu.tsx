import "./ProfileMenu.css";
import { Menu, MenuButton, MenuList, MenuItem, Button, Box } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import ProfileMenuLogout from "./ProfileMenuLogout";
import { useAuthContext } from "../../context/AuthContext";

export default function ProfileMenu() {
  const { currentUser } = useAuthContext();
  let navigate = useNavigate();

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={Button}
        variant="link"
        colorScheme="white"
        minW="fit-content"
        rightIcon={<ChevronDownIcon/>}
      >
        {currentUser.role === "Admin" ? "Admin" : "Profile"}
      </MenuButton>
      <MenuList fontSize="xl">
        {currentUser.role === "Admin" ? <MenuItem onClick={() => navigate("/dashboard")}>Dashboard</MenuItem> : null}
        <MenuItem onClick={() => navigate("/profile/settings")}>Settings</MenuItem>
        <MenuItem onClick={() => navigate("/profile/mypets")}>My Pets</MenuItem>
        <MenuItem as={Box} className="logout-button">
          <ProfileMenuLogout />
        </MenuItem>
      </MenuList>
    </Menu>
  )
}