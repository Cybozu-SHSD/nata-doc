import { 
  Shield, 
  Users,
  Activity,
  Container,
  Network,
  Server,
  UserCircle,
  Settings,
  Code,
  Headphones,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export function VPCOverviewArchitecture() {
  return (
    <div className="space-y-8">
      {/* User Access Paths */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <UserAccessCard 
          icon={<UserCircle size={20} />}
          role="End User"
          description="Use applications"
          targets={["Tenant (Data Plane)"]}
          color="blue"
        />
        <UserAccessCard 
          icon={<Settings size={20} />}
          role="Admin"
          description="Manage tenants & config"
          targets={["Tenant Management", "Broker"]}
          color="purple"
        />
        <UserAccessCard 
          icon={<Headphones size={20} />}
          role="Operations"
          description="Monitor & maintain"
          targets={["Observability", "Tenant Management"]}
          color="orange"
        />
        <UserAccessCard 
          icon={<Code size={20} />}
          role="Developer"
          description="Integrate APIs"
          targets={["API Platform"]}
          color="green"
        />
      </div>

      {/* Flow Arrows */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-16 h-px bg-border" />
          <span className="px-2 py-1 bg-muted rounded">Access via ALB / Domain</span>
          <div className="w-16 h-px bg-border" />
        </div>
      </div>

      {/* VPC Container with all systems */}
      <div className="relative border-2 border-primary/50 rounded-2xl p-6 bg-gradient-to-br from-primary/5 to-transparent">
        {/* VPC Label */}
        <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full flex items-center gap-1.5">
          <Network size={12} />
          VPC (Virtual Private Cloud)
        </div>
        <div className="text-xs text-muted-foreground mb-6 mt-1">10.0.0.0/16 | Private Subnet | ACK Managed Cluster Pro</div>

        {/* Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <SystemCard 
            icon={<Users size={20} />} 
            title="Tenant Management" 
            color="control-plane"
            description="Lifecycle & Config"
            features={["Helm Deploy", "Config Sync", "Resource Quota"]}
          />
          <SystemCard 
            icon={<Shield size={20} />} 
            title="Broker" 
            color="broker"
            description="Auth & Routing"
            features={["OAuth/OIDC", "Token Issue", "Tenant Route"]}
          />
          <SystemCard 
            icon={<Server size={20} />} 
            title="API Platform" 
            color="api"
            description="Unified API Gateway"
            features={["API Publish", "Rate Limit", "Developer Portal"]}
          />
          <SystemCard 
            icon={<Container size={20} />} 
            title="Tenant (Data Plane)" 
            color="data-plane"
            description="Business Runtime"
            features={["Lowcode Engine", "Data Isolation", "App Services"]}
          />
          <SystemCard 
            icon={<Activity size={20} />} 
            title="Observability" 
            color="monitoring"
            description="Monitor & Ops"
            features={["Metrics", "Logs", "Alerts"]}
          />
        </div>

        {/* Internal Communication */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="text-xs text-muted-foreground mb-3 font-medium">Internal Communication (K8s Service Discovery)</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
            <CommItem from="Tenant Mgmt" to="All" method="Helm/Config" />
            <CommItem from="Broker" to="Tenant" method="OAuth Redirect" />
            <CommItem from="API Platform" to="Tenant" method="Token + Route" />
            <CommItem from="Observability" to="All" method="Pull Metrics" />
            <CommItem from="All" to="Persistence" method="DB/OSS/Redis" />
            <CommItem from="PC Client" to="Backend" method="Private ALB + mTLS" highlight />
          </div>
        </div>
      </div>


      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-control-plane" />
          <span>Tenant Management</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-broker" />
          <span>Broker (FC)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-api" />
          <span>API Platform</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-data-plane" />
          <span>Tenant (Data Plane)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-monitoring" />
          <span>Observability</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span className="text-green-700 dark:text-green-300">Public Exposure</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 rounded">
          <div className="w-3 h-3 rounded bg-orange-500" />
          <span className="text-orange-700 dark:text-orange-300">Private Network</span>
        </div>
      </div>
    </div>
  );
}

interface UserAccessCardProps {
  icon: React.ReactNode;
  role: string;
  description: string;
  targets: string[];
  color: "blue" | "purple" | "orange" | "green";
}

function UserAccessCard({ icon, role, description, targets, color }: UserAccessCardProps) {
  const colorMap = {
    blue: "border-blue-300 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    purple: "border-purple-300 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    orange: "border-orange-300 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
    green: "border-green-300 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
  };

  return (
    <div className={`border rounded-xl p-3 ${colorMap[color]}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <div className="font-semibold text-sm">{role}</div>
      </div>
      <div className="text-xs text-muted-foreground mb-2">{description}</div>
      <div className="space-y-1">
        {targets.map((t) => (
          <div key={t} className="flex items-center gap-1 text-[10px]">
            <ArrowRight size={10} />
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SystemCardProps {
  icon: React.ReactNode;
  title: string;
  color: "control-plane" | "broker" | "data-plane" | "monitoring" | "api";
  description: string;
  features: string[];
}

function SystemCard({ icon, title, color, description, features }: SystemCardProps) {
  const colorMap = {
    "control-plane": "bg-control-plane",
    "broker": "bg-broker",
    "data-plane": "bg-data-plane",
    "monitoring": "bg-monitoring",
    "api": "bg-api",
  };

  return (
    <div className="flex flex-col items-center text-center bg-card border rounded-xl p-3">
      <div className={`w-12 h-12 rounded-xl ${colorMap[color]} flex items-center justify-center shadow-md mb-2`}>
        <span className="text-primary-foreground">{icon}</span>
      </div>
      <div className="font-semibold text-xs mb-1">{title}</div>
      <div className="text-[10px] text-muted-foreground mb-2">{description}</div>
      <div className="space-y-1 w-full">
        {features.map((f) => (
          <div key={f} className="text-[9px] px-2 py-0.5 bg-muted rounded">{f}</div>
        ))}
      </div>
    </div>
  );
}

function CommItem({ from, to, method, highlight }: { from: string; to: string; method: string; highlight?: boolean }) {
  return (
    <div className={cn(
      "rounded-lg p-2 border text-center",
      highlight 
        ? "bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700" 
        : "bg-card"
    )}>
      <div className="text-muted-foreground text-[10px]">
        <span className="font-medium text-foreground">{from}</span>
        <span className="mx-1">→</span>
        <span className="font-medium text-foreground">{to}</span>
      </div>
      <div className={cn(
        "text-[10px] mt-0.5",
        highlight ? "text-orange-600 dark:text-orange-400 font-medium" : "text-primary"
      )}>{method}</div>
    </div>
  );
}
