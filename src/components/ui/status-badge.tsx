import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  type?: "machine" | "part" | "workOrder" | "maintenance";
  className?: string;
}

export function StatusBadge({ status, type = "machine", className }: StatusBadgeProps) {
  const getStatusColors = () => {
    switch (type) {
      case "machine":
        switch (status) {
          case "Ativa":
            return "bg-machine-active text-white";
          case "Manutenção":
            return "bg-machine-maintenance text-black";
          case "Inativa":
            return "bg-machine-inactive text-white";
          case "Crítica":
            return "bg-destructive text-destructive-foreground";
          default:
            return "bg-secondary text-secondary-foreground";
        }
      
      case "part":
        switch (status) {
          case "Em Estoque":
            return "bg-success text-success-foreground";
          case "Baixo Estoque":
            return "bg-warning text-warning-foreground";
          case "Sem Estoque":
            return "bg-destructive text-destructive-foreground";
          default:
            return "bg-secondary text-secondary-foreground";
        }
      
      case "workOrder":
        switch (status) {
          case "Aberta":
            return "bg-primary text-primary-foreground";
          case "Em Andamento":
            return "bg-warning text-warning-foreground";
          case "Concluída":
            return "bg-success text-success-foreground";
          case "Cancelada":
            return "bg-destructive text-destructive-foreground";
          default:
            return "bg-secondary text-secondary-foreground";
        }
      
      case "maintenance":
        switch (status) {
          case "Agendada":
            return "bg-primary text-primary-foreground";
          case "Em Andamento":
            return "bg-warning text-warning-foreground";
          case "Concluída":
            return "bg-success text-success-foreground";
          case "Cancelada":
            return "bg-destructive text-destructive-foreground";
          default:
            return "bg-secondary text-secondary-foreground";
        }
      
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Badge className={cn(getStatusColors(), className)}>
      {status}
    </Badge>
  );
}

interface PriorityBadgeProps {
  priority: string;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const getPriorityColors = () => {
    switch (priority) {
      case "Baixa":
        return "bg-success text-success-foreground";
      case "Média":
        return "bg-warning text-warning-foreground";
      case "Alta":
        return "bg-orange-500 text-white";
      case "Crítica":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Badge className={cn(getPriorityColors(), className)}>
      {priority}
    </Badge>
  );
}