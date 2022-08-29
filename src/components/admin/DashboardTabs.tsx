import { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Spinner } from "@chakra-ui/react";
import TableDataUsers from "./TableDataUsers";
import TableDataPets from "./TableDataPets";
import { Get } from "../../utils/api";

export default function UsersData() {
  const [users, setUsers] = useState();
  const [pets, setPets] = useState();
  const [areListsLoading, setAreListsLoading] = useState(true);

  useEffect(() => {
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
    <Tabs isFitted colorScheme="teal" w="60vw" m="auto">
      <TabList>
        <Tab>Users</Tab>
        <Tab>Pets</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {!areListsLoading ? <TableDataUsers users={users} /> : <Spinner size="xl" mt={12} />}
        </TabPanel>
        <TabPanel>
          {!areListsLoading ? <TableDataPets pets={pets} /> : <Spinner size="xl" mt={12} />}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}