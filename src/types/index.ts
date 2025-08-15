// Core types for the maintenance system

export interface Machine {
  id: number;
  name: string;
  serialNumber: string;
  manufacturer: string;
  acquisitionDate: string;
  status: MachineStatus;
  location: string;
  description?: string;
  lastMaintenance?: string;
}

export interface Part {
  id: number;
  name: string;
  code: string;
  category: string;
  quantity: number;
  location: string;
  supplier: string;
  unitPrice: number;
  minimumStock: number;
  status: PartStatus;
}

export interface WorkOrder {
  id: number;
  orderNumber: string;
  machineId: number;
  machineName: string;
  description: string;
  priority: Priority;
  status: WorkOrderStatus;
  assignedTechnician: string;
  createdDate: string;
  completedDate?: string;
  estimatedTime?: number;
}

export interface MaintenanceSchedule {
  id: number;
  machineId: number;
  machineName: string;
  type: MaintenanceType;
  scheduledDate: string;
  assignedTechnician: string;
  status: MaintenanceStatus;
  notes?: string;
  completedDate?: string;
}

export interface Report {
  id: number;
  title: string;
  type: ReportType;
  description: string;
  dateRange: {
    start: string;
    end: string;
  };
  data: any;
}

// Enums
export type MachineStatus = "Ativa" | "Manutenção" | "Inativa" | "Crítica";
export type PartStatus = "Em Estoque" | "Baixo Estoque" | "Sem Estoque";
export type Priority = "Baixa" | "Média" | "Alta" | "Crítica";
export type WorkOrderStatus = "Aberta" | "Em Andamento" | "Concluída" | "Cancelada";
export type MaintenanceType = "Preventiva" | "Corretiva" | "Preditiva";
export type MaintenanceStatus = "Agendada" | "Em Andamento" | "Concluída" | "Cancelada";
export type ReportType = "maintenance" | "costs" | "parts" | "downtime";

export interface NewMachineForm {
  name: string;
  serialNumber: string;
  manufacturer: string;
  acquisitionDate: string;
  location: string;
  description: string;
}

export interface NewPartForm {
  name: string;
  code: string;
  category: string;
  quantity: number;
  location: string;
  supplier: string;
  unitPrice: number;
  minimumStock: number;
}

export interface NewWorkOrderForm {
  machineId: number;
  description: string;
  priority: Priority;
  assignedTechnician: string;
}

export interface NewMaintenanceForm {
  machineId: number;
  type: MaintenanceType;
  scheduledDate: string;
  assignedTechnician: string;
  notes: string;
}