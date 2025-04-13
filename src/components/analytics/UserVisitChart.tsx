
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const data = [
  { name: "Jan", visitors: 4000, activeUsers: 2400 },
  { name: "Feb", visitors: 3000, activeUsers: 1398 },
  { name: "Mar", visitors: 2000, activeUsers: 1800 },
  { name: "Apr", visitors: 2780, activeUsers: 2208 },
  { name: "May", visitors: 1890, activeUsers: 1520 },
  { name: "Jun", visitors: 2390, activeUsers: 1800 },
  { name: "Jul", visitors: 3490, activeUsers: 2600 },
  { name: "Aug", visitors: 4000, activeUsers: 2900 },
  { name: "Sep", visitors: 4500, activeUsers: 3100 },
  { name: "Oct", visitors: 5200, activeUsers: 3500 },
  { name: "Nov", visitors: 4800, activeUsers: 3300 },
  { name: "Dec", visitors: 5500, activeUsers: 3800 },
];

interface UserVisitChartProps {
  className?: string;
}

export function UserVisitChart({ className }: UserVisitChartProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Monthly User Visits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="visitors"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.5}
              />
              <Area
                type="monotone"
                dataKey="activeUsers"
                stackId="2"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
