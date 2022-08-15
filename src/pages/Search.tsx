import { Box, Center, Flex } from "@chakra-ui/react";
import { useSearchContext } from "../context/SearchContext";
import SearchBar from "../components/search/SearchBar";
import SearchToggle from "../components/search/SearchToggle";
import SearchFilterMenus from "../components/search/SearchFilterMenus";
import SearchFilterTagList from "../components/search/SearchFilterTagList";
import PetsList from "../components/pets/PetsList";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

//let query = useQuery().get("name");

export default function Search() {
  const { advancedSearch } = useSearchContext();
  
  return (
    <Box p={12}>
      <Center>
        <Flex direction="column" w="55%">
          <SearchBar />
          <SearchToggle />
          {advancedSearch ? <SearchFilterMenus /> : null}
          <SearchFilterTagList />
          <PetsList />
        </Flex>
      </Center>
    </Box>
  )
 }