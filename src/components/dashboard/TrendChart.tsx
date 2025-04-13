
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PercentCircle } from "lucide-react";
import { Legend } from "recharts";

// Combined data
const combinedData = [
  { month: "Jan", orders: 120, goalCompletion: 65 },
  { month: "Feb", orders: 190, goalCompletion: 68 },
  { month: "Mar", orders: 160, goalCompletion: 72 },
  { month: "Apr", orders: 220, goalCompletion: 75 },
  { month: "May", orders: 250, goalCompletion: 71 },
  { month: "Jun", orders: 230, goalCompletion: 74 },
  { month: "Jul", orders: 280, goalCompletion: 78 },
  { month: "Aug", orders: 310, goalCompletion: 80 },
  { month: "Sep", orders: 290, goalCompletion: 79 },
  { month: "Oct", orders: 330, goalCompletion: 82 },
  { month: "Nov", orders: 350, goalCompletion: 81 },
  { month: "Dec", orders: 380, goalCompletion: 78 },
];

interface TrendChartProps {
  className?: string;
}

export function TrendChart({ className }: TrendChartProps) {
  const orderFormatter = (value: number) => `${value}`;
  const percentFormatter = (value: number) => `${value}%`;
  
  return (
    <Card className={className}>
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Order volume and goal completion over time</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combinedData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorGoalCompletion" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                yAxisId="left"
                tickFormatter={orderFormatter}
                tick={{ fontSize: 12 }}
                domain={[0, 'dataMax + 50']}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tickFormatter={percentFormatter}
                tick={{ fontSize: 12 }}
                domain={[50, 100]}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: 8,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                formatter={(value, name) => {
                  if (name === "orders") return [`${value}`, 'Orders'];
                  if (name === "goalCompletion") return [`${value}%`, 'Goal Completion'];
                  return [value, name];
                }}
              />
              <Area 
                type="monotone" 
                dataKey="orders" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorOrders)"
                yAxisId="left"
                name="Orders"
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="goalCompletion" 
                stroke="hsl(var(--secondary))" 
                strokeWidth={2}
                yAxisId="right"
                name="Goal Completion"
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
