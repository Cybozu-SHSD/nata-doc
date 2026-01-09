import { 
  Monitor, 
  Globe,
  Server,
  Lock,
  Shield,
  Network,
  Settings,
  User,
  Workflow,
  Bell,
  Blocks,
  ArrowRight,
  ArrowDown,
  LayoutDashboard,
  FileEdit,
  Table2,
  Cog,
  ChevronRight,
  Cpu,
  Cloud,
  Key,
  FileCheck,
  Container,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PCClientArchitectureProps {
  onNavigateToCoreSystem?: () => void;
}

export function PCClientArchitecture({ onNavigateToCoreSystem }: PCClientArchitectureProps) {
  const businessModules = [
    { 
      icon: User, 
      title: "User Management", 
      subtitle: "Authentication & RBAC", 
      description: "Single Sign-On, role-based access control, user profile management"
    },
    { 
      icon: Blocks, 
      title: "Low-Code Engine", 
      subtitle: "Form & Page Builder", 
      description: "Visual form designer, dynamic page configuration, data model management"
    },
    { 
      icon: Workflow, 
      title: "Workflow Engine", 
      subtitle: "Process Automation", 
      description: "Business process designer, approval workflows, task scheduling"
    },
    { 
      icon: Bell, 
      title: "Notification Center", 
      subtitle: "Message Hub", 
      description: "Push notifications, message center, personal workspace portal"
    },
    { 
      icon: FileEdit, 
      title: "Form Designer", 
      subtitle: "Visual Builder", 
      description: "Drag-and-drop form builder, field validation, conditional logic"
    },
    { 
      icon: Table2, 
      title: "Data Management", 
      subtitle: "CRUD & Import/Export", 
      description: "Data views, bulk operations, CSV/Excel import and export"
    },
    { 
      icon: LayoutDashboard, 
      title: "Dashboard", 
      subtitle: "Reports & Charts", 
      description: "Data visualization, report generation, chart components"
    },
    { 
      icon: Cog, 
      title: "System Settings", 
      subtitle: "Config & Admin", 
      description: "System configuration, tenant settings, integration management"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <div className="bg-secondary/30 rounded-xl p-5 border text-sm space-y-3">
        <p>
          The <strong>PC Client</strong> is the primary desktop application built with Next.js, 
          implementing a <strong>BFF (Backend-For-Frontend) Proxy</strong> pattern for secure API communication.
        </p>
        <p>
          Unlike direct API access, all requests are proxied through Next.js API Routes, 
          providing authentication handling, environment isolation, and enhanced security.
        </p>
      </div>

      {/* Technology Stack */}
      <div className="bg-gradient-to-br from-emerald-50/50 to-cyan-50/50 dark:from-emerald-900/10 dark:to-cyan-900/10 rounded-xl p-6 border">
        <h4 className="font-semibold text-base mb-4 flex items-center gap-2">
          <Monitor size={18} className="text-emerald-600" />
          Technology Stack
        </h4>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">Next.js</Badge>
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">React</Badge>
          <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300">TypeScript</Badge>
          <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">Tailwind CSS</Badge>
          <Badge className="bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">Ant Design</Badge>
          <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-300">shadcn/ui</Badge>
          <Badge variant="outline">BFF Proxy Pattern</Badge>
          <Badge variant="outline">SSR / CSR Hybrid</Badge>
        </div>
      </div>

      {/* BFF Architecture Diagram */}
      <div className="bg-card rounded-xl p-6 border">
        <h4 className="font-semibold text-base mb-4">Request Flow (Proxy-First BFF Pattern)</h4>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 mb-6">
          {/* React Client */}
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 rounded-xl px-6 py-4 border-2 border-blue-300 dark:border-blue-700 text-center min-w-[180px]">
            <div className="flex items-center justify-center gap-2 text-base font-semibold text-blue-700 dark:text-blue-300">
              <Globe size={18} />
              React Client
            </div>
            <div className="text-xs text-muted-foreground mt-1">Browser / SSR Pages</div>
            <div className="mt-3 space-y-1 text-[10px] text-left">
              <div className="bg-blue-200/50 dark:bg-blue-800/30 rounded px-2 py-1">• UI Components & Rendering</div>
              <div className="bg-blue-200/50 dark:bg-blue-800/30 rounded px-2 py-1">• State Management (Zustand)</div>
              <div className="bg-blue-200/50 dark:bg-blue-800/30 rounded px-2 py-1">• Client-side Routing</div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center">
            <ArrowRight size={20} className="text-muted-foreground hidden lg:block" />
            <ArrowDown size={20} className="text-muted-foreground lg:hidden" />
            <div className="text-xs text-muted-foreground font-medium">fetch()</div>
          </div>

          {/* BFF Layer */}
          <div className="bg-gradient-to-br from-emerald-100 to-teal-50 dark:from-emerald-900/40 dark:to-teal-800/20 rounded-xl px-6 py-4 border-2 border-emerald-500 dark:border-emerald-600 text-center min-w-[200px] relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
              BFF Layer
            </div>
            <div className="flex items-center justify-center gap-2 text-base font-semibold text-emerald-700 dark:text-emerald-300 mt-2">
              <Server size={18} />
              Next.js API Routes
            </div>
            <div className="text-xs text-muted-foreground mt-1">/api/proxy/*</div>
            <div className="mt-3 space-y-1 text-[10px] text-left">
              <div className="bg-emerald-200/50 dark:bg-emerald-800/30 rounded px-2 py-1">• Auth Middleware</div>
              <div className="bg-emerald-200/50 dark:bg-emerald-800/30 rounded px-2 py-1">• Token Injection</div>
              <div className="bg-emerald-200/50 dark:bg-emerald-800/30 rounded px-2 py-1">• Request Forwarding</div>
              <div className="bg-emerald-200/50 dark:bg-emerald-800/30 rounded px-2 py-1">• Error Handling</div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center">
            <ArrowRight size={20} className="text-muted-foreground hidden lg:block" />
            <ArrowDown size={20} className="text-muted-foreground lg:hidden" />
            <div className="text-xs text-muted-foreground font-medium">proxy</div>
          </div>

          {/* NestJS Backend */}
          <button
            onClick={onNavigateToCoreSystem}
            className="group bg-gradient-to-br from-rose-100 to-orange-50 dark:from-rose-900/40 dark:to-orange-800/20 rounded-xl px-6 py-4 border-2 border-rose-300 dark:border-rose-700 hover:border-rose-500 text-center min-w-[180px] transition-all"
          >
            <div className="flex items-center justify-center gap-2 text-base font-semibold text-rose-700 dark:text-rose-300 group-hover:text-rose-600">
              <Cpu size={18} />
              NestJS Backend
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
            <div className="text-xs text-muted-foreground mt-1">Core System (RESTful API)</div>
            <div className="mt-3 space-y-1 text-[10px] text-left">
              <div className="bg-rose-200/50 dark:bg-rose-800/30 rounded px-2 py-1">• Business Logic</div>
              <div className="bg-rose-200/50 dark:bg-rose-800/30 rounded px-2 py-1">• Data Persistence</div>
              <div className="bg-rose-200/50 dark:bg-rose-800/30 rounded px-2 py-1">• Authorization (OSO)</div>
            </div>
          </button>
        </div>

        {/* BFF Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t">
          <div className="flex items-start gap-2 p-3 bg-secondary/30 rounded-lg">
            <Lock size={16} className="text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-medium">API Keys Hidden</div>
              <div className="text-[10px] text-muted-foreground">Secrets only on server-side</div>
            </div>
          </div>
          <div className="flex items-start gap-2 p-3 bg-secondary/30 rounded-lg">
            <Shield size={16} className="text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-medium">Token Management</div>
              <div className="text-[10px] text-muted-foreground">Auto refresh on server</div>
            </div>
          </div>
          <div className="flex items-start gap-2 p-3 bg-secondary/30 rounded-lg">
            <Network size={16} className="text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-medium">No CORS Issues</div>
              <div className="text-[10px] text-muted-foreground">Server-to-server calls</div>
            </div>
          </div>
          <div className="flex items-start gap-2 p-3 bg-secondary/30 rounded-lg">
            <Settings size={16} className="text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-medium">Environment Isolation</div>
              <div className="text-[10px] text-muted-foreground">Config on server only</div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Tenant Deployment Architecture - NEW */}
      <div className="bg-gradient-to-br from-violet-50/50 to-indigo-50/50 dark:from-violet-900/10 dark:to-indigo-900/10 rounded-xl p-6 border-2 border-violet-300 dark:border-violet-700">
        <h4 className="font-semibold text-base mb-2 flex items-center gap-2">
          <Cloud size={18} className="text-violet-600" />
          Multi-Tenant Deployment Architecture
        </h4>
        <p className="text-xs text-muted-foreground mb-5">
          Same VPC, Same ACK Cluster | Public/Private Network Separation | Namespace Isolation
        </p>

        {/* Deployment Flow Diagram */}
        <div className="bg-card rounded-xl p-5 border mb-5">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-4">
            {/* User */}
            <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg px-4 py-3 text-center min-w-[120px]">
              <div className="flex items-center justify-center gap-2 font-semibold text-sm text-blue-700 dark:text-blue-300">
                <Globe size={16} />
                User
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">tenant-xxx.domain.com</div>
            </div>

            <ArrowRight size={18} className="text-muted-foreground hidden lg:block" />
            <ArrowDown size={18} className="text-muted-foreground lg:hidden" />

            {/* Public ALB */}
            <div className="bg-green-100 dark:bg-green-900/40 rounded-lg px-4 py-3 text-center min-w-[140px] relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-green-500 text-white text-[9px] font-semibold rounded-full flex items-center gap-1">
                <Globe size={10} /> Public
              </div>
              <div className="flex items-center justify-center gap-2 font-semibold text-sm text-green-700 dark:text-green-300 mt-1">
                <Server size={16} />
                Public ALB
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">HTTPS | *.domain.com</div>
              <div className="text-[9px] text-green-600 dark:text-green-400 mt-1">Wildcard Certificate</div>
            </div>

            <ArrowRight size={18} className="text-muted-foreground hidden lg:block" />
            <ArrowDown size={18} className="text-muted-foreground lg:hidden" />

            {/* PC Client Pod */}
            <div className="bg-emerald-100 dark:bg-emerald-900/40 rounded-lg px-4 py-3 text-center min-w-[140px]">
              <div className="flex items-center justify-center gap-2 font-semibold text-sm text-emerald-700 dark:text-emerald-300">
                <Monitor size={16} />
                PC Client Pod
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">Next.js + BFF</div>
              <div className="text-[9px] text-emerald-600 dark:text-emerald-400 mt-1">ns: tenant-xxx</div>
            </div>

            <div className="flex flex-col items-center">
              <ArrowRight size={18} className="text-muted-foreground hidden lg:block" />
              <ArrowDown size={18} className="text-muted-foreground lg:hidden" />
              <div className="text-[9px] text-orange-600 dark:text-orange-400 font-medium">Private</div>
            </div>

            {/* Private ALB */}
            <div className="bg-orange-100 dark:bg-orange-900/40 rounded-lg px-4 py-3 text-center min-w-[140px] relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-orange-500 text-white text-[9px] font-semibold rounded-full flex items-center gap-1">
                <Lock size={10} /> Private
              </div>
              <div className="flex items-center justify-center gap-2 font-semibold text-sm text-orange-700 dark:text-orange-300 mt-1">
                <Shield size={16} />
                Private ALB
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">mTLS / HMAC</div>
              <div className="text-[9px] text-orange-600 dark:text-orange-400 mt-1">Origin Validation</div>
            </div>

            <ArrowRight size={18} className="text-muted-foreground hidden lg:block" />
            <ArrowDown size={18} className="text-muted-foreground lg:hidden" />

            {/* NestJS Backend */}
            <button
              onClick={onNavigateToCoreSystem}
              className="group bg-rose-100 dark:bg-rose-900/40 rounded-lg px-4 py-3 text-center min-w-[140px] transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-center gap-2 font-semibold text-sm text-rose-700 dark:text-rose-300">
                <Cpu size={16} />
                Backend Pods
                <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" />
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">Main + Worker + ...</div>
              <div className="text-[9px] text-rose-600 dark:text-rose-400 mt-1">ns: tenant-xxx</div>
            </button>
          </div>

          {/* Network Isolation Legend */}
          <div className="flex justify-center gap-6 mt-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Public Exposure (Frontend)</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span>Private Network (Backend)</span>
            </div>
          </div>
        </div>

        {/* Secure Origin Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {/* mTLS Option */}
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600">
                <Key size={16} />
              </div>
              <div>
                <h5 className="text-sm font-semibold">mTLS (Mutual TLS)</h5>
                <span className="text-[10px] text-muted-foreground">Bidirectional Certificate Verification</span>
              </div>
              <Badge className="ml-auto bg-violet-100 text-violet-700 text-[9px] hover:bg-violet-100">Recommended</Badge>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={12} className="text-green-500 mt-0.5 shrink-0" />
                <span>Strongest origin validation, prevents request forgery</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={12} className="text-green-500 mt-0.5 shrink-0" />
                <span>Certificate lifecycle managed by ACM/KMS</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle size={12} className="text-amber-500 mt-0.5 shrink-0" />
                <span>Higher complexity, requires certificate rotation</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t text-[10px] text-muted-foreground">
              <strong>Best for:</strong> Financial, Government, High Security
            </div>
          </div>

          {/* HMAC Option */}
          <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <FileCheck size={16} />
              </div>
              <div>
                <h5 className="text-sm font-semibold">HMAC Signature</h5>
                <span className="text-[10px] text-muted-foreground">Request Signing Middleware</span>
              </div>
              <Badge className="ml-auto bg-blue-100 text-blue-700 text-[9px] hover:bg-blue-100">Simpler</Badge>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={12} className="text-green-500 mt-0.5 shrink-0" />
                <span>Shared secret signing, easy to implement</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={12} className="text-green-500 mt-0.5 shrink-0" />
                <span>Timestamp + nonce prevents replay attacks</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle size={12} className="text-amber-500 mt-0.5 shrink-0" />
                <span>Secret rotation requires synchronized deployment</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t text-[10px] text-muted-foreground">
              <strong>Best for:</strong> General SaaS, Rapid Deployment
            </div>
          </div>
        </div>

        {/* One-Stop Tenant Onboarding Flow */}
        <div className="bg-card rounded-lg p-4 border">
          <h5 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Workflow size={16} className="text-violet-600" />
            One-Stop Tenant Onboarding Flow
          </h5>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { step: "1", label: "Create Namespace", icon: Container },
              { step: "2", label: "Deploy Backend", icon: Server },
              { step: "3", label: "Deploy PC Client", icon: Monitor },
              { step: "4", label: "Create Subdomain", icon: Globe },
              { step: "5", label: "Bind Certificate", icon: Lock },
              { step: "6", label: "Configure Ingress", icon: Network },
              { step: "7", label: "Health Check", icon: CheckCircle2 },
            ].map((item, index) => (
              <div key={item.step} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600">
                    <item.icon size={18} />
                  </div>
                  <div className="text-[10px] font-medium mt-1">{item.label}</div>
                  <div className="text-[9px] text-muted-foreground">Step {item.step}</div>
                </div>
                {index < 6 && <ArrowRight size={14} className="text-muted-foreground mt-[-16px]" />}
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t text-xs text-muted-foreground text-center">
            Automated via <strong>Tenant Manager → Deploy Service</strong> | ROS/Terraform + AliDNS OpenAPI + Certificate Service
          </div>
        </div>
      </div>

      {/* Business Modules */}
      <div className="bg-gradient-to-br from-emerald-50/30 to-cyan-50/30 dark:from-emerald-900/5 dark:to-cyan-900/5 rounded-xl p-6 border">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-base flex items-center gap-2">
            <Blocks size={18} className="text-emerald-600" />
            Business Modules
          </h4>
          {onNavigateToCoreSystem && (
            <button
              onClick={onNavigateToCoreSystem}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              Powered by Core System <ChevronRight size={12} />
            </button>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Each module corresponds to a Controller in the Core System backend
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {businessModules.map((module) => (
            <div key={module.title} className="bg-card rounded-lg p-4 border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <module.icon size={16} />
                </div>
                <div>
                  <h5 className="text-sm font-semibold">{module.title}</h5>
                  <span className="text-[10px] text-muted-foreground">{module.subtitle}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{module.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Design Points */}
      <div className="bg-secondary/30 rounded-xl p-5 border">
        <h4 className="font-semibold mb-3 text-sm">Key Design Decisions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
            <span><strong>Proxy-First</strong> - BFF primarily forwards requests, minimal data aggregation</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
            <span><strong>SSR + CSR Hybrid</strong> - Server-side rendering for SEO, client-side for interactivity</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
            <span><strong>Type Safety</strong> - Shared TypeScript types between client and BFF</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
            <span><strong>Thin BFF</strong> - Business logic stays in NestJS, BFF only handles auth and forwarding</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
            <span><strong>Public/Private Separation</strong> - Frontend publicly exposed, backend only reachable via private network</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
            <span><strong>Wildcard Certificate</strong> - Simplifies multi-tenant cert management, can switch to dedicated certs later</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
            <span><strong>Private Origin + Validation</strong> - mTLS or HMAC prevents bypassing frontend for attacks</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
            <span><strong>Automated Onboarding</strong> - ROS/Terraform + OpenAPI for one-click full deployment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
