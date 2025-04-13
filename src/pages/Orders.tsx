
import { useState } from "react";
import { ArrowUpDown, Download, Filter } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Sample data
const orders = [
  {
    id: "ORD-2025-1245",
    clientName: "Global Industries Inc.",
    date: "2025-06-10",
    status: "Processing",
    amount: 125000,
    products: "Industrial Sensors X-5200",
    unusual: false,
  },
  {
    id: "ORD-2025-1244",
    clientName: "Tech Solutions Ltd.",
    date: "2025-06-09",
    status: "Pending",
    amount: 85000,
    products: "Smart Control Systems",
    unusual: true,
  },
  {
    id: "ORD-2025-1243",
    clientName: "Premier Enterprises",
    date: "2025-06-08",
    status: "Shipped",
    amount: 45000,
    products: "Manufacturing Tools Kit",
    unusual: false,
  },
  {
    id: "ORD-2025-1242",
    clientName: "Acme Manufacturing",
    date: "2025-06-07",
    status: "Pending",
    amount: 67000,
    products: "Heavy Machinery Parts",
    unusual: false,
  },
  {
    id: "ORD-2025-1241",
    clientName: "Smart Systems Corp.",
    date: "2025-06-06",
    status: "Shipped",
    amount: 92000,
    products: "Enterprise Software License",
    unusual: false,
  },
  {
    id: "ORD-2025-1240",
    clientName: "Future Electronics",
    date: "2025-06-05",
    status: "Delivered",
    amount: 38000,
    products: "Industrial Sensors X-5200",
    unusual: false,
  },
  {
    id: "ORD-2025-1239",
    clientName: "Atlas Construction",
    date: "2025-06-05",
    status: "Canceled",
    amount: 56000,
    products: "Heavy Machinery Parts",
    unusual: false,
  },
  {
    id: "ORD-2025-1238",
    clientName: "Pacific Shipping Co.",
    date: "2025-06-04",
    status: "Delivered",
    amount: 74000,
    products: "Smart Control Systems",
    unusual: false,
  },
  {
    id: "ORD-2025-1237",
    clientName: "European Imports",
    date: "2025-06-03",
    status: "Processing",
    amount: 61000,
    products: "Manufacturing Tools Kit",
    unusual: false,
  },
  {
    id: "ORD-2025-1236",
    clientName: "Nordic Supplies",
    date: "2025-06-02",
    status: "Pending",
    amount: 115000,
    products: "Enterprise Software License",
    unusual: true,
  },
];

const Orders = () => {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  
  // Filter orders based on status filter
  const filteredOrders = orders.filter(order => {
    return selectedStatuses.length === 0 || selectedStatuses.includes(order.status);
  });
  
  // All possible statuses for filtering
  const allStatuses = [...new Set(orders.map(order => order.status))];
  
  // Helper for status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-warning text-warning-foreground";
      case "Processing": return "bg-secondary text-secondary-foreground";
      case "Shipped": return "bg-primary text-primary-foreground";
      case "Delivered": return "bg-success text-success-foreground";
      case "Canceled": return "bg-destructive text-destructive-foreground";
      default: return "";
    }
  };
  
  return (
    <AppLayout>
      <PageHeader 
        title="Order Management" 
        description="Monitor and manage all orders"
      >
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export to Excel
        </Button>
      </PageHeader>
      
      <Card>
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <h3 className="font-medium">Order List</h3>
            
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Status
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  {allStatuses.map((status) => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={selectedStatuses.includes(status)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedStatuses([...selectedStatuses, status]);
                        } else {
                          setSelectedStatuses(
                            selectedStatuses.filter((s) => s !== status)
                          );
                        }
                      }}
                    >
                      {status}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="flex items-center space-x-1">
                    <span>Order ID</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1">
                    <span>Date</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">
                  <div className="flex items-center space-x-1 justify-end">
                    <span>Amount</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Products</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    No orders found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {order.id}
                        {order.unusual && (
                          <Badge variant="destructive">Alert</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{order.clientName}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={cn(getStatusBadgeColor(order.status))}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${order.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate" title={order.products}>
                      {order.products}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </AppLayout>
  );
};

export default Orders;
