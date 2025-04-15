
import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";

// 定义客户数据类型
interface Client {
  id: string;
  name: string;
  industry: string;
  region: string;
  last_order: string | null;
  customer_code: string;
}

export function ClientTable() {
  const { openClientDrawer } = useClientDrawer();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  // 获取客户数据
  useEffect(() => {
    async function fetchClients() {
      try {
        const { data: customers, error } = await supabase
          .from('customers')
          .select('*')
          .order('name');

        if (error) {
          console.error('Error fetching clients:', error);
          return;
        }

        setClients(customers || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, []);

  const industries = Array.from(new Set(clients.map(client => client.industry || '')));
  const regions = Array.from(new Set(clients.map(client => client.region || '')));
  
  const filteredClients = clients.filter(client => {
    const matchesSearch = !searchQuery || 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.customer_code.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesIndustry = selectedIndustries.length === 0 || 
      (client.industry && selectedIndustries.includes(client.industry));
      
    const matchesRegion = selectedRegions.length === 0 || 
      (client.region && selectedRegions.includes(client.region));
      
    return matchesSearch && matchesIndustry && matchesRegion;
  });

  const handleClientNameClick = (clientId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    openClientDrawer(parseInt(clientId));
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
                    {industry || 'Unspecified'}
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
                    {region || 'Unspecified'}
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                  Loading clients...
                </TableCell>
              </TableRow>
            ) : filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                  No clients found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
                <TableRow key={client.id} onClick={() => openClientDrawer(parseInt(client.id))} className="cursor-pointer">
                  <TableCell 
                    className="font-medium text-primary hover:underline cursor-pointer" 
                    onClick={(e) => handleClientNameClick(client.id, e)}
                  >
                    {client.name}
                  </TableCell>
                  <TableCell>{client.industry || 'N/A'}</TableCell>
                  <TableCell>{client.region || 'N/A'}</TableCell>
                  <TableCell>{client.last_order ? new Date(client.last_order).toLocaleDateString() : 'N/A'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
