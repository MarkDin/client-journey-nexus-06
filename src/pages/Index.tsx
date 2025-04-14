
import { useState } from "react";
import { DollarSign, Package, PercentCircle } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { OrdersSidebar } from "@/components/dashboard/OrdersSidebar";
import { GoalCompletionChart } from "@/components/dashboard/GoalCompletionChart";
import { TopPerformers } from "@/components/dashboard/TopPerformers";

const Dashboard = () => {
  const [ordersSidebarOpen, setOrdersSidebarOpen] = useState(false);

  const toggleOrdersSidebar = () => {
    setOrdersSidebarOpen(!ordersSidebarOpen);
  };

  return (
    <AppLayout>
      <PageHeader 
        title="Sales Dashboard" 
        description="Your sales performance at a glance" 
      />
      
      {/* Stats Cards with improved layout and spacing */}
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
          onClick={toggleOrdersSidebar}
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
      
      {/* Charts with improved layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <TrendChart className="w-full h-[400px]" />
        </div>
        <div className="md:col-span-1">
          <TopPerformers className="w-full h-[400px]" />
        </div>
      </div>

      {/* Goal Completion Chart */}
      <div className="mb-6">
        <GoalCompletionChart className="w-full" />
      </div>

      {/* Orders Sidebar */}
      <OrdersSidebar isOpen={ordersSidebarOpen} onClose={() => setOrdersSidebarOpen(false)} />
    </AppLayout>
  );
};

export default Dashboard;
