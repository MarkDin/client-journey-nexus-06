import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from 'react';

export interface Order {
  id: string;
  clientName: string;
  clientId: string;
  date: string;
  amount: number;
  products: string;
  status?: string;
}

interface UseOrdersDataProps {
  page?: number;
  pageSize?: number;
}

export function useOrdersData({ page = 1, pageSize = 10 }: UseOrdersDataProps = {}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setIsLoading(true);
        setError(null);

        // 首先获取总数
        const { count, error: countError } = await supabase
          .from('customer_orders')
          .select('*', { count: 'exact', head: true });

        if (countError) {
          throw countError;
        }

        setTotalCount(count || 0);

        // 然后获取分页数据
        const { data: ordersData, error: ordersError } = await supabase
          .from('customer_orders')
          .select('id, customer_code, customer_name, order_month, order_amount, material')
          .order('order_month', { ascending: false })
          .range((page - 1) * pageSize, page * pageSize - 1);

        if (ordersError) {
          throw ordersError;
        }

        const formattedOrders: Order[] = ordersData.map(order => ({
          id: order.id,
          clientId: order.customer_code,
          clientName: order.customer_name || 'Unknown Client',
          date: order.order_month,
          amount: Number(order.order_amount) || 0,
          products: order.material || 'No product details',
          // Determine status based on date
          status: new Date(order.order_month) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            ? "Processing"
            : new Date(order.order_month) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
              ? "Shipped"
              : "Delivered"
        }));

        setOrders(formattedOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders');
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, [page, pageSize]);

  return { 
    orders, 
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
