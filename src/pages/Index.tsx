import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Layers, 
  Shield, 
  Cloud,
  Users,
  BarChart3,
  ChevronRight,
  Network,
  Server,
  Container,
  Cpu,
  Monitor,
  ArrowLeft,
  Github
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BrokerSequenceDiagram, TokenCards } from "@/components/architecture/BrokerSequenceDiagram";
import { TenantPlatformArchitecture } from "@/components/architecture/TenantPlatformArchitecture";
import { ClusterManagementArchitecture } from "@/components/architecture/ClusterManagementArchitecture";
import { CloudServicesTable } from "@/components/architecture/CloudServicesTable";
import { VPCOverviewArchitecture } from "@/components/architecture/VPCOverviewArchitecture";
import { BrokerFCArchitecture } from "@/components/architecture/BrokerFCArchitecture";
import { APIPlatformArchitecture } from "@/components/architecture/APIPlatformArchitecture";
import { DataPlaneArchitecture } from "@/components/architecture/DataPlaneArchitecture";
import { TenantCoreArchitecture } from "@/components/architecture/TenantCoreArchitecture";
import { PCClientArchitecture } from "@/components/architecture/PCClientArchitecture";
import { Button } from "@/components/ui/button";

type SystemTab = "overview" | "broker" | "tenant" | "cluster" | "api" | "dataPlane" | "tenantCore" | "pcClient" | "cloud";

const systemCards = [
  {
    id: "dataPlane" as SystemTab,
    icon: Container,
    title: "Tenant (Data Plane)",
    description: "Mini Program, PC, iOS (App), Android (App) multi-client architecture",
    color: "bg-data-plane",
  },
  {
    id: "tenant" as SystemTab,
    icon: Users,
    title: "Tenant Management",
    description: "Control plane for tenant lifecycle, provisioning & scaling",
    color: "bg-control-plane",
  },
  {
    id: "broker" as SystemTab,
    icon: Shield,
    title: "Broker System",
    description: "Unified OAuth login proxy, redirects to tenant apps after auth",
    color: "bg-broker",
  },
  {
    id: "cluster" as SystemTab,
    icon: BarChart3,
    title: "Observability",
    description: "Logging, monitoring, dashboard for operations",
    color: "bg-monitoring",
  },
  {
    id: "api" as SystemTab,
    icon: Server,
    title: "API Platform (Future Plan)",
    description: "Developer portal with unified API gateway for external access",
    color: "bg-api",
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<SystemTab>("overview");

  // Breadcrumb component
  const Breadcrumb = ({ items }: { items: { label: string; onClick?: () => void }[] }) => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {item.onClick ? (
            <button 
              onClick={item.onClick}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-control-plane flex items-center justify-center">
                <Layers size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Nata</h1>
                <p className="text-xs text-muted-foreground">Multi-Tenant Architecture</p>
              </div>
            </div>
            <a
              href="https://github.com/Cybozu-SHSD/nata-doc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-sm font-medium"
            >
              <Github size={18} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero with System Cards as Tabs */}
      <section className="py-8 border-b" style={{ background: "var(--gradient-hero)" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-3 bg-control-plane text-primary-foreground text-xs">
              Architecture Document
            </Badge>
            <h2 className="text-2xl font-bold mb-3">
              Platform Architecture Overview
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              5 independent systems deployed within VPC. Click to view details.
            </p>

            {/* VPC Overview Tab */}
            <button
              onClick={() => setActiveTab("overview")}
              className={cn(
                "w-full mb-4 text-left rounded-xl p-4 border-2 transition-all duration-200",
                "hover:shadow-lg",
                activeTab === "overview" 
                  ? "bg-card border-primary shadow-md" 
                  : "bg-card/60 backdrop-blur border-transparent hover:border-border"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Network size={16} className="text-primary-foreground" />
                  </div>
                  <div>
                    <span className="font-semibold">VPC Overview</span>
                    <span className="text-xs text-muted-foreground ml-2">- All systems deployment overview</span>
                  </div>
                </div>
                <ChevronRight 
                  size={16} 
                  className={cn(
                    "transition-transform",
                    activeTab === "overview" ? "rotate-90 text-primary" : "text-muted-foreground"
                  )} 
                />
              </div>
            </button>
            
            {/* System Cards as Clickable Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {systemCards.map((system) => {
                const Icon = system.icon;
                const isActive = activeTab === system.id || 
                  (system.id === "dataPlane" && (activeTab === "pcClient" || activeTab === "tenantCore"));
                return (
                  <button
                    key={system.id}
                    onClick={() => setActiveTab(system.id)}
                    className={cn(
                      "text-left rounded-xl p-4 border-2 transition-all duration-200",
                      "hover:shadow-lg hover:-translate-y-0.5",
                      isActive 
                        ? "bg-card border-primary shadow-md" 
                        : "bg-card/60 backdrop-blur border-transparent hover:border-border"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", system.color)}>
                          <Icon size={16} className="text-primary-foreground" />
                        </div>
                        <span className="font-semibold text-sm leading-tight">{system.title}</span>
                      </div>
                      <ChevronRight 
                        size={16} 
                        className={cn(
                          "transition-transform",
                          isActive ? "rotate-90 text-primary" : "text-muted-foreground"
                        )} 
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{system.description}</p>
                  </button>
                );
              })}
            </div>

            {/* Cloud Services Tab */}
            <button
              onClick={() => setActiveTab("cloud")}
              className={cn(
                "w-full mt-4 text-left rounded-xl p-3 border-2 transition-all duration-200",
                "hover:shadow-lg",
                activeTab === "cloud" 
                  ? "bg-card border-primary shadow-md" 
                  : "bg-card/60 backdrop-blur border-transparent hover:border-border"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-secondary flex items-center justify-center">
                    <Cloud size={14} className="text-muted-foreground" />
                  </div>
                  <span className="font-medium text-sm">Cloud Services</span>
                  <span className="text-xs text-muted-foreground">- Infrastructure service selection and upgrade paths</span>
                </div>
                <ChevronRight 
                  size={14} 
                  className={cn(
                    "transition-transform",
                    activeTab === "cloud" ? "rotate-90 text-primary" : "text-muted-foreground"
                  )} 
                />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* VPC Overview */}
          {activeTab === "overview" && (
            <div className="animate-slide-in space-y-6">
              <div>
                <h3 className="text-lg font-semibold">VPC Deployment Overview</h3>
                <p className="text-sm text-muted-foreground">
                  All systems deployed within Alibaba Cloud VPC
                </p>
              </div>
              
              <div className="bg-secondary/30 rounded-xl p-5 border text-sm">
                <p>
                  The platform is deployed in a <strong>VPC</strong> with 5 systems:
                  Tenant Management, Broker (FC), API Platform, Tenant (Data Plane), and Observability.
                </p>
              </div>

              <div className="diagram-grid rounded-xl p-6 border bg-card">
                <VPCOverviewArchitecture />
              </div>
            </div>
          )}

          {/* Broker System */}
          {activeTab === "broker" && (
            <div className="animate-slide-in space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Broker System (FC Serverless)</h3>
                <p className="text-sm text-muted-foreground">
                  Unified OAuth authentication proxy based on Alibaba Cloud Function Compute
                </p>
              </div>
              
              <div className="bg-secondary/30 rounded-xl p-5 border text-sm space-y-3">
                <p>
                  The <strong>Broker</strong> is implemented using Function Compute (FC), providing a serverless OAuth proxy service.
                  It handles the OAuth flow with various identity providers (Microsoft, WeChat, DingTalk) 
                  and redirects users back to their tenant applications with a secure handoff token.
                </p>
                <p>
                  <strong>Design Highlights:</strong> Pay-per-use with zero cost when idle; auto-scaling to handle traffic spikes.
                </p>
              </div>

              <div className="diagram-grid rounded-xl p-6 border bg-card">
                <BrokerFCArchitecture />
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-3">OAuth Flow (UML Sequence Diagram)</h4>
                <BrokerSequenceDiagram />
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-3">Token Specifications</h4>
                <TokenCards />
              </div>

              <div className="bg-secondary/30 rounded-xl p-5 border">
                <h4 className="font-semibold mb-3 text-sm">Key Design Points</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-broker mt-1.5 shrink-0" />
                    <span><strong>Single Callback URL</strong> - All tenants share one OAuth callback, simplifying IdP config</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-broker mt-1.5 shrink-0" />
                    <span><strong>Stateless</strong> - Context encoded in JWT tokens, no server-side sessions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-broker mt-1.5 shrink-0" />
                    <span><strong>Key Separation</strong> - Broker uses RSA, tenants use their own HS256 secrets</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-broker mt-1.5 shrink-0" />
                    <span><strong>Adapter Pattern</strong> - Easy to add new OAuth providers</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tenant Platform */}
          {activeTab === "tenant" && (
            <div className="animate-slide-in space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Tenant Management Platform（Control Plane）</h3>
                <p className="text-sm text-muted-foreground">
                  Control plane for tenant provisioning, scaling, and lifecycle management
                </p>
              </div>
              
              <div className="bg-secondary/30 rounded-xl p-5 border text-sm space-y-3">
                <p>
                  The <strong>Tenant Platform</strong> is the control plane responsible for managing tenant lifecycles. 
                  It handles tenant creation, scaling, suspension, and deletion through Kubernetes orchestration.
                </p>
                <p>
                  Platform admins use the Console to manage tenants, while the Deploy Service interacts with the 
                  K8s cluster to provision isolated application stacks for each tenant.
                </p>
              </div>

              <div className="diagram-grid rounded-xl p-6 border bg-card">
                <TenantPlatformArchitecture />
              </div>
            </div>
          )}

          {/* API Platform */}
          {activeTab === "api" && (
            <div className="animate-slide-in space-y-6">
              <div>
                <h3 className="text-lg font-semibold">API Platform</h3>
                <p className="text-sm text-muted-foreground">
                  Developer portal with unified API gateway for external access
                </p>
              </div>
              
              <div className="bg-secondary/30 rounded-xl p-5 border text-sm space-y-3">
                <p>
                  The <strong>API Platform</strong> provides a developer portal for external integrations.
                  It includes subdomain allocation per tenant, project-based token management, 
                  and a unified API gateway with permission-based routing.
                </p>
                <p>
                  <strong>Key Feature:</strong> Project-based token mechanism - one token manages multiple app permissions,
                  unlike app-based systems where each app requires separate token configuration.
                </p>
              </div>

              <div className="diagram-grid rounded-xl p-6 border bg-card">
                <APIPlatformArchitecture />
              </div>
            </div>
          )}

          {/* Tenant (Data Plane) */}
          {activeTab === "dataPlane" && (
            <div className="animate-slide-in space-y-6">
              <Breadcrumb items={[
                { label: "Tenant (Data Plane)" }
              ]} />
              
              <div>
                <h3 className="text-lg font-semibold">Tenant (Data Plane) Overview</h3>
                <p className="text-sm text-muted-foreground">
                  Single tenant deployment with multi-platform client support and NestJS backend
                </p>
              </div>
              
              <div className="bg-secondary/30 rounded-xl p-5 border text-sm space-y-3">
                <p>
                  Each tenant runs a <strong>standalone backend</strong> built with NestJS, 
                  serving all frontend clients (Web, Mobile, Mini Programs, Third-party).
                </p>
                <p>
                  It includes ALB Gateway for load balancing, multi-layer architecture with authorization (OSO/Polar), 
                  and connects to tenant-specific managed data services.
                </p>
              </div>

              <DataPlaneArchitecture 
                onNavigateToPCClient={() => setActiveTab('pcClient')}
                onNavigateToCoreSystem={() => setActiveTab('tenantCore')}
              />
            </div>
          )}

          {/* PC Client Architecture */}
          {activeTab === "pcClient" && (
            <div className="animate-slide-in space-y-6">
              <Breadcrumb items={[
                { label: "Tenant (Data Plane)", onClick: () => setActiveTab('dataPlane') },
                { label: "PC Client" }
              ]} />

              <Button 
                variant="ghost" 
                onClick={() => setActiveTab('dataPlane')}
                className="flex items-center gap-2 -mt-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Data Plane Overview
              </Button>

              <div>
                <h3 className="text-lg font-semibold">PC Client Architecture</h3>
                <p className="text-sm text-muted-foreground">
                  Next.js + BFF Proxy pattern for primary desktop client
                </p>
              </div>

              <PCClientArchitecture onNavigateToCoreSystem={() => setActiveTab('tenantCore')} />
            </div>
          )}

          {/* Tenant Core Architecture */}
          {activeTab === "tenantCore" && (
            <div className="animate-slide-in space-y-6">
              <Breadcrumb items={[
                { label: "Tenant (Data Plane)", onClick: () => setActiveTab('dataPlane') },
                { label: "Core System" }
              ]} />

              <Button 
                variant="ghost" 
                onClick={() => setActiveTab('dataPlane')}
                className="flex items-center gap-2 -mt-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Data Plane Overview
              </Button>

              <div>
                <h3 className="text-lg font-semibold">Core System Design</h3>
                <p className="text-sm text-muted-foreground">
                  NestJS-based backend microservices powering all tenant applications
                </p>
              </div>

              <TenantCoreArchitecture onNavigateToPCClient={() => setActiveTab('pcClient')} />
            </div>
          )}

          {/* Observability */}
          {activeTab === "cluster" && (
            <div className="animate-slide-in space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Observability Platform</h3>
                <p className="text-sm text-muted-foreground">
                  Logging, monitoring, and dashboard for platform operations
                </p>
              </div>
              
              <div className="bg-secondary/30 rounded-xl p-5 border text-sm">
                <p>
                  The <strong>Observability</strong> system provides unified logging and monitoring across all tenants.
                  It collects logs from all pods, provides metrics dashboards, and enables alerting for operational issues.
                </p>
              </div>

              <div className="diagram-grid rounded-xl p-6 border bg-card">
                <ClusterManagementArchitecture />
              </div>
            </div>
          )}

          {/* Cloud Services */}
          {activeTab === "cloud" && (
            <div className="animate-slide-in space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Cloud Services Architecture</h3>
                <p className="text-sm text-muted-foreground">
                  Infrastructure service selection and upgrade paths
                </p>
              </div>
              
              <div className="diagram-grid rounded-xl p-6 border bg-card">
                <CloudServicesTable />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
