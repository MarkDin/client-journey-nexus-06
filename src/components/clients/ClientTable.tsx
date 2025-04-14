
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowUpDown, 
  Filter, 
  Search 
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
import { useClientDrawer } from "@/contexts/ClientDrawerContext";

const clients = [
  { 
    id: 1, 
    name: "Global Industries Inc.", 
    industry: "Manufacturing", 
    salesRep: "John Doe",
    region: "North America",
    lastOrder: "2025-06-10",
  },
  { 
    id: 2, 
    name: "Tech Solutions Ltd.", 
    industry: "Technology", 
    salesRep: "Sarah Smith",
    region: "Europe",
    lastOrder: "2025-05-28",
  },
  { 
    id: 3, 
    name: "Acme Manufacturing", 
    industry: "Manufacturing", 
    salesRep: "Mike Johnson",
    region: "North America",
    lastOrder: "2025-04-15",
  },
  { 
    id: 4, 
    name: "Smart Systems Corp.", 
    industry: "Technology", 
    salesRep: "Emily Brown",
    region: "Asia Pacific",
    lastOrder: "2025-06-05",
  },
  { 
    id: 5, 
    name: "Premier Enterprises", 
    industry: "Retail", 
    salesRep: "John Doe",
    region: "Europe",
    lastOrder: "2025-06-02",
  },
  { 
    id: 6, 
    name: "Future Electronics", 
    industry: "Technology", 
    salesRep: "Sarah Smith",
    region: "North America",
    lastOrder: "2025-05-30",
  },
  { 
    id: 7, 
    name: "Atlas Construction", 
    industry: "Construction", 
    salesRep: "Mike Johnson",
    region: "North America",
    lastOrder: "2025-02-18",
  },
  { 
    id: 8, 
    name: "Pacific Shipping Co.", 
    industry: "Logistics", 
    salesRep: "Emily Brown",
    region: "Asia Pacific",
    lastOrder: "2025-05-25",
  },
  { 
    id: 9, 
    name: "European Imports", 
    industry: "Import/Export", 
    salesRep: "John Doe",
    region: "Europe",
    lastOrder: "2025-05-20",
  },
  { 
    id: 10, 
    name: "Nordic Supplies", 
    industry: "Wholesale", 
    salesRep: "Sarah Smith",
    region: "Europe",
    lastOrder: "2025-04-10",
  },
];

export function ClientTable() {
  const { openClientDrawer } = useClientDrawer();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  
  const industries = Array.from(new Set(clients.map(client => client.industry)));
  const regions = Array.from(new Set(clients.map(client => client.region)));
  
  const filteredClients = clients.filter(client => {
    const matchesSearch = !searchQuery || 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.salesRep.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesIndustry = selectedIndustries.length === 0 || 
      selectedIndustries.includes(client.industry);
      
    const matchesRegion = selectedRegions.length === 0 || 
      selectedRegions.includes(client.region);
      
    return matchesSearch && matchesIndustry && matchesRegion;
  });

  const handleClientNameClick = (clientId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    openClientDrawer(clientId);
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
                  <span>Last Order</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  No clients found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
                <TableRow key={client.id} onClick={() => openClientDrawer(client.id)} className="cursor-pointer">
                  <TableCell 
                    className="font-medium text-primary hover:underline cursor-pointer" 
                    onClick={(e) => handleClientNameClick(client.id, e)}
                  >
                    {client.name}
                  </TableCell>
                  <TableCell>{client.industry}</TableCell>
                  <TableCell>{client.salesRep}</TableCell>
                  <TableCell>{client.region}</TableCell>
                  <TableCell>{new Date(client.lastOrder).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
