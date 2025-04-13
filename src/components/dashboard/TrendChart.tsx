
import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data with goal completion added
const chartData = [
  { month: "Jan", orders: 120, goalCompletion: 65 },
  { month: "Feb", orders: 190, goalCompletion: 68 },
  { month: "Mar", orders: 160, goalCompletion: 70 },
  { month: "Apr", orders: 220, goalCompletion: 72 },
  { month: "May", orders: 250, goalCompletion: 75 },
  { month: "Jun", orders: 230, goalCompletion: 76 },
  { month: "Jul", orders: 280, goalCompletion: 78 },
  { month: "Aug", orders: 310, goalCompletion: 80 },
  { month: "Sep", orders: 290, goalCompletion: 82 },
  { month: "Oct", orders: 330, goalCompletion: 84 },
  { month: "Nov", orders: 350, goalCompletion: 85 },
  { month: "Dec", orders: 380, goalCompletion: 88 },
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
            <CardDescription>Order volume and goal completion over time</CardDescription>
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
                yAxisId="left"
                tickFormatter={formatter}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                tick={{ fontSize: 12 }}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip 
                formatter={(value: number, name: string) => {
                  if (name === "orders") return [formatter(value), "Orders"];
                  if (name === "goalCompletion") return [`${value}%`, "Goal Completion"];
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
                yAxisId="left"
              />
              <Line 
                type="monotone" 
                dataKey="goalCompletion" 
                stroke="hsl(var(--secondary))" 
                strokeDasharray="5 5" 
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
                yAxisId="right"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
