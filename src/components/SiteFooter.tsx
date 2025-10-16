import { Container, Group, Text } from "@mantine/core";

export default function SiteFooter() {
  return (
    <footer>
      <Container py="lg">
        <Group justify="space-between" wrap="wrap">
          <Text c="dimmed" fz="sm">© {new Date().getFullYear()} • Portfolio</Text>
          <Group gap="md">
            {/* Add links if needed */}
          </Group>
        </Group>
      </Container>
    </footer>
  );
}
