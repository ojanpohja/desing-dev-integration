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

  // Keep markdown mapping very simple to avoid TS/JSX pitfalls in CI
  const mdComponents = {
    h1: (props: any) => <Title order={2} mt="md" {...props} />,
    h2: (props: any) => <Title order={3} mt="md" {...props} />,
    h3: (props: any) => <Title order={4} mt="md" {...props} />,
    p:  (props: any) => <Text my="sm" {...props} />,
    a:  (props: any) => <Anchor {...props} />,
    img: (props: any) => <Image src={props.src ?? ""} alt={props.alt ?? ""} radius="md" my="md" />,
  } as const;

  return (
    <Stack p="lg" gap="md" maw={900}>
      <Title order={2}>{cs.title}</Title>
      {cs.date && <Text c="dimmed">{cs.date}</Text>}

      {cs.coverImage && (
        <Image src={cs.coverImage} alt={cs.coverAlt || cs.title} radius="md" mt="sm" />
      )}

      <Divider />

      <ReactMarkdown components={mdComponents}>
        {cs.body}
      </ReactMarkdown>

      <Divider my="md" />

      <SeriesPager
        current={cs}
        siblings={siblings}
        index={index}
        prev={prev}
        next={next}
      />
    </Stack>
  );
}
