
import { useState } from "react";
import { Plus } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { ClientTable } from "@/components/clients/ClientTable";
import { ClientDetail } from "@/components/clients/ClientDetail";

const Clients = () => {
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  
  return (
    <AppLayout>
      <PageHeader 
        title="Client Management" 
        description="Browse, search, and manage your clients"
      >
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </PageHeader>
      
      <ClientTable onViewClient={(clientId) => setSelectedClientId(clientId)} />
      
      {selectedClientId !== null && (
        <ClientDetail 
          clientId={selectedClientId} 
          onClose={() => setSelectedClientId(null)} 
        />
      )}
    </AppLayout>
  );
};

export default Clients;
