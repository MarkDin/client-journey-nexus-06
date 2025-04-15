
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { ClientTable } from "@/components/clients/ClientTable";
import { supabase } from "@/integrations/supabase/client";
import { useClientDrawer } from "@/contexts/ClientDrawerContext";
import { toast } from "sonner";

const Clients = () => {
  const { openClientDrawer } = useClientDrawer();
  const [isLoading, setIsLoading] = useState(true);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function fetchClients() {
      try {
        setIsLoading(true);
        
        // Fetch clients from Supabase
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

  // Handle client click - open the drawer
  const handleClientClick = (clientId: string) => {
    openClientDrawer(clientId);
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
