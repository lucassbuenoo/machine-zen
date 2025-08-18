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
import { Sensor } from "@/types";
import { toast } from "sonner";
import { mockMachines } from "@/data/mockData";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  type: z.enum(["Temperatura", "Pressão", "Vibração", "Nível", "Vazão", "Velocidade"]),
  machineId: z.number().min(1, "Máquina é obrigatória"),
  location: z.string().min(1, "Localização é obrigatória"),
  minThreshold: z.number().optional(),
  maxThreshold: z.number().optional(),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface EditSensorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sensor: Sensor | null;
  onSave: (sensor: Sensor) => void;
}

export function EditSensorModal({ open, onOpenChange, sensor, onSave }: EditSensorModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: sensor?.name || "",
      type: sensor?.type || "Temperatura",
      machineId: sensor?.machineId || 0,
      location: sensor?.location || "",
      minThreshold: sensor?.minThreshold || undefined,
      maxThreshold: sensor?.maxThreshold || undefined,
      description: sensor?.description || "",
    },
  });

  // Reset form when sensor changes
  useState(() => {
    if (sensor) {
      form.reset({
        name: sensor.name,
        type: sensor.type,
        machineId: sensor.machineId,
        location: sensor.location,
        minThreshold: sensor.minThreshold || undefined,
        maxThreshold: sensor.maxThreshold || undefined,
        description: sensor.description || "",
      });
    }
  });

  const onSubmit = async (data: FormData) => {
    if (!sensor) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const selectedMachine = mockMachines.find(m => m.id === data.machineId);
    
    const updatedSensor: Sensor = {
      ...sensor,
      ...data,
      machineName: selectedMachine?.name || "",
      unit: getUnitByType(data.type),
    };

    onSave(updatedSensor);
    toast.success("Sensor atualizado com sucesso!");
    onOpenChange(false);
    setIsLoading(false);
  };

  const getUnitByType = (type: string) => {
    switch (type) {
      case "Temperatura": return "°C";
      case "Pressão": return "bar";
      case "Vibração": return "Hz";
      case "Nível": return "%";
      case "Vazão": return "L/min";
      case "Velocidade": return "rpm";
      default: return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Sensor</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Sensor</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do sensor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Sensor</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Temperatura">Temperatura</SelectItem>
                        <SelectItem value="Pressão">Pressão</SelectItem>
                        <SelectItem value="Vibração">Vibração</SelectItem>
                        <SelectItem value="Nível">Nível</SelectItem>
                        <SelectItem value="Vazão">Vazão</SelectItem>
                        <SelectItem value="Velocidade">Velocidade</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                            {machine.name}
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
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localização na Máquina</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Motor principal, Eixo traseiro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Limite Mínimo (Opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Limite Máximo (Opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="100"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrição do sensor e sua função"
                      className="resize-none"
                      rows={3}
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
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}