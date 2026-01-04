import { cn } from "@/lib/utils";

// UML Sequence Diagram for Broker OAuth Flow
export function BrokerSequenceDiagram() {
  const participants = [
    { id: "user", label: "User", sub: "Browser" },
    { id: "tenant", label: "Tenant App", sub: "Frontend" },
    { id: "broker", label: "Broker", sub: "OAuth Proxy" },
    { id: "idp", label: "IdP", sub: "OAuth Provider" },
  ];

  const messages: Message[] = [
    { from: 0, to: 1, label: "1. Click Login", type: "solid" },
    { from: 1, to: 2, label: "2. GET /authorize?tenant_id&provider", type: "solid" },
    { from: 2, to: 2, label: "3. Generate State Token", type: "self" },
    { from: 2, to: 3, label: "4. Redirect to IdP", type: "solid" },
    { from: 3, to: 0, label: "5. Show Login Page", type: "dashed" },
    { from: 0, to: 3, label: "6. Submit Credentials", type: "solid" },
    { from: 3, to: 2, label: "7. Callback (code, state)", type: "solid" },
    { from: 2, to: 3, label: "8. Exchange code for token", type: "solid" },
    { from: 3, to: 2, label: "9. Return user info", type: "dashed" },
    { from: 2, to: 2, label: "10. Generate Handoff Token", type: "self" },
    { from: 2, to: 1, label: "11. Redirect + handoff_token", type: "solid" },
    { from: 1, to: 1, label: "12. Verify & Issue Session JWT", type: "self" },
    { from: 1, to: 0, label: "13. Session Established", type: "dashed" },
  ];

  const colWidth = 160;
  const headerHeight = 60;
  const messageHeight = 36;
  const padding = 20;

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-x-auto">
      <svg 
        width={participants.length * colWidth + padding * 2} 
        height={headerHeight + messages.length * messageHeight + 40}
        className="mx-auto"
      >
        {/* Participants */}
        {participants.map((p, i) => {
          const x = padding + i * colWidth + colWidth / 2;
          return (
            <g key={p.id}>
              <rect
                x={x - 55}
                y={10}
                width={110}
                height={40}
                rx={6}
                fill={i === 2 ? "hsl(var(--broker-light))" : i === 1 ? "hsl(var(--data-plane-light))" : "hsl(var(--muted))"}
                stroke={i === 2 ? "hsl(var(--broker))" : i === 1 ? "hsl(var(--data-plane))" : "hsl(var(--muted-foreground))"}
                strokeWidth={1.5}
              />
              <text x={x} y={28} textAnchor="middle" className="text-xs font-semibold fill-foreground">
                {p.label}
              </text>
              <text x={x} y={42} textAnchor="middle" className="text-[10px] fill-muted-foreground">
                {p.sub}
              </text>
              <line
                x1={x}
                y1={headerHeight}
                x2={x}
                y2={headerHeight + messages.length * messageHeight + 20}
                stroke="hsl(var(--border))"
                strokeWidth={1}
                strokeDasharray="4,4"
              />
            </g>
          );
        })}

        {/* Messages */}
        {messages.map((msg, i) => {
          const y = headerHeight + 20 + i * messageHeight;
          const fromX = padding + msg.from * colWidth + colWidth / 2;
          const toX = padding + msg.to * colWidth + colWidth / 2;

          if (msg.type === "self") {
            return (
              <g key={i}>
                <path
                  d={`M ${fromX} ${y} h 30 v 16 h -30`}
                  fill="none"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={1.5}
                />
                <polygon
                  points={`${fromX},${y + 16} ${fromX + 5},${y + 11} ${fromX + 5},${y + 21}`}
                  fill="hsl(var(--muted-foreground))"
                />
                <text x={fromX + 35} y={y + 12} className="text-[10px] fill-muted-foreground">
                  {msg.label}
                </text>
              </g>
            );
          }

          const isReverse = fromX > toX;
          const startX = isReverse ? fromX - 5 : fromX + 5;
          const endX = isReverse ? toX + 5 : toX - 5;

          return (
            <g key={i}>
              <line
                x1={startX}
                y1={y}
                x2={endX}
                y2={y}
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={1.5}
                strokeDasharray={msg.type === "dashed" ? "4,3" : undefined}
              />
              {isReverse ? (
                <polygon
                  points={`${endX},${y} ${endX + 8},${y - 4} ${endX + 8},${y + 4}`}
                  fill="hsl(var(--muted-foreground))"
                />
              ) : (
                <polygon
                  points={`${endX},${y} ${endX - 8},${y - 4} ${endX - 8},${y + 4}`}
                  fill="hsl(var(--muted-foreground))"
                />
              )}
              <text
                x={(startX + endX) / 2}
                y={y - 6}
                textAnchor="middle"
                className="text-[10px] fill-foreground font-mono"
              >
                {msg.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

interface Message {
  from: number;
  to: number;
  label: string;
  type: "solid" | "dashed" | "self";
}

// Token Cards
export function TokenCards() {
  const tokens = [
    {
      step: 1,
      name: "State Token",
      algorithm: "RS256",
      ttl: "10 min",
      fields: ["tenant_id", "callback_url", "provider", "nonce"],
      purpose: "CSRF protection, context preservation",
      variant: "broker" as const,
    },
    {
      step: 2,
      name: "Handoff Token",
      algorithm: "RS256",
      ttl: "30 sec",
      fields: ["tenant_id", "user_info", "provider", "iat/exp"],
      purpose: "Secure identity transfer to tenant",
      variant: "broker" as const,
    },
    {
      step: 3,
      name: "Session JWT",
      algorithm: "HS256",
      ttl: "1 hour",
      fields: ["sub", "role", "email", "user_metadata"],
      purpose: "Session token for Platform API",
      variant: "data" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {tokens.map((t) => {
        const colors = t.variant === "broker" 
          ? { bg: "bg-broker-light", border: "border-broker", text: "text-broker" }
          : { bg: "bg-data-plane-light", border: "border-data-plane", text: "text-data-plane" };

        return (
          <div key={t.step} className="bg-card rounded-xl p-4 border shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border-2", colors.bg, colors.border, colors.text)}>
                {t.step}
              </div>
              <div>
                <h5 className="font-semibold text-sm">{t.name}</h5>
                <span className="text-[10px] text-muted-foreground font-mono">{t.algorithm} • {t.ttl}</span>
              </div>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="p-2 bg-secondary rounded font-mono text-[10px]">
                {t.fields.map((f, i) => <div key={i}>{f}</div>)}
              </div>
              <p className="text-muted-foreground">{t.purpose}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
