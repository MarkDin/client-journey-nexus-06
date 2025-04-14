
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Sample data
const topProducts = [
  { id: 1, name: "Industrial Sensors X-5200", revenue: 425000, trend: 12 },
  { id: 2, name: "Smart Control Systems", revenue: 362000, trend: 8 },
  { id: 3, name: "Heavy Machinery Parts", revenue: 296000, trend: -3 },
  { id: 4, name: "Enterprise Software License", revenue: 245000, trend: 21 },
  { id: 5, name: "Manufacturing Tools Kit", revenue: 198000, trend: 5 },
];

const topClients = [
  { id: 1, name: "Global Industries Inc.", revenue: 850000, trend: 18 },
  { id: 2, name: "Tech Solutions Ltd.", revenue: 720000, trend: -4 },
  { id: 3, name: "Acme Manufacturing", revenue: 615000, trend: 9 },
  { id: 4, name: "Smart Systems Corp.", revenue: 540000, trend: 15 },
  { id: 5, name: "Premier Enterprises", revenue: 480000, trend: 2 },
];

interface TopPerformersProps {
  className?: string;
}

export function TopPerformers({ className }: TopPerformersProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle>Top Performers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium mb-2">Top Products</h3>
            <div className="space-y-2">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">
                      ${(product.revenue / 1000).toFixed(1)}K
                    </span>
                    <Badge variant={product.trend > 0 ? "outline" : "destructive"} className={cn(
                      product.trend > 0 && "bg-success/10 text-success hover:bg-success/20 border-success/10"
                    )}>
                      {product.trend > 0 ? `+${product.trend}%` : `${product.trend}%`}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium mb-2">Top Clients</h3>
            <div className="space-y-2">
              {topClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{client.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">
                      ${(client.revenue / 1000).toFixed(1)}K
                    </span>
                    <Badge variant={client.trend > 0 ? "outline" : "destructive"} className={cn(
                      client.trend > 0 && "bg-success/10 text-success hover:bg-success/20 border-success/10"
                    )}>
                      {client.trend > 0 ? `+${client.trend}%` : `${client.trend}%`}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
