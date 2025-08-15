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
import { MaintenanceType } from "@/types";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  machineId: z.number().min(1, "Máquina é obrigatória"),
  type: z.enum(["Preventiva", "Corretiva", "Preditiva"] as const),
  scheduledDate: z.string().min(1, "Data agendada é obrigatória"),
  assignedTechnician: z.string().min(1, "Técnico responsável é obrigatório"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface NewMaintenanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const maintenanceTypes: MaintenanceType[] = ["Preventiva", "Corretiva", "Preditiva"];

export function NewMaintenanceModal({ open, onOpenChange }: NewMaintenanceModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      machineId: 0,
      type: "Preventiva",
      scheduledDate: "",
      assignedTechnician: "",
      notes: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const machine = mockMachines.find(m => m.id === data.machineId);
    
    console.log("Nova manutenção agendada:", {
      ...data,
      machineName: machine?.name,
    });
    
    toast({
      title: "Manutenção agendada com sucesso!",
      description: `${data.type} agendada para ${machine?.name}.`,
    });
    
    form.reset();
    onOpenChange(false);
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agendar Manutenção</DialogTitle>
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

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {maintenanceTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
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
                name="scheduledDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Agendada *</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
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

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Observações sobre a manutenção..."
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
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
                Agendar Manutenção
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}