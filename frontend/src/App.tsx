import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskItem } from './components/TaskItem';
import './App.css';

function App() {
  const { 
    tasks, loading, error, addTask, updateTaskStatus, deleteTask,
    currentPage, totalPages, totalTasks, statusFilter, changePage, changeFilter 
  } = useTasks();

  return (
    <div className="container">
      <header className="app-header">
        <h1>Gestor de Tarefas</h1>
      </header>
      
      {error && <div className="alert-error">{error}</div>}

      <TaskForm onAddTask={addTask} />

      <div className="controls-bar">
        <h2>Lista de tarefas</h2>
        <div className="filter-group">
          <label>Filtro:</label>
          <select 
            value={statusFilter} 
            onChange={(e) => changeFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">Todas</option>
            <option value="pendente">Pendentes</option>
            <option value="em andamento">Em Andamento</option>
            <option value="concluída">Concluídas</option>
          </select>
        </div>
      </div>

      <div className="task-list">
        {loading && (
          <div className="loading-wrapper">
          <div className="spinner"></div>
            <p className="loading-text">Sincronizando tarefas...</p>
          </div>
        )}
        {!loading && tasks.length === 0 && (
          <div className="empty-state">Nenhuma tarefa encontrada.</div>
        )}

        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onUpdateStatus={updateTaskStatus}
            onDelete={deleteTask}
          />
        ))}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            disabled={currentPage === 1 || loading}
            onClick={() => changePage(currentPage - 1)}
            className="btn-page"
          >
            &larr; Anterior
          </button>
          
          <div className="page-info">
            <span className="current">Página {currentPage} de {totalPages}</span>
            <small className="count">{totalTasks} tarefas encontradas</small>
          </div>
          
          <button 
            disabled={currentPage >= totalPages || loading}
            onClick={() => changePage(currentPage + 1)}
            className="btn-page"
          >
            Próxima &rarr;
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
