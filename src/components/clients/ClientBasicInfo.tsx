import { Client } from "@/api/clientService";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Building,
    Calendar,
    CreditCard,
    Mail,
    MapPin,
    Phone,
    ShoppingBag,
    User
} from "lucide-react";

interface ClientBasicInfoProps {
  client: Client;
}

export function ClientBasicInfo({ client }: ClientBasicInfoProps) {
  const creditUsagePercentage = client.credit_limit ? (client.credit_used || 0) / client.credit_limit * 100 : 0;

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">主要联系人</p>
            <div className="flex items-center gap-2 mt-1">
              <User className="h-4 w-4 text-muted-foreground" />
              <p className="font-medium">{client.name}</p>
            </div>

            <div className="flex flex-col gap-1 mt-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{client.email || "未提供邮箱"}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{client.phone || "未提供电话"}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">客户详情</p>
            <div className="space-y-1 mt-1">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">自 {new Date(client.created_at || "").getFullYear()} 年</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{client.address || "未提供地址"}</p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">下次会议: {client.next_meeting ?
                  new Date(client.next_meeting).toLocaleString() :
                  "未安排"}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">信用状态</p>
            <div className="flex items-center gap-2 mt-1">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <p className="font-medium">{client.credit_level || "未设置"}</p>
            </div>

            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>已用额度</span>
                <span>${client.credit_used?.toLocaleString() || 0} / ${client.credit_limit?.toLocaleString() || 0}</span>
              </div>
              <Progress value={creditUsagePercentage} className="h-2" />
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">最近订单</p>
            <div className="flex items-center gap-2 mt-1">
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              <p className="font-medium">
                ${client.last_order || "暂无订单"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">标签</p>
          <div className="flex flex-wrap gap-2">
            {client.tags && client.tags.length > 0 ? client.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">{tag}</Badge>
            )) : <span className="text-sm text-muted-foreground">暂无标签</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 