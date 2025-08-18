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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkOrder } from "@/types";
import { toast } from "sonner";
import { mockMachines, mockEmployees } from "@/data/mockData";

const formSchema = z.object({
  machineId: z.number().min(1, "Máquina é obrigatória"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  priority: z.enum(["Baixa", "Média", "Alta", "Crítica"]),
  assignedTechnician: z.string().min(1, "Técnico é obrigatório"),
  estimatedTime: z.number().min(1, "Tempo estimado deve ser maior que 0").optional(),
});

type FormData = z.infer<typeof formSchema>;

interface EditWorkOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workOrder: WorkOrder | null;
  onSave: (workOrder: WorkOrder) => void;
}

export function EditWorkOrderModal({ open, onOpenChange, workOrder, onSave }: EditWorkOrderModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      machineId: workOrder?.machineId || 0,
      description: workOrder?.description || "",
      priority: workOrder?.priority || "Média",
      assignedTechnician: workOrder?.assignedTechnician || "",
      estimatedTime: workOrder?.estimatedTime || undefined,
    },
  });

  // Reset form when workOrder changes
  useState(() => {
    if (workOrder) {
      form.reset({
        machineId: workOrder.machineId,
        description: workOrder.description,
        priority: workOrder.priority,
        assignedTechnician: workOrder.assignedTechnician,
        estimatedTime: workOrder.estimatedTime || undefined,
      });
    }
  });

  const onSubmit = async (data: FormData) => {
    if (!workOrder) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const selectedMachine = mockMachines.find(m => m.id === data.machineId);
    
    const updatedWorkOrder: WorkOrder = {
      ...workOrder,
      ...data,
      machineName: selectedMachine?.name || "",
    };

    onSave(updatedWorkOrder);
    toast.success("Ordem de serviço atualizada com sucesso!");
    onOpenChange(false);
    setIsLoading(false);
  };

  // Filter employees by maintenance department
  const maintenanceEmployees = mockEmployees.filter(
    emp => emp.department === "Manutenção" && emp.status === "Ativo"
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Ordem de Serviço</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="machineId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Máquina</FormLabel>
                  <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a máquina" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockMachines.map((machine) => (
                        <SelectItem key={machine.id} value={machine.id.toString()}>
                          {machine.name} - {machine.location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do Serviço</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva detalhadamente o serviço a ser realizado..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prioridade</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a prioridade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Baixa">Baixa</SelectItem>
                        <SelectItem value="Média">Média</SelectItem>
                        <SelectItem value="Alta">Alta</SelectItem>
                        <SelectItem value="Crítica">Crítica</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estimatedTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tempo Estimado (horas)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ex: 4"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="assignedTechnician"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Técnico Responsável</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o técnico" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {maintenanceEmployees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.name}>
                          {employee.name} - {employee.position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}