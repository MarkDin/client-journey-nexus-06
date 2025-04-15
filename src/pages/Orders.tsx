import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { useOrdersData } from "@/hooks/useOrdersData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useClientDrawer } from "@/contexts/ClientDrawerContext";
import { Search, SlidersHorizontal, Calendar, ArrowUpDown, Package, Clock } from "lucide-react";
import { useState } from "react";

export default function Orders() {
  const { orders, isLoading, error } = useOrdersData();
  const { openClientDrawer } = useClientDrawer();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter orders based on search query and active tab
  const filteredOrders = orders.filter((order) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      order.clientName.toLowerCase().includes(query) ||
      order.id.toLowerCase().includes(query) ||
      order.products.toLowerCase().includes(query);
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "processing") return matchesSearch && order.status === "Processing";
    if (activeTab === "shipped") return matchesSearch && order.status === "Shipped";
    if (activeTab === "delivered") return matchesSearch && order.status === "Delivered";
    
    return matchesSearch;
  });

  const handleClientClick = (clientId: string) => {
    openClientDrawer(clientId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing": return "bg-blue-50 text-blue-700 hover:bg-blue-50";
      case "Shipped": return "bg-amber-50 text-amber-700 hover:bg-amber-50";
      case "Delivered": return "bg-green-50 text-green-700 hover:bg-green-50";
      default: return "";
    }
  };

  return (
    <AppLayout>
      <PageHeader 
        title="Orders" 
        description="View and manage orders"
      />
      
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search orders..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
              <Button>New Order</Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-4">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border rounded-md p-4">
                      <div className="flex justify-between">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                        <Skeleton className="h-10 w-[100px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-10">
                  <p className="text-red-500">Failed to load orders. Please try again.</p>
                  <Button variant="outline" className="mt-4">Retry</Button>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No orders found matching your criteria.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">Order #{order.id}</h3>
                            <Badge variant="outline" className={getStatusColor(order.status || "")}>
                              {order.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{order.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Package className="h-3.5 w-3.5" />
                              <span>{order.products}</span>
                            </div>
                          </div>
                          
                          <div 
                            className="mt-2 text-sm text-primary font-medium cursor-pointer hover:underline"
                            onClick={() => handleClientClick(order.clientId)}
                          >
                            {order.clientName}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-medium">${order.amount.toLocaleString()}</div>
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">Details</Button>
                            <Button size="sm">Track</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
