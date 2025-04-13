
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose
} from "@/components/ui/sheet";

interface ClientDetailProps {
  clientId: number;
  onClose: () => void;
  open: boolean;
}

export function ClientDetail({ clientId, onClose, open }: ClientDetailProps) {
  // This would typically fetch client data based on the ID
  // For simplicity, we'll use hardcoded data
  const client = {
    id: clientId,
    name: "Global Industries Inc.",
    industry: "Manufacturing",
    salesRep: "John Doe",
    region: "North America",
    score: "A",
    status: "active",
    lastOrder: "2025-06-10",
    contactName: "Michael Johnson",
    contactEmail: "mjohnson@globalindustries.com",
    contactPhone: "(555) 123-4567",
    address: "123 Industrial Way, Chicago, IL 60007",
    creditLevel: "Premium",
    yearSince: 2020,
    tags: ["VIP", "Manufacturing", "Machinery", "Regular Buyer"],
    aiSummary: "Global Industries Inc. has been a consistent client since 2020, starting with quarterly purchases of industrial equipment. They became a major account in 2023 with a 45% increase in order value. Their main focus is on manufacturing equipment for the automotive industry. Recent discussions have centered around expanding their production line and implementing new automation solutions.",
    communications: [
      {
        id: 1,
        week: "June 3-9, 2025",
        summary: "Discussion about upcoming shipment of industrial sensors. Client requested expedited delivery to their Chicago facility. Pricing negotiation for bulk order of control systems was initiated.",
        tags: ["shipment", "pricing", "bulk order"],
      },
      {
        id: 2,
        week: "May 27-June 2, 2025",
        summary: "Follow-up on quality concerns from April shipment. Issue was resolved with replacement parts sent. Client expressed satisfaction with resolution. Scheduled product demo for new manufacturing line components.",
        tags: ["quality", "resolution", "demo"],
      },
      {
        id: 3,
        week: "May 20-26, 2025",
        summary: "Quarterly business review meeting. Discussed YTD performance and future growth opportunities. Client shared plans for facility expansion in Q4. Potential for 30% increase in orders for 2026.",
        tags: ["review", "growth", "expansion"],
      },
    ],
    recentOrders: [
      {
        id: "ORD-2025-1245",
        date: "2025-06-10",
        amount: 125000,
        status: "Processing",
      },
      {
        id: "ORD-2025-1180",
        date: "2025-05-15",
        amount: 98500,
        status: "Shipped",
      },
      {
        id: "ORD-2025-1092",
        date: "2025-04-22",
        amount: 115000,
        status: "Delivered",
      },
    ],
  };
  
  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg overflow-y-auto p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-xl">{client.name}</SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground">
                {client.industry} · {client.region}
              </SheetDescription>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-80px)] p-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 mt-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-4">Client Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Contact</p>
                      <p className="font-medium">{client.contactName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{client.contactEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{client.contactPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{client.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sales Rep</p>
                      <p className="font-medium">{client.salesRep}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Credit Level</p>
                      <p className="font-medium">{client.creditLevel}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Client Since</p>
                      <p className="font-medium">{client.yearSince}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Order</p>
                      <p className="font-medium">{new Date(client.lastOrder).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {client.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">AI-Generated Client Summary</h3>
                  <p className="text-muted-foreground italic">{client.aiSummary}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-4">Recent Orders</h3>
                  <div className="space-y-4">
                    {client.recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${order.amount.toLocaleString()}</p>
                          <Badge variant={
                            order.status === "Processing" ? "outline" :
                            order.status === "Shipped" ? "secondary" : "default"
                          }>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="communication" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-4">Weekly Communication Summary</h3>
                  
                  <div className="space-y-6">
                    {client.communications.map((comm) => (
                      <div key={comm.id} className="pb-4 border-b last:border-0 last:pb-0">
                        <h4 className="font-medium text-primary">Week of {comm.week}</h4>
                        <p className="mt-2 text-muted-foreground">{comm.summary}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {comm.tags.map((tag, index) => (
                            <Badge key={index} variant="outline">#{tag}</Badge>
                          ))}
                        </div>
                        <Button variant="outline" size="sm" className="mt-3">
                          View Email Thread
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
