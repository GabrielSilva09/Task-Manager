import { useState, FormEvent } from 'react';

interface TaskFormProps {
    onAddTask: (titulo: string, descricao: string) => Promise<void>;
}

export const TaskForm = ({ onAddTask }: TaskFormProps) => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!titulo.trim()) return;

        setIsSubmitting(true);
        try {
            await onAddTask(titulo, descricao);
            setTitulo('');
            setDescricao('');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form className="task-form" onSubmit={handleSubmit}>
                <h2>Nova Tarefa</h2>
                <input
                    type="text"
                    placeholder="Título da tarefa *"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                    disabled={isSubmitting}
                />
                <textarea
                    placeholder="Descrição (opcional)"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    disabled={isSubmitting}
                    rows={3}
                />
                <button type="submit" disabled={isSubmitting || !titulo.trim()}>
                    {isSubmitting ? 'Salvando...' : 'Criar Tarefa'}
                </button>
            </form>
        </>
    );
};