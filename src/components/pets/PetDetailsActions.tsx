import { Flex } from "@chakra-ui/react";
import { GiFlamingo, GiHouse, GiReturnArrow } from "react-icons/gi";
import { BsStarFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import PetDetailsButton from "./PetDetailsButton";
import { Post, Delete } from "../../utils/api";
import { useAuthContext } from "../../context/AuthContext";
import { IPetStatus } from "../../utils/interfaces/pets.interface";

export default function PetDetailsActions({ pet, updatePetStatus }: IPetStatus) {
  const { currentUser, handleAdoptPet, handleFosterPet, handleReturnPet, handleSavePet, handleClearSavedPet } = useAuthContext();
  let location = useLocation();

  const handleAdopt = async () => {
    try {
      const res = await Post(`${location.pathname}/adopt`, { userID: currentUser._id, action: "adopt" });
      updatePetStatus("Adopted");
      handleAdoptPet(pet?._id as string);
    } catch(err) {
      console.log(err);
    }
  }

  const handleFoster = async () => {
    try {
      const res = await Post(`${location.pathname}/adopt`, { userID: currentUser._id, action: "foster" });
      updatePetStatus("Fostered");
      handleFosterPet(pet?._id as string);
    } catch(err) {
      console.log(err);
    }
  }

  const handleReturn = async () => {
    try {
      const res = await Post(`${location.pathname}/return`, { userID: currentUser._id });
      updatePetStatus("Available");
      handleReturnPet(pet?._id as string);
    } catch(err) {
      console.log(err);
    }
  }

  const handleSave = async () => {
    try {
      if (currentUser.pets?.saved?.includes(pet?._id as string)) {
        const res = await Delete(`${location.pathname}/save`, { userID: currentUser._id });
        handleClearSavedPet(pet?._id as string)
      } else {
        const res = await Post(`${location.pathname}/save`, { userID: currentUser._id });
        handleSavePet(pet?._id as string);
      }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <Flex wrap="wrap" justify="center" gap={2}>
      {pet?.adoptionStatus === "Available" || currentUser.pets?.fostered?.includes(pet?._id as string) ?
        <PetDetailsButton icon={GiFlamingo} action={handleAdopt} label="Adopt" />
      : null}
      {pet?.adoptionStatus === "Available" ?
        <PetDetailsButton icon={GiHouse} action={handleFoster} label="Foster"/>
      : null}
      {currentUser.pets?.adopted?.includes(pet?._id as string) || currentUser.pets?.fostered?.includes(pet?._id as string) ?
        <PetDetailsButton icon={GiReturnArrow} action={handleReturn} label="Return" />
      : null}
      <PetDetailsButton
        icon={BsStarFill}
        action={handleSave}
        label={currentUser.pets?.saved?.includes(pet?._id as string) ? "Unfavourite" : "Favourite"}
      />
    </Flex>
  )
}