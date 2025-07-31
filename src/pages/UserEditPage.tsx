// UserEditPage.tsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/entities/user/userStore';
import UserForm from '@/components/UserForm';
import type { UserFormData } from '@/entities/user/types';

export default function UserEditPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    console.log('Editing user id:', id);

    const user = useUserStore((state) => (id ? state.getUserById(id) : undefined));

    console.log('Found user:', user);

    const updateUser = useUserStore((state) => state.updateUser);

    if (!user) return <p>Пользователь не найден</p>;

    const onSubmit = (data: UserFormData) => {
        updateUser({
            ...user,
            ...data,
            password: user.password, // оставляем пароль без изменений
        });
        navigate('/');
    };

    return (
        <>
            <h2>Редактирование пользователя</h2>
            <UserForm
                initialData={{
                    name: user.name,
                    surName: user.surName,
                    fullName: user.fullName,
                    email: user.email,
                    birthDate: user.birthDate,
                    telephone: user.telephone,
                    employment: user.employment,
                    userAgreement: user.userAgreement,
                }}
                onSubmit={onSubmit}
            />
        </>
    );
}
