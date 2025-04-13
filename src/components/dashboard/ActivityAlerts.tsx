
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Sample data
const activityAlerts = [
  { 
    id: 1,
    type: "new-order",
    client: "Global Industries Inc.",
    description: "Placed a new order of $125K",
    date: "Today, 10:30 AM",
  },
  { 
    id: 2,
    type: "churn-risk",
    client: "Acme Manufacturing",
    description: "Flagged as churn risk - no orders in 60 days",
    date: "Yesterday",
  },
  { 
    id: 3,
    type: "tag-change",
    client: "Tech Solutions Ltd.",
    description: "Tag changed from 'Regular' to 'VIP'",
    date: "Yesterday",
  },
  { 
    id: 4,
    type: "rep-activity",
    client: "Smart Systems Corp.",
    description: "John scheduled an on-site visit",
    date: "June 12, 2025",
  },
  { 
    id: 5,
    type: "rep-activity",
    client: "Premier Enterprises",
    description: "Sarah made 3 follow-up calls",
    date: "June 11, 2025",
  },
];

interface ActivityAlertsProps {
  className?: string;
}

export function ActivityAlerts({ className }: ActivityAlertsProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle>Recent Activities & Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activityAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
              <div>
                <Badge className={cn(
                  "rounded-md",
                  alert.type === "new-order" && "bg-success text-success-foreground hover:bg-success",
                  alert.type === "churn-risk" && "bg-destructive text-destructive-foreground hover:bg-destructive",
                  alert.type === "tag-change" && "bg-warning text-warning-foreground hover:bg-warning",
                  alert.type === "rep-activity" && "bg-secondary text-secondary-foreground hover:bg-secondary",
                )}>
                  {alert.type === "new-order" && "New Order"}
                  {alert.type === "churn-risk" && "Churn Risk"}
                  {alert.type === "tag-change" && "Tag Change"}
                  {alert.type === "rep-activity" && "Rep Activity"}
                </Badge>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium">{alert.client}</h4>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
