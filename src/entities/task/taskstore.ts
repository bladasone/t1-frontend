import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { Task } from './types';

interface TaskStore {
    tasks: Task[];
    createTask: (taskData: Omit<Task, 'id' | 'createdAt'>) => void;
    updateTask: (updatedTask: Task) => void;
    deleteTask: (id: string) => void;
    getTaskById: (id: string) => Task | undefined;
}

const LOCAL_STORAGE_KEY = 'tasks';

const loadTasks = (): Task[] => {
    try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const saveTasks = (tasks: Task[]) => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
        console.error('Ошибка при сохранении задач в localStorage:', e);
    }
};

export const useTaskStore = create<TaskStore>((set, get) => ({
    tasks: loadTasks(),

    createTask: (taskData) => {
        const newTask: Task = {
            id: nanoid(),
            createdAt: new Date().toISOString(),
            ...taskData,
        };
        const updatedTasks = [...get().tasks, newTask];
        saveTasks(updatedTasks);
        set({ tasks: updatedTasks });
    },

    updateTask: (updatedTask) => {
        const updatedTasks = get().tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
        );
        saveTasks(updatedTasks);
        set({ tasks: updatedTasks });
    },

    deleteTask: (id) => {
        const updatedTasks = get().tasks.filter((task) => task.id !== id);
        saveTasks(updatedTasks);
        set({ tasks: updatedTasks });
    },

    getTaskById: (id) => get().tasks.find((task) => task.id === id),
}));
