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

  console.log('Request received');
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
  const supabaseClient = createClient(supabaseUrl, supabaseKey);

  try {
    const { customerCode } = await req.json();
    console.log('Customer code:', customerCode);

    if (!customerCode) {
      console.log('Error: Customer code is required');
      return new Response(JSON.stringify({ error: "Customer code is required" }), {
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        },
        status: 400,
      });
    }

    // 首先根据customerCode获取客户名称
    const { data: customerData, error: customerError } = await supabaseClient
      .from('customers')
      .select('name')
      .eq('customer_code', customerCode)
      .single();

    if (customerError || !customerData) {
      console.log('Error fetching customer:', customerError);
      return new Response(JSON.stringify({ error: "Customer not found" }), {
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        },
        status: 404,
      });
    }

    console.log('Customer found:', customerData.name);

    // 然后根据客户名称获取季度趋势图片
    const { data: trendData, error: trendError } = await supabaseClient
      .from('clients_quarter_trend')
      .select('newest_quarter_trend_picture')
      .eq('name', customerData.name)
      .single();

    if (trendError || !trendData) {
      console.log('Error fetching trend data:', trendError);
      return new Response(JSON.stringify({ error: "Trend data not found" }), {
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        },
        status: 404,
      });
    }

    console.log('Trend data found successfully');

    // 检查图片数据是否存在且有效
    if (!trendData.newest_quarter_trend_picture) {
      console.log('Error: No image data found');
      return new Response(JSON.stringify({ error: "No image data available" }), {
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        },
        status: 404,
      });
    }

    // 将二进制数据转换为 Blob
    const binaryData = trendData.newest_quarter_trend_picture;
    const blob = new Blob([binaryData], { type: 'image/png' });
    
    // 创建 Blob URL
    const blobUrl = URL.createObjectURL(blob);

    return new Response(JSON.stringify({ image: blobUrl }), {
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