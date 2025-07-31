import React from 'react';
import { useUserStore } from '@/entities/user/userStore';

export default function UserListPage() {
    const users = useUserStore((state) => state.users);
    const deleteUser = useUserStore((state) => state.deleteUser);

    return (
        <>
            <h2>User List</h2>
            {users.length === 0 && <p>No users yet</p>}
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.email})
                        <button onClick={() => deleteUser(user.id)} style={{ marginLeft: '10px' }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}
