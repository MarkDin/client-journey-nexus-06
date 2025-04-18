import { ClientTable } from "@/components/clients/ClientTable";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import { supabase } from "@/integrations/supabase/client";
import { useClientDrawerStore } from "@/store/useClientDrawerStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Clients = () => {
  const openDrawer = useClientDrawerStore(state => state.openDrawer);
  const { trackEvent } = useGoogleAnalytics();
  const [isLoading, setIsLoading] = useState(true);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function fetchClients() {
      try {
        setIsLoading(true);

        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .order('company', { ascending: true });

        if (error) {
          throw error;
        }

        setClients(data || []);
        console.log('Clients fetched:', data);
      } catch (error) {
        console.error('Error fetching clients:', error);
        toast.error('Failed to load clients');
      } finally {
        setIsLoading(false);
      }
    }

    fetchClients();
  }, []);

  const handleClientClick = (customerCode: string) => {
    trackEvent('Client', 'View Details', customerCode);
    openDrawer(customerCode);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Client Management"
        description="Browse, search, and manage your clients"
      />

      <ClientTable
        clients={clients}
        isLoading={isLoading}
        onClientClick={handleClientClick}
      />
    </AppLayout>
  );
};

export default Clients;
