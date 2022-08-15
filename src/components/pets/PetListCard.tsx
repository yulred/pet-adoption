import "./PetListCard.css";
import { Flex, Image, LinkBox } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { petStatusColor } from "../../utils/helpers/helpers";
import { IPetNested } from "../../utils/interfaces/pets.interface";

export default function PetListCard({ pet }: IPetNested) {

  return (
    <LinkBox as={NavLink} to={`/pet/${pet.name?.toLowerCase()}`} minW="16rem" rounded="md" my={2} className="pet-card">
      <Flex direction="column">
        <Image src={pet.picture} alt={pet.name} rounded="md" h="300px" objectFit="cover" />
        <Flex direction="row" justify="space-between" align="center" p={2}>
          <div className="pet-text">{pet.name} <span style={petStatusColor(pet)} className="pet-card-status">{pet.adoptionStatus}</span></div>
          <ArrowForwardIcon mt={2} />
        </Flex>
        <div className="overlay">Read More</div>
      </Flex>
    </LinkBox>
  )
}