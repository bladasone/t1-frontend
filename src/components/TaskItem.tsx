import React from 'react';
import type { Task } from '@/entities/task/types';
import { Box, Typography, Chip, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Пропсы компонента TaskItem
 * @property task - объект задачи с данными
 * @property onDelete - функция, вызываемая при удалении задачи
 * @property onEdit - функция, вызываемая при редактировании задачи
 */
interface TaskItemProps {
    task: Task;
    onDelete: () => void;
    onEdit: () => void;
}

/**
 * Компонент TaskItem
 * Отображает карточку задачи с основной информацией:
 * заголовок, описание, метки (категория, статус, приоритет), дата создания,
 * а также кнопки для удаления и редактирования.
 */
export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onEdit }) => {
    return (
        <Box
            sx={{
                border: '1px solid #ccc',
                borderRadius: 2,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                position: 'relative',
                backgroundColor: '#fafafa',
            }}
        >
            {/* Заголовок задачи */}
            <Typography variant="h6">{task.title}</Typography>

            {/* Описание задачи (если есть) */}
            {task.description && (
                <Typography variant="body2">{task.description}</Typography>
            )}

            {/* Метки: категория, статус, приоритет */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label={task.category} color="primary" size="small" />
                <Chip label={task.status} color="secondary" size="small" />
                <Chip label={task.priority} color="warning" size="small" />
            </Box>

            {/* Дата создания */}
            <Typography variant="caption" sx={{ mt: 1 }}>
                Создано: {new Date(task.createdAt).toLocaleDateString()}
            </Typography>

            {/* Кнопки удаления и редактирования */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, mt: 2 }}>
                <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={onDelete}
                >
                    <DeleteIcon fontSize="small" color="error" />
                </IconButton>

                <Button
                    variant="outlined"
                    size="small"
                    onClick={onEdit}
                    sx={{
                        border: 'solid #3b8132 1px',
                        color: '#3b8132',
                    }}
                >
                    Редактировать
                </Button>
            </Box>
        </Box>
    );
};
