
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { OrdersSidebar } from "@/components/dashboard/OrdersSidebar";
import { StatsSummary } from "@/components/dashboard/StatsSummary";
import { ChartsSection } from "@/components/dashboard/ChartsSection";
import { GoalSection } from "@/components/dashboard/GoalSection";

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
      
      {/* Stats Cards Section */}
      <StatsSummary onOrdersClick={toggleOrdersSidebar} />
      
      {/* Charts Section */}
      <ChartsSection />

      {/* Goal Completion Section */}
      <GoalSection />

      {/* Orders Sidebar */}
      <OrdersSidebar isOpen={ordersSidebarOpen} onClose={() => setOrdersSidebarOpen(false)} />
    </AppLayout>
  );
};

export default Dashboard;
