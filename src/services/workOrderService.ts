import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type WorkOrder = Database['public']['Tables']['work_orders']['Row'];
type InsertWorkOrder = Database['public']['Tables']['work_orders']['Insert'];
type UpdateWorkOrder = Database['public']['Tables']['work_orders']['Update'];

export const workOrderService = {
  async getAll() {
    const { data, error } = await supabase
      .from('work_orders')
      .select(`
        *,
        machines!inner(name, location),
        work_order_parts(
          *,
          parts(name, code)
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('work_orders')
      .select(`
        *,
        machines!inner(name, location, manufacturer, model),
        work_order_parts(
          *,
          parts(name, code, unit_price)
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(workOrder: InsertWorkOrder) {
    const { data, error } = await supabase
      .from('work_orders')
      .insert(workOrder)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, workOrder: UpdateWorkOrder) {
    const { data, error } = await supabase
      .from('work_orders')
      .update(workOrder)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('work_orders')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getByStatus(status: 'pending' | 'in_progress' | 'completed' | 'cancelled') {
    const { data, error } = await supabase
      .from('work_orders')
      .select(`
        *,
        machines!inner(name, location)
      `)
      .eq('status', status)
      .order('scheduled_date', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async getPending() {
    const { data, error } = await supabase
      .from('work_orders')
      .select(`
        *,
        machines!inner(name, location)
      `)
      .eq('status', 'pending')
      .order('priority', { ascending: false })
      .order('scheduled_date', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async addPart(workOrderId: string, partId: string, quantityUsed: number) {
    const { data, error } = await supabase
      .from('work_order_parts')
      .insert({
        work_order_id: workOrderId,
        part_id: partId,
        quantity_used: quantityUsed
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async removePart(workOrderId: string, partId: string) {
    const { error } = await supabase
      .from('work_order_parts')
      .delete()
      .eq('work_order_id', workOrderId)
      .eq('part_id', partId);
    
    if (error) throw error;
  }
};