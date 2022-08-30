import { Grid } from "@chakra-ui/react";
import PetCard from "./PetCard";
import { IPetGrid } from "../../ts/interfaces/pet.interface";

export default function PetGrid({ cardSize, petsArray, emptyArrayMsg }: IPetGrid) {

  return (
    <Grid templateColumns={`repeat(auto-fit, minmax(${cardSize}, ${cardSize}))`} justifyContent="center" my={8} gap={8}>
      {petsArray.length ? petsArray.map(pet => <PetCard key={pet._id} pet={pet} cardSize={cardSize} />) : emptyArrayMsg}
    </Grid>
  )
}