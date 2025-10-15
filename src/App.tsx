import { Button, Card, Group, Stack, Text, Title } from '@mantine/core';

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
}