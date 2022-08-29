import { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PetGrid from "../pets/PetGrid";
import { IPets } from "../../ts/interfaces/pet.interface";
import { Get } from "../../utils/api";
import { useAuthContext } from "../../context/AuthContext";

export default function ProfilePetsTabs() {
  const { currentUser } = useAuthContext();
  const [pets, setPets] = useState<IPets>();
  const [isListLoading, setIsListLoading] = useState(true);

  useEffect(() => {
    const awaitGetPets = async () => await getPets();
    awaitGetPets(); // eslint-disable-next-line
  }, [])

  const getPets = async () => {
    try {
      setIsListLoading(true);
      const data = await Get(`/pet/user/${currentUser._id}`);
      setPets(data);
      setIsListLoading(false);
    } catch(err) {
      console.log(err);
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
          {!isListLoading ? <PetGrid cardSize="20rem" petsArray={pets!.ownedPets} emptyArrayMsg="You do not currently own or foster any pets." /> : null}
        </TabPanel>
        <TabPanel>
          {!isListLoading ? <PetGrid cardSize="20rem" petsArray={pets!.savedPets} emptyArrayMsg="You have not favourited any pets." /> : null}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}