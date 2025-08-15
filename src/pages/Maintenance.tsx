import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Calendar, 
  User, 
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter
} from "lucide-react";

const maintenances = [
  {
    id: 1,
    machine: "Torno CNC-001",
    type: "Preventiva",
    scheduledDate: "16/01/2024",
    technician: "João Silva",
    status: "Agendada",
    priority: "Média",
    description: "Inspeção geral e lubrificação dos componentes"
  },
  {
    id: 2,
    machine: "Prensa HID-205",
    type: "Corretiva",
    scheduledDate: "14/01/2024",
    technician: "Maria Santos",
    status: "Em Andamento",
    priority: "Alta",
    description: "Reparo no sistema hidráulico - vazamento identificado"
  },
  {
    id: 3,
    machine: "Solda MIG-102",
    type: "Preventiva",
    scheduledDate: "12/01/2024",
    technician: "Carlos Lima",
    status: "Concluída",
    priority: "Baixa",
    description: "Troca de eletrodos e limpeza do sistema"
  },
  {
    id: 4,
    machine: "Fresadora FRE-304",
    type: "Corretiva",
    scheduledDate: "18/01/2024",
    technician: "Ana Costa",
    status: "Agendada",
    priority: "Alta",
    description: "Substituição do motor principal"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Concluída":
      return <Badge className="bg-success text-success-foreground">Concluída</Badge>;
    case "Em Andamento":
      return <Badge className="bg-warning text-warning-foreground">Em Andamento</Badge>;
    case "Agendada":
      return <Badge className="bg-primary text-primary-foreground">Agendada</Badge>;
    case "Atrasada":
      return <Badge className="bg-destructive text-destructive-foreground">Atrasada</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "Alta":
      return <Badge variant="destructive">Alta</Badge>;
    case "Média":
      return <Badge className="bg-warning text-warning-foreground">Média</Badge>;
    case "Baixa":
      return <Badge className="bg-success text-success-foreground">Baixa</Badge>;
    default:
      return <Badge variant="secondary">{priority}</Badge>;
  }
};

const getTypeIcon = (type: string) => {
  return type === "Preventiva" ? (
    <Calendar className="w-4 h-4 text-primary" />
  ) : (
    <AlertTriangle className="w-4 h-4 text-warning" />
  );
};

const filterMaintenances = (status?: string) => {
  if (!status) return maintenances;
  return maintenances.filter(m => m.status === status);
};

export default function Maintenance() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Manutenção</h1>
            <p className="text-muted-foreground">
              Controle de manutenções preventivas e corretivas
            </p>
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4" />
            Nova Manutenção
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Buscar manutenções..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different views */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="Agendada">Agendadas</TabsTrigger>
            <TabsTrigger value="Em Andamento">Em Andamento</TabsTrigger>
            <TabsTrigger value="Concluída">Concluídas</TabsTrigger>
            <TabsTrigger value="Atrasada">Atrasadas</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {maintenances.map((maintenance) => (
              <Card key={maintenance.id} className="shadow-card hover:shadow-elevated transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 rounded-lg bg-primary/10">
                        {getTypeIcon(maintenance.type)}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-foreground">
                            {maintenance.machine}
                          </h3>
                          <Badge variant="outline">{maintenance.type}</Badge>
                          {getPriorityBadge(maintenance.priority)}
                        </div>
                        
                        <p className="text-muted-foreground">{maintenance.description}</p>
                        
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>{maintenance.scheduledDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span>{maintenance.technician}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {getStatusBadge(maintenance.status)}
                      <Button variant="outline" size="sm">
                        <Wrench className="w-4 h-4" />
                        Detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="Agendada" className="space-y-4">
            {filterMaintenances("Agendada").map((maintenance) => (
              <Card key={maintenance.id} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">{maintenance.machine}</h3>
                      <p className="text-sm text-muted-foreground">{maintenance.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="Em Andamento" className="space-y-4">
            {filterMaintenances("Em Andamento").map((maintenance) => (
              <Card key={maintenance.id} className="shadow-card border-warning">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Wrench className="w-5 h-5 text-warning" />
                    <div>
                      <h3 className="font-semibold">{maintenance.machine}</h3>
                      <p className="text-sm text-muted-foreground">{maintenance.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="Concluída" className="space-y-4">
            {filterMaintenances("Concluída").map((maintenance) => (
              <Card key={maintenance.id} className="shadow-card border-success">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <div>
                      <h3 className="font-semibold">{maintenance.machine}</h3>
                      <p className="text-sm text-muted-foreground">{maintenance.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="Atrasada" className="space-y-4">
            <Card className="shadow-card border-destructive">
              <CardContent className="p-12 text-center">
                <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Nenhuma manutenção atrasada
                </h3>
                <p className="text-muted-foreground">
                  Todas as manutenções estão em dia. Parabéns pela organização!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}