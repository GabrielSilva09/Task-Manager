import request from 'supertest';
import app from '../src/app';
import * as TaskModel from '../src/models/taskModel';

jest.mock('../src/models/taskModel');

describe('API de Tarefas - /tasks', () => {
  
  // Limpa os mocks antes de cada teste para não haver interferência
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve criar uma tarefa com sucesso (Status 201)', async () => {
    // Mock do retorno do banco
    const mockTask = {
      id: 1,
      titulo: 'Tarefa de Teste',
      descricao: 'Descrição do teste',
      status: 'pendente',
      criado_em: new Date()
    };
    (TaskModel.createTask as jest.Mock).mockResolvedValue(mockTask);

    // Disparo da requisição
    const response = await request(app)
      .post('/tasks')
      .send({
        titulo: 'Tarefa de Teste',
        descricao: 'Descrição do teste'
      });

    // Verificação
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body.titulo).toBe('Tarefa de Teste');
    expect(TaskModel.createTask).toHaveBeenCalledTimes(1);
  });

  it('Deve retornar erro 400 se o título não for enviado', async () => {
    // Manda sem título
    const response = await request(app)
      .post('/tasks')
      .send({
        descricao: 'Sem título'
      });

    // Verificação
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'O título é obrigatório.');
    // Garante que o banco de dados nem chegou a ser chamado
    expect(TaskModel.createTask).not.toHaveBeenCalled(); 
  });

  it('Deve retornar erro 400 se o status for inválido', async () => {
    // Manda status unvalido
    const response = await request(app)
      .post('/tasks')
      .send({
        titulo: 'teste sem status',
        status: 'status_invalido'
      });
    // Verificação
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Status inválido');
  });
});