
import { useState, useEffect } from 'react';
import { 
  getClientById, 
  getClientCommunications, 
  getClientOrders, 
  getClientSummary,  // 新添加的函数
  Client, 
  ClientCommunication, 
  ClientOrder,
  ClientSummary
} from '@/services/clientService';

export function useClientData(clientId: number | null) {
  const [client, setClient] = useState<Client | null>(null);
  const [communications, setCommunications] = useState<ClientCommunication[]>([]);
  const [orders, setOrders] = useState<ClientOrder[]>([]);
  const [summary, setSummary] = useState<ClientSummary | null>(null);
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
        
        // Fetch client summary
        const summaryData = await getClientSummary(clientData.id);
        setSummary(summaryData);
        
        // Fetch orders
        const ordersData = await getClientOrders(clientData.id);
        setOrders(ordersData);
      } catch (err) {
        setError('Failed to fetch client data');
        console.error('Error in fetchClientData:', err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchClientData();
  }, [clientId]);

  return { 
    client, 
    communications, 
    orders, 
    summary,  // 新增返回值
    isLoading, 
    error 
  };
}
