import { useParams, Link } from "react-router-dom";
import { Title, Text, Stack, Anchor, Divider, Image } from "@mantine/core";
import ReactMarkdown from "react-markdown";
import { getCaseStudy, getSeriesNeighbors } from "../content";
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
      {cs.date ? <Text c="dimmed">{cs.date}</Text> : null}

      {/* HERO image (optional) */}
      {cs.coverImage ? (
        <Image
          src={cs.coverImage}
          alt={cs.coverAlt || cs.title}
          radius="md"
          mt="sm"
        />
      ) : null}

      <Divider />

      <ReactMarkdown
        components={{
          // note: react-markdown v8 passes a 'node' prop; ignore it to keep TS happy
          h1: ({ node, ...props }) => <Title order={2} {...props} />,
          h2: ({ node, ...props }) => <Title order={3} mt="md" {...props} />,
          h3: ({ node, ...props }) => <Title order={4} mt="md" {...props} />,
          p:  ({ node, ...props }) => <Text my="sm" {...props} />,
          a:  ({ node, ...props }) => <Anchor {...props} />,
          img: ({ node, ...props }) => (
            <Image
              src={props.src ?? ""}
              alt={props.alt ?? ""}
