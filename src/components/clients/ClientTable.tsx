import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Customer } from "@/types/supabase";
import {
  AlertCircle,
  Building2,
  FileText,
  Globe2,
  Package,
  Search,
  SlidersHorizontal,
  User,
  UserCircle
} from "lucide-react";
import { useState } from "react";

// 定义客户类型

interface ClientTableProps {
  clients?: Customer[];
  isLoading?: boolean;
  onClientClick?: (customerCode: string) => void;
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
      client.region?.toLowerCase().includes(query) ||
      client.sales?.toLowerCase().includes(query)
    );
  });

  const renderIntroduction = (introduction: string | null) => {
    if (!introduction) return '暂无简介';
    return introduction.length > 50 ? `${introduction.substring(0, 50)}...` : introduction;
  };

  const renderStockCash = (stockCash: string | null) => {
    if (!stockCash) return '未知';
    return (
      <div className="flex items-center gap-1">
        <Package className="h-4 w-4 text-muted-foreground" />
        <span>{stockCash}</span>
      </div>
    );
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
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-4 w-20" />
              ))}
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="grid grid-cols-6 p-4 border-b">
                {[1, 2, 3, 4, 5, 6].map((j) => (
                  <Skeleton key={j} className="h-4 w-32" />
                ))}
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
              placeholder="搜索客户..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <Button>添加客户</Button>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">缩略名</TableHead>
                <TableHead className="w-[180px]">公司名称</TableHead>
                <TableHead className="w-[240px]">简介</TableHead>
                <TableHead>国家</TableHead>
                <TableHead>所属销售</TableHead>
                <TableHead>库存</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <TableRow
                    key={client.customer_code}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleRowClick(client.customer_code)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{client.name || '未设置'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{client.company}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {renderIntroduction(client.introduction)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Globe2 className="h-4 w-4 text-muted-foreground" />
                        <span>{client.region || '未知'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <UserCircle className="h-4 w-4 text-muted-foreground" />
                        <span>{client.sales || '未分配'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {renderStockCash(client.stock_cash)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">未找到匹配的客户信息</p>
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
