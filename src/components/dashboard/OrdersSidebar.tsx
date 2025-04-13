
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

// Sample data for weekly orders
const weeklyOrders = [
  { id: "ORD-7293", customer: "Tech Solutions Inc.", date: "2025-04-08", amount: "$1,240.00", status: "Shipped" },
  { id: "ORD-7294", customer: "Global Manufacturing Co.", date: "2025-04-09", amount: "$3,890.50", status: "Processing" },
  { id: "ORD-7295", customer: "Green Energy Systems", date: "2025-04-10", amount: "$2,107.75", status: "Delivered" },
  { id: "ORD-7296", customer: "Urban Design Studio", date: "2025-04-10", amount: "$845.00", status: "Processing" },
  { id: "ORD-7297", customer: "Healthcare Essentials", date: "2025-04-11", amount: "$5,621.30", status: "Shipped" },
  { id: "ORD-7298", customer: "Retail Connections Ltd.", date: "2025-04-11", amount: "$1,890.00", status: "Processing" },
  { id: "ORD-7299", customer: "Fitness Equipment Pro", date: "2025-04-12", amount: "$3,450.25", status: "Pending" },
  { id: "ORD-7300", customer: "Oceanic Supplies", date: "2025-04-12", amount: "$1,275.50", status: "Processing" },
  { id: "ORD-7301", customer: "Mountain Gear Outlet", date: "2025-04-13", amount: "$2,390.00", status: "Pending" },
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
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weeklyOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>
                    <span 
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === "Delivered" 
                          ? "bg-green-100 text-green-800" 
                          : order.status === "Shipped" 
                          ? "bg-blue-100 text-blue-800" 
                          : order.status === "Processing" 
                          ? "bg-yellow-100 text-yellow-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
