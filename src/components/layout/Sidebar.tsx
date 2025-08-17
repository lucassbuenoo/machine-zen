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
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import maintenanceIcon from "@/assets/maintenance-icon.jpg";

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

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border shadow-elevated">
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-border">
        <img 
          src={maintenanceIcon} 
          alt="MaintenancePro" 
          className="w-10 h-10 rounded-lg"
        />
        <div>
          <h1 className="text-xl font-bold text-foreground">MaintenancePro</h1>
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
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">Usuário Demo</p>
            <p className="text-xs text-muted-foreground truncate">admin@empresa.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}