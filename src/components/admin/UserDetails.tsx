import "./UserDetails.css";
import { useState, useEffect } from "react";
import { Box, Flex, Container, IconButton, Icon, useColorMode, Grid, 
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Stack, Divider } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { Get } from "../../utils/api";
import { userRoleColor } from "../../utils/globals/helpers";
import { IUser } from "../../utils/interfaces/user.interface";
import { IPets } from "../../utils/interfaces/pet.interface";
import PetCard from "../pets/PetCard";

export default function UserDetails() {
  const { colorMode } = useColorMode();
  const [user, setUser] = useState<IUser>();
  const [pets, setPets] = useState<IPets>();
  const navigate = useNavigate();
  let location = useLocation();
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isListLoading, setIsListLoading] = useState(true);
  const cardSize = "12rem";

  //TODO: clean this up

  useEffect(() => {
    getUser(); // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!isUserLoading) getPets(); // eslint-disable-next-line
  }, [user])

  const getUser = async () => {
    try {
      const url = location.pathname.split("dashboard")[1];
      const data = await Get(`${url}/full`);
      setUser(data);
      setIsUserLoading(false);
    } catch(err) {
      console.log(err)
    }
  }

  const getPets = async () => {
    try {
      const data = await Get(`/pet/user/${user?._id}`);
      setPets(data);
      setIsListLoading(false);
    } catch(err) {
      console.log(err);
    }
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
        <Box px={12} py={6}>
          <div className="user-name">{user?.name}</div>
          <div className="user-role" style={userRoleColor(user?.role as string)}>{user?.role}</div>
          <Stack direction="row" h="100px" p={4}>
            <Divider orientation="vertical" />
            <div className="user-info">
              <div>E-Mail: <a href={`mailto:${user?.email}`}>{user?.email}</a></div>
              <div>Phone Number: {user?.tel ? user?.tel : "–"}</div>
              <div>Joined: {!isUserLoading ? new Date(user!.createdAt).toLocaleString() : null}</div>
            </div>
          </Stack>
          <div className="user-bio">Bio: {user?.bio ? user?.bio : "–"}</div>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">{user?.name}'s Pets</Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Grid templateColumns={`repeat(auto-fit, minmax(${cardSize}, ${cardSize}))`} justifyContent="center" my={8} gap={8}>
                  {pets?.ownedPets.map((pet, index) => <PetCard key={index} pet={pet} cardSize={cardSize} />)}
                  {!isListLoading && pets!.ownedPets.length === 0 ? "This user does not currently own or foster any pets." : null}
                </Grid>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Container>
    </Flex>
  )
}