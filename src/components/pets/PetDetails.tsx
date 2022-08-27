import "./PetDetails.css";
import { useState, useEffect } from "react";
import { Box, Flex, Container, Tag , Image, IconButton, Icon, useColorMode } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import PetDetailsActions from "./PetDetailsActions";
import { Get } from "../../utils/api";
import { petStatusColor } from "../../utils/globals/helpers";
import { IPet } from "../../utils/interfaces/pet.interface";
import { useAuthContext } from "../../context/AuthContext";

export default function PetDetails() {
  const { colorMode } = useColorMode();
  const { isLoading } = useAuthContext();
  const [pet, setPet] = useState<IPet>({});
  const petData = [
    pet.type,
    pet.breed,
    pet.color,
    pet.height + " cm",
    pet.weight + " kg",
    `${pet.hypoallergenic ? "Hypoallergenic" : "Not Hypoallergenic"}`,
    `${pet?.dietary && pet.dietary.length > 0 ? "Dietary Restrictions: " + pet.dietary : "No Dietary Restrictions"}` //TODO: with dietary array
  ];
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    getPet(); // eslint-disable-next-line
  }, [])

  const getPet = async () => {
    try {
      const data = await Get(location.pathname);
      setPet(data);
    } catch(err) {
      console.log(err)
    }
  }

  const updatePetStatus = (newStatus: string) => {
    setPet({ ...pet, adoptionStatus: newStatus })
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
          <div className="pet-status" style={petStatusColor(pet.adoptionStatus as string)}>{pet.adoptionStatus}</div>
          {!isLoading ? <PetDetailsActions pet={pet} updatePetStatus={updatePetStatus} /> : null}
          <div className="pet-bio">{pet.bio}</div>
          {petData.map((attr, index) => <Tag key={index} size="lg" variant="outline" colorScheme="teal" m={1} p={2}>{attr}</Tag>)}
        </Box>
      </Container>
    </Flex>
  )
}