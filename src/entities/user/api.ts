import type { User, UserFormData } from './types';

const LOCAL_STORAGE_KEY = 'users';

const loadUsers = (): User[] => {
    try {
        const json = localStorage.getItem(LOCAL_STORAGE_KEY);
        return json ? JSON.parse(json) : [];
    } catch {
        return [];
    }
};

const saveUsers = (users: User[]) => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
        console.error('Ошибка сохранения пользователей', e);
    }
};

export function getUsers(): User[] {
    return loadUsers();
}

export function getUserById(id: string): User | undefined {
    return loadUsers().find(user => user.id === id);
}

// При создании пароля в форме может не быть id, но пароль должен быть обязательно
export function createUser(userData: UserFormData) {
    if (!userData.password) throw new Error("Password required");
    const users = loadUsers();
    const newUser: User = { ...userData, id: Date.now().toString(), password: userData.password };
    users.push(newUser);
    saveUsers(users);
}

export function updateUser(updatedUser: User) {
    const users = loadUsers();
    const idx = users.findIndex(u => u.id === updatedUser.id);
    if (idx !== -1) {
        users[idx] = updatedUser;
        saveUsers(users);
    }
}

export function deleteUser(id: string) {
    const users = loadUsers().filter(u => u.id !== id);
    saveUsers(users);
}
