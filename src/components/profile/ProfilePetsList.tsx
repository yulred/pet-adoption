import { useEffect, useState } from "react";
import { Flex, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PetCard from "../pets/PetCard";
import { IPets } from "../../utils/interfaces/pets.interface";
import { Get } from "../../utils/api";
import { useAuthContext } from "../../context/AuthContext";

export default function ProfilePets() {
  const { currentUser } = useAuthContext();
  const [pets, setPets] = useState<IPets>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPets();
  }, [])

  const getPets = async () => {
    try {
      const data = await Get(`/pet/user/${currentUser._id}`);
      setPets(data);
      setIsLoading(false);
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
          <Flex justify="center" wrap="wrap" my={8} gap={8}>
            {pets?.ownedPets.map((pet: any, index: any) => <PetCard key={index} pet={pet} />)}
            {!isLoading && pets!.ownedPets.length === 0 ? "You do not currently own or foster any pets." : null}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex justify="center" wrap="wrap" my={8} gap={8}>
            {pets?.savedPets.map((pet: any, index: any) => <PetCard key={index} pet={pet} />)}
            {!isLoading && pets!.savedPets.length === 0 ? "You have not favourited any pets." : null}
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}