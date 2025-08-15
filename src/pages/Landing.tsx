import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Wrench, 
  BarChart3, 
  Shield, 
  Clock,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import heroImage from "@/assets/hero-industrial.jpg";
import maintenanceIcon from "@/assets/maintenance-icon.jpg";

const features = [
  {
    icon: <Wrench className="w-6 h-6" />,
    title: "Gestão Completa",
    description: "Controle total de máquinas, manutenções e peças em uma única plataforma."
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Relatórios Avançados",
    description: "Análises detalhadas e métricas de performance para tomada de decisão."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Segurança Total",
    description: "Dados protegidos com criptografia e backup automático."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Economia de Tempo",
    description: "Automatize processos e reduza o tempo de inatividade das máquinas."
  }
];

const benefits = [
  "Redução de 40% no tempo de inatividade",
  "Aumento de 25% na vida útil dos equipamentos",
  "Economia de 30% nos custos de manutenção",
  "100% de rastreabilidade de peças e serviços"
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={maintenanceIcon} alt="MaintenancePro" className="w-10 h-10 rounded-lg" />
            <span className="text-xl font-bold text-foreground">MaintenancePro</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline">Entrar</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="hero" size="lg">
                Começar Grátis
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>
        <div className="relative container mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Gerencie sua Manutenção
            <br />
            <span className="text-accent">Industrial</span> com Eficiência
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Plataforma completa para controle de máquinas, manutenções preventivas e corretivas, 
            gestão de peças e relatórios avançados para sua indústria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                Acessar Sistema
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20">
              Ver Demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Tudo que você precisa para gerir sua manutenção
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Recursos avançados para otimizar a operação da sua indústria
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card shadow-card hover:shadow-elevated transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Resultados comprovados na indústria
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Empresas que usam o MaintenancePro reportam melhorias significativas 
                em eficiência e redução de custos operacionais.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-success" />
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-success mb-2">40%</div>
                  <div className="text-sm text-muted-foreground">Redução Inatividade</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-2">25%</div>
                  <div className="text-sm text-muted-foreground">Aumento Vida Útil</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">30%</div>
                  <div className="text-sm text-muted-foreground">Economia Custos</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-warning mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Rastreabilidade</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-hover text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Pronto para revolucionar sua manutenção?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Comece hoje mesmo e veja os resultados na primeira semana
          </p>
          <Link to="/dashboard">
            <Button variant="hero" size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8 py-4">
              Acessar Sistema Agora
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={maintenanceIcon} alt="MaintenancePro" className="w-8 h-8 rounded-lg" />
            <span className="text-lg font-bold text-foreground">MaintenancePro</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 MaintenancePro. Gestão de Manutenção Industrial.
          </p>
        </div>
      </footer>
    </div>
  );
}