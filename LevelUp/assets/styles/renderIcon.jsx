import React from "react";
import {
  CirclePlus,
  House,
  PersonStanding,
  SquareCheckBig,
  Swords,
} from "lucide-react-native";

export default function renderIcon(icon, color, size) {
  switch (icon) {
    case "house":
      return <House color={color} size={size} />;
    case "tasks":
      return <SquareCheckBig color={color} size={size} />;
    case "bosses":
      return <Swords color={color} size={size} />;
    case "profile":
      return <PersonStanding color={color} size={size} />;
    case "newQuest":
      return <CirclePlus color={color} size={size} />;
    default:
      return null;
  }
}
