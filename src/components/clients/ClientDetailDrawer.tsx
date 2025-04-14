
import { useState } from "react";
import { X, User, Mail, Phone, MapPin, Building, Calendar, CreditCard, ShoppingBag, Download, FileText, BarChart2, Paperclip } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ClientDetailDrawerProps {
  clientId: number | null;
  onClose: () => void;
  open: boolean;
}

export function ClientDetailDrawer({ clientId, onClose, open }: ClientDetailDrawerProps) {
  // This would typically fetch client data based on the ID
  // For now, we'll use hardcoded data as a demo
  const client = clientId ? {
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
    orderHistory: [
      { quarter: "Q1 2025", value: 265000 },
      { quarter: "Q2 2025", value: 323500 },
      { quarter: "Q3 2024", value: 214000 },
      { quarter: "Q4 2024", value: 278000 },
    ],
    attachments: [
      { name: "Contract_2025_Renewal.pdf", date: "2025-05-12", type: "pdf", size: "1.2 MB" },
      { name: "Product_Specifications.xlsx", date: "2025-04-28", type: "xlsx", size: "650 KB" },
      { name: "Meeting_Notes_Q2_Review.docx", date: "2025-06-03", type: "docx", size: "320 KB" },
      { name: "Proposal_Automation_System.pdf", date: "2025-05-30", type: "pdf", size: "2.8 MB" },
    ]
  } : null;
  
  if (!client) return null;
  
  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto p-0">
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
        
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4">
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <div className="flex items-center gap-2 mt-1">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{client.contactName}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Order</p>
                    <div className="flex items-center gap-2 mt-1">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">${client.recentOrders[0].amount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{client.contactEmail}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{client.contactPhone}</p>
                    </div>
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
          
            <Tabs defaultValue="journey" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="journey">Customer Journey</TabsTrigger>
                <TabsTrigger value="orders">Order Trend</TabsTrigger>
                <TabsTrigger value="attachments">Attachments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="journey" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>AI-Generated Client Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">{client.aiSummary}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Weekly Communication Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
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
              
              <TabsContent value="orders" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Quarterly Order Volume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      {/* Order history chart - simplified for now */}
                      <div className="h-full flex items-end justify-between gap-2">
                        {client.orderHistory.map((quarter) => (
                          <div key={quarter.quarter} className="flex flex-col items-center gap-2">
                            <div 
                              className="bg-primary w-16 rounded-t-md" 
                              style={{ height: `${(quarter.value / 350000) * 100}%` }}
                            ></div>
                            <div className="text-xs font-medium">{quarter.quarter}</div>
                            <div className="text-xs text-muted-foreground">${(quarter.value / 1000).toFixed(0)}K</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-4">
                  <CardHeader className="pb-2">
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
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
              
              <TabsContent value="attachments" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Email Attachments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {client.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="bg-muted p-2 rounded">
                              <Paperclip className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{attachment.name}</p>
                              <p className="text-xs text-muted-foreground">{attachment.type.toUpperCase()} · {attachment.size}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              Preview
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
