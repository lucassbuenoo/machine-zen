import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Wrench, 
  Settings, 
  Package, 
  FileText, 
  BarChart3,
  Cog,
  ClipboardList,
  Users,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import sgmiLogo from "@/assets/sgmi_logo.png";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Máquinas", href: "/machines", icon: Cog },
  { name: "Sensores", href: "/sensors", icon: Wrench },
  { name: "Peças", href: "/parts", icon: Package },
  { name: "Ordens de Serviço", href: "/work-orders", icon: ClipboardList },
  { name: "Funcionários", href: "/employees", icon: Users },
  { name: "Relatórios", href: "/reports", icon: BarChart3 },
  { name: "Configurações", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    window.location.href = '/auth';
  };

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border shadow-elevated">
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-border">
        <img 
          src={sgmiLogo} 
          alt="SGMI" 
          className="w-12 h-12 object-contain"
        />
        <div>
          <h1 className="text-xl font-bold text-foreground">SGMI</h1>
          <p className="text-sm text-muted-foreground">Gestão Industrial</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">
              {user?.email?.split('@')[0] || 'Usuário'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email || 'admin@empresa.com'}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </Button>
      </div>
    </div>
  );
}