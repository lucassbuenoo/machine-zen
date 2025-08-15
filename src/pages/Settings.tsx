import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Bell, 
  Settings as SettingsIcon, 
  Shield,
  Database,
  Download,
  Save
} from "lucide-react";

export default function Settings() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
            <p className="text-muted-foreground">
              Gerencie suas preferências e configurações do sistema
            </p>
          </div>
          <Button variant="hero">
            <Save className="w-4 h-4" />
            Salvar Alterações
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="system">Sistema</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Informações do Perfil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                    U
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">Alterar Foto</Button>
                    <p className="text-sm text-muted-foreground">JPG, PNG ou GIF. Máximo 2MB.</p>
                  </div>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" defaultValue="Usuário Demo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="admin@empresa.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" defaultValue="(11) 99999-9999" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento</Label>
                    <Input id="department" defaultValue="Manutenção Industrial" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Cargo</Label>
                    <Input id="role" defaultValue="Supervisor de Manutenção" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input id="company" defaultValue="Indústria XYZ Ltda" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Configurações de Notificação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notificações por Email</h4>
                      <p className="text-sm text-muted-foreground">Receba notificações importantes por email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Manutenções Vencidas</h4>
                      <p className="text-sm text-muted-foreground">Alertas para manutenções em atraso</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Estoque Baixo</h4>
                      <p className="text-sm text-muted-foreground">Avisos quando peças estão em falta</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Ordens de Serviço</h4>
                      <p className="text-sm text-muted-foreground">Notificações sobre novas ordens</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Relatórios Semanais</h4>
                      <p className="text-sm text-muted-foreground">Resumo semanal das atividades</p>
                    </div>
                    <Switch />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notificações Push</h4>
                      <p className="text-sm text-muted-foreground">Notificações no navegador</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="w-5 h-5 text-primary" />
                  Configurações do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <Input id="timezone" defaultValue="America/São_Paulo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <Input id="language" defaultValue="Português (Brasil)" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Moeda</Label>
                    <Input id="currency" defaultValue="Real (BRL)" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateformat">Formato de Data</Label>
                    <Input id="dateformat" defaultValue="DD/MM/AAAA" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Modo Escuro</h4>
                      <p className="text-sm text-muted-foreground">Ativar tema escuro na interface</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Auto-Save</h4>
                      <p className="text-sm text-muted-foreground">Salvar automaticamente as alterações</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Confirmações</h4>
                      <p className="text-sm text-muted-foreground">Pedir confirmação antes de deletar</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Configurações de Segurança
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Alterar Senha</h4>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current">Senha Atual</Label>
                        <Input id="current" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new">Nova Senha</Label>
                        <Input id="new" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm">Confirmar Nova Senha</Label>
                        <Input id="confirm" type="password" />
                      </div>
                      <Button className="w-fit">Atualizar Senha</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Autenticação de Dois Fatores</h4>
                        <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                      </div>
                      <Button variant="outline">Configurar</Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Sessões Ativas</h4>
                        <p className="text-sm text-muted-foreground">Gerencie dispositivos conectados</p>
                      </div>
                      <Button variant="outline">Ver Sessões</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backup Tab */}
          <TabsContent value="backup">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  Backup e Exportação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Backup Automático</h4>
                      <p className="text-sm text-muted-foreground">Backup diário dos dados do sistema</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Último Backup</h4>
                      <p className="text-sm text-muted-foreground">15/01/2024 às 03:00</p>
                    </div>
                    <Button variant="outline">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Exportar Dados</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Button variant="outline" className="h-20 flex-col gap-2">
                        <Database className="w-6 h-6" />
                        Backup Completo
                      </Button>
                      <Button variant="outline" className="h-20 flex-col gap-2">
                        <Download className="w-6 h-6" />
                        Exportar Relatórios
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                    <h4 className="font-medium text-destructive mb-2">Zona de Perigo</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Esta ação irá apagar permanentemente todos os dados do sistema.
                    </p>
                    <Button variant="destructive">Resetar Sistema</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}