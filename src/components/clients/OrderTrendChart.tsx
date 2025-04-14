
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Sample data for order trends - this would typically come from an API
const orderTrendData = [
  { quarter: "2022Q1", amount: 650000, longTerm: 1000000, shortTerm: null },
  { quarter: "2022Q2", amount: 900000, longTerm: 1150000, shortTerm: null },
  { quarter: "2022Q3", amount: 3300000, longTerm: 1300000, shortTerm: null },
  { quarter: "2022Q4", amount: 20000, longTerm: 1450000, shortTerm: null },
  { quarter: "2023Q1", amount: 700000, longTerm: 1550000, shortTerm: null },
  { quarter: "2023Q2", amount: 1450000, longTerm: 1650000, shortTerm: null },
  { quarter: "2023Q3", amount: 1230000, longTerm: 1750000, shortTerm: null },
  { quarter: "2023Q4", amount: 2820000, longTerm: 1850000, shortTerm: 2800000 },
  { quarter: "2024Q1", amount: 2970000, longTerm: 1950000, shortTerm: 2600000 },
  { quarter: "2024Q2", amount: 1900000, longTerm: 2050000, shortTerm: 2400000 },
  { quarter: "2024Q3", amount: 2700000, longTerm: 2150000, shortTerm: 2500000 },
  { quarter: "2024Q4", amount: 1750000, longTerm: 2250000, shortTerm: 2100000 },
  { quarter: "2025Q1", amount: 2050000, longTerm: 2350000, shortTerm: 1850000 },
];

const chartConfig = {
  amount: {
    label: "Order Amount",
    color: "#f59e0b" // amber-500
  },
  longTerm: {
    label: "Long-term Trend",
    color: "#ef4444" // red-500
  },
  shortTerm: {
    label: "Short-term Trend",
    color: "#3b82f6" // blue-500
  }
};

interface OrderTrendChartProps {
  className?: string;
  clientName?: string;
}

export function OrderTrendChart({ className, clientName = "Client" }: OrderTrendChartProps) {
  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value;
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle>{clientName} - Quarterly Order Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={orderTrendData}
                margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.6} />
                <XAxis 
                  dataKey="quarter" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  tickFormatter={formatYAxis} 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value: number) => [
                    new Intl.NumberFormat('en-US', { 
                      style: 'currency', 
                      currency: 'USD',
                      maximumFractionDigits: 0
                    }).format(value),
                    ""
                  ]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="var(--color-amount, #f59e0b)"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={true}
                />
                <Line
                  type="monotone"
                  dataKey="longTerm"
                  stroke="var(--color-longTerm, #ef4444)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  isAnimationActive={true}
                />
                <Line
                  type="monotone"
                  dataKey="shortTerm"
                  stroke="var(--color-shortTerm, #3b82f6)"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  dot={false}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
