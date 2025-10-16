import { Anchor, Badge, Button, Card, Grid, Group, Image, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { getFeaturedWork } from "../contentWork";
import { getAllCaseStudies } from "../content";

export default function Home() {
  const featured = getFeaturedWork(3);
  const latestCS = getAllCaseStudies().slice(0, 3);

  return (
    <Stack gap="xl">
      {/* Hero */}
      <Stack gap="sm">
        <Title order={1}>Jouni Ojala</Title>
        <Text c="dimmed" fz="lg">
          Design leader bridging strategy, systems, and execution — Lead Designer (CGI Partner), Tampere, Finland.
        </Text>
        <Text>
          I align design, architecture, and development through shared processes, federated design systems, and
          human-centered methods. Currently leading the renewal of CGI’s Facta product design and steering the
          design system.
        </Text>
        <Group>
          <Button component={Link} to="/work">See work</Button>
          <Button component={Link} to="/case-studies" variant="light">Case studies</Button>
          <Button component="a" href="https://www.linkedin.com/in/ojanpohja" variant="subtle" target="_blank" rel="noreferrer">
            LinkedIn →
          </Button>
        </Group>
      </Stack>

      {/* Featured work */}
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={3}>Featured work</Title>
          <Anchor component={Link} to="/work">All work →</Anchor>
        </Group>
        <Grid>
          {featured.map((w) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={w.slug}>
              <Card withBorder radius="md" p="md" component={Link} to={`/work/${w.slug}`} style={{ textDecoration: "none" }}>
                {w.cover && <Image src={w.cover} alt="" radius="sm" mb="sm" />}
                <Stack gap={4}>
                  <Title order={4}>{w.title}</Title>
                  <Text c="dimmed" fz="sm">{[w.org, w.role].filter(Boolean).join(" • ")}</Text>
                  <Text c="dimmed" fz="sm">{w.summary}</Text>
                  <Group gap="xs" mt="xs">
                    {w.tags?.slice(0, 3).map((t) => (
                      <Badge key={t} variant="light">{t}</Badge>
                    ))}
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Stack>

      {/* Latest case studies */}
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={3}>Latest case studies</Title>
          <Anchor component={Link} to="/case-studies">All case studies →</Anchor>
        </Group>
        <Grid>
          {latestCS.map((cs) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={cs.slug}>
              <Card withBorder radius="md" p="md" component={Link} to={`/case-studies/${cs.slug}`} style={{ textDecoration: "none" }}>
                <Stack gap={4}>
                  <Title order={4}>{cs.title}</Title>
                  <Text c="dimmed" fz="sm">{cs.summary}</Text>
                  <Group gap="xs" mt="xs">
                    {(cs.tags || []).slice(0, 3).map((t) => (
                      <Badge key={t} variant="light">{t}</Badge>
                    ))}
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
