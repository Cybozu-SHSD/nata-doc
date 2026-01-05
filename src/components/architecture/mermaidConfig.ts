import type { MermaidConfig } from "mermaid";

export const mermaidThemeConfig: MermaidConfig = {
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    primaryColor: "#3b82f6",
    primaryTextColor: "#1e293b",
    primaryBorderColor: "#60a5fa",
    lineColor: "#64748b",
    secondaryColor: "#f1f5f9",
    tertiaryColor: "#f8fafc",
    background: "#ffffff",
    mainBkg: "#f8fafc",
    nodeBorder: "#cbd5e1",
    clusterBkg: "#f1f5f9",
    clusterBorder: "#e2e8f0",
    titleColor: "#334155",
    edgeLabelBackground: "#ffffff",
  },
  flowchart: {
    curve: "basis",
    padding: 20,
    htmlLabels: true,
    useMaxWidth: true,
  },
};
