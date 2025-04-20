import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from 'react';
import { Customer } from "@/types/supabase";


interface UseClientsDataProps {
  page?: number;
  pageSize?: number;
}

export function useClientsData({ page = 1, pageSize = 20 }: UseClientsDataProps = {}) {
  const [clients, setClients] = useState<Customer[]>([]);
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
          .select('*')
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