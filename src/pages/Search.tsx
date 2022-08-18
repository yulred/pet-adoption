import { useState, useEffect } from "react";
import { Box, Center, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Get } from "../utils/api";
import SearchProvider from "../context/SearchContext";
import SearchBar from "../components/search/SearchBar";
import SearchToggle from "../components/search/SearchToggle";
import SearchFilterOptions from "../components/search/SearchFilterOptions";
import SearchFilterTagList from "../components/search/SearchFilterTagList";
import SearchResults from "../components/search/SearchResults";

export default function Search() {
  const [searchResults, setSearchResults] = useState<object[]>([]);
  let location = useLocation();

  useEffect(() => {
    if (location.search) {
      getSearchResults();
    } // eslint-disable-next-line
  }, [])

  const getSearchResults = () => {
    Get("/pet" + location.search)
      .then((data: object[]) => {
        setSearchResults(data)
      })
      .catch(err => console.log(err))
  }

  return (
    <SearchProvider>
      <Box p={12}>
        <Center>
          <Flex direction="column" w="60vw">
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