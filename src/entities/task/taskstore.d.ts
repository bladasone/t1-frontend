import type { Task } from './types';
interface TaskStore {
    tasks: Task[];
    createTask: (taskData: Omit<Task, 'id' | 'createdAt'>) => void;
    updateTask: (updatedTask: Task) => void;
    deleteTask: (id: string) => void;
    getTaskById: (id: string) => Task | undefined;
}
export declare const useTaskStore: import("zustand").UseBoundStore<import("zustand").StoreApi<TaskStore>>;
export {};
