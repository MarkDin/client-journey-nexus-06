
import { useState } from "react";
import { 
  ArrowUpDown, 
  CheckCircle2, 
  Circle, 
  EyeIcon, 
  Filter, 
  HelpCircle, 
  Search, 
  XCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Sample data
const clients = [
  { 
    id: 1, 
    name: "Global Industries Inc.", 
    industry: "Manufacturing", 
    salesRep: "John Doe",
    region: "North America",
    score: "A",
    status: "active",
    lastOrder: "2025-06-10",
  },
  { 
    id: 2, 
    name: "Tech Solutions Ltd.", 
    industry: "Technology", 
    salesRep: "Sarah Smith",
    region: "Europe",
    score: "B",
    status: "active",
    lastOrder: "2025-05-28",
  },
  { 
    id: 3, 
    name: "Acme Manufacturing", 
    industry: "Manufacturing", 
    salesRep: "Mike Johnson",
    region: "North America",
    score: "C",
    status: "inactive",
    lastOrder: "2025-04-15",
  },
  { 
    id: 4, 
    name: "Smart Systems Corp.", 
    industry: "Technology", 
    salesRep: "Emily Brown",
    region: "Asia Pacific",
    score: "A",
    status: "active",
    lastOrder: "2025-06-05",
  },
  { 
    id: 5, 
    name: "Premier Enterprises", 
    industry: "Retail", 
    salesRep: "John Doe",
    region: "Europe",
    score: "B",
    status: "active",
    lastOrder: "2025-06-02",
  },
  { 
    id: 6, 
    name: "Future Electronics", 
    industry: "Technology", 
    salesRep: "Sarah Smith",
    region: "North America",
    score: "A",
    status: "active",
    lastOrder: "2025-05-30",
  },
  { 
    id: 7, 
    name: "Atlas Construction", 
    industry: "Construction", 
    salesRep: "Mike Johnson",
    region: "North America",
    score: "D",
    status: "inactive",
    lastOrder: "2025-02-18",
  },
  { 
    id: 8, 
    name: "Pacific Shipping Co.", 
    industry: "Logistics", 
    salesRep: "Emily Brown",
    region: "Asia Pacific",
    score: "B",
    status: "active",
    lastOrder: "2025-05-25",
  },
  { 
    id: 9, 
    name: "European Imports", 
    industry: "Import/Export", 
    salesRep: "John Doe",
    region: "Europe",
    score: "C",
    status: "active",
    lastOrder: "2025-05-20",
  },
  { 
    id: 10, 
    name: "Nordic Supplies", 
    industry: "Wholesale", 
    salesRep: "Sarah Smith",
    region: "Europe",
    score: "B",
    status: "inactive",
    lastOrder: "2025-04-10",
  },
];

interface ClientTableProps {
  onViewClient: (clientId: number) => void;
}

export function ClientTable({ onViewClient }: ClientTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  
  // Get unique values for filters
  const industries = Array.from(new Set(clients.map(client => client.industry)));
  const regions = Array.from(new Set(clients.map(client => client.region)));
  
  // Filter clients based on search and filters
  const filteredClients = clients.filter(client => {
    const matchesSearch = !searchQuery || 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.salesRep.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesIndustry = selectedIndustries.length === 0 || 
      selectedIndustries.includes(client.industry);
      
    const matchesRegion = selectedRegions.length === 0 || 
      selectedRegions.includes(client.region);
      
    const matchesStatus = selectedStatuses.length === 0 || 
      (selectedStatuses.includes("active") && client.status === "active") ||
      (selectedStatuses.includes("inactive") && client.status === "inactive");
      
    return matchesSearch && matchesIndustry && matchesRegion && matchesStatus;
  });
  
  // Helper for score badge colors
  const getScoreBadgeColor = (score: string) => {
    switch (score) {
      case "A": return "bg-success text-success-foreground";
      case "B": return "bg-secondary text-secondary-foreground";
      case "C": return "bg-warning text-warning-foreground";
      case "D": return "bg-destructive text-destructive-foreground";
      default: return "";
    }
  };
  
  return (
    <Card>
      <div className="p-4 border-b">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10">
                  <Filter className="h-4 w-4 mr-2" />
                  Industry
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {industries.map((industry) => (
                  <DropdownMenuCheckboxItem
                    key={industry}
                    checked={selectedIndustries.includes(industry)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedIndustries([...selectedIndustries, industry]);
                      } else {
                        setSelectedIndustries(
                          selectedIndustries.filter((i) => i !== industry)
                        );
                      }
                    }}
                  >
                    {industry}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10">
                  <Filter className="h-4 w-4 mr-2" />
                  Region
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {regions.map((region) => (
                  <DropdownMenuCheckboxItem
                    key={region}
                    checked={selectedRegions.includes(region)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedRegions([...selectedRegions, region]);
                      } else {
                        setSelectedRegions(
                          selectedRegions.filter((r) => r !== region)
                        );
                      }
                    }}
                  >
                    {region}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10">
                  <Filter className="h-4 w-4 mr-2" />
                  Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuCheckboxItem
                  checked={selectedStatuses.includes("active")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedStatuses([...selectedStatuses, "active"]);
                    } else {
                      setSelectedStatuses(
                        selectedStatuses.filter((s) => s !== "active")
                      );
                    }
                  }}
                >
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedStatuses.includes("inactive")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedStatuses([...selectedStatuses, "inactive"]);
                    } else {
                      setSelectedStatuses(
                        selectedStatuses.filter((s) => s !== "inactive")
                      );
                    }
                  }}
                >
                  Inactive
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client Name</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Sales Rep</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Score</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Last Order</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                  No clients found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.industry}</TableCell>
                  <TableCell>{client.salesRep}</TableCell>
                  <TableCell>{client.region}</TableCell>
                  <TableCell>
                    <Badge className={cn(getScoreBadgeColor(client.score))}>
                      {client.score}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {client.status === "active" ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-destructive" />
                          <span>Inactive</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(client.lastOrder).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onViewClient(client.id)}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
