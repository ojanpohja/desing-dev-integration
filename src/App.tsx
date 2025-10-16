// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { mantineTheme } from "./theme/mantine-theme";
import SiteLayout from "./layouts/SiteLayout";
import Home from "./pages/Home";
import WorkIndex from "./pages/WorkIndex";
import WorkPage from "./pages/WorkPage";
import CaseStudiesIndex from "./pages/CaseStudiesIndex";
import CaseStudyPage from "./pages/CaseStudyPage";

export default function App() {
  return (
    <BrowserRouter>
      <MantineProvider theme={mantineTheme} defaultColorScheme="auto">
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<WorkIndex />} />
            <Route path="/work/:slug" element={<WorkPage />} />
            <Route path="/case-studies" element={<CaseStudiesIndex />} />
            <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
          </Route>
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  );
}
