import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TaskListPage from '@/pages/TaskListPage';
import TaskFormPage from '@/pages/TaskFormPage';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TaskListPage />} />
                <Route path="/task/:id" element={<TaskFormPage />} />
                {/* Для создания новой задачи */}
                <Route path="/task/new" element={<TaskFormPage />} />
                {/* Redirect any unknown route */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}
