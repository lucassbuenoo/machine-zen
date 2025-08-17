import { Machine, Part, WorkOrder, MaintenanceSchedule, Employee } from "@/types";

export const mockMachines: Machine[] = [
  {
    id: 1,
    name: "Torno CNC-001",
    serialNumber: "CNC001-2023",
    manufacturer: "Haas Automation",
    acquisitionDate: "15/03/2023",
    status: "Ativa",
    location: "Linha A - Setor 1",
    lastMaintenance: "10/01/2024"
  },
  {
    id: 2,
    name: "Prensa Hidráulica HID-205",
    serialNumber: "HID205-2022",
    manufacturer: "Schuler AG",
    acquisitionDate: "22/11/2022",
    status: "Manutenção",
    location: "Linha B - Setor 2",
    lastMaintenance: "14/01/2024"
  },
  {
    id: 3,
    name: "Solda MIG-102",
    serialNumber: "MIG102-2023",
    manufacturer: "Miller Electric",
    acquisitionDate: "08/07/2023",
    status: "Ativa",
    location: "Linha C - Setor 1",
    lastMaintenance: "12/01/2024"
  },
  {
    id: 4,
    name: "Fresadora Universal FRE-304",
    serialNumber: "FRE304-2021",
    manufacturer: "DMG Mori",
    acquisitionDate: "13/09/2021",
    status: "Inativa",
    location: "Linha A - Setor 3",
    lastMaintenance: "05/01/2024"
  }
];

export const mockParts: Part[] = [
  {
    id: 1,
    name: "Filtro Hidráulico",
    code: "FH-001",
    category: "Filtros",
    quantity: 25,
    location: "Estoque A - Prateleira 1",
    supplier: "Parker Hannifin",
    unitPrice: 45.90,
    minimumStock: 10,
    status: "Em Estoque"
  },
  {
    id: 2,
    name: "Rolamento SKF 6205",
    code: "ROL-6205",
    category: "Rolamentos",
    quantity: 5,
    location: "Estoque B - Gaveta 3",
    supplier: "SKF do Brasil",
    unitPrice: 89.50,
    minimumStock: 8,
    status: "Baixo Estoque"
  },
  {
    id: 3,
    name: "Correia Dentada HTD",
    code: "CD-HTD-001",
    category: "Correias",
    quantity: 0,
    location: "Estoque A - Prateleira 5",
    supplier: "Gates Corporation",
    unitPrice: 125.00,
    minimumStock: 3,
    status: "Sem Estoque"
  },
  {
    id: 4,
    name: "Sensor de Proximidade",
    code: "SP-IFM-001",
    category: "Sensores",
    quantity: 12,
    location: "Estoque C - Gaveta 1",
    supplier: "IFM Electronic",
    unitPrice: 190.75,
    minimumStock: 5,
    status: "Em Estoque"
  }
];

export const mockWorkOrders: WorkOrder[] = [
  {
    id: 1,
    orderNumber: "OS-2024-001",
    machineId: 1,
    machineName: "Torno CNC-001",
    description: "Vibração excessiva durante operação",
    priority: "Alta",
    status: "Em Andamento",
    assignedTechnician: "João Silva",
    createdDate: "14/01/2024",
    estimatedTime: 4
  },
  {
    id: 2,
    orderNumber: "OS-2024-002",
    machineId: 2,
    machineName: "Prensa Hidráulica HID-205",
    description: "Vazamento no sistema hidráulico",
    priority: "Crítica",
    status: "Aberta",
    assignedTechnician: "Maria Santos",
    createdDate: "15/01/2024",
    estimatedTime: 6
  },
  {
    id: 3,
    orderNumber: "OS-2024-003",
    machineId: 3,
    machineName: "Solda MIG-102",
    description: "Calibração dos parâmetros de solda",
    priority: "Média",
    status: "Concluída",
    assignedTechnician: "Carlos Lima",
    createdDate: "12/01/2024",
    completedDate: "13/01/2024",
    estimatedTime: 2
  }
];

export const mockMaintenanceSchedule: MaintenanceSchedule[] = [
  {
    id: 1,
    machineId: 1,
    machineName: "Torno CNC-001",
    type: "Preventiva",
    scheduledDate: "20/01/2024",
    assignedTechnician: "João Silva",
    status: "Agendada",
    notes: "Troca de óleo e filtros"
  },
  {
    id: 2,
    machineId: 4,
    machineName: "Fresadora Universal FRE-304",
    type: "Corretiva",
    scheduledDate: "18/01/2024",
    assignedTechnician: "Maria Santos",
    status: "Em Andamento",
    notes: "Reparo do sistema de refrigeração"
  },
  {
    id: 3,
    machineId: 3,
    machineName: "Solda MIG-102",
    type: "Preventiva",
    scheduledDate: "25/01/2024",
    assignedTechnician: "Carlos Lima",
    status: "Agendada",
    notes: "Inspeção geral e limpeza"
  }
];

export const mockTechnicians = [
  "João Silva",
  "Maria Santos", 
  "Carlos Lima",
  "Ana Costa",
  "Pedro Oliveira"
];

export const mockSuppliers = [
  "Parker Hannifin",
  "SKF do Brasil",
  "Gates Corporation",
  "IFM Electronic",
  "Festo Brasil",
  "Siemens",
  "Schneider Electric"
];

export const mockCategories = [
  "Filtros",
  "Rolamentos",
  "Correias",
  "Sensores",
  "Motores",
  "Válvulas",
  "Componentes Elétricos",
  "Ferramentas"
];

export const mockDepartments = ["Manutenção", "Produção", "Qualidade", "Engenharia", "Administrativo", "Segurança do Trabalho"];
export const mockPositions = ["Técnico de Manutenção", "Operador de Máquina", "Supervisor", "Engenheiro", "Auxiliar", "Coordenador"];

export const mockEmployees: Employee[] = [
  {
    id: 1,
    name: "Carlos Silva",
    birthDate: "1985-03-15",
    department: "Manutenção",
    position: "Técnico de Manutenção",
    phone: "(11) 98765-4321",
    cpf: "12345678901",
    nif: "123456789",
    email: "carlos.silva@empresa.com",
    status: "Ativo",
    hireDate: "15/01/2020",
  },
  {
    id: 2,
    name: "Ana Santos",
    birthDate: "1990-07-22",
    department: "Manutenção",
    position: "Técnico de Manutenção",
    phone: "(11) 98765-4322",
    cpf: "12345678902",
    nif: "123456790",
    email: "ana.santos@empresa.com",
    status: "Ativo",
    hireDate: "10/05/2019",
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    birthDate: "1982-11-08",
    department: "Manutenção",
    position: "Supervisor",
    phone: "(11) 98765-4323",
    cpf: "12345678903",
    nif: "123456791",
    email: "pedro.oliveira@empresa.com",
    status: "Ativo",
    hireDate: "20/03/2018",
  },
  {
    id: 4,
    name: "Maria Costa",
    birthDate: "1988-05-12",
    department: "Produção",
    position: "Operador de Máquina",
    phone: "(11) 98765-4324",
    cpf: "12345678904",
    nif: "123456792",
    email: "maria.costa@empresa.com",
    status: "Férias",
    hireDate: "05/08/2021",
  },
  {
    id: 5,
    name: "João Ferreira",
    birthDate: "1975-12-03",
    department: "Engenharia",
    position: "Engenheiro",
    phone: "(11) 98765-4325",
    cpf: "12345678905",
    nif: "123456793",
    email: "joao.ferreira@empresa.com",
    status: "Ativo",
    hireDate: "12/11/2017",
  },
  {
    id: 6,
    name: "Lucia Fernandes",
    birthDate: "1992-09-18",
    department: "Qualidade",
    position: "Técnico de Qualidade",
    phone: "(11) 98765-4326",
    cpf: "12345678906",
    nif: "123456794",
    email: "lucia.fernandes@empresa.com",
    status: "Ativo",
    hireDate: "14/02/2022",
  },
];