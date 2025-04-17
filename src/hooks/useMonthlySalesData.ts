import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

interface Customer {
  customer_code: string;
  company: string;
  amount: number;
}

interface RegionSalesData {
  id: string;
  report_month: string;
  region_name: string;
  customers: Customer[];
  region_total: number;
  percentage: number;
}

interface TransformedData {
  month: string;
  rawData?: RegionSalesData[];
  [region: string]: string | number | RegionSalesData[] | undefined;
}

export function useMonthlySalesData() {
  const [data, setData] = useState<TransformedData[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMonthlySalesData() {
      try {
        setIsLoading(true);
        setError(null);

        // 设置查询日期范围为2024年
        const startDate = '2024-01-01';
        const endDate = '2024-12-31';

        const { data: salesData, error } = await supabase.functions.invoke('get-monthly-sales', {
          body: {
            start_date: startDate,
            end_date: endDate
          }
        });

        if (error) {
          throw new Error(error.message);
        }

        // Type assertion for the response data
        const regionData = salesData as RegionSalesData[];

        // Extract unique months
        const uniqueMonths = Array.from(new Set(regionData.map(item => item.report_month)))
          .sort((a, b) => a.localeCompare(b));

        // Transform data for the chart
        const transformedData = uniqueMonths.map(month => {
          // Start with the month
          const monthData: TransformedData = {
            month: formatMonth(month),
            rawData: regionData.filter(item => item.report_month === month)
          };

          // Find regions for this month
          const monthRegions = regionData.filter(item => item.report_month === month);

          // Add data for each region
          monthRegions.forEach(region => {
            monthData[region.region_name] = region.region_total;
          });

          return monthData;
        });

        // Get unique regions across all months
        const uniqueRegions = Array.from(
          new Set(
            regionData.map(item => item.region_name)
          )
        );

        setData(transformedData);
        setRegions(uniqueRegions);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching monthly sales data:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch sales data");
        setIsLoading(false);
      }
    }

    fetchMonthlySalesData();
  }, []);

  // Helper function to format month from "YYYY-MM" to "MMM" (e.g., "2022-01" to "Jan")
  function formatMonth(monthStr: string): string {
    try {
      const [year, month] = monthStr.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleString('en-US', { month: 'short' });
    } catch (e) {
      return monthStr;
    }
  }

  return { data, regions, isLoading, error };
}
