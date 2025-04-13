
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PercentCircle } from "lucide-react";

// Sample data for goal completion rate over time
const goalCompletionData = [
  { month: "Jan", value: 65 },
  { month: "Feb", value: 68 },
  { month: "Mar", value: 72 },
  { month: "Apr", value: 75 },
  { month: "May", value: 71 },
  { month: "Jun", value: 74 },
  { month: "Jul", value: 78 },
  { month: "Aug", value: 80 },
  { month: "Sep", value: 79 },
  { month: "Oct", value: 82 },
  { month: "Nov", value: 81 },
  { month: "Dec", value: 78 },
];

interface GoalCompletionChartProps {
  className?: string;
}

export function GoalCompletionChart({ className }: GoalCompletionChartProps) {
  const formatter = (value: number) => `${value}%`;
  
  return (
    <Card className={className}>
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <PercentCircle className="h-5 w-5 text-primary" />
              Goal Completion Rate
            </CardTitle>
            <CardDescription>Performance over time</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={goalCompletionData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={formatter}
                tick={{ fontSize: 12 }}
                domain={[50, 100]}
              />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Goal Completion']}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: 8,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
