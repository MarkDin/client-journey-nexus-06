export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      client_communications: {
        Row: {
          attachments: Json | null
          client_id: string
          created_at: string | null
          customer_code: string
          id: number
          summary: string | null
          tags: string[] | null
          thread_count: number | null
          week_end: string | null
          week_label: string | null
          week_start: string | null
        }
        Insert: {
          attachments?: Json | null
          client_id: string
          created_at?: string | null
          customer_code: string
          id?: number
          summary?: string | null
          tags?: string[] | null
          thread_count?: number | null
          week_end?: string | null
          week_label?: string | null
          week_start?: string | null
        }
        Update: {
          attachments?: Json | null
          client_id?: string
          created_at?: string | null
          customer_code?: string
          id?: number
          summary?: string | null
          tags?: string[] | null
          thread_count?: number | null
          week_end?: string | null
          week_label?: string | null
          week_start?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_communications_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_communications_customer_code_fkey"
            columns: ["customer_code"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["customer_code"]
          },
          {
            foreignKeyName: "fk_client_communications_customer_code"
            columns: ["customer_code"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["customer_code"]
          },
        ]
      }
      customer_extra: {
        Row: {
          created_at: string
          id: number
          trend_chart: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          trend_chart?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          trend_chart?: string | null
        }
        Relationships: []
      }
      customer_orders: {
        Row: {
          country: string | null
          customer_code: string | null
          customer_name: string | null
          customer_short_name: string | null
          id: string
          material: string | null
          order_amount: number | null
          order_month: string | null
          product_type: string | null
          sales_person: string | null
          type: string | null
        }
        Insert: {
          country?: string | null
          customer_code?: string | null
          customer_name?: string | null
          customer_short_name?: string | null
          id?: string
          material?: string | null
          order_amount?: number | null
          order_month?: string | null
          product_type?: string | null
          sales_person?: string | null
          type?: string | null
        }
        Update: {
          country?: string | null
          customer_code?: string | null
          customer_name?: string | null
          customer_short_name?: string | null
          id?: string
          material?: string | null
          order_amount?: number | null
          order_month?: string | null
          product_type?: string | null
          sales_person?: string | null
          type?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          ai_summary: string | null
          company: string
          created_at: string | null
          credit_level: string | null
          credit_limit: number | null
          credit_used: number | null
          customer_code: string
          email: string | null
          id: string
          industry: string | null
          last_order: string | null
          lifetime_value: number | null
          name: string
          next_meeting: string | null
          phone: string | null
          purchase_count: number | null
          region: string | null
          sales_rep: string | null
          score: number | null
          short_name: string | null
          status: number | null
          tags: string[] | null
        }
        Insert: {
          address?: string | null
          ai_summary?: string | null
          company?: string
          created_at?: string | null
          credit_level?: string | null
          credit_limit?: number | null
          credit_used?: number | null
          customer_code?: string
          email?: string | null
          id?: string
          industry?: string | null
          last_order?: string | null
          lifetime_value?: number | null
          name?: string
          next_meeting?: string | null
          phone?: string | null
          purchase_count?: number | null
          region?: string | null
          sales_rep?: string | null
          score?: number | null
          short_name?: string | null
          status?: number | null
          tags?: string[] | null
        }
        Update: {
          address?: string | null
          ai_summary?: string | null
          company?: string
          created_at?: string | null
          credit_level?: string | null
          credit_limit?: number | null
          credit_used?: number | null
          customer_code?: string
          email?: string | null
          id?: string
          industry?: string | null
          last_order?: string | null
          lifetime_value?: number | null
          name?: string
          next_meeting?: string | null
          phone?: string | null
          purchase_count?: number | null
          region?: string | null
          sales_rep?: string | null
          score?: number | null
          short_name?: string | null
          status?: number | null
          tags?: string[] | null
        }
        Relationships: []
      }
      email: {
        Row: {
          id: number
          thread_id: string
          parent_id: number | null
          customer_id: string
          direction: 'inbound' | 'outbound'
          sender: string
          sender_email: string
          receiver: string
          receiver_email: string
          subject: string | null
          content: string | null
          attachments: {
            name: string
            size: number
            type: string
            path: string
          }[]
          status: 'draft' | 'sent' | 'deleted'
          is_read: boolean
          read_at: string | null
          send_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          thread_id?: string
          parent_id?: number | null
          customer_id: string
          direction: 'inbound' | 'outbound'
          sender: string
          sender_email: string
          receiver: string
          receiver_email: string
          subject?: string | null
          content?: string | null
          attachments?: {
            name: string
            size: number
            type: string
            path: string
          }[]
          status?: 'draft' | 'sent' | 'deleted'
          is_read?: boolean
          read_at?: string | null
          send_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          thread_id?: string
          parent_id?: number | null
          customer_id?: string
          direction?: 'inbound' | 'outbound'
          sender?: string
          sender_email?: string
          receiver?: string
          receiver_email?: string
          subject?: string | null
          content?: string | null
          attachments?: {
            name: string
            size: number
            type: string
            path: string
          }[]
          status?: 'draft' | 'sent' | 'deleted'
          is_read?: boolean
          read_at?: string | null
          send_at?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "email"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string
          created_at: string | null
          customers: number | null
          growth: number | null
          id: string
          inventory: number | null
          margin: number | null
          name: string
          price: number
          profit: number | null
          sales: number | null
        }
        Insert: {
          category: string
          created_at?: string | null
          customers?: number | null
          growth?: number | null
          id?: string
          inventory?: number | null
          margin?: number | null
          name: string
          price: number
          profit?: number | null
          sales?: number | null
        }
        Update: {
          category?: string
          created_at?: string | null
          customers?: number | null
          growth?: number | null
          id?: string
          inventory?: number | null
          margin?: number | null
          name?: string
          price?: number
          profit?: number | null
          sales?: number | null
        }
        Relationships: []
      }
      sales_statistics: {
        Row: {
          completion_rate: number | null
          created_at: string
          customer_count: number | null
          id: string
          new_customer_count: number | null
          period_end: string
          period_start: string
          period_type: string
          target_amount: number | null
          total_amount: number
          total_orders: number
          updated_at: string
          ytd_sales: number | null
        }
        Insert: {
          completion_rate?: number | null
          created_at?: string
          customer_count?: number | null
          id?: string
          new_customer_count?: number | null
          period_end: string
          period_start: string
          period_type: string
          target_amount?: number | null
          total_amount?: number
          total_orders?: number
          updated_at?: string
          ytd_sales?: number | null
        }
        Update: {
          completion_rate?: number | null
          created_at?: string
          customer_count?: number | null
          id?: string
          new_customer_count?: number | null
          period_end?: string
          period_start?: string
          period_type?: string
          target_amount?: number | null
          total_amount?: number
          total_orders?: number
          updated_at?: string
          ytd_sales?: number | null
        }
        Relationships: []
      }
      tags: {
        Row: {
          color: string | null
          created_at: string | null
          created_by: string | null
          id: number
          object_id: string
          object_type: string
          updated_at: string | null
          value: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: number
          object_id: string
          object_type: string
          updated_at?: string | null
          value: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: number
          object_id?: string
          object_type?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      visit_records: {
        Row: {
          created_at: string | null
          device_info: Json | null
          id: string
          market: string | null
          path: string
          user_email: string | null
          visit_end_time: string | null
          visit_start_time: string | null
        }
        Insert: {
          created_at?: string | null
          device_info?: Json | null
          id?: string
          market?: string | null
          path: string
          user_email?: string | null
          visit_end_time?: string | null
          visit_start_time?: string | null
        }
        Update: {
          created_at?: string | null
          device_info?: Json | null
          id?: string
          market?: string | null
          path?: string
          user_email?: string | null
          visit_end_time?: string | null
          visit_start_time?: string | null
        }
        Relationships: []
      }
      tags: {
        Row: {
          id: number
          object_id: string
          object_type: string
          value: string
          color: string
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          object_id: string
          object_type: string
          value: string
          color?: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          object_id?: string
          object_type?: string
          value?: string
          color?: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_dashboard_statistics: {
        Args: Record<PropertyKey, never>
        Returns: {
          ytd_sales: number
          ytd_growth_rate: number
          weekly_new_orders: number
          weekly_growth_rate: number
          goal_completion_rate: number
          monthly_trend: Json
        }[]
      }
      get_device_distribution: {
        Args: Record<PropertyKey, never>
        Returns: {
          platform: string
          count: number
        }[]
      }
      get_market_distribution_unique_daily: {
        Args: Record<PropertyKey, never>
        Returns: {
          market: string
          count: number
        }[]
      }
      get_period_dates: {
        Args: { order_date: string }
        Returns: {
          period_type: string
          period_start: string
          period_end: string
        }[]
      }
      get_visit_metrics: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_visits: number
          unique_visitors: number
          avg_duration: number
        }[]
      }
      sync_customers_from_orders: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_sales_statistics: {
        Args: { p_year?: number; p_month?: number }
        Returns: undefined
      }
      get_customer_email_threads: {
        Args: { p_customer_id: string }
        Returns: {
          thread_id: string
          subject: string
          last_message_at: string
          message_count: number
          unread_count: number
          snippet: string
          tags: {
            id: number
            value: string
            color: string
          }[]
        }[]
      }
      get_email_thread: {
        Args: { p_thread_id: string }
        Returns: {
          id: number
          parent_id: number | null
          sender: string
          sender_email: string
          receiver: string
          receiver_email: string
          subject: string
          content: string
          attachments: {
            name: string
            size: number
            type: string
            path: string
          }[]
          tags: {
            id: number
            value: string
            color: string
          }[]
          send_at: string
          direction: 'inbound' | 'outbound'
          is_read: boolean
          level: number
        }[]
      }
      add_tag: {
        Args: {
          p_object_id: string
          p_object_type: string
          p_value: string
          p_color?: string
        }
        Returns: {
          id: number
          value: string
          color: string
        } | null
      }
      remove_tag: {
        Args: {
          p_object_id: string
          p_object_type: string
          p_value: string
        }
        Returns: boolean
      }
      get_object_tags: {
        Args: {
          p_object_id: string
          p_object_type: string
        }
        Returns: {
          id: number
          value: string
          color: string
          created_at: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
  ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
    DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
    DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
  ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
  ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | keyof DefaultSchema["Enums"]
  | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
  ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof DefaultSchema["CompositeTypes"]
  | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
  ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
