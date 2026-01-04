import { 
  BarChart3, 
  FileText, 
  AlertTriangle,
  Search,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Phone,
  Webhook,
  Bell,
  ArrowUp,
  Server,
  Container,
  Users,
  Cloud,
  Network
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BoxProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  variant?: "control" | "data" | "storage" | "external";
  className?: string;
}

function Box({ icon, title, subtitle, variant = "control", className }: BoxProps) {
  const variantStyles = {
    control: "bg-control-plane/10 border-control-plane/30 text-control-plane",
    data: "bg-data-plane/10 border-data-plane/30 text-data-plane",
    storage: "bg-amber-500/10 border-amber-500/30 text-amber-600",
    external: "bg-muted border-border text-muted-foreground",
  };

  return (
    <div className={cn(
      "rounded-lg p-2.5 border text-center min-w-[100px]",
      variantStyles[variant],
      className
    )}>
      <div className="flex justify-center mb-1">{icon}</div>
      <h5 className="text-[11px] font-semibold">{title}</h5>
      {subtitle && <p className="text-[9px] opacity-70">{subtitle}</p>}
    </div>
  );
}

export function ClusterManagementArchitecture() {
  return (
    <div className="space-y-4">
      {/* Operations Team - Outside VPC */}
      <div className="flex justify-center">
        <Box
          icon={<Users size={14} />}
          title="Operations"
          subtitle="Cluster Operators"
          variant="external"
        />
      </div>

      {/* Arrow */}
      <div className="flex justify-center">
        <ArrowUp size={16} className="text-muted-foreground rotate-180" />
      </div>

      {/* Alibaba Cloud VPC */}
      <div className="bg-gradient-to-br from-blue-500/5 to-control-plane/5 rounded-xl p-5 border-2 border-dashed border-blue-500/30 relative">
        <span className="absolute -top-3 left-4 px-3 py-0.5 bg-card text-xs font-semibold text-blue-600 rounded-full border border-blue-500/30 flex items-center gap-1">
          <Cloud size={12} />
          Alibaba Cloud VPC
        </span>
        
        <div className="space-y-4 pt-2">
          {/* Observability Platform */}
          <div className="bg-control-plane/5 rounded-lg p-4 border border-control-plane/20 relative">
            <span className="absolute -top-2.5 left-3 px-2 bg-card text-[10px] font-medium text-control-plane rounded">
              Observability Platform
            </span>
            
            <div className="space-y-3 pt-1">
              {/* Dashboards */}
              <div className="flex justify-center gap-3">
                <Box
                  icon={<LayoutDashboard size={14} />}
                  title="Grafana"
                  subtitle="Metrics Dashboard"
                  variant="control"
                />
                <Box
                  icon={<Search size={14} />}
                  title="SLS Console"
                  subtitle="Log Search"
                  variant="control"
                />
                <Box
                  icon={<AlertTriangle size={14} />}
                  title="Alert Center"
                  subtitle="Alerting Rules"
                  variant="control"
                />
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowUp size={16} className="text-control-plane/50" />
              </div>

              {/* Data Collection */}
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <Box
                    icon={<BarChart3 size={14} />}
                    title="ARMS Prometheus"
                    subtitle="Metrics Storage"
                    variant="storage"
                  />
                </div>
                <div className="text-center">
                  <Box
                    icon={<FileText size={14} />}
                    title="SLS"
                    subtitle="Log Storage"
                    variant="storage"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Collection Arrow with Labels */}
          <div className="flex justify-center items-center gap-4">
            <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
              <span className="bg-amber-500/20 px-1.5 py-0.5 rounded">Prometheus SDK</span>
              <span>scrape metrics</span>
            </div>
            <ArrowUp size={16} className="text-amber-500/60" />
            <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
              <span className="bg-amber-500/20 px-1.5 py-0.5 rounded">Logtail Agent</span>
              <span>collect logs</span>
            </div>
          </div>

          {/* ACK Cluster - Tenant Data Plane */}
          <div className="bg-data-plane/5 rounded-lg p-4 border border-data-plane/20 relative">
            <span className="absolute -top-2.5 left-3 px-2 bg-card text-[10px] font-medium text-data-plane rounded flex items-center gap-1">
              <Network size={10} />
              ACK Kubernetes Cluster (Tenant Data Plane)
            </span>
            
            <div className="pt-2">
              {/* Tenant Namespaces */}
              <div className="grid grid-cols-3 gap-3">
                {["tenant-001", "tenant-002", "tenant-..."].map((ns) => (
                  <div key={ns} className="bg-data-plane/10 rounded-lg p-2 border border-data-plane/30">
                    <h5 className="text-[10px] font-semibold mb-1.5 flex items-center gap-1">
                      <Container size={10} className="text-data-plane" />
                      ns: {ns}
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {["Main", "Worker", "Routine", "FTS"].map((s) => (
                        <span key={s} className="text-[8px] bg-data-plane/20 px-1.5 py-0.5 rounded">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics & Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg p-4 border">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
            <BarChart3 size={12} className="text-control-plane" />
            Key Metrics
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Pod CPU / Memory / Restart count</li>
            <li>• API latency (P50, P95, P99)</li>
            <li>• DB connections / Query time</li>
            <li>• Request rate / Error rate (5xx)</li>
          </ul>
        </div>
        <div className="bg-card rounded-lg p-4 border">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
            <AlertTriangle size={12} className="text-amber-500" />
            Alert Rules
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Pod crash loop / OOM killed</li>
            <li>• High error rate (&gt; 1%)</li>
            <li>• DB connection exhausted</li>
            <li>• Certificate expiration</li>
          </ul>
        </div>
      </div>

      {/* Alert Channels */}
      <div className="bg-gradient-to-br from-control-plane/5 to-data-plane/5 rounded-xl p-5 border">
        <h4 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <Bell size={14} className="text-control-plane" />
          Alert Notification Channels
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Mail, label: "Email", desc: "Team inbox notifications" },
            { icon: Phone, label: "SMS", desc: "Critical alerts to on-call" },
            { icon: MessageSquare, label: "DingTalk", desc: "Group robot messages" },
            { icon: Webhook, label: "Webhook", desc: "Custom integrations" },
          ].map((channel) => (
            <div key={channel.label} className="bg-card rounded-lg p-3 border text-center">
              <div className="w-8 h-8 rounded-full bg-control-plane/10 mx-auto mb-2 flex items-center justify-center">
                <channel.icon size={14} className="text-control-plane" />
              </div>
              <h5 className="text-xs font-semibold">{channel.label}</h5>
              <p className="text-[10px] text-muted-foreground">{channel.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
