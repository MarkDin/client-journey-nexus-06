import { supabase } from "@/integrations/supabase/client";
import { ClientSummary } from "@/types/communication";
import { format } from "date-fns";
import { useCallback, useState } from 'react';
import { toast } from "sonner";

interface FetchDataParams {
  page: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  currentPage: number;
  pageSize: number;
}

const fetchPaginatedData = async ({
  page = 1,
  pageSize = 10,
  sortField = 'created_at',
  sortOrder = 'desc'
}: FetchDataParams): Promise<PaginatedResponse<ClientSummary>> => {
  try {
    console.log('Fetching paginated data...');
    const offset = (page - 1) * pageSize;

    // 1. 首先获取客户列表（分页）
    const { data: customers, error: customersError, count: totalCustomers } = await supabase
      .from('customers')
      .select('*', { count: 'exact' })
      .order(sortField, { ascending: sortOrder === 'asc' })
      .range(offset, offset + pageSize - 1);

    if (customersError) throw customersError;

    // 2. 获取这些客户的摘要和通信记录
    const customerIds = customers?.map(customer => customer.id) || [];

    // 并行加载摘要和通信记录
    const [summariesResponse, communicationsResponse] = await Promise.all([
      // 获取客户摘要
      supabase
        .from('client_summaries')
        .select(`
                    id,
                    client_id,
                    customers!client_summaries_client_id_fkey (
                        name
                    ),
                    summary,
                    key_insights,
                    edited
                `)
        .in('client_id', customerIds),

      // 获取最近的通信记录
      supabase
        .from('client_communications')
        .select(`
                    id,
                    client_id,
                    customers!client_communications_client_id_fkey (
                        name
                    ),
                    summary,
                    tags,
                    ai_generated,
                    edited,
                    week_start,
                    week_end,
                    thread_count
                `)
        .in('client_id', customerIds)
        .order('week_start', { ascending: false })
    ]);

    if (summariesResponse.error) throw summariesResponse.error;
    if (communicationsResponse.error) throw communicationsResponse.error;

    // 3. 整合数据
    const formattedData: ClientSummary[] = customers.map(customer => {
      // 查找该客户的摘要
      const customerSummary = summariesResponse.data?.find(
        summary => summary.client_id === customer.id
      );

      // 查找该客户的通信记录
      const customerCommunications = communicationsResponse.data
        ?.filter(comm => comm.client_id === customer.id)
        .map(comm => ({
          id: String(comm.id),
          week: comm.week_start ?
            `${format(new Date(comm.week_start), 'MMM d')}-${format(new Date(comm.week_end), 'MMM d, yyyy')}` :
            'No date',
          summary: comm.summary || '',
          tags: comm.tags || [],
          threadCount: comm.thread_count || 0
        })) || [];

      return {
        clientId: String(customer.id),
        clientName: customer.name,
        summary: customerSummary?.summary || '',
        keyInsights: customerSummary?.key_insights || [],
        edited: customerSummary?.edited || false,
        communications: customerCommunications,
        customerInfo: {
          company: customer.company,
          email: customer.email,
          phone: customer.phone,
          industry: customer.industry,
          region: customer.region,
          status: customer.status,
          credit_level: customer.credit_level,
          credit_limit: customer.credit_limit,
          credit_used: customer.credit_used,
          purchase_count: customer.purchase_count,
          last_order: customer.last_order,
          next_meeting: customer.next_meeting,
          sales_rep: customer.sales_rep,
          score: customer.score,
          short_name: customer.short_name
        }
      };
    });

    return {
      data: formattedData,
      total: totalCustomers || 0,
      currentPage: page,
      pageSize
    };

  } catch (error) {
    console.error('Error fetching paginated data:', error);
    toast.error("加载客户数据失败，请重试。");
    throw error;
  }
};

export const useCustomerListData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<ClientSummary[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const fetchCustomers = useCallback(async (
    page: number = 1,
    pageSize: number = 10,
    sortField?: string,
    sortOrder?: 'asc' | 'desc'
  ) => {
    setLoading(true);
    try {
      const response = await fetchPaginatedData({
        page,
        pageSize,
        sortField,
        sortOrder
      });

      setData(response.data);
      setPagination({
        current: response.currentPage,
        pageSize: response.pageSize,
        total: response.total
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    pagination,
    fetchCustomers
  };
};