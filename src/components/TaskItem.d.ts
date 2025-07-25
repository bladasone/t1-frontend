import React from 'react';
import type { Task } from '@/entities/task/types';
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
export declare const TaskItem: React.FC<TaskItemProps>;
export {};
