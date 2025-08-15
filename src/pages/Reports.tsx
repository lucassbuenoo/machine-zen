import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  DollarSign,
  Package,
  Clock,
  FileSpreadsheet,
  FileText
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const maintenanceData = [
  { month: "Jan", preventiva: 12, corretiva: 8 },
  { month: "Fev", preventiva: 15, corretiva: 6 },
  { month: "Mar", preventiva: 10, corretiva: 12 },
  { month: "Abr", preventiva: 18, corretiva: 4 },
  { month: "Mai", preventiva: 14, corretiva: 9 },
  { month: "Jun", preventiva: 16, corretiva: 7 }
];

const costData = [
  { month: "Jan", custo: 15000 },
  { month: "Fev", custo: 12000 },
  { month: "Mar", custo: 18000 },
  { month: "Abr", custo: 9000 },
  { month: "Mai", custo: 14000 },
  { month: "Jun", custo: 11000 }
];

const partsData = [
  { name: "Filtros", value: 35, color: "hsl(var(--primary))" },
  { name: "Rolamentos", value: 25, color: "hsl(var(--secondary))" },
  { name: "Correias", value: 20, color: "hsl(var(--warning))" },
  { name: "Sensores", value: 12, color: "hsl(var(--success))" },
  { name: "Outros", value: 8, color: "hsl(var(--muted))" }
];

const downtimeData = [
  { machine: "CNC-001", hours: 4.5 },
  { machine: "HID-205", hours: 12.2 },
  { machine: "MIG-102", hours: 2.1 },
  { machine: "FRE-304", hours: 8.7 }
];

const reportCards = [
  {
    title: "Relatório de Manutenções",
    description: "Análise detalhada das manutenções realizadas por período",
    icon: <BarChart3 className="w-6 h-6" />,
    period: "Últimos 6 meses",
    count: "124 manutenções"
  },
  {
    title: "Análise de Custos",
    description: "Breakdown dos custos de manutenção e operação",
    icon: <DollarSign className="w-6 h-6" />,
    period: "Ano atual",
    count: "R$ 89.500,00"
  },
  {
    title: "Consumo de Peças",
    description: "Relatório de peças mais utilizadas e previsão de estoque",
    icon: <Package className="w-6 h-6" />,
    period: "Último trimestre",
    count: "1.248 peças"
  },
  {
    title: "Tempo de Inatividade",
    description: "Análise do downtime por máquina e impacto na produção",
    icon: <Clock className="w-6 h-6" />,
    period: "Últimos 30 dias",
    count: "27.5 horas"
  }
];

export default function Reports() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
            <p className="text-muted-foreground">
              Análises e insights sobre manutenção industrial
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="w-4 h-4" />
              Período
            </Button>
            <Button variant="hero">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Report Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportCards.map((report, index) => (
            <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {report.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{report.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Período:</span>
                    <span className="font-medium">{report.period}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-medium text-primary">{report.count}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Maintenance Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Manutenções por Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={maintenanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="preventiva" fill="hsl(var(--primary))" name="Preventiva" />
                  <Bar dataKey="corretiva" fill="hsl(var(--warning))" name="Corretiva" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cost Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Custos de Manutenção
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={costData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    formatter={(value) => [`R$ ${value.toLocaleString()}`, "Custo"]}
                  />
                  <Line type="monotone" dataKey="custo" stroke="hsl(var(--primary))" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Parts Consumption */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Consumo de Peças
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={partsData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {partsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Downtime Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Tempo de Inatividade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={downtimeData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="machine" type="category" stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    formatter={(value) => [`${value}h`, "Inatividade"]}
                  />
                  <Bar dataKey="hours" fill="hsl(var(--destructive))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Export Options */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Opções de Exportação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <FileSpreadsheet className="w-6 h-6" />
                Exportar Excel
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <FileText className="w-6 h-6" />
                Exportar PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}