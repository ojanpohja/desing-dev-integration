import { Stack, Text, Title } from "@mantine/core";
export default function About() {
  return (
    <Stack gap="md" maw={900}>
      <Title order={2}>About</Title>
      <Text c="dimmed">
        Short bio, focus areas (design leadership, systems, strategy), and contact info.
      </Text>
    </Stack>
  );
}
