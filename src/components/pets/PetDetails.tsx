import { useState, useEffect } from "react";
import { Box, Flex, Container, Tag, Text, useColorMode } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import PetDetailsActions from "./PetDetailsActions";
import BackButton from "../nav/BackButton";
import PetImage from "./PetImage";
import { Get } from "../../utils/api";
import { lightModeColor, darkModeColor } from "../../utils/globals/globals";
import { petStatusColor } from "../../utils/globals/helpers";
import { IPet } from "../../ts/interfaces/pet.interface";
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
    `${pet.dietary && pet.dietary.length ? `Dietary Restrictions: ${pet.dietary.join(", ")}` : "No Dietary Restrictions"}`
  ];
  let location = useLocation();

  useEffect(() => {
    const awaitGetPet = async () => await getPet();
    awaitGetPet(); // eslint-disable-next-line
  }, [])

  const getPet = async () => {
    try {
      const data = await Get(location.pathname);
      setPet(data);
    } catch(err) {
      console.log(err);
    }
  }

  const updatePetStatus = (newStatus: string) => {
    setPet({ ...pet, adoptionStatus: newStatus })
  }

  return (
    <Flex justify="center" className="pet-details">
      <BackButton />
      <Container
        boxShadow="sm"
        rounded="md"
        mx={0}
        p={0}
        bg={colorMode === "light" ? lightModeColor : darkModeColor}
      >
        <PetImage imageSrc={pet.picture} imageAlt={pet.name} imageSize={22} imageRadius={175} />
        <Box px={12} py={6}>
          <Text fontSize="4xl" lineHeight="2rem" className="small-caps">{pet.name}</Text>
          <Text fontSize="xl" mb={4} className="small-caps" style={petStatusColor(pet.adoptionStatus as string)}>{pet.adoptionStatus}</Text>
          {!isLoading ? <PetDetailsActions pet={pet} updatePetStatus={updatePetStatus} /> : null}
          <Text fontSize="md" my={8}>{pet.bio}</Text>
          {petData.map((attr, index) => <Tag key={index} size="lg" variant="outline" colorScheme="teal" m={1} p={2}>{attr}</Tag>)}
        </Box>
      </Container>
    </Flex>
  )
}