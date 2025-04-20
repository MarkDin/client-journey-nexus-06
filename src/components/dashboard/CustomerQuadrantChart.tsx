import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useCustomerData } from '@/hooks/useCustomerQuadrantData';
import type { CustomerQuadrantFilters as Filters } from '@/types/customer';
import { AlertCircle } from "lucide-react";
import { useMemo, useState } from 'react';
import { CartesianGrid, ReferenceLine, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';
import { CustomerQuadrantFilters } from './CustomerQuadrantFilters';
import { CustomerTooltip } from './CustomerTooltip';

interface CustomerQuadrantChartProps {
  onCustomerSelect: (customerCode: string) => void;
}

export function CustomerQuadrantChart({ onCustomerSelect }: CustomerQuadrantChartProps) {
  const { data, isLoading, error } = useCustomerData();
  const [filters, setFilters] = useState<Filters>({});

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(item => {
      if (filters.country && item.country !== filters.country) return false;
      if (filters.sales && item.sales !== filters.sales) return false;
      return true;
    });
  }, [data, filters]);

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
        {data && (
          <CustomerQuadrantFilters
            data={data}
            filters={filters}
            onFiltersChange={setFilters}
          />
        )}
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
                  dataKey="y"
                  name="Long-term Trend"
                  unit="%"
                  domain={[-25, 25]}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E7EB' }}
                  label={{ value: 'Long-term Trend (%)', position: 'bottom' }}
                />
                <YAxis
                  type="number"
                  dataKey="x"
                  name="Short-term Trend"
                  unit="%"
                  domain={[-25, 25]}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E7EB' }}
                  label={{ value: 'Short-term Trend (%)', angle: -90, position: 'left' }}
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
                  data={filteredData}
                  fill="var(--color-scatter)"
                  opacity={0.7}
                  onClick={(data) => onCustomerSelect(data.customerCode)}
                  cursor="pointer"
                />
                {/* Quadrant Labels */}
                <QuadrantLabel x={-15} y={-15} label="Short-term↓ Long-term↑" />
                <QuadrantLabel x={15} y={-15} label="Short-term↑ Long-term↑" />
                <QuadrantLabel x={-15} y={15} label="Short-term↓ Long-term↓" />
                <QuadrantLabel x={15} y={15} label="Short-term↑ Long-term↓" />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
