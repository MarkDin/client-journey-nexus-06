import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrdersData } from "@/hooks/useOrdersData";
import { useClientDrawerStore } from "@/store/useClientDrawerStore";
import { Download, Filter, PlusCircle, Search, Upload } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

const Orders = () => {
  const { orders, isLoading } = useOrdersData();
  const openDrawer = useClientDrawerStore(state => state.openDrawer);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls') && !file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file format",
        description: "Please select an Excel or CSV file",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Import successful",
      description: `Imported ${file.name}`,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClientClick = (clientId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    openDrawer(clientId);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Order Management"
        description="Monitor and manage all orders"
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".xlsx,.xls,.csv"
            className="hidden"
          />
          <Button variant="outline" onClick={handleImportClick}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </PageHeader>

      <Card>
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <h3 className="font-medium">Order List</h3>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  className="pl-8"
                />
              </div>

              <Button variant="outline" size="sm" className="h-10">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>

              <Button variant="outline" size="sm" className="h-10">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    Loading orders...
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.id}
                    </TableCell>
                    <TableCell
                      className="text-primary hover:underline cursor-pointer"
                      onClick={(e) => handleClientClick(order.clientId, e)}
                    >
                      {order.clientName}
                    </TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right font-medium">
                      ${order.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate" title={order.products}>
                      {order.products}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        order.status === "Processing" ? "outline" :
                          order.status === "Shipped" ? "secondary" : "default"
                      }>
                        {order.status}
                      </Badge>
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
