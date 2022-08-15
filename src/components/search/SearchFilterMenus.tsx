import { Flex, Button, MenuButton, Menu, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useSearchContext } from "../../context/SearchContext";

export default function SearchFiltersMenus() {
  const { handleAddFilter } = useSearchContext();

  return (
    <Flex wrap="wrap" mt={5} gap={2}>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} minW="fit-content" w="24%">
          Adoption Status
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleAddFilter("Available")}>Available</MenuItem>
          <MenuItem onClick={() => handleAddFilter("Fostered")}>Fostered</MenuItem>
          <MenuItem onClick={() => handleAddFilter("Adopted")}>Adopted</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} minW="fit-content" w="24%">
          Height
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleAddFilter("Small")}>Small</MenuItem>
          <MenuItem onClick={() => handleAddFilter("Medium")}>Medium</MenuItem>
          <MenuItem onClick={() => handleAddFilter("Large")}>Large</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} minW="fit-content" w="24%">
          Weight
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleAddFilter("< 1 kg")}>&lt; 1 kg</MenuItem>
          <MenuItem onClick={() => handleAddFilter("1–5 kg")}>1&ndash;5 kg</MenuItem>
          <MenuItem onClick={() => handleAddFilter("> 5 kg")}>&gt; 5 kg</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} minW="fit-content" w="24%">
          Name
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleAddFilter("Named")}>Named</MenuItem>
          <MenuItem onClick={() => handleAddFilter("Unnamed")}>Unnamed</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}