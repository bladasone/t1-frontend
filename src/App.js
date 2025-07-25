import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TaskListPage from '@/pages/TaskListPage';
import TaskFormPage from '@/pages/TaskFormPage';
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(TaskListPage, {}) }), _jsx(Route, { path: "/task/:id", element: _jsx(TaskFormPage, {}) }), _jsx(Route, { path: "/task/new", element: _jsx(TaskFormPage, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/" }) })] }) }));
}
