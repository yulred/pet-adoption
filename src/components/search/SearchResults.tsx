import { Flex } from "@chakra-ui/react";
import SearchResultsCard from "./SearchResultsCard";
import { ISearchResults } from "../../utils/interfaces/search.interface";

export default function SearchResults({ searchResults }: ISearchResults) {

  return (
    <Flex justify="center" wrap="wrap" my={8} gap={8}>
      {searchResults.map((pet, index) => <SearchResultsCard key={index} pet={pet} />)}
    </Flex>
  )
}