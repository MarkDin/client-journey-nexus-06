import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

// Sample data for order activities - only keeping "new-order" type
const orderActivities = [
  { 
    id: 1,
    type: "new-order",
    client: "Global Industries Inc.",
    description: "Placed a new order of $125K",
    date: "Today, 10:30 AM",
    change: "25% larger than previous order"
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
                          <Badge className="rounded-md bg-success text-success-foreground hover:bg-success">
                            New
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
          <ActivityAlerts />
        </div>
      </div>
    </AppLayout>
  );
};

export default Activities;
