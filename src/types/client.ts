
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
  created_at?: string;
  status?: number;
  score?: number;
  customer_code: string;
}
