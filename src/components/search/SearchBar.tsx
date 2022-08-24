import { useEffect, useState } from "react";
import {
  Center, Input, InputGroup, InputLeftAddon, InputRightAddon,
  Button, MenuButton, Menu, MenuList, MenuItem, MenuDivider, IconButton
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useSearchParams, URLSearchParamsInit } from "react-router-dom";
import { useSearchContext } from "../../context/SearchContext";
import { ISearchBar } from "../../utils/interfaces/search.interface";

export default function SearchBar({ getSearchResults, isSearching }: ISearchBar) {
  const { filters, handleAddQueryFilter } = useSearchContext();
  const [typeFilter, setTypeFilter] = useState("Type");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getSearchResults(); // eslint-disable-next-line
  }, [searchParams])

  const handleSearch = () => {
    setSearchParams(filters as URLSearchParamsInit);

    if (typeFilter !== "Type" && typeFilter !== "Any") {
      setSearchParams([["type", typeFilter], ...filters] as URLSearchParamsInit)
    }
  }

  return (
    <Center>
      <InputGroup justifyContent="center" w="60%">
        <InputLeftAddon p={0} w="7.5rem" children={
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              w="7.5rem"
              borderTopRightRadius={0}
              borderBottomRightRadius={0}
            >
              {typeFilter}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setTypeFilter("Any")}>Any</MenuItem>
              <MenuDivider />
              {["Dog", "Cat", "Horse", "Hamster", "Rock"].map((item, index) => 
              <MenuItem key={index} onClick={() => setTypeFilter(item)}>{item}</MenuItem>)}
            </MenuList>
          </Menu>}
        />
        <Input type="text" placeholder="Search..." px={6} onBlur={(e) => handleAddQueryFilter(e.target.value)} />
        <InputRightAddon p={0} children={
          <IconButton 
            aria-label="Search"
            icon={<SearchIcon />}
            borderTopLeftRadius={0}
            borderBottomLeftRadius={0}
            colorScheme="teal"
            isLoading={isSearching}
            onClick={handleSearch} />}
          />
      </InputGroup>
    </Center>
  )
}