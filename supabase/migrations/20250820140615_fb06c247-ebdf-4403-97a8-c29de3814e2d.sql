-- Insert sample work orders without foreign key issues
INSERT INTO public.work_orders (order_number, title, description, machine_id, maintenance_type, priority, status, estimated_hours, scheduled_date) 
SELECT 
    'WO-' || LPAD((ROW_NUMBER() OVER())::text, 4, '0'),
    'Manutenção ' || m.name,
    'Manutenção preventiva programada para ' || m.name,
    m.id,
    CASE (ROW_NUMBER() OVER()) % 3 
        WHEN 0 THEN 'preventive'::maintenance_type
        WHEN 1 THEN 'corrective'::maintenance_type
        ELSE 'predictive'::maintenance_type
    END,
    CASE (ROW_NUMBER() OVER()) % 3 
        WHEN 0 THEN 'high'::work_order_priority
        WHEN 1 THEN 'medium'::work_order_priority
        ELSE 'low'::work_order_priority
    END,
    CASE (ROW_NUMBER() OVER()) % 4 
        WHEN 0 THEN 'pending'::work_order_status
        WHEN 1 THEN 'in_progress'::work_order_status
        WHEN 2 THEN 'completed'::work_order_status
        ELSE 'cancelled'::work_order_status
    END,
    4.0 + (ROW_NUMBER() OVER()) % 8,
    NOW() + (INTERVAL '1 day' * ((ROW_NUMBER() OVER()) % 30))
FROM (SELECT id, name FROM machines LIMIT 10) m;

-- Insert sample sensors with correct enum values
INSERT INTO public.sensors (name, sensor_code, type, machine_id, unit, min_threshold, max_threshold, current_value, location_description, status, calibration_date)
SELECT 
    'Sensor ' || s.type_name || ' - ' || m.name,
    'SEN-' || UPPER(LEFT(s.type_name, 3)) || '-' || LPAD((ROW_NUMBER() OVER())::text, 3, '0'),
    s.sensor_type,
    m.id,
    s.unit,
    s.min_val,
    s.max_val,
    s.min_val + (s.max_val - s.min_val) * 0.5,
    'Instalado em ' || m.location,
    'active'::sensor_status,
    CURRENT_DATE - (INTERVAL '1 month' * ((ROW_NUMBER() OVER()) % 12))
FROM machines m
CROSS JOIN (
    VALUES 
        ('temperature'::sensor_type, 'Temperatura', '°C', 0, 150),
        ('pressure'::sensor_type, 'Pressão', 'bar', 0, 20),
        ('vibration'::sensor_type, 'Vibração', 'mm/s', 0, 50),
        ('flow'::sensor_type, 'Fluxo', 'l/min', 0, 1000)
) s(sensor_type, type_name, unit, min_val, max_val)
LIMIT 10;

-- Insert sample sensor readings
INSERT INTO public.sensor_readings (sensor_id, value, alert_triggered, notes)
SELECT 
    s.id,
    s.min_threshold + (s.max_threshold - s.min_threshold) * (0.3 + RANDOM() * 0.4),
    CASE WHEN RANDOM() > 0.9 THEN true ELSE false END,
    CASE WHEN RANDOM() > 0.8 THEN 'Leitura automática' ELSE NULL END
FROM sensors s
CROSS JOIN generate_series(1, 2)
LIMIT 20;

-- Insert sample work order parts relationships
INSERT INTO public.work_order_parts (work_order_id, part_id, quantity_used)
SELECT 
    w.id,
    p.id,
    1 + (RANDOM() * 5)::integer
FROM (SELECT id FROM work_orders ORDER BY RANDOM() LIMIT 5) w
CROSS JOIN (SELECT id FROM parts ORDER BY RANDOM() LIMIT 2) p;