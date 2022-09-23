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
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    let openTab = sessionStorage.getItem("pet-adoption-tab");
    setTabIndex(+openTab!);

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
    <Tabs
      isFitted
      colorScheme="teal"
      w="60vw"
      m="auto"
      index={tabIndex}
      onChange={index => sessionStorage.setItem("pet-adoption-tab", `${index}`)}
    >
      <TabList>
        <Tab onClick={() => setTabIndex(0)}>My Pets</Tab>
        <Tab onClick={() => setTabIndex(1)}>Favourites</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {!isListLoading
            ? <PetGrid cardSize={20} petsArray={pets!.ownedPets} emptyArrayMsg="You do not currently own or foster any pets." />
            : null}
        </TabPanel>
        <TabPanel>
          {!isListLoading
            ? <PetGrid cardSize={20} petsArray={pets!.savedPets} emptyArrayMsg="You have not favourited any pets." />
            : null}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}