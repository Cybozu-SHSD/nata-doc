import { 
  Monitor, 
  Smartphone, 
  Globe,
  Shield,
  Lock,
  Flame,
  Network,
  Server,
  Container,
  Database,
  HardDrive,
  Cloud,
  Users,
  Mail,
  MessageSquare,
  ArrowDown,
  Settings,
  User,
  Workflow,
  Bell,
  Blocks,
  Laptop,
  Clock,
  Search,
  Zap,
  Image
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function DataPlaneArchitecture() {
  return (
    <div className="space-y-4">
      {/* Multi-Platform Clients */}
      <LayerContainer title="Multi-Platform Clients" subtitle="One Cloud, Multi-Platform | Unified API Service" color="green">
        <div className="flex flex-wrap justify-center gap-3">
          <ClientBox icon={<Monitor size={16} />} title="PC" subtitle="Next.js" />
          <ClientBox icon={<MessageSquare size={16} />} title="Mini Program" subtitle="WeChat/Alipay" />
          <ClientBox icon={<Globe size={16} />} title="H5 Web" subtitle="Responsive" />
          <ClientBox icon={<Smartphone size={16} />} title="iOS App" subtitle="Native/Hybrid" dimmed />
          <ClientBox icon={<Smartphone size={16} />} title="Android" subtitle="Native/Hybrid" dimmed />
        </div>
      </LayerContainer>

      <FlowArrow label="Unified SDK" />

      {/* Domain & Security Layer */}
      <LayerContainer title="Domain & Security Layer" subtitle="Traffic Entry & Security Protection" color="amber">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <SecurityBox icon={<Globe size={14} />} title="DNS" subtitle="Domain Resolution" />
          <SecurityBox icon={<Lock size={14} />} title="SSL Certificate" subtitle="HTTPS Encryption" />
          <SecurityBox icon={<Flame size={14} />} title="WAF" subtitle="Web App Firewall" />
          <SecurityBox icon={<Network size={14} />} title="EIP" subtitle="Elastic Public IP" />
        </div>
      </LayerContainer>

      <FlowArrow />

      {/* ALB */}
      <div className="flex justify-center">
        <div className="bg-slate-700 dark:bg-slate-800 text-white rounded-xl px-6 py-3 text-center">
          <div className="flex items-center justify-center gap-2 font-semibold text-sm">
            <Server size={16} />
            ALB (Application Load Balancer)
          </div>
          <div className="text-xs text-slate-300 mt-1">L7 Load Balancing | HTTPS Termination | Path Routing</div>
        </div>
      </div>

      <FlowArrow label="Routes: tenant-a → ns-a | tenant-b → ns-b" />

      {/* VPC Container */}
      <div className="border-2 border-primary/40 rounded-2xl p-4 bg-gradient-to-br from-primary/5 to-transparent relative">
        <div className="absolute -top-3 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
          VPC (Virtual Private Cloud)
        </div>
        <div className="text-xs text-muted-foreground mb-4 mt-2">10.0.0.0/16 | Private Subnet</div>

        <div className="space-y-4">
          {/* ACK Managed Cluster */}
          <div className="border border-blue-300 dark:border-blue-700 rounded-xl p-4 bg-blue-50/50 dark:bg-blue-900/20">
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">ACK Managed Cluster Pro</div>
            <div className="text-xs text-muted-foreground mb-3">Managed K8s Control Plane | Auto-scaling Nodes | Multi-Tenant Isolation</div>
            
            {/* Tenant Namespaces with Microservices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <NamespaceBox name="tenant-a" color="blue" />
              <NamespaceBox name="tenant-b" color="rose" />
            </div>

            {/* Shared Infrastructure */}
            <div className="bg-slate-100 dark:bg-slate-800/50 rounded-lg p-3">
              <div className="text-xs font-medium text-muted-foreground mb-2">Shared Infrastructure (kube-system / monitoring)</div>
              <div className="flex flex-wrap gap-2">
                <SharedComponent name="Ingress Controller" />
                <SharedComponent name="CoreDNS" />
                <SharedComponent name="Metrics Server" />
                <SharedComponent name="Logtail DaemonSet" />
              </div>
              <div className="flex gap-3 mt-2 text-xs">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Tenant A</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> Tenant B</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400" /> Shared</span>
              </div>
            </div>
          </div>

          <FlowArrow small />

          {/* Data Layer: Message Queue + Persistence (Side by Side) */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-3">
            {/* Message Queue Layer */}
            <div className="border border-red-300 dark:border-red-700 rounded-xl p-3 bg-red-50/50 dark:bg-red-900/20">
              <div className="text-sm font-semibold text-red-600 dark:text-red-400 mb-1">Message Queue</div>
              <div className="text-xs text-muted-foreground mb-2">Async | Event-Driven</div>
              <div className="flex justify-center mb-2">
                <div className="bg-red-500 text-white rounded-lg px-3 py-1.5 text-center">
                  <div className="flex items-center justify-center gap-1.5 font-semibold text-xs">
                    <Zap size={12} />
                    Redis / RabbitMQ
                  </div>
                </div>
              </div>
              <div className="space-y-1 text-[8px] text-center">
                <div className="bg-white dark:bg-slate-800 rounded px-1 py-0.5 border">notification.send</div>
                <div className="bg-white dark:bg-slate-800 rounded px-1 py-0.5 border">mail.send</div>
                <div className="bg-white dark:bg-slate-800 rounded px-1 py-0.5 border">fts.index.create</div>
                <div className="bg-white dark:bg-slate-800 rounded px-1 py-0.5 border">export.csv</div>
              </div>
            </div>

            {/* Persistence Layer */}
            <div className="border border-orange-300 dark:border-orange-700 rounded-xl p-3 bg-orange-50/50 dark:bg-orange-900/20">
              <div className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-1">Persistence Layer (Silo Mode)</div>
              <div className="text-xs text-muted-foreground mb-2">Independent Resources per Tenant | Complete Data Isolation</div>
              <div className="space-y-2">
                <TenantResources name="Tenant A" color="blue" dbName="tenant_a_db" />
                <TenantResources name="Tenant B" color="rose" dbName="tenant_b_db" />
              </div>
            </div>
          </div>

          {/* NAT Gateway */}
          <div className="flex justify-center">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg px-4 py-2 text-center border">
              <div className="flex items-center justify-center gap-2 text-sm font-medium">
                <Cloud size={14} />
                NAT Gateway
              </div>
              <div className="text-xs text-muted-foreground">Outbound Network</div>
            </div>
          </div>
        </div>
      </div>

      <FlowArrow label="Outbound" dashed />

      {/* Third-Party Services */}
      <div className="flex justify-center">
        <div className="border border-purple-300 dark:border-purple-700 rounded-xl p-4 bg-purple-50/50 dark:bg-purple-900/20">
          <div className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-1">Third-Party Services</div>
          <div className="text-xs text-muted-foreground mb-3">External (Outside VPC)</div>
          <div className="flex flex-wrap justify-center gap-2">
            <ThirdPartyBox icon={<Users size={14} />} title="Azure AD / OIDC" subtitle="SSO | OAuth" />
            <ThirdPartyBox icon={<MessageSquare size={14} />} title="SMS Gateway" subtitle="Alibaba SMS" />
            <ThirdPartyBox icon={<Mail size={14} />} title="Email Service" subtitle="DirectMail" />
          </div>
        </div>
      </div>

      {/* Microservices & Base Services Overview */}
      <div className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl p-6 border mt-8">
        <h4 className="font-semibold text-base mb-4 flex items-center gap-2">
          <Server size={18} className="text-blue-600" />
          Microservices Overview (NestJS Monorepo)
        </h4>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2 font-semibold">Service</th>
                <th className="text-left py-2 px-2 font-semibold">Type</th>
                <th className="text-left py-2 px-2 font-semibold">Responsibilities</th>
                <th className="text-left py-2 px-2 font-semibold">Communication</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-dashed">
                <td className="py-2 px-2">
                  <span className="inline-flex items-center gap-1 font-medium text-blue-600">
                    <Server size={12} /> Main
                  </span>
                </td>
                <td className="py-2 px-2">Main App</td>
                <td className="py-2 px-2">Core business logic (Forms, Data, Users, Workflow)</td>
                <td className="py-2 px-2">HTTP + Message Emit</td>
              </tr>
              <tr className="border-b border-dashed">
                <td className="py-2 px-2">
                  <span className="inline-flex items-center gap-1 font-medium text-green-600">
                    <Mail size={12} /> Worker
                  </span>
                </td>
                <td className="py-2 px-2">Microservice</td>
                <td className="py-2 px-2">Async notifications, Email, CSV export</td>
                <td className="py-2 px-2">EventPattern</td>
              </tr>
              <tr className="border-b border-dashed">
                <td className="py-2 px-2">
                  <span className="inline-flex items-center gap-1 font-medium text-amber-600">
                    <Clock size={12} /> Routine
                  </span>
                </td>
                <td className="py-2 px-2">Microservice</td>
                <td className="py-2 px-2">Scheduled tasks (Log cleanup, Data sync)</td>
                <td className="py-2 px-2">@Cron</td>
              </tr>
              <tr className="border-b border-dashed">
                <td className="py-2 px-2">
                  <span className="inline-flex items-center gap-1 font-medium text-purple-600">
                    <Search size={12} /> FTS Service
                  </span>
                </td>
                <td className="py-2 px-2">Microservice</td>
                <td className="py-2 px-2">Attachment parsing + ES indexing</td>
                <td className="py-2 px-2">MessagePattern / EventPattern</td>
              </tr>
              <tr>
                <td className="py-2 px-2">
                  <span className="inline-flex items-center gap-1 font-medium text-cyan-600">
                    <Image size={12} /> Imgproxy
                  </span>
                </td>
                <td className="py-2 px-2">
                  <Badge variant="secondary" className="text-[9px]">Standalone Only</Badge>
                </td>
                <td className="py-2 px-2">On-the-fly image resize, crop, format conversion (WebP/AVIF)</td>
                <td className="py-2 px-2">HTTP (reads from MinIO)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tenant Application Capabilities */}
      <div className="bg-gradient-to-br from-data-plane/5 to-control-plane/5 rounded-xl p-6 border mt-4">
        <h4 className="font-semibold text-base mb-5 flex items-center gap-2">
          <Settings size={18} className="text-data-plane" />
          Tenant Application Capabilities
        </h4>
        
        {/* Core Systems */}
        <div className="mb-6">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Core Systems</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Backend API System */}
            <div className="bg-card rounded-lg p-4 border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-600 bg-blue-100">
                  <Server size={16} />
                </div>
                <h5 className="text-sm font-semibold">Backend API</h5>
              </div>
              <ul className="space-y-1.5">
                <li className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-data-plane" />
                  RESTful API for clients
                </li>
                <li className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-data-plane" />
                  API versioning & documentation
                </li>
              </ul>
            </div>
            
            {/* Multi-Client Support System */}
            <div className="bg-card rounded-lg p-4 border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-green-600 bg-green-100">
                  <Laptop size={16} />
                </div>
                <h5 className="text-sm font-semibold">Multi-Client Support</h5>
              </div>
              <ul className="space-y-1.5">
                <li className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-data-plane" />
                  PC (with Admin Portal)
                </li>
                <li className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-data-plane" />
                  Mini Program / H5
                </li>
                <li className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-data-plane" />
                  Mobile Apps
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Built-in Features */}
        <div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Built-in Features</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                category: "User System",
                icon: User,
                color: "text-purple-600 bg-purple-100",
                items: ["Authentication & authorization", "Role-based access control", "User profile management"]
              },
              { 
                category: "Low-Code Engine",
                icon: Blocks,
                color: "text-amber-600 bg-amber-100",
                items: ["Visual form builder", "Page designer", "Data model configuration"]
              },
              { 
                category: "Workflow Engine",
                icon: Workflow,
                color: "text-cyan-600 bg-cyan-100",
                items: ["Business process automation", "Approval workflows", "Task scheduling"]
              },
              { 
                category: "Notification & Portal",
                icon: Bell,
                color: "text-red-600 bg-red-100",
                items: ["Push notifications", "Message center", "Personal workspace"]
              },
            ].map((group) => (
              <div key={group.category} className="bg-card rounded-lg p-4 border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", group.color)}>
                    <group.icon size={16} />
                  </div>
                  <h5 className="text-sm font-semibold">{group.category}</h5>
                </div>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-data-plane" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LayerContainer({ 
  title, 
  subtitle, 
  color, 
  children 
}: { 
  title: string; 
  subtitle: string; 
  color: "green" | "amber"; 
  children: React.ReactNode 
}) {
  const colorClasses = {
    green: "border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    amber: "border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
  };

  return (
    <div className={`border rounded-xl p-4 ${colorClasses[color]}`}>
      <div className={`text-sm font-semibold mb-1 ${color === 'green' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
        {title}
      </div>
      <div className="text-xs text-muted-foreground mb-3">{subtitle}</div>
      {children}
    </div>
  );
}

function ClientBox({ icon, title, subtitle, dimmed }: { icon: React.ReactNode; title: string; subtitle: string; dimmed?: boolean }) {
  return (
    <div className={cn(
      "bg-white dark:bg-slate-800 rounded-lg px-4 py-2 border shadow-sm min-w-[90px] text-center",
      dimmed && "opacity-40"
    )}>
      <div className="flex items-center justify-center gap-1.5 text-sm font-medium text-foreground">
        {icon}
        {title}
      </div>
      <div className="text-xs text-muted-foreground">{subtitle}</div>
    </div>
  );
}

function SecurityBox({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg px-3 py-2 border">
      <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
        {icon}
        {title}
      </div>
      <div className="text-xs text-muted-foreground">{subtitle}</div>
    </div>
  );
}

function FlowArrow({ label, dashed, small }: { label?: string; dashed?: boolean; small?: boolean }) {
  return (
    <div className="flex flex-col items-center py-1">
      {label && <div className={`text-muted-foreground mb-1 ${small ? 'text-[10px]' : 'text-xs'}`}>{label}</div>}
      <div className={`flex flex-col items-center ${dashed ? 'opacity-60' : ''}`}>
        <div className={`w-px ${small ? 'h-3' : 'h-4'} ${dashed ? 'border-l border-dashed border-muted-foreground' : 'bg-muted-foreground/50'}`} />
        <ArrowDown size={small ? 12 : 14} className="text-muted-foreground -mt-1" />
      </div>
    </div>
  );
}

function NamespaceBox({ name, color }: { name: string; color: "blue" | "rose" }) {
  const colorClasses = {
    blue: "border-blue-400 bg-blue-100 dark:bg-blue-900/40",
    rose: "border-rose-400 bg-rose-100 dark:bg-rose-900/40"
  };
  const textColor = color === "blue" ? "text-blue-600 dark:text-blue-400" : "text-rose-600 dark:text-rose-400";

  return (
    <div className={`border rounded-lg p-3 ${colorClasses[color]}`}>
      <div className={`text-xs font-medium ${textColor} mb-2`}>
        <Container size={12} className="inline mr-1" />
        Namespace: {name}
      </div>
      {/* Microservices Pods */}
      <div className="grid grid-cols-2 gap-1.5 mb-2">
        <div className="bg-blue-500 rounded px-2 py-1.5 text-[10px] text-center font-medium text-white">
          <Server size={10} className="inline mr-1" />
          Main
        </div>
        <div className="bg-green-500 rounded px-2 py-1.5 text-[10px] text-center font-medium text-white">
          <Mail size={10} className="inline mr-1" />
          Worker
        </div>
        <div className="bg-amber-500 rounded px-2 py-1.5 text-[10px] text-center font-medium text-white">
          <Clock size={10} className="inline mr-1" />
          Routine
        </div>
        <div className="bg-purple-500 rounded px-2 py-1.5 text-[10px] text-center font-medium text-white">
          <Search size={10} className="inline mr-1" />
          FTS
        </div>
      </div>
      <div className="text-[9px] text-muted-foreground bg-white/50 dark:bg-slate-800/50 rounded px-2 py-1">
        <span className="font-medium">Architecture:</span> Modular Monolith + Technical Microservices (NestJS)
      </div>
    </div>
  );
}

function SharedComponent({ name }: { name: string }) {
  return (
    <div className="bg-white dark:bg-slate-700 rounded px-2 py-1 text-xs border">
      {name}
    </div>
  );
}

function TenantResources({ name, color, dbName }: { name: string; color: "blue" | "rose"; dbName: string }) {
  const textColor = color === "blue" ? "text-blue-600 dark:text-blue-400" : "text-rose-600 dark:text-rose-400";
  const tenantLetter = color === "blue" ? "a" : "b";

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-lg p-3 border">
      <div className={`text-xs font-medium ${textColor} mb-2`}>
        <Container size={12} className="inline mr-1" />
        {name} - Dedicated Resources
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <ResourceItem icon={<Database size={14} />} title={`PostgreSQL`} subtitle={dbName} />
        <ResourceItem icon={<HardDrive size={14} />} title={`MinIO / OSS`} subtitle={`tenant-${tenantLetter}-bucket`} />
        <ResourceItem icon={<Zap size={14} />} title={`Redis`} subtitle={`MQ + Cache`} />
        <ResourceItem icon={<Search size={14} />} title={`Elasticsearch`} subtitle={`FTS Index`} />
        <ResourceItem icon={<Cloud size={14} />} title={`SLS`} subtitle={`Logs`} />
      </div>
    </div>
  );
}

function ResourceItem({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-muted-foreground mb-1">{icon}</div>
      <div className="text-[10px] font-medium text-foreground">{title}</div>
      <div className="text-[9px] text-muted-foreground">{subtitle}</div>
    </div>
  );
}

function ThirdPartyBox({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg px-3 py-2 border min-w-[100px] text-center">
      <div className="flex items-center justify-center gap-1.5 text-sm font-medium text-foreground">
        {icon}
        {title}
      </div>
      <div className="text-xs text-muted-foreground">{subtitle}</div>
    </div>
  );
}

