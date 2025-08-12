// navConfig.js

export const navItemsByRole = {
    GUEST: [
        { path: '/', label: 'Home' },
        { path: '/vehicles', label: 'Vehicles' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' },
    ],
    USER: [
        { path: '/user/dashboard', label: 'Home' },
        { path: '/vehicles', label: 'Vehicles' },
        { path: '/booking', label: 'My Bookings' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' }
    ],
    PROVIDER: [
        { path: '/provider/dashboard', label: 'Home' },
        { path: '/provider/view-vehicles', label: 'Vehicles' },
        { path: '/provider/approve-bookings', label: 'Bookings' },
        { path: '/contact', label: 'Contact' },
    ],
    ADMIN: [
        { path: '/admin/dashboard', label: 'Dashboard' },
        { path: '/admin/all-vehicles', label: 'Vehicles' },
        { path: '/admin/verified-users', label: 'Users' },
        { path: '/company/verified', label: 'Companies' },
    ],
    COMPANY_ADMIN: [
        { path: '/provider/company/dashboard', label: 'Dashboard' },
        { path: '/company/vehicle-list', label: 'Vehicles' },
        { path: '/company/manage-providers', label: 'Providers' },
        { path: '/contact', label: 'Contact' },
    ],
};
