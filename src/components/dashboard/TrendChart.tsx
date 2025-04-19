import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMonthlySalesData } from "@/hooks/useMonthlySalesData";
import { useClientDrawerStore } from "@/store/useClientDrawerStore";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";
import { OrdersSidebar } from "./OrdersSidebar";

// Define color mapping for regions
const regionColors: Record<string, string> = {
  // 主要经济体
  "中国": "#8B5CF6",
  "美国": "#F97316",
  "日本": "#F59E0B",
  "欧洲": "#0EA5E9",
  "英国": "#06B6D4",

  // 亚洲国家
  "韩国": "#2DD4BF",
  "印度": "#EC4899",
  "新加坡": "#14B8A6",
  "马来西亚": "#0D9488",
  "泰国": "#0F766E",
  "越南": "#115E59",
  "印度尼西亚": "#134E4A",
  "菲律宾": "#67E8F9",
  "巴基斯坦": "#22D3EE",
  "阿联酋": "#7DD3FC",

  // 欧洲国家
  "德国": "#3B82F6",
  "法国": "#2563EB",
  "意大利": "#1D4ED8",
  "西班牙": "#1E40AF",
  "荷兰": "#60A5FA",
  "瑞士": "#93C5FD",
  "瑞典": "#BFDBFE",
  "波兰": "#2563EB",
  "比利时": "#1E40AF",

  // 美洲国家
  "加拿大": "#7C3AED",
  "巴西": "#6D28D9",
  "墨西哥": "#5B21B6",
  "阿根廷": "#4C1D95",
  "智利": "#DDD6FE",
  "哥伦比亚": "#C4B5FD",
  "秘鲁": "#A78BFA",

  // 大洋洲
  "澳大利亚": "#10B981",
  "新西兰": "#059669",

  // 中东和非洲
  "以色列": "#10B981",
  "沙特阿拉伯": "#047857",
  "南非": "#065F46",
  "埃及": "#064E3B",
  "摩洛哥": "#6EE7B7",
  "突尼斯": "#34D399",

  // 其他地区
  "俄罗斯": "#BE123C",
  "土耳其": "#E11D48",
  "乌克兰": "#F43F5E",
  "白俄罗斯": "#FB7185",
  "哈萨克斯坦": "#FDA4AF",

  // 特别行政区
  "香港": "#475569",
  "台湾": "#64748B",
  "澳门": "#94A3B8",

  // 其他区域
  "南美": "#6366F1",
  "中东": "#4F46E5",
  "东南亚": "#4338CA",
  "北非": "#3730A3",
  "东欧": "#312E81"
};

// Default fallback color for regions not in the mapping
const defaultColor = "#64748B";

interface TrendChartProps {
  className?: string;
  onCountrySelect?: (country: string) => void;
}

export function TrendChart({ className, onCountrySelect }: TrendChartProps) {
  const { data, regions, isLoading, error } = useMonthlySalesData();
  const [selectedData, setSelectedData] = useState<{ month: string; region: string; orders: any[] } | null>(null);
  const openDrawer = useClientDrawerStore(state => state.openDrawer);

  const handleBarClick = (data: any, index: number) => {
    if (data && data.payload) {
      const month = data.payload.month;
      const region = regions[index];
      const rawData = data.payload.rawData || [];

      const filteredOrders = rawData.filter((item: any) =>
        item.region_name === region
      );

      setSelectedData({
        month,
        region,
        orders: filteredOrders
      });
    }
  };

  const handleCountryClick = (entry: any, month: string) => {
    const rawData = data.find(item => item.month === month)?.rawData || [];
    const filteredOrders = rawData.filter((item: any) =>
      item.region_name === entry.name
    );

    setSelectedData({
      month,
      region: entry.name,
      orders: filteredOrders
    });

    if (onCountrySelect) {
      onCountrySelect(entry.name);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            Loading...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-destructive">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                barCategoryGap={10}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  tickFormatter={(value) => formatValue(value)}
                  tick={{ fontSize: 12 }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  onClick={(data) => {
                    if (onCountrySelect) {
                      onCountrySelect(data.value);
                    }
                  }}
                />
                {regions.map((region, index) => (
                  <Bar
                    key={region}
                    name={region}
                    dataKey={region}
                    stackId="a"
                    fill={regionColors[region] || defaultColor}
                    radius={index === regions.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                    onClick={(data) => handleBarClick(data, index)}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <OrdersSidebar
        isOpen={!!selectedData}
        onClose={() => setSelectedData(null)}
        selectedMonth={selectedData?.month}
        selectedRegion={selectedData?.region}
        orders={selectedData?.orders || []}
      />
    </>
  );
}
