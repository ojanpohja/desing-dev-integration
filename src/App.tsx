import { Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Moon, Sun } from 'lucide-react'; // optional if you have lucide-react

export default function App() {
  return (
    <Stack p="lg" gap="lg">
      <Title order={2}>Mantine + Tokens demo</Title>
      <Text c="dimmed">
        All styling comes from the generated theme based on tokens/tokens.json
      </Text>

      <Group>
        <Button>Primary button</Button>
        <Button variant="light">Light variant</Button>
        <Button variant="outline">Outline</Button>
      </Group>

      <Card shadow="sm" radius="md" p="lg" withBorder>
        <Stack>
          <Title order={4}>Card using theme.radius.md and theme.spacing</Title>
          <Text>Try editing tokens and see it update.</Text>
        </Stack>
      </Card>
    </Stack>
  );


function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const next = colorScheme === 'dark' ? 'light' : 'dark';
  return (
    <ActionIcon onClick={() => setColorScheme(next)} title="Toggle color scheme">
      {colorScheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </ActionIcon>
  );
}
}