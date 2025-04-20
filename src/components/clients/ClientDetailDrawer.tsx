import { ClientCommunication, updateSummary } from "@/api/clientService";
import { ClientBasicInfo } from "@/components/clients/ClientBasicInfo";
import { OrderTrendChart } from "@/components/clients/OrderTrendChart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useClientData } from "@/hooks/useClientData";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart2,
  Clock,
  DollarSign,
  Download,
  Loader2,
  MessageSquare,
  Paperclip,
  Pencil,
  PieChart,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { EditSummaryDialog } from "./EditSummaryDialog";

interface ClientDetailDrawerProps {
  customerCode: string | null;
  onClose: () => void;
  open: boolean;
}

export function ClientDetailDrawer({ customerCode, onClose, open }: ClientDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState("journey");
  const [editingCommunication, setEditingCommunication] = useState<{
    id: number;
    summary: string;
    tags: string[];
    weekLabel: string;
  } | null>(null);
  const [quarterTrendImage, setQuarterTrendImage] = useState<string | null>(null);
  const [isLoadingTrendImage, setIsLoadingTrendImage] = useState(false);
  const { 
    client, 
    communications, 
    orders, 
    summary,
    isLoading, 
    isLoadingCommunications,
    isLoadingOrders,
    error, 
    fetchCommunications,
    fetchOrders,
    refetch 
  } = useClientData(customerCode);

  useEffect(() => {
    if (!client) return;

    if (activeTab === "journey" && communications.length === 0) {
      fetchCommunications();
    } else if (activeTab === "orders" && orders.length === 0) {
      fetchOrders();
    }
  }, [activeTab, client, communications.length, orders.length, fetchCommunications, fetchOrders]);

  useEffect(() => {
    const fetchQuarterTrendImage = async () => {
      if (!customerCode || activeTab !== "orders") return;
      
      try {
        setIsLoadingTrendImage(true);
        const { data, error } = await supabase.functions.invoke('get-client-quarter-trend', {
          body: { customerCode }
        });

        if (error) throw error;
        if (data?.image) {
          setQuarterTrendImage(data.image);
        }
      } catch (err) {
        console.error('Error fetching quarter trend image:', err);
        toast.error('获取季度趋势图失败');
      } finally {
        setIsLoadingTrendImage(false);
      }
    };

    fetchQuarterTrendImage();
  }, [customerCode, activeTab]);

  if (!open) return null;

  if (isLoading) {
    return (
      <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
        <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto p-0">
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">加载客户基础信息...</p>
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
            <p className="text-red-500">{error || "未找到客户信息"}</p>
            <Button onClick={onClose}>关闭</Button>
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

  const handleEditClick = (communication: ClientCommunication) => {
    setEditingCommunication({
      id: communication.id,
      summary: communication.summary || "",
      tags: communication.tags || [],
      weekLabel: communication.week_label || "Unknown date",
    });
  };

  const handleSaveSummary = async (newSummary: string, newTags: string) => {
    if (!editingCommunication) return;

    const success = await updateSummary(editingCommunication.id, newSummary, newTags);
    if (success) {
      await refetch();
      toast.success("摘要更新成功");
      setEditingCommunication(null);
    } else {
      toast.error("更新失败");
    }
  };

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
            <ClientBasicInfo client={client} />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="journey">Customer Journey</TabsTrigger>
                <TabsTrigger value="orders">Orders & Trends</TabsTrigger>
                <TabsTrigger value="attachments">Attachments</TabsTrigger>
              </TabsList>

              <TabsContent value="journey" className="space-y-4 mt-4">
                <>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>AI-Generated Client Summary</CardTitle>
                        {editingCommunication ? (
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => setEditingCommunication(null)}>
                              <X className="h-4 w-4 mr-2" />
                              <span>取消</span>
                            </Button>
                          </div>
                        ) : (
                          <Button variant="ghost" size="sm" onClick={() => handleEditClick(communications[0])}>
                            <Pencil className="h-4 w-4 mr-2" />
                            <span>编辑</span>
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {editingCommunication ? (
                        <Textarea
                          value={editingCommunication.summary}
                          onChange={(e) => setEditingCommunication({
                            ...editingCommunication,
                            summary: e.target.value
                          })}
                          className="min-h-[100px]"
                        />
                      ) : (
                        <p className="text-muted-foreground italic">
                          {summary?.ai_summary || "No client summary available."}
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {summary?.key_insights && summary.key_insights.length > 0 && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Key Insights</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside text-muted-foreground">
                          {summary.key_insights.map((insight, idx) => (
                            <li key={idx}>{insight}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Weekly Communication Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoadingCommunications ? (
                        <div className="flex items-center justify-center h-32">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <p className="ml-2">加载通信记录...</p>
                        </div>
                      ) : communications.length > 0 ? (
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
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-1"
                                  onClick={() => handleEditClick(comm)}
                                >
                                  <MessageSquare className="h-3.5 w-3.5" />
                                  <span>编辑</span>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">暂无通信记录</p>
                      )}
                    </CardContent>
                  </Card>
                </>
              </TabsContent>

              <TabsContent value="orders" className="mt-4">
                {isLoadingOrders ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="ml-2">加载订单数据...</p>
                  </div>
                ) : (
                  <>
                    {isLoadingTrendImage ? (
                      <div className="flex items-center justify-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="ml-2">加载趋势图...</p>
                      </div>
                    ) : quarterTrendImage ? (
                      <Card className="mb-4">
                        <CardHeader className="pb-2">
                          <CardTitle>Order Trend Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <img 
                            src={quarterTrendImage} 
                            alt="Order Trend" 
                            className="w-full rounded-lg"
                          />
                        </CardContent>
                      </Card>
                    ) : (
                      <OrderTrendChart clientName={client.company} className="mb-4" />
                    )}
                    
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
                  </>
                )}
              </TabsContent>

              <TabsContent value="attachments" className="mt-4">
                {isLoadingCommunications ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="ml-2">加载附件数据...</p>
                  </div>
                ) : (
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
                )}
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>

        <EditSummaryDialog
          open={!!editingCommunication}
          onOpenChange={(open) => !open && setEditingCommunication(null)}
          initialSummary={editingCommunication?.summary || ""}
          initialTags={editingCommunication?.tags.join(", ") || ""}
          weekLabel={editingCommunication?.weekLabel || ""}
          onSave={handleSaveSummary}
        />
      </SheetContent>
    </Sheet>
  );
}
