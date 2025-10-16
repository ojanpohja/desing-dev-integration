import { Badge, Card, Grid, Group, Image, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { getAllWork } from "../contentWork";

export default function WorkIndex() {
  const items = getAllWork();
  return (
    <Stack gap="lg">
      <Title order={2}>Work</Title>
      <Grid>
        {items.map(w => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={w.slug}>
            <Card withBorder radius="md" p="md" component={Link} to={`/work/${w.slug}`} style={{ textDecoration: "none" }}>
              {w.cover && <Image src={w.cover} alt="" radius="sm" mb="sm" />}
              <Stack gap={4}>
                <Title order={4}>{w.title}</Title>
                <Text c="dimmed" fz="sm">{w.org}{w.org && w.role ? " • " : ""}{w.role}</Text>
                <Text c="dimmed" fz="sm">{w.summary}</Text>
                <Group gap="xs" mt="xs">
                  {w.tags?.map(t => <Badge key={t} variant="light">{t}</Badge>)}
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}
