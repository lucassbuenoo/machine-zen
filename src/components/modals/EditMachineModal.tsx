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
import { Machine } from "@/types";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  serialNumber: z.string().min(1, "Número de série é obrigatório"),
  manufacturer: z.string().min(1, "Fabricante é obrigatório"),
  acquisitionDate: z.string().min(1, "Data de aquisição é obrigatória"),
  location: z.string().min(1, "Localização é obrigatória"),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface EditMachineModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  machine: Machine | null;
  onSave: (machine: Machine) => void;
}

export function EditMachineModal({ open, onOpenChange, machine, onSave }: EditMachineModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: machine?.name || "",
      serialNumber: machine?.serialNumber || "",
      manufacturer: machine?.manufacturer || "",
      acquisitionDate: machine?.acquisitionDate || "",
      location: machine?.location || "",
      description: machine?.description || "",
    },
  });

  // Reset form when machine changes
  useState(() => {
    if (machine) {
      form.reset({
        name: machine.name,
        serialNumber: machine.serialNumber,
        manufacturer: machine.manufacturer,
        acquisitionDate: machine.acquisitionDate,
        location: machine.location,
        description: machine.description || "",
      });
    }
  });

  const onSubmit = async (data: FormData) => {
    if (!machine) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedMachine: Machine = {
      ...machine,
      ...data,
    };

    onSave(updatedMachine);
    toast.success("Máquina atualizada com sucesso!");
    onOpenChange(false);
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar Máquina</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Máquina</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da máquina" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Série</FormLabel>
                    <FormControl>
                      <Input placeholder="Número de série" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="manufacturer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fabricante</FormLabel>
                    <FormControl>
                      <Input placeholder="Fabricante" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="acquisitionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Aquisição</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Localização</FormLabel>
                    <FormControl>
                      <Input placeholder="Localização da máquina" {...field} />
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
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrição da máquina"
                      className="resize-none"
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