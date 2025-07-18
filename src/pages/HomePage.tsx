import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import TaskList from '../components/TaskList';
import AddIcon from '@mui/icons-material/Add';
import type { Task } from '../types';

export default function HomePage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({
        title: '',
        description: '',
        category: 'Баг',
        status: 'Предстоит выполнить',
        priority: 'Маловажно'
    });

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) setTasks(JSON.parse(savedTasks));
    }, []);

    useEffect(() => {
        if (location.state?.updatedTask) {
            const updatedTask = location.state.updatedTask;

            setTasks(prevTasks => {
                const newTasks = prevTasks.map(t =>
                    t.id === updatedTask.id ? updatedTask : t
                );
                localStorage.setItem('tasks', JSON.stringify(newTasks));
                return newTasks;
            });

            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, navigate, location.pathname]);

    const addTask = () => {
        const taskWithId: Task = {
            ...newTask,
            id: Date.now().toString()
        };
        const newTasks = [...tasks, taskWithId];
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));

        setIsAddDialogOpen(false);
        setNewTask({
            title: '',
            description: '',
            category: 'Баг',
            status: 'Предстоит выполнить',
            priority: 'Маловажно'
        });
    };

    const deleteTask = (id: string) => {
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    const handleTaskEdit = (task: Task) => {
        navigate(`/task/${task.id}`, { state: { task } });
    };

    return (
        <Box sx={{ textAlign: 'center', p: 3 }}>
            <Typography variant="h4" sx={{ my: 3 }}>
                Управление задачами
            </Typography>

            <TaskList
                tasks={tasks}
                onTaskDelete={deleteTask}
                onTaskEdit={handleTaskEdit}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: '#3b8132',
                        borderRadius: '50%',
                        minWidth: '40px',
                        width: '40px',
                        height: '40px',
                        padding: 0,
                        '&:hover': {
                            bgcolor: '#2a6122',
                            transform: 'scale(1.1)',
                            transition: 'transform 0.2s'
                        }
                    }}
                    onClick={() => setIsAddDialogOpen(true)}
                    aria-label="Добавить задачу"
                >
                    <AddIcon fontSize="medium" />
                </Button>
            </Box>

            <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)}>
                <DialogTitle>Добавление новой задачи</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Название"
                        fullWidth
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Описание"
                        fullWidth
                        multiline
                        rows={4}
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Категория</InputLabel>
                        <Select
                            value={newTask.category}
                            label="Категория"
                            onChange={(e) =>
                                setNewTask({ ...newTask, category: e.target.value as Task['category'] })
                            }
                        >
                            {['Баг', 'Функция', 'Документация', 'Рефакторинг', 'Тест'].map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Статус</InputLabel>
                        <Select
                            value={newTask.status}
                            label="Статус"
                            onChange={(e) =>
                                setNewTask({ ...newTask, status: e.target.value as Task['status'] })
                            }
                        >
                            {['Предстоит выполнить', 'В процессе', 'Выполнено'].map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Приоритет</InputLabel>
                        <Select
                            value={newTask.priority}
                            label="Приоритет"
                            onChange={(e) =>
                                setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })
                            }
                        >
                            {['Маловажно', 'Важно', 'Очень важно'].map((priority) => (
                                <MenuItem key={priority} value={priority}>
                                    {priority}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsAddDialogOpen(false)}>Отмена</Button>
                    <Button onClick={addTask} disabled={!newTask.title}>
                        Добавить
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
