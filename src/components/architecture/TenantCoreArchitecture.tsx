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
  Container,
  Cloud,
  Home,
  ImageIcon,
  Crop,
  Maximize2,
  FileType,
  X
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SystemFlowDiagram } from "./SystemFlowDiagram";
import { MessageQueueDiagram } from "./MessageQueueDiagram";

type PodType = "main" | "worker" | "routine" | "fts" | "imgproxy";

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

export function TenantCoreArchitecture() {
  const [selectedPod, setSelectedPod] = useState<PodType | null>(null);
  
  const handlePodClick = (pod: PodType) => {
    setSelectedPod(selectedPod === pod ? null : pod);
  };
  
  return (
    <div className="space-y-8">
      {/* System Flow Diagram */}
      <div className="bg-card border border-border rounded-xl p-6">
        <SystemFlowDiagram />
      </div>
      
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

      {/* Storage Layer - by deployment mode */}
      <div className="bg-card border border-border rounded-xl p-6">
        <SectionHeader 
          icon={Database} 
          title="Storage Layer" 
          subtitle={selectedPod ? `Storage used by ${selectedPod} Pod is highlighted` : "Persistence services, categorized by Common / Standalone / Cloud"}
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
      </div>

      {/* Message Queue Design */}
      <div className="bg-card border border-border rounded-xl p-6">
        <SectionHeader 
          icon={GitBranch} 
          title="Message Queue Design" 
          subtitle="Lightweight message queue based on Redis"
        />
        
        <div className="mt-6">
          <MessageQueueDiagram />
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
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

      {/* Kubernetes Resources */}
      <div className="bg-card border border-border rounded-xl p-6">
        <SectionHeader 
          icon={Container} 
          title="Kubernetes Resources" 
          subtitle="Categorized by resource type"
        />
        
        <div className="grid grid-cols-4 gap-4 mt-6">
          <K8sResourceGroup
            title="Workloads"
            items={[
              { name: "main", type: "Deployment" },
              { name: "worker", type: "Deployment" },
              { name: "routine", type: "Deployment" },
              { name: "fts", type: "Deployment" },
              { name: "imgproxy", type: "Deployment", badge: "Standalone" },
              { name: "minio", type: "StatefulSet", badge: "Standalone" },
            ]}
          />
          <K8sResourceGroup
            title="Services"
            items={[
              { name: "main-svc", type: "ClusterIP" },
              { name: "minio-svc", type: "ClusterIP", badge: "Standalone" },
              { name: "imgproxy-svc", type: "ClusterIP", badge: "Standalone" },
            ]}
          />
          <K8sResourceGroup
            title="Storage"
            items={[
              { name: "minio-data", type: "PVC", badge: "Standalone" },
              { name: "logs-pvc", type: "PVC" },
              { name: "temp-pvc", type: "PVC" },
            ]}
          />
          <K8sResourceGroup
            title="Config"
            items={[
              { name: "app-config", type: "ConfigMap" },
              { name: "app-secrets", type: "Secret" },
            ]}
          />
        </div>
      </div>

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
      { label: "Framework", value: "NestJS + TypeORM" },
      { label: "Auth", value: "JWT + RBAC" },
      { label: "Cache", value: "Redis (ioredis)" },
      { label: "Logging", value: "Winston / Pino" },
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
      { label: "Tokenizer", value: "IK Chinese Analyzer" },
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
          className="p-1 hover:bg-background/50 rounded transition-colors"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      
      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Responsibilities */}
        <div className="border border-border/50 rounded-lg p-4 bg-background/30">
          <div className="flex items-center gap-2 mb-3">
            <config.icon className="h-4 w-4 text-primary" />
            <h5 className="font-medium text-sm">Core Responsibilities</h5>
          </div>
          <div className="space-y-2">
            {config.responsibilities.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <item.icon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Tech Implementation */}
        <div className="border border-border/50 rounded-lg p-4 bg-background/30">
          <div className="flex items-center gap-2 mb-3">
            <Settings className="h-4 w-4 text-primary" />
            <h5 className="font-medium text-sm">Tech Implementation</h5>
          </div>
          <div className="space-y-2">
            {config.tech.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-mono text-xs bg-background/50 px-2 py-0.5 rounded">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Storage Dependencies */}
      <div className="mt-4">
        <StorageDependencies pod={pod} />
      </div>
      
      {/* Optional Note */}
      {config.note && (
        <div className={`mt-4 bg-${config.note.color}-500/10 border border-${config.note.color}-500/30 rounded-lg p-3`}>
          <div className={`flex items-center gap-2 text-${config.note.color}-400 mb-1`}>
            <config.note.icon className="h-4 w-4" />
            <span className="font-medium text-sm">{config.note.title}</span>
          </div>
          <p className="text-sm text-muted-foreground">{config.note.content}</p>
        </div>
      )}
    </div>
  );
};


// Helper Components
const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle: string }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 rounded-lg bg-primary/10">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  </div>
);

// Storage usage badges for pod cards
const StorageUsageBadges = ({ pod }: { pod: PodType }) => {
  const deps = podStorageMap[pod];
  const badges: { name: string; color: string }[] = [];
  
  if (deps.postgres) badges.push({ name: "PG", color: "bg-blue-500/20 text-blue-400" });
  if (deps.redis) badges.push({ name: "Redis", color: "bg-red-500/20 text-red-400" });
  if (deps.objectStorage) badges.push({ name: pod === "imgproxy" ? "MinIO" : "OSS/MinIO", color: "bg-cyan-500/20 text-cyan-400" });
  if (deps.elasticsearch) badges.push({ name: "ES", color: "bg-yellow-500/20 text-yellow-400" });
  if (deps.sls) badges.push({ name: "SLS", color: "bg-cyan-500/20 text-cyan-400" });
  
  return (
    <div className="flex flex-wrap gap-1 mt-3 pt-2 border-t border-border/30">
      <span className="text-[10px] text-muted-foreground mr-1">Uses:</span>
      {badges.map(b => (
        <span key={b.name} className={`text-[10px] px-1.5 py-0.5 rounded ${b.color}`}>
          {b.name}
        </span>
      ))}
    </div>
  );
};

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
  isSelected?: boolean;
  onClick?: () => void;
}) => {
  const colorClasses: Record<string, string> = {
    blue: "border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10",
    green: "border-green-500/30 bg-green-500/5 hover:bg-green-500/10",
    orange: "border-orange-500/30 bg-orange-500/5 hover:bg-orange-500/10",
    purple: "border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10",
    pink: "border-pink-500/30 bg-pink-500/5 hover:bg-pink-500/10",
  };
  
  const selectedClasses: Record<string, string> = {
    blue: "ring-2 ring-blue-500 bg-blue-500/20",
    green: "ring-2 ring-green-500 bg-green-500/20",
    orange: "ring-2 ring-orange-500 bg-orange-500/20",
    purple: "ring-2 ring-purple-500 bg-purple-500/20",
    pink: "ring-2 ring-pink-500 bg-pink-500/20",
  };
  
  const iconColorClasses: Record<string, string> = {
    blue: "text-blue-400",
    green: "text-green-400",
    orange: "text-orange-400",
    purple: "text-purple-400",
    pink: "text-pink-400",
  };
  
  return (
    <div 
      className={`relative border rounded-lg p-4 transition-all cursor-pointer ${colorClasses[color]} ${isSelected ? selectedClasses[color] : ''}`}
      onClick={onClick}
    >
      {/* Label badge */}
      <span className={`absolute -top-2 left-3 px-2 py-0.5 text-xs font-medium text-white rounded ${labelColor}`}>
        {label}
      </span>
      
      {/* Deployment mode badge */}
      {badge && (
        <span className="absolute -top-2 right-3 px-2 py-0.5 text-xs font-medium bg-orange-500 text-white rounded flex items-center gap-1">
          {BadgeIcon && <BadgeIcon className="h-3 w-3" />}
          {badge}
        </span>
      )}
      
      <div className="flex items-center gap-2 mt-2 mb-2">
        <Icon className={`h-5 w-5 ${iconColorClasses[color]}`} />
        <span className="font-semibold">{name}</span>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
      
      {/* Storage usage badges */}
      <StorageUsageBadges pod={pod} />
    </div>
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
  selectedPod?: PodType | null;
}) => {
  const isUsed = selectedPod ? consumers.includes(selectedPod) : null;
  
  const colorClasses: Record<string, string> = {
    blue: "border-blue-500/30 bg-blue-500/5",
    red: "border-red-500/30 bg-red-500/5",
    yellow: "border-yellow-500/30 bg-yellow-500/5",
    orange: "border-orange-500/30 bg-orange-500/5",
    cyan: "border-cyan-500/30 bg-cyan-500/5",
  };
  
  const activeClasses: Record<string, string> = {
    blue: "ring-2 ring-blue-500 bg-blue-500/20",
    red: "ring-2 ring-red-500 bg-red-500/20",
    yellow: "ring-2 ring-yellow-500 bg-yellow-500/20",
    orange: "ring-2 ring-orange-500 bg-orange-500/20",
    cyan: "ring-2 ring-cyan-500 bg-cyan-500/20",
  };
  
  const iconColorClasses: Record<string, string> = {
    blue: "text-blue-400",
    red: "text-red-400",
    yellow: "text-yellow-400",
    orange: "text-orange-400",
    cyan: "text-cyan-400",
  };
  
  // 根据选中状态决定样式
  const cardStyle = isUsed === null 
    ? colorClasses[color] 
    : isUsed 
      ? `${colorClasses[color]} ${activeClasses[color]}` 
      : `${colorClasses[color]} opacity-30`;
  
  return (
    <div className={`border rounded-lg p-3 transition-all ${cardStyle}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${iconColorClasses[color]}`} />
          <span className="font-medium text-sm">{name}</span>
        </div>
        <span className="text-xs text-muted-foreground bg-background/50 px-2 py-0.5 rounded">{type}</span>
      </div>
      <p className="text-xs text-muted-foreground mb-2">{description}</p>
      {pvc && (
        <div className="text-xs text-orange-400 mb-2 flex items-center gap-1">
          <HardDrive className="h-3 w-3" />
          PVC: {pvc}
        </div>
      )}
      <div className="flex flex-wrap gap-1">
        {consumers.map(c => (
          <span 
            key={c} 
            className={`text-xs px-1.5 py-0.5 rounded ${selectedPod === c ? 'bg-primary text-primary-foreground' : 'bg-background/50'}`}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
};

const BenefitCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="border border-border/50 rounded-lg p-4 bg-card/50">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="h-4 w-4 text-primary" />
      <span className="font-medium">{title}</span>
    </div>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

const K8sResourceGroup = ({ title, items }: { title: string; items: { name: string; type: string; badge?: string }[] }) => (
  <div className="border border-border/50 rounded-lg p-4 bg-card/30">
    <h4 className="font-medium mb-3 text-sm">{title}</h4>
    <div className="space-y-2">
      {items.map(item => (
        <div key={item.name} className="flex items-center justify-between text-xs">
          <span className="font-mono">{item.name}</span>
          <div className="flex items-center gap-1">
            {item.badge && (
              <span className="px-1 py-0.5 bg-orange-500/20 text-orange-400 rounded text-[10px]">
                {item.badge}
              </span>
            )}
            <span className="text-muted-foreground">{item.type}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DetailSection = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <div className="border border-border/50 rounded-lg p-4 bg-card/30">
    <div className="flex items-center gap-2 mb-4">
      <Icon className="h-4 w-4 text-primary" />
      <h4 className="font-medium">{title}</h4>
    </div>
    <div className="space-y-2">{children}</div>
  </div>
);

const ResponsibilityItem = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="flex items-start gap-2 text-sm">
    <Icon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
    <span>{text}</span>
  </div>
);

const TechItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-mono text-xs bg-background/50 px-2 py-0.5 rounded">{value}</span>
  </div>
);

const StorageDependencies = ({ pod }: { pod: PodType }) => {
  const deps = podStorageMap[pod];
  const items = [
    deps.postgres && { icon: Database, name: "PostgreSQL", desc: deps.postgres, color: "blue" },
    deps.redis && { icon: Zap, name: "Redis", desc: deps.redis, color: "red" },
    deps.objectStorage && { icon: HardDrive, name: "OSS/MinIO", desc: deps.objectStorage, color: "cyan" },
    deps.elasticsearch && { icon: Search, name: "ElasticSearch", desc: deps.elasticsearch, color: "yellow" },
    deps.sls && { icon: FileText, name: "SLS", desc: deps.sls, color: "cyan" },
  ].filter(Boolean) as { icon: any; name: string; desc: string; color: string }[];
  
  const colorClasses: Record<string, string> = {
    blue: "text-blue-400",
    red: "text-red-400",
    cyan: "text-cyan-400",
    yellow: "text-yellow-400",
  };
  
  return (
    <div className="border border-border/50 rounded-lg p-4 bg-card/30">
      <div className="flex items-center gap-2 mb-4">
        <Database className="h-4 w-4 text-primary" />
        <h4 className="font-medium">Storage Dependencies</h4>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {items.map(item => (
          <div key={item.name} className="flex items-center gap-2 text-sm">
            <item.icon className={`h-4 w-4 ${colorClasses[item.color]}`} />
            <span className="font-medium">{item.name}</span>
            <span className="text-muted-foreground text-xs">- {item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantCoreArchitecture;
