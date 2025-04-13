
import { UsersIcon, BarChart3, Clock, Globe } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { UserVisitChart } from "@/components/analytics/UserVisitChart";
import { UserDeviceStats } from "@/components/analytics/UserDeviceStats";
import { UserLocationMap } from "@/components/analytics/UserLocationMap";
import { UserAnalyticsTable } from "@/components/analytics/UserAnalyticsTable";

const Analytics = () => {
  return (
    <AppLayout>
      <PageHeader 
        title="User Analytics" 
        description="Track and analyze user activity on your platform"
      />
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatsCard
          title="Total Visitors"
          value="24,892"
          icon={<UsersIcon className="h-5 w-5" />}
          trend={{ value: 8.4, label: "vs last month" }}
        />
        <StatsCard
          title="Active Users"
          value="18,453"
          icon={<UsersIcon className="h-5 w-5" />}
          trend={{ value: 5.1, label: "vs last month" }}
        />
        <StatsCard
          title="Avg. Session Duration"
          value="4m 32s"
          icon={<Clock className="h-5 w-5" />}
          trend={{ value: 2.3, label: "vs last month" }}
        />
        <StatsCard
          title="Bounce Rate"
          value="42.8%"
          icon={<BarChart3 className="h-5 w-5" />}
          trend={{ value: -3.6, label: "vs last month" }}
        />
      </div>
      
      {/* User Analytics Table */}
      <div className="mb-6">
        <UserAnalyticsTable />
      </div>
      
      {/* User Visit Chart */}
      <div className="mb-6">
        <UserVisitChart className="w-full" />
      </div>
      
      {/* User Device and Location Stats */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <UserDeviceStats />
        <UserLocationMap />
      </div>
    </AppLayout>
  );
};

export default Analytics;
