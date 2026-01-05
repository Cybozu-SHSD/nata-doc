import { useEffect, useRef, useId } from "react";
import mermaid from "mermaid";
import { mermaidThemeConfig } from "./mermaidConfig";
import {
  MermaidDiagramContainer,
  DiagramLegendItem,
} from "./MermaidDiagramContainer";

const diagramDefinition = `
graph TB
    subgraph CoreSystem["🏠 Core Application"]
        MAIN["🔷 <b>Main</b><br/>Business API & Data<br/><i>Full NestJS Stack</i>"]
    end

    subgraph Satellite["🛰️ Satellite Services"]
        WORKER["🟢 <b>Worker</b><br/>Email / CSV Export<br/><i>Pure Consumer</i>"]
        ROUTINE["🟠 <b>Routine</b><br/>Cleanup / Maintenance<br/><i>Pure Executor</i>"]
        FTS["🟣 <b>FTS</b><br/>File Parse & ES Index<br/><i>Standalone Feature</i>"]
    end

    subgraph Deploy["📦 Base Services (Standalone Only)"]
        MINIO["💾 <b>MinIO</b><br/>S3-Compatible Storage<br/><i>StatefulSet</i>"]
        IMGPROXY["🖼️ <b>Imgproxy</b><br/>Crop / Resize / Watermark<br/><i>Supplements MinIO</i>"]
    end

    subgraph CloudSvc["☁️ Cloud Services (Cloud Deploy)"]
        OSS["📁 <b>OSS</b><br/>Files + Images"]
        SLS["📋 <b>SLS</b><br/>Log Service"]
    end

    subgraph Infra["🔧 Infrastructure"]
        REDIS["⚡ <b>Redis</b><br/>Message Queue"]
        PG["🐘 <b>PostgreSQL</b><br/>Data Persistence"]
        ES["🔍 <b>Elasticsearch</b><br/>Full-Text Search"]
    end

    %% Main publishes events
    MAIN --> |"Publish Event"| REDIS

    %% Satellite services consume messages
    REDIS --> |"Consume"| WORKER
    REDIS --> |"Consume"| ROUTINE
    REDIS --> |"Consume"| FTS

    %% Data access
    MAIN --> PG
    WORKER --> PG
    ROUTINE --> PG
    FTS --> ES
    FTS -.-> OSS

    %% Image processing flow
    IMGPROXY --> |"Read Source"| MINIO

    %% Cloud service dependencies
    MAIN -.-> |"Generate URL"| OSS
    MAIN -.-> |"Generate URL"| IMGPROXY
    MAIN -.-> |"Logs"| SLS
    WORKER -.-> |"Logs"| SLS
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
