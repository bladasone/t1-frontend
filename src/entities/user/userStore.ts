import create from 'zustand';
import { User, UserFormData } from './types';

interface UserState {
    users: User[];
    getUserById: (id: string) => User | undefined;
    updateUser: (updatedUser: User) => void;
    createUser: (user: User) => void;
    deleteUser: (id: string) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
    users: [],

    getUserById: (id) => get().users.find(user => user.id === id),

    updateUser: (updatedUser) =>
        set((state) => ({
            users: state.users.map(user =>
                user.id === updatedUser.id ? updatedUser : user
            ),
        })),

    createUser: (user) =>
        set((state) => ({
            users: [...state.users, user],
        })),

    deleteUser: (id) =>
        set((state) => ({
            users: state.users.filter(user => user.id !== id),
        })),
}));
