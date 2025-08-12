export const redirectToDashboard = (user, navigate) => {
    if (!user.verified) {
        navigate('/message/not-registered');
        return;
    }

    switch (user.role) {
        case 'ADMIN':
            navigate('/dashboard/admin');
            break;

        case 'USER':
            navigate('/dashboard/user');
            break;

        case 'PROVIDER':
            if (user.companyAdmin) {
                navigate('/dashboard/company-admin');
            } else {
                navigate('/dashboard/provider');
            }
            break;

        default:
            navigate('/message/unauthorized');
    }
};
