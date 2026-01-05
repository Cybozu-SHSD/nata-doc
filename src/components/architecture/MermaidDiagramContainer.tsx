import { ReactNode } from "react";

interface MermaidDiagramContainerProps {
  children: ReactNode;
  title?: string;
  legend?: ReactNode;
  minHeight?: string;
}

export function MermaidDiagramContainer({
  children,
  title,
  legend,
  minHeight = "400px",
}: MermaidDiagramContainerProps) {
  return (
    <div className="space-y-4">
      {title && (
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
      )}

      <div
        className="bg-card rounded-xl p-6 border border-border overflow-x-auto"
        style={{ minHeight }}
      >
        {children}
      </div>

      {legend && (
        <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
          {legend}
        </div>
      )}
    </div>
  );
}

export function DiagramLegendItem({
  type,
  label,
}: {
  type: "sync" | "async";
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {type === "sync" ? (
        <div className="w-6 h-0.5 bg-foreground" />
      ) : (
        <div className="w-6 h-0.5 border-t-2 border-dashed border-muted-foreground" />
      )}
      <span>{label}</span>
    </div>
  );
}
