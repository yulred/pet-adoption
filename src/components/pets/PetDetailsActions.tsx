import { useState, useEffect } from "react";
import { Flex, Button, Icon } from "@chakra-ui/react";
import { GiFlamingo, GiHouse, GiReturnArrow } from "react-icons/gi";
import { BsStarFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { Post } from "../../utils/api";
import { useSessionContext } from "../../context/SessionContext";
import { IPetStatus } from "../../utils/interfaces/pets.interface";

export default function PetDetailsActions({ petID, changePetStatus }: IPetStatus) {
  const { currentUser } = useSessionContext();
  const [isAdopted, setIsAdopted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  let location = useLocation();

  useEffect(() => {
    if (currentUser && currentUser.pets?.adopted?.includes(petID as string) || currentUser.pets?.fostered?.includes(petID as string)) {
      setIsAdopted(true);
    } else {
      setIsAdopted(false);
    }

    if (currentUser && currentUser.pets?.saved?.includes(petID as string)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [currentUser])

  const handleAdopt = async () => {
    try {
      setIsAdopted(true)
      changePetStatus("Adopted");
      const res = await Post(`${location.pathname}/adopt`, { userID: currentUser._id, action: "adopt" });
    } catch(err) {
      console.log(err);
    }
  }

  const handleFoster = async () => {
    try {
      setIsAdopted(true)
      changePetStatus("Fostered");
      const res = await Post(`${location.pathname}/adopt`, { userID: currentUser._id, action: "foster" });
    } catch(err) {
      console.log(err);
    }
  }

  const handleReturn = async () => {
    try {
      setIsAdopted(false)
      changePetStatus("Available");
      const res = await Post(`${location.pathname}/return`, { userID: currentUser._id });
    } catch(err) {
      console.log(err);
    }
  }

  const handleSave = async () => {
    try {
      setIsSaved(!isSaved);
      const res = await Post(`${location.pathname}/save`, { userID: currentUser._id });
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <Flex wrap="wrap" justify="center" gap={2}>
      {!isAdopted ? 
        <>
          <Button 
            leftIcon={<Icon as={GiFlamingo}/>}
            colorScheme="teal"
            variant="solid"
            alignItems="center"
            minW="7.5rem"
            onClick={() => handleAdopt()}
          >
            Adopt
          </Button>
          <Button
            leftIcon={<Icon as={GiHouse} />}
            colorScheme="teal"
            variant="solid"
            alignItems="center"
            minW="7.5rem"
            onClick={() => handleFoster()}
          >
            Foster
          </Button>
        </>
      : 
        <Button
          leftIcon={<Icon as={GiReturnArrow} />}
          colorScheme="teal"
          variant="solid"
          alignItems="center"
          minW="7.5rem"
          onClick={() => handleReturn()}
        >
          Return
        </Button>
      }
      <Button
        leftIcon={<Icon as={BsStarFill}/>}
        colorScheme="teal"
        variant="solid"
        alignItems="center"
        minW="7.5rem"
        onClick={() => handleSave()}
      >
        {isSaved ? "Unfavourite" : "Favourite"}
      </Button>
    </Flex>
  )
}