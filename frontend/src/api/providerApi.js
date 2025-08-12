import { api } from './api';

export const addProvider = async (companyId, providerData) => {
    const res = await api.post(`/users/company/${companyId}/add-provider`, providerData);
    return res.data;
};

export const getProvidersByCompanyId = (companyId) =>
  api.get(`/company/${companyId}/providers`);

export const registerUser = (data) =>
  api.post('/auth/register', data);
