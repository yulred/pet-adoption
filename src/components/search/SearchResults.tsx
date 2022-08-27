import { Grid } from "@chakra-ui/react";
import PetCard from "../pets/PetCard";
import { ISearchResults } from "../../utils/interfaces/search.interface";

export default function SearchResults({ searchResults }: ISearchResults) {
  const cardSize = "20rem";

  return (
    <Grid templateColumns={`repeat(auto-fit, minmax(${cardSize}, ${cardSize}))`}  justifyContent="center" my={8} gap={8}>
      {searchResults.map((pet, index) => <PetCard key={index} pet={pet} cardSize={cardSize} />)}
    </Grid>
  )
}