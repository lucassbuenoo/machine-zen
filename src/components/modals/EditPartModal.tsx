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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Part } from "@/types";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  code: z.string().min(1, "Código é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
  quantity: z.number().min(0, "Quantidade deve ser positiva"),
  location: z.string().min(1, "Localização é obrigatória"),
  supplier: z.string().min(1, "Fornecedor é obrigatório"),
  unitPrice: z.number().min(0, "Preço deve ser positivo"),
  minimumStock: z.number().min(0, "Estoque mínimo deve ser positivo"),
});

type FormData = z.infer<typeof formSchema>;

interface EditPartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  part: Part | null;
  onSave: (part: Part) => void;
}

export function EditPartModal({ open, onOpenChange, part, onSave }: EditPartModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: part?.name || "",
      code: part?.code || "",
      category: part?.category || "",
      quantity: part?.quantity || 0,
      location: part?.location || "",
      supplier: part?.supplier || "",
      unitPrice: part?.unitPrice || 0,
      minimumStock: part?.minimumStock || 0,
    },
  });

  // Reset form when part changes
  useState(() => {
    if (part) {
      form.reset({
        name: part.name,
        code: part.code,
        category: part.category,
        quantity: part.quantity,
        location: part.location,
        supplier: part.supplier,
        unitPrice: part.unitPrice,
        minimumStock: part.minimumStock,
      });
    }
  });

  const onSubmit = async (data: FormData) => {
    if (!part) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Determine status based on quantity
    let status: Part['status'] = "Em Estoque";
    if (data.quantity === 0) {
      status = "Sem Estoque";
    } else if (data.quantity <= data.minimumStock) {
      status = "Baixo Estoque";
    }

    const updatedPart: Part = {
      ...part,
      ...data,
      status,
    };

    onSave(updatedPart);
    toast.success("Peça atualizada com sucesso!");
    onOpenChange(false);
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Peça</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Peça</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da peça" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código</FormLabel>
                    <FormControl>
                      <Input placeholder="Código da peça" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Elétrica">Elétrica</SelectItem>
                        <SelectItem value="Mecânica">Mecânica</SelectItem>
                        <SelectItem value="Hidráulica">Hidráulica</SelectItem>
                        <SelectItem value="Pneumática">Pneumática</SelectItem>
                        <SelectItem value="Consumível">Consumível</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
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
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localização</FormLabel>
                    <FormControl>
                      <Input placeholder="Localização no estoque" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="supplier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fornecedor</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do fornecedor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unitPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço Unitário (R$)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
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
                name="minimumStock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estoque Mínimo</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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