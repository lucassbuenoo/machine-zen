-- Insert sample employees
INSERT INTO public.employees (name, employee_code, department, position, email, phone, skills, certifications, hire_date, status) VALUES
('João Silva', 'EMP001', 'Manutenção', 'Técnico Senior', 'joao.silva@sgmi.com', '(11) 99999-0001', ARRAY['Soldagem', 'Elétrica', 'Hidráulica'], ARRAY['NR-10', 'NR-33'], '2020-01-15', 'active'),
('Maria Santos', 'EMP002', 'Operação', 'Operadora', 'maria.santos@sgmi.com', '(11) 99999-0002', ARRAY['CNC', 'Torno'], ARRAY['ISO 9001'], '2021-03-20', 'active'),
('Pedro Costa', 'EMP003', 'Qualidade', 'Inspetor', 'pedro.costa@sgmi.com', '(11) 99999-0003', ARRAY['Metrologia', 'Análise'], ARRAY['NR-12'], '2019-07-10', 'active'),
('Ana Oliveira', 'EMP004', 'Manutenção', 'Técnica Júnior', 'ana.oliveira@sgmi.com', '(11) 99999-0004', ARRAY['Mecânica', 'Pneumática'], ARRAY['NR-10'], '2022-05-18', 'active'),
('Carlos Ferreira', 'EMP005', 'Engenharia', 'Engenheiro', 'carlos.ferreira@sgmi.com', '(11) 99999-0005', ARRAY['AutoCAD', 'Projetos'], ARRAY['CREA'], '2018-11-03', 'active'),
('Lucia Pereira', 'EMP006', 'Operação', 'Supervisora', 'lucia.pereira@sgmi.com', '(11) 99999-0006', ARRAY['Liderança', 'Processos'], ARRAY['Green Belt'], '2017-02-14', 'active'),
('Roberto Lima', 'EMP007', 'Manutenção', 'Eletricista', 'roberto.lima@sgmi.com', '(11) 99999-0007', ARRAY['Elétrica Industrial', 'Automação'], ARRAY['NR-10', 'NR-12'], '2020-09-25', 'active'),
('Patricia Alves', 'EMP008', 'Qualidade', 'Analista', 'patricia.alves@sgmi.com', '(11) 99999-0008', ARRAY['Estatística', 'Controle'], ARRAY['Six Sigma'], '2021-12-07', 'active'),
('Fernando Rosa', 'EMP009', 'Operação', 'Operador', 'fernando.rosa@sgmi.com', '(11) 99999-0009', ARRAY['Fresadora', 'Furadeira'], ARRAY['NR-12'], '2023-01-30', 'active'),
('Sandra Martins', 'EMP010', 'Engenharia', 'Engenheira', 'sandra.martins@sgmi.com', '(11) 99999-0010', ARRAY['PCP', 'Lean'], ARRAY['CREA', 'PMP'], '2019-04-12', 'active');

-- Insert sample machines
INSERT INTO public.machines (name, serial_number, manufacturer, model, location, installation_date, status, specifications) VALUES
('Torno CNC 001', 'TNC001-2020', 'ROMI', 'GL240M', 'Setor A - Linha 1', '2020-03-15', 'operational', '{"potencia": "15kW", "rotacao_max": "4000rpm", "diametro_max": "240mm"}'),
('Fresadora Universal', 'FRU002-2019', 'IMOR', 'FU-1500', 'Setor B - Linha 2', '2019-08-22', 'operational', '{"potencia": "12kW", "curso_x": "1500mm", "curso_y": "800mm"}'),
('Prensa Hidráulica', 'PRH003-2021', 'ENERPAC', 'PH-500', 'Setor C - Estamparia', '2021-01-10', 'operational', '{"forca_max": "500ton", "pressao": "700bar", "abertura": "1200mm"}'),
('Centro Usinagem', 'CUS004-2022', 'HERMLE', 'C400U', 'Setor A - Linha 3', '2022-06-30', 'operational', '{"eixos": "5", "rotacao": "18000rpm", "trocador": "40_ferramentas"}'),
('Solda MIG/MAG', 'SOL005-2020', 'ESAB', 'Warrior 500i', 'Setor D - Soldagem', '2020-11-05', 'maintenance', '{"corrente_max": "500A", "tensao": "380V", "tipo": "sinergica"}'),
('Compressor Ar', 'COM006-2018', 'SCHULZ', 'SRP-4030', 'Área Externa', '2018-05-14', 'operational', '{"pressao_max": "10bar", "vazao": "1200l/min", "motor": "30HP"}'),
('Ponte Rolante', 'PON007-2017', 'MUNCK', 'PR-10T', 'Galpão Principal', '2017-12-08', 'operational', '{"capacidade": "10ton", "vao": "20m", "altura": "8m"}'),
('Guilhotina', 'GUI008-2019', 'SANSONI', 'GH-3000', 'Setor E - Corte', '2019-10-18', 'maintenance', '{"comprimento": "3000mm", "espessura_max": "10mm", "tipo": "hidraulica"}'),
('Torno Revólver', 'TRE009-2021', 'NARDINI', 'ND250E', 'Setor A - Linha 2', '2021-04-25', 'operational', '{"diametro": "250mm", "comprimento": "1000mm", "rotacao": "3500rpm"}'),
('Retificadora', 'RET010-2020', 'SULMECÂNICA', 'RAPH-1000', 'Setor F - Acabamento', '2020-07-12', 'operational', '{"diametro_max": "400mm", "comprimento": "1000mm", "precisao": "0.001mm"}');

-- Insert sample parts
INSERT INTO public.parts (name, code, category, description, quantity, min_stock, max_stock, unit_price, supplier, location, status) VALUES
('Rolamento 6206', 'ROL-6206-001', 'Rolamentos', 'Rolamento rígido de esferas 30x62x16mm', 25, 10, 50, 45.80, 'SKF do Brasil', 'Estoque A-01', 'in_stock'),
('Correia V A-50', 'COR-VA50-002', 'Correias', 'Correia em V seção A comprimento 50 polegadas', 15, 5, 30, 28.90, 'Gates Brasil', 'Estoque B-02', 'in_stock'),
('Óleo Hidráulico ISO 68', 'OLE-ISO68-003', 'Lubrificantes', 'Óleo hidráulico ISO VG 68 - 20 litros', 8, 3, 15, 185.00, 'Shell Brasil', 'Estoque C-03', 'low_stock'),
('Filtro de Ar Comprimido', 'FIL-AR-004', 'Filtros', 'Filtro coalescente 1/2 polegada 40 micras', 12, 8, 25, 95.50, 'Parker Hannifin', 'Estoque D-04', 'in_stock'),
('Vedação O-Ring 50x3', 'VED-OR50-005', 'Vedações', 'O-Ring NBR 70 Shore A 50x3mm', 100, 20, 200, 3.25, 'Freudenberg', 'Estoque E-05', 'in_stock'),
('Parafuso M12x40 DIN912', 'PAR-M12-006', 'Parafusos', 'Parafuso sextavado interno M12x40mm classe 8.8', 150, 50, 300, 2.15, 'Ciser Parafusos', 'Estoque F-06', 'in_stock'),
('Sensor Indutivo M18', 'SEN-IND18-007', 'Sensores', 'Sensor indutivo M18 PNP NA 10-30VDC', 6, 3, 15, 125.00, 'Balluff Brasil', 'Estoque G-07', 'in_stock'),
('Cabo Flexível 4x2,5mm', 'CAB-4X25-008', 'Cabos', 'Cabo flexível 4x2,5mm² 750V por metro', 500, 100, 1000, 8.75, 'Prysmian Brasil', 'Estoque H-08', 'in_stock'),
('Graxa Multiuso', 'GRA-MULTI-009', 'Lubrificantes', 'Graxa de lítio multiuso NLGI 2 - 1kg', 20, 10, 40, 35.60, 'Mobil Brasil', 'Estoque I-09', 'in_stock'),
('Mangueira Hidráulica 1/2', 'MAN-HID12-010', 'Mangueiras', 'Mangueira hidráulica 1/2 polegada SAE 100R2AT', 50, 25, 100, 12.80, 'Manuli Hydraulics', 'Estoque J-10', 'in_stock');

-- Insert sample work orders (we'll need machine IDs and employee IDs)
INSERT INTO public.work_orders (order_number, title, description, machine_id, maintenance_type, priority, status, estimated_hours, scheduled_date, assigned_to, created_by) 
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
    NOW() + (INTERVAL '1 day' * ((ROW_NUMBER() OVER()) % 30)),
    (SELECT id FROM employees ORDER BY RANDOM() LIMIT 1),
    (SELECT id FROM employees ORDER BY RANDOM() LIMIT 1)
FROM (SELECT id, name FROM machines LIMIT 10) m;

-- Insert sample sensors (we'll need machine IDs)
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
        ('flow'::sensor_type, 'Fluxo', 'l/min', 0, 1000),
        ('current'::sensor_type, 'Corrente', 'A', 0, 500)
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