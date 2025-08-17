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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { mockMachines } from "@/data/mockData";
import { Sensor, SensorType } from "@/types";

const sensorSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  type: z.enum(["Temperatura", "Pressão", "Vibração", "Nível", "Vazão", "Velocidade"] as const),
  machineId: z.number().min(1, "Máquina é obrigatória"),
  location: z.string().min(1, "Localização é obrigatória"),
  minThreshold: z.number().optional(),
  maxThreshold: z.number().optional(),
  description: z.string().optional(),
}).refine((data) => {
  if (data.minThreshold !== undefined && data.maxThreshold !== undefined) {
    return data.minThreshold < data.maxThreshold;
  }
  return true;
}, {
  message: "Valor mínimo deve ser menor que o máximo",
  path: ["maxThreshold"],
});

type SensorFormData = z.infer<typeof sensorSchema>;

interface NewSensorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSensorCreated: (sensor: Omit<Sensor, "id" | "lastReading">) => void;
}

export function NewSensorModal({ open, onOpenChange, onSensorCreated }: NewSensorModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SensorFormData>({
    resolver: zodResolver(sensorSchema),
  });

  const selectedMachineId = watch("machineId");
  const selectedMachine = mockMachines.find(m => m.id === selectedMachineId);

  const onSubmit = async (data: SensorFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newSensor: Omit<Sensor, "id" | "lastReading"> = {
        name: data.name,
        type: data.type,
        machineId: data.machineId,
        machineName: selectedMachine?.name || "",
        status: "Ativo",
        location: data.location,
        value: 0,
        unit: getUnitByType(data.type),
        minThreshold: data.minThreshold,
        maxThreshold: data.maxThreshold,
        description: data.description,
      };

      onSensorCreated(newSensor);
      toast.success("Sensor cadastrado com sucesso!");
      reset();
      onOpenChange(false);
    } catch (error) {
      toast.error("Erro ao cadastrar sensor");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUnitByType = (type: SensorType): string => {
    const units = {
      "Temperatura": "°C",
      "Pressão": "bar",
      "Vibração": "mm/s",
      "Nível": "%",
      "Vazão": "L/min",
      "Velocidade": "RPM"
    };
    return units[type] || "";
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Novo Sensor</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Sensor</Label>
              <Input
                id="name"
                placeholder="Ex: Sensor Temperatura Motor"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select onValueChange={(value) => setValue("type", value as SensorType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Temperatura">Temperatura</SelectItem>
                  <SelectItem value="Pressão">Pressão</SelectItem>
                  <SelectItem value="Vibração">Vibração</SelectItem>
                  <SelectItem value="Nível">Nível</SelectItem>
                  <SelectItem value="Vazão">Vazão</SelectItem>
                  <SelectItem value="Velocidade">Velocidade</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-destructive">{errors.type.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="machineId">Máquina</Label>
            <Select onValueChange={(value) => setValue("machineId", parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a máquina" />
              </SelectTrigger>
              <SelectContent>
                {mockMachines.map((machine) => (
                  <SelectItem key={machine.id} value={machine.id.toString()}>
                    {machine.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.machineId && (
              <p className="text-sm text-destructive">{errors.machineId.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <Input
              id="location"
              placeholder="Ex: Motor Principal, Sistema Hidráulico"
              {...register("location")}
            />
            {errors.location && (
              <p className="text-sm text-destructive">{errors.location.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minThreshold">Limite Mínimo</Label>
              <Input
                id="minThreshold"
                type="number"
                step="0.01"
                placeholder="Valor mínimo"
                {...register("minThreshold", { valueAsNumber: true })}
              />
              {errors.minThreshold && (
                <p className="text-sm text-destructive">{errors.minThreshold.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxThreshold">Limite Máximo</Label>
              <Input
                id="maxThreshold"
                type="number"
                step="0.01"
                placeholder="Valor máximo"
                {...register("maxThreshold", { valueAsNumber: true })}
              />
              {errors.maxThreshold && (
                <p className="text-sm text-destructive">{errors.maxThreshold.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descrição opcional do sensor..."
              {...register("description")}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar Sensor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}