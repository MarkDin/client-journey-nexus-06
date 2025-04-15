import { useState, useEffect } from 'react';
import { 
  getClientById, 
  getClientCommunications, 
  getClientOrders, 
  getClientSummary,
  Client, 
  ClientCommunication, 
  ClientOrder,
  ClientSummary
} from '@/services/clientService';

export function useClientData(customerCode: string | null) {
  const [client, setClient] = useState<Client | null>(null);
  const [communications, setCommunications] = useState<ClientCommunication[]>([]);
  const [orders, setOrders] = useState<ClientOrder[]>([]);
  const [summary, setSummary] = useState<ClientSummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClientData() {
      if (!customerCode) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const clientData = await getClientById(customerCode);
        if (!clientData) {
          setError('Client not found');
          return;
        }
        
        setClient(clientData);
        
        // Fetch communications
        const commsData = await getClientCommunications(customerCode);
        setCommunications(commsData);
        
        // Fetch client summary
        const summaryData = await getClientSummary(customerCode);
        setSummary(summaryData);
        
        // Fetch orders
        const ordersData = await getClientOrders(customerCode);
        setOrders(ordersData);
      } catch (err) {
        setError('Failed to fetch client data');
        console.error('Error in fetchClientData:', err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchClientData();
  }, [customerCode]);

  return { 
    client, 
    communications, 
    orders, 
    summary,
    isLoading, 
    error 
  };
}
