import { useState, useEffect } from "react";
import { Box, Center, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/search/SearchBar";
import SearchToggle from "../components/search/SearchToggle";
import SearchFilterOptions from "../components/search/filters/SearchFilterOptions";
import SearchFilterTagList from "../components/search/filters/SearchFilterTagList";
import PetGrid from "../components/pets/PetGrid";
import { Get } from "../utils/api";

export default function Search() {
  const [searchResults, setSearchResults] = useState<object[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  let location = useLocation();

  useEffect(() => {
    const awaitGetSearchResults = async () => {
      if (location.search) await getSearchResults();
    }
    awaitGetSearchResults(); // eslint-disable-next-line
  }, [])

  const getSearchResults = async () => {
    try {
      setIsSearching(true);
      const data = await Get(`/pet${location.search}`);
      setSearchResults(data);
      setIsSearching(false);
    } catch(err) {
      console.log(err);
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
          {!isSearching
            ? <PetGrid cardSize={20} petsArray={searchResults} emptyArrayMsg={location.search ? "No pets match your search criteria." : null} />
            : null}
        </Flex>
      </Center>
    </Box>
  )
 }