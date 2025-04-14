
import { useState } from "react";
import { DollarSign, Package, PercentCircle, Filter, ArrowRight } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { OrdersSidebar } from "@/components/dashboard/OrdersSidebar";
import { GoalCompletionChart } from "@/components/dashboard/GoalCompletionChart";
import { useClientDrawer } from "@/contexts/ClientDrawerContext";
import { SideDrawerButton } from "@/components/ui/side-drawer-button";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [ordersSidebarOpen, setOrdersSidebarOpen] = useState(false);
  const [selectedView] = useState("count");
  const { openClientDrawer } = useClientDrawer();

  const toggleOrdersSidebar = () => {
    setOrdersSidebarOpen(!ordersSidebarOpen);
  };

  const handleClientSelect = (clientId: number) => {
    openClientDrawer(clientId);
  };

  return (
    <AppLayout>
      <PageHeader 
        title="Sales Dashboard" 
        description="Your sales performance at a glance"
      >
        <div className="flex gap-2">
          <Select value={selectedView} onValueChange={() => {}}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="count">Order Count</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </PageHeader>
      
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
          onClick={toggleOrdersSidebar}
          clickable
        />
        <StatsCard
          title="Goal Completion Rate"
          value="78%"
          icon={<PercentCircle className="h-5 w-5" />}
          trend={{ value: -3, label: "vs last month" }}
        />
      </div>
      
      {/* Main Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2 flex items-center justify-between">
            <CardTitle>Monthly Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <TrendChart className="w-full" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex items-center justify-between">
            <CardTitle>Goal Completion</CardTitle>
            <SideDrawerButton 
              onClick={() => toggleOrdersSidebar()} 
              variant="outline" 
              size="sm"
            >
              View Details
            </SideDrawerButton>
          </CardHeader>
          <CardContent>
            <GoalCompletionChart className="w-full" />
          </CardContent>
        </Card>
      </div>
      
      {/* Product Shipment Analysis */}
      <Card className="mb-6">
        <CardHeader className="pb-2 flex items-center justify-between">
          <CardTitle>Product Shipment Analysis</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1.5" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <ArrowRight className="h-4 w-4 mr-1.5" />
              Full Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full flex items-center justify-center text-muted-foreground">
            Monthly shipment data visualization will appear here
          </div>
        </CardContent>
      </Card>

      {/* Orders Sidebar */}
      <OrdersSidebar 
        isOpen={ordersSidebarOpen} 
        onClose={() => setOrdersSidebarOpen(false)}
        onClientSelect={handleClientSelect}
      />
    </AppLayout>
  );
};

export default Dashboard;
