import { useEffect, useState } from "react";
import { Grid, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PetCard from "../pets/PetCard";
import { IPets } from "../../utils/interfaces/pets.interface";
import { Get } from "../../utils/api";
import { useAuthContext } from "../../context/AuthContext";

export default function ProfilePets() {
  const { currentUser } = useAuthContext();
  const [pets, setPets] = useState<IPets>();
  const [isListLoading, setIsListLoading] = useState(true);

  useEffect(() => {
    getPets(); // eslint-disable-next-line
  }, [])

  const getPets = async () => {
    try {
      const data = await Get(`/pet/user/${currentUser._id}`);
      setPets(data);
      setIsListLoading(false);
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <Tabs isFitted colorScheme="teal" w="60vw" m="auto">
      <TabList>
        <Tab>My Pets</Tab>
        <Tab>Favourites</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Grid templateColumns="repeat(auto-fit, minmax(20rem, 20rem))"  justifyContent="center" my={8} gap={8}>
            {pets?.ownedPets.map((pet, index) => <PetCard key={index} pet={pet} />)}
            {!isListLoading && pets!.ownedPets.length === 0 ? "You do not currently own or foster any pets." : null}
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid templateColumns="repeat(auto-fit, minmax(20rem, 20rem))"  justifyContent="center" my={8} gap={8}>
            {pets?.savedPets.map((pet, index) => <PetCard key={index} pet={pet} />)}
            {!isListLoading && pets!.savedPets.length === 0 ? "You have not favourited any pets." : null}
          </Grid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}