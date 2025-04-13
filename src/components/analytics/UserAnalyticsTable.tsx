
import React from "react";
import { Computer, Smartphone, Tablet, Watch } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Sample data for user analytics
const userAnalyticsData = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", timeSpent: "4h 32m", device: "desktop", lastVisit: "Today, 10:23 AM" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", timeSpent: "2h 15m", device: "mobile", lastVisit: "Today, 9:45 AM" },
  { id: 3, name: "David Johnson", email: "david.j@example.com", timeSpent: "3h 45m", device: "tablet", lastVisit: "Yesterday, 3:30 PM" },
  { id: 4, name: "Sarah Williams", email: "sarah.w@example.com", timeSpent: "1h 20m", device: "desktop", lastVisit: "Today, 8:15 AM" },
  { id: 5, name: "Michael Brown", email: "michael.b@example.com", timeSpent: "5h 10m", device: "mobile", lastVisit: "Today, 11:45 AM" },
  { id: 6, name: "Emily Davis", email: "emily.d@example.com", timeSpent: "0h 45m", device: "desktop", lastVisit: "Yesterday, 5:20 PM" },
  { id: 7, name: "Robert Wilson", email: "robert.w@example.com", timeSpent: "2h 30m", device: "tablet", lastVisit: "Today, 1:15 PM" },
  { id: 8, name: "Jennifer Miller", email: "jennifer.m@example.com", timeSpent: "3h 15m", device: "mobile", lastVisit: "Yesterday, 4:10 PM" },
  { id: 9, name: "William Taylor", email: "william.t@example.com", timeSpent: "1h 55m", device: "desktop", lastVisit: "Today, 9:30 AM" },
  { id: 10, name: "Elizabeth Anderson", email: "elizabeth.a@example.com", timeSpent: "4h 05m", device: "smartwatch", lastVisit: "Today, 10:05 AM" },
];

export function UserAnalyticsTable() {
  // Function to render the device icon based on the device type
  const renderDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop':
        return <Computer className="h-4 w-4 text-blue-500" />;
      case 'mobile':
        return <Smartphone className="h-4 w-4 text-green-500" />;
      case 'tablet':
        return <Tablet className="h-4 w-4 text-purple-500" />;
      case 'smartwatch':
        return <Watch className="h-4 w-4 text-orange-500" />;
      default:
        return <Computer className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Activity This Week</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Time Spent</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Last Visit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userAnalyticsData.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.timeSpent}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {renderDeviceIcon(user.device)}
                    <span className="capitalize">{user.device}</span>
                  </div>
                </TableCell>
                <TableCell>{user.lastVisit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
}
