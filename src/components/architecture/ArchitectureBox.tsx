import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ArchitectureBoxProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  variant?: "control" | "data" | "broker" | "storage" | "neutral" | "external" | "worker" | "routine" | "fts";
  className?: string;
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
}

const variantStyles: Record<string, string> = {
  control: "border-control-plane bg-control-plane-light/50",
  data: "border-data-plane bg-data-plane-light/50",
  broker: "border-broker bg-broker-light/50",
  storage: "border-storage bg-storage-light/50",
  neutral: "border-border bg-card",
  external: "border-dashed border-muted-foreground/50 bg-muted/30",
  worker: "border-worker bg-worker-light/50",
  routine: "border-routine bg-routine-light/50",
  fts: "border-fts bg-fts-light/50",
};

const variantIconBg: Record<string, string> = {
  control: "bg-control-plane text-primary-foreground",
  data: "bg-data-plane text-accent-foreground",
  broker: "bg-broker text-primary-foreground",
  storage: "bg-storage text-primary-foreground",
  neutral: "bg-muted text-muted-foreground",
  external: "bg-muted text-muted-foreground",
  worker: "bg-worker text-primary-foreground",
  routine: "bg-routine text-primary-foreground",
  fts: "bg-fts text-primary-foreground",
};

const sizeStyles = {
  sm: "p-2 text-xs",
  md: "p-3",
  lg: "p-4",
};

export function ArchitectureBox({
  title,
  subtitle,
  children,
  variant = "neutral",
  className,
  icon,
  size = "md",
}: ArchitectureBoxProps) {
  return (
    <div
      className={cn(
        "rounded-lg border-2 component-hover shadow-sm",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      <div className="flex items-start gap-2">
        {icon && (
          <div className={cn("rounded-md p-1.5 shrink-0", variantIconBg[variant])}>
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className={cn("font-semibold text-foreground", size === "sm" ? "text-xs" : "text-sm")}>{title}</h3>
          {subtitle && (
            <p className="text-[10px] text-muted-foreground mt-0.5">{subtitle}</p>
          )}
          {children && <div className="mt-2">{children}</div>}
        </div>
      </div>
    </div>
  );
}

// Zone component for grouping
interface ZoneProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  variant?: "control" | "data" | "broker" | "storage" | "neutral" | "external";
  className?: string;
}

const zoneStyles: Record<string, string> = {
  control: "border-control-plane/30 bg-control-plane-light/20",
  data: "border-data-plane/30 bg-data-plane-light/20",
  broker: "border-broker/30 bg-broker-light/20",
  storage: "border-storage/30 bg-storage-light/20",
  neutral: "border-border bg-secondary/30",
  external: "border-dashed border-muted-foreground/30 bg-muted/20",
};

export function Zone({ title, subtitle, children, variant = "neutral", className }: ZoneProps) {
  return (
    <div className={cn("rounded-xl border-2 p-4", zoneStyles[variant], className)}>
      <div className="mb-3">
        <h4 className="font-semibold text-sm">{title}</h4>
        {subtitle && <p className="text-[10px] text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

// Connector for showing relationships
interface ConnectorProps {
  direction: "down" | "right" | "left" | "up" | "bidirectional-h" | "bidirectional-v";
  label?: string;
  className?: string;
  variant?: "control" | "data" | "broker" | "neutral";
}

const connectorColors: Record<string, string> = {
  control: "bg-control-plane/60",
  data: "bg-data-plane/60",
  broker: "bg-broker/60",
  neutral: "bg-muted-foreground/40",
};

const arrowColors: Record<string, string> = {
  control: "border-control-plane/80",
  data: "border-data-plane/80",
  broker: "border-broker/80",
  neutral: "border-muted-foreground/60",
};

export function Connector({ direction, label, className, variant = "neutral" }: ConnectorProps) {
  const lineColor = connectorColors[variant];
  const arrowColor = arrowColors[variant];

  if (direction === "down") {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        <div className={cn("w-0.5 h-4", lineColor)} />
        {label && (
          <span className="text-[9px] text-muted-foreground font-mono px-1.5 py-0.5 bg-background border rounded whitespace-nowrap">
            {label}
          </span>
        )}
        <div className={cn("w-0.5 h-4", lineColor)} />
        <div className={cn("w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent", arrowColor)} />
      </div>
    );
  }

  if (direction === "right") {
    return (
      <div className={cn("flex items-center", className)}>
        <div className={cn("h-0.5 w-4", lineColor)} />
        {label && (
          <span className="text-[9px] text-muted-foreground font-mono px-1.5 py-0.5 bg-background border rounded whitespace-nowrap">
            {label}
          </span>
        )}
        <div className={cn("h-0.5 w-4", lineColor)} />
        <div className={cn("w-0 h-0 border-t-[5px] border-b-[5px] border-l-[6px] border-t-transparent border-b-transparent", arrowColor)} />
      </div>
    );
  }

  if (direction === "bidirectional-v") {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        <div className={cn("w-0 h-0 border-l-[5px] border-r-[5px] border-b-[6px] border-l-transparent border-r-transparent", arrowColor)} />
        <div className={cn("w-0.5 h-6", lineColor)} />
        {label && (
          <span className="text-[9px] text-muted-foreground font-mono px-1.5 py-0.5 bg-background border rounded whitespace-nowrap">
            {label}
          </span>
        )}
        <div className={cn("w-0.5 h-6", lineColor)} />
        <div className={cn("w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent", arrowColor)} />
      </div>
    );
  }

  return null;
}

// Layer Container for sections
interface LayerContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  color?: "blue" | "green" | "purple" | "orange" | "gray" | "pink" | "yellow" | "cyan";
  className?: string;
}

const layerColors: Record<string, { bg: string; border: string; text: string }> = {
  blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
  green: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700" },
  gray: { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-700" },
  pink: { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-700" },
  yellow: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700" },
  cyan: { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-700" },
};

export function LayerContainer({ title, subtitle, children, color = "gray", className }: LayerContainerProps) {
  const colors = layerColors[color];
  
  return (
    <div className={cn("rounded-xl border-2 p-4", colors.bg, colors.border, className)}>
      <div className="mb-3 flex items-center gap-2">
        <h4 className={cn("font-bold text-sm", colors.text)}>{title}</h4>
        {subtitle && (
          <span className="text-[10px] text-muted-foreground bg-white/60 px-2 py-0.5 rounded-full">
            {subtitle}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
