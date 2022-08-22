import { IPet } from "../interfaces/pets.interface";

export const petStatusColor = (pet: IPet) => {
  let style:React.CSSProperties = {};

  if (pet.adoptionStatus === "Adopted") style["color"] = "#DA70D6";
  else if (pet.adoptionStatus === "Fostered") style["color"] = "#0096FF";
  else style["color"] = "#50C878";

  return style;
}