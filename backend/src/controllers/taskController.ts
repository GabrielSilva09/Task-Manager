import { Request, Response } from 'express';
import * as TaskModel from '../models/taskModel';

const STATUS_VALIDOS = ['pendente', 'em andamento', 'concluída'];

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { titulo, descricao, status } = req.body;

    if (!titulo) {
      res.status(400).json({ error: 'O título é obrigatório.' });
      return;
    }

    if (status && !STATUS_VALIDOS.includes(status)) {
      res.status(400).json({ error: `Status inválido. Use: ${STATUS_VALIDOS.join(', ')}` });
      return;
    }

    // Se o status não for enviado, o padrão será 'pendente'
    const statusFinal = status ? String(status) : 'pendente';
    const descFinal = descricao ? String(descricao) : '';

    const newTask = await TaskModel.createTask(String(titulo), descFinal, statusFinal);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Erro no POST /tasks:", error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const status = req.query.status ? String(req.query.status) : undefined;
    

    const tasks = await TaskModel.getAllTasks(page, limit, status);
    res.status(200).json({ data: tasks });
  } catch (error) {
    console.error("Erro no GET /tasks:", error);
    res.status(500).json({ error: 'Erro ao buscar tarefas.' });
  }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const task = await TaskModel.getTaskById(id);

    if (!task) {
      res.status(404).json({ error: 'Tarefa não encontrada.' });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(`Erro no GET /tasks/${req.params.id}:`, error);
    res.status(500).json({ error: 'Erro ao buscar a tarefa.' });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const { titulo, descricao, status } = req.body;

    if (!titulo || !status) {
      res.status(400).json({ error: 'Título e status são obrigatórios para atualização.' });
      return;
    }

    if (!STATUS_VALIDOS.includes(status)) {
      res.status(400).json({ error: 'Status inválido.' });
      return;
    }

    const descFinal = descricao ? String(descricao) : '';

    const updatedTask = await TaskModel.updateTask(id, String(titulo), descFinal, String(status));

    if (!updatedTask) {
      res.status(404).json({ error: 'Tarefa não encontrada para atualizar.' });
      return;
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(`Erro no PUT /tasks/${req.params.id}:`, error);
    res.status(500).json({ error: 'Erro ao atualizar a tarefa.' });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const deletedTask = await TaskModel.deleteTask(id);

    if (!deletedTask) {
      res.status(404).json({ error: 'Tarefa não encontrada para exclusão.' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error(`Erro no DELETE /tasks/${req.params.id}:`, error);
    res.status(500).json({ error: 'Erro ao deletar a tarefa.' });
  }
};