export type TaskCategory = 'Баг' | 'Функцияг' | 'Документация' | 'Рефракторинг' | 'Тест';
export type TaskStatus = 'Предстоит выполнить' | 'В процессе' | 'Выполнено';
export type TaskPriority = 'Маловажно' | 'Важно' | 'Очень важно';

export interface Task {
    id: string;
    title: string;
    description?: string;
    category: TaskCategory;
    status: TaskStatus;
    priority: TaskPriority;
}