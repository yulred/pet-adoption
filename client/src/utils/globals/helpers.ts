export const petStatusColor = (adoptionStatus: string) => {
  let style:React.CSSProperties = {};

  if (adoptionStatus === "Adopted") style["color"] = "#DA70D6";
  else if (adoptionStatus === "Fostered") style["color"] = "#0096FF";
  else style["color"] = "#50C878";

  return style;
}

export const userRoleColor = (role: string) => {
  let style:React.CSSProperties = {};

  if (role === "Admin") style["color"] = "#0096FF";
  else style["color"] = "#50C878";

  return style;
}