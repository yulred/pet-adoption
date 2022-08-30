import { Flex, Button, MenuButton, Menu, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import SearchFilterSlider from "./SearchFilterSlider";
import { petStatus, petNameLetters } from "../../../utils/globals/globals";
import { useSearchContext } from "../../../context/SearchContext";

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
          {petStatus.map(item => 
          <MenuItem key={item} onClick={() => handleAddFilter(item, "adoptionStatus[]")}>{item}</MenuItem>)}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} minW="10rem">Name</MenuButton>
        <MenuList>
          {petNameLetters.map(item => 
          <MenuItem key={item} onClick={() => handleAddFilter(item, "name[]")}>{item.replace("-", "–")}</MenuItem>)}
        </MenuList>
      </Menu>
      <SearchFilterSlider filter="height" />
      <SearchFilterSlider filter="weight" />
    </Flex>
  )
}