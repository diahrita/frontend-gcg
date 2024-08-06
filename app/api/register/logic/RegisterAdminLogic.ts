// RegisterAdminFormLogic.ts
import { regisAdmin } from '@/app/api/register/regisAdmin'; // Pastikan pathnya sesuai
import { RegisterAdmin } from '@/types/register';
import { useState } from 'react';

interface UseRegisterAdminForm {
    formData: RegisterAdmin;
    error_regis: string | null;
    success: string | null;
    loading_regis: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const useRegisterAdminForm = (): UseRegisterAdminForm => {
    const [formData, setFormData] = useState<RegisterAdmin>({
        username: '',
        password: '',
        short_name: '',
        email: '',
        phone: '',
    });

    const [error_regis, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading_regis, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const result = await regisAdmin(formData);

        if (result.status === 200) {
            setSuccess('Registration successful!');
        } else {
            setError('Registration failed. Please try again.');
        }
        
        setLoading(false);
    };

    return {
        formData,
        error_regis,
        success,
        loading_regis,
        handleChange,
        handleSubmit,
    };
};
