// src/components/SeriesPager.tsx
import { Anchor, Badge, Button, Card, Group, Stack, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import type { CaseStudy } from "../content";

export default function SeriesPager(props: {
  current: CaseStudy;
  siblings: CaseStudy[];
  index: number;
  prev?: CaseStudy;
  next?: CaseStudy;
}) {
  const { current, siblings, index, prev, next } = props;

  return (
    <Stack gap="md">
      {/* Prev / Next buttons */}
      <Group justify="space-between">
        {prev ? (
          <Button component={Link} to={`/case-studies/${prev.slug}`} variant="default">
            ← {prev.title}
          </Button>
        ) : <div />}

        {next ? (
          <Button component={Link} to={`/case-studies/${next.slug}`}>
            {next.title} →
          </Button>
        ) : <div />}
      </Group>

      {/* Series outline */}
      <Card withBorder radius="md" p="md">
        <Stack gap="xs">
          <Group justify="space-between" wrap="wrap">
            <Text fw={600}>
              {current.series ? `Series: ${current.series}` : "More case studies"}
            </Text>
            {current.series && typeof current.part === "number" && (
              <Badge variant="light">
                Part {current.part} of {siblings.length}
              </Badge>
            )}
          </Group>

          <Stack gap="xs">
            {siblings.map((s) => {
              const active = s.slug === current.slug;
              return (
                <Group key={s.slug} gap="xs" wrap="nowrap">
                  {s.part != null && <Badge variant={active ? "filled" : "light"}>{s.part}</Badge>}
                  <Anchor
                    component={Link}
                    to={`/case-studies/${s.slug}`}
                    c={active ? undefined : "dimmed"}
                    fw={active ? 600 : 400}
                  >
                    {s.title}
                  </Anchor>
                </Group>
              );
            })}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
