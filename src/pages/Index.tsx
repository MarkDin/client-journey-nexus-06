
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { OrdersSidebar } from "@/components/dashboard/OrdersSidebar";
import { StatsSummary } from "@/components/dashboard/StatsSummary";
import { ChartsSection } from "@/components/dashboard/ChartsSection";
import { GoalSection } from "@/components/dashboard/GoalSection";
import { ClientDetail } from "@/components/clients/ClientDetail";

const Dashboard = () => {
  const [ordersSidebarOpen, setOrdersSidebarOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  const toggleOrdersSidebar = () => {
    setOrdersSidebarOpen(!ordersSidebarOpen);
  };

  // Function to handle client selection from anywhere in the dashboard
  const handleClientSelect = (clientId: number) => {
    setSelectedClientId(clientId);
  };

  return (
    <AppLayout>
      <PageHeader 
        title="Sales Dashboard" 
        description="Your sales performance at a glance" 
      />
      
      {/* Stats Cards Section */}
      <StatsSummary onOrdersClick={toggleOrdersSidebar} onClientSelect={handleClientSelect} />
      
      {/* Charts Section */}
      <ChartsSection onClientSelect={handleClientSelect} />

      {/* Goal Completion Section */}
      <GoalSection />

      {/* Orders Sidebar */}
      <OrdersSidebar isOpen={ordersSidebarOpen} onClose={() => setOrdersSidebarOpen(false)} />
      
      {/* Client Detail Drawer */}
      {selectedClientId !== null && (
        <ClientDetail 
          clientId={selectedClientId} 
          onClose={() => setSelectedClientId(null)}
          open={selectedClientId !== null}
        />
      )}
    </AppLayout>
  );
};

export default Dashboard;
