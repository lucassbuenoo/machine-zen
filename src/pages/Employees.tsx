import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { NewEmployeeModal } from "@/components/modals/NewEmployeeModal";
import { mockEmployees } from "@/data/mockData";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  User,
  Phone,
  Mail,
  Calendar,
  Building,
  Badge
} from "lucide-react";

export default function Employees() {
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Funcionários</h1>
            <p className="text-muted-foreground">
              Gerencie a equipe e controle de acesso
            </p>
          </div>
          <Button variant="hero" onClick={() => setShowEmployeeModal(true)}>
            <Plus className="w-4 h-4" />
            Novo Funcionário
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Buscar funcionários..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Setor</Button>
              <Button variant="outline">Cargo</Button>
              <Button variant="outline">Status</Button>
            </div>
          </CardContent>
        </Card>

        {/* Employees Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockEmployees.map((employee) => (
            <Card key={employee.id} className="shadow-card hover:shadow-elevated transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {employee.photo ? (
                        <img src={employee.photo} alt={employee.name} className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <User className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{employee.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{employee.position}</p>
                    </div>
                  </div>
                  <StatusBadge status={employee.status} type="employee" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Setor:</span>
                    <span className="font-medium">{employee.department}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Telefone:</span>
                    <span className="font-medium">{employee.phone}</span>
                  </div>
                  
                  {employee.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium text-xs">{employee.email}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Badge className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">CPF:</span>
                    <span className="font-medium">{employee.cpf}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Badge className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">NIF:</span>
                    <span className="font-medium">{employee.nif}</span>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Contratado em:</span>
                      <span className="font-medium">{employee.hireDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add New Employee Card */}
        <Card 
          className="border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => setShowEmployeeModal(true)}
        >
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="p-4 rounded-full bg-primary/10 mb-4">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Adicionar Novo Funcionário
            </h3>
            <p className="text-muted-foreground mb-4">
              Cadastre um novo membro da equipe
            </p>
            <Button variant="hero">
              Cadastrar Funcionário
            </Button>
          </CardContent>
        </Card>

        <NewEmployeeModal open={showEmployeeModal} onOpenChange={setShowEmployeeModal} />
      </div>
    </Layout>
  );
}