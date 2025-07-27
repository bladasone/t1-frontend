import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { Task, TaskFilter } from './types';
import * as api from '../../api/api';

interface TaskStore {
    tasks: Task[];
    createTask: (taskData: Omit<Task, 'id' | 'createdAt'>) => void;
    updateTask: (updatedTask: Task) => void;
    deleteTask: (id: string) => void;
    getTaskById: (id: string) => Task | undefined;
    loadTasks: (filter?: TaskFilter) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],

    loadTasks: (filter) => {
        const tasks = api.getTasks(filter);
        set({ tasks });
    },

    createTask: (taskData) => {
        const newTask: Task = {
            id: nanoid(),
            createdAt: new Date().toISOString(),
            ...taskData,
        };
        api.createTask(newTask);
        set({ tasks: api.getTasks() });
    },

    updateTask: (updatedTask) => {
        api.updateTask(updatedTask);
        set({ tasks: api.getTasks() });
    },

    deleteTask: (id) => {
        api.deleteTask(id);
        set({ tasks: api.getTasks() });
    },

    getTaskById: (id) => api.getTaskById(id),
}));
