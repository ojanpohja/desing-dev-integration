import { useParams, Link } from "react-router-dom";
import { getCaseStudy, getSeriesNeighbors } from "../content";
import { Title, Text, Stack, Anchor, Divider } from "@mantine/core";
import ReactMarkdown from "react-markdown";
import SeriesPager from "../components/SeriesPager";

export default function CaseStudyPage() {
  const { slug = "" } = useParams();
  const cs = getCaseStudy(slug);

  if (!cs) {
    return (
      <Stack p="lg">
        <Title order={3}>Not found</Title>
        <Text>This case study does not exist.</Text>
        <Anchor component={Link} to="/case-studies">Back to all case studies</Anchor>
      </Stack>
    );
  }

  const { prev, next, siblings, index } = getSeriesNeighbors(cs.slug);

  return (
    <Stack p="lg" gap="md" maw={900}>
      <Title order={2}>{cs.title}</Title>
      {cs.date && <Text c="dimmed">{cs.date}</Text>}
      <Divider />
      <ReactMarkdown
        components={{
          h1: (props) => <Title order={2} {...props} />,
          h2: (props) => <Title order={3} mt="md" {...props} />,
          h3: (props) => <Title order={4} mt="md" {...props} />,
          p: (props) => <Text my="sm" {...props} />,
          a: (props) => <Anchor {...props} />,
        }}
      >
        {cs.body}
      </ReactMarkdown>

      <Divider my="md" />
      <SeriesPager current={cs} siblings={siblings} index={index} prev={prev} next={next} />
    </Stack>
  );
}
