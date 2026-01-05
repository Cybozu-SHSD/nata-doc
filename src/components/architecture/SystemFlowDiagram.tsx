import { useEffect, useRef, useId } from "react";
import mermaid from "mermaid";
import { mermaidThemeConfig } from "./mermaidConfig";
import {
  MermaidDiagramContainer,
  DiagramLegendItem,
} from "./MermaidDiagramContainer";

const diagramDefinition = `
graph TB
    subgraph CoreSystem["🏠 Core System"]
        MAIN["🔷 <b>main</b><br/>(Core Business)"]
    end

    subgraph Satellite["🛰️ Satellite Microservices"]
        WORKER["🟢 <b>worker</b><br/>(Async Tasks)"]
        ROUTINE["🟠 <b>routine</b><br/>(Scheduled Jobs)"]
        FTS["🟣 <b>fts</b><br/>(Full-Text Search)"]
    end

    subgraph Deploy["📦 Infrastructure (Deploy)"]
        MINIO["💾 <b>Blob Service</b><br/>(MinIO)"]
        IMGPROXY["🖼️ <b>Imgproxy</b><br/>(Image Processing)"]
    end

    subgraph CloudSvc["☁️ Cloud Services"]
        OSS["📁 <b>OSS</b><br/>(Blob + Images)"]
        SLS["📋 <b>SLS</b><br/>(Logs)"]
    end

    subgraph Infra["🔧 Infrastructure"]
        REDIS["⚡ <b>Redis</b><br/>(Queue)"]
        PG["🐘 <b>PostgreSQL</b>"]
        ES["🔍 <b>Elasticsearch</b>"]
    end

    %% Main app sends messages (Producer)
    MAIN --> |"Emit Event"| REDIS

    %% Services consume messages (Consumer)
    REDIS --> |"Consume"| WORKER
    REDIS --> |"Consume"| ROUTINE
    REDIS --> |"Consume"| FTS

    %% Data Access
    MAIN --> PG
    WORKER --> PG
    FTS --> ES

    %% Image Processing Flow
    IMGPROXY --> |"Fetch Original"| MINIO

    %% Cloud / External
    MAIN -.-> |"Gen URL"| OSS
    MAIN -.-> |"Gen URL"| IMGPROXY
    MAIN -.-> |"Log"| SLS
    WORKER -.-> |"Log"| SLS
`;

export function SystemFlowDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId().replace(/:/g, "-");

  useEffect(() => {
    mermaid.initialize(mermaidThemeConfig);

    const renderDiagram = async () => {
      if (!containerRef.current) return;

      containerRef.current.innerHTML = "";
      try {
        const { svg } = await mermaid.render(
          `mermaid-${uniqueId}`,
          diagramDefinition
        );
        containerRef.current.innerHTML = svg;

        const svgElement = containerRef.current.querySelector("svg");
        if (svgElement) {
          svgElement.style.maxWidth = "100%";
          svgElement.style.height = "auto";
        }
      } catch (error) {
        console.error("Mermaid rendering error:", error);
      }
    };

    renderDiagram();
  }, [uniqueId]);

  return (
    <MermaidDiagramContainer
      title="System Data Flow"
      legend={
        <>
          <DiagramLegendItem type="sync" label="Sync" />
          <DiagramLegendItem type="async" label="Async" />
        </>
      }
    >
      <div ref={containerRef} className="w-full flex justify-center" />
    </MermaidDiagramContainer>
  );
}
