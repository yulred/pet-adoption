import "./PetCard.css";
import { Flex, LinkBox, useColorMode } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import PetImage from "./PetImage";
import { lightModeColor, darkModeColor } from "../../utils/globals/globals";
import { petStatusColor } from "../../utils/globals/helpers";
import { IPetCard } from "../../ts/interfaces/pet.interface";

export default function PetCard({ pet, cardSize }: IPetCard) {
  const { colorMode } = useColorMode();

  return (
    <LinkBox 
      as={NavLink}
      to={`/pet/${pet._id}`}
      w={`${cardSize}rem`}
      rounded="md"
      my={2}
      boxShadow="md"
      bg={colorMode === "light" ? lightModeColor : darkModeColor}
    >
      <Flex direction="column">
        <PetImage imageSrc={pet.picture} imageAlt={pet.name} imageSize={cardSize} imageRadius={100} />
        <Flex direction="row" justify="space-between" align="center" p={4}>
          <div className="pet-text">
            {pet.name}
            <span style={petStatusColor(pet.adoptionStatus as string)} className="pet-card-status"> {pet.adoptionStatus}</span>
          </div>
          <ArrowForwardIcon mt={2} />
        </Flex>
        {cardSize !== 20 ? null : <div className="overlay">About Me</div>}
      </Flex>
    </LinkBox>
  )
}