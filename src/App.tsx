// App

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TaskDetailsPage from './pages/TaskDetailsPage';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/task/:id" element={<TaskDetailsPage />} />
            </Routes>
        </BrowserRouter>
    );
}