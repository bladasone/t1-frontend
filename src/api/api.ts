import type { Task, TaskFilter } from '@/entities/task/types';

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
        console.error('Ошибка при сохранении задач:', e);
    }
};

export function getTasks(filter?: TaskFilter): Task[] {
    let tasks = loadTasks();

    if (filter) {
        if (filter.title) {
            const titleLower = filter.title.toLowerCase();
            tasks = tasks.filter(task => task.title.toLowerCase().includes(titleLower));
        }
        if (filter.date) {
            tasks = tasks.filter(task => task.createdAt.includes(filter.date!));
        }
    }

    return tasks;
}

export function getTaskById(id: string): Task | undefined {
    const tasks = loadTasks();
    return tasks.find(task => task.id === id);
}

export function createTask(task: Task) {
    const tasks = loadTasks();
    tasks.push(task);
    saveTasks(tasks);
}

export function updateTask(updatedTask: Task) {
    const tasks = loadTasks();
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
        tasks[index] = updatedTask;
        saveTasks(tasks);
    }
}

export function deleteTask(id: string) {
    let tasks = loadTasks();
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
}
