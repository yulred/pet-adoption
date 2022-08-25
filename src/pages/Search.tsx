import { useState, useEffect } from "react";
import { Box, Center, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Get } from "../utils/api";
import SearchBar from "../components/search/SearchBar";
import SearchToggle from "../components/search/SearchToggle";
import SearchFilterOptions from "../components/search/filters/SearchFilterOptions";
import SearchFilterTagList from "../components/search/filters/SearchFilterTagList";
import SearchResults from "../components/search/SearchResults";

export default function Search() {
  const [searchResults, setSearchResults] = useState<object[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  let location = useLocation();

  useEffect(() => {
    if (location.search) getSearchResults(); // eslint-disable-next-line
  }, [])

  const getSearchResults = async () => {
    try {
      setIsSearching(true);
      const data = await Get(`/pet${location.search}`);
      setSearchResults(data);
      setIsSearching(false);
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <Box p={12}>
      <Center>
        <Flex direction="column" w="75vw">
          <SearchBar getSearchResults={getSearchResults} isSearching={isSearching} />
          <SearchToggle />
          <SearchFilterOptions />
          <SearchFilterTagList />
          <SearchResults searchResults={searchResults} />
        </Flex>
      </Center>
    </Box>
  )
 }