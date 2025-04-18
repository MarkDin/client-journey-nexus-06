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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useClientDrawerStore } from "@/store/useClientDrawerStore";
import { ArrowUpDown, Filter, X } from "lucide-react";

interface Customer {
  customer_code: string;
  company: string;
  amount: number;
}

interface RegionSalesData {
  id: string;
  report_month: string;
  region_name: string;
  customers: Customer[];
  region_total: number;
  percentage: number;
}

interface OrdersSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMonth?: string;
  selectedRegion?: string;
  orders?: RegionSalesData[];
}

export function OrdersSidebar({
  isOpen,
  onClose,
  selectedMonth,
  selectedRegion,
  orders = []
}: OrdersSidebarProps) {
  const openDrawer = useClientDrawerStore(state => state.openDrawer);

  const handleClientClick = (clientId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    openDrawer(clientId);
  };

  // 获取所有客户的销售数据
  const customerOrders = orders.flatMap(order =>
    order.customers.map(customer => ({
      id: customer.customer_code,
      client: {
        id: customer.customer_code,
        name: customer.company
      },
      amount: customer.amount,
      percentage: (customer.amount / order.region_total * 100).toFixed(2),
      country: order.region_name
    }))
  );

  const totalAmount = orders.reduce((sum, order) => sum + order.region_total, 0);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle>
                {selectedMonth && selectedRegion
                  ? `${selectedRegion}区域 - ${selectedMonth}月订单`
                  : '订单详情'}
              </SheetTitle>
              <SheetDescription>
                {selectedMonth && selectedRegion
                  ? `显示${selectedRegion}区域在${selectedMonth}月的客户订单 (总额: ${totalAmount.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })})`
                  : '显示所选区域和月份的订单'}
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
            <Input placeholder="搜索客户..." />
          </div>

          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[130px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部客户</SelectItem>
                <SelectItem value="high">高额订单</SelectItem>
                <SelectItem value="low">低额订单</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="amount-desc">
              <SelectTrigger className="w-[130px]">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="排序" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amount-desc">金额 (高-低)</SelectItem>
                <SelectItem value="amount-asc">金额 (低-高)</SelectItem>
                <SelectItem value="name-asc">客户名称 (A-Z)</SelectItem>
                <SelectItem value="name-desc">客户名称 (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>客户代码</TableHead>
                  <TableHead>客户名称</TableHead>
                  <TableHead>区域</TableHead>
                  <TableHead className="text-right">销售金额</TableHead>
                  <TableHead className="text-right">占比</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      未找到订单数据
                    </TableCell>
                  </TableRow>
                ) : (
                  customerOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell
                        className="text-primary hover:underline cursor-pointer"
                        onClick={(e) => handleClientClick(order.client.id, e)}
                      >
                        {order.client.name}
                      </TableCell>
                      <TableCell>{order.country}</TableCell>
                      <TableCell className="text-right">
                        {order.amount.toLocaleString('zh-CN', {
                          style: 'currency',
                          currency: 'CNY'
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        {order.percentage}%
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          显示 {customerOrders.length} 个客户的订单数据
          {selectedMonth && selectedRegion && ` (${selectedRegion} - ${selectedMonth})`}
        </div>
      </SheetContent>
    </Sheet>
  );
}
