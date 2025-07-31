import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '@/components/UserForm';
import { useUserStore } from '@/entities/user/userStore';
import { UserFormData } from '@/entities/user/types';
import { v4 as uuidv4 } from 'uuid';

export default function UserCreatePage() {
    const createUser = useUserStore((state) => state.createUser);
    const navigate = useNavigate();

    function onSubmit(data: UserFormData) {
        if (!data.password) {
            alert('Password is required');
            return;
        }
        createUser({ ...data, id: uuidv4() });
        navigate('/');
    }

    return (
        <>
            <h2>Create User</h2>
            <UserForm onSubmit={onSubmit} />
        </>
    );
}
