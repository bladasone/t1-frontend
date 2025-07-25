import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    Stack
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTaskStore } from '@/entities/task/taskstore';
import type { Category, Priority, Status } from '@/entities/task/types';

// Варианты статуса задачи
const statusOptions: Status[] = ['To Do', 'In Progress', 'Done'];

// Варианты приоритета задачи
const priorityOptions: Priority[] = ['Low', 'Medium', 'High'];

// Варианты категории задачи
const categoryOptions: Category[] = [
    'Bug',
    'Feature',
    'Documentation',
    'Refactor',
    'Test'
];

/**
 * Страница формы для создания или редактирования задачи.
 * Определяет по параметру URL, создаём мы задачу или редактируем существующую.
 */
export default function TaskFormPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // Состояния стора для работы с задачами
    const createTask = useTaskStore((state) => state.createTask);
    const updateTask = useTaskStore((state) => state.updateTask);
    const getTaskById = useTaskStore((state) => state.getTaskById);

    // Определение режима: редактирование или создание
    const isEditing = id !== undefined && id !== 'new';

    // Получаем существующую задачу по ID, если редактируем
    const existingTask = isEditing ? getTaskById(id!) : null;

    // Локальное состояние формы
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<Status>('To Do');
    const [priority, setPriority] = useState<Priority>('Medium');
    const [category, setCategory] = useState<Category>('Feature');

    // При загрузке задачи — заполняем поля для редактирования
    useEffect(() => {
        if (isEditing && existingTask) {
            setTitle(existingTask.title);
            setDescription(existingTask.description ?? '');
            setStatus(existingTask.status);
            setPriority(existingTask.priority);
            setCategory(existingTask.category);
        }
    }, [isEditing, existingTask]);

    /**
     * Обработчик сохранения формы:
     * - При редактировании — обновляет задачу
     * - При создании — создаёт новую задачу
     */
    const handleSubmit = () => {
        if (!title.trim()) return;

        const taskData = {
            title,
            description,
            status,
            priority,
            category
        };

        if (isEditing && existingTask) {
            updateTask({ ...existingTask, ...taskData });
        } else {
            createTask(taskData);
        }

        navigate('/');
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
            <Typography variant="h5" gutterBottom>
                {isEditing ? 'Редактировать задачу' : 'Создать задачу'}
            </Typography>

            <Stack spacing={2}>
                <TextField
                    label="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                />

                <TextField
                    label="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                />

                <TextField
                    select
                    label="Категория"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                >
                    {categoryOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Статус"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Status)}
                >
                    {statusOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Приоритет"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                >
                    {priorityOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                {/* Кнопки сохранения и отмены */}
                <Box
                    display="flex"
                    gap={2}
                    sx={{ flexDirection: 'row-reverse', justifyContent: 'right' }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ backgroundColor: '#3b8132' }}
                    >
                        Сохранить
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/')}
                        sx={{ color: 'red', border: 'solid 2px red' }}
                    >
                        Отмена
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}
