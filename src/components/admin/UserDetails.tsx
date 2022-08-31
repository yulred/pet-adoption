import "./UserDetails.css";
import { useState, useEffect } from "react";
import { 
  Box, Flex, Container, Stack, Divider, useColorMode,
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon 
} from "@chakra-ui/react";
import { EmailIcon, PhoneIcon, BellIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import PetGrid from "../pets/PetGrid";
import BackButton from "../nav/BackButton";
import { Get } from "../../utils/api";
import { lightModeColor, darkModeColor } from "../../utils/globals/globals";
import { userRoleColor } from "../../utils/globals/helpers";
import { IUser } from "../../ts/interfaces/user.interface";
import { IPets } from "../../ts/interfaces/pet.interface";

export default function UserDetails() {
  const { colorMode } = useColorMode();
  const [user, setUser] = useState<IUser>();
  const [pets, setPets] = useState<IPets>();
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isListLoading, setIsListLoading] = useState(true);
  let location = useLocation();

  //TODO: clean this up

  useEffect(() => {
    const awaitGetUser = async () => await getUser();
    awaitGetUser(); // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const awaitGetPets = async () => await getPets();
    if (!isUserLoading) awaitGetPets(); // eslint-disable-next-line
  }, [user])

  const getUser = async () => {
    try {
      setIsUserLoading(true);
      const url = location.pathname.split("dashboard")[1];
      const data = await Get(`${url}/full`);
      setUser(data);
      setIsUserLoading(false);
    } catch(err) {
      console.log(err);
    }
  }

  const getPets = async () => {
    try {
      setIsListLoading(true);
      const data = await Get(`/pet/user/${user?._id}`);
      setPets(data);
      setIsListLoading(false);
    } catch(err) {
      console.log(err);
    }
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
        <Box px={12} py={6}>
          <div className="user-name">{user?.name}</div>
          <div className="user-role" style={userRoleColor(user?.role as string)}>{user?.role}</div>
          <Stack direction="row" h="100px" p={4}>
            <Divider orientation="vertical" />
            <div className="user-info">
              <div><EmailIcon mr={2} />E-Mail: <a href={`mailto:${user?.email}`}>{user?.email}</a></div>
              <div><PhoneIcon mr={2} />Phone Number: {user?.tel ? user?.tel : "–"}</div>
              <div><BellIcon mr={2} />Joined: {!isUserLoading ? new Date(user!.createdAt).toLocaleString() : null}</div>
            </div>
          </Stack>
          <div className="user-bio">Bio: {user?.bio ? user?.bio : "–"}</div>
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">{user?.name}'s Pets</Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                {!isListLoading
                  ? <PetGrid cardSize={12} petsArray={pets!.ownedPets} emptyArrayMsg="This user does not currently own or foster any pets." />
                  : null}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Container>
    </Flex>
  )
}