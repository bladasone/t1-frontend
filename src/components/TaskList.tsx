import { Box } from '@mui/material';
import { TaskItem } from './TaskItem';
import type {Task} from '@/entities/task/types';

interface TaskListProps {
    tasks: Task[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

export function TaskList({ tasks, onDelete, onEdit }: TaskListProps) {
    return (
        <>
            {tasks.map((task) => (
                <Box key={task.id} sx={{ width: 300 }}>
                    <TaskItem
                        task={task}
                        onDelete={() => onDelete(task.id)}
                        onEdit={() => onEdit(task.id)}
                    />
                </Box>
            ))}
        </>
    );
}
