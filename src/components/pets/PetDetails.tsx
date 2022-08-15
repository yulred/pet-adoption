import "./PetDetails.css";
import { useState, useEffect } from "react";
import { Box, Flex, Container, Tag , Image, Button, IconButton, Icon, useColorMode } from "@chakra-ui/react";
import { GiFlamingo, GiHouse, GiReturnArrow } from "react-icons/gi";
import { BsArrowLeft, BsStarFill } from "react-icons/bs";
import { useLocation, NavLink } from "react-router-dom";
import { Get } from "../../utils/api";
import { petStatusColor } from "../../utils/helpers/helpers";
import { IPet } from "../../utils/interfaces/pets.interface";

export default function PetDetails() {
  const { colorMode } = useColorMode();
  const [pet, setPet] = useState<IPet>({});
  let location = useLocation();

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
        as={NavLink}
        to={"/search"}
        aria-label="Back"
        icon={<Icon as={BsArrowLeft} />}
        variant="unstyled"
        mr="1rem"
        ml="-3rem"
      />
      <Container boxShadow="sm" rounded="md" p={0} mx={0} bg={colorMode === "dark" ? "#242424" : "#f9f9f9"}>
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
          <Flex wrap="wrap" justify="center" gap={2}>
            <Button leftIcon={<Icon as={GiFlamingo}/>} colorScheme="teal" variant="solid" alignItems="center" w="7.5rem">
              Adopt
            </Button>
            <Button leftIcon={<Icon as={GiHouse} />} colorScheme="teal" variant="solid" alignItems="center" w="7.5rem">
              Foster
            </Button>
            <Button leftIcon={<Icon as={GiReturnArrow} />} colorScheme="teal" variant="solid" alignItems="center" w="7.5rem">
              Return
            </Button>
            <Button leftIcon={<Icon as={BsStarFill}/>} colorScheme="teal" variant="solid" alignItems="center" w="7.5rem">
              Favourite
            </Button>
          </Flex>
          <div className="pet-bio">{pet.bio}</div>
          <Tag size="lg" variant="outline" colorScheme="teal" m={1} p={2}>{pet.type}</Tag>
          <Tag size="lg" variant="outline" colorScheme="teal" m={1} p={2}>{pet.breed}</Tag>
          <Tag size="lg" variant="outline" colorScheme="teal" m={1} p={2}>{pet.color}</Tag>
          <Tag size="lg" variant="outline" colorScheme="teal" m={1} p={2}>{pet.height} cm</Tag>
          <Tag size="lg" variant="outline" colorScheme="teal" m={1} p={2}>{pet.weight} kg</Tag>
          <Tag size="lg" variant="outline" colorScheme="teal" m={1} p={2}>
            {pet.hypoallergnic ? "Hypoallergenic" : "Not Hypoallergenic"}
          </Tag>
          <Tag size="lg" variant="outline" colorScheme="teal" m={1} p={2}>
            {pet?.dietery && pet.dietery.length > 0 ? `Dietary Restrictions: ${pet.dietery}` : "No Dietary Restrictions"}
          </Tag>
        </Box>
      </Container>
    </Flex>
  )
}