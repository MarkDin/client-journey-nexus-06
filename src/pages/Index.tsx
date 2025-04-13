
import { ArrowDownRight, ArrowUpRight, DollarSign, Package, PercentCircle } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TrendChart } from "@/components/dashboard/TrendChart";

const Dashboard = () => {
  return (
    <AppLayout>
      <PageHeader 
        title="Sales Dashboard" 
        description="Your sales performance at a glance" 
      />
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <StatsCard
          title="YTD Sales"
          value="$4.3M"
          icon={<DollarSign className="h-5 w-5" />}
          trend={{ value: 12, label: "vs last year" }}
        />
        <StatsCard
          title="Weekly New Orders"
          value="247"
          icon={<Package className="h-5 w-5" />}
          trend={{ value: 8, label: "vs last week" }}
        />
        <StatsCard
          title="Goal Completion Rate"
          value="78%"
          icon={<PercentCircle className="h-5 w-5" />}
          trend={{ value: -3, label: "vs last month" }}
        />
      </div>
      
      {/* Chart */}
      <div className="grid grid-cols-1">
        <TrendChart className="w-full" />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
