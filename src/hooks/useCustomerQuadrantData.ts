
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface CustomerTrend {
    id: number;
    name: string;
    x: number;
    y: number;
    z: number;
    totalAmount: number;
    customerCode: string;
}

export function useCustomerData() {
    const [data, setData] = useState<CustomerTrend[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCustomerTrendData() {
            try {
                setIsLoading(true);
                setError(null);

                const { data: trendData, error } = await supabase.functions.invoke('get-customer-trends');

                if (error) {
                    console.error('Error response from edge function:', error);
                    throw new Error(error.message);
                }

                trendData.map((item: CustomerTrend) => {
                    item.z = item.z;
                });
                setData(Array.isArray(trendData) ? trendData : []);
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching customer trend data:", err);
                setError(err instanceof Error ? err.message : "Failed to fetch customer trend data");
                setIsLoading(false);
            }
        }

        fetchCustomerTrendData();
    }, []);

    return { data, isLoading, error };
}
