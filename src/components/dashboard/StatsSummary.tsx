
import { DollarSign, Package, PercentCircle } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";

interface StatsSummaryProps {
  onOrdersClick: () => void;
}

export function StatsSummary({ onOrdersClick }: StatsSummaryProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
      <StatsCard
        title="YTD Sales"
        value="$4.3M"
        icon={<DollarSign className="h-5 w-5" />}
        trend={{ value: 12, label: "vs last year" }}
        className="hover:shadow-lg transition-all duration-300 ease-in-out"
      />
      <StatsCard
        title="Weekly New Orders"
        value="247"
        icon={<Package className="h-5 w-5" />}
        trend={{ value: 8, label: "vs last week" }}
        onClick={onOrdersClick}
        clickable
        className="hover:shadow-lg transition-all duration-300 ease-in-out"
      />
      <StatsCard
        title="Goal Completion Rate"
        value="78%"
        icon={<PercentCircle className="h-5 w-5" />}
        trend={{ value: -3, label: "vs last month" }}
        className="hover:shadow-lg transition-all duration-300 ease-in-out"
      />
    </div>
  );
}
