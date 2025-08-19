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
import sgmiLogo from "@/assets/sgmi_logo.png";

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
            <img src={sgmiLogo} alt="SGMI" className="w-12 h-12 object-contain" />
            <span className="text-xl font-bold text-foreground">SGMI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="outline">Entrar</Button>
            </Link>
            <Link to="/auth">
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
            Sistema de Gestão de
            <br />
            <span className="text-accent">Manutenção Industrial</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Plataforma completa para controle de máquinas, manutenções preventivas e corretivas, 
            gestão de peças, funcionários e relatórios avançados para sua indústria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
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

      {/* Contact Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Entre em contato conosco
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tire suas dúvidas ou solicite uma demonstração personalizada
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card shadow-elevated">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Nome completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                        Empresa
                      </label>
                      <input
                        type="text"
                        id="company"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Nome da empresa"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="Como podemos ajudar?"
                    ></textarea>
                  </div>
                  
                  <Button className="w-full" size="lg">
                    Enviar mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
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
          <Link to="/auth">
            <Button variant="hero" size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8 py-4">
              Acessar Sistema Agora
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo and Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={sgmiLogo} alt="SGMI" className="w-10 h-10 object-contain" />
                <span className="text-xl font-bold text-foreground">SGMI</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Sistema de Gestão de Manutenção Industrial - Plataforma completa para otimizar 
                a manutenção e aumentar a eficiência operacional da sua empresa.
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href="https://wa.me/5511999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
            
            {/* Products */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Produtos</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Gestão de Máquinas</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Controle de Peças</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Ordens de Serviço</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Relatórios</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Suporte</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Treinamentos</a></li>
              </ul>
            </div>
          </div>
          
          {/* Social Media and Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
            <p className="text-muted-foreground">
              © 2024 SGMI. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}