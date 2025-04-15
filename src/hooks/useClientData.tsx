
import { useState, useEffect } from 'react';
import { 
  getClientById, 
  getClientCommunications, 
  getClientOrders, 
  Client, 
  ClientCommunication, 
  ClientOrder 
} from '@/services/clientService';

export function useClientData(clientId: number | null) {
  const [client, setClient] = useState<Client | null>(null);
  const [communications, setCommunications] = useState<ClientCommunication[]>([]);
  const [orders, setOrders] = useState<ClientOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClientData() {
      if (!clientId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const clientData = await getClientById(clientId.toString());
        if (!clientData) {
          setError('Client not found');
          return;
        }
        
        setClient(clientData);
        
        // Fetch communications
        const commsData = await getClientCommunications(clientId.toString());
        setCommunications(commsData);
        
        // Fetch orders if client has a customer code
        if (clientData.customer_code) {
          const ordersData = await getClientOrders(clientData.customer_code);
          setOrders(ordersData);
        }
      } catch (err) {
        setError('Failed to fetch client data');
        console.error('Error in fetchClientData:', err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchClientData();
  }, [clientId]);

  return { client, communications, orders, isLoading, error };
}
