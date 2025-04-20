import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js";

Deno.serve(async (req: Request) => {
  // Add CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
  const supabaseClient = createClient(supabaseUrl, supabaseKey);

  try {
    // First, add the order_year column if it doesn't exist
    const { error: alterError } = await supabaseClient.rpc('add_order_year_column');
    if (alterError) {
      console.error('Error adding order_year column:', alterError);
      return new Response(JSON.stringify({ error: "Failed to add order_year column" }), {
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        },
        status: 500,
      });
    }

    // Get all orders with order_month
    const { data: orders, error: selectError } = await supabaseClient
      .from('customer_orders')
      .select('id, order_month')
      .not('order_month', 'is', null);

    if (selectError) {
      console.error('Error fetching orders:', selectError);
      return new Response(JSON.stringify({ error: "Failed to fetch orders" }), {
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        },
        status: 500,
      });
    }

    // Update each order with the year extracted from order_month
    for (const order of orders) {
      if (order.order_month) {
        const year = order.order_month.split('-')[0];
        const { error: updateError } = await supabaseClient
          .from('customer_orders')
          .update({ order_year: year })
          .eq('id', order.id);

        if (updateError) {
          console.error(`Error updating order ${order.id}:`, updateError);
        }
      }
    }

    return new Response(JSON.stringify({ message: "Successfully updated order years" }), {
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      },
      status: 200,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      },
      status: 500,
    });
  }
}); 