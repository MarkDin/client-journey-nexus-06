
import { useState, useEffect } from "react";
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar, 
  CreditCard, 
  ShoppingBag, 
  Download, 
  FileText, 
  BarChart2, 
  Paperclip, 
  Clock, 
  MessageSquare, 
  ExternalLink,
  PieChart,
  DollarSign,
  Loader2
} from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription, 
  SheetClose 
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { OrderTrendChart } from "@/components/clients/OrderTrendChart";
import { useClientData } from "@/hooks/useClientData";
import { format } from "date-fns";

interface ClientDetailDrawerProps {
  clientId: number | null;
  onClose: () => void;
  open: boolean;
}

export function ClientDetailDrawer({ clientId, onClose, open }: ClientDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState("journey");
  const { client, communications, orders, isLoading, error } = useClientData(clientId);
  
  if (!open) return null;
  
  if (isLoading) {
    return (
      <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
        <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto p-0">
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">Loading client data...</p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }
  
  if (error || !client) {
    return (
      <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
        <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto p-0">
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <p className="text-red-500">{error || "Client not found"}</p>
            <Button onClick={onClose}>Close</Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }
  
  const creditUsagePercentage = client.credit_limit ? (client.credit_used || 0) / client.credit_limit * 100 : 0;
  const formattedOrders = orders.map(order => ({
    id: order.id.substring(0, 8).toUpperCase(),
    date: order.order_month || "Unknown",
    amount: order.order_amount || 0,
    status: order.order_month && new Date(order.order_month) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) 
      ? "Processing" 
      : new Date(order.order_month || "") > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) 
        ? "Shipped" 
        : "Delivered"
  }));
  
  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto p-0">
        <SheetHeader className="p-4 border-b sticky top-0 bg-background z-10">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-xl">{client.company}</SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground">
                {client.industry} {client.region ? `· ${client.region}` : ''}
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
          <div className="p-4">
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Primary Contact</p>
                    <div className="flex items-center gap-2 mt-1">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{client.name}</p>
                    </div>
                    
                    <div className="flex flex-col gap-1 mt-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{client.email || "No email provided"}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{client.phone || "No phone provided"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Client Details</p>
                    <div className="space-y-1 mt-1">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">Since {new Date(client.created_at || "").getFullYear()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{client.address || "No address provided"}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">Next meeting: {client.next_meeting ? 
                          new Date(client.next_meeting).toLocaleString() : 
                          "Not scheduled"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Credit Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{client.credit_level || "Not set"}</p>
                    </div>
                    
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Credit Used</span>
                        <span>${client.credit_used?.toLocaleString() || 0} of ${client.credit_limit?.toLocaleString() || 0}</span>
                      </div>
                      <Progress value={creditUsagePercentage} className="h-2" />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Last Order</p>
                    <div className="flex items-center gap-2 mt-1">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">
                        ${formattedOrders.length > 0 ? formattedOrders[0].amount.toLocaleString() : "No orders"}
                      </p>
                    </div>
                    {formattedOrders.length > 0 && (
                      <p className="text-xs text-muted-foreground ml-6">
                        {formattedOrders[0].id} · {formattedOrders[0].date}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {client.tags && client.tags.length > 0 ? client.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    )) : <span className="text-sm text-muted-foreground">No tags</span>}
                  </div>
                </div>
              </CardContent>
            </Card>
          
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="journey">Customer Journey</TabsTrigger>
                <TabsTrigger value="orders">Orders & Trends</TabsTrigger>
                <TabsTrigger value="attachments">Attachments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="journey" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>AI-Generated Client Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">
                      {client.ai_summary || "No client summary available."}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Weekly Communication Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {communications.length > 0 ? (
                      <div className="space-y-6">
                        {communications.map((comm) => (
                          <div key={comm.id} className="pb-4 border-b last:border-0 last:pb-0">
                            <h4 className="font-medium text-primary flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              Week of {comm.week_label || 'Unknown date'}
                            </h4>
                            <p className="mt-2 text-muted-foreground">{comm.summary || 'No summary available'}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {comm.tags && comm.tags.map((tag, index) => (
                                <Badge key={index} variant="outline">#{tag}</Badge>
                              ))}
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Button variant="outline" size="sm" className="gap-1">
                                <MessageSquare className="h-3.5 w-3.5" />
                                <span>View Emails ({comm.thread_count || 0})</span>
                              </Button>
                              <Button variant="outline" size="sm" className="gap-1">
                                <ExternalLink className="h-3.5 w-3.5" />
                                <span>Full Timeline</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No communication records available.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="orders" className="mt-4">
                <OrderTrendChart clientName={client.company} className="mb-4" />
                
                <Card>
                  <CardHeader className="pb-2 flex items-center justify-between">
                    <CardTitle>Recent Orders</CardTitle>
                    <Button variant="outline" size="sm" className="gap-1">
                      <DollarSign className="h-3.5 w-3.5" />
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {formattedOrders.length > 0 ? (
                      <div className="space-y-4">
                        {formattedOrders.map((order, index) => (
                          <div key={index} className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0">
                            <div>
                              <p className="font-medium">{order.id}</p>
                              <p className="text-sm text-muted-foreground">{order.date}</p>
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
                    ) : (
                      <p className="text-muted-foreground">No recent orders available.</p>
                    )}
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Product Mix</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 flex items-center justify-center">
                      <div className="w-20 h-20 flex items-center justify-center">
                        <PieChart className="w-full h-full text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Margin Trend</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 flex items-center justify-center">
                      <div className="w-20 h-20 flex items-center justify-center">
                        <BarChart2 className="w-full h-full text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="attachments" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Email Attachments</CardTitle>
                    <CardDescription>Recent documents shared with the client</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {communications.length > 0 && communications.some(c => c.attachments && c.attachments.length > 0) ? (
                      <div className="space-y-3">
                        {communications.flatMap((comm, commIndex) => 
                          comm.attachments ? Array.isArray(comm.attachments) ? 
                            comm.attachments.map((attachment, attIndex) => (
                              <div key={`${commIndex}-${attIndex}`} className="flex items-center justify-between p-3 border rounded-md">
                                <div className="flex items-center gap-3">
                                  <div className="bg-muted p-2 rounded">
                                    <Paperclip className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{attachment.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {attachment.type.toUpperCase()} · {attachment.size} · {new Date(attachment.date).toLocaleDateString()}
                                    </p>
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
                            )) : [] : []
                        )}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No attachments available.</p>
                    )}
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
