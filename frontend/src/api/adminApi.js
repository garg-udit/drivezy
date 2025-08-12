import { api } from './api';

export const fetchUnverifiedUsers = () =>
  api.get('/admin/users?role=USER&verified=false');

export const verifyUser = (userId) =>
  api.post(`/admin/verify-user/${userId}`);

export const getUnverifiedCompanies = () =>
  api.get('/company/unverified');

export const verifyCompanyById = (companyId) =>
  api.post(`/admin/verify-company/${companyId}`);

export const getVerifiedUsers = () =>
  api.get('/admin/users?role=USER&verified=true');

export const getVerifiedCompanies = () =>
  api.get('/company/verified');

export const getUnverifiedProviders = async () => {
  const response = await api.get('/admin/users?role=PROVIDER&verified=false');
  return response.data;
};

export const getVerifiedProviders = async () => {
  const response = await api.get('/admin/users?role=PROVIDER&verified=true');
  return response.data;
};

export const verifyProvider = async (providerId) => {
  return api.post(`/admin/verify-user/${providerId}`);
};


