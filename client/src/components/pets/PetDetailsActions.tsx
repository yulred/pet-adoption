import { Flex } from "@chakra-ui/react";
import { GiFlamingo, GiHouse, GiReturnArrow } from "react-icons/gi";
import { BsStarFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import PetDetailsButton from "./PetDetailsButton";
import { Post, Delete } from "../../utils/api";
import { useAuthContext } from "../../context/AuthContext";
import { IPet } from "../../ts/interfaces/pet.interface";

export default function PetDetailsActions({ pet, updatePetStatus }: { pet: IPet, updatePetStatus: Function }) {
  const { currentUser, handleAdoptPet, handleFosterPet, handleReturnPet, handleSavePet, handleClearSavedPet } = useAuthContext();
  let location = useLocation();

  const handleAdopt = async () => {
    try {
      updatePetStatus("Adopted");
      handleAdoptPet(pet?._id as string);
      await Post(`${location.pathname}/adopt`, { userID: currentUser._id, action: "adopt" });
    } catch(err) {
      console.log(err);
    }
  }

  const handleFoster = async () => {
    try {
      updatePetStatus("Fostered");
      handleFosterPet(pet?._id as string);
      await Post(`${location.pathname}/adopt`, { userID: currentUser._id, action: "foster" });
    } catch(err) {
      console.log(err);
    }
  }

  const handleReturn = async () => {
    try {
      updatePetStatus("Available");
      handleReturnPet(pet?._id as string);
      await Post(`${location.pathname}/return`, { userID: currentUser._id });
    } catch(err) {
      console.log(err);
    }
  }

  const handleSave = async () => {
    try {
      if (currentUser.pets?.saved?.includes(pet?._id as string)) {
        handleClearSavedPet(pet?._id as string)
        await Delete(`${location.pathname}/save`, { userID: currentUser._id });
      } else {
        handleSavePet(pet?._id as string);
        await Post(`${location.pathname}/save`, { userID: currentUser._id });
      }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <Flex wrap="wrap" justify="center" gap={2}>
      {pet?.adoptionStatus === "Available" || currentUser.pets?.fostered?.includes(pet?._id as string)
        ? <PetDetailsButton icon={GiFlamingo} action={handleAdopt} label="Adopt" />
        : null}
      {pet?.adoptionStatus === "Available"
        ? <PetDetailsButton icon={GiHouse} action={handleFoster} label="Foster"/>
        : null}
      {currentUser.pets?.adopted?.includes(pet?._id as string) || currentUser.pets?.fostered?.includes(pet?._id as string)
        ? <PetDetailsButton icon={GiReturnArrow} action={handleReturn} label="Return" />
        : null}
      <PetDetailsButton
        icon={BsStarFill}
        action={handleSave}
        label={currentUser.pets?.saved?.includes(pet?._id as string) ? "Unfavourite" : "Favourite"}
      />
    </Flex>
  )
}