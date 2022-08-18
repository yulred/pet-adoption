import { Flex, Button, MenuButton, Menu, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useSearchContext } from "../../context/SearchContext";
import SearchFilterSlider from "./SearchFilterSlider";

export default function SearchFiltersOptions() {
  const { handleAddFilter, advancedSearch } = useSearchContext();

  return (
    <Flex
      justify="center"
      align="center"
      wrap="wrap"
      mt={5}
      gap={6}
      style={advancedSearch ? {display: "inherit"} : {display: "none"}}
    >
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} minW="10rem">Status</MenuButton>
        <MenuList>
          {["Available", "Fostered", "Adopted"].map((item, index) => 
          <MenuItem key={index} onClick={() => handleAddFilter(item, "status[]")}>{item}</MenuItem>)}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} minW="10rem">Name</MenuButton>
        <MenuList>
          {["A-F", "G-K", "L-Q", "R-W", "X-Z"].map((item, index) => 
          <MenuItem key={index} onClick={() => handleAddFilter(item, "name[]")}>{item.replace("-", "–")}</MenuItem>)}
        </MenuList>
      </Menu>
      <SearchFilterSlider filter="height" />
      <SearchFilterSlider filter="weight" />
    </Flex>
  )
}