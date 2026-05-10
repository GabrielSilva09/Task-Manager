import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { Task } from '../types/task';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Estados da paginação e filtro
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const limit = 4; // Quantidade de itens por página

  const fetchTasks = useCallback(async (page: number, status: string) => {
    setLoading(true);
    try {
      // Criação dos parametros da query
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      if (status) params.append('status', status);
      // Resposta da API
      const response = await api.get(`/tasks?${params.toString()}`);
      
      setTasks(response.data.data.data || []);
      setTotalTasks(response.data.data.total || 0);
    } catch (err) {
      setError('Erro na requisição da API. Verifique se o backend está ativo.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Calcula o total de páginas
  const totalPages = Math.ceil(Number(totalTasks) / limit);

  // Funções da navegação
  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchTasks(newPage, statusFilter);
    }
  };

  const changeFilter = (newStatus: string) => {
    setStatusFilter(newStatus);
    setCurrentPage(1);
    fetchTasks(1, newStatus);
  };

  // Funções de ação
  const addTask = async (titulo: string, descricao: string) => {
    await api.post('/tasks', { titulo, descricao });
    await fetchTasks(currentPage, statusFilter);
  };

  const updateTaskStatus = async (id: number, task: Task, status: string) => {
    await api.put(`/tasks/${id}`, { ...task, status });
    await fetchTasks(currentPage, statusFilter);
  };

  const deleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    const isLastItemInPage = tasks.length === 1 && currentPage > 1;
    const pageToFetch = isLastItemInPage ? currentPage - 1 : currentPage;
    if (isLastItemInPage) setCurrentPage(pageToFetch);
    await fetchTasks(pageToFetch, statusFilter);
  };

  useEffect(() => {
    fetchTasks(1, '');
  }, [fetchTasks]);

  return {
    tasks, loading, error, currentPage, totalPages, totalTasks, statusFilter,
    changePage, changeFilter, addTask, updateTaskStatus, deleteTask
  };
};