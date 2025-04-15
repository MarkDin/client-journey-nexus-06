import { supabase } from "@/integrations/supabase/client";

export interface Client {
  id: string;
  name: string;
  company: string;
  industry?: string;
  region?: string;
  credit_level?: string;
  credit_limit?: number;
  credit_used?: number;
  address?: string;
  email?: string;
  phone?: string;
  tags?: string[];
  ai_summary?: string;
  next_meeting?: string;
  sales_rep?: string;
  last_order?: string;
  status?: number;
  score?: number;
}

export interface ClientCommunication {
  id: number;
  client_id: string;
  week_start?: string;
  week_end?: string;
  week_label?: string;
  summary?: string;
  thread_count?: number;
  attachments?: any;
  tags?: string[];
  created_at?: string;
}

export interface ClientOrder {
  id: string;
  customer_code: string;
  customer_name?: string;
  order_amount?: number;
  order_month?: string;
  material?: string;
  product_type?: string;
}

export interface ClientSummary {
  client_id: string;
  ai_summary?: string;
  key_insights?: string[];
}

export async function getClientById(clientId: string): Promise<Client | null> {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', clientId)
      .single();
    
    if (error) {
      console.error("Error fetching client:", error);
      return null;
    }
    
    return data as Client;
  } catch (error) {
    console.error("Error in getClientById:", error);
    return null;
  }
}

export async function getClientCommunications(clientId: string): Promise<ClientCommunication[]> {
  try {
    const { data, error } = await supabase
      .from('client_communications')
      .select('*')
      .eq('client_id', clientId)
      .order('week_start', { ascending: false });
    
    if (error) {
      console.error("Error fetching client communications:", error);
      return [];
    }
    
    return data as ClientCommunication[];
  } catch (error) {
    console.error("Error in getClientCommunications:", error);
    return [];
  }
}

export async function getClientOrders(clientCode: string): Promise<ClientOrder[]> {
  try {
    const { data, error } = await supabase
      .from('customer_orders')
      .select('*')
      .eq('customer_code', clientCode)
      .order('order_month', { ascending: false })
      .limit(10);
    
    if (error) {
      console.error("Error fetching client orders:", error);
      return [];
    }
    
    return data as ClientOrder[];
  } catch (error) {
    console.error("Error in getClientOrders:", error);
    return [];
  }
}

export async function getClientSummary(clientId: string): Promise<ClientSummary | null> {
  try {
    const { data, error } = await supabase
      .from('customer_extra')
      .select('*')
      .eq('client_id', clientId)
      .single();
    
    if (error) {
      console.error("Error fetching client summary:", error);
      return null;
    }
    
    return data as ClientSummary;
  } catch (error) {
    console.error("Error in getClientSummary:", error);
    return null;
  }
}
