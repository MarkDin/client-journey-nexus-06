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
  created_at?: string;
  customer_code: string;
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
    const { data: clientData, error: clientError } = await supabase
      .from('customers')
      .select('ai_summary, tags')
      .eq('customer_code', clientId)
      .single();

    if (clientError) {
      console.error("Error fetching client summary:", clientError);
      return null;
    }

    // Transform the data to match ClientSummary interface
    const summary: ClientSummary = {
      client_id: clientId,
      ai_summary: clientData?.ai_summary,
      key_insights: clientData?.tags || [], // Default to empty array if no insights
    };

    return summary;
  } catch (error) {
    console.error("Error in getClientSummary:", error);
    return null;
  }
}

export async function updateSummary(communication_id: number, summary: string, tags?: string): Promise<boolean> {
  try {
    const updateData: { summary: string; tags?: string[] } = { summary };
    if (tags) {
      updateData.tags = tags.split(',').map(tag => tag.trim()).filter(Boolean);
    }

    const { error } = await supabase
      .from('client_communications')
      .update(updateData)
      .eq('id', communication_id)
      .single();

    if (error) {
      console.error("Error updating client summary:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in updateSummary:", error);
    return false;
  }
}
