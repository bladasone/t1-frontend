import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Box, Typography, Chip, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
/**
 * Компонент TaskItem
 * Отображает карточку задачи с основной информацией:
 * заголовок, описание, метки (категория, статус, приоритет), дата создания,
 * а также кнопки для удаления и редактирования.
 */
export const TaskItem = ({ task, onDelete, onEdit }) => {
    return (_jsxs(Box, { sx: {
            border: '1px solid #ccc',
            borderRadius: 2,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            position: 'relative',
            backgroundColor: '#fafafa',
        }, children: [_jsx(Typography, { variant: "h6", children: task.title }), task.description && (_jsx(Typography, { variant: "body2", children: task.description })), _jsxs(Box, { sx: { display: 'flex', gap: 1, flexWrap: 'wrap' }, children: [_jsx(Chip, { label: task.category, color: "primary", size: "small" }), _jsx(Chip, { label: task.status, color: "secondary", size: "small" }), _jsx(Chip, { label: task.priority, color: "warning", size: "small" })] }), _jsxs(Typography, { variant: "caption", sx: { mt: 1 }, children: ["\u0421\u043E\u0437\u0434\u0430\u043D\u043E: ", new Date(task.createdAt).toLocaleDateString()] }), _jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', gap: 1, mt: 2 }, children: [_jsx(IconButton, { "aria-label": "delete", size: "small", onClick: onDelete, children: _jsx(DeleteIcon, { fontSize: "small", color: "error" }) }), _jsx(Button, { variant: "outlined", size: "small", onClick: onEdit, sx: {
                            border: 'solid #3b8132 1px',
                            color: '#3b8132',
                        }, children: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C" })] })] }));
};
