
import { useState } from "react";
import { 
  Building, 
  Mail, 
  MapPin, 
  Phone, 
  User, 
  Calendar, 
  CreditCard,
  ShoppingBag,
  Clock,
  Download,
  X,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose
} from "@/components/ui/sheet";

interface ClientDetailDrawerProps {
  clientId: number;
  open: boolean;
  onClose: () => void;
}

export function ClientDetailDrawer({ clientId, open, onClose }: ClientDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState("journey");
  
  // This would typically fetch client data based on the ID
  // For now, we'll use hardcoded data as a demo
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
    orderHistory: [
      { month: "Jan", value: 85000 },
      { month: "Feb", value: 92000 },
      { month: "Mar", value: 88000 },
      { month: "Apr", value: 99000 },
      { month: "May", value: 98500 },
      { month: "Jun", value: 125000 },
    ],
    attachments: [
      { name: "Contract_2025.pdf", size: "1.2 MB", date: "2025-03-15" },
      { name: "PriceQuote_Q2_2025.xlsx", size: "0.5 MB", date: "2025-04-02" },
      { name: "ProductSpecifications.docx", size: "0.8 MB", date: "2025-04-10" },
      { name: "ServiceAgreement.pdf", size: "1.5 MB", date: "2025-05-22" }
    ]
  };
  
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl overflow-y-auto">
        <SheetHeader className="pb-2 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold">{client.name}</SheetTitle>
          </div>
          <SheetDescription className="flex flex-wrap gap-2 mt-2">
            {client.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">{tag}</Badge>
            ))}
          </SheetDescription>
        </SheetHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
          {/* Left Column - Client Info Card */}
          <div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Building className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{client.name}</h3>
                      <p className="text-sm text-muted-foreground">{client.industry}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{client.contactName}</p>
                        <p className="text-xs text-muted-foreground">Primary Contact</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{client.contactEmail}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{client.contactPhone}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{client.address}</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">Sales Rep</p>
                    </div>
                    <p className="text-sm font-medium">{client.salesRep}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">Credit Level</p>
                    </div>
                    <Badge variant="outline">{client.creditLevel}</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">Client Since</p>
                    </div>
                    <p className="text-sm font-medium">{client.yearSince}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">Last Order</p>
                    </div>
                    <p className="text-sm font-medium">{new Date(client.lastOrder).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Tabs with Client Details */}
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">AI-Generated Summary</CardTitle>
                <CardDescription>Based on past communication and order history</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{client.aiSummary}</p>
              </CardContent>
            </Card>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="journey">Customer Journey</TabsTrigger>
                <TabsTrigger value="orders">Order Trend</TabsTrigger>
                <TabsTrigger value="attachments">Attachments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="journey" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Weekly Communication Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {client.communications.map((comm) => (
                        <div key={comm.id} className="pb-4 border-b last:border-0 last:pb-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <h4 className="font-medium text-primary">Week of {comm.week}</h4>
                          </div>
                          <p className="text-muted-foreground text-sm">{comm.summary}</p>
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
                    <CardTitle className="text-lg">Order Trend (2025)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      {/* Order history chart would go here - simplified for now */}
                      <div className="h-full flex items-end justify-between gap-2">
                        {client.orderHistory.map((month) => (
                          <div key={month.month} className="flex flex-col items-center gap-2">
                            <div 
                              className="bg-primary w-12 rounded-t-md" 
                              style={{ height: `${(month.value / 125000) * 100}%` }}
                            ></div>
                            <div className="text-xs font-medium">{month.month}</div>
                            <div className="text-xs text-muted-foreground">${(month.value / 1000).toFixed(0)}K</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="attachments" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Attachments</CardTitle>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {client.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">{file.size} • {file.date}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
