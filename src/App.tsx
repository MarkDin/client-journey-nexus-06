
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Index";
import Activities from "./pages/Activities";
import Clients from "./pages/Clients";
import ClientDetails from "./pages/ClientDetails";
import Orders from "./pages/Orders";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import Shipments from "./pages/Shipments";
import Communication from "./pages/Communication";
import UserAnalytics from "./pages/Users";
import Support from "./pages/Support";
import { ClientDrawerProvider } from "@/contexts/ClientDrawerContext";
import { ClientDetailDrawer } from "@/components/clients/ClientDetailDrawer";
import { useClientDrawer } from "@/contexts/ClientDrawerContext";

// Create a wrapper component that includes the ClientDetailDrawer
const AppWithClientDrawer = () => {
  const { selectedClientId, isDrawerOpen, closeClientDrawer } = useClientDrawer();
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/:id" element={<ClientDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/shipments" element={<Shipments />} />
        <Route path="/communication" element={<Communication />} />
        <Route path="/users" element={<UserAnalytics />} />
        <Route path="/support" element={<Support />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Global client detail drawer */}
      <ClientDetailDrawer 
        clientId={selectedClientId} 
        open={isDrawerOpen} 
        onClose={closeClientDrawer} 
      />
    </>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ClientDrawerProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppWithClientDrawer />
        </BrowserRouter>
      </ClientDrawerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
