import { useState, useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import PetEditForm from "../components/admin/PetEditForm";
import { Get } from "../utils/api";
import { IPet } from "../ts/interfaces/pet.interface";

export default function Pet() {
  const [currentPet, setCurrentPet] = useState<IPet>({});
  const [isPetLoading, setIsPetLoading] = useState(true);
  let location = useLocation();

  useEffect(() => {
    const awaitGetPet = async () => await getPet();
    awaitGetPet(); // eslint-disable-next-line
  }, [])

  const getPet = async () => {
    try {
      const url = location.pathname.split("dashboard")[1];
      setIsPetLoading(true);
      const data = await Get(url);
      setCurrentPet(data);
      setIsPetLoading(false);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <Box p={12}>
      <Container w="75vw">
        {!isPetLoading ? <PetEditForm currentPet={currentPet} /> : null}
      </Container>
    </Box>
  )
}