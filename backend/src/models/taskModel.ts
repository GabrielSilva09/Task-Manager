import { pool } from '../database';

export interface Task {
  id?: number;
  titulo: string;
  descricao?: string;
  status?: string;
  criado_em?: Date;
}

export const createTask = async (titulo: string, descricao: string, status: string = 'pendente') => {
  const query = 'INSERT INTO tasks (titulo, descricao, status) VALUES ($1, $2, $3) RETURNING *';
  const result = await pool.query(query, [titulo, descricao, status]);
  return result.rows[0];
};

export const getAllTasks = async (page: number, limit: number, status?: string) => {
  const offset = (page - 1) * limit;
  
  // Construção da query de contagem
  let countQuery = 'SELECT COUNT(*) FROM tasks';
  const countValues: any[] = [];

  if (status) {
    countQuery += ' WHERE status = $1';
    countValues.push(status);
  }

  // Construção da query de dados
  let dataQuery = 'SELECT * FROM tasks';
  const dataValues: any[] = [];

  if (status) {
    dataQuery += ' WHERE status = $1';
    dataValues.push(status);
  }

  dataQuery += ` ORDER BY criado_em DESC LIMIT $${dataValues.length + 1} OFFSET $${dataValues.length + 2}`;
  dataValues.push(limit, offset);

  try {
    // Execução das queries no banco
    const { rows: data } = await pool.query(dataQuery, dataValues);
    const { rows: countResult } = await pool.query(countQuery, countValues);
    
    const total = Number(countResult[0].count);

    return {
      total, 
      page,
      limit,
      data   
    };
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    throw error;
  }
};

export const getTaskById = async (id: number) => {
  const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
  return result.rows[0];
};

export const updateTask = async (id: number, titulo: string, descricao: string, status: string) => {
  const query = `
    UPDATE tasks 
    SET titulo = $1, descricao = $2, status = $3 
    WHERE id = $4 RETURNING *
  `;
  const result = await pool.query(query, [titulo, descricao, status, id]);
  return result.rows[0];
};

export const deleteTask = async (id: number) => {
  const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};