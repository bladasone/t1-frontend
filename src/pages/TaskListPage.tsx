import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '@/entities/task/taskstore';
import { Box, Button } from '@mui/material';
import { TaskItem } from '@/components/TaskItem';

/**
 * Компонент страницы со списком задач.
 * Отображает все задачи из стора и предоставляет возможность
 * удалить или отредактировать задачу.
 * Также содержит кнопку для перехода к созданию новой задачи.
 */
export default function TaskListPage() {
    // Получаем список задач и метод удаления из стора
    const tasks = useTaskStore((state) => state.tasks);
    const deleteTask = useTaskStore((state) => state.deleteTask);

    // Навигация по маршрутам
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                p: 3,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {/* Отображение каждой задачи */}
            {tasks.map((task) => (
                <Box key={task.id} sx={{ width: 300 }}>
                    <TaskItem
                        task={task}
                        onDelete={() => deleteTask(task.id)} // Удаление задачи
                        onEdit={() => navigate(`/task/${task.id}`)} // Переход к редактированию
                    />
                </Box>
            ))}

            {/* Кнопка для создания новой задачи */}
            <Button
                variant="contained"
                onClick={() => navigate('/task/new')}
                sx={{
                    width: '70px',
                    height: '70px',
                    border: '1',
                    borderRadius: '35px',
                    backgroundColor: '#3b8132',
                    fontSize: '30px'
                }}
            >
+
            </Button>
        </Box>
    );
}
