// RegisterAdminForm.tsx
import React from 'react';
import './RegisterAdminForm.css';
import { useRegisterAdminForm } from '@/app/api/register/logic/RegisterAdminLogic';

const RegisterAdminForm: React.FC = () => {
    const {
        formData,
        error_regis,
        success,
        loading_regis,
        handleChange,
        handleSubmit
    } = useRegisterAdminForm();

    return (
        <div className="register-form">
            <h1>Register Admin</h1>
            <form onSubmit={handleSubmit}>
               
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="short_name">Short Name:</label>
                    <input
                        type="text"
                        id="short_name"
                        name="short_name"
                        value={formData.short_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" disabled={loading_regis}>
                    {loading_regis ? 'Submitting...' : 'Register'}
                </button>
           
            </form>
            {error_regis && <p className="error-message">{error_regis}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default RegisterAdminForm;