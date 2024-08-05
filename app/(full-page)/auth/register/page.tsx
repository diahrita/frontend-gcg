'use client'
import { regisAdmin } from '@/app/api/register/regisAdmin'; // Ganti dengan path yang sesuai
import { RegisterAdmin } from '@/types/register';
import React, { useState } from 'react';
import './Register.css'; // Ganti dengan file CSS Anda

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [shortName, setShortName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [formattedData, setFormattedData] = useState<string | null>(null);

    const handleRegister = async () => {
        const registrationData: RegisterAdmin = {
            username,
            password,
            short_name: shortName,
            email,
            phone,
        };

        const result = await regisAdmin(registrationData);

        if (result.status === 200) {
            setSuccess('Registration successful!');
            setError(null);
            // Format data to JSON string with double quotes
            setFormattedData(JSON.stringify(registrationData, null, 4));
        } else {
            setError('Registration failed. Please try again.');
            setSuccess(null);
            setFormattedData(null);
        }
    };

    return (
        <div className="register-container">
            <h1>Register Admin</h1>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="shortName">Short Name</label>
                <input
                    type="text"
                    id="shortName"
                    value={shortName}
                    onChange={(e) => setShortName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <button onClick={handleRegister}>Register</button>
            
            {formattedData && (
                <div className="formatted-data">
                    <h2>Formatted Data</h2>
                    <pre>{formattedData}</pre>
                </div>
            )}
        </div>
    );
};

export default Register;
