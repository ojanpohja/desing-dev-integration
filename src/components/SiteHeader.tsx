
import { Anchor, Container, Group, Title } from "@mantine/core";
import { NavLink, useLocation } from "react-router-dom";
import ColorSchemeToggle from "./ColorSchemeToggle";

const links = [
  { to: "/", label: "Home", match: /^\/$/ },
  { to: "/work", label: "Work", match: /^\/work/ },
  { to: "/case-studies", label: "Case studies", match: /^\/case-studies/ },
  // { to: "/about", label: "About", match: /^\/about/ }, // uncomment when you add About
];

export default function SiteHeader() {
  const { pathname } = useLocation();
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 10, backdropFilter: "saturate(180%) blur(8px)" }}>
      <Container py="md">
        <Group justify="space-between" wrap="nowrap">
          <Title order={3} style={{ lineHeight: 1 }}>Design Portfolio: Jouni Ojala</Title>
          <Group gap="md" wrap="wrap">
            {links.map(l => (
              <Anchor
                key={l.to}
                component={NavLink}
                to={l.to}
                fw={l.match.test(pathname) ? 700 : 500}
                c={l.match.test(pathname) ? undefined : "dimmed"}
              >
                {l.label}
              </Anchor>
            ))}
            <ColorSchemeToggle />
          </Group>
        </Group>
      </Container>
    </header>
  );
}
