import { Lightbulb } from "@theme-toggles/react";
import { useTheme } from "next-themes";
import "@theme-toggles/react/css/Lightbulb.css";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return <Lightbulb toggled={theme === "dark"} toggle={toggleTheme} />;
};

export default ThemeSwitcher;
