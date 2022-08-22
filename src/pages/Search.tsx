import { useState, useEffect } from "react";
import { Box, Center, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Get } from "../utils/api";
import SearchProvider from "../context/SearchContext";
import SearchBar from "../components/search/SearchBar";
import SearchToggle from "../components/search/SearchToggle";
import SearchFilterOptions from "../components/search/filters/SearchFilterOptions";
import SearchFilterTagList from "../components/search/filters/SearchFilterTagList";
import SearchResults from "../components/search/SearchResults";

export default function Search() {
  const [searchResults, setSearchResults] = useState<object[]>([]);
  let location = useLocation();

  useEffect(() => {
    if (location.search) getSearchResults(); // eslint-disable-next-line
  }, [])

  const getSearchResults = async () => {
    try {
      const data = await Get("/pet" + location.search);
      setSearchResults(data);
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <SearchProvider>
      <Box p={12}>
        <Center>
          <Flex direction="column" w="75vw">
            <SearchBar getSearchResults={getSearchResults} />
            <SearchToggle />
            <SearchFilterOptions />
            <SearchFilterTagList />
            <SearchResults searchResults={searchResults} />
          </Flex>
        </Center>
      </Box>
    </SearchProvider>
  )
 }