import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge, PriorityBadge } from "@/components/ui/status-badge";
import { NewWorkOrderModal } from "@/components/modals/NewWorkOrderModal";
import { mockWorkOrders } from "@/data/mockData";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  FileText,
  User,
  Calendar,
  Clock,
  Cog
} from "lucide-react";

export default function WorkOrders() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Ordens de Serviço</h1>
            <p className="text-muted-foreground">
              Gerencie e acompanhe todas as ordens de manutenção
            </p>
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4" />
            Nova Ordem
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Buscar ordens de serviço..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Status</Button>
              <Button variant="outline">Prioridade</Button>
              <Button variant="outline">Técnico</Button>
            </div>
          </CardContent>
        </Card>

        {/* Work Orders List */}
        <div className="space-y-4">
          {mockWorkOrders.map((order) => (
            <Card key={order.id} className="shadow-card hover:shadow-elevated transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                        <PriorityBadge priority={order.priority} />
                      </div>
                      <p className="text-sm text-muted-foreground">{order.machineName}</p>
                    </div>
                  </div>
                  <StatusBadge status={order.status} type="workOrder" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="bg-muted/30 p-3 rounded-lg">
                  <p className="text-sm font-medium text-foreground">{order.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Cog className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Máquina:</span>
                      <span className="font-medium">{order.machineName}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Técnico:</span>
                      <span className="font-medium">{order.assignedTechnician}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Criada em:</span>
                      <span className="font-medium">{order.createdDate}</span>
                    </div>
                    
                    {order.estimatedTime && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Tempo Est.:</span>
                        <span className="font-medium">{order.estimatedTime}h</span>
                      </div>
                    )}
                    
                    {order.completedDate && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-success" />
                        <span className="text-muted-foreground">Concluída em:</span>
                        <span className="font-medium text-success">{order.completedDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-border">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                    Editar
                  </Button>
                  {order.status === "Aberta" && (
                    <Button size="sm" variant="secondary">
                      Iniciar Trabalho
                    </Button>
                  )}
                  {order.status === "Em Andamento" && (
                    <Button size="sm" variant="hero">
                      Finalizar
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive ml-auto">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add New Work Order Card */}
        <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="p-4 rounded-full bg-primary/10 mb-4">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Criar Nova Ordem de Serviço
            </h3>
            <p className="text-muted-foreground mb-4">
              Registre uma nova solicitação de manutenção
            </p>
            <Button variant="hero">
              Criar Ordem
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}