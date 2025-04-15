import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import { Empty, Spin } from "antd";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  Search
} from "lucide-react";
import { useEffect, useState } from "react";

// 定义客户数据类型
interface Client {
  id: string;
  name: string;
  industry: string;
  region: string;
  last_order: string | null;
  customer_code: string;
}

type SortField = 'name' | 'industry' | 'region' | 'last_order';
type SortOrder = 'asc' | 'desc';

interface SortConfig {
  field: keyof Client | null;
  order: 'asc' | 'desc' | null;
}

const PAGE_SIZE = 10;

export function ClientTable() {
  const { openClientDrawer } = useClientDrawer();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sort, setSort] = useState<SortConfig>({ field: null, order: null });
  const [industries, setIndustries] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);

  const fetchClients = async () => {
    try {
      setLoading(true);

      // 构建基础查询
      let query = supabase
        .from('customers')
        .select('*', { count: 'exact' });

      // 添加搜索条件
      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      // 添加行业过滤
      if (selectedIndustries.length > 0) {
        query = query.in('industry', selectedIndustries);
      }

      // 添加地区过滤
      if (selectedRegions.length > 0) {
        query = query.in('region', selectedRegions);
      }

      // 添加排序
      if (sort.field && sort.order) {
        query = query.order(sort.field, { ascending: sort.order === 'asc' });
      }

      // 添加分页
      const start = (currentPage - 1) * PAGE_SIZE;
      query = query.range(start, start + PAGE_SIZE - 1);

      const { data, error, count } = await query;

      if (error) {
        throw error;
      }

      setClients(data || []);
      setTotalCount(count || 0);
      setTotalPages(Math.ceil(count / PAGE_SIZE));
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilters = async () => {
    try {
      // 获取所有不重复的行业
      const { data: industryData } = await supabase
        .from('customers')
        .select('industry')
        .not('industry', 'is', null);

      const uniqueIndustries = [...new Set(industryData?.map(item => item.industry))];
      setIndustries(uniqueIndustries);

      // 获取所有不重复的地区
      const { data: regionData } = await supabase
        .from('customers')
        .select('region')
        .not('region', 'is', null);

      const uniqueRegions = [...new Set(regionData?.map(item => item.region))];
      setRegions(uniqueRegions);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [searchQuery, selectedIndustries, selectedRegions, currentPage, sort]);

  useEffect(() => {
    fetchFilters();
  }, []);

  const handleClientNameClick = (clientId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    openClientDrawer(parseInt(clientId));
  };

  const handleSort = (field: keyof Client) => {
    setSort(prev => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1"
                >
                  <span>Client Name</span>
                  {sort.field === 'name' && (
                    <span className="ml-1">{sort.order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('industry')}
                  className="flex items-center space-x-1"
                >
                  <span>Industry</span>
                  {sort.field === 'industry' && (
                    <span className="ml-1">{sort.order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('region')}
                  className="flex items-center space-x-1"
                >
                  <span>Region</span>
                  {sort.field === 'region' && (
                    <span className="ml-1">{sort.order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('last_order')}
                  className="flex items-center space-x-1"
                >
                  <span>Last Order</span>
                  {sort.field === 'last_order' && (
                    <span className="ml-1">{sort.order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                  <Spin />
                </TableCell>
              </TableRow>
            ) : clients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                  <Empty description="暂无客户数据" />
                </TableCell>
              </TableRow>
            ) : (
              clients.map((client) => (
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

      {/* 分页控件 */}
      <div className="flex items-center justify-between px-4 py-4 border-t">
        <div className="flex-1 text-sm text-muted-foreground">
          显示 {clients.length} 条，共 {totalCount} 条
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm">
            第 {currentPage} 页，共 {totalPages} 页
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
