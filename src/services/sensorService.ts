import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Sensor = Database['public']['Tables']['sensors']['Row'];
type InsertSensor = Database['public']['Tables']['sensors']['Insert'];
type UpdateSensor = Database['public']['Tables']['sensors']['Update'];
type SensorReading = Database['public']['Tables']['sensor_readings']['Row'];
type InsertSensorReading = Database['public']['Tables']['sensor_readings']['Insert'];

export const sensorService = {
  async getAll() {
    const { data, error } = await supabase
      .from('sensors')
      .select(`
        *,
        machines!inner(name, location)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('sensors')
      .select(`
        *,
        machines!inner(name, location, manufacturer, model)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(sensor: InsertSensor) {
    const { data, error } = await supabase
      .from('sensors')
      .insert(sensor)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, sensor: UpdateSensor) {
    const { data, error } = await supabase
      .from('sensors')
      .update(sensor)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('sensors')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getByMachine(machineId: string) {
    const { data, error } = await supabase
      .from('sensors')
      .select('*')
      .eq('machine_id', machineId)
      .order('name');
    
    if (error) throw error;
    return data;
  },

  async getReadingsById(sensorId: string, limit: number = 100) {
    const { data, error } = await supabase
      .from('sensor_readings')
      .select('*')
      .eq('sensor_id', sensorId)
      .order('timestamp', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  },

  async addReading(reading: InsertSensorReading) {
    const { data, error } = await supabase
      .from('sensor_readings')
      .insert(reading)
      .select()
      .single();
    
    if (error) throw error;
    
    // Update sensor's current value and last reading time
    await this.updateCurrentValue(reading.sensor_id, reading.value);
    
    return data;
  },

  async updateCurrentValue(sensorId: string, value: number) {
    const { error } = await supabase
      .from('sensors')
      .update({
        current_value: value,
        last_reading: new Date().toISOString()
      })
      .eq('id', sensorId);
    
    if (error) throw error;
  },

  async getAlertsTriggered() {
    const { data, error } = await supabase
      .from('sensor_readings')
      .select(`
        *,
        sensors!inner(
          name,
          sensor_code,
          machines!inner(name, location)
        )
      `)
      .eq('alert_triggered', true)
      .order('timestamp', { ascending: false })
      .limit(50);
    
    if (error) throw error;
    return data;
  },

  async getLatestReadings() {
    const { data, error } = await supabase
      .from('sensor_readings')
      .select(`
        *,
        sensors!inner(
          id,
          name,
          sensor_code,
          unit,
          min_threshold,
          max_threshold,
          machines!inner(name, location)
        )
      `)
      .order('timestamp', { ascending: false })
      .limit(20);
    
    if (error) throw error;
    return data;
  }
};