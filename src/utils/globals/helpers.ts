export const petStatusColor = (adoptionStatus: string) => {
  let style:React.CSSProperties = {};

  if (adoptionStatus === "Adopted" || adoptionStatus === "Adopted") style["color"] = "#DA70D6";
  else if (adoptionStatus === "Fostered") style["color"] = "#0096FF";
  else style["color"] = "#50C878";

  return style;
}