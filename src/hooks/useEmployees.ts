import { useState, useEffect } from 'react';
import { employeeService } from '@/services/employeeService';
import type { Database } from '@/integrations/supabase/types';
import { toast } from '@/hooks/use-toast';

type Employee = Database['public']['Tables']['employees']['Row'];
type InsertEmployee = Database['public']['Tables']['employees']['Insert'];
type UpdateEmployee = Database['public']['Tables']['employees']['Update'];

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeeService.getAll();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar funcionários');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (employee: InsertEmployee) => {
    try {
      const newEmployee = await employeeService.create(employee);
      setEmployees(prev => [newEmployee, ...prev]);
      toast({
        title: "Funcionário criado",
        description: "Funcionário criado com sucesso!"
      });
      return newEmployee;
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao criar funcionário",
        variant: "destructive"
      });
      throw err;
    }
  };

  const updateEmployee = async (id: string, employee: UpdateEmployee) => {
    try {
      const updatedEmployee = await employeeService.update(id, employee);
      setEmployees(prev => 
        prev.map(emp => emp.id === id ? updatedEmployee : emp)
      );
      toast({
        title: "Funcionário atualizado",
        description: "Funcionário atualizado com sucesso!"
      });
      return updatedEmployee;
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar funcionário",
        variant: "destructive"
      });
      throw err;
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      await employeeService.delete(id);
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      toast({
        title: "Funcionário removido",
        description: "Funcionário removido com sucesso!"
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao remover funcionário",
        variant: "destructive"
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    error,
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
  };
};