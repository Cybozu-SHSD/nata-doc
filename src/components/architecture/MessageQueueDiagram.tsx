import { useEffect, useRef, useId } from "react";
import mermaid from "mermaid";
import { mermaidThemeConfig } from "./mermaidConfig";
import { MermaidDiagramContainer } from "./MermaidDiagramContainer";

const diagramDefinition = `
flowchart LR
  subgraph Producers["🔷 Producers"]
    direction TB
    MAIN["main<br/>API/WebSocket"]
    ROUTINE["routine<br/>Scheduled Tasks"]
  end

  subgraph RedisQueue["📮 Redis Queue"]
    direction TB
    subgraph NotifyQ["Notification"]
      Q1["mail.send"]
      Q2["notification.send"]
    end
    subgraph DataQ["Data Processing"]
      Q3["export.csv"]
      Q4["data.sync"]
    end
    subgraph SearchQ["Search Index"]
      Q5["fts.index.create"]
      Q6["fts.index.delete"]
    end
  end

  subgraph Consumers["🟢 Consumers"]
    direction TB
    WORKER["worker<br/>Background Jobs"]
    FTS["fts<br/>Search Service"]
  end

  MAIN --> NotifyQ
  MAIN --> DataQ
  ROUTINE --> DataQ
  ROUTINE --> SearchQ

  NotifyQ --> WORKER
  DataQ --> WORKER
  SearchQ --> FTS
`;

export function MessageQueueDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramId = useId().replace(/:/g, "_");

  useEffect(() => {
    mermaid.initialize(mermaidThemeConfig);

    const renderDiagram = async () => {
      if (!containerRef.current) return;

      containerRef.current.innerHTML = "";
      try {
        const { svg } = await mermaid.render(
          `mermaid_queue_${diagramId}`,
          diagramDefinition
        );
        containerRef.current.innerHTML = svg;

        const svgElement = containerRef.current.querySelector("svg");
        if (svgElement) {
          svgElement.style.maxWidth = "100%";
          svgElement.style.height = "auto";
          svgElement.style.minHeight = "280px";
        }
      } catch (error) {
        console.error("Mermaid rendering error:", error);
      }
    };

    renderDiagram();
  }, [diagramId]);

  return (
    <MermaidDiagramContainer minHeight="300px">
      <div ref={containerRef} className="w-full flex justify-center" />
    </MermaidDiagramContainer>
  );
}
