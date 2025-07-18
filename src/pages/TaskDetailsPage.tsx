

import { useState } from 'react';
import {useNavigate, useLocation } from 'react-router-dom';
import {
    Box,
    TextField,
    Select,
    MenuItem,
    Button,
    Typography,
    FormControl,
    InputLabel
} from '@mui/material';
import type { Task } from '../types';

export default function TaskDetailsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [task, setTask] = useState<Task>(location.state.task);

    const handleSave = () => {
        navigate('/', { state: { updatedTask: task } });
    };

    if (!task) return <div>Задача не найдена</div>;

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
                Редактирование задачи
            </Typography>

            <TextField
                label="Название"
                value={task.title}
                onChange={(e) => setTask({...task, title: e.target.value})}
                fullWidth
                sx={{ mb: 3 }}
            />

            <TextField
                label="Описание"
                value={task.description}
                onChange={(e) => setTask({...task, description: e.target.value})}
                multiline
                rows={4}
                fullWidth
                sx={{ mb: 3 }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Категория</InputLabel>
                <Select
                    value={task.category}
                    label="Категория"
                    onChange={(e) => setTask({...task, category: e.target.value as Task['category']})}
                >
                    {['Баг', 'Функция', 'Документация', 'Рефакторинг', 'Тест'].map((cat) => (
                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Статус</InputLabel>
                <Select
                    value={task.status}
                    label="Статус"
                    onChange={(e) => setTask({...task, status: e.target.value as Task['status']})}
                >
                    {['Предстоит выполнить', 'В процессе', 'Выполнено'].map((status) => (
                        <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Приоритет</InputLabel>
                <Select
                    value={task.priority}
                    label="Приоритет"
                    onChange={(e) => setTask({...task, priority: e.target.value as Task['priority']})}
                >
                    {['Маловажно', 'Важно', 'Очень важно'].map((priority) => (
                        <MenuItem key={priority} value={priority}>{priority}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                    variant="outlined"
                    sx={{ border: 'solid 1px #3b8132', color: '#3b8132' }}
                    onClick={() => navigate('/')}
                >
                    Отмена
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    sx={{ bgcolor: '#3b8132' }}
                >
                    Сохранить
                </Button>
            </Box>
        </Box>
    );
}