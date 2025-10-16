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

  const inSeries = Boolean(current.series);
  // For the list: if in a series, show all siblings in series; otherwise show a short list of other articles by date
  const list = inSeries
    ? siblings
    : siblings.filter((s) => s.slug !== current.slug).slice(0, 8);

  // Show numeric part badges only when every item belongs to the same series (true series context)
  const showParts =
    inSeries && siblings.every((s) => s.series === current.series) && siblings.some((s) => typeof s.part === "number");

  return (
    <Stack gap="md">
      {/* Prev / Next */}
      <Group justify="space-between">
        {prev ? (
          <Button component={Link} to={`/case-studies/${prev.slug}`} variant="default">
            ← {prev.title}
          </Button>
        ) : (
          <div />
        )}

        {next ? (
          <Button component={Link} to={`/case-studies/${next.slug}`}>
            {next.title} →
          </Button>
        ) : (
          <div />
        )}
      </Group>

      {/* Outline */}
      <Card withBorder radius="md" p="md">
        <Stack gap="xs">
          <Group justify="space-between" wrap="wrap">
            <Text fw={600}>
              {inSeries ? `Series: ${current.series}` : "More case studies"}
            </Text>
            {inSeries && typeof current.part === "number" && (
              <Badge variant="light">Part {current.part} of {siblings.length}</Badge>
            )}
          </Group>

          <Stack gap="xs">
            {list.map((s) => {
              const active = s.slug === current.slug;
              return (
                <Group key={s.slug} gap="xs" wrap="nowrap">
                  {showParts && s.part != null && (
                    <Badge variant={active ? "filled" : "light"}>{s.part}</Badge>
                  )}
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
