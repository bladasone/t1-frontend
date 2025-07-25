import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, MenuItem, TextField, Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTaskStore } from '@/entities/task/taskstore';
// Варианты статуса задачи
const statusOptions = ['To Do', 'In Progress', 'Done'];
// Варианты приоритета задачи
const priorityOptions = ['Low', 'Medium', 'High'];
// Варианты категории задачи
const categoryOptions = [
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
    const { id } = useParams();
    // Состояния стора для работы с задачами
    const createTask = useTaskStore((state) => state.createTask);
    const updateTask = useTaskStore((state) => state.updateTask);
    const getTaskById = useTaskStore((state) => state.getTaskById);
    // Определение режима: редактирование или создание
    const isEditing = id !== undefined && id !== 'new';
    // Получаем существующую задачу по ID, если редактируем
    const existingTask = isEditing ? getTaskById(id) : null;
    // Локальное состояние формы
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To Do');
    const [priority, setPriority] = useState('Medium');
    const [category, setCategory] = useState('Feature');
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
        if (!title.trim())
            return;
        const taskData = {
            title,
            description,
            status,
            priority,
            category
        };
        if (isEditing && existingTask) {
            updateTask({ ...existingTask, ...taskData });
        }
        else {
            createTask(taskData);
        }
        navigate('/');
    };
    return (_jsxs(Box, { sx: { maxWidth: 600, mx: 'auto', mt: 4, p: 2 }, children: [_jsx(Typography, { variant: "h5", gutterBottom: true, children: isEditing ? 'Редактировать задачу' : 'Создать задачу' }), _jsxs(Stack, { spacing: 2, children: [_jsx(TextField, { label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", value: title, onChange: (e) => setTitle(e.target.value), fullWidth: true, required: true }), _jsx(TextField, { label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", value: description, onChange: (e) => setDescription(e.target.value), fullWidth: true, multiline: true, rows: 4 }), _jsx(TextField, { select: true, label: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F", value: category, onChange: (e) => setCategory(e.target.value), children: categoryOptions.map((option) => (_jsx(MenuItem, { value: option, children: option }, option))) }), _jsx(TextField, { select: true, label: "\u0421\u0442\u0430\u0442\u0443\u0441", value: status, onChange: (e) => setStatus(e.target.value), children: statusOptions.map((option) => (_jsx(MenuItem, { value: option, children: option }, option))) }), _jsx(TextField, { select: true, label: "\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442", value: priority, onChange: (e) => setPriority(e.target.value), children: priorityOptions.map((option) => (_jsx(MenuItem, { value: option, children: option }, option))) }), _jsxs(Box, { display: "flex", gap: 2, sx: { flexDirection: 'row-reverse', justifyContent: 'right' }, children: [_jsx(Button, { variant: "contained", color: "primary", onClick: handleSubmit, sx: { backgroundColor: '#3b8132' }, children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C" }), _jsx(Button, { variant: "outlined", onClick: () => navigate('/'), sx: { color: 'red', border: 'solid 2px red' }, children: "\u041E\u0442\u043C\u0435\u043D\u0430" })] })] })] }));
}
