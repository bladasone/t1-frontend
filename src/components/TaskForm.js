import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, MenuItem, TextField, Typography, } from '@mui/material';
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
    const handleSubmit = (e) => {
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
        }
        else {
            // Создаем новую задачу
            createTask(taskData);
        }
        // Возвращаемся к списку задач
        navigate('/');
    };
    return (
    // Форма с обработчиком onSubmit
    _jsxs(Box, { component: "form", onSubmit: handleSubmit, sx: { p: 3, maxWidth: 600, mx: 'auto' }, children: [_jsx(Typography, { variant: "h5", gutterBottom: true, children: editingTask ? 'Редактировать задачу' : 'Создать задачу' }), _jsx(TextField, { label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", value: title, onChange: (e) => setTitle(e.target.value), fullWidth: true, margin: "normal", required: true }), _jsx(TextField, { label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", value: description, onChange: (e) => setDescription(e.target.value), fullWidth: true, margin: "normal", multiline: true }), _jsxs(TextField, { label: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F", value: category, onChange: (e) => setCategory(e.target.value), select: true, fullWidth: true, margin: "normal", children: [_jsx(MenuItem, { value: "Bug", children: "Bug" }), _jsx(MenuItem, { value: "Feature", children: "Feature" }), _jsx(MenuItem, { value: "Documentation", children: "Documentation" }), _jsx(MenuItem, { value: "Refactor", children: "Refactor" }), _jsx(MenuItem, { value: "Test", children: "Test" })] }), _jsxs(TextField, { label: "\u0421\u0442\u0430\u0442\u0443\u0441", value: status, onChange: (e) => setStatus(e.target.value), select: true, fullWidth: true, margin: "normal", children: [_jsx(MenuItem, { value: "To Do", children: "To Do" }), _jsx(MenuItem, { value: "In Progress", children: "In Progress" }), _jsx(MenuItem, { value: "Done", children: "Done" })] }), _jsxs(TextField, { label: "\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442", value: priority, onChange: (e) => setPriority(e.target.value), select: true, fullWidth: true, margin: "normal", children: [_jsx(MenuItem, { value: "Low", children: "Low" }), _jsx(MenuItem, { value: "Medium", children: "Medium" }), _jsx(MenuItem, { value: "High", children: "High" })] }), _jsxs(Box, { sx: { mt: 2, display: 'flex', gap: 2, justifyContent: 'right' }, children: [_jsx(Button, { type: "submit", variant: "contained", sx: { backgroundColor: '#3b8132' }, children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C" }), _jsx(Button, { variant: "outlined", onClick: () => navigate('/'), sx: { color: 'red', border: 'solid 2px red' }, children: "\u041E\u0442\u043C\u0435\u043D\u0430" })] })] }));
}
