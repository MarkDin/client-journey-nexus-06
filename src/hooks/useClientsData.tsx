import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from 'react';

export interface Client {
  id: string;
  customer_code: string;
  name: string;
  company: string;
  email: string | null;
  phone: string | null;
  status: number | null;
  industry: string | null;
  region: string | null;
  credit_level: string | null;
  credit_limit: number | null;
  credit_used: number | null;
  lifetime_value: number | null;
  purchase_count: number | null;
  last_order: string | null;
  next_meeting: string | null;
  tags: string[] | null;
}

interface UseClientsDataProps {
  page?: number;
  pageSize?: number;
}

export function useClientsData({ page = 1, pageSize = 10 }: UseClientsDataProps = {}) {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    async function fetchClients() {
      try {
        setIsLoading(true);
        setError(null);

        // 获取总数
        const { count, error: countError } = await supabase
          .from('customers')
          .select('*', { count: 'exact', head: true });

        if (countError) {
          throw countError;
        }

        setTotalCount(count || 0);

        // 获取分页数据
        const { data: clientsData, error: clientsError } = await supabase
          .from('customers')
          .select(`
            id,
            customer_code,
            name,
            company,
            email,
            phone,
            status,
            industry,
            region,
            credit_level,
            credit_limit,
            credit_used,
            lifetime_value,
            purchase_count,
            last_order,
            next_meeting,
            tags
          `)
          .order('company', { ascending: true })
          .range((page - 1) * pageSize, page * pageSize - 1);

        if (clientsError) {
          throw clientsError;
        }

        setClients(clientsData || []);
      } catch (err) {
        console.error('Error fetching clients:', err);
        setError('Failed to fetch clients');
      } finally {
        setIsLoading(false);
      }
    }

    fetchClients();
  }, [page, pageSize]);

  return {
    clients,
    isLoading,
    error,
    pagination: {
      total: totalCount,
      pageSize,
      current: page,
      totalPages: Math.ceil(totalCount / pageSize)
    }
  };
} 