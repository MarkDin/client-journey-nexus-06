
import { X } from "lucide-react";
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerDescription, 
  DrawerHeader, 
  DrawerTitle 
} from "@/components/ui/drawer";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Sample data for weekly orders - status field removed
const weeklyOrders = [
  { id: "ORD-7293", customer: "Tech Solutions Inc.", date: "2025-04-08", amount: "$1,240.00" },
  { id: "ORD-7294", customer: "Global Manufacturing Co.", date: "2025-04-09", amount: "$3,890.50" },
  { id: "ORD-7295", customer: "Green Energy Systems", date: "2025-04-10", amount: "$2,107.75" },
  { id: "ORD-7296", customer: "Urban Design Studio", date: "2025-04-10", amount: "$845.00" },
  { id: "ORD-7297", customer: "Healthcare Essentials", date: "2025-04-11", amount: "$5,621.30" },
  { id: "ORD-7298", customer: "Retail Connections Ltd.", date: "2025-04-11", amount: "$1,890.00" },
  { id: "ORD-7299", customer: "Fitness Equipment Pro", date: "2025-04-12", amount: "$3,450.25" },
  { id: "ORD-7300", customer: "Oceanic Supplies", date: "2025-04-12", amount: "$1,275.50" },
  { id: "ORD-7301", customer: "Mountain Gear Outlet", date: "2025-04-13", amount: "$2,390.00" },
];

interface OrdersSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrdersSidebar({ isOpen, onClose }: OrdersSidebarProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle>Weekly New Orders</DrawerTitle>
              <DrawerDescription>
                All new orders received this week
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="p-4 overflow-auto max-h-[calc(85vh-80px)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weeklyOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
