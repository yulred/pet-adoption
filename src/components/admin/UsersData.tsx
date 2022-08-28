import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import UsersTable from "./UsersTable";
import { Get } from "../../utils/api";

export default function UsersData() {
  const [users, setUsers] = useState();
  const [isListLoading, setIsListLoading] = useState(true);

  useEffect(() => {
    getUsers(); // eslint-disable-next-line
  }, [])

  const getUsers = async () => {
    try {
      const data = await Get("/user");
      setUsers(data);
      setIsListLoading(false);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <Container maxW="100ch">
      {!isListLoading ? <UsersTable users={users} /> : null}
    </Container>
  )
}