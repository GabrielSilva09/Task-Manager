import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onUpdateStatus: (id: number, task: Task, status: string) => void;
  onDelete: (id: number) => void;
}

export const TaskItem = ({ task, onUpdateStatus, onDelete }: TaskItemProps) => {
  const dataFormatada = new Date(task.criado_em).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  const statusClass = `status-${task.status.replace(' ', '-')}`;

  return (
    <div className={`task-card ${statusClass}`}>
      <div className="task-header">
        <h3>{task.titulo}</h3>
        <span className="task-date">{dataFormatada}</span>
      </div>
      
      <p className="task-desc">{task.descricao || 'Sem descrição.'}</p>
      
      <div className="task-actions">
        <select 
          className="status-select"
          value={task.status} 
          onChange={(e) => onUpdateStatus(task.id, task, e.target.value)}
        >
          <option value="pendente">Pendente</option>
          <option value="em andamento">Em Andamento</option>
          <option value="concluída">Concluída</option>
        </select>

        <button className="btn-delete" onClick={() => onDelete(task.id)}>
          Excluir
        </button>
      </div>
    </div>
  );
};