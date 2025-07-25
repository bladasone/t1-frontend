import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import { useTaskStore } from '@/entities/task/taskstore';

/**
 * Компонент страницы создания и редактирования задачи.
 * Использует URL параметр `id` для определения режима:
 * - если id есть и задача с таким id найдена — редактирование,
 * - иначе — создание новой задачи.
 */
export default function TaskFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    // Получаем из стора список задач и методы для создания/обновления задачи
    const tasks = useTaskStore((state) => state.tasks);
    const createTask = useTaskStore((state) => state.createTask);
    const updateTask = useTaskStore((state) => state.updateTask);

    // Ищем задачу для редактирования по id из параметров
    const editingTask = tasks.find((t) => t.id === id);

    // Локальное состояние формы с предзаполненными значениями, если редактируем
    const [title, setTitle] = useState(editingTask?.title || '');
    const [description, setDescription] = useState(editingTask?.description || '');
    const [category, setCategory] = useState(editingTask?.category || 'Bug');
    const [status, setStatus] = useState(editingTask?.status || 'To Do');
    const [priority, setPriority] = useState(editingTask?.priority || 'Low');

    /**
     * Обработчик отправки формы.
     * Собирает данные из локального состояния и вызывает соответствующий метод стора.
     * После сохранения выполняет переход на главную страницу со списком задач.
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const taskData = {
            title,
            description,
            category,
            status,
            priority,
        };

        if (editingTask) {
            // Обновляем существующую задачу, объединяя старые и новые данные
            updateTask({
                ...editingTask,
                ...taskData,
            });
        } else {
            // Создаем новую задачу
            createTask(taskData);
        }

        // Возвращаемся к списку задач
        navigate('/');
    };

    return (
        // Форма с обработчиком onSubmit
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
            {/* Заголовок формы меняется в зависимости от режима */}
            <Typography variant="h5" gutterBottom>
                {editingTask ? 'Редактировать задачу' : 'Создать задачу'}
            </Typography>

            {/* Поля формы */}
            <TextField
                label="Заголовок"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
                multiline
            />
            <TextField
                label="Категория"
                value={category}
                onChange={(e) => setCategory(e.target.value as 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test')}
                select
                fullWidth
                margin="normal"
            >
                <MenuItem value="Bug">Bug</MenuItem>
                <MenuItem value="Feature">Feature</MenuItem>
                <MenuItem value="Documentation">Documentation</MenuItem>
                <MenuItem value="Refactor">Refactor</MenuItem>
                <MenuItem value="Test">Test</MenuItem>
            </TextField>
            <TextField
                label="Статус"
                value={status}
                onChange={(e) => setStatus(e.target.value as 'To Do' | 'In Progress' | 'Done')}
                select
                fullWidth
                margin="normal"
            >
                <MenuItem value="To Do">To Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
            </TextField>

            <TextField
                label="Приоритет"
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
                select
                fullWidth
                margin="normal"
            >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
            </TextField>

            {/* Кнопки управления */}
            <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'right' }}>
                <Button type="submit" variant="contained" sx={{ backgroundColor: '#3b8132' }}>
                    Сохранить
                </Button>
                <Button variant="outlined" onClick={() => navigate('/')} sx={{ color: 'red', border: 'solid 2px red' }}>
                    Отмена
                </Button>
            </Box>
        </Box>
    );
}
