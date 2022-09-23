import { useState, useEffect } from "react";
import { Box, Flex, Container, Tag, Text, IconButton, useColorMode } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
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
  const { isLoading, currentUser } = useAuthContext();
  const [pet, setPet] = useState<IPet>({});
  const [isPetLoading, setIsPetLoading] = useState(true);
  const petData = [
    pet.type,
    pet.breed,
    pet.color,
    pet.height + " cm",
    pet.weight + " kg",
    `${pet.hypoallergenic ? "Hypoallergenic" : "Not Hypoallergenic"}`,
    `${pet.dietary && pet.dietary.length ? `Dietary Restrictions: ${pet.dietary.join(", ")}` : "No Dietary Restrictions"}`
  ];
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const awaitGetPet = async () => await getPet();
    awaitGetPet(); // eslint-disable-next-line
  }, [])

  const getPet = async () => {
    try {
      setIsPetLoading(true);
      const data = await Get(location.pathname);
      setPet(data);
      setIsPetLoading(false);
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
          <Text fontSize="4xl" lineHeight="2rem" className="small-caps">
            {pet.name}
            {currentUser.role === "Admin"
              ? <IconButton
                  colorScheme="teal"
                  aria-label="Edit pet"
                  size="sm"
                  ml={2}
                  icon={<EditIcon />}
                  onClick={() => navigate(`/dashboard/pet/${pet._id}`)}
                />
              : null}
          </Text>
          <Text fontSize="xl" mb={4} className="small-caps" style={petStatusColor(pet.adoptionStatus as string)}>{pet.adoptionStatus}</Text>
          {!isLoading && Object.keys(currentUser).length
            ? <PetDetailsActions pet={pet} updatePetStatus={updatePetStatus} />
            : null}
          <Text fontSize="md" my={8}>{pet.bio}</Text>
          {!isPetLoading
            ? petData.map((attr, index) => <Tag key={index} size="lg" variant="outline" colorScheme="teal" m={1} p={2}>{attr}</Tag>)
            : null}
        </Box>
      </Container>
    </Flex>
  )
}