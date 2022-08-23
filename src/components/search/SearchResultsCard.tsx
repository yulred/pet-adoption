import "./SearchResultsCard.css";
import { Flex, Image, LinkBox, useColorMode } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { petStatusColor } from "../../utils/globals/helpers";
import { ISearchResultsCard } from "../../utils/interfaces/search.interface";

export default function SearchResultsCard({ pet }: ISearchResultsCard) {
  const { colorMode } = useColorMode();

  return (
    <LinkBox 
      as={NavLink}
      to={`/pet/${pet._id}`}
      minW="20rem"
      rounded="md"
      my={2}
      boxShadow="md"
      bg={colorMode === "light" ? "#f9f9f9" : "#242424"}
    >
      <Flex direction="column">
        <Image
          src={pet.picture}
          alt={pet.name}
          objectFit="cover"
          objectPosition="top"
          h="20rem"
          rounded="md"
          borderBottomLeftRadius={0}
          borderBottomRightRadius={100}
        />
        <Flex direction="row" justify="space-between" align="center" p={4}>
          <div className="pet-text">
            {pet.name}
            <span style={petStatusColor(pet.adoptionStatus as string)} className="pet-card-status"> {pet.adoptionStatus}</span>
          </div>
          <ArrowForwardIcon mt={2} />
        </Flex>
        <div className="overlay">About Me</div>
      </Flex>
    </LinkBox>
  )
}