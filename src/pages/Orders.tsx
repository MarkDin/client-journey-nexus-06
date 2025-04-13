
import { useState, useRef } from "react";
import { ArrowUpDown, Upload } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Sample data - removed status field
const initialOrders = [
  {
    id: "ORD-2025-1245",
    clientName: "Global Industries Inc.",
    date: "2025-06-10",
    amount: 125000,
    products: "Industrial Sensors X-5200",
    unusual: false,
  },
  {
    id: "ORD-2025-1244",
    clientName: "Tech Solutions Ltd.",
    date: "2025-06-09",
    amount: 85000,
    products: "Smart Control Systems",
    unusual: true,
  },
  {
    id: "ORD-2025-1243",
    clientName: "Premier Enterprises",
    date: "2025-06-08",
    amount: 45000,
    products: "Manufacturing Tools Kit",
    unusual: false,
  },
  {
    id: "ORD-2025-1242",
    clientName: "Acme Manufacturing",
    date: "2025-06-07",
    amount: 67000,
    products: "Heavy Machinery Parts",
    unusual: false,
  },
  {
    id: "ORD-2025-1241",
    clientName: "Smart Systems Corp.",
    date: "2025-06-06",
    amount: 92000,
    products: "Enterprise Software License",
    unusual: false,
  },
  {
    id: "ORD-2025-1240",
    clientName: "Future Electronics",
    date: "2025-06-05",
    amount: 38000,
    products: "Industrial Sensors X-5200",
    unusual: false,
  },
  {
    id: "ORD-2025-1239",
    clientName: "Atlas Construction",
    date: "2025-06-05",
    amount: 56000,
    products: "Heavy Machinery Parts",
    unusual: false,
  },
  {
    id: "ORD-2025-1238",
    clientName: "Pacific Shipping Co.",
    date: "2025-06-04",
    amount: 74000,
    products: "Smart Control Systems",
    unusual: false,
  },
  {
    id: "ORD-2025-1237",
    clientName: "European Imports",
    date: "2025-06-03",
    amount: 61000,
    products: "Manufacturing Tools Kit",
    unusual: false,
  },
  {
    id: "ORD-2025-1236",
    clientName: "Nordic Supplies",
    date: "2025-06-02",
    amount: 115000,
    products: "Enterprise Software License",
    unusual: true,
  },
];

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if it's an Excel file
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls') && !file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file format",
        description: "Please select an Excel or CSV file",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, you would parse the Excel file here
    // For this demo, we'll just show a success message
    toast({
      title: "Import successful",
      description: `Imported ${file.name}`,
    });
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <AppLayout>
      <PageHeader 
        title="Order Management" 
        description="Monitor and manage all orders"
      >
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".xlsx,.xls,.csv"
            className="hidden"
          />
          <Button variant="outline" onClick={handleImportClick}>
            <Upload className="h-4 w-4 mr-2" />
            Import from Excel
          </Button>
        </div>
      </PageHeader>
      
      <Card>
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <h3 className="font-medium">Order List</h3>
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
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
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
