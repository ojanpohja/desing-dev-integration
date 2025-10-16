import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { Moon, Sun } from "lucide-react";

export default function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const next = colorScheme === "dark" ? "light" : "dark";
  return (
    <ActionIcon onClick={() => setColorScheme(next)} variant="default" aria-label="Toggle color scheme">
      {colorScheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </ActionIcon>
  );
}
