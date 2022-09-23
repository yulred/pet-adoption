import "./PetCard.css";
import { Flex, LinkBox, Text, useColorMode } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import PetImage from "./PetImage";
import { lightModeColor, darkModeColor } from "../../utils/globals/globals";
import { petStatusColor } from "../../utils/globals/helpers";
import { IPet } from "../../ts/interfaces/pet.interface";

export default function PetCard({ pet, cardSize }: { pet: IPet, cardSize: number }) {
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
          <Text>
            {pet.name}
            <span style={petStatusColor(pet.adoptionStatus as string)} className="pet-card-status small-caps"> {pet.adoptionStatus}</span>
          </Text>
          <ArrowForwardIcon mt={2} />
        </Flex>
        {cardSize !== 20 ? null : <Text className="overlay small-caps">About Me</Text>}
      </Flex>
    </LinkBox>
  )
}