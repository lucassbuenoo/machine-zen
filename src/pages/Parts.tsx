import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { NewPartModal } from "@/components/modals/NewPartModal";
import { mockParts } from "@/data/mockData";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Package,
  MapPin,
  ShoppingCart,
  DollarSign,
  AlertTriangle
} from "lucide-react";

export default function Parts() {
  const [showPartModal, setShowPartModal] = useState(false);
  const getStockIcon = (status: string) => {
    switch (status) {
      case "Em Estoque":
        return <Package className="w-4 h-4 text-success" />;
      case "Baixo Estoque":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "Sem Estoque":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <Package className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Peças</h1>
            <p className="text-muted-foreground">
              Controle o estoque de peças e componentes
            </p>
          </div>
          <Button variant="hero" onClick={() => setShowPartModal(true)}>
            <Plus className="w-4 h-4" />
            Nova Peça
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Buscar peças..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Categorias</Button>
              <Button variant="outline">Status</Button>
              <Button variant="outline">Filtros</Button>
            </div>
          </CardContent>
        </Card>

        {/* Parts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockParts.map((part) => (
            <Card key={part.id} className="shadow-card hover:shadow-elevated transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {getStockIcon(part.status)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{part.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{part.code}</p>
                    </div>
                  </div>
                  <StatusBadge status={part.status} type="part" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Categoria:</span>
                    <span className="text-sm font-medium">{part.category}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Quantidade:</span>
                    <span className="text-sm font-medium">{part.quantity} un</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Local:</span>
                    <span className="font-medium text-xs">{part.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Fornecedor:</span>
                    <span className="font-medium text-xs">{part.supplier}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Preço:</span>
                    <span className="font-medium">R$ {part.unitPrice.toFixed(2)}</span>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Estoque Mín:</span>
                      <span className="font-medium">{part.minimumStock} un</span>
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

        {/* Add New Part Card */}
        <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="p-4 rounded-full bg-primary/10 mb-4">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Adicionar Nova Peça
            </h3>
            <p className="text-muted-foreground mb-4">
              Cadastre uma nova peça no estoque
            </p>
            <Button variant="hero" onClick={() => setShowPartModal(true)}>
              Cadastrar Peça
            </Button>
          </CardContent>
        </Card>

        <NewPartModal open={showPartModal} onOpenChange={setShowPartModal} />
      </div>
    </Layout>
  );
}