import "./ProfileMenu.css";
import { Menu, MenuButton, MenuList, MenuItem, Button, Box } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import ProfileMenuLogout from "./ProfileMenuLogout";

export default function ProfileMenu() {
  let navigate = useNavigate();

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={Button}
        variant="link"
        colorScheme="white"
        minW="fit-content"
        rightIcon={<ChevronDownIcon
      />}>
        Profile
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => navigate("/profile/settings")}>Settings</MenuItem>
        <MenuItem onClick={() => navigate("/profile/mypets")}>My Pets</MenuItem>
        <MenuItem as={Box} className="logout-button">
          <ProfileMenuLogout />
        </MenuItem>
      </MenuList>
    </Menu>
  )
}