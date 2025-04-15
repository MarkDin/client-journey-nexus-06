
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  ArrowUpDown,
  Check,
  CreditCard,
  Search,
  SlidersHorizontal,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ClientTableProps {
  clients?: any[];
  isLoading?: boolean;
  onClientClick?: (clientId: string) => void;
}

export function ClientTable({ clients = [], isLoading = false, onClientClick }: ClientTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter based on search query
  const filteredClients = clients.filter((client) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    
    return (
      client.company?.toLowerCase().includes(query) ||
      client.name?.toLowerCase().includes(query) ||
      client.industry?.toLowerCase().includes(query) ||
      client.customer_code?.toLowerCase().includes(query)
    );
  });

  const renderStatus = (status: number | null) => {
    if (status === 1) {
      return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Active</Badge>;
    } else if (status === 2) {
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">Pending</Badge>;
    } else if (status === 0) {
      return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">Inactive</Badge>;
    }
    return <Badge variant="outline">Unknown</Badge>;
  };
  
  const renderScore = (score: number | null) => {
    if (!score) return 'N/A';
    
    if (score >= 90) return <span className="font-semibold text-green-600">A+</span>;
    if (score >= 80) return <span className="font-semibold text-green-600">A</span>;
    if (score >= 70) return <span className="font-semibold text-green-500">B+</span>;
    if (score >= 60) return <span className="font-semibold text-yellow-500">B</span>;
    if (score >= 50) return <span className="font-semibold text-yellow-600">C+</span>;
    if (score >= 40) return <span className="font-semibold text-yellow-700">C</span>;
    
    return <span className="font-semibold text-red-500">D</span>;
  };

  const handleRowClick = (clientId: string) => {
    if (onClientClick) {
      onClientClick(clientId);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="w-64">
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
          <div className="border rounded-md">
            <div className="grid grid-cols-6 p-4 border-b">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="grid grid-cols-6 p-4 border-b">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search clients..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <Button>Add Client</Button>
          </div>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[240px]">Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Orders</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <TableRow 
                    key={client.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleRowClick(client.id)}
                  >
                    <TableCell className="font-medium">{client.company}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{client.name}</span>
                          <span className="text-xs text-muted-foreground">{client.email || 'No email'}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{client.industry || 'Not specified'}</TableCell>
                    <TableCell>
                      {renderScore(client.score)}
                    </TableCell>
                    <TableCell>
                      {renderStatus(client.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CreditCard className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{client.purchase_count || 0}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No clients found matching your search criteria.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
