

import { Card, CardContent, Chip, Button, Stack, Typography, IconButton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import type { Task } from '../types';

interface TaskItemProps {
    task: Task;
    onDelete?: (id: string) => void;
    onEdit?: (task: Task) => void;
}

export default function TaskItem({ task, onDelete, onEdit }: TaskItemProps) {
    const navigate = useNavigate();

    const getPriorityColor = () => {
        switch (task.priority) {
            case 'Очень важно': return 'error';
            case 'Важно': return 'warning';
            default: return 'success';
        }
    };

    return (
        <Card sx={{
            border: 'solid 2px',
            height: '100%',
            width: '20vw',
            minWidth: '250px',
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'scale(1.02)',
            }
        }}>
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center'
                }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {task.title}
                    </Typography>
                    {onDelete && (
                        <IconButton
                            onClick={() => onDelete(task.id)}
                            color="error"
                            size="small"
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>

                {task.description && (
                    <Typography variant="body2" color="text.secondary" sx={{
                        mb: 1,
                        textAlign: 'center'
                    }}>
                        {task.description}
                    </Typography>
                )}

                <Stack sx={{ mb: 2, width: '100%' }} gap={1}>
                    <Chip
                        label={task.category}
                        sx={{ borderRadius: '10px', width: '100%' }}
                    />
                    <Chip
                        label={task.status}
                        variant="outlined"
                        sx={{ borderRadius: '10px', width: '100%' }}
                    />
                    <Chip
                        label={task.priority}
                        color={getPriorityColor()}
                        sx={{ borderRadius: '10px', width: '100%' }}
                    />
                </Stack>

                <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => onEdit ? onEdit(task) : navigate(`/task/${task.id}`)}
                        sx={{
                            flexGrow: 1,
                            bgcolor: '#187bcd',
                            '&:hover': { bgcolor: '#1167b1' }
                        }}
                    >
                        Редактировать
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}