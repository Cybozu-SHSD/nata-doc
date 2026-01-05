import { useState } from "react";
import { 
  Database, 
  Server, 
  HardDrive, 
  MessageSquare, 
  Cpu, 
  Clock, 
  Search, 
  FileText, 
  Workflow, 
  Users, 
  Settings, 
  Layers,
  Mail,
  Bell,
  Download,
  RefreshCw,
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SystemFlowDiagram } from "./SystemFlowDiagram";
import { MessageQueueDiagram } from "./MessageQueueDiagram";

type PodType = "main" | "worker" | "routine" | "fts";

// Storage used by each Pod
const podStorageMap: Record<PodType, { name: string; type: string; icon: "pg" | "redis" | "oss" | "es" }[]> = {
  main: [
    { name: "PostgreSQL", type: "Business Data R/W", icon: "pg" },
    { name: "Redis", type: "Cache + Distributed Lock", icon: "redis" },
    { name: "OSS", type: "File Upload", icon: "oss" },
  ],
  worker: [
    { name: "PostgreSQL", type: "Business Data R/W", icon: "pg" },
    { name: "Redis", type: "Message Queue", icon: "redis" },
    { name: "OSS", type: "Export File Storage", icon: "oss" },
  ],
  routine: [
    { name: "PostgreSQL", type: "Data R/W", icon: "pg" },
    { name: "Redis", type: "Distributed Lock", icon: "redis" },
  ],
  fts: [
    { name: "Redis", type: "Message Queue", icon: "redis" },
    { name: "OSS", type: "Download Attachments", icon: "oss" },
    { name: "ElasticSearch", type: "Index R/W", icon: "es" },
  ],
};

export function TenantCoreArchitecture() {
  const [selectedPod, setSelectedPod] = useState<PodType>("main");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Single Tenant Core Architecture</h2>
      </div>

      {/* System Flow Diagram (Mermaid) - Moved to top */}
      <div className="bg-card border border-border rounded-xl p-6">
        <SystemFlowDiagram />
      </div>

      {/* Architecture Overview - Visual Diagram */}
      <div className="bg-card border border-border rounded-xl p-6">
        <SectionHeader 
          icon={<Layers className="w-5 h-5" />} 
          title="System Overview" 
          subtitle="Click on each Pod to view details"
        />
        
        <div className="mt-6 space-y-6">
          {/* Client Layer */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-lg text-sm">
              <Users className="w-4 h-4" />
              <span>Client Requests (HTTP / WebSocket)</span>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown />
          </div>

          {/* Application Pods - Interactive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <PodOverviewCard
              id="main"
              name="main"
              subtitle="API Gateway"
              isSelected={selectedPod === "main"}
              onClick={() => setSelectedPod("main")}
              color="blue"
              replicas="2-4"
            />
            <PodOverviewCard
              id="worker"
              name="worker"
              subtitle="Async Tasks"
              isSelected={selectedPod === "worker"}
              onClick={() => setSelectedPod("worker")}
              color="green"
              replicas="1-2"
            />
            <PodOverviewCard
              id="routine"
              name="routine"
              subtitle="Scheduled Jobs"
              isSelected={selectedPod === "routine"}
              onClick={() => setSelectedPod("routine")}
              color="orange"
              replicas="1"
            />
            <PodOverviewCard
              id="fts"
              name="fts"
              subtitle="Full-Text Search"
              isSelected={selectedPod === "fts"}
              onClick={() => setSelectedPod("fts")}
              color="purple"
              replicas="1"
            />
          </div>

          <div className="flex justify-center">
            <ArrowDown label="Read/Write Data" />
          </div>

          {/* Storage Layer - Dynamic based on selected Pod */}
          <div className="space-y-2">
            <div className="text-center text-xs text-muted-foreground">
              Storage used by <span className="font-mono font-semibold text-foreground">{selectedPod}</span>
            </div>
            <div className="flex justify-center gap-3 flex-wrap">
              {podStorageMap[selectedPod].map((storage) => (
                <StorageSimple 
                  key={storage.name}
                  icon={getStorageIcon(storage.icon)} 
                  name={storage.name} 
                  type={storage.type} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pod Detail Tabs */}
      <div className="bg-card border border-border rounded-xl p-6">
        <Tabs value={selectedPod} onValueChange={(v) => setSelectedPod(v as PodType)}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="main" className="data-[state=active]:bg-blue-500/20">
              <Cpu className="w-4 h-4 mr-2" />
              main
            </TabsTrigger>
            <TabsTrigger value="worker" className="data-[state=active]:bg-green-500/20">
              <Zap className="w-4 h-4 mr-2" />
              worker
            </TabsTrigger>
            <TabsTrigger value="routine" className="data-[state=active]:bg-orange-500/20">
              <Clock className="w-4 h-4 mr-2" />
              routine
            </TabsTrigger>
            <TabsTrigger value="fts" className="data-[state=active]:bg-purple-500/20">
              <Search className="w-4 h-4 mr-2" />
              fts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="main">
            <MainPodDetail />
          </TabsContent>
          <TabsContent value="worker">
            <WorkerPodDetail />
          </TabsContent>
          <TabsContent value="routine">
            <RoutinePodDetail />
          </TabsContent>
          <TabsContent value="fts">
            <FTSPodDetail />
          </TabsContent>
        </Tabs>
      </div>

      {/* Message Queue Design - Optimized */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <SectionHeader 
          icon={<MessageSquare className="w-5 h-5" />} 
          title="Message Queue Design" 
        />
        
        {/* Benefits as compact badges */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
            <Zap className="w-3 h-3" /> Decoupling
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-600 rounded-full text-xs font-medium">
            <ArrowRight className="w-3 h-3" /> Peak Shaving
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-600 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" /> Reliability
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 text-purple-600 rounded-full text-xs font-medium">
            <Search className="w-3 h-3" /> Observability
          </span>
        </div>

        {/* Queue Flow Diagram */}
        <MessageQueueDiagram />

        {/* Queue Categories - Card Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QueueCategoryCard
            title="Notification"
            icon={<Bell className="w-4 h-4" />}
            queues={["mail.send", "notification.send"]}
            flow="main → worker"
            color="blue"
          />
          <QueueCategoryCard
            title="Data Processing"
            icon={<Download className="w-4 h-4" />}
            queues={["export.csv", "data.sync"]}
            flow="main/routine → worker"
            color="green"
          />
          <QueueCategoryCard
            title="Search Index"
            icon={<Search className="w-4 h-4" />}
            queues={["fts.index.create", "fts.index.delete"]}
            flow="main → fts"
            color="purple"
          />
          <QueueCategoryCard
            title="Workflow"
            icon={<Workflow className="w-4 h-4" />}
            queues={["workflow.trigger"]}
            flow="main → worker"
            color="amber"
          />
        </div>
      </div>

      {/* Kubernetes Resources */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <SectionHeader 
          icon={<Settings className="w-5 h-5" />} 
          title="Kubernetes Resources" 
          subtitle="Tenant namespace: tenant-{id}"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <K8sResourceGroup
            title="Workloads"
            resources={[
              { type: "Deployment", name: "main", detail: "replicas: 2" },
              { type: "Deployment", name: "worker", detail: "replicas: 1" },
              { type: "Deployment", name: "routine", detail: "replicas: 1" },
              { type: "Deployment", name: "fts", detail: "replicas: 1" },
            ]}
          />
          <K8sResourceGroup
            title="Networking"
            resources={[
              { type: "Service", name: "main-svc", detail: "ClusterIP" },
              { type: "Ingress", name: "tenant-ingress", detail: "subdomain" },
            ]}
          />
          <K8sResourceGroup
            title="Configuration"
            resources={[
              { type: "ConfigMap", name: "app-config", detail: "Environment" },
              { type: "Secret", name: "db-credentials", detail: "DB Password" },
              { type: "Secret", name: "oss-credentials", detail: "OSS Credentials" },
            ]}
          />
          <K8sResourceGroup
            title="Autoscaling"
            resources={[
              { type: "HPA", name: "main-hpa", detail: "min:2 max:4" },
              { type: "HPA", name: "worker-hpa", detail: "min:1 max:3" },
            ]}
          />
          <K8sResourceGroup
            title="Storage"
            resources={[
              { type: "PVC", name: "logs-pvc", detail: "10Gi" },
              { type: "PVC", name: "temp-pvc", detail: "5Gi" },
            ]}
          />
          <K8sResourceGroup
            title="Observability"
            resources={[
              { type: "ServiceMonitor", name: "metrics", detail: "Prometheus" },
              { type: "PodMonitor", name: "logs", detail: "Loki" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

// ==================== Pod Detail Components ====================

function MainPodDetail() {
  return (
    <div className="space-y-6">
      <PodHeader
        name="main"
        subtitle="API Gateway & Business Logic"
        color="blue"
        replicas="2-4"
        resources="1 CPU / 2 GB Memory"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Responsibilities */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-500" />
            Core Responsibilities
          </h4>
          <div className="space-y-3">
            <ResponsibilityItem
              title="HTTP API Service"
              description="Handle all client REST API requests including CRUD operations, authentication, etc."
            />
            <ResponsibilityItem
              title="WebSocket Connection"
              description="Real-time message push, support online user status and instant notifications"
            />
            <ResponsibilityItem
              title="Business Logic Processing"
              description="Form data validation, permission checks, business rule execution"
            />
            <ResponsibilityItem
              title="Message Producer"
              description="Send time-consuming tasks to message queue for async processing by worker/fts"
            />
          </div>
        </div>

        {/* Technical Details */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Settings className="w-4 h-4 text-blue-500" />
            Technical Implementation
          </h4>
          <div className="bg-muted/30 rounded-lg p-4 space-y-3 text-sm">
            <TechItem label="Framework" value="NestJS + Express" />
            <TechItem label="Auth" value="JWT + Passport" />
            <TechItem label="Authorization" value="OSO (Polar) RBAC/ABAC" />
            <TechItem label="ORM" value="Prisma / TypeORM" />
            <TechItem label="Validation" value="class-validator + class-transformer" />
            <TechItem label="Docs" value="Swagger / OpenAPI" />
          </div>

          <h4 className="font-semibold text-sm flex items-center gap-2 mt-4">
            <Database className="w-4 h-4 text-blue-500" />
            Storage Dependencies
          </h4>
          <div className="flex flex-wrap gap-2">
            <StorageBadge name="PostgreSQL" purpose="R/W" />
            <StorageBadge name="Redis" purpose="Cache+Lock" />
            <StorageBadge name="OSS" purpose="File Upload" />
          </div>
        </div>
      </div>

      {/* Queue Messages */}
      <div className="space-y-3">
        <h4 className="font-semibold text-sm">Queue Messages Produced</h4>
        <div className="flex flex-wrap gap-2">
          <QueueBadge name="mail.send" />
          <QueueBadge name="notification.send" />
          <QueueBadge name="export.csv" />
          <QueueBadge name="workflow.trigger" />
          <QueueBadge name="fts.index.create" />
          <QueueBadge name="fts.index.delete" />
          <QueueBadge name="data.sync" />
        </div>
      </div>
    </div>
  );
}

function WorkerPodDetail() {
  return (
    <div className="space-y-6">
      <PodHeader
        name="worker"
        subtitle="Async Task Consumer"
        color="green"
        replicas="1-2"
        resources="0.5 CPU / 1 GB Memory"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Core Responsibilities
          </h4>
          <div className="space-y-3">
            <ResponsibilityItem
              title="Email Sending"
              description="Call email service API to send various notification emails (verification, approval, reports)"
            />
            <ResponsibilityItem
              title="Push Notifications"
              description="Send in-app notifications, App push, Mini Program subscription messages"
            />
            <ResponsibilityItem
              title="Data Export"
              description="Generate CSV/Excel export files, upload to OSS for user download"
            />
            <ResponsibilityItem
              title="Workflow Execution"
              description="Execute approval process nodes, automation triggers, scheduled tasks"
            />
            <ResponsibilityItem
              title="Data Synchronization"
              description="Sync data with third-party systems (ERP, CRM, etc.)"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Settings className="w-4 h-4 text-green-500" />
            Technical Implementation
          </h4>
          <div className="bg-muted/30 rounded-lg p-4 space-y-3 text-sm">
            <TechItem label="Framework" value="NestJS Microservice" />
            <TechItem label="Consumer" value="@EventPattern / @MessagePattern" />
            <TechItem label="Email" value="Nodemailer / Aliyun DirectMail" />
            <TechItem label="Push" value="Firebase / JPush" />
            <TechItem label="Export" value="ExcelJS / csv-writer" />
            <TechItem label="Retry" value="Bull Queue + Exponential Backoff" />
          </div>

          <h4 className="font-semibold text-sm flex items-center gap-2 mt-4">
            <Database className="w-4 h-4 text-green-500" />
            Storage Dependencies
          </h4>
          <div className="flex flex-wrap gap-2">
            <StorageBadge name="PostgreSQL" purpose="R/W" />
            <StorageBadge name="Redis" purpose="Queue" />
            <StorageBadge name="OSS" purpose="Export Files" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-sm">Queue Messages Consumed</h4>
        <div className="flex flex-wrap gap-2">
          <QueueBadge name="mail.send" variant="consume" />
          <QueueBadge name="notification.send" variant="consume" />
          <QueueBadge name="export.csv" variant="consume" />
          <QueueBadge name="workflow.trigger" variant="consume" />
          <QueueBadge name="data.sync" variant="consume" />
        </div>
      </div>
    </div>
  );
}

function RoutinePodDetail() {
  return (
    <div className="space-y-6">
      <PodHeader
        name="routine"
        subtitle="Scheduled Jobs"
        color="orange"
        replicas="1"
        resources="0.25 CPU / 512 MB Memory"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-orange-500" />
            Core Responsibilities
          </h4>
          <div className="space-y-3">
            <ResponsibilityItem
              title="Scheduled Data Sync"
              description="Sync third-party system data hourly/daily to maintain data consistency"
            />
            <ResponsibilityItem
              title="Log Cleanup"
              description="Periodically clean expired operation logs and temp files to free storage"
            />
            <ResponsibilityItem
              title="Statistics Aggregation"
              description="Generate daily/weekly business statistics reports, update dashboard data"
            />
            <ResponsibilityItem
              title="Health Checks"
              description="Periodically check dependent service status, alert on anomalies"
            />
            <ResponsibilityItem
              title="Expiration Handling"
              description="Process expired pending items, timed-out approval workflows"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Settings className="w-4 h-4 text-orange-500" />
            Technical Implementation
          </h4>
          <div className="bg-muted/30 rounded-lg p-4 space-y-3 text-sm">
            <TechItem label="Framework" value="NestJS + @nestjs/schedule" />
            <TechItem label="Scheduler" value="@Cron decorator" />
            <TechItem label="Distributed Lock" value="Redis Redlock (prevent duplicate execution)" />
            <TechItem label="Logging" value="Winston + Aliyun SLS" />
          </div>

          <h4 className="font-semibold text-sm flex items-center gap-2 mt-4">
            <Clock className="w-4 h-4 text-orange-500" />
            Cron Job Examples
          </h4>
          <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-xs font-mono">
            <div><span className="text-orange-400">@Cron('0 */1 * * *')</span> <span className="text-muted-foreground">// Hourly sync</span></div>
            <div><span className="text-orange-400">@Cron('0 2 * * *')</span> <span className="text-muted-foreground">// Daily cleanup at 2 AM</span></div>
            <div><span className="text-orange-400">@Cron('0 6 * * 1')</span> <span className="text-muted-foreground">// Weekly report on Monday 6 AM</span></div>
          </div>

          <h4 className="font-semibold text-sm flex items-center gap-2 mt-4">
            <Database className="w-4 h-4 text-orange-500" />
            Storage Dependencies
          </h4>
          <div className="flex flex-wrap gap-2">
            <StorageBadge name="PostgreSQL" purpose="R/W" />
            <StorageBadge name="Redis" purpose="Distributed Lock" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-sm">Queue Messages Produced</h4>
        <div className="flex flex-wrap gap-2">
          <QueueBadge name="data.sync" />
          <QueueBadge name="notification.send" />
        </div>
        <p className="text-xs text-muted-foreground">After scheduled trigger, actual execution tasks are sent to worker for processing</p>
      </div>
    </div>
  );
}

function FTSPodDetail() {
  return (
    <div className="space-y-6">
      <PodHeader
        name="fts"
        subtitle="Full-Text Search Service"
        color="purple"
        replicas="1"
        resources="0.5 CPU / 1 GB Memory"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-purple-500" />
            Core Responsibilities
          </h4>
          <div className="space-y-3">
            <ResponsibilityItem
              title="Attachment Content Parsing"
              description="Download Word, PDF, Excel files from OSS and extract text content"
            />
            <ResponsibilityItem
              title="Full-Text Index Creation"
              description="Build ElasticSearch index from extracted text, support Chinese word segmentation"
            />
            <ResponsibilityItem
              title="Index Maintenance"
              description="Clean up corresponding index when files are deleted, keep index consistent with data"
            />
            <ResponsibilityItem
              title="Search Service"
              description="Provide full-text search API with highlighting, pagination, fuzzy matching"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Settings className="w-4 h-4 text-purple-500" />
            Technical Implementation
          </h4>
          <div className="bg-muted/30 rounded-lg p-4 space-y-3 text-sm">
            <TechItem label="Framework" value="NestJS Microservice" />
            <TechItem label="Parsers" value="pdf-parse / mammoth / xlsx" />
            <TechItem label="Tokenizer" value="IK Analyzer (Chinese)" />
            <TechItem label="Index" value="ElasticSearch 7.x" />
            <TechItem label="Client" value="@elastic/elasticsearch" />
          </div>

          <h4 className="font-semibold text-sm flex items-center gap-2 mt-4">
            <FileText className="w-4 h-4 text-purple-500" />
            Supported File Types
          </h4>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-purple-500/10 text-purple-500 px-2 py-1 rounded">.pdf</span>
            <span className="text-xs bg-purple-500/10 text-purple-500 px-2 py-1 rounded">.docx</span>
            <span className="text-xs bg-purple-500/10 text-purple-500 px-2 py-1 rounded">.xlsx</span>
            <span className="text-xs bg-purple-500/10 text-purple-500 px-2 py-1 rounded">.pptx</span>
            <span className="text-xs bg-purple-500/10 text-purple-500 px-2 py-1 rounded">.txt</span>
          </div>

          <h4 className="font-semibold text-sm flex items-center gap-2 mt-4">
            <Database className="w-4 h-4 text-purple-500" />
            Storage Dependencies
          </h4>
          <div className="flex flex-wrap gap-2">
            <StorageBadge name="OSS" purpose="Download Files" />
            <StorageBadge name="ElasticSearch" purpose="Index R/W" />
            <StorageBadge name="Redis" purpose="Queue" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-sm">Queue Messages Consumed</h4>
        <div className="flex flex-wrap gap-2">
          <QueueBadge name="fts.index.create" variant="consume" />
          <QueueBadge name="fts.index.delete" variant="consume" />
        </div>
      </div>
    </div>
  );
}

// ==================== Helper Components ====================

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-primary/10 rounded-lg text-primary">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

function PodOverviewCard({ id, name, subtitle, isSelected, onClick, color, replicas }: {
  id: string;
  name: string;
  subtitle: string;
  isSelected: boolean;
  onClick: () => void;
  color: "blue" | "green" | "orange" | "purple";
  replicas: string;
}) {
  const colorClasses = {
    blue: { border: "border-blue-500", bg: "bg-blue-500/10", dot: "bg-blue-500" },
    green: { border: "border-green-500", bg: "bg-green-500/10", dot: "bg-green-500" },
    orange: { border: "border-orange-500", bg: "bg-orange-500/10", dot: "bg-orange-500" },
    purple: { border: "border-purple-500", bg: "bg-purple-500/10", dot: "bg-purple-500" },
  };

  const colors = colorClasses[color];

  return (
    <button
      onClick={onClick}
      className={`text-left p-4 rounded-lg border-2 transition-all ${
        isSelected 
          ? `${colors.border} ${colors.bg}` 
          : "border-border hover:border-muted-foreground/30"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
          <span className="font-mono font-semibold">{name}</span>
        </div>
        <span className="text-xs text-muted-foreground">×{replicas}</span>
      </div>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </button>
  );
}

function StorageSimple({ icon, name, type }: { icon: React.ReactNode; name: string; type: string }) {
  return (
    <div className="flex items-center gap-2 bg-muted/30 border border-border rounded-lg px-3 py-2 transition-all animate-in fade-in-50 duration-200">
      <div className="text-muted-foreground">{icon}</div>
      <div>
        <div className="text-sm font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{type}</div>
      </div>
    </div>
  );
}

function getStorageIcon(type: "pg" | "redis" | "oss" | "es") {
  const icons = {
    pg: <Database className="w-4 h-4" />,
    redis: <Server className="w-4 h-4" />,
    oss: <HardDrive className="w-4 h-4" />,
    es: <Search className="w-4 h-4" />,
  };
  return icons[type];
}

function ArrowDown({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-px h-4 bg-border" />
      {label && <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded">{label}</span>}
      <div className="w-px h-4 bg-border" />
      <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-border" />
    </div>
  );
}

function PodHeader({ name, subtitle, color, replicas, resources }: {
  name: string;
  subtitle: string;
  color: "blue" | "green" | "orange" | "purple";
  replicas: string;
  resources: string;
}) {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    orange: "bg-orange-500",
    purple: "bg-purple-500",
  };

  return (
    <div className="flex items-center justify-between pb-4 border-b border-border">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${colorClasses[color]}`} />
        <div>
          <h3 className="font-mono font-bold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="text-right text-sm">
        <div className="text-muted-foreground">Replicas: <span className="text-foreground font-medium">{replicas}</span></div>
        <div className="text-muted-foreground">Resources: <span className="text-foreground font-medium">{resources}</span></div>
      </div>
    </div>
  );
}

function ResponsibilityItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-2">
      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
      <div>
        <span className="font-medium text-sm">{title}</span>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  );
}

function TechItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function StorageBadge({ name, purpose }: { name: string; purpose: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
      <span className="font-medium">{name}</span>
      <span className="text-muted-foreground">({purpose})</span>
    </span>
  );
}

function QueueBadge({ name, variant = "produce" }: { name: string; variant?: "produce" | "consume" }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded font-mono ${
      variant === "produce" 
        ? "bg-blue-500/10 text-blue-500" 
        : "bg-green-500/10 text-green-500"
    }`}>
      {variant === "consume" && "← "}
      {name}
      {variant === "produce" && " →"}
    </span>
  );
}

function QueueCategoryCard({ title, icon, queues, flow, color }: {
  title: string;
  icon: React.ReactNode;
  queues: string[];
  flow: string;
  color: "blue" | "green" | "purple" | "amber";
}) {
  const colorMap = {
    blue: "bg-blue-500/10 text-blue-600 border-blue-200",
    green: "bg-green-500/10 text-green-600 border-green-200",
    purple: "bg-purple-500/10 text-purple-600 border-purple-200",
    amber: "bg-amber-500/10 text-amber-600 border-amber-200",
  };
  
  return (
    <div className={`rounded-lg border p-4 space-y-3 ${colorMap[color]}`}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-medium text-sm">{title}</span>
      </div>
      <div className="space-y-1.5">
        {queues.map((q) => (
          <div key={q} className="font-mono text-xs bg-background/60 px-2 py-1 rounded">
            {q}
          </div>
        ))}
      </div>
      <div className="text-xs opacity-75">{flow}</div>
    </div>
  );
}

function K8sResourceGroup({ title, resources }: {
  title: string;
  resources: { type: string; name: string; detail: string }[];
}) {
  return (
    <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-3">
      <h4 className="font-medium text-foreground text-sm">{title}</h4>
      <div className="space-y-2">
        {resources.map((resource, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-primary font-mono">{resource.type}</span>
              <span className="text-muted-foreground">{resource.name}</span>
            </div>
            <span className="text-muted-foreground/70">{resource.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
