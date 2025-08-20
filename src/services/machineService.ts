import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Machine = Database['public']['Tables']['machines']['Row'];
type InsertMachine = Database['public']['Tables']['machines']['Insert'];
type UpdateMachine = Database['public']['Tables']['machines']['Update'];

export const machineService = {
  async getAll() {
    const { data, error } = await supabase
      .from('machines')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('machines')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(machine: InsertMachine) {
    const { data, error } = await supabase
      .from('machines')
      .insert(machine)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, machine: UpdateMachine) {
    const { data, error } = await supabase
      .from('machines')
      .update(machine)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('machines')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getByStatus(status: 'operational' | 'maintenance' | 'stopped' | 'broken') {
    const { data, error } = await supabase
      .from('machines')
      .select('*')
      .eq('status', status)
      .order('name');
    
    if (error) throw error;
    return data;
  },

  async getWithSensors() {
    const { data, error } = await supabase
      .from('machines')
      .select(`
        *,
        sensors (*)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};