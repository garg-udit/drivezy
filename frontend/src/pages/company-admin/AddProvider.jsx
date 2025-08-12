import React from 'react';
import AddProviderForm from '../../components/forms/AddProviderForm';
import { addProvider } from '../../api/providerApi';
import { getUser } from '../../utils/authUtils';
import { useNavigate } from 'react-router-dom';

const AddProvider = () => {
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            const companyId = getUser()?.companyId;
            console.log(companyId)
            if (!companyId) throw new Error('Company ID not found for current user');

            await addProvider(companyId, formData);
            alert('Provider registered successfully');
            navigate('/provider/list'); // or dashboard
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Failed to add provider');
        }
    };

    return (
        <div className="py-10 pt-[88px] px-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Provider</h2>
            <AddProviderForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddProvider;
