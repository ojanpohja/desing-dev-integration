console.log("markdown matched:", Object.keys(
  (import.meta as any).glob ? {} : {}
));

import { Badge, Card, Grid, Group, Image, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { getAllCaseStudies } from "../content";

export default function CaseStudiesIndex() {
  const items = getAllCaseStudies();

  return (
    <Grid>
      {items.map((cs) => (
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={cs.slug}>
          <Card withBorder radius="md" p="md" component={Link} to={`/case-studies/${cs.slug}`} style={{ textDecoration: "none" }}>
            {cs.thumbImage && <Image src={cs.thumbImage} alt="" radius="sm" mb="sm" />}
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
  );
}
