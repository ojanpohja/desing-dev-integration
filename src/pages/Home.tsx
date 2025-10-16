import { Anchor, Badge, Card, Grid, Group, Image, Stack, Text, Title, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { getFeaturedWork } from "../contentWork";
import { getAllCaseStudies } from "../content";

export default function Home() {
  const featured = getFeaturedWork(3);
  const latestCS = getAllCaseStudies().slice(0, 3);

  return (
    <Stack gap="xl">
      <Stack gap="sm">
        <Title order={1}>Design & systems portfolio</Title>
        <Text c="dimmed" fz="lg">
          Strategy, design leadership, and token-driven systems. Selected work and case studies.
        </Text>
        <Group>
          <Button component={Link} to="/work">See work</Button>
          <Button component={Link} to="/case-studies" variant="light">Case studies</Button>
        </Group>
      </Stack>

      <Stack gap="md">
        <Group justify="space-between">
          <Title order={3}>Featured work</Title>
          <Anchor component={Link} to="/work">All work →</Anchor>
        </Group>
        <Grid>
          {featured.map(w => (
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={w.slug}>
              <Card withBorder radius="md" p="md" component={Link} to={`/work/${w.slug}`} style={{ textDecoration: "none" }}>
                {w.cover && <Image src={w.cover} alt="" radius="sm" mb="sm" />}
                <Stack gap={4}>
                  <Title order={4}>{w.title}</Title>
                  <Text c="dimmed" fz="sm">{w.summary}</Text>
                  <Group gap="xs" mt="xs">
                    {w.tags?.slice(0,3).map(t => <Badge key={t} variant="light">{t}</Badge>)}
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Stack>

      <Stack gap="md">
        <Group justify="space-between">
          <Title order={3}>Latest case studies</Title>
          <Anchor component={Link} to="/case-studies">All case studies →</Anchor>
        </Group>
        <Grid>
          {latestCS.map(cs => (
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={cs.slug}>
              <Card withBorder radius="md" p="md" component={Link} to={`/case-studies/${cs.slug}`} style={{ textDecoration: "none" }}>
                <Stack gap={4}>
                  <Title order={4}>{cs.title}</Title>
                  <Text c="dimmed" fz="sm">{cs.summary}</Text>
                  <Group gap="xs" mt="xs">
                    {(cs.tags || []).slice(0,3).map(t => <Badge key={t} variant="light">{t}</Badge>)}
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}
