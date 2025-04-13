
import { ArrowDownRight, ArrowUpRight, DollarSign, Package, PercentCircle } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { TopPerformers } from "@/components/dashboard/TopPerformers";
import { ActivityAlerts } from "@/components/dashboard/ActivityAlerts";

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
      
      {/* Charts and Tables */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TrendChart className="md:col-span-2" />
        <div className="space-y-6">
          <ActivityAlerts />
        </div>
      </div>
      
      <div className="mt-6">
        <TopPerformers />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
