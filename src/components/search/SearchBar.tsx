import { useState } from "react";
import {
  Input, InputGroup, InputLeftAddon, InputRightAddon,
  Button, MenuButton, Menu, MenuList, MenuItem, MenuDivider, IconButton
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";

export default function SearchBar() {
  const [typeFilter, setTypeFilter] = useState("Type");

  const handleSearch = () => {
    //
  }

  return (
    <InputGroup justifyContent="center">
      <InputLeftAddon p={0} width="7.5rem" children={
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            width="7.5rem"
            borderTopRightRadius={0}
            borderBottomRightRadius={0}
          >
            {typeFilter}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setTypeFilter("Any")}>Any</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => setTypeFilter("Dog")}>Dog</MenuItem>
            <MenuItem onClick={() => setTypeFilter("Cat")}>Cat</MenuItem>
            <MenuItem onClick={() => setTypeFilter("Horse")}>Horse</MenuItem>
            <MenuItem onClick={() => setTypeFilter("Hamster")}>Hamster</MenuItem>
            <MenuItem onClick={() => setTypeFilter("Rock")}>Rock</MenuItem>
          </MenuList>
        </Menu>}
      />
      <Input type="text" placeholder="Search..." px={6} />
      <InputRightAddon p={0} children={
        <IconButton 
          aria-label="Search"
          icon={<SearchIcon />}
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
          colorScheme="teal"
          onClick={handleSearch} />}
        />
    </InputGroup>
  )
}