import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { CustomerData, CustomerQuadrantFilters } from "@/types/customer";
import { useMemo } from "react";

interface CustomerQuadrantFiltersProps {
  data: CustomerData[];
  filters: CustomerQuadrantFilters;
  onFiltersChange: (filters: CustomerQuadrantFilters) => void;
}

export function CustomerQuadrantFilters({
  data,
  filters,
  onFiltersChange,
}: CustomerQuadrantFiltersProps) {
  // 根据当前筛选条件获取可选项
  const { countries, salesPeople } = useMemo(() => {
    let filteredData = data;

    // 如果选择了销售，只显示该销售负责的国家
    if (filters.sales) {
      filteredData = data.filter(item => item.sales === filters.sales);
    }
    // 如果选择了国家，只显示该国家的销售
    else if (filters.country) {
      filteredData = data.filter(item => item.country === filters.country);
    }

    return {
      countries: Array.from(new Set(filteredData.map((item) => item.country))).sort(),
      salesPeople: Array.from(new Set(filteredData.map((item) => item.sales))).sort()
    };
  }, [data, filters.sales, filters.country]);

  const handleCountryChange = (value: string) => {
    onFiltersChange({ 
      ...filters, 
      country: value === "all" ? undefined : value,
      sales: value === "all" ? filters.sales : 
        (salesPeople.includes(filters.sales || "") ? filters.sales : undefined)
    });
  };

  const handleSalesChange = (value: string) => {
    onFiltersChange({ 
      ...filters, 
      sales: value === "all" ? undefined : value,
      country: value === "all" ? filters.country :
        (countries.includes(filters.country || "") ? filters.country : undefined)
    });
  };

  // 获取所有可能的选项（用于"全部"选项后的计数）
  const allCountries = useMemo(() => 
    Array.from(new Set(data.map(item => item.country))).sort()
  , [data]);

  const allSalesPeople = useMemo(() => 
    Array.from(new Set(data.map(item => item.sales))).sort()
  , [data]);

  return (
    <div className="flex flex-row gap-2 mb-4 ml-4">
      <Select
        value={filters.country || "all"}
        onValueChange={handleCountryChange}
      >
        <SelectTrigger className="w-[120px] bg-white border-gray-200">
          <SelectValue placeholder="选择国家" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部国家</SelectItem>
          {countries.map((country) => (
            <SelectItem key={country} value={country}>
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.sales || "all"}
        onValueChange={handleSalesChange}
      >
        <SelectTrigger className="w-[120px] bg-white border-gray-200">
          <SelectValue placeholder="选择销售" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部销售</SelectItem>
          {salesPeople.map((sales) => (
            <SelectItem key={sales} value={sales}>
              {sales}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 