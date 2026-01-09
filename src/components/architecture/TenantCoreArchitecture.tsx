import { useState } from "react";
import { 
  Server, 
  Cpu, 
  Clock, 
  Search, 
  Database, 
  HardDrive,
  Layers,
  GitBranch,
  Mail,
  FileText,
  Trash2,
  Image,
  RefreshCw,
  Zap,
  Shield,
  Bell,
  FileOutput,
  Timer,
  Activity,
  Settings,
  Sparkles,
  Network,
  Cloud,
  Home,
  ImageIcon,
  Crop,
  Maximize2,
  FileType,
  X,
  Monitor,
  Smartphone,
  Globe,
  MessageSquare,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SystemFlowDiagram } from "./SystemFlowDiagram";
import { MessageQueueDiagram } from "./MessageQueueDiagram";
import { cn } from "@/lib/utils";

type PodType = "main" | "worker" | "routine" | "fts" | "imgproxy";

interface TenantCoreArchitectureProps {
  onNavigateToPCClient?: () => void;
}

// Storage dependency mapping - distinguish standalone/cloud
const podStorageMap: Record<PodType, {
  postgres?: string;
  redis?: string;
  objectStorage?: string;
  elasticsearch?: string;
  sls?: string;
}> = {
  main: {
    postgres: "R/W Business Data",
    redis: "Cache + Lock + Queue",
    objectStorage: "File Upload, URL Gen",
    elasticsearch: "Search Query (Read)",
    sls: "Log Output"
  },
  worker: {
    postgres: "R/W Task Data",
    redis: "Queue Consumer",
    objectStorage: "Export File Upload",
    sls: "Log Output"
  },
  routine: {
    postgres: "R/W Scheduled Tasks",
    redis: "Distributed Lock",
    sls: "Log Output"
  },
  fts: {
    redis: "Queue Consumer",
    objectStorage: "Download & Parse Files",
    elasticsearch: "Index R/W",
    sls: "Log Output"
  },
  imgproxy: {
    objectStorage: "Read Source Image",
  }
};

export function TenantCoreArchitecture({ onNavigateToPCClient }: TenantCoreArchitectureProps) {
  const [selectedPod, setSelectedPod] = useState<PodType | null>("main");
  
  const handlePodClick = (pod: PodType) => {
    setSelectedPod(selectedPod === pod ? null : pod);
  };
  
  return (
    <div className="space-y-8">
      {/* Overview Section */}
      <div className="bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-xl p-6 border">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Cpu size={18} />
          </div>
          <div>
            <h4 className="font-semibold text-base">Core System Overview</h4>
            <p className="text-xs text-muted-foreground">NestJS-based backend powering all tenant applications</p>
          </div>
        </div>
        
        {/* Horizontal Architecture Diagram */}
        <div className="bg-card rounded-lg border overflow-hidden">
          {/* Legend */}
          <div className="flex items-center gap-4 px-4 py-2 bg-secondary/30 border-b text-xs flex-wrap">
            <span className="text-muted-foreground font-medium">Legend:</span>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
              </div>
              <span className="text-muted-foreground">Stateless Pod</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md border-2 border-orange-500 bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center">
                <Database size={10} className="text-orange-600" />
              </div>
              <span className="text-muted-foreground">Stateful</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full border-2 border-slate-400 bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                <Monitor size={10} className="text-slate-600" />
              </div>
              <span className="text-muted-foreground">Client</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-8 border-t-2 border-slate-400"></div>
              <span className="text-muted-foreground">Sync</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-8 border-t-2 border-dashed border-orange-400"></div>
              <span className="text-muted-foreground">Async</span>
            </div>
          </div>
          
          {/* Main Diagram */}
          <div className="p-6">
            <div className="relative flex items-center justify-between gap-2">
              {/* Clients Column */}
              <div className="flex flex-col items-center gap-3 min-w-[80px]">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Clients</div>
                <button 
                  onClick={onNavigateToPCClient}
                  className="flex flex-col items-center gap-1 hover:scale-105 transition-transform"
                  title="View PC Client Architecture"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shadow-sm">
                    <Monitor size={16} className="text-emerald-600" />
                  </div>
                  <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400">PC</span>
                </button>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full border-2 border-blue-400 bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shadow-sm">
                    <MessageSquare size={16} className="text-blue-600" />
                  </div>
                  <span className="text-[10px] text-muted-foreground">Mini</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full border-2 border-purple-400 bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center shadow-sm">
                    <Smartphone size={16} className="text-purple-600" />
                  </div>
                  <span className="text-[10px] text-muted-foreground">Mobile</span>
                </div>
              </div>

              {/* Bidirectional Arrow: Clients ↔ Main (Request/Response) */}
              <div className="flex-1 flex items-center justify-center max-w-[70px]">
                <svg className="w-full h-12" viewBox="0 0 70 48">
                  <defs>
                    <marker id="arrowRight" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" className="fill-green-500" />
                    </marker>
                    <marker id="arrowLeft" markerWidth="8" markerHeight="6" refX="2" refY="3" orient="auto">
                      <polygon points="8 0, 0 3, 8 6" className="fill-green-500" />
                    </marker>
                  </defs>
                  {/* Request arrow (top) */}
                  <line x1="5" y1="18" x2="55" y2="18" className="stroke-green-500" strokeWidth="2" markerEnd="url(#arrowRight)" />
                  <text x="35" y="12" className="fill-green-600 text-[7px] font-medium" textAnchor="middle">Request</text>
                  {/* Response arrow (bottom) */}
                  <line x1="55" y1="30" x2="5" y2="30" className="stroke-green-500" strokeWidth="2" markerEnd="url(#arrowLeft)" />
                  <text x="35" y="42" className="fill-green-600 text-[7px] font-medium" textAnchor="middle">Response</text>
                </svg>
              </div>

              {/* Core Pod - Larger to show importance */}
              <div className="flex flex-col items-center min-w-[110px]">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Core</div>
                <div className="relative">
                  <div className="w-20 h-20 rounded-xl border-3 border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/30 flex items-center justify-center shadow-xl">
                    <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
                      <Server size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-white dark:border-slate-800 flex items-center justify-center">
                    <span className="text-[9px] text-white font-bold">✓</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-blue-700 dark:text-blue-400 mt-2">Main Pod</span>
                <span className="text-[10px] text-muted-foreground">API Gateway & Business</span>
              </div>

              {/* Arrow: Main → Redis MQ (Async Only - Dashed) */}
              <div className="flex-1 flex items-center justify-center max-w-[60px]">
                <svg className="w-full h-8" viewBox="0 0 60 32">
                  <defs>
                    <marker id="arrowhead2" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" className="fill-orange-400" />
                    </marker>
                  </defs>
                  <line x1="0" y1="16" x2="50" y2="16" className="stroke-orange-400" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arrowhead2)" />
                  <text x="25" y="10" className="fill-orange-500 text-[7px] font-medium" textAnchor="middle">Async Only</text>
                </svg>
              </div>

              {/* Async Processing Group - Boxed */}
              <div className="border-2 border-dashed border-orange-300 dark:border-orange-700 rounded-xl p-3 bg-orange-50/30 dark:bg-orange-900/10">
                <div className="flex items-center gap-4">
                  {/* Redis MQ */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-lg border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/40 dark:to-orange-800/30 flex items-center justify-center shadow-md">
                      <Database size={18} className="text-orange-600" />
                    </div>
                    <span className="text-[10px] font-semibold text-orange-700 dark:text-orange-400 mt-1">Redis MQ</span>
                  </div>

                  {/* Arrow inside box */}
                  <svg className="w-8 h-6" viewBox="0 0 32 24">
                    <defs>
                      <marker id="arrowhead3" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
                        <polygon points="0 0, 6 2.5, 0 5" className="fill-slate-400" />
                      </marker>
                    </defs>
                    <line x1="0" y1="12" x2="24" y2="12" className="stroke-slate-400" strokeWidth="1.5" markerEnd="url(#arrowhead3)" />
                  </svg>

                  {/* Satellite Pods - Smaller */}
                  <div className="flex flex-col items-center">
                    <div className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Satellites</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-8 h-8 rounded-md border-2 border-green-500 bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        </div>
                        <span className="text-[8px] text-green-700 dark:text-green-400">Worker</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-8 h-8 rounded-md border-2 border-amber-500 bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        </div>
                        <span className="text-[8px] text-amber-700 dark:text-amber-400">Routine</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-8 h-8 rounded-md border-2 border-purple-500 bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                        </div>
                        <span className="text-[8px] text-purple-700 dark:text-purple-400">FTS</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 relative">
                        <div className="w-8 h-8 rounded-md border-2 border-pink-500 bg-pink-50 dark:bg-pink-900/30 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                        </div>
                        <span className="text-[8px] text-pink-700 dark:text-pink-400">Imgproxy</span>
                        <div className="absolute -top-0.5 -right-0.5 px-0.5 py-0 rounded text-[6px] font-bold bg-orange-500 text-white leading-tight">SA</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-[9px] text-orange-600 dark:text-orange-400 font-medium">Async Processing Zone</span>
                </div>
              </div>
            </div>

            {/* Storage Layer Bar */}
            <div className="mt-6 pt-4 border-t border-dashed">
              <div className="flex items-center justify-center gap-4">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Storage:</div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-blue-500/10 border border-blue-500/30">
                    <Database size={12} className="text-blue-500" />
                    <span className="text-xs text-blue-700 dark:text-blue-400">PostgreSQL</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-red-500/10 border border-red-500/30">
                    <Zap size={12} className="text-red-500" />
                    <span className="text-xs text-red-700 dark:text-red-400">Redis</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/30">
                    <Search size={12} className="text-yellow-600" />
                    <span className="text-xs text-yellow-700 dark:text-yellow-400">ES</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-orange-500/10 border border-orange-500/30">
                    <HardDrive size={12} className="text-orange-500" />
                    <span className="text-xs text-orange-700 dark:text-orange-400">OSS/MinIO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Facts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-card rounded-lg p-3 border">
            <div className="text-xs text-muted-foreground mb-1">Compute</div>
            <div className="text-sm font-medium">5 Pods (1 Core + 4 Satellite)</div>
          </div>
          <div className="bg-card rounded-lg p-3 border">
            <div className="text-xs text-muted-foreground mb-1">Communication</div>
            <div className="text-sm font-medium">Sync HTTP + Async MQ</div>
          </div>
          <div className="bg-card rounded-lg p-3 border">
            <div className="text-xs text-muted-foreground mb-1">Storage</div>
            <div className="text-sm font-medium">PostgreSQL, Redis, ES, OSS/MinIO</div>
          </div>
        </div>
      </div>

      {/* Served Clients Section */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Globe size={18} />
            </div>
            <div>
              <h4 className="font-semibold text-base">Served Clients</h4>
              <p className="text-xs text-muted-foreground">All platforms call the same RESTful API</p>
            </div>
          </div>
          {onNavigateToPCClient && (
            <button
              onClick={onNavigateToPCClient}
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1.5 rounded-lg"
            >
              View PC Client Details <ChevronRight size={12} />
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={onNavigateToPCClient}
            className="group bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-4 border-2 border-emerald-200 dark:border-emerald-800 hover:border-emerald-500 transition-all text-left"
          >
            <div className="flex items-center gap-2 mb-2">
              <Monitor size={18} className="text-emerald-600" />
              <span className="font-semibold text-sm group-hover:text-emerald-600 transition-colors">PC Client</span>
              <ChevronRight size={14} className="text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-1 transition-all ml-auto" />
            </div>
            <p className="text-xs text-muted-foreground">Next.js + BFF Proxy</p>
            <p className="text-xs text-muted-foreground mt-1">Primary desktop application with admin portal</p>
          </button>
          
          <div className="bg-slate-50 dark:bg-slate-900/20 rounded-lg p-4 border">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare size={18} className="text-blue-600" />
              <span className="font-semibold text-sm">Mini Program</span>
            </div>
            <p className="text-xs text-muted-foreground">WeChat / Alipay</p>
            <p className="text-xs text-muted-foreground mt-1">Direct API calls with SDK</p>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900/20 rounded-lg p-4 border opacity-60">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone size={18} className="text-purple-600" />
              <span className="font-semibold text-sm">Mobile Apps</span>
            </div>
            <p className="text-xs text-muted-foreground">iOS / Android</p>
            <p className="text-xs text-muted-foreground mt-1">Native apps (coming soon)</p>
          </div>
        </div>
      </div>

      {/* System Data Flow - Standalone Section */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Network size={18} />
          </div>
          <div>
            <h4 className="font-semibold text-base">System Data Flow</h4>
            <p className="text-xs text-muted-foreground">Complete interaction flow between all system components</p>
          </div>
        </div>
        <SystemFlowDiagram />
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="compute" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compute">Compute Layer</TabsTrigger>
          <TabsTrigger value="storage">Storage Layer</TabsTrigger>
          <TabsTrigger value="queue">Message Queue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="compute" className="mt-6">
          
          {/* Pod Overview - 5 columns in one row */}
          <div className="bg-card border border-border rounded-xl p-6">
            <SectionHeader 
              icon={Layers} 
              title="Compute Layer Pods" 
              subtitle="5 Deployments, separated by responsibility (click to view storage dependencies)"
            />
            
            <div className="grid grid-cols-5 gap-4 mt-6">
              <PodOverviewCard
                pod="main"
                name="main"
                label="Core App"
                labelColor="bg-blue-500"
                icon={Server}
                color="blue"
                description="Business API & Data, Full NestJS Stack"
                isSelected={selectedPod === "main"}
                onClick={() => handlePodClick("main")}
              />
              <PodOverviewCard
                pod="worker"
                name="worker"
                label="Satellite"
                labelColor="bg-green-500"
                icon={Cpu}
                color="green"
                description="Pure Consumer: Email, CSV Export"
                isSelected={selectedPod === "worker"}
                onClick={() => handlePodClick("worker")}
              />
              <PodOverviewCard
                pod="routine"
                name="routine"
                label="Satellite"
                labelColor="bg-orange-500"
                icon={Clock}
                color="orange"
                description="Pure Executor: Cleanup, Maintenance"
                isSelected={selectedPod === "routine"}
                onClick={() => handlePodClick("routine")}
              />
              <PodOverviewCard
                pod="fts"
                name="fts"
                label="Satellite"
                labelColor="bg-purple-500"
                icon={Search}
                color="purple"
                description="Standalone: File Parse, ES Index"
                isSelected={selectedPod === "fts"}
                onClick={() => handlePodClick("fts")}
              />
              <PodOverviewCard
                pod="imgproxy"
                name="imgproxy"
                label="Base Svc"
                labelColor="bg-pink-500"
                icon={ImageIcon}
                color="pink"
                description="Image Processing: Crop, Resize, Watermark"
                badge="Standalone"
                badgeIcon={Home}
                isSelected={selectedPod === "imgproxy"}
                onClick={() => handlePodClick("imgproxy")}
              />
            </div>
            
            {/* Expanded Pod Detail */}
            {selectedPod && (
              <ExpandedPodDetail 
                pod={selectedPod} 
                onClose={() => setSelectedPod(null)} 
              />
            )}

          </div>
        </TabsContent>
        
        <TabsContent value="storage" className="mt-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <SectionHeader 
              icon={Database} 
              title="Storage Layer" 
              subtitle="Persistence services, categorized by Common / Standalone / Cloud"
            />
            
            {/* Common Storage */}
            <div className="mt-6 mb-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Network className="h-4 w-4" />
                Common Storage (All Deployment Modes)
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <StorageCard
                  name="PostgreSQL"
                  type="Managed / External"
                  icon={Database}
                  color="blue"
                  description="Business Data R/W"
                  consumers={["main", "worker", "routine"]}
                  selectedPod={selectedPod}
                />
                <StorageCard
                  name="Redis"
                  type="Managed / External"
                  icon={Zap}
                  color="red"
                  description="Cache + MQ + Lock"
                  consumers={["main", "worker", "routine", "fts"]}
                  selectedPod={selectedPod}
                />
                <StorageCard
                  name="ElasticSearch"
                  type="Managed / External"
                  icon={Search}
                  color="yellow"
                  description="Full-Text Search Index"
                  consumers={["main", "fts"]}
                  selectedPod={selectedPod}
                />
              </div>
            </div>

            {/* Standalone vs Cloud Storage */}
            <div className="grid grid-cols-2 gap-6">
              {/* Standalone Deployment Storage */}
              <div className="border border-dashed border-orange-500/30 rounded-lg p-4 bg-orange-500/5">
                <h4 className="text-sm font-medium text-orange-400 mb-3 flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Standalone Deployment
                </h4>
                <div className="space-y-3">
                  <StorageCard
                    name="MinIO"
                    type="StatefulSet + PVC"
                    icon={HardDrive}
                    color="orange"
                    description="S3-Compatible Object Storage"
                    consumers={["main", "worker", "fts", "imgproxy"]}
                    pvc="minio-data"
                    selectedPod={selectedPod}
                  />
                  <div className="text-xs text-muted-foreground bg-background/50 rounded p-2">
                    <div className="flex items-center gap-1 text-orange-400 mb-1">
                      <ImageIcon className="h-3 w-3" />
                      <span className="font-medium">Imgproxy Note</span>
                    </div>
                    MinIO only provides storage without image processing. Imgproxy reads source images from MinIO and provides crop/resize/watermark processing.
                  </div>
                </div>
              </div>

              {/* Cloud Deployment Storage */}
              <div className="border border-dashed border-cyan-500/30 rounded-lg p-4 bg-cyan-500/5">
                <h4 className="text-sm font-medium text-cyan-400 mb-3 flex items-center gap-2">
                  <Cloud className="h-4 w-4" />
                  Cloud Deployment
                </h4>
                <div className="space-y-3">
                  <StorageCard
                    name="OSS"
                    type="Alibaba Cloud Object Storage"
                    icon={Cloud}
                    color="cyan"
                    description="File Storage + Image Processing"
                    consumers={["main", "worker", "fts"]}
                    selectedPod={selectedPod}
                  />
                  <StorageCard
                    name="SLS"
                    type="Alibaba Cloud Log Service"
                    icon={FileText}
                    color="cyan"
                    description="Centralized Log Collection"
                    consumers={["main", "worker", "routine", "fts"]}
                    selectedPod={selectedPod}
                  />
                  <div className="text-xs text-muted-foreground bg-background/50 rounded p-2">
                    <div className="flex items-center gap-1 text-cyan-400 mb-1">
                      <ImageIcon className="h-3 w-3" />
                      <span className="font-medium">OSS Image Processing</span>
                    </div>
                    OSS has built-in image processing, no Imgproxy needed. Imgproxy Pod is not deployed in cloud mode.
                  </div>
                </div>
              </div>
            </div>
            
            {/* Storage Role Details */}
            <div className="mt-6 border-t pt-6">
              <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
                <FileText size={16} className="text-blue-500" />
                Storage Role Details
              </h4>
              
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-semibold w-32">Storage</th>
                      <th className="text-left py-2 px-3 font-semibold">Role & Stored Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-dashed">
                      <td className="py-3 px-3 align-top">
                        <div className="flex items-center gap-2">
                          <Database size={14} className="text-blue-500" />
                          <span className="font-medium">PostgreSQL</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-blue-400 mb-1">Core Business Data Storage</div>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Users, tenants, permissions and core tables</li>
                          <li>• Form definitions and data records</li>
                          <li>• Workflow definitions and instance states</li>
                          <li>• System configurations and audit logs</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="border-b border-dashed">
                      <td className="py-3 px-3 align-top">
                        <div className="flex items-center gap-2">
                          <Zap size={14} className="text-red-500" />
                          <span className="font-medium">Redis</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-red-400 mb-1">Cache + Message Queue + Distributed Lock</div>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Session storage and token caching</li>
                          <li>• Hot data cache (configs, permission trees)</li>
                          <li>• Message queue (replaces RabbitMQ/Kafka)</li>
                          <li>• Distributed locks (prevent duplicate task execution)</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="border-b border-dashed">
                      <td className="py-3 px-3 align-top">
                        <div className="flex items-center gap-2">
                          <Search size={14} className="text-yellow-500" />
                          <span className="font-medium">ElasticSearch</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-yellow-400 mb-1">Full-Text Search Service</div>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Document and attachment content indexing</li>
                          <li>• Complex query conditions with fast retrieval</li>
                          <li>• Search result highlighting</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="border-b border-dashed">
                      <td className="py-3 px-3 align-top">
                        <div className="flex items-center gap-2">
                          <HardDrive size={14} className="text-orange-500" />
                          <span className="font-medium">OSS / MinIO</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-orange-400 mb-1">Object Storage</div>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• User-uploaded files and attachments</li>
                          <li>• Exported CSV/Excel files</li>
                          <li>• Image storage and processing (OSS built-in for Cloud mode)</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 align-top">
                        <div className="flex items-center gap-2">
                          <FileText size={14} className="text-cyan-500" />
                          <span className="font-medium">SLS</span>
                          <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-1.5 rounded">Cloud</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-cyan-400 mb-1">Log Service (Cloud Mode Only)</div>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Centralized log collection</li>
                          <li>• Log querying and analysis</li>
                          <li>• Alert configuration</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="queue" className="mt-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <SectionHeader 
              icon={GitBranch} 
              title="Message Queue Design" 
              subtitle="Lightweight message queue based on Redis"
            />
            
            <div className="mt-6">
              <MessageQueueDiagram />
            </div>
            
            {/* Queue Usage Scenarios */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
                <Activity size={16} className="text-blue-500" />
                Queue Usage Scenarios
              </h4>
              
              <div className="space-y-4">
                {/* Notification Queue */}
                <div className="border border-blue-500/20 rounded-lg p-4 bg-blue-500/5">
                  <h5 className="text-xs font-semibold text-blue-400 mb-3 flex items-center gap-2">
                    <Bell size={14} />
                    Notification Queue
                  </h5>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-3 bg-background/50 rounded p-2">
                      <code className="font-mono text-blue-300 min-w-[140px]">mail.send</code>
                      <span className="text-muted-foreground">Send email after user registration or approval completion</span>
                      <span className="ml-auto text-green-400">→ Worker</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 rounded p-2">
                      <code className="font-mono text-blue-300 min-w-[140px]">notification.send</code>
                      <span className="text-muted-foreground">Push notifications for announcements or task assignments</span>
                      <span className="ml-auto text-green-400">→ Worker</span>
                    </div>
                  </div>
                </div>
                
                {/* Data Processing Queue */}
                <div className="border border-green-500/20 rounded-lg p-4 bg-green-500/5">
                  <h5 className="text-xs font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <FileOutput size={14} />
                    Data Processing Queue
                  </h5>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-3 bg-background/50 rounded p-2">
                      <code className="font-mono text-green-300 min-w-[140px]">export.csv</code>
                      <span className="text-muted-foreground">Async report generation when exporting large datasets</span>
                      <span className="ml-auto text-green-400">→ Worker</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 rounded p-2">
                      <code className="font-mono text-green-300 min-w-[140px]">data.sync</code>
                      <span className="text-muted-foreground">Sync data changes to third-party systems</span>
                      <span className="ml-auto text-green-400">→ Worker</span>
                    </div>
                  </div>
                </div>
                
                {/* Search Index Queue */}
                <div className="border border-purple-500/20 rounded-lg p-4 bg-purple-500/5">
                  <h5 className="text-xs font-semibold text-purple-400 mb-3 flex items-center gap-2">
                    <Search size={14} />
                    Search Index Queue
                  </h5>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-3 bg-background/50 rounded p-2">
                      <code className="font-mono text-purple-300 min-w-[140px]">fts.index.create</code>
                      <span className="text-muted-foreground">Parse uploaded files and build search index</span>
                      <span className="ml-auto text-purple-400">→ FTS</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 rounded p-2">
                      <code className="font-mono text-purple-300 min-w-[140px]">fts.index.delete</code>
                      <span className="text-muted-foreground">Remove index from ES when record is deleted</span>
                      <span className="ml-auto text-purple-400">→ FTS</span>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <BenefitCard
                icon={Shield}
                title="Reliability"
                description="Message persistence with retry mechanism"
              />
              <BenefitCard
                icon={Zap}
                title="Performance"
                description="Native Redis, low latency high throughput"
              />
              <BenefitCard
                icon={Settings}
                title="Simplicity"
                description="No additional MQ middleware required"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Expanded Pod Detail Component (shown when pod is clicked)
const podDetailsConfig: Record<PodType, {
  title: string;
  color: string;
  icon: any;
  responsibilities: { icon: any; text: string }[];
  tech: { label: string; value: string }[];
  note?: { icon: any; title: string; content: string; color: string };
}> = {
  main: {
    title: "main Pod Details",
    color: "blue",
    icon: Server,
    responsibilities: [
      { icon: Network, text: "HTTP API Service: Handle all business REST API requests" },
      { icon: Zap, text: "WebSocket Connection: Real-time message push" },
      { icon: Shield, text: "Business Logic: Data validation, permission check" },
      { icon: GitBranch, text: "Message Producer: Publish async tasks to Redis Queue" },
      { icon: FileText, text: "File URL Generation: Generate OSS/MinIO access links" },
      { icon: Search, text: "Search Query: Execute full-text search and return results" }
    ],
    tech: [
      { label: "Framework", value: "NestJS + Drizzle ORM" },
      { label: "Auth", value: "JWT + RBAC" },
      { label: "Cache", value: "Redis (ioredis)" },
      { label: "Logging", value: "Alibaba Cloud SLS" },
      { label: "API Docs", value: "Swagger / OpenAPI" }
    ]
  },
  worker: {
    title: "worker Pod Details",
    color: "green",
    icon: Cpu,
    responsibilities: [
      { icon: Mail, text: "Email Sending: Call mail service API to send notifications" },
      { icon: FileOutput, text: "CSV Export: Generate export files and upload to OSS/MinIO" },
      { icon: Bell, text: "Push Notifications: Send app push, mini-program messages" },
      { icon: GitBranch, text: "Workflow Execution: Execute approval flow nodes" },
      { icon: RefreshCw, text: "Data Sync: Sync data with third-party systems" }
    ],
    tech: [
      { label: "Queue", value: "BullMQ / Custom Redis Queue" },
      { label: "Concurrency", value: "Configurable worker count" },
      { label: "Retry", value: "Exponential backoff" },
      { label: "Dead Letter", value: "Failed task isolation" },
      { label: "Monitoring", value: "Task status tracking" }
    ]
  },
  routine: {
    title: "routine Pod Details",
    color: "orange",
    icon: Clock,
    responsibilities: [
      { icon: Trash2, text: "Scheduled Cleanup: Clean expired logs and temp files" },
      { icon: Activity, text: "Data Maintenance: Periodic maintenance (stats aggregation)" },
      { icon: Image, text: "Image Generation: Generate report images periodically" },
      { icon: Activity, text: "Health Check: Periodically check dependency services" },
      { icon: Timer, text: "Expiry Handling: Handle timeout approvals, expired todos" }
    ],
    tech: [
      { label: "Scheduler", value: "node-cron / @nestjs/schedule" },
      { label: "Dist Lock", value: "Redis (prevent duplicates)" },
      { label: "Config", value: "ConfigMap dynamic config" },
      { label: "Logging", value: "Execution logs" },
      { label: "Alerting", value: "Failed task alerts" }
    ]
  },
  fts: {
    title: "fts Pod Details",
    color: "purple",
    icon: Search,
    responsibilities: [
      { icon: FileText, text: "Attachment Parsing: Download files from OSS/MinIO and extract text" },
      { icon: Database, text: "ES Index Creation: Build full-text search indexes" },
      { icon: Trash2, text: "Index Maintenance: Clean up indexes when files are deleted" },
      { icon: Search, text: "Search Service: Provide full-text search API" }
    ],
    tech: [
      { label: "Parsers", value: "pdf-parse, mammoth, xlsx" },
      { label: "ES Client", value: "@elastic/elasticsearch" },
      { label: "Tokenizer", value: "IK Analyzer + Kuromoji" },
      { label: "Queue", value: "Redis (file parse tasks)" },
      { label: "Rate Limit", value: "Parse concurrency control" }
    ]
  },
  imgproxy: {
    title: "imgproxy Pod Details",
    color: "pink",
    icon: ImageIcon,
    responsibilities: [
      { icon: Crop, text: "Image Cropping: Crop images to specified dimensions" },
      { icon: Maximize2, text: "Image Scaling: Generate thumbnails at different resolutions" },
      { icon: Sparkles, text: "Watermarking: Add image watermarks" },
      { icon: FileType, text: "Format Conversion: WebP/AVIF modern format conversion" }
    ],
    tech: [
      { label: "Engine", value: "imgproxy (Go)" },
      { label: "Storage", value: "MinIO S3 Protocol" },
      { label: "Cache", value: "Processed result cache" },
      { label: "Security", value: "URL signature anti-hotlink" },
      { label: "Formats", value: "JPEG, PNG, WebP, AVIF, GIF" }
    ],
    note: {
      icon: Home,
      title: "Standalone Only",
      content: "Imgproxy is only used in standalone deployment mode to supplement MinIO's lack of image processing. In cloud deployment, OSS has built-in image processing, no Imgproxy needed.",
      color: "orange"
    }
  }
};

const ExpandedPodDetail = ({ pod, onClose }: { pod: PodType; onClose: () => void }) => {
  const config = podDetailsConfig[pod];
  
  const colorClasses: Record<string, { border: string; text: string; icon: string }> = {
    blue: { border: "border-border", text: "text-blue-400", icon: "text-blue-400" },
    green: { border: "border-border", text: "text-green-400", icon: "text-green-400" },
    orange: { border: "border-border", text: "text-orange-400", icon: "text-orange-400" },
    purple: { border: "border-border", text: "text-purple-400", icon: "text-purple-400" },
    pink: { border: "border-border", text: "text-pink-400", icon: "text-pink-400" }
  };
  
  const colors = colorClasses[config.color];
  const Icon = config.icon;
  
  return (
    <div className={`mt-4 border ${colors.border} rounded-lg p-5 bg-card/50 animate-in slide-in-from-top-2 duration-200`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${colors.icon}`} />
          <h4 className={`font-semibold ${colors.text}`}>{config.title}</h4>
        </div>
        <button 
          onClick={onClose}
          className="p-1 rounded hover:bg-secondary transition-colors"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Responsibilities */}
        <div>
          <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Core Responsibilities</h5>
          <div className="space-y-2">
            {config.responsibilities.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <ItemIcon className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${colors.icon}`} />
                  <span className="text-muted-foreground">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Tech Stack */}
        <div>
          <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Technology Stack</h5>
          <div className="space-y-2">
            {config.tech.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{item.label}</span>
                <span className={`font-medium ${colors.text}`}>{item.value}</span>
              </div>
            ))}
          </div>
          
          {/* Note if exists */}
          {config.note && (
            <div className={`mt-4 p-3 rounded-lg bg-${config.note.color}-500/10 border border-${config.note.color}-500/20`}>
              <div className={`flex items-center gap-1.5 text-${config.note.color}-400 mb-1`}>
                <config.note.icon className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">{config.note.title}</span>
              </div>
              <p className="text-xs text-muted-foreground">{config.note.content}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Storage Dependencies */}
      <div className="mt-4 pt-4 border-t">
        <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Storage Dependencies</h5>
        <div className="flex flex-wrap gap-2">
          {Object.entries(podStorageMap[pod]).map(([storage, usage]) => (
            <div key={storage} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 text-xs">
              <span className="font-medium">{storage}:</span>
              <span className="text-muted-foreground">{usage}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper Components
const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle: string }) => (
  <div className="flex items-start gap-3">
    <div className="p-2 rounded-lg bg-primary/10">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  </div>
);

const PodOverviewCard = ({
  pod,
  name,
  label,
  labelColor,
  icon: Icon,
  color,
  description,
  badge,
  badgeIcon: BadgeIcon,
  isSelected,
  onClick
}: {
  pod: PodType;
  name: string;
  label: string;
  labelColor: string;
  icon: any;
  color: string;
  description: string;
  badge?: string;
  badgeIcon?: any;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const colorClasses: Record<string, string> = {
    blue: "border-blue-500/50 bg-blue-500/5",
    green: "border-green-500/50 bg-green-500/5",
    orange: "border-orange-500/50 bg-orange-500/5",
    purple: "border-purple-500/50 bg-purple-500/5",
    pink: "border-pink-500/50 bg-pink-500/5"
  };
  
  const textClasses: Record<string, string> = {
    blue: "text-blue-400",
    green: "text-green-400",
    orange: "text-orange-400",
    purple: "text-purple-400",
    pink: "text-pink-400"
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative p-4 rounded-xl border-2 transition-all duration-200 text-left",
        isSelected ? colorClasses[color] : "border-border hover:border-primary/30",
        "hover:shadow-md"
      )}
    >
      {/* Label */}
      <div className={cn("absolute -top-2 left-3 px-2 py-0.5 rounded text-[10px] font-medium text-white", labelColor)}>
        {label}
      </div>
      
      {/* Badge */}
      {badge && BadgeIcon && (
        <div className="absolute -top-2 right-3 px-2 py-0.5 rounded text-[10px] font-medium bg-orange-500/20 text-orange-400 flex items-center gap-1">
          <BadgeIcon className="h-3 w-3" />
          {badge}
        </div>
      )}
      
      {/* Content */}
      <div className="mt-2">
        <div className="flex items-center gap-2 mb-2">
          <Icon className={cn("h-5 w-5", textClasses[color])} />
          <span className={cn("font-semibold", textClasses[color])}>{name}</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </button>
  );
};

const StorageCard = ({
  name,
  type,
  icon: Icon,
  color,
  description,
  consumers,
  pvc,
  selectedPod
}: {
  name: string;
  type: string;
  icon: any;
  color: string;
  description: string;
  consumers: string[];
  pvc?: string;
  selectedPod: PodType | null;
}) => {
  const isHighlighted = selectedPod && consumers.includes(selectedPod);
  
  const colorClasses: Record<string, string> = {
    blue: "border-blue-500/50 bg-blue-500/10",
    red: "border-red-500/50 bg-red-500/10",
    yellow: "border-yellow-500/50 bg-yellow-500/10",
    orange: "border-orange-500/50 bg-orange-500/10",
    cyan: "border-cyan-500/50 bg-cyan-500/10"
  };
  
  const textClasses: Record<string, string> = {
    blue: "text-blue-400",
    red: "text-red-400",
    yellow: "text-yellow-400",
    orange: "text-orange-400",
    cyan: "text-cyan-400"
  };

  return (
    <div className={cn(
      "p-4 rounded-lg border transition-all duration-200",
      isHighlighted ? colorClasses[color] : "border-border bg-card/50"
    )}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={cn("h-5 w-5", textClasses[color])} />
        <div>
          <span className={cn("font-semibold", textClasses[color])}>{name}</span>
          <span className="text-xs text-muted-foreground ml-2">({type})</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-2">{description}</p>
      {pvc && (
        <div className="text-[10px] text-muted-foreground">
          PVC: <code className="px-1 py-0.5 rounded bg-secondary">{pvc}</code>
        </div>
      )}
      <div className="flex flex-wrap gap-1 mt-2">
        {consumers.map(c => (
          <span 
            key={c} 
            className={cn(
              "px-1.5 py-0.5 rounded text-[10px]",
              selectedPod === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            )}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
};

const BenefitCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="p-4 rounded-lg border bg-card/50">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="h-5 w-5 text-primary" />
      <span className="font-semibold text-sm">{title}</span>
    </div>
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
);

