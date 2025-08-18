import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { NewSensorModal } from "@/components/modals/NewSensorModal";
import { Layout } from "@/components/layout/Layout";
import { mockSensors } from "@/data/mockData";
import { Sensor, SensorType, SensorStatus } from "@/types";
import { Plus, Search, Thermometer, Gauge, Activity, Droplets, Zap, RotateCcw, AlertTriangle } from "lucide-react";

export default function Sensors() {
  const [sensors, setSensors] = useState<Sensor[]>(mockSensors);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<SensorType | "todos">("todos");
  const [statusFilter, setStatusFilter] = useState<SensorStatus | "todos">("todos");
  const [isNewSensorModalOpen, setIsNewSensorModalOpen] = useState(false);

  const filteredSensors = sensors.filter(sensor => {
    const matchesSearch = sensor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sensor.machineName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "todos" || sensor.type === typeFilter;
    const matchesStatus = statusFilter === "todos" || sensor.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getSensorIcon = (type: SensorType) => {
    const icons = {
      "Temperatura": Thermometer,
      "Pressão": Gauge,
      "Vibração": Activity,
      "Nível": Droplets,
      "Vazão": Zap,
      "Velocidade": RotateCcw
    };
    return icons[type] || AlertTriangle;
  };

  const getStatusColor = (sensor: Sensor) => {
    if (sensor.status === "Falha") return "destructive";
    if (sensor.status === "Inativo") return "secondary";
    
    if (sensor.maxThreshold && sensor.value > sensor.maxThreshold) return "destructive";
    if (sensor.minThreshold && sensor.value < sensor.minThreshold) return "destructive";
    if (sensor.maxThreshold && sensor.value > sensor.maxThreshold * 0.9) return "warning";
    
    return "success";
  };

  const handleNewSensor = (newSensor: Omit<Sensor, "id" | "lastReading">) => {
    const sensor: Sensor = {
      ...newSensor,
      id: Math.max(...sensors.map(s => s.id)) + 1,
      lastReading: new Date().toLocaleString("pt-BR")
    };
    setSensors([...sensors, sensor]);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sensores</h1>
            <p className="text-muted-foreground">Gerencie e monitore sensores das máquinas</p>
          </div>
          <Button onClick={() => setIsNewSensorModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Sensor
          </Button>
        </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sensores</p>
                <p className="text-3xl font-bold text-foreground">{sensors.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Activity className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ativos</p>
                <p className="text-3xl font-bold text-success">{sensors.filter(s => s.status === "Ativo").length}</p>
              </div>
              <div className="p-3 rounded-xl bg-success/10 text-success">
                <Gauge className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Em Alerta</p>
                <p className="text-3xl font-bold text-warning">{sensors.filter(s => s.status === "Alerta").length}</p>
              </div>
              <div className="p-3 rounded-xl bg-warning/10 text-warning">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Com Falha</p>
                <p className="text-3xl font-bold text-destructive">{sensors.filter(s => s.status === "Falha").length}</p>
              </div>
              <div className="p-3 rounded-xl bg-destructive/10 text-destructive">
                <Zap className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar sensores ou máquinas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as SensorType | "todos")}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="Temperatura">Temperatura</SelectItem>
                <SelectItem value="Pressão">Pressão</SelectItem>
                <SelectItem value="Vibração">Vibração</SelectItem>
                <SelectItem value="Nível">Nível</SelectItem>
                <SelectItem value="Vazão">Vazão</SelectItem>
                <SelectItem value="Velocidade">Velocidade</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as SensorStatus | "todos")}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
                <SelectItem value="Alerta">Alerta</SelectItem>
                <SelectItem value="Falha">Falha</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Sensors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSensors.map((sensor) => {
          const Icon = getSensorIcon(sensor.type);
          const statusColor = getStatusColor(sensor);
          
          return (
            <Card key={sensor.id} className="hover:shadow-elevated transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{sensor.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{sensor.type}</p>
                    </div>
                  </div>
                  <StatusBadge status={sensor.status} type="sensor" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Máquina:</span>
                    <span className="text-sm font-medium">{sensor.machineName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Localização:</span>
                    <span className="text-sm font-medium">{sensor.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Última Leitura:</span>
                    <span className="text-xs text-muted-foreground">{sensor.lastReading}</span>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Valor Atual</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      statusColor === "destructive" ? "bg-red-500 text-white" :
                      statusColor === "warning" ? "bg-yellow-500 text-white" :
                      "bg-green-500 text-white"
                    }`}>
                      {sensor.value} {sensor.unit}
                    </span>
                  </div>
                  
                  {sensor.minThreshold !== undefined && sensor.maxThreshold !== undefined && (
                    <div className="text-xs text-muted-foreground">
                      Faixa: {sensor.minThreshold} - {sensor.maxThreshold} {sensor.unit}
                    </div>
                  )}
                </div>

                {sensor.description && (
                  <p className="text-sm text-muted-foreground">{sensor.description}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredSensors.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Nenhum sensor encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || typeFilter !== "todos" || statusFilter !== "todos"
                ? "Tente ajustar os filtros para encontrar sensores."
                : "Adicione o primeiro sensor do sistema."}
            </p>
            <Button onClick={() => setIsNewSensorModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Sensor
            </Button>
          </CardContent>
        </Card>
      )}

        <NewSensorModal
          open={isNewSensorModalOpen}
          onOpenChange={setIsNewSensorModalOpen}
          onSensorCreated={handleNewSensor}
        />
      </div>
    </Layout>
  );
}