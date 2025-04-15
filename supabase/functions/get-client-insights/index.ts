// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

import { createClient } from "npm:@supabase/supabase-js"

console.log("Hello from Functions!")

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
      }
    })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabaseClient = createClient(supabaseUrl, supabaseKey)

    // 获取所有客户摘要
    const { data: summariesData, error: summariesError } = await supabaseClient
      .from('client_summaries')
      .select(`
        id,
        client_id,
        customers!client_summaries_client_id_fkey (
          name
        ),
        summary,
        key_insights,
        edited
      `)

    if (summariesError) throw summariesError

    // 获取通信数据用于关联
    const { data: communicationData, error: communicationError } = await supabaseClient
      .from('client_communications')
      .select(`
        id,
        client_id,
        summary,
        tags,
        week_start,
        week_end,
        thread_count
      `)
      .order('week_start', { ascending: false })

    if (communicationError) throw communicationError

    const formattedData = summariesData?.map(summary => ({
      clientId: String(summary.client_id),
      clientName: summary.customers?.name || '',
      summary: summary.summary || '',
      keyInsights: summary.key_insights || [],
      edited: summary.edited || false,
      communications: communicationData
        ?.filter(comm => comm.client_id === summary.client_id)
        .map(comm => ({
          id: String(comm.id),
          week: comm.week_start ?
            `${new Date(comm.week_start).toLocaleString('default', { month: 'short' })} ${new Date(comm.week_start).getDate()}-${new Date(comm.week_end).toLocaleString('default', { month: 'short' })} ${new Date(comm.week_end).getDate()}, ${new Date(comm.week_end).getFullYear()}` :
            'No date',
          summary: comm.summary || '',
          tags: comm.tags || [],
          threadCount: comm.thread_count || 0
        })) || []
    })) || []

    return new Response(JSON.stringify(formattedData), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/get-client-insights' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
