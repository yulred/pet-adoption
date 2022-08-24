import { Flex } from "@chakra-ui/react";
import PetCard from "../pets/PetCard";
import { ISearchResults } from "../../utils/interfaces/search.interface";

export default function SearchResults({ searchResults }: ISearchResults) {

  return (
    <Flex justify="center" wrap="wrap" my={8} gap={8}>
      {searchResults.map((pet, index) => <PetCard key={index} pet={pet} />)}
    </Flex>
  )
}