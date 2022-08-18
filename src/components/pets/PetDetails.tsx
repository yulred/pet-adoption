import "./PetDetails.css";
import { useState, useEffect } from "react";
import { Box, Flex, Container, Tag , Image, IconButton, Icon, useColorMode } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import PetDetailsActions from "./PetDetailsActions";
import { Get } from "../../utils/api";
import { petStatusColor } from "../../utils/helpers/helpers";
import { IPet } from "../../utils/interfaces/pets.interface";

export default function PetDetails() {
  const { colorMode } = useColorMode();
  const [pet, setPet] = useState<IPet>({});
  const navigate = useNavigate();
  let location = useLocation();
  const petData = [
    pet.type,
    pet.breed,
    pet.color,
    pet.height + " cm",
    pet.weight + " kg",
    `${pet.hypoallergnic ? "Hypoallergenic" : "Not Hypoallergenic"}`,
    `${pet?.dietery && pet.dietery.length > 0 ? "Dietary Restrictions: " + pet.dietery : "No Dietary Restrictions"}` //TODO: with dietary array
  ]

  useEffect(() => {
    getPet(); // eslint-disable-next-line
  }, [])

  const getPet = () => {
    Get(location.pathname)
      .then((data: object) => {
        setPet(data)
      })
      .catch(err => console.log(err))
  }

  return (
    <Flex justify="center" className="pet-details">
      <IconButton
        aria-label="Back"
        icon={<Icon as={BsArrowLeft} />}
        variant="unstyled"
        mr="1rem"
        ml="-3rem"
        onClick={() => navigate(-1)}
      />
      <Container
        boxShadow="sm"
        rounded="md"
        mx={0}
        p={0}
        bg={colorMode === "light" ? "#f9f9f9" : "#242424"}
      >
        <Image 
          src={pet.picture}
          alt={pet.name}
          objectFit="cover"
          objectPosition="top"
          w="100%"
          h="22rem"
          rounded="md"
          borderBottomLeftRadius={0}
          borderBottomRightRadius={175}
        />
        <Box px={12} py={6}>
          <div className="pet-name">{pet.name}</div>
          <div className="pet-status" style={petStatusColor(pet)}>{pet.adoptionStatus}</div>
          <PetDetailsActions />
          <div className="pet-bio">{pet.bio}</div>
          {petData.map((attr, index) => <Tag key={index} size="lg" variant="outline" colorScheme="teal" m={1} p={2}>{attr}</Tag>)}
        </Box>
      </Container>
    </Flex>
  )
}