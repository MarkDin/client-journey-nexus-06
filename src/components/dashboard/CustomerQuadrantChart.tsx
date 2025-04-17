import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useCustomerData } from '@/hooks/useCustomerQuadrantData';
import { AlertCircle } from "lucide-react";
import { CartesianGrid, ReferenceLine, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';
import { CustomerTooltip } from './CustomerTooltip';

interface CustomerQuadrantChartProps {
  onCustomerSelect: (customerCode: string) => void;
}

export function CustomerQuadrantChart({ onCustomerSelect }: CustomerQuadrantChartProps) {
  const { data, isLoading, error } = useCustomerData();

  const chartConfig = {
    scatter: {
      label: "Customers",
      theme: {
        light: "#9b87f5",
        dark: "#7E69AB"
      }
    }
  };

  const QuadrantLabel = ({ x, y, label }: { x: number, y: number, label: string }) => {
    return (
      <text x={x} y={y} fill="#666" fontSize={12} textAnchor="middle">
        {label}
      </text>
    );
  };

  if (isLoading) {
    return (
      <Card className="bg-[#F8F9FE]">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl text-center">Customer Trend Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] flex items-center justify-center">
            <Skeleton className="h-[450px] w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-[#F8F9FE]">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl text-center">Customer Trend Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#F8F9FE]">
      <CardHeader className="pb-2">
        <CardTitle className="text-3xl text-center">Customer Trend Analysis</CardTitle>
        <p className="text-sm text-center text-muted-foreground">Click on data points to view detailed trend charts</p>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] relative">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Short-term Trend"
                  unit="%"
                  domain={[-25, 25]}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E7EB' }}
                  label={{ value: 'Short-term Trend (%)', position: 'bottom' }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Long-term Trend"
                  unit="%"
                  domain={[-25, 25]}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E7EB' }}
                  label={{ value: 'Long-term Trend (%)', angle: -90, position: 'left' }}
                />
                <ZAxis
                  type="number"
                  dataKey="totalAmount"
                  range={[20, 800]}
                  scale="pow"
                  domain={['auto', 'auto']}
                />
                <Tooltip content={<CustomerTooltip />} />
                <ReferenceLine x={0} stroke="#E5E7EB" strokeWidth={2} />
                <ReferenceLine y={0} stroke="#E5E7EB" strokeWidth={2} />
                <Scatter
                  data={data}
                  fill="var(--color-scatter)"
                  opacity={0.7}
                  onClick={(data) => onCustomerSelect(data.customerCode)}
                  cursor="pointer"
                />
                {/* Quadrant Labels */}
                <QuadrantLabel x={-15} y={-15} label="Long-term↓ Short-term↑" />
                <QuadrantLabel x={15} y={-15} label="Long-term↑ Short-term↑" />
                <QuadrantLabel x={-15} y={15} label="Long-term↓ Short-term↓" />
                <QuadrantLabel x={15} y={15} label="Long-term↑ Short-term↓" />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
