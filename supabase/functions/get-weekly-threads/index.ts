// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'npm:@supabase/supabase-js'

console.log("Hello from Functions!")

serve(async (req: Request) => {
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

    const { data: communicationData, error: threadsError } = await supabaseClient
      .from('client_communications')
      .select(`
        id,
        client_id,
        customers!client_communications_client_id_fkey (
          name
        ),
        summary,
        tags,
        ai_generated,
        edited,
        week_start,
        week_end,
        thread_count
      `)
      .order('week_start', { ascending: false })
      .limit(10)

    if (threadsError) throw threadsError

    const formattedData = communicationData?.map(thread => ({
      id: String(thread.id),
      clientId: String(thread.client_id),
      clientName: thread.customers?.name || '',
      weekRange: thread.week_start ?
        `${new Date(thread.week_start).toLocaleString('default', { month: 'short' })} ${new Date(thread.week_start).getDate()}-${new Date(thread.week_end).toLocaleString('default', { month: 'short' })} ${new Date(thread.week_end).getDate()}, ${new Date(thread.week_end).getFullYear()}` :
        'No date',
      summary: thread.summary || '',
      tags: thread.tags || [],
      aiGenerated: thread.ai_generated || false,
      edited: thread.edited || false
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

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/get-weekly-threads' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
