console.log("markdown matched:", Object.keys(
  (import.meta as any).glob ? {} : {}
));

import { Card, Stack, Title, Text, Group, Badge, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";
import { getAllCaseStudies } from "../content";

export default function CaseStudiesIndex() {
  const items = getAllCaseStudies();

  return (
    <Stack p="lg" gap="lg">
      <Title order={2}>Case studies</Title>
      {items.map(cs => (
        <Card key={cs.slug} withBorder radius="md" p="lg">
          <Stack gap="xs">
            <Group justify="space-between" wrap="wrap">
              <Anchor component={Link} to={`/case-studies/${cs.slug}`} fz="lg">
                {cs.title}
              </Anchor>
              {cs.date && <Text c="dimmed" fz="sm">{cs.date}</Text>}
            </Group>
            {cs.summary && <Text c="dimmed">{cs.summary}</Text>}
            <Group gap="xs">
              {(cs.tags || []).map(t => <Badge key={t} variant="light">{t}</Badge>)}
              {cs.series && <Badge color="grape" variant="light">{cs.series}{cs.part ? ` • Part ${cs.part}` : ""}</Badge>}
            </Group>
            
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
