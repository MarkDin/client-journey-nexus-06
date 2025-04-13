
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data - remove goal completion data
const chartData = [
  { month: "Jan", orders: 120 },
  { month: "Feb", orders: 190 },
  { month: "Mar", orders: 160 },
  { month: "Apr", orders: 220 },
  { month: "May", orders: 250 },
  { month: "Jun", orders: 230 },
  { month: "Jul", orders: 280 },
  { month: "Aug", orders: 310 },
  { month: "Sep", orders: 290 },
  { month: "Oct", orders: 330 },
  { month: "Nov", orders: 350 },
  { month: "Dec", orders: 380 },
];

interface TrendChartProps {
  className?: string;
}

export function TrendChart({ className }: TrendChartProps) {
  const formatter = (value: number) => `${value}`;
  
  return (
    <Card className={className}>
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Monthly Trend</CardTitle>
            <CardDescription>Order volume over time</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={formatter}
                tick={{ fontSize: 12 }}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip 
                formatter={(value: number, name: string) => {
                  if (name === "orders") return [formatter(value), "Orders"];
                  return [value, name];
                }}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: 8,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Area 
                type="monotone" 
                dataKey="orders" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorOrders)" 
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
