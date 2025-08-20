import { useState, useEffect } from 'react';
import { partService } from '@/services/partService';
import type { Database } from '@/integrations/supabase/types';
import { toast } from '@/hooks/use-toast';

type Part = Database['public']['Tables']['parts']['Row'];
type InsertPart = Database['public']['Tables']['parts']['Insert'];
type UpdatePart = Database['public']['Tables']['parts']['Update'];

export const useParts = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParts = async () => {
    try {
      setLoading(true);
      const data = await partService.getAll();
      setParts(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar peças');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createPart = async (part: InsertPart) => {
    try {
      const newPart = await partService.create(part);
      setParts(prev => [newPart, ...prev]);
      toast({
        title: "Peça criada",
        description: "Peça criada com sucesso!"
      });
      return newPart;
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao criar peça",
        variant: "destructive"
      });
      throw err;
    }
  };

  const updatePart = async (id: string, part: UpdatePart) => {
    try {
      const updatedPart = await partService.update(id, part);
      setParts(prev => 
        prev.map(p => p.id === id ? updatedPart : p)
      );
      toast({
        title: "Peça atualizada",
        description: "Peça atualizada com sucesso!"
      });
      return updatedPart;
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar peça",
        variant: "destructive"
      });
      throw err;
    }
  };

  const deletePart = async (id: string) => {
    try {
      await partService.delete(id);
      setParts(prev => prev.filter(p => p.id !== id));
      toast({
        title: "Peça removida",
        description: "Peça removida com sucesso!"
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao remover peça",
        variant: "destructive"
      });
      throw err;
    }
  };

  const updateStock = async (id: string, quantity: number) => {
    try {
      const updatedPart = await partService.updateStock(id, quantity);
      setParts(prev => 
        prev.map(p => p.id === id ? updatedPart : p)
      );
      toast({
        title: "Estoque atualizado",
        description: "Estoque atualizado com sucesso!"
      });
      return updatedPart;
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar estoque",
        variant: "destructive"
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchParts();
  }, []);

  const lowStockParts = parts.filter(part => 
    part.status === 'low_stock' || part.quantity <= part.min_stock
  );

  return {
    parts,
    lowStockParts,
    loading,
    error,
    fetchParts,
    createPart,
    updatePart,
    deletePart,
    updateStock
  };
};