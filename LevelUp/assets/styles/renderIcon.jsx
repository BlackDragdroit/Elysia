import * as LucideIcons from "lucide-react-native";

const renderIcon = (name, color, size = 24) => {
  let str = name
    .split("-")
    .map((word, index) => {
      return index === 0
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(""); // Join the words back together
  const IconComponent = LucideIcons[str];

  if (!IconComponent) {
    return null; // or a fallback icon
  }

  return <IconComponent color={color} size={size} />;
};

export default renderIcon;
