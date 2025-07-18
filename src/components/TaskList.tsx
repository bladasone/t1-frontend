

import { Box, Typography } from '@mui/material';
import TaskItem from './TaskItem';
import type { Task } from '../types';

interface TaskListProps {
    tasks: Task[];
    onTaskDelete?: (id: string) => void;
    onTaskEdit?: (task: Task) => void;
    emptyMessage?: string;
}

export default function TaskList({
                                     tasks,
                                     onTaskDelete,
                                     onTaskEdit,
                                     emptyMessage = "Задачи не найдены"
                                 }: TaskListProps) {
    if (!tasks || tasks.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', p: 4 }}>
                <Typography variant="h6">{emptyMessage}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 3,
            p: 2
        }}>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onDelete={onTaskDelete}
                    onEdit={onTaskEdit}
                />
            ))}
        </Box>
    );
}