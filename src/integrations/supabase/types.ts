export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      employees: {
        Row: {
          certifications: string[] | null
          created_at: string
          department: string
          email: string
          employee_code: string
          hire_date: string
          id: string
          name: string
          phone: string | null
          position: string
          skills: string[] | null
          status: Database["public"]["Enums"]["employee_status"]
          updated_at: string
        }
        Insert: {
          certifications?: string[] | null
          created_at?: string
          department: string
          email: string
          employee_code: string
          hire_date: string
          id?: string
          name: string
          phone?: string | null
          position: string
          skills?: string[] | null
          status?: Database["public"]["Enums"]["employee_status"]
          updated_at?: string
        }
        Update: {
          certifications?: string[] | null
          created_at?: string
          department?: string
          email?: string
          employee_code?: string
          hire_date?: string
          id?: string
          name?: string
          phone?: string | null
          position?: string
          skills?: string[] | null
          status?: Database["public"]["Enums"]["employee_status"]
          updated_at?: string
        }
        Relationships: []
      }
      machines: {
        Row: {
          created_at: string
          id: string
          installation_date: string | null
          last_maintenance_date: string | null
          location: string
          manufacturer: string | null
          model: string | null
          name: string
          next_maintenance_date: string | null
          serial_number: string
          specifications: Json | null
          status: Database["public"]["Enums"]["machine_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          installation_date?: string | null
          last_maintenance_date?: string | null
          location: string
          manufacturer?: string | null
          model?: string | null
          name: string
          next_maintenance_date?: string | null
          serial_number: string
          specifications?: Json | null
          status?: Database["public"]["Enums"]["machine_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          installation_date?: string | null
          last_maintenance_date?: string | null
          location?: string
          manufacturer?: string | null
          model?: string | null
          name?: string
          next_maintenance_date?: string | null
          serial_number?: string
          specifications?: Json | null
          status?: Database["public"]["Enums"]["machine_status"]
          updated_at?: string
        }
        Relationships: []
      }
      parts: {
        Row: {
          category: string
          code: string
          created_at: string
          description: string | null
          id: string
          location: string | null
          max_stock: number | null
          min_stock: number
          name: string
          quantity: number
          status: Database["public"]["Enums"]["part_status"]
          supplier: string | null
          unit_price: number | null
          updated_at: string
        }
        Insert: {
          category: string
          code: string
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          max_stock?: number | null
          min_stock?: number
          name: string
          quantity?: number
          status?: Database["public"]["Enums"]["part_status"]
          supplier?: string | null
          unit_price?: number | null
          updated_at?: string
        }
        Update: {
          category?: string
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          max_stock?: number | null
          min_stock?: number
          name?: string
          quantity?: number
          status?: Database["public"]["Enums"]["part_status"]
          supplier?: string | null
          unit_price?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          department: string | null
          full_name: string
          id: string
          phone: string | null
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          full_name: string
          id?: string
          phone?: string | null
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sensor_readings: {
        Row: {
          alert_triggered: boolean | null
          id: string
          notes: string | null
          sensor_id: string
          timestamp: string
          value: number
        }
        Insert: {
          alert_triggered?: boolean | null
          id?: string
          notes?: string | null
          sensor_id: string
          timestamp?: string
          value: number
        }
        Update: {
          alert_triggered?: boolean | null
          id?: string
          notes?: string | null
          sensor_id?: string
          timestamp?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "sensor_readings_sensor_id_fkey"
            columns: ["sensor_id"]
            isOneToOne: false
            referencedRelation: "sensors"
            referencedColumns: ["id"]
          },
        ]
      }
      sensors: {
        Row: {
          calibration_date: string | null
          created_at: string
          current_value: number | null
          id: string
          last_reading: string | null
          location_description: string | null
          machine_id: string
          max_threshold: number | null
          min_threshold: number | null
          name: string
          sensor_code: string
          status: Database["public"]["Enums"]["sensor_status"]
          type: Database["public"]["Enums"]["sensor_type"]
          unit: string | null
          updated_at: string
        }
        Insert: {
          calibration_date?: string | null
          created_at?: string
          current_value?: number | null
          id?: string
          last_reading?: string | null
          location_description?: string | null
          machine_id: string
          max_threshold?: number | null
          min_threshold?: number | null
          name: string
          sensor_code: string
          status?: Database["public"]["Enums"]["sensor_status"]
          type: Database["public"]["Enums"]["sensor_type"]
          unit?: string | null
          updated_at?: string
        }
        Update: {
          calibration_date?: string | null
          created_at?: string
          current_value?: number | null
          id?: string
          last_reading?: string | null
          location_description?: string | null
          machine_id?: string
          max_threshold?: number | null
          min_threshold?: number | null
          name?: string
          sensor_code?: string
          status?: Database["public"]["Enums"]["sensor_status"]
          type?: Database["public"]["Enums"]["sensor_type"]
          unit?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sensors_machine_id_fkey"
            columns: ["machine_id"]
            isOneToOne: false
            referencedRelation: "machines"
            referencedColumns: ["id"]
          },
        ]
      }
      work_order_parts: {
        Row: {
          created_at: string
          id: string
          part_id: string
          quantity_used: number
          work_order_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          part_id: string
          quantity_used: number
          work_order_id: string
        }
        Update: {
          created_at?: string
          id?: string
          part_id?: string
          quantity_used?: number
          work_order_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_order_parts_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "parts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_order_parts_work_order_id_fkey"
            columns: ["work_order_id"]
            isOneToOne: false
            referencedRelation: "work_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      work_orders: {
        Row: {
          actual_hours: number | null
          assigned_to: string | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          description: string
          estimated_hours: number | null
          id: string
          machine_id: string
          maintenance_type: Database["public"]["Enums"]["maintenance_type"]
          notes: string | null
          order_number: string
          priority: Database["public"]["Enums"]["work_order_priority"]
          scheduled_date: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["work_order_status"]
          title: string
          updated_at: string
        }
        Insert: {
          actual_hours?: number | null
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          description: string
          estimated_hours?: number | null
          id?: string
          machine_id: string
          maintenance_type: Database["public"]["Enums"]["maintenance_type"]
          notes?: string | null
          order_number: string
          priority?: Database["public"]["Enums"]["work_order_priority"]
          scheduled_date?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["work_order_status"]
          title: string
          updated_at?: string
        }
        Update: {
          actual_hours?: number | null
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          estimated_hours?: number | null
          id?: string
          machine_id?: string
          maintenance_type?: Database["public"]["Enums"]["maintenance_type"]
          notes?: string | null
          order_number?: string
          priority?: Database["public"]["Enums"]["work_order_priority"]
          scheduled_date?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["work_order_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_orders_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "work_orders_machine_id_fkey"
            columns: ["machine_id"]
            isOneToOne: false
            referencedRelation: "machines"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      employee_status: "active" | "inactive" | "vacation" | "terminated"
      machine_status: "operational" | "maintenance" | "stopped" | "broken"
      maintenance_type: "preventive" | "corrective" | "predictive" | "emergency"
      part_status: "in_stock" | "low_stock" | "out_of_stock" | "discontinued"
      sensor_status: "active" | "inactive" | "error" | "calibration"
      sensor_type:
        | "temperature"
        | "pressure"
        | "vibration"
        | "flow"
        | "level"
        | "speed"
      work_order_priority: "low" | "medium" | "high" | "critical"
      work_order_status: "pending" | "in_progress" | "completed" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      employee_status: ["active", "inactive", "vacation", "terminated"],
      machine_status: ["operational", "maintenance", "stopped", "broken"],
      maintenance_type: ["preventive", "corrective", "predictive", "emergency"],
      part_status: ["in_stock", "low_stock", "out_of_stock", "discontinued"],
      sensor_status: ["active", "inactive", "error", "calibration"],
      sensor_type: [
        "temperature",
        "pressure",
        "vibration",
        "flow",
        "level",
        "speed",
      ],
      work_order_priority: ["low", "medium", "high", "critical"],
      work_order_status: ["pending", "in_progress", "completed", "cancelled"],
    },
  },
} as const
