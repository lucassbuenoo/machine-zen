import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Part = Database['public']['Tables']['parts']['Row'];
type InsertPart = Database['public']['Tables']['parts']['Insert'];
type UpdatePart = Database['public']['Tables']['parts']['Update'];

export const partService = {
  async getAll() {
    const { data, error } = await supabase
      .from('parts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('parts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(part: InsertPart) {
    const { data, error } = await supabase
      .from('parts')
      .insert(part)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, part: UpdatePart) {
    const { data, error } = await supabase
      .from('parts')
      .update(part)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('parts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getLowStock() {
    const { data, error } = await supabase
      .from('parts')
      .select('*')
      .or('status.eq.low_stock,quantity.lte.min_stock')
      .order('quantity', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('parts')
      .select('*')
      .eq('category', category)
      .order('name');
    
    if (error) throw error;
    return data;
  },

  async updateStock(id: string, quantity: number) {
    const { data, error } = await supabase
      .from('parts')
      .update({ 
        quantity,
        status: quantity <= 0 ? 'out_of_stock' : 'in_stock'
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};