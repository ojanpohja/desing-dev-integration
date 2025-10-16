import { Container, Divider, Stack } from "@mantine/core";
import { Outlet } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function SiteLayout() {
  return (
    <Stack gap={0} style={{ minHeight: "100dvh" }}>
      <SiteHeader />
      <Container py="lg" style={{ flex: 1, width: "100%" }}>
        <Outlet />
      </Container>
      <Divider />
      <SiteFooter />
    </Stack>
  );
}
