import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { mockMachines, mockTechnicians } from "@/data/mockData";
import { Priority } from "@/types";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  machineId: z.number().min(1, "Máquina é obrigatória"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  priority: z.enum(["Baixa", "Média", "Alta", "Crítica"] as const),
  assignedTechnician: z.string().min(1, "Técnico responsável é obrigatório"),
  estimatedTime: z.number().min(0.5, "Tempo estimado deve ser pelo menos 0.5 horas").optional(),
});

type FormData = z.infer<typeof formSchema>;

interface NewWorkOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const priorities: Priority[] = ["Baixa", "Média", "Alta", "Crítica"];

export function NewWorkOrderModal({ open, onOpenChange }: NewWorkOrderModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      machineId: 0,
      description: "",
      priority: "Média",
      assignedTechnician: "",
      estimatedTime: undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const machine = mockMachines.find(m => m.id === data.machineId);
    const orderNumber = `OS-2024-${String(Date.now()).slice(-3).padStart(3, '0')}`;
    
    console.log("Nova ordem de serviço:", {
      ...data,
      orderNumber,
      machineName: machine?.name,
    });
    
    toast({
      title: "Ordem de serviço criada!",
      description: `${orderNumber} foi registrada para ${machine?.name}.`,
    });
    
    form.reset();
    onOpenChange(false);
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Ordem de Serviço</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="machineId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Máquina *</FormLabel>
                  <Select onValueChange={(value) => field.onChange(Number(value))}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma máquina" />
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
                  <FormLabel>Descrição do Problema *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva detalhadamente o problema ou serviço necessário..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prioridade *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priorities.map((priority) => (
                          <SelectItem key={priority} value={priority}>
                            {priority}
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
                name="estimatedTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tempo Estimado (h)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.5"
                        placeholder="2.0"
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
                  <FormLabel>Técnico Responsável *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um técnico" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockTechnicians.map((technician) => (
                        <SelectItem key={technician} value={technician}>
                          {technician}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Criar Ordem
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}