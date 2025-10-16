import { Stack, Text, Title, List, Anchor } from "@mantine/core";

export default function About() {
  return (
    <Stack gap="md" maw={900}>
      <Title order={2}>About</Title>
      <Text>
        Design Leader bridging strategy, systems, and execution. I lead design strategy and multidisciplinary
        collaboration within CGI’s built environment product portfolio, helping public-sector organizations modernize
        critical information systems. I align design, architecture, and development through shared processes,
        federated design systems, and human-centered methodologies.
      </Text>
      <Text>
        I specialize in strategic design leadership, cross-team facilitation, and system-level thinking —
        transforming complex domains into cohesive digital ecosystems. I build design maturity, mentor designers,
        and create frameworks that scale design impact into decision-making and organizational learning.
      </Text>
      <Text>
        Currently leading the renewal of CGI’s Facta product design, steering the design system, and researching
        informal leadership in design teams as part of my Master’s work at Tampere University.
      </Text>

      <Title order={4} mt="md">Focus & strengths</Title>
      <List>
        <List.Item>Design leadership & design operations</List.Item>
        <List.Item>Portfolio & product strategy in complex domains</List.Item>
        <List.Item>Federated design systems & token-driven UI</List.Item>
        <List.Item>Cross-team facilitation and org learning</List.Item>
      </List>

      <Title order={4} mt="md">Contact</Title>
      <Text>
        <Anchor href="https://www.linkedin.com/in/ojanpohja" target="_blank" rel="noreferrer">LinkedIn</Anchor>
      </Text>
    </Stack>
  );
}
