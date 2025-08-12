// // src/utils/authUtils.js

// export const saveToken = (token) => {
//     localStorage.setItem('token', token);
// };

// export const getToken = () => {
//     return localStorage.getItem('token');
// };

// export const clearToken = () => {
//     localStorage.removeItem('token');
// };

// export const saveUser = (user) => {
//     localStorage.setItem('user', JSON.stringify(user));
// };

// export const getUser = () => {
//     const userStr = localStorage.getItem('user');
//     return userStr ? JSON.parse(userStr) : null;
// };

// export const getDashboardRoute = (user) => {
//     if (!user || !user.role) return '/unauthorized';

//     const role = user.role.toUpperCase();

//     if (role === 'ADMIN') return '/admin/dashboard';
//     if (role === 'USER') return '/user/dashboard';
//     if (role === 'PROVIDER') {
//         return user.companyAdmin
//             ? '/provider/company/dashboard'
//             : '/provider/dashboard';
//     }
//     return '/unauthorized';
// };

// export const getProfileRoute = (user) => {
//     const role = user?.role?.toUpperCase();
//     if (role === 'ADMIN') return '/admin/profile';
//     if (role === 'USER') return '/user/profile';
//     if (role === 'PROVIDER') {
//         return user.companyAdmin ? '/company-admin/profile' : '/provider/profile';
//     }
//     return '/unauthorized';
// };


// src/utils/authUtils.js

// Token utilities
export const saveToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const clearToken = () => {
    localStorage.removeItem('token');
};

// User utilities
export const saveUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};


export const clearUser = () => {
    localStorage.removeItem('user');
};

export const logoutUser = () => {
    clearToken();
    clearUser();
};

// Route utilities
export const getDashboardRoute = (user) => {
    if (!user || !user.role) return '/unauthorized';

    const role = user.role.toUpperCase();

    if (role === 'ADMIN') return '/admin/dashboard';
    if (role === 'USER') return '/user/dashboard';
    if (role === 'PROVIDER') return '/provider/dashboard';
    if (role === 'COMPANY_ADMIN') return '/provider/company/dashboard';

    return '/unauthorized';
};

export const getProfileRoute = (user) => {
    if (!user || !user.role) return '/unauthorized';

    const role = user.role.toUpperCase();

    if (role === 'ADMIN') return '/admin/profile';
    if (role === 'USER') return '/user/profile';
    if (role === 'PROVIDER') {
        return user.companyAdmin
            ? '/company-admin/profile'
            : '/provider/profile';
    }

    return '/unauthorized';
};

