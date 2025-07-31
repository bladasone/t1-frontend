import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserListPage from './pages/UserListPage';
import UserCreatePage from './pages/UserCreatePage';
import UserEditPage from './pages/UserEditPage';
import MainLayout from './layout/MainLayout';

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<MainLayout />}>
                <Route path="/" element={<UserListPage />} />
                <Route path="/user/create" element={<UserCreatePage />} />
                <Route path="/user/:id/edit" element={<UserEditPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}