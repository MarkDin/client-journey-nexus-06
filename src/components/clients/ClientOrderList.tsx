import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Loader2 } from "lucide-react";

interface Order {
  id: string;
  date: string;
  amount: number;
  status: "Processing" | "Shipped" | "Delivered";
}

interface ClientOrderListProps {
  orders: Order[];
  isLoading: boolean;
}

export function ClientOrderList({ orders, isLoading }: ClientOrderListProps) {
  return (
    <Card>
      <CardHeader className="pb-2 flex items-center justify-between">
        <CardTitle>近期订单</CardTitle>
        <Button variant="outline" size="sm" className="gap-1">
          <DollarSign className="h-3.5 w-3.5" />
          查看全部
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">加载订单数据...</p>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div key={index} className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.amount.toLocaleString()}</p>
                  <Badge variant={
                    order.status === "Processing" ? "outline" :
                      order.status === "Shipped" ? "secondary" : "default"
                  }>
                    {order.status === "Processing" ? "处理中" :
                      order.status === "Shipped" ? "已发货" : "已送达"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">暂无订单记录</p>
        )}
      </CardContent>
    </Card>
  );
} 