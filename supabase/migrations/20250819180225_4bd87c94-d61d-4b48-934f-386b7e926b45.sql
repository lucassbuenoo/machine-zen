-- SGMI - Sistema de Gestão e Manutenção Industrial
-- Criação completa do banco de dados

-- Criar enums para status e tipos
CREATE TYPE machine_status AS ENUM ('operational', 'maintenance', 'stopped', 'broken');
CREATE TYPE part_status AS ENUM ('in_stock', 'low_stock', 'out_of_stock', 'discontinued');
CREATE TYPE work_order_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');
CREATE TYPE work_order_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE maintenance_type AS ENUM ('preventive', 'corrective', 'predictive', 'emergency');
CREATE TYPE employee_status AS ENUM ('active', 'inactive', 'vacation', 'terminated');
CREATE TYPE sensor_type AS ENUM ('temperature', 'pressure', 'vibration', 'flow', 'level', 'speed');
CREATE TYPE sensor_status AS ENUM ('active', 'inactive', 'error', 'calibration');

-- Tabela de perfis de usuário (conectada ao auth.users)
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'operator',
  department TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de Máquinas
CREATE TABLE public.machines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  serial_number TEXT UNIQUE NOT NULL,
  model TEXT,
  manufacturer TEXT,
  status machine_status NOT NULL DEFAULT 'operational',
  location TEXT NOT NULL,
  installation_date DATE,
  last_maintenance_date TIMESTAMP WITH TIME ZONE,
  next_maintenance_date TIMESTAMP WITH TIME ZONE,
  specifications JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de Peças
CREATE TABLE public.parts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  min_stock INTEGER NOT NULL DEFAULT 0,
  max_stock INTEGER,
  unit_price DECIMAL(10,2),
  supplier TEXT,
  location TEXT,
  status part_status NOT NULL DEFAULT 'in_stock',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de Funcionários
CREATE TABLE public.employees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  employee_code TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  position TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  hire_date DATE NOT NULL,
  status employee_status NOT NULL DEFAULT 'active',
  skills TEXT[],
  certifications TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de Ordens de Serviço
CREATE TABLE public.work_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  machine_id UUID NOT NULL REFERENCES public.machines(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES public.employees(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority work_order_priority NOT NULL DEFAULT 'medium',
  status work_order_status NOT NULL DEFAULT 'pending',
  maintenance_type maintenance_type NOT NULL,
  estimated_hours DECIMAL(5,2),
  actual_hours DECIMAL(5,2),
  scheduled_date TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_by UUID REFERENCES public.profiles(user_id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de Sensores
CREATE TABLE public.sensors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sensor_code TEXT UNIQUE NOT NULL,
  machine_id UUID NOT NULL REFERENCES public.machines(id) ON DELETE CASCADE,
  type sensor_type NOT NULL,
  status sensor_status NOT NULL DEFAULT 'active',
  current_value DECIMAL(10,4),
  unit TEXT,
  min_threshold DECIMAL(10,4),
  max_threshold DECIMAL(10,4),
  last_reading TIMESTAMP WITH TIME ZONE,
  calibration_date DATE,
  location_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de Peças utilizadas em Ordens de Serviço
CREATE TABLE public.work_order_parts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  work_order_id UUID NOT NULL REFERENCES public.work_orders(id) ON DELETE CASCADE,
  part_id UUID NOT NULL REFERENCES public.parts(id) ON DELETE CASCADE,
  quantity_used INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de Leituras de Sensores (histórico)
CREATE TABLE public.sensor_readings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sensor_id UUID NOT NULL REFERENCES public.sensors(id) ON DELETE CASCADE,
  value DECIMAL(10,4) NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  alert_triggered BOOLEAN DEFAULT false,
  notes TEXT
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.machines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sensors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_order_parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sensor_readings ENABLE ROW LEVEL SECURITY;

-- Políticas RLS básicas (usuários autenticados podem acessar dados)
CREATE POLICY "Users can view profiles" ON public.profiles FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view machines" ON public.machines FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can modify machines" ON public.machines FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view parts" ON public.parts FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can modify parts" ON public.parts FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view employees" ON public.employees FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can modify employees" ON public.employees FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view work_orders" ON public.work_orders FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can modify work_orders" ON public.work_orders FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view sensors" ON public.sensors FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can modify sensors" ON public.sensors FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view work_order_parts" ON public.work_order_parts FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can modify work_order_parts" ON public.work_order_parts FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view sensor_readings" ON public.sensor_readings FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can insert sensor_readings" ON public.sensor_readings FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_machines_updated_at BEFORE UPDATE ON public.machines FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_parts_updated_at BEFORE UPDATE ON public.parts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON public.employees FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_work_orders_updated_at BEFORE UPDATE ON public.work_orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sensors_updated_at BEFORE UPDATE ON public.sensors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Função para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email), 'operator');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Índices para melhor performance
CREATE INDEX idx_machines_status ON public.machines(status);
CREATE INDEX idx_machines_location ON public.machines(location);
CREATE INDEX idx_parts_status ON public.parts(status);
CREATE INDEX idx_parts_category ON public.parts(category);
CREATE INDEX idx_work_orders_status ON public.work_orders(status);
CREATE INDEX idx_work_orders_priority ON public.work_orders(priority);
CREATE INDEX idx_work_orders_machine_id ON public.work_orders(machine_id);
CREATE INDEX idx_sensors_machine_id ON public.sensors(machine_id);
CREATE INDEX idx_sensors_status ON public.sensors(status);
CREATE INDEX idx_sensor_readings_sensor_id ON public.sensor_readings(sensor_id);
CREATE INDEX idx_sensor_readings_timestamp ON public.sensor_readings(timestamp);