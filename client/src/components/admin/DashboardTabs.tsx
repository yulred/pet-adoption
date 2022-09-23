import { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Spinner, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import TableDataUsers from "./TableDataUsers";
import TableDataPets from "./TableDataPets";
import { Get } from "../../utils/api";

export default function UsersData() {
  const [users, setUsers] = useState();
  const [pets, setPets] = useState();
  const [areListsLoading, setAreListsLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    let openTab = sessionStorage.getItem("pet-adoption-dashboard-tab");
    setTabIndex(+openTab!);

    const awaitGetUsers = async () => {
      await getUsers();
      await getPets();
      setAreListsLoading(false);
    }
    awaitGetUsers(); // eslint-disable-next-line
  }, [])

  const getUsers = async () => {
    try {
      const data = await Get("/user");
      setUsers(data);
    } catch(err) {
      console.log(err);
    }
  }

  const getPets = async () => {
    try {
      const data = await Get("/pet");
      setPets(data);
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
      onChange={index => sessionStorage.setItem("pet-adoption-dashboard-tab", `${index}`)}
    >
      <TabList>
        <Tab onClick={() => setTabIndex(0)}>Users</Tab>
        <Tab onClick={() => setTabIndex(1)}>Pets</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {!areListsLoading ? <TableDataUsers users={users!} /> : <Spinner size="xl" mt={12} />}
        </TabPanel>
        <TabPanel display="flex" flexFlow="column nowrap" alignItems="center">
          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            variant="solid"
            className="small-caps"
            alignItems="center"
            alignSelf="end"
            onClick={() => navigate("pet/new")}
          >
            Add New Pet
          </Button>
          {!areListsLoading ? <TableDataPets pets={pets} /> : <Spinner size="xl" mt={12} />}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}