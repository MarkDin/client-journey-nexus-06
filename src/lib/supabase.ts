
import { createClient } from '@supabase/supabase-js';

// Use hardcoded values instead of environment variables since we're in a Lovable project
const supabaseUrl = "https://pugtpiijinkulpbnbgji.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1Z3RwaWlqaW5rdWxwYm5iZ2ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NDk1OTMsImV4cCI6MjA2MDAyNTU5M30.MEZ5-PybQzmwfcESgwtFSZKxGNzNTrMrfkc8N7IEmls";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
    },
}); 
