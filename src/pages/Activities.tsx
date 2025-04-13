
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ActivityAlerts } from "@/components/dashboard/ActivityAlerts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for sales rep activities
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

// Sample data for order activities
const orderActivities = [
  { 
    id: 1,
    type: "new-order",
    client: "Global Industries Inc.",
    description: "Placed a new order of $125K",
    date: "Today, 10:30 AM",
    change: "25% larger than previous order"
  },
  { 
    id: 2,
    type: "modified",
    client: "Tech Solutions Ltd.",
    description: "Modified order #ORD-2025-1244",
    date: "Today, 9:15 AM",
    change: "Added 2 more items to order"
  },
  { 
    id: 3,
    type: "canceled",
    client: "Atlas Construction",
    description: "Canceled order #ORD-2025-1239",
    date: "Yesterday",
    change: "Customer changed requirements"
  },
  { 
    id: 4,
    type: "shipped",
    client: "Premier Enterprises",
    description: "Order #ORD-2025-1243 shipped",
    date: "June 11, 2025",
    change: "Ahead of schedule by 2 days"
  },
  { 
    id: 5,
    type: "delivered",
    client: "Future Electronics",
    description: "Order #ORD-2025-1240 delivered",
    date: "June 10, 2025",
    change: "Customer confirmed receipt"
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
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="sales-rep" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="sales-rep">Sales Rep Activities</TabsTrigger>
                  <TabsTrigger value="order">Order Activities</TabsTrigger>
                </TabsList>
                
                <TabsContent value="sales-rep" className="space-y-4">
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
                </TabsContent>
                
                <TabsContent value="order" className="space-y-4">
                  <div className="space-y-6">
                    {orderActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                        <div>
                          <Badge className={cn(
                            "rounded-md",
                            activity.type === "new-order" && "bg-success text-success-foreground hover:bg-success",
                            activity.type === "modified" && "bg-warning text-warning-foreground hover:bg-warning",
                            activity.type === "canceled" && "bg-destructive text-destructive-foreground hover:bg-destructive",
                            activity.type === "shipped" && "bg-primary text-primary-foreground hover:bg-primary",
                            activity.type === "delivered" && "bg-accent text-accent-foreground hover:bg-accent",
                          )}>
                            {activity.type === "new-order" && "New"}
                            {activity.type === "modified" && "Modified"}
                            {activity.type === "canceled" && "Canceled"}
                            {activity.type === "shipped" && "Shipped"}
                            {activity.type === "delivered" && "Delivered"}
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
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
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
          
          <ActivityAlerts className="hidden md:block" />
        </div>
      </div>
    </AppLayout>
  );
};

export default Activities;
