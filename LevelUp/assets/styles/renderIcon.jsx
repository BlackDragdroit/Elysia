import React from "react";
import {
  Calendar,
  CalendarArrowUp,
  CalendarCheck,
  CirclePlus,
  House,
  Moon,
  PersonStanding,
  Plus,
  SquareCheckBig,
  Sun,
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
      return <Plus color={color} size={size} />;
    case "lightmode":
      return <Sun color={color} size={size} />;
    case "darkmode":
      return <Moon color={color} size={size} />;
    case "calendar":
      return <Calendar color={color} size={size} />;
    case "upcoming":
      return <CalendarArrowUp color={color} size={size} />;
    case "completed":
      return <CalendarCheck color={color} size={size} />;
    default:
      return null;
  }
}
