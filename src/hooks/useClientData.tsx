import {
  Client,
  ClientCommunication,
  ClientOrder,
  ClientSummary,
  getClientByCustomerCode,
  getClientCommunications,
  getClientOrders,
  getClientSummary
} from '@/api/clientService';
import { useCallback, useEffect, useState } from 'react';

export function useClientData(customerCode: string | null) {
  const [client, setClient] = useState<Client | null>(null);
  const [communications, setCommunications] = useState<ClientCommunication[]>([]);
  const [orders, setOrders] = useState<ClientOrder[]>([]);
  const [summary, setSummary] = useState<ClientSummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClientData = useCallback(async () => {
    if (!customerCode) return;

    setIsLoading(true);
    setError(null);

    try {
      const clientData = await getClientByCustomerCode(customerCode);
      if (!clientData) {
        setError('Client not found');
        return;
      }

      setClient(clientData);

      // Fetch communications
      const commsData = await getClientCommunications(customerCode);
      setCommunications(commsData);

      // Fetch client summary
      const summaryData = await getClientSummary(clientData.id);
      setSummary(summaryData);

      // Fetch orders
      const ordersData = await getClientOrders(clientData.customer_code);
      setOrders(ordersData);
    } catch (err) {
      setError('Failed to fetch client data');
      console.error('Error in fetchClientData:', err);
    } finally {
      setIsLoading(false);
    }
  }, [customerCode]);

  useEffect(() => {
    fetchClientData();
  }, [fetchClientData]);

  return {
    client,
    communications,
    orders,
    summary,  // 新增返回值
    isLoading,
    error,
    refetch: fetchClientData
  };
}
