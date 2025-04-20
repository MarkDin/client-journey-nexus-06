import { Database } from "@/integrations/supabase/types";

// 表类型
export type Tables = Database['public']['Tables'];

// 客户相关类型
export type Customer = Tables['customers']['Row'];
export type CustomerInsert = Tables['customers']['Insert'];
export type CustomerUpdate = Tables['customers']['Update'];

// 订单相关类型
export type Order = Tables['customer_orders']['Row'];
export type OrderInsert = Tables['customer_orders']['Insert'];
export type OrderUpdate = Tables['customer_orders']['Update'];

// 通信相关类型
export type Communication = Tables['client_communications']['Row'];
export type CommunicationInsert = Tables['client_communications']['Insert'];
export type CommunicationUpdate = Tables['client_communications']['Update'];

// 复合类型示例
export type CustomerWithOrders = Customer & {
  orders: Order[];
};

export type CustomerWithCommunications = Customer & {
  communications: Communication[];
}; 