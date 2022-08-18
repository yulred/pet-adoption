import "./SearchResultsCard.css";
import { Flex, Image, LinkBox } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { petStatusColor } from "../../utils/helpers/helpers";
import { ISearchResultsCard } from "../../utils/interfaces/search.interface";

export default function SearchResultsCard({ pet }: ISearchResultsCard) {

  return (
    <LinkBox as={NavLink} to={`/pet/${pet._id}`} minW="18rem" rounded="md" my={2}>
      <Flex direction="column">
        <Image
          src={pet.picture}
          alt={pet.name}
          objectFit="cover"
          objectPosition="top"
          h="20rem"
          rounded="md"
        />
        <Flex direction="row" justify="space-between" align="center" p={2}>
          <div className="pet-text">
            {pet.name}
            <span style={petStatusColor(pet)} className="pet-card-status"> {pet.adoptionStatus}</span>
          </div>
          <ArrowForwardIcon mt={2} />
        </Flex>
        <div className="overlay">About Me</div>
      </Flex>
    </LinkBox>
  )
}