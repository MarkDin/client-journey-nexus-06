import {
  Client,
  ClientCommunication,
  ClientOrder,
  getClientByCustomerCode,
  getClientCommunications,
  getClientOrders,
} from '@/api/clientService';
import { useCallback, useEffect, useState } from 'react';

export function useClientData(customerCode: string | null) {
  const [client, setClient] = useState<Client | null>(null);
  const [communications, setCommunications] = useState<ClientCommunication[]>([]);
  const [orders, setOrders] = useState<ClientOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCommunications, setIsLoadingCommunications] = useState<boolean>(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 获取基础客户信息
  const fetchClientBasicData = useCallback(async () => {
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
    } catch (err) {
      setError('Failed to fetch client data');
      console.error('Error in fetchClientBasicData:', err);
    } finally {
      setIsLoading(false);
    }
  }, [customerCode]);

  // 获取通信记录
  const fetchCommunications = useCallback(async () => {
    if (!customerCode) return;
    setIsLoadingCommunications(true);

    try {
      const commsData = await getClientCommunications(customerCode);
      setCommunications(commsData);
    } catch (err) {
      console.error('Error fetching communications:', err);
    } finally {
      setIsLoadingCommunications(false);
    }
  }, [customerCode]);

  // 获取订单数据
  const fetchOrders = useCallback(async () => {
    if (!client?.customer_code) return;
    setIsLoadingOrders(true);

    try {
      const ordersData = await getClientOrders(client.customer_code);
      setOrders(ordersData);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setIsLoadingOrders(false);
    }
  }, [client?.customer_code]);

  // 初始化时只加载基础数据
  useEffect(() => {
    fetchClientBasicData();
  }, [fetchClientBasicData]);

  return {
    client,
    communications,
    orders,
    summary: client ? {
      ai_summary: client.ai_summary,
      key_insights: client.key_insights || []
    } : null,
    isLoading,
    isLoadingCommunications,
    isLoadingOrders,
    error,
    fetchCommunications,
    fetchOrders,
    refetch: fetchClientBasicData
  };
}
