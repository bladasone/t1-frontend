export interface User {
    id: string;
    name: string;
    surName: string;
    fullName: string;
    email: string;
    password?: string;
    birthDate?: string;
    telephone?: string;
    employment?: string;
    userAgreement?: boolean;
}


export interface UserFormData {
    name: string;                    // Обязательное, макс. 64 символа
    surName: string;                 // Обязательное, макс. 64 символа
    fullName: string;                // Обязательное, макс. 130 символов
    email: string;                   // Обязательное, с валидацией email
    password: string;                // Обязательное
    birthDate?: string;             // Необязательное, формат ISO: 2025-07-16T...
    telephone?: string;            // Необязательное, формат: +79991231231
    employment?: string;           // Необязательное, селект
    userAgreement?: boolean;       // Необязательное, чекбокс
}
