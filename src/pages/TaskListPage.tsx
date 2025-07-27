import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '@/entities/task/taskstore';
import { Box, Button } from '@mui/material';
import { TaskList } from '@/components/TaskList';

export default function TaskListPage() {
    const tasks = useTaskStore((state) => state.tasks);
    const deleteTask = useTaskStore((state) => state.deleteTask);
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                p: 3,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <TaskList tasks={tasks} onDelete={deleteTask} onEdit={(id) => navigate(`/task/${id}`)} />

            <Button
                variant="contained"
                onClick={() => navigate('/task/new')}
                sx={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '35px',
                    backgroundColor: '#3b8132',
                    fontSize: '30px',
                }}
            >
                +
            </Button>
        </Box>
    );
}
