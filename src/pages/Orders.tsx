
import { useState, useRef, useEffect } from "react";
import { ArrowUpDown, Upload, Search, Filter, Download, PlusCircle } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useClientDrawer } from "@/contexts/ClientDrawerContext";

const initialOrders = [
  {
    id: "ORD-2025-1245",
    clientName: "Global Industries Inc.",
    clientId: 1,
    date: "2025-06-10",
    amount: 125000,
    products: "Industrial Sensors X-5200",
  },
  {
    id: "ORD-2025-1244",
    clientName: "Tech Solutions Ltd.",
    clientId: 2,
    date: "2025-06-09",
    amount: 85000,
    products: "Smart Control Systems",
  },
  {
    id: "ORD-2025-1243",
    clientName: "Premier Enterprises",
    clientId: 3,
    date: "2025-06-08",
    amount: 45000,
    products: "Manufacturing Tools Kit",
  },
  {
    id: "ORD-2025-1242",
    clientName: "Acme Manufacturing",
    clientId: 4,
    date: "2025-06-07",
    amount: 67000,
    products: "Heavy Machinery Parts",
  },
  {
    id: "ORD-2025-1241",
    clientName: "Smart Systems Corp.",
    clientId: 5,
    date: "2025-06-06",
    amount: 92000,
    products: "Enterprise Software License",
  },
  {
    id: "ORD-2025-1240",
    clientName: "Future Electronics",
    clientId: 6,
    date: "2025-06-05",
    amount: 38000,
    products: "Industrial Sensors X-5200",
  },
  {
    id: "ORD-2025-1239",
    clientName: "Atlas Construction",
    clientId: 7,
    date: "2025-06-05",
    amount: 56000,
    products: "Heavy Machinery Parts",
  },
  {
    id: "ORD-2025-1238",
    clientName: "Pacific Shipping Co.",
    clientId: 8,
    date: "2025-06-04",
    amount: 74000,
    products: "Smart Control Systems",
  },
  {
    id: "ORD-2025-1237",
    clientName: "European Imports",
    clientId: 9,
    date: "2025-06-03",
    amount: 61000,
    products: "Manufacturing Tools Kit",
  },
  {
    id: "ORD-2025-1236",
    clientName: "Nordic Supplies",
    clientId: 10,
    date: "2025-06-02",
    amount: 115000,
    products: "Enterprise Software License",
  },
];

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<{ field: string; direction: 'asc' | 'desc' }>({ 
    field: 'date', direction: 'desc' 
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { openClientDrawer } = useClientDrawer();
  
  useEffect(() => {
    // Filter and sort orders based on search query and sort order
    let result = [...orders];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(query) ||
        order.clientName.toLowerCase().includes(query) ||
        order.products.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const field = sortOrder.field;
      
      if (field === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      if (field === 'amount') {
        return sortOrder.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
      
      // Default to string comparison for other fields
      const valueA = String(a[field as keyof typeof a]).toLowerCase();
      const valueB = String(b[field as keyof typeof b]).toLowerCase();
      
      return sortOrder.direction === 'asc' 
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
    
    setFilteredOrders(result);
  }, [orders, searchQuery, sortOrder]);
  
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
  
  const handleClientClick = (clientId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    openClientDrawer(clientId);
  };
  
  const handleSortClick = (field: string) => {
    setSortOrder(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                <TableHead>
                  <div 
                    className="flex items-center space-x-1 cursor-pointer"
                    onClick={() => handleSortClick('id')}
                  >
                    <span>Order ID</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>
                  <div 
                    className="flex items-center space-x-1 cursor-pointer"
                    onClick={() => handleSortClick('date')}
                  >
                    <span>Date</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-right">
                  <div 
                    className="flex items-center space-x-1 justify-end cursor-pointer"
                    onClick={() => handleSortClick('amount')}
                  >
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
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    No orders found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
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
