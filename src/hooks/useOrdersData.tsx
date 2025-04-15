
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export interface Order {
  id: string;
  clientName: string;
  clientId: string;
  date: string;
  amount: number;
  products: string;
  status?: string;
}

export function useOrdersData() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setIsLoading(true);
        setError(null);

        const { data: ordersData, error: ordersError } = await supabase
          .from('customer_orders')
          .select(`
            id,
            customer_code as clientId,
            customer_name as clientName,
            order_month as date,
            order_amount as amount,
            material as products
          `)
          .order('order_month', { ascending: false });

        if (ordersError) {
          throw ordersError;
        }

        const formattedOrders: Order[] = ordersData.map(order => ({
          id: order.id,
          clientId: order.clientId,
          clientName: order.clientName || 'Unknown Client',
          date: order.date,
          amount: Number(order.amount) || 0,
          products: order.products || 'No product details',
          // Determine status based on date
          status: new Date(order.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            ? "Processing"
            : new Date(order.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
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
  }, []);

  return { orders, isLoading, error };
}
