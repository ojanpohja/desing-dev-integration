import { useParams, Link } from "react-router-dom";
import { getWork } from "../contentWork";
import { Anchor, Badge, Group, Image, Stack, Text, Title, Divider } from "@mantine/core";
import ReactMarkdown from "react-markdown";

export default function WorkPage() {
  const { slug = "" } = useParams();
  const w = getWork(slug);

  if (!w) {
    return (
      <Stack>
        <Title order={3}>Not found</Title>
        <Text>This project does not exist.</Text>
        <Anchor component={Link} to="/work">Back to all work</Anchor>
      </Stack>
    );
  }

  return (
    <Stack gap="md" maw={900}>
      <Title order={2}>{w.title}</Title>
      <Text c="dimmed">{[w.org, w.role, w.date].filter(Boolean).join(" • ")}</Text>
      <Group gap="xs">{w.tags?.map(t => <Badge key={t} variant="light">{t}</Badge>)}</Group>
      {w.cover && <Image src={w.cover} alt="" radius="md" />}
      <Divider />
      <ReactMarkdown
        components={{
          h1: (p) => <Title order={2} {...p} />,
          h2: (p) => <Title order={3} mt="md" {...p} />,
          h3: (p) => <Title order={4} mt="md" {...p} />,
          p:  (p) => <Text my="sm" {...p} />,
          a:  (p) => <Anchor {...p} />,
        }}
      >
        {w.body}
      </ReactMarkdown>
    </Stack>
  );
}
