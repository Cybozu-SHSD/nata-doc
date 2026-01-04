import { 
  Database, 
  Users, 
  Key, 
  Container,
  HardDrive,
  ArrowDown,
  ArrowRight,
  Workflow,
  LayoutDashboard,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ControlPlaneArchitecture() {
  return (
    <div className="space-y-0">
      {/* Admin Entry */}
      <div className="relative border-2 border-dashed border-muted-foreground/30 bg-muted/10 rounded-xl p-4 pt-8">
        <div className="absolute -top-3 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-muted-foreground text-background">
          Admin Entry
        </div>
        <div className="flex justify-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-card border-2 border-dashed border-muted-foreground/50 rounded-lg">
            <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center">
              <Users size={14} className="text-muted-foreground" />
            </div>
            <div>
              <div className="text-sm font-semibold">Platform Admin</div>
              <div className="text-[10px] text-muted-foreground">Console User</div>
            </div>
          </div>
        </div>
      </div>

      {/* Connector: Admin → Control Plane */}
      <div className="flex justify-center py-1">
        <div className="flex flex-col items-center">
          <div className="w-0.5 h-3 bg-gradient-to-b from-muted-foreground/40 to-control-plane/60" />
          <ArrowDown size={12} className="text-control-plane" />
        </div>
      </div>

      {/* Control Plane */}
      <div className="relative border-2 border-dashed border-control-plane/40 bg-control-plane-light/20 rounded-xl p-4 pt-8">
        <div className="absolute -top-3 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-control-plane text-primary-foreground">
          Control Plane
        </div>
        
        <div className="space-y-4">
          {/* Core Services - Dashboard, Tenant Manager, Deploy Service */}
          <div className="flex justify-center items-center gap-3">
            {/* Dashboard */}
            <Box 
              icon={<LayoutDashboard size={14} />} 
              title="Dashboard" 
              subtitle="Web Console" 
              variant="control"
              size="md"
            />
            
            {/* Arrow: Dashboard → Tenant Manager */}
            <ArrowRight size={16} className="text-control-plane/60 shrink-0" />
            
            {/* Tenant Manager */}
            <Box 
              icon={<Users size={14} />} 
              title="Tenant Manager" 
              subtitle="CRUD / Quota / Plan" 
              variant="control"
              size="md"
            />
            
            {/* Arrow: Tenant Manager → Deploy Service (Async) */}
            <div className="flex items-center gap-1 shrink-0">
              <ArrowRight size={16} className="text-control-plane/60" />
              <span className="text-[8px] bg-control-plane/20 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <Zap size={8} />
                async
              </span>
            </div>
            
            {/* Deploy Service */}
            <Box 
              icon={<Container size={14} />} 
              title="Deploy Service" 
              subtitle="K8s Orchestrator" 
              variant="control"
              size="md"
              tags={["Helm", "Secrets", "NS"]}
            />
          </div>

          {/* Connector to Storage */}
          <div className="flex justify-center">
            <div className="relative w-64">
              {/* Horizontal line */}
              <div className="absolute top-0 left-[20%] right-[20%] h-0.5 bg-storage/40" />
              {/* Left vertical */}
              <div className="absolute top-0 left-[20%] w-0.5 h-4 bg-storage/40" />
              {/* Center vertical */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-storage/40" />
              {/* Right vertical */}
              <div className="absolute top-0 right-[20%] w-0.5 h-4 bg-storage/40" />
              <div className="h-4" />
            </div>
          </div>

          {/* Storage Layer */}
          <div className="flex justify-center">
            <div className="relative bg-storage/10 rounded-lg p-3 border border-storage/30">
              <span className="absolute -top-2 left-3 px-2 bg-card text-[9px] font-medium text-muted-foreground rounded">
                Persistence
              </span>
              <div className="flex gap-2 pt-1">
                <Box 
                  icon={<Database size={10} />} 
                  title="PostgreSQL" 
                  subtitle="Metadata" 
                  variant="storage"
                  size="sm"
                />
                <Box 
                  icon={<HardDrive size={10} />} 
                  title="OSS" 
                  subtitle="Charts" 
                  variant="storage"
                  size="sm"
                />
                <Box 
                  icon={<Key size={10} />} 
                  title="KMS" 
                  subtitle="Secrets" 
                  variant="storage"
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connector: Control Plane → K8s API */}
      <div className="flex justify-center py-1">
        <div className="flex flex-col items-center">
          <div className="w-0.5 h-3 bg-gradient-to-b from-control-plane/60 to-data-plane/60" />
          <ArrowDown size={12} className="text-data-plane" />
        </div>
      </div>

      {/* Kubernetes API */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 px-4 py-2 bg-data-plane/20 rounded-full border border-data-plane/40">
          <Workflow size={14} className="text-data-plane" />
          <span className="text-xs font-mono font-medium">kubectl / Helm SDK</span>
        </div>
      </div>

      {/* Connector: K8s API → Data Plane */}
      <div className="flex justify-center py-1">
        <div className="flex flex-col items-center">
          <div className="w-0.5 h-3 bg-data-plane/60" />
          <ArrowDown size={12} className="text-data-plane" />
        </div>
      </div>

      {/* Data Plane */}
      <div className="relative border-2 border-dashed border-data-plane/40 bg-data-plane-light/20 rounded-xl p-4 pt-8">
        <div className="absolute -top-3 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-data-plane text-accent-foreground">
          Data Plane (ACK Cluster)
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "001", status: "running" },
            { id: "002", status: "running" },
            { id: "003", status: "scaling" },
          ].map((tenant) => (
            <div 
              key={tenant.id} 
              className={cn(
                "bg-card rounded-lg p-3 border shadow-sm transition-all",
                tenant.status === "scaling" ? "border-data-plane animate-pulse" : "border-data-plane/30"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    tenant.status === "running" ? "bg-green-500" : "bg-yellow-500 animate-pulse"
                  )} />
                  <span className="text-[10px] font-mono font-medium">tenant-{tenant.id}</span>
                </div>
                <span className="text-[8px] text-muted-foreground capitalize">{tenant.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {["Main", "Worker", "Routine", "FTS"].map((svc) => (
                  <div key={svc} className="text-[8px] bg-data-plane-light px-1 py-0.5 rounded text-center font-medium">
                    {svc}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Internal Box component for cleaner code
interface BoxProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  variant: "control" | "storage";
  size?: "sm" | "md";
  tags?: string[];
}

const variantStyles = {
  control: {
    border: "border-control-plane",
    bg: "bg-control-plane-light/50",
    iconBg: "bg-control-plane text-primary-foreground",
    tagBg: "bg-control-plane/20",
  },
  storage: {
    border: "border-storage",
    bg: "bg-storage-light/50",
    iconBg: "bg-storage text-primary-foreground",
    tagBg: "bg-storage/20",
  },
};

function Box({ icon, title, subtitle, variant, size = "sm", tags }: BoxProps) {
  const styles = variantStyles[variant];
  const isSmall = size === "sm";
  
  return (
    <div className={cn(
      "rounded-lg border-2 shadow-sm",
      styles.border,
      styles.bg,
      isSmall ? "p-2 min-w-[70px]" : "p-2.5 min-w-[130px]"
    )}>
      <div className="flex items-start gap-1.5">
        <div className={cn(
          "rounded shrink-0 flex items-center justify-center",
          styles.iconBg,
          isSmall ? "w-5 h-5 p-1" : "w-6 h-6 p-1"
        )}>
          {icon}
        </div>
        <div className="min-w-0">
          <div className={cn("font-semibold text-foreground leading-tight", isSmall ? "text-[10px]" : "text-xs")}>
            {title}
          </div>
          <div className={cn("text-muted-foreground", isSmall ? "text-[8px]" : "text-[9px]")}>
            {subtitle}
          </div>
        </div>
      </div>
      {tags && tags.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-0.5">
          {tags.map(tag => (
            <span key={tag} className={cn("text-[7px] px-1 py-0.5 rounded", styles.tagBg)}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}