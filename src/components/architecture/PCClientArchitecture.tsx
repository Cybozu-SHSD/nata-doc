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
  Cpu
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
        </div>
      </div>
    </div>
  );
}
