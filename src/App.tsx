import { ClientDetailDrawer } from "@/components/clients/ClientDetailDrawer";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import { useClientDrawerStore } from "@/store/useClientDrawerStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ClientDetails from "@/pages/ClientDetails";
import Clients from "@/pages/Clients";
import Dashboard from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Orders from "@/pages/Orders";
import VisitInfo from "@/pages/VisitInfo";
// Create a wrapper component that includes the ClientDetailDrawer and tracks page views
const AppWithClientDrawer = () => {
  const { customerCode, isOpen, closeDrawer } = useClientDrawerStore();
  const location = useLocation();
  const { trackPageView } = useGoogleAnalytics();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location, trackPageView]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/visit-info" element={<VisitInfo />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/:id" element={<ClientDetails />} />
        <Route path="/orders" element={<Orders />} />
        {/* <Route path="/shipments" element={<Shipments />} /> */}
        {/* <Route path="/communication" element={<Communication />} /> */}
        {/* <Route path="/support" element={<Support />} /> */}
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Global client detail drawer */}
      <ClientDetailDrawer
        customerCode={customerCode}
        open={isOpen}
        onClose={closeDrawer}
      />
    </>
  );
};

// Fix: Move the QueryClient instance inside the function component
const App = () => {
  // Create the client instance inside the component
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppWithClientDrawer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
