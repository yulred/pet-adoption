import { Grid } from "@chakra-ui/react";
import PetCard from "../pets/PetCard";
import { ISearchResults } from "../../utils/interfaces/search.interface";

export default function SearchResults({ searchResults }: ISearchResults) {

  return (
    <Grid templateColumns="repeat(auto-fit, minmax(20rem, 20rem))"  justifyContent="center" my={8} gap={8}>
      {searchResults.map((pet, index) => <PetCard key={index} pet={pet} />)}
    </Grid>
  )
}