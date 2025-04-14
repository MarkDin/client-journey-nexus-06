
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { ClientTable } from "@/components/clients/ClientTable";

const Clients = () => {
  return (
    <AppLayout>
      <PageHeader 
        title="Client Management" 
        description="Browse, search, and manage your clients"
      />
      
      <ClientTable />
    </AppLayout>
  );
};

export default Clients;
