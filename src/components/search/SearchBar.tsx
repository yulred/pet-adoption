import { useEffect, useState } from "react";
import {
  Center, Input, InputGroup, InputLeftAddon, InputRightAddon,
  Button, MenuButton, Menu, MenuList, MenuItem, MenuDivider, IconButton, useMediaQuery
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useSearchParams, URLSearchParamsInit } from "react-router-dom";
import { petTypes } from "../../utils/globals/globals";
import { useSearchContext } from "../../context/SearchContext";

export default function SearchBar({ getSearchResults, isSearching }: { getSearchResults: Function, isSearching: boolean }) {
  const { filters, handleAddQueryFilter } = useSearchContext();
  const [typeFilter, setTypeFilter] = useState("Type");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSmallerThan750] = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    const awaitGetSearchResults = async () => await getSearchResults();
    awaitGetSearchResults(); // eslint-disable-next-line
  }, [searchParams])

  const handleSearch = () => {
    setSearchParams(filters as URLSearchParamsInit);

    if (typeFilter !== "Type" && typeFilter !== "Any") {
      setSearchParams([["type", typeFilter], ...filters] as URLSearchParamsInit)
    }
  }

  return (
    <Center>
      <InputGroup justifyContent="center" w={isSmallerThan750 ? "100%" : "60%"}>
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
              {petTypes.map(item => 
              <MenuItem key={item} onClick={() => setTypeFilter(item)}>{item}</MenuItem>)}
            </MenuList>
          </Menu>}
        />
        <Input
          type="text"
          placeholder="Search..."
          px={6}
          onChange={(e) => handleAddQueryFilter(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" ? handleSearch() : null}
        />
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