import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { Get } from "../../utils/api";
import PetListCard from "./PetListCard";

export default function PetsList() {
  const [petsList, setPetsList] = useState([{}]);

  const getPetsList = () => {
    Get("/pet")
      .then((data: object[]) => {
        setPetsList(data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getPetsList();
  }, [])

  return (
    <Flex justify="space-between" wrap="wrap" my={8}>
      {petsList.map((pet, index) => <PetListCard key={index} pet={pet} />)}
    </Flex>
  )
}