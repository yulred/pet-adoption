import "./ProfileMenu.css";
import { Menu, MenuButton, MenuList, MenuItem, Button, Box } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function ProfileMenu() {
  const handleLogout = () => {
    console.log("logout");
  }

  return (
    <Menu autoSelect={false}>
      <MenuButton as={Button} variant="link" colorScheme="white" minW="fit-content" rightIcon={<ChevronDownIcon />}>
        Profile
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => console.log("settings")}>Settings</MenuItem>
        <MenuItem onClick={() => console.log("my pets")}>My Pets</MenuItem>
        <MenuItem as={Box} className="logout-button">
          <Button colorScheme="teal" onClick={handleLogout}>Log Out</Button>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}