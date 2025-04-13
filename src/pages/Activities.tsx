
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample data for activities and alerts
const clientActivities = [
  { 
    id: 1,
    type: "new-order",
    client: "Global Industries Inc.",
    description: "Placed a new order of $125K",
    date: "Today, 10:30 AM",
    change: "Order value increased by 15% compared to last order"
  },
  { 
    id: 2,
    type: "churn-risk",
    client: "Acme Manufacturing",
    description: "Flagged as churn risk - no orders in 60 days",
    date: "Yesterday",
    change: "Last activity was on April 15"
  },
  { 
    id: 3,
    type: "tag-change",
    client: "Tech Solutions Ltd.",
    description: "Tag changed from 'Regular' to 'VIP'",
    date: "Yesterday",
    change: "Annual spend increased by 35%"
  },
  { 
    id: 4,
    type: "new-order",
    client: "Premier Enterprises",
    description: "Placed a new order of $45K",
    date: "June 11, 2025",
    change: "First order in Q2 2025"
  },
  { 
    id: 5,
    type: "churn-risk",
    client: "Nordic Supplies",
    description: "Flagged as churn risk - decreased order frequency",
    date: "June 10, 2025",
    change: "Orders down 40% vs last quarter"
  },
];

const salesRepActivities = [
  { 
    id: 1,
    type: "client-visit",
    salesRep: "John Doe",
    description: "On-site visit with Global Industries Inc.",
    date: "Today, 2:00 PM",
    change: "First visit in 3 months"
  },
  { 
    id: 2,
    type: "call",
    salesRep: "Sarah Smith",
    description: "3 follow-up calls with Tech Solutions Ltd.",
    date: "Today, 9:00 AM",
    change: "50% more calls than last week"
  },
  { 
    id: 3,
    type: "meeting",
    salesRep: "Mike Johnson",
    description: "Quarterly review with Acme Manufacturing",
    date: "Yesterday",
    change: "Discussed renewal options"
  },
  { 
    id: 4,
    type: "proposal",
    salesRep: "Emily Brown",
    description: "Sent proposal to Smart Systems Corp.",
    date: "June 11, 2025",
    change: "25% larger deal than previous"
  },
  { 
    id: 5,
    type: "call",
    salesRep: "John Doe",
    description: "Follow-up call with Premier Enterprises",
    date: "June 10, 2025",
    change: "Discussed expansion plans"
  },
];

const aiRecommendations = [
  {
    id: 1,
    client: "Acme Manufacturing",
    reason: "No communication in 30 days + historically orders quarterly",
    priority: "high"
  },
  {
    id: 2,
    client: "Smart Systems Corp.",
    reason: "Previous inquiry about new product line not followed up",
    priority: "medium"
  },
  {
    id: 3,
    client: "European Imports",
    reason: "Renewal coming up in 20 days",
    priority: "high"
  },
  {
    id: 4,
    client: "Pacific Shipping Co.",
    reason: "Recently upgraded to premium tier - check satisfaction",
    priority: "medium"
  },
  {
    id: 5,
    client: "Future Electronics",
    reason: "Decreased order volumes in last 2 months",
    priority: "low"
  },
];

const Activities = () => {
  return (
    <AppLayout>
      <PageHeader 
        title="Activities & Alerts" 
        description="Monitor important client activities and sales rep actions"
      />
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="client">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="client">Client Activity</TabsTrigger>
              <TabsTrigger value="rep">Sales Rep Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="client" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Recent Client Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {clientActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                        <div>
                          <Badge className={cn(
                            "rounded-md",
                            activity.type === "new-order" && "bg-success text-success-foreground hover:bg-success",
                            activity.type === "churn-risk" && "bg-destructive text-destructive-foreground hover:bg-destructive",
                            activity.type === "tag-change" && "bg-warning text-warning-foreground hover:bg-warning",
                          )}>
                            {activity.type === "new-order" && "New Order"}
                            {activity.type === "churn-risk" && "Churn Risk"}
                            {activity.type === "tag-change" && "Tag Change"}
                          </Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium">{activity.client}</h4>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <div className="flex justify-between mt-2">
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                            <p className="text-xs text-muted-foreground italic">
                              {activity.change}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="rep" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Sales Rep Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {salesRepActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                        <div>
                          <Badge className={cn(
                            "rounded-md",
                            activity.type === "client-visit" && "bg-primary text-primary-foreground hover:bg-primary",
                            activity.type === "call" && "bg-secondary text-secondary-foreground hover:bg-secondary",
                            activity.type === "meeting" && "bg-accent text-accent-foreground hover:bg-accent",
                            activity.type === "proposal" && "bg-warning text-warning-foreground hover:bg-warning",
                          )}>
                            {activity.type === "client-visit" && "Visit"}
                            {activity.type === "call" && "Call"}
                            {activity.type === "meeting" && "Meeting"}
                            {activity.type === "proposal" && "Proposal"}
                          </Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium">{activity.salesRep}</h4>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <div className="flex justify-between mt-2">
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                            <p className="text-xs text-muted-foreground italic">
                              {activity.change}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-warning" />
                  AI Recommendations
                </CardTitle>
                <Button variant="ghost" size="sm">Refresh</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Clients that may need follow-up based on past patterns and activity
                </p>
                
                {aiRecommendations.map((rec) => (
                  <div key={rec.id} className="pb-3 border-b last:border-0 last:pb-0">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium">{rec.client}</h4>
                      <Badge className={cn(
                        "rounded-sm",
                        rec.priority === "high" && "bg-destructive text-destructive-foreground hover:bg-destructive",
                        rec.priority === "medium" && "bg-warning text-warning-foreground hover:bg-warning",
                        rec.priority === "low" && "bg-secondary text-secondary-foreground hover:bg-secondary",
                      )}>
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{rec.reason}</p>
                    <Button size="sm" variant="outline" className="mt-2 w-full justify-center">
                      Schedule Follow-up
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Activities;
