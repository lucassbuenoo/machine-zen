import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Employee = Database['public']['Tables']['employees']['Row'];
type InsertEmployee = Database['public']['Tables']['employees']['Insert'];
type UpdateEmployee = Database['public']['Tables']['employees']['Update'];

export const employeeService = {
  async getAll() {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(employee: InsertEmployee) {
    const { data, error } = await supabase
      .from('employees')
      .insert(employee)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, employee: UpdateEmployee) {
    const { data, error } = await supabase
      .from('employees')
      .update(employee)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('employees')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getByDepartment(department: string) {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('department', department)
      .order('name');
    
    if (error) throw error;
    return data;
  }
};