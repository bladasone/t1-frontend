import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { UserFormData } from '@/entities/user/types';

interface UserFormProps {
    onSubmit: (data: UserFormData) => void;
    initialData?: Partial<UserFormData>;
}

// Тип, который точно совпадает с yup-схемой:
// поля, которые nullable в yup, здесь обязательны, но могут быть null или undefined
type FormDataWithNullable = {
    name: string;
    surName: string;
    fullName: string;
    email: string;
    password: string;
    birthDate: string | null | undefined;
    telephone: string | null | undefined;
    employment: string | null | undefined;
    userAgreement: boolean | null | undefined;
};

const schema = Yup.object({
    name: Yup.string()
        .max(64, 'Максимум 64 символа')
        .required('Имя обязательно'),
    surName: Yup.string()
        .max(64, 'Максимум 64 символа')
        .required('Фамилия обязательна'),
    fullName: Yup.string()
        .max(130, 'Максимум 130 символов')
        .required('Полное имя обязательно'),
    email: Yup.string()
        .email('Неверный формат email')
        .required('Email обязателен'),
    password: Yup.string()
        .required('Пароль обязателен'),
    birthDate: Yup.string()
        .nullable()
        .notRequired(),
    telephone: Yup.string()
        .matches(/^\+7\d{10}$/, 'Формат: +79991234567')
        .nullable()
        .notRequired(),
    employment: Yup.string()
        .nullable()
        .notRequired(),
    userAgreement: Yup.boolean()
        .nullable()
        .notRequired(),
});

export default function UserForm({ onSubmit, initialData }: UserFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataWithNullable>({
        defaultValues: initialData as any,
        resolver: yupResolver(schema) as any, // приводим к any, чтобы TS не ругался
    });

    const onSubmitInternal: SubmitHandler<FormDataWithNullable> = (data) => {
        // Преобразуем обратно в UserFormData (где поля опциональны)
        const cleanData: UserFormData = {
            ...data,
            birthDate: data.birthDate ?? undefined,
            telephone: data.telephone ?? undefined,
            employment: data.employment ?? undefined,
            userAgreement: data.userAgreement ?? undefined,
        };
        onSubmit(cleanData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitInternal)}>

            <div>
                <label>Имя*</label>
                <input {...register('name')} />
                {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
            </div>

            <div>
                <label>Фамилия*</label>
                <input {...register('surName')} />
                {errors.surName && <p style={{ color: 'red' }}>{errors.surName.message}</p>}
            </div>

            <div>
                <label>Полное имя*</label>
                <input {...register('fullName')} />
                {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName.message}</p>}
            </div>

            <div>
                <label>Email*</label>
                <input type="email" {...register('email')} />
                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
            </div>

            <div>
                <label>Пароль*</label>
                <input type="password" {...register('password')} />
                {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
            </div>

            <div>
                <label>Дата рождения</label>
                <input type="date" {...register('birthDate')} />
                {errors.birthDate && <p style={{ color: 'red' }}>{errors.birthDate.message}</p>}
            </div>

            <div>
                <label>Телефон</label>
                <input placeholder="+79991234567" {...register('telephone')} />
                {errors.telephone && <p style={{ color: 'red' }}>{errors.telephone.message}</p>}
            </div>

            <div>
                <label>Занятость</label>
                <select {...register('employment')}>
                    <option value="">Выберите...</option>
                    <option value="full-time">Полная занятость</option>
                    <option value="part-time">Частичная занятость</option>
                    <option value="freelance">Фриланс</option>
                    <option value="unemployed">Без работы</option>
                </select>
                {errors.employment && <p style={{ color: 'red' }}>{errors.employment.message}</p>}
            </div>

            <div>
                <label>
                    <input type="checkbox" {...register('userAgreement')} />
                    Согласие с условиями
                </label>
                {errors.userAgreement && <p style={{ color: 'red' }}>{errors.userAgreement.message}</p>}
            </div>

            <button type="submit">Отправить</button>
        </form>
    );
}
