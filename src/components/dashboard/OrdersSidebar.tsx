
import { X, ArrowUpDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Order {
  id: string;
  client: {
    id: number;
    name: string;
  };
  date: string;
  amount: number;
  country: string;
}

interface OrdersSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onClientSelect?: (clientId: number) => void;
}

const recentOrders: Order[] = [
  {
    id: "ORD-2025-1245",
    client: { id: 1, name: "Global Industries Inc." },
    date: "2025-06-10",
    amount: 125000,
    country: "USA"
  },
  {
    id: "ORD-2025-1244",
    client: { id: 2, name: "Tech Solutions Ltd." },
    date: "2025-06-09",
    amount: 85000,
    country: "UK"
  },
  {
    id: "ORD-2025-1243",
    client: { id: 3, name: "Premier Enterprises" },
    date: "2025-06-08",
    amount: 45000,
    country: "Germany"
  },
  {
    id: "ORD-2025-1242",
    client: { id: 4, name: "Acme Manufacturing" },
    date: "2025-06-07",
    amount: 67000,
    country: "USA"
  },
  {
    id: "ORD-2025-1241",
    client: { id: 5, name: "Smart Systems Corp." },
    date: "2025-06-06",
    amount: 92000,
    country: "Canada"
  },
  {
    id: "ORD-2025-1240",
    client: { id: 6, name: "Future Electronics" },
    date: "2025-06-05",
    amount: 38000,
    country: "Japan"
  },
  {
    id: "ORD-2025-1239",
    client: { id: 7, name: "Atlas Construction" },
    date: "2025-06-05",
    amount: 56000,
    country: "USA"
  },
  {
    id: "ORD-2025-1238",
    client: { id: 8, name: "Pacific Shipping Co." },
    date: "2025-06-04",
    amount: 74000,
    country: "Australia"
  }
];

export function OrdersSidebar({ isOpen, onClose, onClientSelect }: OrdersSidebarProps) {
  const handleClientClick = (clientId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    if (onClientSelect) {
      onClientSelect(clientId);
    }
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle>Weekly New Orders</SheetTitle>
              <SheetDescription>
                Recent orders from the past 7 days
              </SheetDescription>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Input placeholder="Search orders..." />
          </div>
          
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[130px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="usa">USA</SelectItem>
                <SelectItem value="uk">UK</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="japan">Japan</SelectItem>
                <SelectItem value="australia">Australia</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="date-desc">
              <SelectTrigger className="w-[130px]">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Date (New-Old)</SelectItem>
                <SelectItem value="date-asc">Date (Old-New)</SelectItem>
                <SelectItem value="amount-desc">Amount (High-Low)</SelectItem>
                <SelectItem value="amount-asc">Amount (Low-High)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell 
                      className="text-primary hover:underline cursor-pointer"
                      onClick={(e) => handleClientClick(order.client.id, e)}
                    >
                      {order.client.name}
                    </TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>{order.country}</TableCell>
                    <TableCell className="text-right">${order.amount.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Showing 8 of 247 orders from the past week
        </div>
      </SheetContent>
    </Sheet>
  );
}
