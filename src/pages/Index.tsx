
import { useState } from "react";
import { DollarSign, Package } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { OrdersSidebar } from "@/components/dashboard/OrdersSidebar";
import { CustomerQuadrantChart } from "@/components/dashboard/CustomerQuadrantChart";
import { useClientDrawer } from "@/contexts/ClientDrawerContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [ordersSidebarOpen, setOrdersSidebarOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const {
    openClientDrawer
  } = useClientDrawer();

  const toggleOrdersSidebar = () => {
    setOrdersSidebarOpen(!ordersSidebarOpen);
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setOrdersSidebarOpen(true);
  };

  const handleClientCustomerCodeSelect = (customerCode: string) => {
    openClientDrawer(customerCode);
  };

  return <AppLayout>
    <PageHeader title="Sales Dashboard" description="Your sales performance at a glance" />

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mb-6">
      <StatsCard title="YTD Sales" value="$4.3M" icon={<DollarSign className="h-5 w-5" />} trend={{
        value: 12,
        label: "vs last year"
      }} />
      <StatsCard title="Weekly New Orders" value="247" icon={<Package className="h-5 w-5" />} trend={{
        value: 8,
        label: "vs last week"
      }} onClick={toggleOrdersSidebar} clickable />
    </div>

    <div className="mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl md:text-2xl text-center">Monthly Sales by Region</CardTitle>
        </CardHeader>
        <CardContent>
          <TrendChart className="w-full" onCountrySelect={handleCountrySelect} />
        </CardContent>
      </Card>
    </div>

    <div className="mb-6">
      <CustomerQuadrantChart onCustomerSelect={handleClientCustomerCodeSelect} />
    </div>

    <OrdersSidebar isOpen={ordersSidebarOpen} onClose={() => setOrdersSidebarOpen(false)} onClientSelect={handleClientCustomerCodeSelect} selectedCountry={selectedCountry} />
  </AppLayout>;
};

export default Dashboard;
