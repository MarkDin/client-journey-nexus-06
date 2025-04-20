import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Customer } from "@/types/supabase";
import {
    Building,
    Calendar,
    Globe,
    Mail,
    MapPin,
    Phone,
    ShoppingBag,
    User,
    Warehouse
} from "lucide-react";

interface ClientBasicInfoProps {
  client: Customer;
}

export function ClientBasicInfo({ client }: ClientBasicInfoProps) {
  const formatCurrency = (amount: string | null) => {
    if (!amount) return '0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Number(amount));
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">销售</p>
              <div className="flex items-center gap-2 mt-1">
                <User className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">{client.sales}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">公司名称</p>
              <div className="flex items-center gap-2 mt-1">
                <Building className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">{client.company}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">邮箱</p>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">{client.email || "未提供邮箱"}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">电话</p>
              <div className="flex items-center gap-2 mt-1">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">{client.phone || "未提供电话"}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">官网</p>
              <div className="flex items-center gap-2 mt-1">
                <Globe className="h-4 w-4 text-muted-foreground" />
                {client.official_website ? (
                  <a 
                    href={client.official_website.startsWith('http') ? client.official_website : `https://${client.official_website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {client.official_website}
                  </a>
                ) : (
                  <p className="font-medium text-muted-foreground">未提供官网</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">地址</p>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">{client.address || "未提供地址"}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">首次订单</p>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">
                  {client.first_order_time ? new Date(client.first_order_time).toLocaleDateString() : "暂无订单记录"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">最近订单</p>
              <div className="flex items-center gap-2 mt-1">
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">
                  {client.last_order ? new Date(client.last_order).toLocaleDateString() : "暂无订单"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">库存金额</p>
              <div className="flex items-center gap-2 mt-1">
                <Warehouse className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium text-emerald-600">
                  {formatCurrency(client.stock_cash)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-muted-foreground">标签</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {client.tags && client.tags.length > 0 ? client.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">{tag}</Badge>
            )) : <span className="text-muted-foreground">暂无标签</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 