
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Client } from '@/types/client';

interface Communication {
  id: number;
  week_label: string;
  summary: string;
  thread_count: number;
  attachments: any;
  tags: string[];
  created_at: string;
  customer_code: string;
  ai_generated: boolean;
  edited: boolean;
  emails_id: string[];
}

export function useClientData(customerCode: string | null) {
  const [client, setClient] = useState<Client | null>(null);
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClientData() {
      if (!customerCode) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch client data
        const { data: clientData, error: clientError } = await supabase
          .from('customers')
          .select('*')
          .eq('customer_code', customerCode)
          .single();
        
        if (clientError) {
          throw clientError;
        }
        
        setClient(clientData);
        
        // Fetch communications
        const { data: commsData, error: commsError } = await supabase
          .from('client_communications')
          .select('*')
          .eq('customer_code', customerCode)
          .order('week_start', { ascending: false });
        
        if (commsError) {
          throw commsError;
        }
        
        setCommunications(commsData || []);
        
      } catch (err) {
        console.error('Error in fetchClientData:', err);
        setError('Failed to fetch client data');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchClientData();
  }, [customerCode]);

  return { 
    client, 
    communications,
    isLoading, 
    error 
  };
}
