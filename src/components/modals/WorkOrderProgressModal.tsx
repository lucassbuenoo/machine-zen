import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WorkOrder } from "@/types";
import { toast } from "sonner";

const formSchema = z.object({
  hoursWorked: z.number().min(0.1, "Horas trabalhadas deve ser maior que 0"),
  notes: z.string().min(10, "Observações devem ter pelo menos 10 caracteres"),
  isCompleted: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface WorkOrderProgressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workOrder: WorkOrder | null;
  onSave: (workOrder: WorkOrder, progress: { hoursWorked: number; notes: string; isCompleted?: boolean }) => void;
}

export function WorkOrderProgressModal({ open, onOpenChange, workOrder, onSave }: WorkOrderProgressModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hoursWorked: 0,
      notes: "",
      isCompleted: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!workOrder) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedWorkOrder: WorkOrder = {
      ...workOrder,
      status: isCompleting ? "Concluída" : "Em Andamento",
      completedDate: isCompleting ? new Date().toISOString().split('T')[0] : undefined,
    };

    onSave(updatedWorkOrder, {
      hoursWorked: data.hoursWorked,
      notes: data.notes,
      isCompleted: isCompleting,
    });

    toast.success(isCompleting ? "Ordem de serviço concluída!" : "Progresso registrado!");
    form.reset();
    onOpenChange(false);
    setIsLoading(false);
    setIsCompleting(false);
  };

  const handleComplete = () => {
    setIsCompleting(true);
    form.handleSubmit(onSubmit)();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Registrar Progresso da Ordem</DialogTitle>
        </DialogHeader>
        
        {workOrder && (
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <p className="font-medium">{workOrder.orderNumber}</p>
            <p className="text-sm text-muted-foreground">{workOrder.machineName}</p>
            <p className="text-sm text-muted-foreground">Técnico: {workOrder.assignedTechnician}</p>
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="hoursWorked"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horas Trabalhadas</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.5"
                      placeholder="Ex: 2.5"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações do Trabalho</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o trabalho realizado, peças utilizadas, problemas encontrados..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Registrar Progresso"}
              </Button>
              <Button 
                type="button" 
                variant="default"
                disabled={isLoading}
                onClick={handleComplete}
                className="bg-success hover:bg-success/90"
              >
                {isLoading ? "Concluindo..." : "Concluir Ordem"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}