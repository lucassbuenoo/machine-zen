import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Cog,
  MapPin,
  Calendar,
  Factory
} from "lucide-react";

const machines = [
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

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Ativa":
      return <Badge className="bg-machine-active text-white">Ativa</Badge>;
    case "Manutenção":
      return <Badge className="bg-machine-maintenance text-black">Manutenção</Badge>;
    case "Inativa":
      return <Badge className="bg-machine-inactive text-white">Inativa</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function Machines() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Máquinas</h1>
            <p className="text-muted-foreground">
              Cadastre e gerencie todas as máquinas industriais
            </p>
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4" />
            Nova Máquina
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Buscar máquinas..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filtros</Button>
            </div>
          </CardContent>
        </Card>

        {/* Machines Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {machines.map((machine) => (
            <Card key={machine.id} className="shadow-card hover:shadow-elevated transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Cog className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{machine.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{machine.serialNumber}</p>
                    </div>
                  </div>
                  {getStatusBadge(machine.status)}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Factory className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Fabricante:</span>
                    <span className="font-medium">{machine.manufacturer}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Localização:</span>
                    <span className="font-medium">{machine.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Aquisição:</span>
                    <span className="font-medium">{machine.acquisitionDate}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Cog className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Última Manutenção:</span>
                    <span className="font-medium">{machine.lastMaintenance}</span>
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

        {/* Add New Machine Card */}
        <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="p-4 rounded-full bg-primary/10 mb-4">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Adicionar Nova Máquina
            </h3>
            <p className="text-muted-foreground mb-4">
              Clique aqui para cadastrar uma nova máquina no sistema
            </p>
            <Button variant="hero">
              Cadastrar Máquina
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}