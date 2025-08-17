import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { MetricCard } from "@/components/cards/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NewMachineModal } from "@/components/modals/NewMachineModal";
import { NewPartModal } from "@/components/modals/NewPartModal";
import { NewMaintenanceModal } from "@/components/modals/NewMaintenanceModal";
import { 
  Cog, 
  Wrench, 
  Package, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock
} from "lucide-react";

const metrics = [
  {
    title: "Máquinas Ativas",
    value: 45,
    icon: <Cog className="w-6 h-6" />,
    trend: { value: 5, isPositive: true }
  },
  {
    title: "Manutenções Pendentes",
    value: 12,
    icon: <Wrench className="w-6 h-6" />,
    trend: { value: 8, isPositive: false }
  },
  {
    title: "Peças em Estoque",
    value: 1248,
    icon: <Package className="w-6 h-6" />,
    trend: { value: 12, isPositive: true }
  },
  {
    title: "Alertas Críticos",
    value: 3,
    icon: <AlertTriangle className="w-6 h-6" />,
    trend: { value: 25, isPositive: false }
  }
];

const recentMaintenances = [
  {
    id: 1,
    machine: "Torno CNC-001",
    type: "Preventiva",
    status: "Concluída",
    date: "15/01/2024",
    technician: "João Silva"
  },
  {
    id: 2,
    machine: "Prensa HID-205",
    type: "Corretiva",
    status: "Em Andamento",
    date: "14/01/2024",
    technician: "Maria Santos"
  },
  {
    id: 3,
    machine: "Solda MIG-102",
    type: "Preventiva",
    status: "Agendada",
    date: "16/01/2024",
    technician: "Carlos Lima"
  }
];

const upcomingTasks = [
  {
    id: 1,
    task: "Inspeção Mensal - Linha A",
    priority: "Alta",
    date: "16/01/2024"
  },
  {
    id: 2,
    task: "Troca de Filtros - Sistema Hidráulico",
    priority: "Média",
    date: "17/01/2024"
  },
  {
    id: 3,
    task: "Calibração Sensores - Linha B",
    priority: "Baixa",
    date: "18/01/2024"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Concluída":
      return "text-success";
    case "Em Andamento":
      return "text-warning";
    case "Agendada":
      return "text-primary";
    default:
      return "text-muted-foreground";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Alta":
      return "text-destructive";
    case "Média":
      return "text-warning";
    case "Baixa":
      return "text-success";
    default:
      return "text-muted-foreground";
  }
};

export default function Dashboard() {
  const [showMachineModal, setShowMachineModal] = useState(false);
  const [showPartModal, setShowPartModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Visão geral da manutenção industrial
            </p>
          </div>
          <Button variant="hero" onClick={() => setShowMaintenanceModal(true)}>
            <Calendar className="w-4 h-4" />
            Agendar Manutenção
          </Button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Maintenances */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-primary" />
                  Manutenções Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMaintenances.map((maintenance) => (
                    <div 
                      key={maintenance.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Cog className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{maintenance.machine}</p>
                          <p className="text-sm text-muted-foreground">
                            {maintenance.type} • {maintenance.technician}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center gap-1 text-sm font-medium ${getStatusColor(maintenance.status)}`}>
                          {maintenance.status === "Concluída" && <CheckCircle className="w-4 h-4" />}
                          {maintenance.status === "Em Andamento" && <Clock className="w-4 h-4" />}
                          {maintenance.status === "Agendada" && <Calendar className="w-4 h-4" />}
                          {maintenance.status}
                        </div>
                        <p className="text-sm text-muted-foreground">{maintenance.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Tasks */}
          <div>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Próximas Tarefas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTasks.map((task) => (
                    <div 
                      key={task.id}
                      className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground text-sm">{task.task}</h4>
                        <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{task.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sensor Monitoring */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Monitoramento em Tempo Real</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Temperature Card */}
            <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-200/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Temperatura Média</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-foreground">68°C</p>
                      <span className="text-xs px-2 py-1 bg-green-500 text-white rounded-full">Normal</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">3 sensores ativos</p>
                  </div>
                  <div className="p-3 rounded-xl bg-orange-500/10 text-orange-600">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pressure Card */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-200/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pressão Hidráulica</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-foreground">185 bar</p>
                      <span className="text-xs px-2 py-1 bg-yellow-500 text-white rounded-full">Alerta</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">1 sensor ativo</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vibration Card */}
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Vibração Média</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-foreground">2.5 mm/s</p>
                      <span className="text-xs px-2 py-1 bg-green-500 text-white rounded-full">Normal</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">1 sensor ativo</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fluid Levels Card */}
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-200/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Níveis de Fluidos</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-foreground">85%</p>
                      <span className="text-xs px-2 py-1 bg-green-500 text-white rounded-full">Bom</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">2 sensores ativos</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500/10 text-green-600">
                    <Package className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sensor Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Alertas dos Sensores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-yellow-500/10 text-yellow-600">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Sensor Pressão Hidráulica</p>
                      <p className="text-sm text-muted-foreground">Prensa Hidráulica HID-205 - Sistema Hidráulico</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-2 py-1 bg-yellow-500 text-white rounded-full">185 bar</span>
                    <p className="text-xs text-muted-foreground mt-1">15/01/2024 14:28</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-red-500/10 text-red-600">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Sensor Nível Água</p>
                      <p className="text-sm text-muted-foreground">Fresadora Universal FRE-304 - Sistema Refrigeração</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-2 py-1 bg-red-500 text-white rounded-full">0%</span>
                    <p className="text-xs text-muted-foreground mt-1">15/01/2024 12:15</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setShowMachineModal(true)}>
                <Cog className="w-6 h-6" />
                Nova Máquina
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setShowMaintenanceModal(true)}>
                <Wrench className="w-6 h-6" />
                Agendar Manutenção
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setShowPartModal(true)}>
                <Package className="w-6 h-6" />
                Gerenciar Peças
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <AlertTriangle className="w-6 h-6" />
                Criar Alerta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <NewMachineModal open={showMachineModal} onOpenChange={setShowMachineModal} />
      <NewPartModal open={showPartModal} onOpenChange={setShowPartModal} />
      <NewMaintenanceModal open={showMaintenanceModal} onOpenChange={setShowMaintenanceModal} />
    </Layout>
  );
}