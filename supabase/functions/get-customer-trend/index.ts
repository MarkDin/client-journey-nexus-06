import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};
serve(async (req)=>{
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  try {
    console.log('Edge function get-customer-trends started');
    // Create a Supabase client with the Auth context of the function
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    console.log('Supabase URL:', supabaseUrl ? 'present' : 'missing');
    console.log('Supabase key:', supabaseKey ? 'present' : 'missing');
    const supabaseClient = createClient(supabaseUrl ?? '', supabaseKey ?? '');
    // Fetch customer trend data from the customer_extra table
    const { data: customerTrendData, error } = await supabaseClient
      .from('customer_extra')
      .select(`
        id,
        customer_code,
        company_name,
        order_amount_in_the_past_year,
        short_trend_slope,
        long_trend_slope,
        customers!customer_extra_customer_code_fkey (
          region,
          sales
        )
      `)
      .eq('customers.customer_code', 'customer_extra.customer_code');
    if (error) {
      console.error('Error fetching customer trend data:', error);
      throw error;
    }
    console.log(`Retrieved ${customerTrendData?.length || 0} records from customer_extra`);
    if (!customerTrendData || customerTrendData.length === 0) {
      console.log('No data found in customer_extra table');
      // Return empty array with proper headers
      return new Response(JSON.stringify([]), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    // Transform the data for the frontend chart
    const transformedData = customerTrendData.map((customer)=>({
        id: customer.id,
        name: customer.company_name || `Customer ${customer.customer_code}`,
        x: customer.long_trend_slope,
        y: customer.short_trend_slope,
        z: customer.order_amount_in_the_past_year,
        totalAmount: customer.order_amount_in_the_past_year,
        customerCode: customer.customer_code,
        country: customer.customers.region || 'Unknown',
        sales: customer.customers.sales || 'Unknown'
      }));
    console.log(`Transformed data contains ${transformedData.length} items`);
    // Return the transformed data
    return new Response(JSON.stringify(transformedData), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (e) {
    console.error('Error in get-customer-trends function:', e);
    return new Response(JSON.stringify({
      error: e.message
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
});
