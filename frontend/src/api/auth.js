import { api } from './api';

export const login = (email, password) =>
    api.post('/auth/login', { email, password });

export const registerUser = (data) =>
    api.post('/auth/register', data);

export const registerCompany = (data) =>
    api.post('/company/register', data);

export const getCurrentUser = (token) =>
    api.get('/users/me', {
        headers: { Authorization: `Bearer ${token}` }
    });

