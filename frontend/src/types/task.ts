export interface Task {
    id: number;
    titulo: string;
    descricao: string;
    status: 'pendente' | 'em andamento' | 'concluída';
    criado_em: string;
  }